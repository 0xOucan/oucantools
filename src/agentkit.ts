import { WalletProvider } from "./wallet-providers";
import { Action, ActionProvider } from "./action-providers";

/**
 * Configuration options for AgentKit
 */
export type AgentKitOptions = {
  walletProvider?: WalletProvider;
  actionProviders?: ActionProvider[];
};

/**
 * AgentKit
 */
export class AgentKit {
  private walletProvider: WalletProvider;
  private actionProviders: ActionProvider[];

  /**
   * Initializes a new AgentKit instance
   *
   * @param config - Configuration options for the AgentKit
   * @param config.walletProvider - The wallet provider to use
   * @param config.actionProviders - The action providers to use
   * @param config.actions - The actions to use
   */
  private constructor(config: AgentKitOptions & { walletProvider: WalletProvider }) {
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
  public static async create(options: AgentKitOptions): Promise<AgentKit> {
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
  public getActions(): Action[] {
    const actions: Action[] = [];
    for (const provider of this.actionProviders) {
      if (provider.supportsNetwork(this.walletProvider.getNetwork())) {
        actions.push(...provider.getActions(this.walletProvider));
      }
    }
    return actions;
  }
}
