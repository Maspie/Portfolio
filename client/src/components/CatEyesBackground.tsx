import { useEffect, useRef } from 'react';

export function CatEyesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const eyePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Center the eye
      eyePosition.current = {
        x: canvas.width / 2,
        y: canvas.height / 3
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleScroll = () => {
      // Update eye vertical position based on scroll
      if (canvas) {
        eyePosition.current.y = (canvas.height / 3) + window.scrollY * 0.5;
      }
    };

    const drawEye = (blink: boolean) => {
      if (!ctx) return;

      const eye = eyePosition.current;
      const size = Math.min(window.innerWidth, window.innerHeight) * 0.2; // Large eye size

      // Calculate angle between eye and mouse
      const dx = mousePos.current.x - eye.x;
      const dy = mousePos.current.y - eye.y;
      const angle = Math.atan2(dy, dx);

      // Draw eye white with glow effect
      ctx.shadowColor = 'rgba(147, 51, 234, 0.3)';
      ctx.shadowBlur = 20;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.beginPath();
      ctx.ellipse(eye.x, eye.y, size, blink ? size * 0.1 : size * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();

      if (!blink) {
        // Draw pupil with glow
        const pupilSize = size * 0.4;
        const pupilDistance = size * 0.2;
        const pupilX = eye.x + Math.cos(angle) * pupilDistance;
        const pupilY = eye.y + Math.sin(angle) * pupilDistance;

        ctx.shadowColor = 'rgba(147, 51, 234, 0.5)';
        ctx.shadowBlur = 30;
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
      drawEye(blink);
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', handleScroll);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 bg-background"
    />
  );
}