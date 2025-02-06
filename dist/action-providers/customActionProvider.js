"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customActionProvider = customActionProvider;
function customActionProvider(config) {
    return {
        name: config.name,
        description: config.description,
        schema: config.schema,
        invoke: async (walletProvider, args) => {
            return config.invoke(walletProvider, args);
        },
    };
}
