import { useEffect, useRef, useState } from 'react';

interface ClockPosition {
  x: number;
  y: number;
}

export function CatEyesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const leftClockPos = useRef<ClockPosition>({ x: 0, y: 0 });
  const rightClockPos = useRef<ClockPosition>({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();
  const isHovered = useRef(false);

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isDarkMode) return;

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

      const spacing = Math.min(window.innerWidth, window.innerHeight) * 0.1;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight * 0.2;

      leftClockPos.current = { x: centerX - spacing, y: centerY };
      rightClockPos.current = { x: centerX + spacing, y: centerY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      const distLeft = Math.hypot(e.clientX - leftClockPos.current.x, e.clientY - leftClockPos.current.y);
      const distRight = Math.hypot(e.clientX - rightClockPos.current.x, e.clientY - rightClockPos.current.y);

      const minDist = Math.min(distLeft, distRight);
      isHovered.current = minDist < 60;
    };

    const drawClock = (clockPos: ClockPosition) => {
      const baseSize = Math.min(window.innerWidth, window.innerHeight) * 0.08;
      const glowIntensity = isHovered.current ? 30 : 15;

      const dx = mousePos.current.x - clockPos.x;
      const dy = mousePos.current.y - clockPos.y;
      const minuteAngle = Math.atan2(dy, dx);
      const hourAngle = (Date.now() / 20000) % (2 * Math.PI);

      ctx.shadowColor = `rgba(147, 51, 234, ${isHovered.current ? 0.7 : 0.4})`;
      ctx.shadowBlur = glowIntensity;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.arc(clockPos.x, clockPos.y, baseSize, 0, Math.PI * 2);
      ctx.stroke();

      const minuteLength = baseSize * 0.7;
      const hourLength = baseSize * 0.5;

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.beginPath();
      ctx.moveTo(clockPos.x, clockPos.y);
      ctx.lineTo(clockPos.x + Math.cos(minuteAngle) * minuteLength, clockPos.y + Math.sin(minuteAngle) * minuteLength);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.beginPath();
      ctx.moveTo(clockPos.x, clockPos.y);
      ctx.lineTo(clockPos.x + Math.cos(hourAngle) * hourLength, clockPos.y + Math.sin(hourAngle) * hourLength);
      ctx.stroke();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.beginPath();
      ctx.arc(clockPos.x, clockPos.y, 3, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scrollY = window.scrollY;
      const maxScroll = 500;
      ctx.globalAlpha = Math.max(0.3, 1 - scrollY / maxScroll);

      drawClock(leftClockPos.current);
      drawClock(rightClockPos.current);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resizeCanvas);

    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isDarkMode]);

  if (!isDarkMode) return null;

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 bg-transparent transition-opacity duration-300" />;
}
