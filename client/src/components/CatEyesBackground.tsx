import { useEffect, useRef, useState } from 'react';

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
    const isHovered = useRef(false);

    // Track if dark mode is enabled
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Initial check for dark mode
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
        if (!isDarkMode) return; // Don't run the eyes if it's light mode!

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

            const eyeSpacing = Math.min(window.innerWidth, window.innerHeight) * 0.1;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight * 0.2;

            leftEyePos.current = { x: centerX - eyeSpacing, y: centerY };
            rightEyePos.current = { x: centerX + eyeSpacing, y: centerY };
        };

        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };

            const distance = Math.min(
                Math.hypot(e.clientX - leftEyePos.current.x, e.clientY - leftEyePos.current.y),
                Math.hypot(e.clientX - rightEyePos.current.x, e.clientY - rightEyePos.current.y)
            );

            isHovered.current = distance < 50;
        };

        const drawEye = (eyePos: EyePosition, blink: boolean) => {
            if (!ctx) return;

            const size = Math.min(window.innerWidth, window.innerHeight) * 0.08;
            const dx = mousePos.current.x - eyePos.x;
            const dy = mousePos.current.y - eyePos.y;
            const angle = Math.atan2(dy, dx);

            const glowIntensity = isHovered.current ? 30 : 20;
            ctx.shadowColor = 'rgba(147, 51, 234, 0.3)';
            ctx.shadowBlur = glowIntensity;
            ctx.fillStyle = isHovered.current ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.15)';
            ctx.beginPath();
            ctx.ellipse(eyePos.x, eyePos.y, size, blink ? size * 0.1 : size * 0.6, 0, 0, Math.PI * 2);
            ctx.fill();

            if (!blink) {
                const irisSize = size * 0.4;
                const maxDistance = size * 0.2;
                const distance = Math.min(Math.sqrt(dx * dx + dy * dy) / 10, maxDistance);
                const irisX = eyePos.x + Math.cos(angle) * distance;
                const irisY = eyePos.y + Math.sin(angle) * distance;

                ctx.shadowColor = 'rgba(147, 51, 234, 0.5)';
                ctx.shadowBlur = glowIntensity;
                ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
                ctx.beginPath();
                ctx.arc(irisX, irisY, irisSize, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
                ctx.beginPath();
                ctx.arc(irisX - irisSize * 0.2, irisY - irisSize * 0.2, irisSize * 0.3, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        const animate = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const time = Date.now();
            const blinkInterval = 5000;
            const blinkDuration = 200;
            const blink = (time % blinkInterval) < blinkDuration;

            const scrollY = window.scrollY;
            const maxScroll = 500;
            const opacity = Math.max(0.3, 1 - scrollY / maxScroll);
            ctx.globalAlpha = opacity;

            drawEye(leftEyePos.current, blink);
            drawEye(rightEyePos.current, blink);

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

    if (!isDarkMode) return null; // Don't render in light mode

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10 bg-transparent transition-opacity duration-300"
        />
    );
}
