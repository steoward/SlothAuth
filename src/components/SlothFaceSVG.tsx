import React from 'react';

interface SlothFaceSVGProps {
  size?: number;
}

const SlothFaceSVG: React.FC<SlothFaceSVGProps> = ({ size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      aria-label="Sloth"
      style={{ display: 'block' }}
    >
      <defs>
        <linearGradient id="slothHead" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8B7355" />
          <stop offset="100%" stopColor="#6B5344" />
        </linearGradient>
      </defs>

      <ellipse cx="20" cy="21" rx="16" ry="14" fill="url(#slothHead)" />

      <ellipse cx="20" cy="22" rx="11" ry="10" fill="#A89080" />

      <circle cx="13" cy="19" r="5" fill="#3D2B1F" />
      <circle cx="27" cy="19" r="5" fill="#3D2B1F" />
      
      <circle cx="13" cy="19" r="3.5" fill="#FFF8F0" />
      <circle cx="27" cy="19" r="3.5" fill="#FFF8F0" />
      
      <circle cx="13" cy="18" r="2" fill="#1A1A1A" />
      <circle cx="27" cy="18" r="2" fill="#1A1A1A" />
      
      <circle cx="12" cy="17.5" r="0.8" fill="#FFFFFF" />
      <circle cx="26" cy="17.5" r="0.8" fill="#FFFFFF" />

      <ellipse cx="20" cy="25" rx="3.5" ry="2.5" fill="#2D1F14" />
      <ellipse cx="19.2" cy="24.2" rx="1.2" ry="0.8" fill="rgba(255,255,255,0.25)" />

      <path d="M 15 29 Q 20 32.5 25 29" 
            stroke="#2D1F14" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      <ellipse cx="10" cy="24" rx="2.5" ry="1.5" fill="#D4A5A5" opacity="0.4" />
      <ellipse cx="30" cy="24" rx="2.5" ry="1.5" fill="#D4A5A5" opacity="0.4" />

      <circle cx="7" cy="10" r="3.5" fill="#6B5344" />
      <circle cx="33" cy="10" r="3.5" fill="#6B5344" />
    </svg>
  );
};

export default SlothFaceSVG;
