import { z } from "zod";
import { ActionProvider } from "../actionProvider";
import { Network } from "../../network";
import { CreateAction } from "../actionDecorator";
import { SupplySchema, BorrowSchema, RepaySchema, WithdrawSchema } from "./schemas";
import {
  AAVE_POOL_ADDRESS,
  AAVE_POOL_ABI,
  AAVE_L2_ENCODER,
  L2_ENCODER_ABI,
  ASSET_IDS,
  INTEREST_RATE_MODES,
  USDC_ADDRESS,
  WETH_ADDRESS,
  AAVE_POOL_DATA_PROVIDER_ABI,
  AAVE_POOL_ABI_EXTENDED,
  AAVE_PROTOCOL_DATA_PROVIDER,
} from "./constants";
import { UserAccountData, UserReserveData } from "./types";
import { AaveError, createAaveError, AaveErrorCode } from "./errors";
import { getAssetAddress, getAssetDecimals } from "./utils";
import { encodeFunctionData, Hex, createPublicClient, http } from "viem";
import { EvmWalletProvider } from "../../wallet-providers";
import { baseSepolia } from "viem/chains";

/**
 * AaveProtocolActionProvider handles interactions with Aave V3 on Base Sepolia.
 */
export class AaveProtocolActionProvider extends ActionProvider {
  private publicClient;

  constructor() {
    super("aave", []);
    this.publicClient = createPublicClient({
      chain: baseSepolia,
      transport: http(),
    });
  }

  /**
   * Supply assets to the Aave protocol.
   */
  @CreateAction({
    name: "supply_asset",
    description: `
    Supply assets to Aave V3 protocol on Base Sepolia.
    
    This action allows you to supply USDC or WETH as collateral to the Aave protocol.
    The supplied assets can be used as collateral for borrowing.
    
    Important notes:
    - Make sure to approve the Aave Pool contract before supplying
    - USDC uses 6 decimals
    - WETH uses 18 decimals
    - The amount should be in base units (no decimals)
    `,
    schema: SupplySchema,
  })
  async supplyAsset(
    walletProvider: EvmWalletProvider,
    args: z.infer<typeof SupplySchema>,
  ): Promise<string> {
    try {
      const assetId = ASSET_IDS[args.asset];
      const amount = BigInt(args.amount);

      // Get encoded parameters from L2Encoder
      const encodedParams = await this.publicClient.readContract({
        address: AAVE_L2_ENCODER,
        abi: L2_ENCODER_ABI,
        functionName: "encodeSupplyParams",
        args: [assetId, amount, 0], // 0 is referral code
      });

      // Execute supply transaction
      const hash = await walletProvider.sendTransaction({
        to: AAVE_POOL_ADDRESS as Hex,
        data: encodeFunctionData({
          abi: AAVE_POOL_ABI,
          functionName: "supply",
          args: [encodedParams],
        }),
      });

      await walletProvider.waitForTransactionReceipt(hash);
      return `Successfully supplied ${args.amount} ${args.asset} to Aave. Transaction: ${hash}`;
    } catch (error) {
      return `Error supplying asset to Aave: ${error}`;
    }
  }

  /**
   * Borrow assets from the Aave protocol.
   */
  @CreateAction({
    name: "borrow_asset",
    description: `
    Borrow assets from Aave V3 protocol on Base Sepolia.
    
    This action allows you to borrow USDC or WETH against your supplied collateral.
    
    Important notes:
    - You must have sufficient collateral supplied
    - Recommended to borrow no more than 50% of your maximum borrowing capacity
    - USDC uses 6 decimals
    - WETH uses 18 decimals
    - The amount should be in base units (no decimals)
    `,
    schema: BorrowSchema,
  })
  async borrowAsset(
    walletProvider: EvmWalletProvider,
    args: z.infer<typeof BorrowSchema>,
  ): Promise<string> {
    try {
      const userAddress = await walletProvider.getAddress();
      const amount = BigInt(args.amount);
      const interestRateMode = interestRateModeToNumber(args.interestRateMode);

      const { canBorrow, reason } = await this.canUserBorrow(userAddress, amount, args.asset);
      if (!canBorrow) {
        return `Cannot borrow: ${reason}`;
      }

      // Get encoded parameters from L2Encoder
      const encodedParams = await this.publicClient.readContract({
        address: AAVE_L2_ENCODER,
        abi: L2_ENCODER_ABI,
        functionName: "encodeBorrowParams",
        args: [ASSET_IDS[args.asset], amount, interestRateMode, 0], // 0 is referral code
      });

      // Execute borrow transaction
      const hash = await walletProvider.sendTransaction({
        to: AAVE_POOL_ADDRESS as Hex,
        data: encodeFunctionData({
          abi: AAVE_POOL_ABI,
          functionName: "borrow",
          args: [encodedParams],
        }),
      });

      await walletProvider.waitForTransactionReceipt(hash);
      return `Successfully borrowed ${args.amount} ${args.asset} from Aave. Transaction: ${hash}`;
    } catch (error) {
      return `Error borrowing asset from Aave: ${error}`;
    }
  }

