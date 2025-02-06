export declare const AAVE_POOL_ADDRESS = "0xbE781D7Bdf469f3d94a62Cdcc407aCe106AEcA74";
export declare const AAVE_L2_ENCODER = "0x0ffE481FBF0AE2282A5E1f701fab266aF487A97D";
export declare const AAVE_PROTOCOL_DATA_PROVIDER = "0xAF4646B0131af8fc0DC435AF7F7d303Ac131E072";
export declare const USDC_ADDRESS = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";
export declare const WETH_ADDRESS = "0x4200000000000000000000000000000000000006";
export declare const AAVE_POOL_ABI: readonly [{
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "args";
        readonly type: "bytes32";
    }];
    readonly name: "supply";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "args";
        readonly type: "bytes32";
    }];
    readonly name: "withdraw";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "args";
        readonly type: "bytes32";
    }];
    readonly name: "borrow";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "args";
        readonly type: "bytes32";
    }];
    readonly name: "repay";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}];
export declare const L2_ENCODER_ABI: readonly [{
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "asset";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "amount";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint16";
        readonly name: "referralCode";
        readonly type: "uint16";
    }];
    readonly name: "encodeSupplyParams";
    readonly outputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "";
        readonly type: "bytes32";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "asset";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "amount";
        readonly type: "uint256";
    }];
    readonly name: "encodeWithdrawParams";
    readonly outputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "";
        readonly type: "bytes32";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "asset";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "amount";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "interestRateMode";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint16";
        readonly name: "referralCode";
        readonly type: "uint16";
    }];
    readonly name: "encodeBorrowParams";
    readonly outputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "";
        readonly type: "bytes32";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "asset";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "amount";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "interestRateMode";
        readonly type: "uint256";
    }];
    readonly name: "encodeRepayParams";
    readonly outputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "";
        readonly type: "bytes32";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}];
export declare const AAVE_POOL_DATA_PROVIDER_ABI: readonly [{
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "asset";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "user";
        readonly type: "address";
    }];
    readonly name: "getUserReserveData";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "currentATokenBalance";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "currentStableDebt";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "currentVariableDebt";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "principalStableDebt";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "scaledVariableDebt";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "stableBorrowRate";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "liquidityRate";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint40";
        readonly name: "stableRateLastUpdated";
        readonly type: "uint40";
    }, {
        readonly internalType: "bool";
        readonly name: "usageAsCollateralEnabled";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "asset";
        readonly type: "address";
    }];
    readonly name: "getReserveConfigurationData";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "decimals";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "ltv";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "liquidationThreshold";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "liquidationBonus";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "reserveFactor";
        readonly type: "uint256";
    }, {
        readonly internalType: "bool";
        readonly name: "usageAsCollateralEnabled";
        readonly type: "bool";
    }, {
        readonly internalType: "bool";
        readonly name: "borrowingEnabled";
        readonly type: "bool";
    }, {
        readonly internalType: "bool";
        readonly name: "stableBorrowRateEnabled";
        readonly type: "bool";
    }, {
        readonly internalType: "bool";
        readonly name: "isActive";
        readonly type: "bool";
    }, {
        readonly internalType: "bool";
        readonly name: "isFrozen";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "asset";
        readonly type: "address";
    }];
    readonly name: "getReserveData";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "unbacked";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "accruedToTreasuryScaled";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "totalAToken";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "totalStableDebt";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "totalVariableDebt";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "liquidityRate";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "variableBorrowRate";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "stableBorrowRate";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "averageStableBorrowRate";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "liquidityIndex";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "variableBorrowIndex";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint40";
        readonly name: "lastUpdateTimestamp";
        readonly type: "uint40";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}];
export declare const AAVE_POOL_ABI_EXTENDED: readonly [{
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "args";
        readonly type: "bytes32";
    }];
    readonly name: "supply";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "args";
        readonly type: "bytes32";
    }];
    readonly name: "withdraw";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "args";
        readonly type: "bytes32";
    }];
    readonly name: "borrow";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "args";
        readonly type: "bytes32";
    }];
    readonly name: "repay";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "user";
        readonly type: "address";
    }];
    readonly name: "getUserAccountData";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "totalCollateralBase";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "totalDebtBase";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "availableBorrowsBase";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "currentLiquidationThreshold";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "ltv";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "healthFactor";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}];
export declare const ASSET_IDS: {
    readonly USDC: "0x0";
    readonly WETH: "0x1";
};
export declare const INTEREST_RATE_MODES: {
    readonly VARIABLE: 2;
    readonly STABLE: 1;
};
