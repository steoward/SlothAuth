export interface ActivityEvent {
  id: number;
  type: 'login' | 'logout' | 'token_issued' | 'vault_connect' | 'vault_exchange' | 'step_up' | 'error' | 'agent_config';
  message: string;
  timestamp: Date;
  service?: string;
}

export interface VaultService {
  id: string;
  name: string;
  icon: string;
  connection: string;
  scopes: string[];
}

export interface UserIdentity {
  provider: string;
  connection: string;
  user_id: string;
  isSocial: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export type AIProvider = 'anthropic' | 'openai' | 'google' | 'openrouter';

export interface AgentConfig {
  id: string;
  provider: AIProvider;
  model: string;
  apiKey: string;
  name: string;
  capabilities: string[];
  isActive: boolean;
  createdAt: Date;
}

export const PROVIDER_MODELS: Record<AIProvider, { name: string; models: string[] }> = {
  anthropic: {
    name: 'Anthropic',
    models: ['claude-3-5-sonnet-20241022', 'claude-3-opus-20240229', 'claude-3-haiku-20240307']
  },
  openai: {
    name: 'OpenAI',
    models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo']
  },
  google: {
    name: 'Google',
    models: ['gemini-1.5-pro', 'gemini-1.5-flash', 'gemini-1.0-pro']
  },
  openrouter: {
    name: 'OpenRouter',
    models: ['anthropic/claude-3.5-sonnet', 'openai/gpt-4o', 'google/gemini-1.5-pro', 'meta-llama/llama-3.1-70b-instruct']
  }
};

export interface VaultCapability {
  name: string;
  description: string;
  scopes: string[];
}
