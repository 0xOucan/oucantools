"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssetAddress = exports.getAssetDecimals = void 0;
const constants_1 = require("./constants");
const getAssetDecimals = (asset) => {
    switch (asset) {
        case "USDC":
            return 6;
        case "WETH":
            return 18;
        default:
            throw new Error("Unsupported asset");
    }
};
exports.getAssetDecimals = getAssetDecimals;
const getAssetAddress = (asset) => {
    switch (asset) {
        case "USDC":
            return constants_1.USDC_ADDRESS;
        case "WETH":
            return constants_1.WETH_ADDRESS;
        default:
            throw new Error("Unsupported asset");
    }
};
exports.getAssetAddress = getAssetAddress;
