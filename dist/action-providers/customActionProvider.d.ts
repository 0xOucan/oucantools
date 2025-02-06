import { z } from "zod";
import type { WalletProvider } from "../wallet-providers";
export declare function customActionProvider<T extends WalletProvider = WalletProvider>(config: {
    name: string;
    description: string;
    schema: z.ZodSchema;
    invoke: (walletProvider: T, args: any) => Promise<string>;
}): {
    name: string;
    description: string;
    schema: z.ZodType<any, z.ZodTypeDef, any>;
    invoke: (walletProvider: T, args: any) => Promise<string>;
};
