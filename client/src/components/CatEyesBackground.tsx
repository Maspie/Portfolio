import { useEffect, useRef } from 'react';

interface EyePosition {
  x: number;
  y: number;
}

export function CatEyesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const leftEyePos = useRef<EyePosition>({ x: 0, y: 0 });
  const rightEyePos = useRef<EyePosition>({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();
  const isWinking = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);

      // Position eyes in the center of the viewport
      const eyeSpacing = Math.min(window.innerWidth, window.innerHeight) * 0.15;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      leftEyePos.current = {
        x: centerX - eyeSpacing,
        y: centerY
      };
      rightEyePos.current = {
        x: centerX + eyeSpacing,
        y: centerY
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const drawEye = (eyePos: EyePosition, blink: boolean, isRight: boolean) => {
      if (!ctx) return;

      const size = Math.min(window.innerWidth, window.innerHeight) * 0.12;

      if (isRight && isWinking.current) {
        // Draw winking right eye as "<"
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(eyePos.x + size * 0.3, eyePos.y - size * 0.2);
        ctx.lineTo(eyePos.x - size * 0.1, eyePos.y);
        ctx.lineTo(eyePos.x + size * 0.3, eyePos.y + size * 0.2);
        ctx.stroke();
        return;
      }

      // Calculate angle between eye and mouse
      const dx = mousePos.current.x - eyePos.x;
      const dy = mousePos.current.y - eyePos.y;
      const angle = Math.atan2(dy, dx);

      // Draw eye white with glow
      ctx.shadowColor = 'rgba(147, 51, 234, 0.3)';
      ctx.shadowBlur = 20;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.beginPath();
      ctx.ellipse(eyePos.x, eyePos.y, size, blink ? size * 0.1 : size * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();

      if (!blink) {
        // Draw iris with glow
        const irisSize = size * 0.4;
        const maxDistance = size * 0.2;
        const distance = Math.min(
          Math.sqrt(dx * dx + dy * dy) / 10,
          maxDistance
        );
        const irisX = eyePos.x + Math.cos(angle) * distance;
        const irisY = eyePos.y + Math.sin(angle) * distance;

        ctx.shadowColor = 'rgba(147, 51, 234, 0.5)';
        ctx.shadowBlur = 30;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.beginPath();
        ctx.arc(irisX, irisY, irisSize, 0, Math.PI * 2);
        ctx.fill();

        // Add highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(irisX - irisSize * 0.2, irisY - irisSize * 0.2, irisSize * 0.3, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Random blink every 4-6 seconds
      const time = Date.now();
      const blinkInterval = 5000;
      const blinkDuration = 200;
      const blink = (time % blinkInterval) < blinkDuration;

      drawEye(leftEyePos.current, blink, false);
      drawEye(rightEyePos.current, blink, true);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 bg-background winking"
      onTransitionEnd={() => {
        isWinking.current = false;
      }}
    />
  );
}