import { BaseWalletProvider, WalletProvider } from "./walletProvider";
import { Network } from "../network";

export interface CdpWalletProvider extends WalletProvider {
  // CDP specific methods only
  getCdpAddress(): Promise<string>;
  signMessage(message: string): Promise<string>;
}

export abstract class BaseCdpWalletProvider extends BaseWalletProvider implements CdpWalletProvider {
  abstract getAddress(): string;
  abstract getNetwork(): Network;
  abstract getName(): string;
  abstract getBalance(): Promise<bigint>;
  abstract nativeTransfer(to: string, amount: bigint): Promise<string>;
  
  // CDP specific methods
  abstract getCdpAddress(): Promise<string>;
  abstract signMessage(message: string): Promise<string>;
}
