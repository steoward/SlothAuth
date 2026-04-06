import React from 'react';

interface IconProps { size?: number; className?: string }

export const LockIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="3" y="7" width="10" height="8" rx="1.5" fill="currentColor" />
    <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" fill="none" />
    <circle cx="8" cy="11" r="1.2" fill="var(--bg,#0B1D3A)" />
    <rect x="7.35" y="11" width="1.3" height="1.8" rx="0.65" fill="var(--bg,#0B1D3A)" />
  </svg>
);

export const ClipboardIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="3" y="3" width="10" height="12" rx="1.5" stroke="currentColor"
      strokeWidth="1.4" fill="none" />
    <path d="M6 3V2.5A1.5 1.5 0 0 1 9.5 2.5V3" stroke="currentColor"
      strokeWidth="1.4" strokeLinecap="round" fill="none" />
    <line x1="5.5" y1="7" x2="10.5" y2="7" stroke="currentColor"
      strokeWidth="1.2" strokeLinecap="round" />
    <line x1="5.5" y1="9.5" x2="10.5" y2="9.5" stroke="currentColor"
      strokeWidth="1.2" strokeLinecap="round" />
    <line x1="5.5" y1="12" x2="8.5" y2="12" stroke="currentColor"
      strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

export const BoltIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M9.5 2 L4 9h4.5L6.5 14 L13 7H8.5L9.5 2Z" fill="currentColor" />
  </svg>
);

export const ShieldIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M8 2L3 4.5V8c0 3 2.5 5 5 5.5C11 13 13 11 13 8V4.5L8 2Z"
      stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round" />
    <path d="M5.5 8l1.8 1.8L11 6" stroke="currentColor"
      strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── AI Agent Icons ────────────────────────────────────────
export const SparkleIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="8" cy="8" r="2.5" fill="currentColor" />
    <path d="M8 2v2M8 12v2M2 8h2M12 8h2M3.5 3.5l1.5 1.5M11 11l1.5 1.5M3.5 12.5l1.5-1.5M11 5l1.5-1.5" 
      stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

export const SendIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const BotIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="2" y="4" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.3" fill="none" />
    <circle cx="5.5" cy="7.5" r="1" fill="currentColor" />
    <circle cx="10.5" cy="7.5" r="1" fill="currentColor" />
    <path d="M5 11h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M8 2v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

export const TrashIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M3 4h10M6 4V3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1M12 4v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4" 
      stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M5 7v4M8 7v4M6 4v1h4V4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

export const CodeIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M5 4L1 8L5 12M11 4L15 8L11 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const FileIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M4 2h5l4 4v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.3" fill="none"/>
    <path d="M9 2v4h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

export const GlobeIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" fill="none"/>
    <path d="M2 8h12M8 2c-2 2-2 10 0 12M8 2c2 2 2 10 0 12" stroke="currentColor" strokeWidth="1.1"/>
  </svg>
);

export const ApiIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M2 8V5a2 2 0 0 1 2-2h1M14 8V5a2 2 0 0 0-2-2h-1M2 8v3a2 2 0 0 0 2 2h1M14 8v3a2 2 0 0 1-2 2h-1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    <circle cx="6" cy="8" r="1.5" fill="currentColor"/>
    <circle cx="10" cy="8" r="1.5" fill="currentColor"/>
  </svg>
);

export const VolumeIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M3 5h2l2-2h3l2 2h2v6h-2l-2 2h-3l-2-2H3V5z" fill="currentColor"/>
    <path d="M10 5c1 1 1 4 0 5M12 4c1.5 1.5 1.5 5 0 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

export const KeyIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="6" cy="6" r="3.5" stroke="currentColor" strokeWidth="1.3" fill="none" />
    <path d="M9 9l5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M11 9l2 2M13 7l-2 2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
  </svg>
);

export const HomeIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M2 8l6-5.5L14 8v6a1.5 1.5 0 0 1-1.5 1.5h-3v-4h-3v4h-3A1.5 1.5 0 0 1 2 14V8z" 
      fill="currentColor" />
    <path d="M8 2v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const FingerprintIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M8 2c-3 0-5.5 2-6 5.5C1.5 10 2 12 4 13c1.5 1 3 1 4.5 0 2-1 2.5-3 2-5.5C11.5 4 9 2 8 2z" 
      stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    <path d="M5 8.5c0 1.5 1 2.5 3 2.5s3-1 3-2.5c0-1-.5-2-1.5-2.5" 
      stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    <path d="M6.5 10c.5 1 1.5 1.5 1.5 1.5M8 11.5v1.5" 
      stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

export const UserIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="8" cy="5.5" r="3" stroke="currentColor" strokeWidth="1.3" fill="none" />
    <path d="M3 14c0-2.5 2-4.5 5-4.5s5 2 5 4.5" stroke="currentColor" strokeWidth="1.3" 
      strokeLinecap="round" fill="none" />
  </svg>
);

export const ChatBubbleIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M3 3h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H5l-3 2V4a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
