import React, { useEffect, useState } from 'react';
import type { ActivityEvent } from '../types';
import { UserIcon } from './Icons';

// ─── Event dot helpers ────────────────────────────────────
const Dot = ({ cls }: { cls: string }) => (
  <span className={`ev-dot ${cls}`} />
);

const EVENT_META: Record<
  ActivityEvent['type'],
  { icon: React.ReactNode; label: string }
> = {
  login:          { icon: <Dot cls="ev-login"    />, label: 'Auth'     },
  logout:         { icon: <Dot cls="ev-logout"   />, label: 'Logout'   },
  token_issued:   { icon: <Dot cls="ev-token"    />, label: 'Token'    },
  vault_connect:  { icon: <Dot cls="ev-vault"    />, label: 'Vault'    },
  vault_exchange: { icon: <Dot cls="ev-exchange" />, label: 'Exchange' },
  step_up:        { icon: <Dot cls="ev-stepup"   />, label: 'Step-up'  },
  error:          { icon: <Dot cls="ev-error"    />, label: 'Error'    },
  agent_config:   { icon: <Dot cls="ev-vault"    />, label: 'Agent'    },
};

const getRelativeTime = (date: Date): string => {
  const s = Math.floor((Date.now() - date.getTime()) / 1000);
  if (s <    60) return `${s}s ago`;
  if (s <  3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
};

interface ActivityTabProps {
  events: ActivityEvent[];
  onClear: () => void;
}

const ActivityTab: React.FC<ActivityTabProps> = ({ events, onClear }) => {
  const [, tick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => tick((t) => t + 1), 15_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="activity-header">
        <div>
          <p className="section-title">Agent Activity</p>
          <p className="section-sub">Real-time audit log</p>
        </div>
        {events.length > 0 && (
          <button className="clear-btn" onClick={onClear}>Clear</button>
        )}
      </div>

      {/* Event list */}
      <div className="activity-list">
        {events.length === 0 ? (
          <div className="activity-empty">
            <div style={{ marginBottom: 10 }}><UserIcon size={44} /></div>
            No activity yet.
            <br />
            Authenticate to begin.
          </div>
        ) : (
          events.map((event) => {
            const meta = EVENT_META[event.type] ?? {
              icon: <Dot cls="ev-login" />,
              label: event.type,
            };
            return (
              <div key={event.id} className="activity-item">
                <span className="activity-icon">{meta.icon}</span>
                <div className="activity-content">
                  <div className="activity-msg">{event.message}</div>
                  <div className="activity-time">{getRelativeTime(event.timestamp)}</div>
                </div>
                {event.service && (
                  <span className="activity-service">{event.service}</span>
                )}
              </div>
            );
          })
        )}
      </div>

      {events.length > 0 && (
        <p className="activity-count">
          {events.length} event{events.length !== 1 ? 's' : ''} recorded
        </p>
      )}

      <div className="sloth-footer" style={{ marginTop: events.length > 0 ? 8 : 16 }}>
        <span className="footer-pip" />
        Immutable audit trail · Auth0 secured
        <span className="footer-pip" />
      </div>
    </div>
  );
};

export default ActivityTab;
