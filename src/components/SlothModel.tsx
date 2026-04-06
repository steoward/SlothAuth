import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';
import type { SlothMood } from './SlothSVG';

// Preload on module import
useGLTF.preload('/sloth.glb');

// ─── Mood configs ─────────────────────────────────────────
interface MoodConfig {
  ambientColor:   string;
  ambientIntensity: number;
  keyColor:       string;
  keyIntensity:   number;
  fillColor:      string;
  rimColor:       string;
}

const MOOD_LIGHT: Record<SlothMood, MoodConfig> = {
  waving: {
    ambientColor: '#fff8ee', ambientIntensity: 0.7,
    keyColor: '#ffffff',    keyIntensity: 1.3,
    fillColor: '#e8f0ff',   rimColor: '#ffe8d0',
  },
  sleeping: {
    ambientColor: '#c8d8f0', ambientIntensity: 0.45,
    keyColor: '#b0c8e8',    keyIntensity: 0.7,
    fillColor: '#8090b8',   rimColor: '#304060',
  },
  thumbsUp: {
    ambientColor: '#fff4d0', ambientIntensity: 0.85,
    keyColor: '#fffbe0',    keyIntensity: 1.6,
    fillColor: '#ffd080',   rimColor: '#80ffd0',
  },
  confused: {
    ambientColor: '#f0f8e8', ambientIntensity: 0.65,
    keyColor: '#e8ffe0',    keyIntensity: 1.1,
    fillColor: '#c0e8c0',   rimColor: '#80c888',
  },
};

// ─── 3-D mesh (inside Canvas) ─────────────────────────────
function SlothMesh({ mood }: { mood: SlothMood }) {
  const groupRef = useRef<THREE.Group>(null!);
  const { scene } = useGLTF('/sloth.glb') as any;
  const cfg       = MOOD_LIGHT[mood];

  // Auto-fit: compute scale + center offset once
  const scaleRef   = useRef(1);
  const centerYRef = useRef(0);
  useEffect(() => {
    const box  = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const ctr  = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(ctr);
    const maxD = Math.max(size.x, size.y, size.z);
    if (maxD > 0) {
      scaleRef.current   = 1.9 / maxD;
      // Raise slightly so head is more centred in view
      centerYRef.current = -ctr.y * scaleRef.current + 0.08;
    }
    if (groupRef.current) {
      groupRef.current.scale.setScalar(scaleRef.current);
      groupRef.current.position.y = centerYRef.current;
    }
  }, [scene]);

  // Procedural animation
  useFrame(({ clock }) => {
    const g = groupRef.current;
    if (!g) return;
    const t = clock.getElapsedTime();
    const s = scaleRef.current;

    // Reset
    g.position.set(0, 0, 0);
    g.rotation.set(0, 0, 0);
    g.scale.setScalar(s);

    const baseY = centerYRef.current;

    switch (mood) {
      case 'waving': {
        // Gentle float + friendly look-around
        g.position.y  = baseY + Math.sin(t * 1.4) * 0.08;
        g.rotation.y  = Math.sin(t * 0.65) * 0.28;
        g.rotation.z  = Math.sin(t * 0.9)  * 0.045;
        break;
      }
      case 'sleeping': {
        // Drooping nod — head heavy, swaying slowly
        g.rotation.z  = Math.sin(t * 0.42) * 0.11 - 0.1;
        g.rotation.x  = Math.sin(t * 0.55) * 0.07 + 0.14;
        g.position.y  = baseY + Math.sin(t * 0.75) * 0.03 - 0.07;
        break;
      }
      case 'thumbsUp': {
        // Energetic bounce + celebratory wiggle
        const phase   = t * 3.0;
        g.position.y  = baseY + Math.abs(Math.sin(phase)) * 0.2 - 0.02;
        g.rotation.y  = Math.sin(t * 1.1) * 0.32;
        g.scale.setScalar(s * (1 + Math.sin(phase * 2) * 0.032));
        break;
      }
      case 'confused': {
        // Rapid shake + wobble
        g.rotation.z  = Math.sin(t * 5.5) * 0.18;
        g.rotation.y  = Math.sin(t * 3.8) * 0.32;
        g.position.x  = Math.sin(t * 7.0) * 0.05;
        g.position.y  = baseY + Math.sin(t * 4) * 0.03;
        g.scale.setScalar(s * (1 + Math.sin(t * 6) * 0.02));
        break;
      }
    }
  });

  return (
    <>
      {/* Dynamic lighting */}
      <ambientLight   intensity={cfg.ambientIntensity} color={cfg.ambientColor} />
      <directionalLight position={[2,  5,  4]} intensity={cfg.keyIntensity} color={cfg.keyColor} />
      <directionalLight position={[-3, 1,  2]} intensity={0.45}             color={cfg.fillColor} />
      <directionalLight position={[0, -2, -3]} intensity={0.25}             color={cfg.rimColor}  />
      <hemisphereLight args={[cfg.ambientColor as any, '#8B6347' as any, 0.35]} />

      <group ref={groupRef} scale={scaleRef.current}>
        <Center>
          <primitive object={scene} />
        </Center>
      </group>
    </>
  );
}

