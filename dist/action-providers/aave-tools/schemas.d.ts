import { z } from "zod";
export declare const SupplySchema: z.ZodObject<{
    asset: z.ZodEnum<["USDC", "WETH"]>;
    amount: z.ZodString;
}, "strip", z.ZodTypeAny, {
    asset: "USDC" | "WETH";
    amount: string;
}, {
    asset: "USDC" | "WETH";
    amount: string;
}>;
export declare const BorrowSchema: z.ZodObject<{
    asset: z.ZodEnum<["USDC", "WETH"]>;
    amount: z.ZodString;
    interestRateMode: z.ZodEnum<["VARIABLE", "STABLE"]>;
}, "strip", z.ZodTypeAny, {
    asset: "USDC" | "WETH";
    amount: string;
    interestRateMode: "VARIABLE" | "STABLE";
}, {
    asset: "USDC" | "WETH";
    amount: string;
    interestRateMode: "VARIABLE" | "STABLE";
}>;
export declare const RepaySchema: z.ZodObject<{
    asset: z.ZodEnum<["USDC", "WETH"]>;
    amount: z.ZodString;
    interestRateMode: z.ZodEnum<["VARIABLE", "STABLE"]>;
}, "strip", z.ZodTypeAny, {
    asset: "USDC" | "WETH";
    amount: string;
    interestRateMode: "VARIABLE" | "STABLE";
}, {
    asset: "USDC" | "WETH";
    amount: string;
    interestRateMode: "VARIABLE" | "STABLE";
}>;
export declare const WithdrawSchema: z.ZodObject<{
    asset: z.ZodEnum<["USDC", "WETH"]>;
    amount: z.ZodString;
}, "strip", z.ZodTypeAny, {
    asset: "USDC" | "WETH";
    amount: string;
}, {
    asset: "USDC" | "WETH";
    amount: string;
}>;
