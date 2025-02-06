import { type Network } from "../network";

export interface WalletProvider {
  getAddress(): Promise<string>;
  getNetwork(): Network;
}

export interface EvmWalletProvider extends WalletProvider {
  sendTransaction(tx: { to: `0x${string}`; data: string }): Promise<string>;
  waitForTransactionReceipt(hash: string): Promise<any>;
}

// Export all provider types
export * from "./evmWalletProvider";
export * from "./viemWalletProvider";
export * from "./cdpWalletProvider";
