import { AaveProtocolActionProvider } from "./aaveprotocolActionProvider";
import { EvmWalletProvider } from "../../wallet-providers";
import { encodeFunctionData } from "viem";
import { AAVE_POOL_ADDRESS, AAVE_POOL_ABI, AAVE_L2_ENCODER, ASSET_IDS } from "./constants";

const MOCK_ADDRESS = "0x1234567890123456789012345678901234567890";
const MOCK_AMOUNT = "1000000"; // 1 USDC
const MOCK_HASH = "0xabcdef1234567890";

describe("AaveProtocolActionProvider", () => {
  let provider: AaveProtocolActionProvider;
  let mockWallet: jest.Mocked<EvmWalletProvider>;

  beforeEach(() => {
    provider = new AaveProtocolActionProvider();
    mockWallet = {
      getAddress: jest.fn().mockResolvedValue(MOCK_ADDRESS),
      sendTransaction: jest.fn().mockResolvedValue(MOCK_HASH),
      waitForTransactionReceipt: jest.fn(),
    } as unknown as jest.Mocked<EvmWalletProvider>;
  });

  describe("supplyAsset", () => {
    it("should successfully supply USDC", async () => {
      const args = {
        asset: "USDC" as const,
        amount: MOCK_AMOUNT,
      };

      const result = await provider.supplyAsset(mockWallet, args);

      expect(mockWallet.sendTransaction).toHaveBeenCalledWith({
        to: AAVE_POOL_ADDRESS,
        data: expect.any(String),
      });
      expect(result).toContain("Successfully supplied");
      expect(result).toContain(MOCK_HASH);
    });
  });

  describe("borrowAsset", () => {
    it("should successfully borrow USDC", async () => {
      const args = {
        asset: "USDC" as const,
        amount: MOCK_AMOUNT,
        interestRateMode: "VARIABLE" as const,
      };

      const result = await provider.borrowAsset(mockWallet, args);

      expect(mockWallet.sendTransaction).toHaveBeenCalledWith({
        to: AAVE_POOL_ADDRESS,
        data: expect.any(String),
      });
      expect(result).toContain("Successfully borrowed");
      expect(result).toContain(MOCK_HASH);
    });
  });

  describe("repayLoan", () => {
    it("should successfully repay USDC loan", async () => {
      const args = {
        asset: "USDC" as const,
        amount: MOCK_AMOUNT,
        interestRateMode: "VARIABLE" as const,
      };

      const result = await provider.repayLoan(mockWallet, args);

      expect(mockWallet.sendTransaction).toHaveBeenCalledWith({
        to: AAVE_POOL_ADDRESS,
        data: expect.any(String),
      });
      expect(result).toContain("Successfully repaid");
      expect(result).toContain(MOCK_HASH);
    });
  });

  describe("withdrawAsset", () => {
    it("should successfully withdraw USDC", async () => {
      const args = {
        asset: "USDC" as const,
        amount: MOCK_AMOUNT,
      };

      const result = await provider.withdrawAsset(mockWallet, args);

      expect(mockWallet.sendTransaction).toHaveBeenCalledWith({
        to: AAVE_POOL_ADDRESS,
        data: expect.any(String),
      });
      expect(result).toContain("Successfully withdrew");
      expect(result).toContain(MOCK_HASH);
    });
  });

  describe("supportsNetwork", () => {
    it("should return true for base-sepolia", () => {
      const result = provider.supportsNetwork({
        protocolFamily: "evm",
        networkId: "base-sepolia",
        chainId: "84532" // Base Sepolia chainId
      });
      expect(result).toBe(true);
    });

    it("should return false for other networks", () => {
      const result = provider.supportsNetwork({
        protocolFamily: "evm",
        networkId: "ethereum-mainnet",
        chainId: "1" // Ethereum mainnet chainId
      });
      expect(result).toBe(false);
    });
  });
});
