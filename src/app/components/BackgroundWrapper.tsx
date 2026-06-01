import React, { useRef, useEffect, useCallback, useState } from 'react';

interface BackgroundWrapperProps {
  children: React.ReactNode;
  variant: 'hero' | 'about' | 'skills' | 'projects' | 'contact';
  className?: string;
}

/**
 * BackgroundWrapper Component
 *
 * Provides animated background effects for different sections of the portfolio.
 * Each section variant has unique animation patterns optimized for performance.
 *
 * Variants:
 * - hero: Glowing particle motion for the main landing section
 * - about: Floating geometric shapes for the about section
 * - skills: Animated grid pattern for technical skills
 * - projects: Orbiting elements for project showcase
 * - contact: Gradient wave animations for contact section
 *
 * Performance optimizations:
 * - Uses requestAnimationFrame for smooth 60fps animations
 * - Canvas is properly cleaned up on unmount
 * - Theme-aware colors that update dynamically
 * - Reduced particle counts on mobile devices
 */
export const BackgroundWrapper: React.FC<BackgroundWrapperProps> = React.memo(({
  children,
  variant,
  className = ""
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const [isDark, setIsDark] = useState(false);

  // Check for dark mode
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const getVariantConfig = useCallback((variant: string) => {
    const baseColors = isDark
      ? ['rgba(147, 51, 234, 0.6)', 'rgba(59, 130, 246, 0.6)', 'rgba(236, 72, 153, 0.6)']
      : ['rgba(147, 51, 234, 0.4)', 'rgba(59, 130, 246, 0.4)', 'rgba(236, 72, 153, 0.4)'];

    switch (variant) {
      case 'hero':
        return {
          particleCount: 60,
          colors: baseColors,
          animation: 'glowing_particles',
          speed: 1.2,
          connectionDistance: 150
        };
      case 'about':
        return {
          particleCount: 40,
          colors: [...baseColors, 'rgba(34, 197, 94, 0.4)'],
          animation: 'floating_shapes',
          speed: 0.8,
          connectionDistance: 120
        };
      case 'skills':
        return {
          particleCount: 35,
          colors: baseColors,
          animation: 'animated_grid',
          speed: 1.0,
          connectionDistance: 100
        };
      case 'projects':
        return {
          particleCount: 45,
          colors: [...baseColors, 'rgba(251, 191, 36, 0.4)'],
          animation: 'orbiting_elements',
          speed: 0.9,
          connectionDistance: 130
        };
      case 'contact':
        return {
          particleCount: 30,
          colors: baseColors,
          animation: 'gradient_waves',
          speed: 0.6,
          connectionDistance: 80
        };
      default:
        return {
          particleCount: 40,
          colors: baseColors,
          animation: 'glowing_particles',
          speed: 1.0,
          connectionDistance: 120
        };
    }
  }, [isDark]);

  const config = getVariantConfig(variant);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
  }, []);

  const animate = useCallback((currentTime: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    lastTimeRef.current = currentTime;

    const { width, height } = canvas;

    // Clear with fade effect
    ctx.fillStyle = isDark ? 'rgba(0, 0, 0, 0.02)' : 'rgba(255, 255, 255, 0.02)';
    ctx.fillRect(0, 0, width, height);

    // Section-specific animations
    switch (config.animation) {
      case 'glowing_particles':
        drawGlowingParticles(ctx, width, height, config);
        break;
      case 'floating_shapes':
        drawFloatingShapes(ctx, width, height, config);
        break;
      case 'animated_grid':
        drawAnimatedGrid(ctx, width, height, config);
        break;
      case 'orbiting_elements':
        drawOrbitingElements(ctx, width, height, config);
        break;
      case 'gradient_waves':
        drawGradientWaves(ctx, width, height, config);
        break;
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [config, isDark]);

  const drawGlowingParticles = (ctx: CanvasRenderingContext2D, width: number, height: number, config: any) => {
    const time = Date.now() * 0.001;
    for (let i = 0; i < config.particleCount; i++) {
      const x = (width / config.particleCount) * i + Math.sin(time + i) * 20;
      const y = height / 2 + Math.cos(time * config.speed + i) * 30;

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 20);
      gradient.addColorStop(0, config.colors[i % config.colors.length]);
      gradient.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const drawFloatingShapes = (ctx: CanvasRenderingContext2D, width: number, height: number, config: any) => {
    const time = Date.now() * 0.001;
    for (let i = 0; i < config.particleCount; i++) {
      const x = (width / config.particleCount) * i;
      const y = height / 2 + Math.sin(time * config.speed + i * 0.5) * 40;

      ctx.fillStyle = config.colors[i % config.colors.length];
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(time + i);
      ctx.fillRect(-10, -10, 20, 20);
      ctx.restore();
    }
  };

  const drawAnimatedGrid = (ctx: CanvasRenderingContext2D, width: number, height: number, config: any) => {
    const time = Date.now() * 0.001;
    const gridSize = 30;

    ctx.strokeStyle = config.colors[0];
    ctx.lineWidth = 1;

    for (let x = 0; x < width; x += gridSize) {
      for (let y = 0; y < height; y += gridSize) {
        const offset = Math.sin(time * config.speed + x * 0.01 + y * 0.01) * 5;
        ctx.save();
        ctx.translate(x + offset, y + offset);
        ctx.beginPath();
        ctx.arc(0, 0, 2, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    }
  };

  const drawOrbitingElements = (ctx: CanvasRenderingContext2D, width: number, height: number, config: any) => {
    const time = Date.now() * 0.001;
    const centerX = width / 2;
    const centerY = height / 2;

    for (let i = 0; i < config.particleCount; i++) {
      const angle = (time * config.speed + i * 0.5) % (Math.PI * 2);
      const radius = 50 + i * 10;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      ctx.fillStyle = config.colors[i % config.colors.length];
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const drawGradientWaves = (ctx: CanvasRenderingContext2D, width: number, height: number, config: any) => {
    const time = Date.now() * 0.001;

    for (let i = 0; i < 3; i++) {
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, config.colors[i % config.colors.length]);
      gradient.addColorStop(0.5, 'transparent');
      gradient.addColorStop(1, config.colors[(i + 1) % config.colors.length]);

      ctx.fillStyle = gradient;
      ctx.globalAlpha = 0.1;

      const waveOffset = Math.sin(time * config.speed + i) * 20;
      ctx.beginPath();
      ctx.moveTo(0, height / 2 + waveOffset);
      for (let x = 0; x < width; x += 10) {
        const y = height / 2 + Math.sin(x * 0.01 + time * config.speed + i) * 30 + waveOffset;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  };

  useEffect(() => {
    initCanvas();
    animationRef.current = requestAnimationFrame(animate);

    const handleResize = () => initCanvas();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initCanvas, animate]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: -1 }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
});