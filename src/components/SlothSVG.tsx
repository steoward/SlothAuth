import React from 'react';

export type SlothMood = 'waving' | 'sleeping' | 'thumbsUp' | 'confused';

// ─── Palette ──────────────────────────────────────────────
const C = {
  fur:        '#8B6347',
  furMid:     '#A67B5B',
  furLight:   '#BF8B5E',
  furHi:      '#D4A070',
  furDark:    '#5C3D1E',
  face:       '#DEB887',
  faceMid:    '#D4A574',
  eyeRing:    '#3D1F0C',
  sclera:     '#F8F4EE',
  iris:       '#3B2010',
  pupil:      '#1A0800',
  eyeShine:   'rgba(255,255,255,0.92)',
  nosePad:    '#2D1608',
  mouth:      '#7A4828',
  claw:       '#E0D2BC',
  branchTop:  '#8D6E63',
  branchBot:  '#4E342E',
  belly:      '#C89660',
  blush:      'rgba(215,95,75,0.28)',
  zBlue:      '#93C5FD',
  zBlueDark:  '#60A5FA',
  sweat:      '#93C5FD',
} as const;

// ─── SVG gradient/filter defs ─────────────────────────────
const Defs: React.FC = () => (
  <defs>
    <linearGradient id="sg-branch" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stopColor={C.branchTop} />
      <stop offset="100%" stopColor={C.branchBot} />
    </linearGradient>
    <radialGradient id="sg-head" cx="42%" cy="32%" r="65%">
      <stop offset="0%"   stopColor={C.furHi}  />
      <stop offset="55%"  stopColor={C.furMid} />
      <stop offset="100%" stopColor={C.furDark} />
    </radialGradient>
    <radialGradient id="sg-face" cx="50%" cy="38%" r="60%">
      <stop offset="0%"   stopColor="#EEC990" />
      <stop offset="100%" stopColor={C.faceMid} />
    </radialGradient>
    <radialGradient id="sg-body" cx="40%" cy="30%" r="65%">
      <stop offset="0%"   stopColor={C.furLight} />
      <stop offset="100%" stopColor={C.furDark}  />
    </radialGradient>
    <radialGradient id="sg-eye" cx="35%" cy="30%" r="65%">
      <stop offset="0%"   stopColor={C.iris}  />
      <stop offset="100%" stopColor={C.pupil} />
    </radialGradient>
    <radialGradient id="sg-nose" cx="38%" cy="28%" r="62%">
      <stop offset="0%"   stopColor="#4A2418" />
      <stop offset="100%" stopColor={C.nosePad} />
    </radialGradient>
  </defs>
);

// ─── Branch ───────────────────────────────────────────────
const Branch: React.FC = () => (
  <g>
    <rect x="2" y="12" width="196" height="16" rx="8" fill="url(#sg-branch)" />
    {/* moss highlight */}
    <rect x="2" y="12" width="196" height="4" rx="2" fill="#A5D6A7" opacity="0.22" />
    {/* bark texture */}
    {([28, 58, 88, 112, 142, 172] as number[]).map((x, i) => (
      <line key={i} x1={x} y1="12" x2={x + (i % 2 === 0 ? -2 : 2)} y2="28"
            stroke="#3E2723" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
    ))}
    {/* subtle knot circles */}
    <ellipse cx="70"  cy="20" rx="5" ry="4" fill="#4E342E" opacity="0.3" />
    <ellipse cx="140" cy="20" rx="5" ry="4" fill="#4E342E" opacity="0.3" />
  </g>
);

// ─── Grip claws ───────────────────────────────────────────
const GripClaws: React.FC<{ cx: number; flip?: boolean }> = ({ cx, flip = false }) => {
  const s = flip ? -1 : 1;
  return (
    <g>
      <path d={`M ${cx - 5 * s} 12 C ${cx - 7 * s} 6 ${cx - 8 * s} 2 ${cx - 9 * s} 0`}
            stroke={C.claw} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d={`M ${cx} 11 C ${cx - s} 5 ${cx - s} 1 ${cx - s} -2`}
            stroke={C.claw} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d={`M ${cx + 5 * s} 12 C ${cx + 6 * s} 6 ${cx + 7 * s} 2 ${cx + 8 * s} 0`}
            stroke={C.claw} strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </g>
  );
};

