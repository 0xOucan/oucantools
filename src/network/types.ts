/**
 * Network is the network that the wallet provider is connected to.
 */
export type NetworkId = "base-sepolia" | "base-mainnet" | "ethereum-mainnet" | "ethereum-sepolia";
export type ProtocolFamily = "evm" | "solana" | "bitcoin";

export interface Network {
  /**
   * The protocol family of the network.
   */
  protocolFamily: string;

  /**
   * The network ID of the network.
   */
  networkId: string;

  /**
   * The chain ID of the network.
   */
  chainId: string;
}
