import React, { useState } from 'react';
import type { VaultService, UserIdentity } from '../types';
import { BoltIcon } from './Icons';

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  github: (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.18.58.69.48C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" fill="#24292F"/>
    </svg>
  ),
  google: (
    <svg viewBox="0 0 24 24" width="28" height="28">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  ),
  slack: (
    <svg viewBox="0 0 24 24" width="28" height="28">
      <path fill="#E01E5A" d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
    </svg>
  ),
  notion: (
    <svg viewBox="0 0 24 24" width="28" height="28">
      <rect width="24" height="24" rx="4" fill="#000000"/>
      <path fill="#FFFFFF" d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 2.05c-.467-.373-.98-.56-2.055-.466L2.75 2.667c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.934zm14.337.745c.093.42 0 .84-.42.888l-.7.14v9.92c-.607.327-1.167.467-1.633.467-.747 0-.933-.234-1.493-.887l-4.577-7.186v6.952l1.448.327s0 .84-1.168.84l-3.22.187c-.094-.187 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.454-.233 4.76 7.279v-6.44l-1.213-.14c-.093-.514.28-.887.747-.933zM2.75 1.172l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.933.653.933 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.447-.093-1.96-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.892c0-.84.374-1.54 1.447-1.72z"/>
    </svg>
  ),
  linear: (
    <svg viewBox="0 0 24 24" width="28" height="28">
      <path fill="#5E6AD2" d="M1.71 6.75c0-.6.21-1.14.63-1.63.42-.48.96-.72 1.62-.72h3.6c.63 0 1.17.24 1.62.72.45.48.66 1.02.66 1.62v4.86c0 .6-.21 1.14-.63 1.63-.42.48-.96.72-1.62.72H3.96c-.63 0-1.17-.24-1.62-.72-.45-.48-.66-1.02-.66-1.62V6.75zm4.14 10.5c0-.6.21-1.14.63-1.63.42-.48.96-.72 1.62-.72h3.6c.63 0 1.17.24 1.62.72.45.48.66 1.02.66 1.62v4.86c0 .6-.21 1.14-.63 1.63-.42.48-.96.72-1.62.72H7.1c-.63 0-1.17-.24-1.62-.72-.45-.48-.66-1.02-.66-1.62v-4.86zm9.43-5.67c-.93-.93-2.01-1.4-3.24-1.4-1.23 0-2.31.47-3.24 1.4-.93.93-1.4 2.01-1.4 3.24 0 1.23.47 2.31 1.4 3.24.93.93 2.01 1.4 3.24 1.4 1.23 0 2.31-.47 3.24-1.4.93-.93 1.4-2.01 1.4-3.24 0-1.23-.47-2.31-1.4-3.24zm-.79 7.07c-.63-.63-1.4-.95-2.31-.95-.91 0-1.68.32-2.31.95-.63.63-.95 1.4-.95 2.31 0 .91.32 1.68.95 2.31.63.63 1.4.95 2.31.95.91 0 1.68-.32 2.31-.95.63-.63.95-1.4.95-2.31 0-.91-.32-1.68-.95-2.31z"/>
    </svg>
  ),
  microsoft: (
    <svg viewBox="0 0 24 24" width="28" height="28">
      <path fill="#F25022" d="M1 1h10v10H1z"/>
      <path fill="#00A4EF" d="M1 13h10v10H1z"/>
      <path fill="#7FBA00" d="M13 1h10v10H13z"/>
      <path fill="#FFB900" d="M13 13h10v10H13z"/>
    </svg>
  ),
};

// ─── Pre-integrated services (Token Vault supports 30+) ───
const SERVICES: VaultService[] = [
  { id: 'github',    name: 'GitHub',  icon: 'GH', connection: 'github',        scopes: ['repo', 'user:email'] },
  { id: 'google',    name: 'Google',  icon: 'G',  connection: 'google-oauth2',  scopes: ['drive', 'gmail']    },
  { id: 'slack',     name: 'Slack',   icon: 'SL', connection: 'slack',          scopes: ['chat:write']        },
  { id: 'notion',    name: 'Notion',  icon: 'N',  connection: 'notion',         scopes: ['read_content']      },
  { id: 'linear',    name: 'Linear',  icon: 'LN', connection: 'linear',         scopes: ['issues:write']      },
  { id: 'microsoft', name: 'MS 365',  icon: 'MS', connection: 'windowslive',    scopes: ['mail', 'calendar']  },
];

interface VaultTabProps {
  accessToken: string | null;
  userIdentities: UserIdentity[];
  auth0Domain: string;
  clientId: string;
  onEvent: (type: 'vault_connect' | 'vault_exchange' | 'error', message: string, service?: string) => void;
  onConnect: (connection: string) => void;
}

