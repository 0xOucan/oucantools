"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViemWalletProvider = void 0;
const evmWalletProvider_1 = require("./evmWalletProvider");
const viem_1 = require("viem");
class ViemWalletProvider extends evmWalletProvider_1.BaseEvmWalletProvider {
    constructor(client, network) {
        super();
        this.cachedAddress = null;
        this.client = client;
        this.network = network;
        this.publicClient = (0, viem_1.createPublicClient)({
            chain: client.chain,
            transport: (0, viem_1.http)()
        });
    }
    getAddress() {
        if (!this.cachedAddress) {
            throw new Error("Address not initialized. Call initialize() first");
        }
        return this.cachedAddress;
    }
    async initialize() {
        const [address] = await this.client.getAddresses();
        this.cachedAddress = address;
    }
    getNetwork() {
        return this.network;
    }
    getName() {
        return "Viem Wallet";
    }
    async getBalance() {
        const address = this.getAddress();
        const balance = await this.publicClient.getBalance({
            address: address
        });
        return balance;
    }
    async signMessage(message) {
        const signableMessage = typeof message === 'string' ? message : { raw: message };
        return await this.client.signMessage({
            message: signableMessage,
            account: this.getAddress()
        });
    }
    async signTypedData(typedData) {
        return await this.client.signTypedData({
            ...typedData,
            account: this.getAddress(),
            chain: this.client.chain
        });
    }
    async signTransaction(transaction) {
        return await this.client.signTransaction({
            ...transaction,
            account: this.getAddress(),
            chain: this.client.chain
        });
    }
    async sendTransaction(transaction) {
        return await this.client.sendTransaction({
            ...transaction,
            account: this.getAddress(),
            chain: this.client.chain
        });
    }
    async waitForTransactionReceipt(hash) {
        return await this.publicClient.waitForTransactionReceipt({
            hash: hash
        });
    }
    async readContract(params) {
        return await this.publicClient.readContract(params);
    }
    async nativeTransfer(to, amount) {
        const hash = await this.sendTransaction({
            to: to,
            value: amount
        });
        return hash;
    }
}
exports.ViemWalletProvider = ViemWalletProvider;
