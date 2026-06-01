import React, { useRef, useEffect, useCallback, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
  connections: number[];
}

interface InteractiveParticleBackgroundProps {
  particleCount?: number;
  connectionDistance?: number;
  mouseInfluence?: number;
}

/**
 * Interactive particle background component with physics-based animations
 * Features: mouse interaction, particle connections, theme-aware colors, performance optimized
 */

export const InteractiveParticleBackground: React.FC<InteractiveParticleBackgroundProps> = ({
  particleCount = 80,
  connectionDistance = 120,
  mouseInfluence = 0.8,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
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

  const colors = isDark
    ? [
        'rgba(147, 51, 234, 0.8)', // purple
        'rgba(59, 130, 246, 0.8)', // blue
        'rgba(236, 72, 153, 0.8)', // pink
        'rgba(99, 102, 241, 0.8)', // indigo
        'rgba(6, 182, 212, 0.8)',  // cyan
        'rgba(34, 197, 94, 0.8)',  // emerald
      ]
    : [
        'rgba(147, 51, 234, 0.6)', // purple
        'rgba(59, 130, 246, 0.6)', // blue
        'rgba(236, 72, 153, 0.6)', // pink
        'rgba(99, 102, 241, 0.6)', // indigo
        'rgba(6, 182, 212, 0.6)',  // cyan
        'rgba(34, 197, 94, 0.6)',  // emerald
      ];

  const initParticles = useCallback((width: number, height: number) => {
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1,
      vy: (Math.random() - 0.5) * 1,
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: Math.random() * 100 + 50,
      maxLife: Math.random() * 100 + 50,
      connections: [],
    }));
  }, [particleCount, colors]);

  const updateMouse = useCallback((e: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    let clientX: number, clientY: number;
    if ('touches' in e) {
      clientX = e.touches[0]?.clientX || 0;
      clientY = e.touches[0]?.clientY || 0;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const newX = clientX - rect.left;
    const newY = clientY - rect.top;

    mouseRef.current.vx = (newX - mouseRef.current.x) * 0.1;
    mouseRef.current.vy = (newY - mouseRef.current.y) * 0.1;

    mouseRef.current.x = newX;
    mouseRef.current.y = newY;
  }, []);

  const updateParticles = useCallback((deltaTime: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    const mouse = mouseRef.current;

    // Clear canvas with fade effect
    ctx.fillStyle = isDark ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(0, 0, width, height);

    // Update and draw particles
    particlesRef.current.forEach((particle) => {
      // Mouse interaction
      const dx = mouse.x - particle.x;
      const dy = mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150) {
        const force = (150 - distance) / 150;
        particle.vx += (dx / distance) * force * mouseInfluence * 0.5;
        particle.vy += (dy / distance) * force * mouseInfluence * 0.5;
      }

      // Update position
      particle.x += particle.vx * deltaTime * 0.1;
      particle.y += particle.vy * deltaTime * 0.1;

      // Apply friction
      particle.vx *= 0.98;
      particle.vy *= 0.98;

      // Bounce off walls
      if (particle.x < 0 || particle.x > width) {
        particle.vx *= -0.8;
        particle.x = Math.max(0, Math.min(width, particle.x));
      }
      if (particle.y < 0 || particle.y > height) {
        particle.vy *= -0.8;
        particle.y = Math.max(0, Math.min(height, particle.y));
      }

      // Update life
      particle.life -= deltaTime * 0.02;
      if (particle.life <= 0) {
        // Respawn particle
        particle.x = Math.random() * width;
        particle.y = Math.random() * height;
        particle.vx = (Math.random() - 0.5) * 1;
        particle.vy = (Math.random() - 0.5) * 1;
        particle.life = particle.maxLife;
        particle.color = colors[Math.floor(Math.random() * colors.length)];
      }

      // Reset connections
      particle.connections = [];
    });

    // Find connections
    for (let i = 0; i < particlesRef.current.length; i++) {
      for (let j = i + 1; j < particlesRef.current.length; j++) {
        const p1 = particlesRef.current[i];
        const p2 = particlesRef.current[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          p1.connections.push(j);
          p2.connections.push(i);

          // Draw connection
          const opacity = (1 - distance / connectionDistance) * 0.3;
          ctx.strokeStyle = `rgba(147, 51, 234, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particlesRef.current.forEach((particle) => {
      const alpha = particle.life / particle.maxLife;
      const size = particle.size * (0.5 + alpha * 0.5);

      // Glow effect
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, size * 2
      );
      gradient.addColorStop(0, particle.color.replace('0.6', `${alpha * 0.8}`).replace('0.8', `${alpha * 0.8}`));
      gradient.addColorStop(1, particle.color.replace('0.6', '0').replace('0.8', '0'));

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, size * 2, 0, Math.PI * 2);
      ctx.fill();

      // Core particle
      ctx.fillStyle = particle.color.replace('0.6', `${alpha}`).replace('0.8', `${alpha}`);
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
      ctx.fill();
    });
  }, [connectionDistance, mouseInfluence, colors, isDark]);

  const animate = useCallback((currentTime: number) => {
    const deltaTime = currentTime - lastTimeRef.current;
    lastTimeRef.current = currentTime;

    updateParticles(deltaTime);
    animationRef.current = requestAnimationFrame(animate);
  }, [updateParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
      initParticles(rect.width, rect.height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse and touch events
    const handleMouseMove = (e: MouseEvent) => updateMouse(e);
    const handleTouchMove = (e: TouchEvent) => updateMouse(e);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initParticles, updateMouse, animate]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
};