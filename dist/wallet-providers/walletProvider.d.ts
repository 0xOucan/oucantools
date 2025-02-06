import { Network } from "../network";
export interface WalletProvider {
    getAddress(): string;
    getNetwork(): Network;
    getName(): string;
    getBalance(): Promise<bigint>;
    nativeTransfer(to: string, amount: bigint): Promise<string>;
}
export declare abstract class BaseWalletProvider implements WalletProvider {
    abstract getAddress(): string;
    abstract getNetwork(): Network;
    abstract getName(): string;
    abstract getBalance(): Promise<bigint>;
    abstract nativeTransfer(to: string, amount: bigint): Promise<string>;
}
