import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import SlothParticles from './SlothParticles';
import type { SlothMood } from './SlothSVG';
import { LockIcon, ClipboardIcon, BoltIcon, ShieldIcon, UserIcon } from './Icons';
import VaultTab from './VaultTab';
import ActivityTab from './ActivityTab';
import AgentTab from './AgentTab';
import type { ActivityEvent, UserIdentity } from '../types';

// ─── Auth0 config (mirrors main.tsx) ─────────────────────
const AUTH0_DOMAIN = 'sloth-auth.us.auth0.com';
const CLIENT_ID    = 'MzKoAZf18rONhnjBrqlRJxCKF2vqmojq';

// ─── JWT helpers ──────────────────────────────────────────
interface JWTClaims {
  sub?: string;
  iat?: number;
  exp?: number;
  scope?: string;
  aud?: string | string[];
}

const decodeJWT = (token: string): JWTClaims | null => {
  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(payload)) as JWTClaims;
  } catch {
    return null;
  }
};

const getExpiryPercent = (claims: JWTClaims): number => {
  if (!claims.exp || !claims.iat) return 100;
  const total   = claims.exp - claims.iat;
  const elapsed = Math.floor(Date.now() / 1000) - claims.iat;
  return Math.max(0, Math.min(100, ((total - elapsed) / total) * 100));
};

const formatCountdown = (exp: number): string => {
  const s = exp - Math.floor(Date.now() / 1000);
  if (s <= 0)      return 'Expired';
  if (s < 3600)    return `${Math.floor(s / 60)}m ${s % 60}s`;
  return `${Math.floor(s / 3600)}h ${Math.floor((s % 3600) / 60)}m`;
};

// ─── Tab type ─────────────────────────────────────────────
type Tab = 'identity' | 'vault' | 'activity' | 'agent';