// ─── DOM overlays ─────────────────────────────────────────
const ZBubbles: React.FC = () => (
  <>
    <span className="sloth-z1" style={{
      position:'absolute', right:'12%', top:'38%',
      color:'#93C5FD', fontWeight:900, fontSize:14,
      fontFamily:'system-ui, sans-serif', lineHeight:1,
    }}>Z</span>
    <span className="sloth-z2" style={{
      position:'absolute', right:'5%', top:'22%',
      color:'#93C5FD', fontWeight:900, fontSize:21,
      fontFamily:'system-ui, sans-serif', lineHeight:1,
    }}>Z</span>
    <span className="sloth-z3" style={{
      position:'absolute', right:'0%', top:'6%',
      color:'#60A5FA', fontWeight:900, fontSize:28,
      fontFamily:'system-ui, sans-serif', lineHeight:1,
    }}>Z</span>
  </>
);

const Sparkles: React.FC = () => (
  <>
    {(['✨','⭐','✨','🌟','✨'] as const).map((s, i) => (
      <span key={i} className="sloth-sparkle" style={{
        position:'absolute',
        left: `${[8, 72, 15, 68, 42][i]}%`,
        top:  `${[12, 8, 55, 50, 4][i]}%`,
        fontSize: [12, 16, 10, 14, 18][i],
        animationDelay: `${i * 0.38}s`,
        lineHeight: 1,
      }}>{s}</span>
    ))}
  </>
);

const QuestionMarks: React.FC = () => (
  <>
    <span className="sloth-q1" style={{
      position:'absolute', right:'10%', top:'12%',
      color:'#94A3B8', fontWeight:900, fontSize:20,
      fontFamily:'system-ui, sans-serif',
    }}>?</span>
    <span className="sloth-q2" style={{
      position:'absolute', left:'8%', top:'8%',
      color:'#94A3B8', fontWeight:900, fontSize:28,
      fontFamily:'system-ui, sans-serif',
    }}>?</span>
    <span style={{
      position:'absolute', right:'6%', top:'42%',
      fontSize:16, lineHeight:1,
    }}>💦</span>
  </>
);

// ─── Main export ──────────────────────────────────────────
interface SlothModelProps {
  mood: SlothMood;
  size?: number;
}

const SlothModel: React.FC<SlothModelProps> = ({ mood, size = 148 }) => (
  <div style={{ width: size, height: size, position: 'relative' }}>
    <Canvas
      camera={{ position: [0, 0.18, 2.45], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <SlothMesh mood={mood} />
      </Suspense>
    </Canvas>

    {/* mood overlays */}
    {mood === 'sleeping'  && <ZBubbles />}
    {mood === 'thumbsUp'  && <Sparkles />}
    {mood === 'confused'  && <QuestionMarks />}
  </div>
);

export default SlothModel;