const VaultTab: React.FC<VaultTabProps> = ({
  accessToken,
  userIdentities,
  auth0Domain,
  clientId,
  onEvent,
  onConnect,
}) => {
  const [exchangedTokens, setExchangedTokens] = useState<Record<string, string>>({});
  const [loadingId, setLoadingId]             = useState<string | null>(null);
  const [exchangeError, setExchangeError]     = useState<string | null>(null);

  // Check if a service is connected via Auth0 identities
  const isConnected = (connection: string): boolean =>
    userIdentities.some(
      (id) => id.provider === connection || id.connection === connection
    );

  // RFC 8693 Token Exchange — the core Token Vault feature
  const exchangeToken = async (service: VaultService) => {
    if (!accessToken) return;
    setLoadingId(service.id);
    setExchangeError(null);

    try {
      const res = await fetch(`https://${auth0Domain}/oauth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grant_type:         'urn:ietf:params:oauth:grant-type:token-exchange',
          client_id:          clientId,
          subject_token:      accessToken,
          subject_token_type: 'urn:ietf:params:oauth:token-type:access_token',
          connection:         service.connection,
        }),
      });

      const data = await res.json();

      if (data.access_token) {
        setExchangedTokens((prev) => ({ ...prev, [service.id]: data.access_token }));
        onEvent('vault_exchange', `Token exchanged for ${service.name} via Token Vault`, service.name);
      } else {
        const msg = data.error_description ?? data.error ?? 'Token exchange failed';
        setExchangeError(msg);
        onEvent('error', `Vault exchange failed: ${service.name}`, service.name);
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Network error';
      setExchangeError(msg);
      onEvent('error', `Network error during vault exchange`, service.name);
    } finally {
      setLoadingId(null);
    }
  };

  const connectedServices = SERVICES.filter((s) => isConnected(s.connection));

  return (
    <div>
      {/* Header */}
      <p className="section-title">Token Vault</p>
      <p className="section-sub">Auth0 managed OAuth connections</p>

      {/* Service grid — 3 columns */}
      <div className="vault-grid">
        {SERVICES.map((service) => {
          const connected = isConnected(service.connection);
          return (
            <div key={service.id} className={`vault-card ${connected ? 'is-connected' : ''}`}>
              <span className="vault-icon-badge">{SERVICE_ICONS[service.id] || service.icon}</span>
              <span className="vault-name">{service.name}</span>

              <span className={`vault-status ${connected ? 'connected' : 'offline'}`}>
                <span className="vault-dot" />
                {connected ? 'Live' : 'Off'}
              </span>

              <button
                className={`vault-action-btn ${connected ? 'revoke' : 'connect'}`}
                onClick={() => {
                  if (connected) {
                    onEvent('vault_connect', `Revoked access: ${service.name}`, service.name);
                    // In production: call Management API to unlink identity
                  } else {
                    onEvent('vault_connect', `Connecting ${service.name}...`, service.name);
                    onConnect(service.connection);
                  }
                }}
              >
                {connected ? 'Revoke' : '+ Link'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Token Exchange — RFC 8693 */}
      <div className="exchange-section">
        <p className="section-title"><BoltIcon size={14} /> Token Exchange</p>
        <p className="section-sub">RFC 8693 · On-behalf-of pattern</p>

        {connectedServices.length === 0 ? (
          <p className="vault-empty-msg">
            Link a service above to exchange tokens
          </p>
        ) : (
          connectedServices.map((service) => {
            const hasToken  = !!exchangedTokens[service.id];
            const isLoading = loadingId === service.id;

            return (
              <div key={service.id} className="exchange-row">
                <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 22, height: 22, borderRadius: 6,
                    background: '#0B1D3A', color: '#FFFFFF',
                    fontSize: 8, fontWeight: 900, flexShrink: 0,
                  }}>{service.icon}</span>
                  {service.name}
                  <span style={{ fontSize: 9, color: '#9ca3af' }}>
                    {service.scopes.join(' · ')}
                  </span>
                </span>

                {hasToken ? (
                  <span className="exchange-success">✓ Ready</span>
                ) : (
                  <button
                    className="exchange-btn"
                    onClick={() => exchangeToken(service)}
                    disabled={!!loadingId}
                  >
                    {isLoading ? '...' : 'Get Token'}
                  </button>
                )}
              </div>
            );
          })
        )}

        {exchangeError && (
          <div className="vault-error">⚠️ {exchangeError}</div>
        )}
      </div>

      {/* Footer hint */}
      <div className="sloth-footer">
        <span className="footer-pip" />
        Token Vault · {connectedServices.length}/{SERVICES.length} services linked
        <span className="footer-pip" />
      </div>
    </div>
  );
};

export default VaultTab;
