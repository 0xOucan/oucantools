export declare enum AaveErrorCode {
    NETWORK_ERROR = "NETWORK_ERROR",
    UNSUPPORTED_NETWORK = "UNSUPPORTED_NETWORK",
    TRANSACTION_FAILED = "TRANSACTION_FAILED",
    INSUFFICIENT_ALLOWANCE = "INSUFFICIENT_ALLOWANCE",
    UNSUPPORTED_ASSET = "UNSUPPORTED_ASSET",
    INSUFFICIENT_BALANCE = "INSUFFICIENT_BALANCE",
    INSUFFICIENT_COLLATERAL = "INSUFFICIENT_COLLATERAL",
    HEALTH_FACTOR_TOO_LOW = "HEALTH_FACTOR_TOO_LOW",
    BORROW_CAP_REACHED = "BORROW_CAP_REACHED",
    SUPPLY_CAP_REACHED = "SUPPLY_CAP_REACHED",
    MARKET_FROZEN = "MARKET_FROZEN",
    RESERVE_INACTIVE = "RESERVE_INACTIVE",
    NO_DEBT_TO_REPAY = "NO_DEBT_TO_REPAY",
    NO_COLLATERAL_TO_WITHDRAW = "NO_COLLATERAL_TO_WITHDRAW"
}
export declare class AaveError extends Error {
    code: AaveErrorCode;
    message: string;
    details?: any | undefined;
    constructor(code: AaveErrorCode, message: string, details?: any | undefined);
    toString(): string;
}
export declare const createAaveError: (code: AaveErrorCode, details?: any) => AaveError;