// ════════════════════════════════════════════════════════════
const SlothAssistant: React.FC = () => {
  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    isLoading,
    error,
    getAccessTokenSilently,
  } = useAuth0();

  // ── UI state ─────────────────────────────────────────────
  const [tab,    setTab]    = useState<Tab>('identity');
  const [mood,   setMood]   = useState<SlothMood>('waving');
  const [status, setStatus] = useState('Welcome! I am your Sloth Auth assistant.');

  // ── Token state ───────────────────────────────────────────
  const [accessToken,    setAccessToken]    = useState<string | null>(null);
  const [tokenClaims,    setTokenClaims]    = useState<JWTClaims | null>(null);
  const [countdown,      setCountdown]      = useState<string>('');
  const [userIdentities, setUserIdentities] = useState<UserIdentity[]>([]);

  // ── Activity log ──────────────────────────────────────────
  const [events, setEvents] = useState<ActivityEvent[]>([]);

  const addEvent = useCallback(
    (type: ActivityEvent['type'], message: string, service?: string) => {
      setEvents((prev) =>
        [{ id: Date.now(), type, message, timestamp: new Date(), service }, ...prev].slice(0, 60)
      );
    },
    []
  );

  // ── Countdown ticker ──────────────────────────────────────
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (!tokenClaims?.exp) return;
    tickRef.current = setInterval(() => setCountdown(formatCountdown(tokenClaims.exp!)), 1000);
    setCountdown(formatCountdown(tokenClaims.exp));
    return () => { if (tickRef.current) clearInterval(tickRef.current); };
  }, [tokenClaims]);

  // ── Auth side effects ─────────────────────────────────────
  useEffect(() => {
    if (isLoading) {
      setMood('sleeping');
      setStatus('Sloth is waking up... Please wait.');
      return;
    }

    if (error) {
      setMood('confused');
      setStatus('Oops! Something went wrong: ' + error.message);
      addEvent('error', error.message);
      return;
    }

    if (isAuthenticated && user) {
      setMood('thumbsUp');
      setStatus(`Secured as ${user.name ?? user.email}.`);
      addEvent('login', `Authenticated: ${user.email ?? user.sub}`);

      // ── Fetch access token + decode JWT ───────────────────
      getAccessTokenSilently()
        .then((token) => {
          setAccessToken(token);
          const claims = decodeJWT(token);
          setTokenClaims(claims);
          addEvent('token_issued', 'Access token issued by Auth0');

          // ── Fetch user profile with identities (Management API) ──
          return fetch(`https://${AUTH0_DOMAIN}/api/v2/users/${user.sub}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        })
        .then((r) => r.json())
        .then((profile) => {
          if (Array.isArray(profile.identities)) {
            setUserIdentities(profile.identities as UserIdentity[]);
          }
        })
        .catch((e: unknown) => {
          console.warn('Profile fetch:', e);
        });

      return;
    }

    // Not authenticated
    setMood('waving');
    setStatus('Ready to secure your session. Click below to authenticate.');
    setAccessToken(null);
    setTokenClaims(null);
    setUserIdentities([]);
  }, [isLoading, isAuthenticated, user, error, getAccessTokenSilently, addEvent]);

  // ─── Connect external service via Auth0 ───────────────────
  const connectService = (connection: string) => {
    addEvent('vault_connect', `Initiating OAuth flow for ${connection}...`, connection);
    loginWithRedirect({
      authorizationParams: { connection },
    });
  };

  // ─── Refresh identities after OAuth redirect ─────────────
  const refreshIdentities = useCallback(() => {
    if (!isAuthenticated || !user?.sub || !getAccessTokenSilently) return;
    
    getAccessTokenSilently()
      .then((token) =>
        fetch(`https://${AUTH0_DOMAIN}/api/v2/users/${user.sub}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      )
      .then((r) => r.json())
      .then((profile) => {
        if (Array.isArray(profile.identities)) {
          setUserIdentities(profile.identities as UserIdentity[]);
          addEvent('vault_connect', 'Identities refreshed from Auth0');
        }
      })
      .catch((e: unknown) => {
        console.warn('Profile refresh:', e);
      });
  }, [isAuthenticated, user, getAccessTokenSilently, addEvent]);

  // ─── Refresh identities on return from OAuth ─────────────────
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('code') || params.get('state')) {
      setTimeout(() => refreshIdentities(), 1500);
    }
  }, [refreshIdentities]);

  // ─── Loading state ────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="sloth-card sloth-loading">
        <span className="loading-emoji"><SlothParticles mood="sleeping" size={80} /></span>
        <div className="loading-spinner" />
        <p className="sloth-status-text">Sloth is waking up...</p>
      </div>
    );
  }

  // ─── Expiry bar class ─────────────────────────────────────
  const pct = tokenClaims ? getExpiryPercent(tokenClaims) : 100;
  const barClass = pct > 50 ? 'healthy' : pct > 20 ? 'warning' : 'critical';
  const countdownClass =
    pct > 50 ? '' : pct > 20 ? 'expiring' : 'critical';

  // ════════════════════════════════════════════════════════════
  return (
    <div className="sloth-card">

      {/* ── Tab bar ─────────────────────────────────────── */}
      <div className="tab-bar">
        {(
          [
            { id: 'identity', icon: <UserIcon size={16} />, label: 'Identity' },
            { id: 'vault',    icon: <LockIcon size={15} />,      label: 'Vault'    },
            { id: 'activity', icon: <ClipboardIcon size={15} />, label: 'Activity' },
            { id: 'agent', icon: <BoltIcon size={15} />, label: 'Agent' },
          ] as { id: Tab; icon: React.ReactNode; label: string }[]
        ).map((t) => (
          <button
            key={t.id}
            className={`tab-btn ${tab === t.id ? 'active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            <span className="tab-icon">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* ══ IDENTITY TAB ════════════════════════════════════ */}
      {tab === 'identity' && (
        <>
          {/* Sloth avatar — particle swarm */}
          <div className="sloth-avatar-wrap">
            <SlothParticles mood={mood} size={220} />
          </div>

          <h2 className="sloth-title">Sloth Auth</h2>

          {/* Connection badge */}
          <div className={`status-badge ${isAuthenticated ? 'is-auth' : 'is-unauth'}`}>
            <span className="status-dot" />
            {isAuthenticated ? 'Session Secured' : 'Not Connected'}
          </div>

          <p className="sloth-status-text">{status}</p>

          {/* ── JWT claims card ─────────────────────────── */}
          {isAuthenticated && tokenClaims && (
            <div className="token-card">
              <div className="token-card-title"><BoltIcon size={14} /> Active Token Claims</div>

              {tokenClaims.sub && (
                <div className="token-claim">
                  <span className="claim-key">Subject</span>
                  <span className="claim-value">
                    {tokenClaims.sub.includes('|')
                      ? tokenClaims.sub.split('|').slice(-1)[0]
                      : tokenClaims.sub}
                  </span>
                </div>
              )}

              <div className="token-claim">
                <span className="claim-key">Expires In</span>
                <span className={`claim-value ${countdownClass}`}>{countdown}</span>
              </div>

              {tokenClaims.scope && (
                <div className="token-claim">
                  <span className="claim-key">Scopes</span>
                  <span className="claim-value">
                    {tokenClaims.scope.split(' ').length} granted
                  </span>
                </div>
              )}

              {/* Token health bar */}
              <div className="expiry-bar-wrap">
                <div
                  className={`expiry-bar ${barClass}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          )}

          {/* ── Auth actions ─────────────────────────────── */}
          {!isAuthenticated ? (
            <button
              className="btn-clay btn-login"
              onClick={() => loginWithRedirect()}
            >
              <ShieldIcon size={16} /> Authenticate with Auth0
            </button>
          ) : (
            <div className="btn-group">
              {/* User bento card */}
              <div className="user-bento">
                <div className="user-avatar-clay"><UserIcon size={26} /></div>
                <div className="user-info">
                  <div className="user-label">Authenticated Agent</div>
                  <div className="user-email">{user?.email}</div>
                </div>
              </div>

              {/* Step-up + Sign out side by side */}
              <div className="btn-row">
                <button
                  className="btn-clay btn-step-up"
                  onClick={() => {
                    addEvent('step_up', 'Step-up MFA authentication requested');
                    loginWithRedirect({
                      authorizationParams: {
                        acr_values:
                          'http://schemas.openid.net/pape/policies/2007/06/multi-factor',
                      },
                    });
                  }}
                >
                  <BoltIcon size={14} /> Elevate
                </button>
                <button
                  className="btn-clay btn-logout"
                  onClick={() => {
                    addEvent('logout', `Session ended: ${user?.email}`);
                    logout({ logoutParams: { returnTo: window.location.origin } });
                  }}
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}

          <div className="sloth-footer">
            <span className="footer-pip" />
            Powered by Auth0 Token Vault
            <span className="footer-pip" />
          </div>
        </>
      )}

      {/* ══ VAULT TAB ═══════════════════════════════════════ */}
      {tab === 'vault' && (
        <VaultTab
          accessToken={accessToken}
          userIdentities={userIdentities}
          auth0Domain={AUTH0_DOMAIN}
          clientId={CLIENT_ID}
          onEvent={addEvent}
          onConnect={connectService}
        />
      )}

      {/* ══ ACTIVITY TAB ════════════════════════════════════ */}
      {tab === 'activity' && (
        <ActivityTab
          events={events}
          onClear={() => setEvents([])}
        />
      )}

      {/* ══ AGENT TAB ════════════════════════════════════════ */}
      {tab === 'agent' && (
        <AgentTab />
      )}
    </div>
  );
};

export default SlothAssistant;
