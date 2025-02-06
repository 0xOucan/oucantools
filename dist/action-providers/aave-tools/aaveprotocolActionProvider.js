"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aaveProtocolActionProvider = exports.AaveProtocolActionProvider = void 0;
const zod_1 = require("zod");
const actionProvider_1 = require("../actionProvider");
const actionDecorator_1 = require("../actionDecorator");
const schemas_1 = require("./schemas");
const constants_1 = require("./constants");
const viem_1 = require("viem");
const chains_1 = require("viem/chains");
/**
 * AaveProtocolActionProvider handles interactions with Aave V3 on Base Sepolia.
 */
class AaveProtocolActionProvider extends actionProvider_1.ActionProvider {
    constructor() {
        super("aave", []);
        /**
         * Check if the network is supported (only Base Sepolia for now)
         */
        this.supportsNetwork = (network) => network.networkId === "base-sepolia";
        this.publicClient = (0, viem_1.createPublicClient)({
            chain: chains_1.baseSepolia,
            transport: (0, viem_1.http)(),
        });
    }
    /**
     * Supply assets to the Aave protocol.
     */
    async supplyAsset(walletProvider, args) {
        try {
            const assetId = constants_1.ASSET_IDS[args.asset];
            const amount = BigInt(args.amount);
            // Get encoded parameters from L2Encoder
            const encodedParams = await this.publicClient.readContract({
                address: constants_1.AAVE_L2_ENCODER,
                abi: constants_1.L2_ENCODER_ABI,
                functionName: "encodeSupplyParams",
                args: [assetId, amount, 0], // 0 is referral code
            });
            // Execute supply transaction
            const hash = await walletProvider.sendTransaction({
                to: constants_1.AAVE_POOL_ADDRESS,
                data: (0, viem_1.encodeFunctionData)({
                    abi: constants_1.AAVE_POOL_ABI,
                    functionName: "supply",
                    args: [encodedParams],
                }),
            });
            await walletProvider.waitForTransactionReceipt(hash);
            return `Successfully supplied ${args.amount} ${args.asset} to Aave. Transaction: ${hash}`;
        }
        catch (error) {
            return `Error supplying asset to Aave: ${error}`;
        }
    }
    /**
     * Borrow assets from the Aave protocol.
     */
    async borrowAsset(walletProvider, args) {
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
                address: constants_1.AAVE_L2_ENCODER,
                abi: constants_1.L2_ENCODER_ABI,
                functionName: "encodeBorrowParams",
                args: [constants_1.ASSET_IDS[args.asset], amount, interestRateMode, 0], // 0 is referral code
            });
            // Execute borrow transaction
            const hash = await walletProvider.sendTransaction({
                to: constants_1.AAVE_POOL_ADDRESS,
                data: (0, viem_1.encodeFunctionData)({
                    abi: constants_1.AAVE_POOL_ABI,
                    functionName: "borrow",
                    args: [encodedParams],
                }),
            });
            await walletProvider.waitForTransactionReceipt(hash);
            return `Successfully borrowed ${args.amount} ${args.asset} from Aave. Transaction: ${hash}`;
        }
        catch (error) {
            return `Error borrowing asset from Aave: ${error}`;
        }
    }
    /**
     * Repay borrowed assets to the Aave protocol.
     */
    async repayLoan(walletProvider, args) {
        try {
            const assetId = constants_1.ASSET_IDS[args.asset];
            const amount = BigInt(args.amount);
            const interestRateMode = interestRateModeToNumber(args.interestRateMode);
            // Get encoded parameters from L2Encoder
            const encodedParams = await this.publicClient.readContract({
                address: constants_1.AAVE_L2_ENCODER,
                abi: constants_1.L2_ENCODER_ABI,
                functionName: "encodeRepayParams",
                args: [assetId, amount, interestRateMode],
            });
            // Execute repay transaction
            const hash = await walletProvider.sendTransaction({
                to: constants_1.AAVE_POOL_ADDRESS,
                data: (0, viem_1.encodeFunctionData)({
                    abi: constants_1.AAVE_POOL_ABI,
                    functionName: "repay",
                    args: [encodedParams],
                }),
            });
            await walletProvider.waitForTransactionReceipt(hash);
            return `Successfully repaid ${args.amount} ${args.asset} to Aave. Transaction: ${hash}`;
        }
        catch (error) {
            return `Error repaying loan to Aave: ${error}`;
        }
    }
    /**
     * Withdraw supplied assets from the Aave protocol.
     */
    async withdrawAsset(walletProvider, args) {
        try {
            const userAddress = await walletProvider.getAddress();
            const amount = BigInt(args.amount);
            const { canWithdraw, reason } = await this.canUserWithdraw(userAddress, amount, args.asset);
            if (!canWithdraw) {
                return `Cannot withdraw: ${reason}`;
            }
            // Get encoded parameters from L2Encoder
            const encodedParams = await this.publicClient.readContract({
                address: constants_1.AAVE_L2_ENCODER,
                abi: constants_1.L2_ENCODER_ABI,
                functionName: "encodeWithdrawParams",
                args: [constants_1.ASSET_IDS[args.asset], amount],
            });
            // Execute withdraw transaction
            const hash = await walletProvider.sendTransaction({
                to: constants_1.AAVE_POOL_ADDRESS,
                data: (0, viem_1.encodeFunctionData)({
                    abi: constants_1.AAVE_POOL_ABI,
                    functionName: "withdraw",
                    args: [encodedParams],
                }),
            });
            await walletProvider.waitForTransactionReceipt(hash);
            return `Successfully withdrew ${args.amount} ${args.asset} from Aave. Transaction: ${hash}`;
        }
        catch (error) {
            return `Error withdrawing asset from Aave: ${error}`;
        }
    }
    /**
     * Get user's account data including health factor and available borrows
     */
    async getUserAccountData(userAddress) {
        const result = await this.publicClient.readContract({
            address: constants_1.AAVE_POOL_ADDRESS,
            abi: constants_1.AAVE_POOL_ABI_EXTENDED,
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
    async getUserReserveData(userAddress, assetAddress) {
        const result = await this.publicClient.readContract({
            address: constants_1.AAVE_PROTOCOL_DATA_PROVIDER,
            abi: constants_1.AAVE_POOL_DATA_PROVIDER_ABI,
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
    async canUserBorrow(userAddress, amount, asset) {
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
    async canUserWithdraw(userAddress, amount, asset) {
        const assetAddress = asset === "USDC" ? constants_1.USDC_ADDRESS : constants_1.WETH_ADDRESS;
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
            const newHealthFactor = (newCollateral * accountData.currentLiquidationThreshold) /
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
exports.AaveProtocolActionProvider = AaveProtocolActionProvider;
__decorate([
    (0, actionDecorator_1.CreateAction)({
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
        schema: schemas_1.SupplySchema,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, void 0]),
    __metadata("design:returntype", Promise)
], AaveProtocolActionProvider.prototype, "supplyAsset", null);
__decorate([
    (0, actionDecorator_1.CreateAction)({
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
        schema: schemas_1.BorrowSchema,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, void 0]),
    __metadata("design:returntype", Promise)
], AaveProtocolActionProvider.prototype, "borrowAsset", null);
__decorate([
    (0, actionDecorator_1.CreateAction)({
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
        schema: schemas_1.RepaySchema,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, void 0]),
    __metadata("design:returntype", Promise)
], AaveProtocolActionProvider.prototype, "repayLoan", null);
__decorate([
    (0, actionDecorator_1.CreateAction)({
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
        schema: schemas_1.WithdrawSchema,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, void 0]),
    __metadata("design:returntype", Promise)
], AaveProtocolActionProvider.prototype, "withdrawAsset", null);
const aaveProtocolActionProvider = () => new AaveProtocolActionProvider();
exports.aaveProtocolActionProvider = aaveProtocolActionProvider;
// Add these helper functions at the top of the file, after imports
const interestRateModeToNumber = (mode) => {
    return BigInt(constants_1.INTEREST_RATE_MODES[mode]);
};
const toHexAddress = (address) => {
    return address.toLowerCase();
};
