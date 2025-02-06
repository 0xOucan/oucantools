"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentKit = void 0;
/**
 * AgentKit
 */
class AgentKit {
    /**
     * Initializes a new AgentKit instance
     *
     * @param config - Configuration options for the AgentKit
     * @param config.walletProvider - The wallet provider to use
     * @param config.actionProviders - The action providers to use
     * @param config.actions - The actions to use
     */
    constructor(config) {
        this.walletProvider = config.walletProvider;
        this.actionProviders = config.actionProviders || [];
    }
    /**
     * Initializes a new AgentKit instance
     *
     * @param config - Configuration options for the AgentKit
     * @param config.walletProvider - The wallet provider to use
     * @param config.actionProviders - The action providers to use
     * @param config.actions - The actions to use
     *
     * @returns A new AgentKit instance
     */
    static async create(options) {
        if (!options.walletProvider) {
            throw new Error("Wallet provider is required");
        }
        return new AgentKit({ ...options, walletProvider: options.walletProvider });
    }
    /**
     * Returns the actions available to the AgentKit.
     *
     * @returns An array of actions
     */
    getActions() {
        const actions = [];
        for (const provider of this.actionProviders) {
            if (provider.supportsNetwork(this.walletProvider.getNetwork())) {
                actions.push(...provider.getActions(this.walletProvider));
            }
        }
        return actions;
    }
}
exports.AgentKit = AgentKit;
