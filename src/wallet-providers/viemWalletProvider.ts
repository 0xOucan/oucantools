import { BaseEvmWalletProvider } from "./evmWalletProvider";
import { Network } from "../network";
import { 
  type TransactionRequest, 
  type WalletClient, 
  type Hash,
  type SignableMessage,
  type PublicClient,
  createPublicClient,
  http
} from "viem";

export class ViemWalletProvider extends BaseEvmWalletProvider {
  private client: WalletClient;
  private publicClient: PublicClient;
  private cachedAddress: string | null = null;
  private network: Network;

  constructor(client: WalletClient, network: Network) {
    super();
    this.client = client;
    this.network = network;
    this.publicClient = createPublicClient({
      chain: client.chain,
      transport: http()
    });
  }

  getAddress(): string {
    if (!this.cachedAddress) {
      throw new Error("Address not initialized. Call initialize() first");
    }
    return this.cachedAddress;
  }

  async initialize(): Promise<void> {
    const [address] = await this.client.getAddresses();
    this.cachedAddress = address;
  }

  getNetwork(): Network {
    return this.network;
  }

  getName(): string {
    return "Viem Wallet";
  }

  async getBalance(): Promise<bigint> {
    const address = this.getAddress();
    const balance = await this.publicClient.getBalance({ 
      address: address as `0x${string}` 
    });
    return balance;
  }

  async signMessage(message: string | Uint8Array): Promise<`0x${string}`> {
    const signableMessage: SignableMessage = 
      typeof message === 'string' ? message : { raw: message };
    return await this.client.signMessage({ 
      message: signableMessage,
      account: this.getAddress() as `0x${string}`
    });
  }

  async signTypedData(typedData: any): Promise<`0x${string}`> {
    return await this.client.signTypedData({
      ...typedData,
      account: this.getAddress() as `0x${string}`,
      chain: this.client.chain
    });
  }

  async signTransaction(transaction: TransactionRequest): Promise<`0x${string}`> {
    return await this.client.signTransaction({
      ...transaction,
      account: this.getAddress() as `0x${string}`,
      chain: this.client.chain
    });
  }

  async sendTransaction(transaction: TransactionRequest): Promise<`0x${string}`> {
    return await this.client.sendTransaction({
      ...transaction,
      account: this.getAddress() as `0x${string}`,
      chain: this.client.chain
    });
  }

  async waitForTransactionReceipt(hash: string): Promise<any> {
    return await this.publicClient.waitForTransactionReceipt({ 
      hash: hash as Hash 
    });
  }

  async readContract(params: any): Promise<any> {
    return await this.publicClient.readContract(params);
  }

  async nativeTransfer(to: string, amount: bigint): Promise<string> {
    const hash = await this.sendTransaction({
      to: to as `0x${string}`,
      value: amount
    });
    return hash;
  }
}
