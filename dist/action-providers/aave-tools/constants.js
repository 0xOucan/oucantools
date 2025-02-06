"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INTEREST_RATE_MODES = exports.ASSET_IDS = exports.AAVE_POOL_ABI_EXTENDED = exports.AAVE_POOL_DATA_PROVIDER_ABI = exports.L2_ENCODER_ABI = exports.AAVE_POOL_ABI = exports.WETH_ADDRESS = exports.USDC_ADDRESS = exports.AAVE_PROTOCOL_DATA_PROVIDER = exports.AAVE_L2_ENCODER = exports.AAVE_POOL_ADDRESS = void 0;
exports.AAVE_POOL_ADDRESS = "0xbE781D7Bdf469f3d94a62Cdcc407aCe106AEcA74"; // L2Pool Proxy on Base Sepolia
exports.AAVE_L2_ENCODER = "0x0ffE481FBF0AE2282A5E1f701fab266aF487A97D";
exports.AAVE_PROTOCOL_DATA_PROVIDER = "0xAF4646B0131af8fc0DC435AF7F7d303Ac131E072";
// Asset addresses
exports.USDC_ADDRESS = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";
exports.WETH_ADDRESS = "0x4200000000000000000000000000000000000006";
// L2Pool implementation ABI (the actual methods we'll use)
exports.AAVE_POOL_ABI = [
    {
        inputs: [{ internalType: "bytes32", name: "args", type: "bytes32" }],
        name: "supply",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "bytes32", name: "args", type: "bytes32" }],
        name: "withdraw",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "bytes32", name: "args", type: "bytes32" }],
        name: "borrow",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "bytes32", name: "args", type: "bytes32" }],
        name: "repay",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "nonpayable",
        type: "function",
    },
];
// L2 Encoder ABI (matches the provided ABI)
exports.L2_ENCODER_ABI = [
    {
        inputs: [
            { internalType: "address", name: "asset", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
            { internalType: "uint16", name: "referralCode", type: "uint16" },
        ],
        name: "encodeSupplyParams",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "asset", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "encodeWithdrawParams",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "asset", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
            { internalType: "uint256", name: "interestRateMode", type: "uint256" },
            { internalType: "uint16", name: "referralCode", type: "uint16" },
        ],
        name: "encodeBorrowParams",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "asset", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
            { internalType: "uint256", name: "interestRateMode", type: "uint256" },
        ],
        name: "encodeRepayParams",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "view",
        type: "function",
    },
];
// Data Provider ABI with complete interface
exports.AAVE_POOL_DATA_PROVIDER_ABI = [
    {
        inputs: [
            { internalType: "address", name: "asset", type: "address" },
            { internalType: "address", name: "user", type: "address" },
        ],
        name: "getUserReserveData",
        outputs: [
            { internalType: "uint256", name: "currentATokenBalance", type: "uint256" },
            { internalType: "uint256", name: "currentStableDebt", type: "uint256" },
            { internalType: "uint256", name: "currentVariableDebt", type: "uint256" },
            { internalType: "uint256", name: "principalStableDebt", type: "uint256" },
            { internalType: "uint256", name: "scaledVariableDebt", type: "uint256" },
            { internalType: "uint256", name: "stableBorrowRate", type: "uint256" },
            { internalType: "uint256", name: "liquidityRate", type: "uint256" },
            { internalType: "uint40", name: "stableRateLastUpdated", type: "uint40" },
            { internalType: "bool", name: "usageAsCollateralEnabled", type: "bool" },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "asset", type: "address" }],
        name: "getReserveConfigurationData",
        outputs: [
            { internalType: "uint256", name: "decimals", type: "uint256" },
            { internalType: "uint256", name: "ltv", type: "uint256" },
            { internalType: "uint256", name: "liquidationThreshold", type: "uint256" },
            { internalType: "uint256", name: "liquidationBonus", type: "uint256" },
            { internalType: "uint256", name: "reserveFactor", type: "uint256" },
            { internalType: "bool", name: "usageAsCollateralEnabled", type: "bool" },
            { internalType: "bool", name: "borrowingEnabled", type: "bool" },
            { internalType: "bool", name: "stableBorrowRateEnabled", type: "bool" },
            { internalType: "bool", name: "isActive", type: "bool" },
            { internalType: "bool", name: "isFrozen", type: "bool" },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "asset", type: "address" }],
        name: "getReserveData",
        outputs: [
            { internalType: "uint256", name: "unbacked", type: "uint256" },
            { internalType: "uint256", name: "accruedToTreasuryScaled", type: "uint256" },
            { internalType: "uint256", name: "totalAToken", type: "uint256" },
            { internalType: "uint256", name: "totalStableDebt", type: "uint256" },
            { internalType: "uint256", name: "totalVariableDebt", type: "uint256" },
            { internalType: "uint256", name: "liquidityRate", type: "uint256" },
            { internalType: "uint256", name: "variableBorrowRate", type: "uint256" },
            { internalType: "uint256", name: "stableBorrowRate", type: "uint256" },
            { internalType: "uint256", name: "averageStableBorrowRate", type: "uint256" },
            { internalType: "uint256", name: "liquidityIndex", type: "uint256" },
            { internalType: "uint256", name: "variableBorrowIndex", type: "uint256" },
            { internalType: "uint40", name: "lastUpdateTimestamp", type: "uint40" },
        ],
        stateMutability: "view",
        type: "function",
    },
];
// Add the extended ABI
exports.AAVE_POOL_ABI_EXTENDED = [
    ...exports.AAVE_POOL_ABI,
    {
        inputs: [{ internalType: "address", name: "user", type: "address" }],
        name: "getUserAccountData",
        outputs: [
            { internalType: "uint256", name: "totalCollateralBase", type: "uint256" },
            { internalType: "uint256", name: "totalDebtBase", type: "uint256" },
            { internalType: "uint256", name: "availableBorrowsBase", type: "uint256" },
            { internalType: "uint256", name: "currentLiquidationThreshold", type: "uint256" },
            { internalType: "uint256", name: "ltv", type: "uint256" },
            { internalType: "uint256", name: "healthFactor", type: "uint256" },
        ],
        stateMutability: "view",
        type: "function",
    },
];
// Fix ASSET_IDS to use hex strings
exports.ASSET_IDS = {
    USDC: "0x0",
    WETH: "0x1",
};
// Interest rate modes
exports.INTEREST_RATE_MODES = {
    VARIABLE: 2,
    STABLE: 1,
};