// ─── Foot claws ───────────────────────────────────────────
const FootClaws: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g>
    <path d={`M ${x - 4} ${y} C ${x - 6} ${y + 5} ${x - 7} ${y + 8} ${x - 8} ${y + 10}`}
          stroke={C.claw} strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d={`M ${x}     ${y + 1} C ${x}     ${y + 6} ${x}     ${y + 9} ${x}     ${y + 11}`}
          stroke={C.claw} strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d={`M ${x + 4} ${y} C ${x + 6} ${y + 5} ${x + 7} ${y + 8} ${x + 8} ${y + 10}`}
          stroke={C.claw} strokeWidth="2" fill="none" strokeLinecap="round" />
  </g>
);

// ─── Arm ──────────────────────────────────────────────────
interface ArmProps {
  d: string;
  dHi: string;
  clawCx: number;
  flip?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
const Arm: React.FC<ArmProps> = ({ d, dHi, clawCx, flip, className, style }) => (
  <g className={className} style={style}>
    <path d={d}   stroke={C.furDark}  strokeWidth="14" fill="none" strokeLinecap="round" opacity="0.35" />
    <path d={d}   stroke={C.fur}      strokeWidth="13" fill="none" strokeLinecap="round" />
    <path d={dHi} stroke={C.furLight} strokeWidth="5"  fill="none" strokeLinecap="round" opacity="0.55" />
    <GripClaws cx={clawCx} flip={flip} />
  </g>
);

// ─── Body + legs (shared) ─────────────────────────────────
const Body: React.FC = () => (
  <>
    <ellipse cx="100" cy="156" rx="20" ry="26" fill="url(#sg-body)" />
    <ellipse cx="100" cy="160" rx="12" ry="16" fill={C.belly} opacity="0.55" />
    <rect x="83"  y="174" width="13" height="17" rx="6.5" fill={C.furMid} />
    <rect x="104" y="174" width="13" height="17" rx="6.5" fill={C.furMid} />
    <FootClaws x={89}  y={189} />
    <FootClaws x={110} y={189} />
  </>
);

// ─── Eye variants ─────────────────────────────────────────
const OpenEyes: React.FC = () => (
  <>
    <circle cx="80"  cy="87" r="12" fill={C.eyeRing} />
    <circle cx="120" cy="87" r="12" fill={C.eyeRing} />
    <circle cx="80"  cy="87" r="8.5" fill={C.sclera} />
    <circle cx="120" cy="87" r="8.5" fill={C.sclera} />
    <circle cx="81"  cy="88" r="5.5" fill="url(#sg-eye)" />
    <circle cx="121" cy="88" r="5.5" fill="url(#sg-eye)" />
    <circle cx="82"  cy="88.5" r="3" fill={C.pupil} />
    <circle cx="122" cy="88.5" r="3" fill={C.pupil} />
    <circle cx="84"  cy="86"   r="2" fill={C.eyeShine} />
    <circle cx="124" cy="86"   r="2" fill={C.eyeShine} />
    <circle cx="79"  cy="87.5" r="1" fill={C.eyeShine} opacity="0.55" />
    <circle cx="119" cy="87.5" r="1" fill={C.eyeShine} opacity="0.55" />
  </>
);

const HappyEyes: React.FC = () => (
  <>
    <circle cx="80"  cy="87" r="12" fill={C.eyeRing} />
    <circle cx="120" cy="87" r="12" fill={C.eyeRing} />
    <circle cx="80"  cy="87" r="8.5" fill={C.sclera} />
    <circle cx="120" cy="87" r="8.5" fill={C.sclera} />
    {/* squint: upper lid covers top */}
    <ellipse cx="80"  cy="85" rx="8.5" ry="5.5" fill={C.eyeRing} />
    <ellipse cx="120" cy="85" rx="8.5" ry="5.5" fill={C.eyeRing} />
    <circle cx="80"  cy="89.5" r="4.5" fill="url(#sg-eye)" />
    <circle cx="120" cy="89.5" r="4.5" fill="url(#sg-eye)" />
    <circle cx="80"  cy="89.5" r="2.5" fill={C.pupil} />
    <circle cx="120" cy="89.5" r="2.5" fill={C.pupil} />
    <circle cx="82"  cy="87"   r="1.8" fill={C.eyeShine} />
    <circle cx="122" cy="87"   r="1.8" fill={C.eyeShine} />
  </>
);

const SleepEyes: React.FC = () => (
  <>
    <circle cx="80"  cy="87" r="12" fill={C.eyeRing} />
    <circle cx="120" cy="87" r="12" fill={C.eyeRing} />
    {/* closed curved lids */}
    <path d="M 72 87 Q 80 93 88 87"   stroke={C.faceMid} strokeWidth="2.8" fill="none" strokeLinecap="round" />
    <path d="M 112 87 Q 120 93 128 87" stroke={C.faceMid} strokeWidth="2.8" fill="none" strokeLinecap="round" />
    {/* lash dots */}
    <circle cx="74"  cy="86.5" r="1" fill={C.faceMid} opacity="0.5" />
    <circle cx="86"  cy="86.5" r="1" fill={C.faceMid} opacity="0.5" />
    <circle cx="114" cy="86.5" r="1" fill={C.faceMid} opacity="0.5" />
    <circle cx="126" cy="86.5" r="1" fill={C.faceMid} opacity="0.5" />
  </>
);

const XEyes: React.FC = () => (
  <>
    <circle cx="80"  cy="87" r="12" fill={C.eyeRing} />
    <circle cx="120" cy="87" r="12" fill={C.eyeRing} />
    <circle cx="80"  cy="87" r="8.5" fill={C.sclera} />
    <circle cx="120" cy="87" r="8.5" fill={C.sclera} />
    <path d="M 75.5 82.5 L 84.5 91.5 M 84.5 82.5 L 75.5 91.5"
          stroke="#EF4444" strokeWidth="2.8" strokeLinecap="round" />
    <path d="M 115.5 82.5 L 124.5 91.5 M 124.5 82.5 L 115.5 91.5"
          stroke="#EF4444" strokeWidth="2.8" strokeLinecap="round" />
  </>
);

// ─── Base face (head shell + face patch + nose) ───────────
const BaseFace: React.FC = () => (
  <>
    {/* head */}
    <circle cx="100" cy="90" r="44" fill="url(#sg-head)" />
    {/* fur highlight */}
    <ellipse cx="85" cy="70" rx="17" ry="11" fill={C.furHi} opacity="0.32" />
    {/* face patch */}
    <ellipse cx="100" cy="94" rx="30" ry="28" fill="url(#sg-face)" />
    {/* blush */}
    <ellipse cx="68"  cy="100" rx="9" ry="6" fill={C.blush} />
    <ellipse cx="132" cy="100" rx="9" ry="6" fill={C.blush} />
    {/* nose pad */}
    <ellipse cx="100" cy="105" rx="12" ry="8" fill="url(#sg-nose)" />
    {/* nostril highlights */}
    <ellipse cx="96"  cy="103" rx="2.5" ry="1.8" fill="rgba(255,255,255,0.2)" />
    <ellipse cx="104" cy="103" rx="2.5" ry="1.8" fill="rgba(255,255,255,0.2)" />
  </>
);

// ─── Mood components ──────────────────────────────────────

const Waving: React.FC = () => (
  <>
    {/* left arm grips branch */}
    <Arm d="M 72 122 C 56 96 44 58 46 22" dHi="M 74 120 C 58 94 47 57 50 22" clawCx={46} />

    {/* right arm waves */}
    <g className="sloth-wave-arm" style={{ transformBox: 'fill-box', transformOrigin: '80% 80%' }}>
      <path d="M 128 120 C 148 104 164 78 170 58"
            stroke={C.furDark}  strokeWidth="14" fill="none" strokeLinecap="round" opacity="0.35" />
      <path d="M 128 120 C 148 104 164 78 170 58"
            stroke={C.fur}      strokeWidth="13" fill="none" strokeLinecap="round" />
      <path d="M 130 118 C 149 103 164 77 171 58"
            stroke={C.furLight} strokeWidth="5"  fill="none" strokeLinecap="round" opacity="0.55" />
      {/* waving hand */}
      <g transform="translate(163, 52)">
        <ellipse cx="5" cy="7" rx="11" ry="9" fill={C.fur} />
        <path d="M -2 3 C -4 -3 -5 -8 -6 -11" stroke={C.claw} strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d="M  5 1 C  5 -5  5 -9  5 -12" stroke={C.claw} strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d="M 12 3 C 14 -3 15 -8 16 -11" stroke={C.claw} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      </g>
    </g>

    <Body />

    <g className="sloth-head-bob">
      <BaseFace />
      <OpenEyes />
      <path d="M 88 117 Q 100 127 112 117"
            stroke={C.mouth} strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  </>
);

const Sleeping: React.FC = () => (
  <>
    <Arm d="M 72 122 C 56 96 44 58 46 22" dHi="M 74 120 C 58 94 47 57 50 22" clawCx={46} />
    <Arm d="M 128 122 C 144 96 156 58 154 22" dHi="M 126 120 C 142 94 153 57 150 22" clawCx={154} flip />

    <Body />

    <g className="sloth-head-bob">
      <BaseFace />
      <SleepEyes />
      {/* relaxed mouth */}
      <path d="M 93 117 Q 100 121 107 117"
            stroke={C.mouth} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </g>

    {/* Z bubbles */}
    <g className="sloth-z1">
      <text x="138" y="74" fontFamily="system-ui, Arial, sans-serif" fontSize="13"
            fontWeight="bold" fill={C.zBlue}>Z</text>
    </g>
    <g className="sloth-z2">
      <text x="151" y="54" fontFamily="system-ui, Arial, sans-serif" fontSize="18"
            fontWeight="bold" fill={C.zBlue}>Z</text>
    </g>
    <g className="sloth-z3">
      <text x="162" y="28" fontFamily="system-ui, Arial, sans-serif" fontSize="24"
            fontWeight="bold" fill={C.zBlueDark}>Z</text>
    </g>
  </>
);

const ThumbsUp: React.FC = () => (
  <>
    <Arm d="M 72 122 C 56 96 44 58 46 22" dHi="M 74 120 C 58 94 47 57 50 22" clawCx={46} />

    {/* right arm pointing down with thumb up */}
    <g>
      <path d="M 128 120 C 145 130 152 148 150 164"
            stroke={C.furDark}  strokeWidth="14" fill="none" strokeLinecap="round" opacity="0.35" />
      <path d="M 128 120 C 145 130 152 148 150 164"
            stroke={C.fur}      strokeWidth="13" fill="none" strokeLinecap="round" />
      <path d="M 130 118 C 146 129 153 147 151 163"
            stroke={C.furLight} strokeWidth="5"  fill="none" strokeLinecap="round" opacity="0.55" />
      {/* thumbs-up hand */}
      <g transform="translate(145, 160)">
        <rect x="-9" y="-7" width="18" height="15" rx="7" fill={C.fur} />
        {/* thumb */}
        <rect x="-14" y="-16" width="10" height="13" rx="5" fill={C.furMid} />
        <path d="M -10 -13 C -12 -20 -11 -25 -10 -27"
              stroke={C.claw} strokeWidth="2.2" fill="none" strokeLinecap="round" />
        {/* knuckle lines */}
        <line x1="-4" y1="-1" x2="-4" y2="6" stroke={C.furDark} strokeWidth="1" opacity="0.35" />
        <line x1="2"  y1="-1" x2="2"  y2="6" stroke={C.furDark} strokeWidth="1" opacity="0.35" />
      </g>
    </g>

    <Body />

    <g className="sloth-head-bounce">
      <BaseFace />
      <HappyEyes />
      {/* raised eyebrows */}
      <path d="M 72 79 Q 80 74 88 78"   stroke={C.eyeRing} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 112 78 Q 120 74 128 79" stroke={C.eyeRing} strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* big smile */}
      <path d="M 84 117 Q 100 135 116 117"
            stroke={C.mouth} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      {/* tooth glint */}
      <path d="M 88 119 Q 100 131 112 119"
            stroke="white" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.5" />
    </g>
  </>
);

const Confused: React.FC = () => (
  <>
    <Arm d="M 72 122 C 56 96 44 58 46 22" dHi="M 74 120 C 58 94 47 57 50 22" clawCx={46} />

    {/* right arm scratching head */}
    <g className="sloth-scratch-arm" style={{ transformBox: 'fill-box', transformOrigin: '50% 90%' }}>
      <path d="M 128 118 C 136 108 132 96 123 89"
            stroke={C.furDark}  strokeWidth="13" fill="none" strokeLinecap="round" opacity="0.35" />
      <path d="M 128 118 C 136 108 132 96 123 89"
            stroke={C.fur}      strokeWidth="12" fill="none" strokeLinecap="round" />
      <path d="M 129 116 C 137 107 133 95 124 88"
            stroke={C.furLight} strokeWidth="4.5" fill="none" strokeLinecap="round" opacity="0.55" />
      {/* hand on head */}
      <g transform="translate(117, 84)">
        <ellipse cx="5" cy="5" rx="11" ry="8" fill={C.fur} />
        <path d="M -2 1 C -3 -4 -4 -8 -5 -11" stroke={C.claw} strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M  5 -1 C  5 -6  5 -10  5 -13" stroke={C.claw} strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 11 1 C 12 -4 13 -8 14 -11" stroke={C.claw} strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    </g>

    <Body />

    {/* tilted head group */}
    <g style={{ transform: 'rotate(-9deg)', transformBox: 'fill-box', transformOrigin: '50% 55%' }}>
      <BaseFace />
      <XEyes />
      {/* open-o mouth */}
      <ellipse cx="100" cy="119" rx="7" ry="6"
               fill="none" stroke={C.mouth} strokeWidth="2.5" />
      {/* sweat drop */}
      <path d="M 130 70 C 126 65 125 60 130 56 C 135 60 134 65 130 70 Z"
            fill={C.sweat} opacity="0.8" />
      {/* question marks */}
      <text x="140" y="76" fontFamily="system-ui, Arial, sans-serif" fontSize="12"
            fontWeight="bold" fill="#94A3B8" opacity="0.85">?</text>
      <text x="150" y="58" fontFamily="system-ui, Arial, sans-serif" fontSize="15"
            fontWeight="bold" fill="#94A3B8" opacity="0.7">?</text>
    </g>
  </>
);

// ─── Main export ──────────────────────────────────────────
interface SlothSVGProps {
  mood: SlothMood;
  size?: number;
}

const SlothSVG: React.FC<SlothSVGProps> = ({ mood, size = 148 }) => {
  const renderMood = () => {
    switch (mood) {
      case 'waving':   return <Waving />;
      case 'sleeping': return <Sleeping />;
      case 'thumbsUp': return <ThumbsUp />;
      case 'confused': return <Confused />;
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      style={{ filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.18))' }}
      aria-label={`Sloth character: ${mood}`}
      overflow="visible"
    >
      <Defs />
      <Branch />
      {renderMood()}
    </svg>
  );
};

export default SlothSVG;
