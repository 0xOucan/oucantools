import { z } from "zod";
import { ActionProvider } from "../actionProvider";
import { Network } from "../../network";
import { SupplySchema, BorrowSchema, RepaySchema, WithdrawSchema } from "./schemas";
import { EvmWalletProvider } from "../../wallet-providers";
/**
 * AaveProtocolActionProvider handles interactions with Aave V3 on Base Sepolia.
 */
export declare class AaveProtocolActionProvider extends ActionProvider {
    private publicClient;
    constructor();
    /**
     * Supply assets to the Aave protocol.
     */
    supplyAsset(walletProvider: EvmWalletProvider, args: z.infer<typeof SupplySchema>): Promise<string>;
    /**
     * Borrow assets from the Aave protocol.
     */
    borrowAsset(walletProvider: EvmWalletProvider, args: z.infer<typeof BorrowSchema>): Promise<string>;
    /**
     * Repay borrowed assets to the Aave protocol.
     */
    repayLoan(walletProvider: EvmWalletProvider, args: z.infer<typeof RepaySchema>): Promise<string>;
    /**
     * Withdraw supplied assets from the Aave protocol.
     */
    withdrawAsset(walletProvider: EvmWalletProvider, args: z.infer<typeof WithdrawSchema>): Promise<string>;
    /**
     * Check if the network is supported (only Base Sepolia for now)
     */
    supportsNetwork: (network: Network) => boolean;
    /**
     * Get user's account data including health factor and available borrows
     */
    private getUserAccountData;
    /**
     * Get user's reserve data for a specific asset
     */
    private getUserReserveData;
    /**
     * Check if user can safely borrow the requested amount
     */
    private canUserBorrow;
    /**
     * Check if user can withdraw the requested amount
     */
    private canUserWithdraw;
}
export declare const aaveProtocolActionProvider: () => AaveProtocolActionProvider;
