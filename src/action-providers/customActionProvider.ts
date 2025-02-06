import { z } from "zod";
import type { WalletProvider } from "../wallet-providers";
import { ActionProvider } from "./actionProvider";

export function customActionProvider<T extends WalletProvider = WalletProvider>(config: {
  name: string;
  description: string;
  schema: z.ZodSchema;
  invoke: (walletProvider: T, args: any) => Promise<string>;
}) {
  return {
    name: config.name,
    description: config.description,
    schema: config.schema,
    invoke: async (walletProvider: T, args: any) => {
      return config.invoke(walletProvider, args);
    },
  };
}
