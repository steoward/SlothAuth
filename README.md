# SlothAuth

**Your friendly AI Sloth assistant for secure Auth0 authentication.**

A browser extension (Chrome & Firefox) that provides a Token Vault for managing OAuth tokens with Auth0 integration, featuring an AI Agent configuration system with chat functionality.

---

## About

SlothAuth is an "Auth0 for AI Agents" solution—a browser extension that combines secure token management with configurable AI agents. The extension features a charming sloth mascot that greets users with delightful particle-based canvas animations.

### Features

- 🔐 **Token Vault** - Securely store and manage OAuth tokens from multiple services (GitHub, Google, Slack, Notion, Linear, Microsoft)
- 🤖 **AI Agents** - Configure and chat with AI agents supporting multiple providers:
  - Anthropic (Claude)
  - OpenAI (GPT-4)
  - Google Gemini
  - OpenRouter
- 💬 **Chat Interface** - Interactive chat with your configured AI agents
- 🎨 **Animated Sloth** - Delightful particle-based sloth animations (lightweight alternative to 3D)
- 📊 **Activity Tracking** - Monitor authentication events and token usage

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **TypeScript** | Type-safe development |
| **React 19** | UI framework |
| **Vite 8** | Build tool |
| **Canvas API** | Particle animations |
| **Auth0 React SDK** | Authentication |

---

## Installation

### From Source

```bash
# Clone the repository
git clone https://github.com/steoward/SlothAuth.git
cd SlothAuth

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Build the extension
npm run build

# The output will be in the /dist folder
```

### Chrome Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `dist` folder

### Firefox Installation

1. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on..."
3. Select any file in the `dist` folder

Or package as `.zip` and submit to [Firefox Add-ons](https://addons.mozilla.org/)

---

## Project Structure

```
SlothAuth/
├── public/
│   ├── manifest.json     # Extension manifest
│   ├── background.js      # Service worker
│   └── content.js         # Content scripts
├── src/
│   ├── components/
│   │   ├── SlothAssistant.tsx  # Main component
│   │   ├── SlothParticles.tsx  # Canvas animations
│   │   ├── AgentTab.tsx         # AI Agent configuration
│   │   ├── VaultTab.tsx         # Token vault
│   │   └── ActivityTab.tsx     # Activity logs
│   ├── App.tsx
│   ├── App.css
│   └── types.ts
├── package.json
└── vite.config.ts
```

---

## Development Challenges & Solutions

### 3D Model → Canvas Transition

Originally attempted to include a 3D sloth model using Three.js and React Three Fiber. The model added 89MB to the bundle—unacceptable for a browser extension. Pivoted to a lightweight canvas-based particle system that draws animated sloth faces (~400KB total).

### Firefox Publishing

Firefox Manifest V3 has specific requirements:
- Must use `background.scripts` instead of `service_worker`
- Requires explicit addon ID in UUID format

---

## Usage

1. **Configure Auth0** - Set up your Auth0 application
2. **Add Tokens** - Connect services in the Vault tab
3. **Configure AI Agents** - Add your API keys and select models in the Agent tab
4. **Chat** - Click "Chat" on any agent to start a conversation

---

## License

MIT

---

## Version History

- **v1.0.0** - Initial release with Token Vault, AI Agents, and chat functionality

---

*Built with ❤️ and a lot of coffee*