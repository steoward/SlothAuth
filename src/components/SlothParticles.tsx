import React, { useEffect, useRef } from 'react';
import type { SlothMood } from './SlothSVG';

const O_SIZE = 220;

const drawSmileBase = (c: CanvasRenderingContext2D) => {
  c.fillStyle = '#8B5A2B';
  c.beginPath(); c.ellipse(100, 100, 85, 65, 0, 0, Math.PI * 2); c.fill();
  c.fillStyle = '#E3C193';
  c.beginPath(); c.ellipse(65, 100, 35, 48, 0, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.ellipse(135, 100, 35, 48, 0, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.ellipse(100, 130, 28, 18, 0, 0, Math.PI * 2); c.fill();
  c.fillStyle = '#4A3018';
  c.beginPath(); c.ellipse(60, 100, 22, 30, Math.PI / 6, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.ellipse(140, 100, 22, 30, -Math.PI / 6, 0, Math.PI * 2); c.fill();
};

const drawSmile = (c: CanvasRenderingContext2D) => {
  drawSmileBase(c);
  c.fillStyle = '#000000';
  c.beginPath(); c.arc(60, 100, 6, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.arc(140, 100, 6, 0, Math.PI * 2); c.fill();
  c.fillStyle = '#FFFFFF';
  c.beginPath(); c.arc(58, 98, 2.5, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.arc(138, 98, 2.5, 0, Math.PI * 2); c.fill();
  c.fillStyle = '#000000';
  c.beginPath(); c.ellipse(100, 118, 11, 7, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = '#000000'; c.lineWidth = 4; c.lineCap = 'round';
  c.beginPath(); c.arc(100, 138, 22, 0.2, Math.PI - 0.2); c.stroke();
};

const drawConfused = (c: CanvasRenderingContext2D) => {
  drawSmileBase(c);
  c.fillStyle = '#000000';
  c.beginPath(); c.arc(60, 100, 5, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.arc(140, 95, 12, 0, Math.PI * 2); c.fill();
  c.fillStyle = '#FFFFFF';
  c.beginPath(); c.arc(58, 98, 2, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.arc(137, 92, 4, 0, Math.PI * 2); c.fill();
  c.fillStyle = '#000000';
  c.beginPath(); c.ellipse(100, 118, 11, 7, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = '#000000'; c.lineWidth = 4; c.lineCap = 'round'; c.lineJoin = 'round';
  c.beginPath();
  c.moveTo(80, 138); c.lineTo(93, 132); c.lineTo(100, 138); c.lineTo(107, 132); c.lineTo(120, 138); c.stroke();
  c.beginPath(); c.moveTo(50, 80); c.lineTo(80, 84); c.stroke();
  c.beginPath(); c.moveTo(150, 70); c.lineTo(120, 76); c.stroke();
  c.fillStyle = '#FBBF24';
  c.font = "bold 35px Arial";
  c.textAlign = "center";
  c.fillText("?", 100, 35);
  c.textAlign = "start";
};

const drawSleep = (c: CanvasRenderingContext2D) => {
  drawSmileBase(c);
  c.strokeStyle = '#000000'; c.lineWidth = 4; c.lineCap = 'round';
  c.beginPath(); c.arc(60, 100, 8, 0.2, Math.PI - 0.2); c.stroke();
  c.beginPath(); c.arc(140, 100, 8, 0.2, Math.PI - 0.2); c.stroke();
  c.fillStyle = '#000000';
  c.beginPath(); c.ellipse(100, 118, 10, 6, 0, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.arc(100, 135, 5, 0, Math.PI * 2); c.fill();
  c.fillStyle = '#87CEEB';
  c.font = "bold 22px Arial"; c.fillText("Z", 160, 70);
  c.font = "bold 18px Arial"; c.fillText("z", 175, 50);
};

const drawLock = (c: CanvasRenderingContext2D) => {
  c.strokeStyle = '#A0AEC0'; c.lineWidth = 30; c.lineCap = 'round';
  c.beginPath();
  c.arc(100, 65, 55, Math.PI, 0);
  c.moveTo(45, 65); c.lineTo(45, 105);
  c.moveTo(155, 65); c.lineTo(155, 105);
  c.stroke();
  c.fillStyle = '#F6AD55';
  c.beginPath(); c.roundRect ? c.roundRect(30, 95, 140, 110, 18) : c.fillRect(30, 95, 140, 110); c.fill();
  let cx = 100, cy = 150;
  c.fillStyle = '#8B5A2B';
  c.beginPath(); c.ellipse(cx, cy, 55, 45, 0, 0, Math.PI * 2); c.fill();
  c.fillStyle = '#E3C193';
  c.beginPath(); c.ellipse(cx - 18, cy, 22, 30, 0, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.ellipse(cx + 18, cy, 22, 30, 0, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.ellipse(cx, cy + 15, 18, 12, 0, 0, Math.PI * 2); c.fill();
  c.fillStyle = '#4A3018';
  c.beginPath(); c.ellipse(cx - 18, cy, 12, 16, Math.PI / 6, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.ellipse(cx + 18, cy, 12, 16, -Math.PI / 6, 0, Math.PI * 2); c.fill();
  c.fillStyle = '#000000';
  c.beginPath(); c.arc(cx - 18, cy, 4, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.arc(cx + 18, cy, 4, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.ellipse(cx, cy + 12, 7, 5, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = '#000000'; c.lineWidth = 3;
  c.beginPath(); c.arc(cx, cy + 20, 12, 0.2, Math.PI - 0.2); c.stroke();
};

const drawFunctions = {
  smile: drawSmile,
  confused: drawConfused,
  sleep: drawSleep,
  lock: drawLock
};

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  spring: number;
  friction: number;
  die: boolean;
  angle: number;
  angleSpeed: number;
}

const moodToShape: Record<SlothMood, string> = {
  waving: 'smile',
  sleeping: 'sleep',
  thumbsUp: 'lock',
  confused: 'confused'
};

const SlothParticles: React.FC<{ mood: SlothMood; size?: number }> = ({ mood, size = 148 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const currentShapeRef = useRef('smile');
  const rafRef = useRef<number>(0);

  const getTargets = (shapeKey: string) => {
    const offCanvas = offCanvasRef.current;
    if (!offCanvas) return [];
    
    const octx = offCanvas.getContext('2d', { willReadFrequently: true });
    if (!octx) return [];
    
    octx.clearRect(0, 0, O_SIZE, O_SIZE);
    drawFunctions[shapeKey as keyof typeof drawFunctions](octx);
    
    const imgData = octx.getImageData(0, 0, O_SIZE, O_SIZE).data;
    const targets: { tx: number; ty: number; color: string }[] = [];
    const step = 3;

    for (let y = 0; y < O_SIZE; y += step) {
      for (let x = 0; x < O_SIZE; x += step) {
        const index = (y * O_SIZE + x) * 4;
        const alpha = imgData[index + 3];
        if (alpha > 128) {
          const r = imgData[index];
          const g = imgData[index + 1];
          const b = imgData[index + 2];
          targets.push({
            tx: x + 11,
            ty: y + 10,
            color: `rgb(${r},${g},${b})`
          });
        }
      }
    }
    return targets;
  };

  const setShape = (shapeKey: string, width: number, height: number) => {
    currentShapeRef.current = shapeKey;
    const targets = getTargets(shapeKey);

    for (let i = 0; i < targets.length; i++) {
      if (particlesRef.current[i]) {
        particlesRef.current[i].targetX = targets[i].tx;
        particlesRef.current[i].targetY = targets[i].ty;
        particlesRef.current[i].color = targets[i].color;
        particlesRef.current[i].die = false;
      } else {
        const p: Particle = {
          x: width / 2,
          y: height / 2,
          targetX: targets[i].tx,
          targetY: targets[i].ty,
          vx: (Math.random() - 0.5) * 20,
          vy: (Math.random() - 0.5) * 20,
          color: targets[i].color,
          size: Math.random() * 1.0 + 0.6,
          spring: 0.06 + Math.random() * 0.02,
          friction: 0.85 + Math.random() * 0.06,
          die: false,
          angle: Math.random() * Math.PI * 2,
          angleSpeed: Math.random() * 0.05
        };
        particlesRef.current.push(p);
      }
    }

    if (particlesRef.current.length > targets.length) {
      for (let i = targets.length; i < particlesRef.current.length; i++) {
        particlesRef.current[i].targetX = width / 2;
        particlesRef.current[i].targetY = height / 2;
        particlesRef.current[i].die = true;
      }
    }
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const mouse = mouseRef.current;

    particlesRef.current = particlesRef.current.filter(p => {
      if (p.die) {
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        if (Math.hypot(dx, dy) < 50) return false;
      }
      return true;
    });

    particlesRef.current.forEach(p => {
      let dxMouse = mouse.x - p.x;
      let dyMouse = mouse.y - p.y;
      let distMouse = Math.hypot(dxMouse, dyMouse);
      const maxDist = 90;

      if (distMouse < maxDist) {
        const force = (maxDist - distMouse) / maxDist;
        p.vx -= (dxMouse / distMouse) * force * 5;
        p.vy -= (dyMouse / distMouse) * force * 5;
      }

      const dx = p.targetX - p.x;
      const dy = p.targetY - p.y;
      
      p.vx += dx * p.spring;
      p.vy += dy * p.spring;
      
      p.vx *= p.friction;
      p.vy *= p.friction;
      
      p.x += p.vx;
      p.y += p.vy;

      if (!p.die && distMouse >= maxDist) {
        p.angle += p.angleSpeed;
        p.x += Math.cos(p.angle) * 0.3;
        p.y += Math.sin(p.angle) * 0.3;
      }

      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    rafRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = size;
    const height = size;
    canvas.width = width;
    canvas.height = height;

    if (!offCanvasRef.current) {
      offCanvasRef.current = document.createElement('canvas');
      offCanvasRef.current.width = O_SIZE;
      offCanvasRef.current.height = O_SIZE;
    }

    const shapeKey = moodToShape[mood] || 'smile';
    setShape(shapeKey, width, height);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mood, size]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size, display: 'block' }}
      aria-label="Sloth particles"
    />
  );
};

export default SlothParticles;
