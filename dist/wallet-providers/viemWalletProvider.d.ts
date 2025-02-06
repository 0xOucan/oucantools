import { BaseEvmWalletProvider } from "./evmWalletProvider";
import { Network } from "../network";
import { type TransactionRequest, type WalletClient } from "viem";
export declare class ViemWalletProvider extends BaseEvmWalletProvider {
    private client;
    private publicClient;
    private cachedAddress;
    private network;
    constructor(client: WalletClient, network: Network);
    getAddress(): string;
    initialize(): Promise<void>;
    getNetwork(): Network;
    getName(): string;
    getBalance(): Promise<bigint>;
    signMessage(message: string | Uint8Array): Promise<`0x${string}`>;
    signTypedData(typedData: any): Promise<`0x${string}`>;
    signTransaction(transaction: TransactionRequest): Promise<`0x${string}`>;
    sendTransaction(transaction: TransactionRequest): Promise<`0x${string}`>;
    waitForTransactionReceipt(hash: string): Promise<any>;
    readContract(params: any): Promise<any>;
    nativeTransfer(to: string, amount: bigint): Promise<string>;
}
