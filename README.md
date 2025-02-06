# OucanTools

A comprehensive library of LangChain tools and actions for AI agents, with a focus on DeFi protocol interactions.

## Features

- 🔧 Ready-to-use LangChain tools
- 🏦 DeFi protocol integrations (Aave V3)
- 💼 Wallet provider integrations
- 🤖 AI Agent compatibility
- 📝 TypeScript support

## Installation
bash
npm install @oucan/tools

## Quick Start

### Basic Usage with LangChain
typescript
import { AaveTools } from '@oucan/tools';
import { ChatOpenAI } from '@langchain/openai';
import { createReactAgent } from '@langchain/langgraph/prebuilt';
// Initialize tools
const aaveTools = new AaveTools({
provider: yourProvider,
network: 'sepolia'
});
// Create agent with tools
const agent = createReactAgent({
llm: new ChatOpenAI(),
tools: aaveTools.getTools()
});
// Use the agent
const result = await agent.invoke("What's my current Aave position?");


### Custom Tool Creation
typescript
import { createTool } from '@oucan/tools';
const myCustomTool = createTool({
name: "custom_action",
description: "Performs a custom action",
schema: z.object({
param1: z.string().describe("First parameter"),
param2: z.number().describe("Second parameter")
}),
func: async (args) => {
// Your custom logic here
return "Result";
}
});


### Integration with Coinbase AgentKit

typescript
import { AgentKit } from '@coinbase/agentkit';
import { AaveActionProvider } from '@oucan/tools';
const agentKit = await AgentKit.from({
walletProvider: yourWalletProvider,
actionProviders: [
new AaveActionProvider()
]
});


## Available Tools

### Aave Protocol Tools
- Supply assets
- Borrow assets
- Repay debt
- Withdraw collateral
- View positions
- Check health factor

### Utility Tools
- Gas estimation
- Token price feeds
- Transaction status checking

## Documentation

For detailed documentation and examples, visit our [documentation site](https://docs.oucan.tools).

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](LICENSE) for details.
