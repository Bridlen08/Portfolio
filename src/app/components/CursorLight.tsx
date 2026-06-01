import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../ui/ThemeProvider';

export function CursorLight() {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Smooth lerp animation loop
    const animate = () => {
      const lerp = 0.1; // Lower = more lag/trail, Higher = snappier
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerp;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerp;

      if (glowRef.current) {
        glowRef.current.style.setProperty('--cursor-x', `${currentPos.current.x}px`);
        glowRef.current.style.setProperty('--cursor-y', `${currentPos.current.y}px`);
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const isDark = theme === 'dark';

  return (
    <div
      ref={glowRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 9999,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 400ms ease',
        background: isDark
          ? `radial-gradient(circle 200px at var(--cursor-x, -999px) var(--cursor-y, -999px),
              rgba(255, 255, 255, 0.18) 0%,
              rgba(200, 180, 255, 0.10) 40%,
              transparent 70%)`
          : `radial-gradient(circle 200px at var(--cursor-x, -999px) var(--cursor-y, -999px),
              rgba(0, 0, 0, 0.12) 0%,
              rgba(50, 30, 80, 0.07) 40%,
              transparent 70%)`,
      }}
    />
  );
}