  /**
   * Repay borrowed assets to the Aave protocol.
   */
  @CreateAction({
    name: "repay_loan",
    description: `
    Repay borrowed assets to Aave V3 protocol on Base Sepolia.
    
    This action allows you to repay your USDC or WETH debt.
    Use -1 as amount to repay the full debt.
    
    Important notes:
    - Make sure to approve the Aave Pool contract before repaying
    - USDC uses 6 decimals
    - WETH uses 18 decimals
    - The amount should be in base units (no decimals)
    `,
    schema: RepaySchema,
  })
  async repayLoan(
    walletProvider: EvmWalletProvider,
    args: z.infer<typeof RepaySchema>,
  ): Promise<string> {
    try {
      const assetId = ASSET_IDS[args.asset];
      const amount = BigInt(args.amount);
      const interestRateMode = interestRateModeToNumber(args.interestRateMode);

      // Get encoded parameters from L2Encoder
      const encodedParams = await this.publicClient.readContract({
        address: AAVE_L2_ENCODER,
        abi: L2_ENCODER_ABI,
        functionName: "encodeRepayParams",
        args: [assetId, amount, interestRateMode],
      });

      // Execute repay transaction
      const hash = await walletProvider.sendTransaction({
        to: AAVE_POOL_ADDRESS as Hex,
        data: encodeFunctionData({
          abi: AAVE_POOL_ABI,
          functionName: "repay",
          args: [encodedParams],
        }),
      });

      await walletProvider.waitForTransactionReceipt(hash);
      return `Successfully repaid ${args.amount} ${args.asset} to Aave. Transaction: ${hash}`;
    } catch (error) {
      return `Error repaying loan to Aave: ${error}`;
    }
  }

  /**
   * Withdraw supplied assets from the Aave protocol.
   */
  @CreateAction({
    name: "withdraw_asset",
    description: `
    Withdraw supplied assets from Aave V3 protocol on Base Sepolia.
    
    This action allows you to withdraw your supplied USDC or WETH.
    Use -1 as amount to withdraw the maximum available amount.
    
    Important notes:
    - You cannot withdraw if you have outstanding debt
    - The withdrawal amount might be limited by your health factor
    - USDC uses 6 decimals
    - WETH uses 18 decimals
    - The amount should be in base units (no decimals)
    `,
    schema: WithdrawSchema,
  })
  async withdrawAsset(
    walletProvider: EvmWalletProvider,
    args: z.infer<typeof WithdrawSchema>,
  ): Promise<string> {
    try {
      const userAddress = await walletProvider.getAddress();
      const amount = BigInt(args.amount);

      const { canWithdraw, reason } = await this.canUserWithdraw(userAddress, amount, args.asset);
      if (!canWithdraw) {
        return `Cannot withdraw: ${reason}`;
      }

      // Get encoded parameters from L2Encoder
      const encodedParams = await this.publicClient.readContract({
        address: AAVE_L2_ENCODER,
        abi: L2_ENCODER_ABI,
        functionName: "encodeWithdrawParams",
        args: [ASSET_IDS[args.asset], amount],
      });

      // Execute withdraw transaction
      const hash = await walletProvider.sendTransaction({
        to: AAVE_POOL_ADDRESS as Hex,
        data: encodeFunctionData({
          abi: AAVE_POOL_ABI,
          functionName: "withdraw",
          args: [encodedParams],
        }),
      });

      await walletProvider.waitForTransactionReceipt(hash);
      return `Successfully withdrew ${args.amount} ${args.asset} from Aave. Transaction: ${hash}`;
    } catch (error) {
      return `Error withdrawing asset from Aave: ${error}`;
    }
  }

