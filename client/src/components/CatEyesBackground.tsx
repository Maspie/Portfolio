import { useEffect, useRef, useState } from 'react';

interface EyePosition {
  x: number;
  y: number;
}

export function CatEyesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const leftLensPos = useRef<EyePosition>({ x: 0, y: 0 });
  const rightLensPos = useRef<EyePosition>({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();
  const isHovered = useRef(false);

  // Track if dark mode is enabled
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for dark mode
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();

    // Listen for class changes (if user toggles dark/light mode)
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isDarkMode) return; // Only run in dark mode

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Adjust the lens positions
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

      leftLensPos.current = { x: centerX - spacing, y: centerY };
      rightLensPos.current = { x: centerX + spacing, y: centerY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Check if user is hovering near either lens
      const distLeft = Math.hypot(e.clientX - leftLensPos.current.x, e.clientY - leftLensPos.current.y);
      const distRight = Math.hypot(e.clientX - rightLensPos.current.x, e.clientY - rightLensPos.current.y);
      const minDist = Math.min(distLeft, distRight);

      isHovered.current = minDist < 60; // If mouse is within 60px of a lens
    };

    // Draw one “robotic lens”
    const drawLens = (lensPos: EyePosition) => {
      const dx = mousePos.current.x - lensPos.x;
      const dy = mousePos.current.y - lensPos.y;
      const angle = Math.atan2(dy, dx);

      // Overall lens size
      const baseSize = Math.min(window.innerWidth, window.innerHeight) * 0.08;
      const glowIntensity = isHovered.current ? 30 : 15;

      // Slight tracking offset
      const maxOffset = baseSize * 0.2;
      const distanceFromCenter = Math.min(Math.sqrt(dx * dx + dy * dy) / 8, maxOffset);

      // The center of the lens “tracks” the mouse a bit
      const offsetX = lensPos.x + Math.cos(angle) * distanceFromCenter;
      const offsetY = lensPos.y + Math.sin(angle) * distanceFromCenter;

      // Outer ring
      ctx.shadowColor = 'rgba(147, 51, 234, 0.5)';
      ctx.shadowBlur = glowIntensity;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(offsetX, offsetY, baseSize, 0, 2 * Math.PI);
      ctx.stroke();

      // Radial lines
      const lineCount = 8; // adjust for more/less lines
      for (let i = 0; i < lineCount; i++) {
        const theta = (2 * Math.PI * i) / lineCount; // spacing lines evenly
        const endX = offsetX + Math.cos(theta) * baseSize;
        const endY = offsetY + Math.sin(theta) * baseSize;

        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }

      // Inner circle (center disc)
      const innerSize = baseSize * 0.3;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.beginPath();
      ctx.arc(offsetX, offsetY, innerSize, 0, 2 * Math.PI);
      ctx.fill();

      // Bright highlight in center
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.beginPath();
      ctx.arc(offsetX - innerSize * 0.2, offsetY - innerSize * 0.2, innerSize * 0.1, 0, 2 * Math.PI);
      ctx.fill();
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      // Clear
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Scroll-based fade-out
      const scrollY = window.scrollY;
      const maxScroll = 500;
      const opacity = Math.max(0.3, 1 - scrollY / maxScroll);
      ctx.globalAlpha = opacity;

      // Draw each lens
      drawLens(leftLensPos.current);
      drawLens(rightLensPos.current);

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

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 bg-transparent transition-opacity duration-300"
    />
  );
}
