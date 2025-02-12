import { useEffect, useRef } from 'react';

interface Eye {
  x: number;
  y: number;
  size: number;
}

export function CatEyesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const eyes = useRef<Eye[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const blinkTimerRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Initialize eyes positions
      eyes.current = Array.from({ length: 6 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 20 + Math.random() * 10,
      }));
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const drawEye = (eye: Eye, blink: boolean) => {
      if (!ctx) return;

      // Calculate angle between eye and mouse
      const dx = mousePos.current.x - eye.x;
      const dy = mousePos.current.y - eye.y;
      const angle = Math.atan2(dy, dx);

      // Draw eye white
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.beginPath();
      ctx.ellipse(eye.x, eye.y, eye.size, blink ? eye.size * 0.1 : eye.size * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();

      if (!blink) {
        // Draw pupil
        const pupilSize = eye.size * 0.3;
        const pupilDistance = eye.size * 0.3;
        const pupilX = eye.x + Math.cos(angle) * pupilDistance;
        const pupilY = eye.y + Math.sin(angle) * pupilDistance;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.beginPath();
        ctx.arc(pupilX, pupilY, pupilSize, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const blink = (Date.now() % 5000) < 200; // Blink every 5 seconds for 200ms
      eyes.current.forEach(eye => drawEye(eye, blink));
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(blinkTimerRef.current!);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 bg-background"
    />
  );
}