  /**
   * Check if the network is supported (only Base Sepolia for now)
   */
  supportsNetwork = (network: Network) => network.networkId === "base-sepolia";

  /**
   * Get user's account data including health factor and available borrows
   */
  private async getUserAccountData(userAddress: string): Promise<UserAccountData> {
    const result = await this.publicClient.readContract({
      address: AAVE_POOL_ADDRESS,
      abi: AAVE_POOL_ABI_EXTENDED,
      functionName: "getUserAccountData",
      args: [toHexAddress(userAddress)],
    });

    return {
      totalCollateralBase: result[0],
      totalDebtBase: result[1],
      availableBorrowsBase: result[2],
      currentLiquidationThreshold: result[3],
      ltv: result[4],
      healthFactor: result[5],
    };
  }

  /**
   * Get user's reserve data for a specific asset
   */
  private async getUserReserveData(
    userAddress: string,
    assetAddress: string,
  ): Promise<UserReserveData> {
    const result = await this.publicClient.readContract({
      address: AAVE_PROTOCOL_DATA_PROVIDER as `0x${string}`,
      abi: AAVE_POOL_DATA_PROVIDER_ABI,
      functionName: "getUserReserveData",
      args: [toHexAddress(assetAddress), toHexAddress(userAddress)],
    });

    return {
      currentATokenBalance: result[0],
      currentStableDebt: result[1],
      currentVariableDebt: result[2],
      principalStableDebt: result[3],
      scaledVariableDebt: result[4],
      stableBorrowRate: result[5],
      liquidityRate: result[6],
      stableRateLastUpdated: result[7],
      usageAsCollateralEnabled: result[8],
    };
  }

  /**
   * Check if user can safely borrow the requested amount
   */
  private async canUserBorrow(
    userAddress: string,
    amount: bigint,
    asset: "USDC" | "WETH",
  ): Promise<{ canBorrow: boolean; reason?: string }> {
    const accountData = await this.getUserAccountData(userAddress);

    if (accountData.healthFactor === 0n) {
      return { canBorrow: false, reason: "No collateral supplied" };
    }

    if (amount > accountData.availableBorrowsBase) {
      return {
        canBorrow: false,
        reason: `Amount exceeds maximum borrowing capacity. Maximum available: ${accountData.availableBorrowsBase}`,
      };
    }

    return { canBorrow: true };
  }

  /**
   * Check if user can withdraw the requested amount
   */
  private async canUserWithdraw(
    userAddress: string,
    amount: bigint,
    asset: "USDC" | "WETH",
  ): Promise<{ canWithdraw: boolean; reason?: string }> {
    const assetAddress = asset === "USDC" ? USDC_ADDRESS : WETH_ADDRESS;
    const [accountData, reserveData] = await Promise.all([
      this.getUserAccountData(userAddress),
      this.getUserReserveData(userAddress, assetAddress),
    ]);

    if (reserveData.currentATokenBalance < amount) {
      return {
        canWithdraw: false,
        reason: `Insufficient balance. Available: ${reserveData.currentATokenBalance}`,
      };
    }

    if (accountData.totalDebtBase > 0n) {
      // Calculate health factor after withdrawal
      const newCollateral = accountData.totalCollateralBase - amount;
      const newHealthFactor =
        (newCollateral * accountData.currentLiquidationThreshold) /
        (accountData.totalDebtBase * 10000n);

      if (newHealthFactor < 1n) {
        return {
          canWithdraw: false,
          reason: "Withdrawal would put position at risk of liquidation",
        };
      }
    }

    return { canWithdraw: true };
  }
}

export const aaveProtocolActionProvider = () => new AaveProtocolActionProvider();

// Add these helper functions at the top of the file, after imports
const interestRateModeToNumber = (mode: "VARIABLE" | "STABLE"): bigint => {
  return BigInt(INTEREST_RATE_MODES[mode]);
};

const toHexAddress = (address: string): `0x${string}` => {
  return address.toLowerCase() as `0x${string}`;
};
