"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithdrawSchema = exports.RepaySchema = exports.BorrowSchema = exports.SupplySchema = void 0;
const zod_1 = require("zod");
exports.SupplySchema = zod_1.z.object({
    asset: zod_1.z.enum(["USDC", "WETH"]).describe("Asset to supply (USDC or WETH)"),
    amount: zod_1.z.string().describe("Amount to supply in base units (wei for WETH, 6 decimals for USDC)"),
});
exports.BorrowSchema = zod_1.z.object({
    asset: zod_1.z.enum(["USDC", "WETH"]).describe("Asset to borrow (USDC or WETH)"),
    amount: zod_1.z.string().describe("Amount to borrow in base units (wei for WETH, 6 decimals for USDC)"),
    interestRateMode: zod_1.z
        .enum(["VARIABLE", "STABLE"])
        .describe("Interest rate mode (VARIABLE or STABLE)"),
});
exports.RepaySchema = zod_1.z.object({
    asset: zod_1.z.enum(["USDC", "WETH"]).describe("Asset to repay (USDC or WETH)"),
    amount: zod_1.z
        .string()
        .describe("Amount to repay in base units (wei for WETH, 6 decimals for USDC). Use -1 for full debt"),
    interestRateMode: zod_1.z
        .enum(["VARIABLE", "STABLE"])
        .describe("Interest rate mode (VARIABLE or STABLE)"),
});
exports.WithdrawSchema = zod_1.z.object({
    asset: zod_1.z.enum(["USDC", "WETH"]).describe("Asset to withdraw (USDC or WETH)"),
    amount: zod_1.z
        .string()
        .describe("Amount to withdraw in base units (wei for WETH, 6 decimals for USDC). Use -1 for max available"),
});
