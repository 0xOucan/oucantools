"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAaveError = exports.AaveError = exports.AaveErrorCode = void 0;
var AaveErrorCode;
(function (AaveErrorCode) {
    // Connection/Network Errors
    AaveErrorCode["NETWORK_ERROR"] = "NETWORK_ERROR";
    AaveErrorCode["UNSUPPORTED_NETWORK"] = "UNSUPPORTED_NETWORK";
    // Transaction Errors
    AaveErrorCode["TRANSACTION_FAILED"] = "TRANSACTION_FAILED";
    AaveErrorCode["INSUFFICIENT_ALLOWANCE"] = "INSUFFICIENT_ALLOWANCE";
    // Asset Errors
    AaveErrorCode["UNSUPPORTED_ASSET"] = "UNSUPPORTED_ASSET";
    AaveErrorCode["INSUFFICIENT_BALANCE"] = "INSUFFICIENT_BALANCE";
    // Protocol Errors
    AaveErrorCode["INSUFFICIENT_COLLATERAL"] = "INSUFFICIENT_COLLATERAL";
    AaveErrorCode["HEALTH_FACTOR_TOO_LOW"] = "HEALTH_FACTOR_TOO_LOW";
    AaveErrorCode["BORROW_CAP_REACHED"] = "BORROW_CAP_REACHED";
    AaveErrorCode["SUPPLY_CAP_REACHED"] = "SUPPLY_CAP_REACHED";
    // Market Errors
    AaveErrorCode["MARKET_FROZEN"] = "MARKET_FROZEN";
    AaveErrorCode["RESERVE_INACTIVE"] = "RESERVE_INACTIVE";
    // User Position Errors
    AaveErrorCode["NO_DEBT_TO_REPAY"] = "NO_DEBT_TO_REPAY";
    AaveErrorCode["NO_COLLATERAL_TO_WITHDRAW"] = "NO_COLLATERAL_TO_WITHDRAW";
})(AaveErrorCode || (exports.AaveErrorCode = AaveErrorCode = {}));
class AaveError extends Error {
    constructor(code, message, details) {
        super(message);
        this.code = code;
        this.message = message;
        this.details = details;
        this.name = "AaveError";
    }
    toString() {
        return `[${this.code}] ${this.message}${this.details ? `\nDetails: ${JSON.stringify(this.details, null, 2)}` : ""}`;
    }
}
exports.AaveError = AaveError;
const createAaveError = (code, details) => {
    const messages = {
        [AaveErrorCode.NETWORK_ERROR]: "Failed to connect to the network",
        [AaveErrorCode.UNSUPPORTED_NETWORK]: "This network is not supported by the Aave protocol",
        [AaveErrorCode.TRANSACTION_FAILED]: "Transaction failed to execute",
        [AaveErrorCode.INSUFFICIENT_ALLOWANCE]: "Insufficient token allowance",
        [AaveErrorCode.UNSUPPORTED_ASSET]: "This asset is not supported on this network",
        [AaveErrorCode.INSUFFICIENT_BALANCE]: "Insufficient balance for the operation",
        [AaveErrorCode.INSUFFICIENT_COLLATERAL]: "Insufficient collateral for the operation",
        [AaveErrorCode.HEALTH_FACTOR_TOO_LOW]: "Operation would put health factor below minimum",
        [AaveErrorCode.BORROW_CAP_REACHED]: "Borrow cap has been reached for this asset",
        [AaveErrorCode.SUPPLY_CAP_REACHED]: "Supply cap has been reached for this asset",
        [AaveErrorCode.MARKET_FROZEN]: "Market is currently frozen",
        [AaveErrorCode.RESERVE_INACTIVE]: "Reserve is not active",
        [AaveErrorCode.NO_DEBT_TO_REPAY]: "No debt to repay for this asset",
        [AaveErrorCode.NO_COLLATERAL_TO_WITHDRAW]: "No collateral available to withdraw",
    };
    return new AaveError(code, messages[code], details);
};
exports.createAaveError = createAaveError;
