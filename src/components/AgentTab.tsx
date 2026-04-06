import React, { useState, useEffect, useRef } from 'react';
import type { AgentConfig, AIProvider } from '../types';
import { PROVIDER_MODELS } from '../types';
import { BotIcon, KeyIcon, TrashIcon, CodeIcon, FileIcon, GlobeIcon, ApiIcon, SendIcon, ChatBubbleIcon } from './Icons';

const DEFAULT_MODELS: Record<AIProvider, string> = {
  anthropic: 'claude-3-5-sonnet-20241022',
  openai: 'gpt-4o',
  google: 'gemini-1.5-pro',
  openrouter: 'anthropic/claude-3.5-sonnet'
};

const CAPABILITY_ICONS: Record<string, React.ReactNode> = {
  web_search: <GlobeIcon size={16} />,
  code_execution: <CodeIcon size={16} />,
  file_read: <FileIcon size={16} />,
  file_write: <FileIcon size={16} />,
  browser: <GlobeIcon size={16} />,
  api_calls: <ApiIcon size={16} />,
};

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AgentTab: React.FC = () => {
  const [agents, setAgents] = useState<AgentConfig[]>(() => {
    const saved = localStorage.getItem('sloth-agents');
    return saved ? JSON.parse(saved) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [editingAgent, setEditingAgent] = useState<AgentConfig | null>(null);
  const [activeAgentId, setActiveAgentId] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('sloth-agents', JSON.stringify(agents));
  }, [agents]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getActiveAgent = () => agents.find(a => a.id === activeAgentId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newAgent: AgentConfig = {
      id: editingAgent?.id || Date.now().toString(),
      name: formData.name || `Agent ${agents.length + 1}`,
      provider: formData.provider,
      model: formData.model,
      apiKey: formData.apiKey,
      capabilities: formData.capabilities,
      isActive: true,
      createdAt: editingAgent?.createdAt || new Date()
    };

    if (editingAgent) {
      setAgents(prev => prev.map(a => a.id === editingAgent.id ? newAgent : a));
    } else {
      setAgents(prev => [...prev, newAgent]);
    }

    setFormData({
      name: '',
      provider: 'anthropic',
      model: DEFAULT_MODELS['anthropic'],
      apiKey: '',
      capabilities: []
    });
    setShowForm(false);
    setEditingAgent(null);
  };

  const [formData, setFormData] = useState({
    name: '',
    provider: 'anthropic' as AIProvider,
    model: DEFAULT_MODELS['anthropic'],
    apiKey: '',
    capabilities: [] as string[]
  });

  const handleProviderChange = (provider: AIProvider) => {
    setFormData(prev => ({
      ...prev,
      provider,
      model: DEFAULT_MODELS[provider]
    }));
  };

  const handleCapabilityToggle = (cap: string) => {
    setFormData(prev => ({
      ...prev,
      capabilities: prev.capabilities.includes(cap)
        ? prev.capabilities.filter(c => c !== cap)
        : [...prev.capabilities, cap]
    }));
  };

  const handleEdit = (agent: AgentConfig) => {
    setEditingAgent(agent);
    setFormData({
      name: agent.name,
      provider: agent.provider,
      model: agent.model,
      apiKey: agent.apiKey,
      capabilities: agent.capabilities
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setAgents(prev => prev.filter(a => a.id !== id));
    if (activeAgentId === id) {
      setActiveAgentId(null);
      setChatOpen(false);
    }
  };

  const handleToggleActive = (id: string) => {
    setAgents(prev => prev.map(a => 
      a.id === id ? { ...a, isActive: !a.isActive } : a
    ));
  };

  const handleChat = async () => {
    if (!input.trim() || !activeAgentId) return;
    
    const agent = getActiveAgent();
    if (!agent) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await callAI(agent, [...messages, userMessage]);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Error: ${error instanceof Error ? error.message : 'Failed to get response'}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const callAI = async (agent: AgentConfig, history: ChatMessage[]): Promise<string> => {
    const messages = history.map(m => ({
      role: m.role,
      content: m.content
    }));

    let url = '';
    let headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    let body: Record<string, unknown>;

    switch (agent.provider) {
      case 'anthropic':
        url = 'https://api.anthropic.com/v1/messages';
        headers['x-api-key'] = agent.apiKey;
        headers['anthropic-version'] = '2023-06-01';
        body = {
          model: agent.model,
          max_tokens: 1024,
          messages
        };
        break;
      case 'openai':
        url = 'https://api.openai.com/v1/chat/completions';
        headers['Authorization'] = `Bearer ${agent.apiKey}`;
        body = {
          model: agent.model,
          messages
        };
        break;
      case 'google':
        url = `https://generativelanguage.googleapis.com/v1beta/models/${agent.model}:generateContent?key=${agent.apiKey}`;
        body = {
          contents: messages.map(m => ({ role: m.role, parts: [{ text: m.content }] }))
        };
        break;
      case 'openrouter':
        url = 'https://openrouter.ai/api/v1/chat/completions';
        headers['Authorization'] = `Bearer ${agent.apiKey}`;
        headers['HTTP-Referer'] = window.location.origin;
        body = {
          model: agent.model,
          messages
        };
        break;
      default:
        throw new Error('Unknown provider');
    }

    const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) });
    
    if (!res.ok) {
      const error = await res.text();
      throw new Error(error);
    }

    const data = await res.json();

    switch (agent.provider) {
      case 'anthropic':
        return data.content[0].text;
      case 'openai':
      case 'openrouter':
        return data.choices[0].message.content;
      case 'google':
        return data.candidates[0].content.parts[0].text;
      default:
        return '';
    }
  };

  const capabilityOptions = [
    { id: 'web_search', name: 'Search', desc: 'Search the internet' },
    { id: 'code_execution', name: 'Code', desc: 'Execute code' },
    { id: 'file_read', name: 'Read', desc: 'Read files' },
    { id: 'file_write', name: 'Write', desc: 'Write files' },
    { id: 'browser', name: 'Browser', desc: 'Control browser' },
    { id: 'api_calls', name: 'API', desc: 'Make API calls' },
  ];

  return (
    <div className={chatOpen ? 'agent-chat-open' : ''}>
      <p className="section-title">AI Agents</p>
      <p className="section-sub">Configure & chat with your agents</p>

      {agents.length === 0 && !showForm && (
        <div className="vault-empty-msg">
          <BotIcon size={32} />
          <p>No agents configured</p>
          <p className="text-sm">Add your first AI agent to get started</p>
        </div>
      )}

      {agents.map(agent => (
        <div key={agent.id} className={`agent-card ${activeAgentId === agent.id ? 'active-agent' : ''}`}>
          <div className="agent-header">
            <BotIcon size={20} />
            <span className="agent-name">{agent.name}</span>
            <span className={`agent-status ${agent.isActive ? 'active' : 'inactive'}`}>
              {agent.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          <div className="agent-details">
            <span className="agent-provider">{PROVIDER_MODELS[agent.provider].name}</span>
            <span className="agent-model">{agent.model}</span>
          </div>
          <div className="agent-caps">
            {agent.capabilities.map(cap => (
              <span key={cap} className="agent-cap">{cap}</span>
            ))}
          </div>
          <div className="agent-actions">
            <button onClick={() => { setActiveAgentId(agent.id); setMessages([]); setChatOpen(true); }} className="btn-chat-prominent">
              <ChatBubbleIcon size={14} />
              <span>Chat</span>
            </button>
            <button onClick={() => handleToggleActive(agent.id)} className="btn-small">
              {agent.isActive ? 'Off' : 'On'}
            </button>
            <button onClick={() => handleEdit(agent)} className="btn-small">Edit</button>
            <button onClick={() => handleDelete(agent.id)} className="btn-small btn-danger">
              <TrashIcon size={12} />
            </button>
          </div>
        </div>
      ))}

      {showForm && (
        <form onSubmit={handleSubmit} className="agent-form">
          <div className="form-group">
            <label>Agent Name</label>
            <input type="text" value={formData.name} onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))} placeholder="My AI Agent" />
          </div>
          <div className="form-group">
            <label>Provider</label>
            <select value={formData.provider} onChange={e => handleProviderChange(e.target.value as AIProvider)}>
              {Object.entries(PROVIDER_MODELS).map(([key, value]) => (
                <option key={key} value={key}>{value.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Model</label>
            <input type="text" value={formData.model} onChange={e => setFormData(prev => ({ ...prev, model: e.target.value }))} placeholder="e.g., gpt-4o" />
          </div>
          <div className="form-group">
            <label><KeyIcon size={14} /> API Key</label>
            <input type="password" value={formData.apiKey} onChange={e => setFormData(prev => ({ ...prev, apiKey: e.target.value }))} placeholder="Enter your API key" required />
          </div>
          <div className="form-group">
            <label>Capabilities</label>
            <div className="capabilities-grid">
              {capabilityOptions.map(cap => (
                <label key={cap.id} className={`capability-checkbox ${formData.capabilities.includes(cap.id) ? 'checked' : ''}`}>
                  <input type="checkbox" checked={formData.capabilities.includes(cap.id)} onChange={() => handleCapabilityToggle(cap.id)} />
                  <span className="cap-icon">{CAPABILITY_ICONS[cap.id]}</span>
                  <span className="cap-name">{cap.name}</span>
                  <span className="cap-tooltip">{cap.desc}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="form-actions">
            <button type="button" onClick={() => { setShowForm(false); setEditingAgent(null); }} className="btn-cancel">Cancel</button>
            <button type="submit" className="btn-save">{editingAgent ? 'Update' : 'Save'}</button>
          </div>
        </form>
      )}

      {!showForm && (
        <button onClick={() => setShowForm(true)} className="add-agent-btn">+ Add AI Agent</button>
      )}

      {chatOpen && (
        <div className="chat-panel">
          <div className="chat-header">
            <span className="chat-title">{getActiveAgent()?.name || 'Agent'}</span>
            <div className="chat-controls">
              <button className="close-chat" onClick={() => setChatOpen(false)}>×</button>
            </div>
          </div>
          <div className="chat-messages">
            {messages.length === 0 && (
              <div className="chat-empty">
                <BotIcon size={32} />
                <p>Start chatting with {getActiveAgent()?.name}</p>
              </div>
            )}
            {messages.map(msg => (
              <div key={msg.id} className={`chat-message ${msg.role}`}>
                <div className="chat-bubble">{msg.content}</div>
              </div>
            ))}
            {isLoading && <div className="chat-loading">Thinking...</div>}
            <div ref={chatEndRef} />
          </div>
          <form onSubmit={(e) => { e.preventDefault(); handleChat(); }} className="chat-input">
            <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Type your message..." disabled={isLoading} />
            <button type="submit" disabled={isLoading || !input.trim()}>
              <SendIcon size={16} />
            </button>
          </form>
        </div>
      )}

      <div className="sloth-footer">
        <span className="footer-pip" />
        {agents.length} agent{agents.length !== 1 ? 's' : ''} configured
        <span className="footer-pip" />
      </div>
    </div>
  );
};

export default AgentTab;
