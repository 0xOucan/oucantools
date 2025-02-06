import { WalletProvider } from "./walletProvider";
import { type TransactionRequest } from "viem";
import { Network } from "../network";
export interface EvmWalletProvider extends WalletProvider {
    signMessage(message: string | Uint8Array): Promise<`0x${string}`>;
    signTypedData(typedData: any): Promise<`0x${string}`>;
    signTransaction(transaction: TransactionRequest): Promise<`0x${string}`>;
    sendTransaction(transaction: TransactionRequest): Promise<`0x${string}`>;
    waitForTransactionReceipt(hash: string): Promise<any>;
    readContract(params: any): Promise<any>;
}
export declare abstract class BaseEvmWalletProvider implements EvmWalletProvider {
    abstract getAddress(): string;
    abstract getNetwork(): Network;
    abstract getName(): string;
    abstract getBalance(): Promise<bigint>;
    abstract nativeTransfer(to: string, amount: bigint): Promise<string>;
    abstract signMessage(message: string | Uint8Array): Promise<`0x${string}`>;
    abstract signTypedData(typedData: any): Promise<`0x${string}`>;
    abstract signTransaction(transaction: TransactionRequest): Promise<`0x${string}`>;
    abstract sendTransaction(transaction: TransactionRequest): Promise<`0x${string}`>;
    abstract waitForTransactionReceipt(hash: string): Promise<any>;
    abstract readContract(params: any): Promise<any>;
}
