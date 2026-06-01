import React, { useRef, useEffect, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
  size: number;
  color: string;
  glow: boolean;
  mass: number;
  friction: number;
}

interface PhysicsBackgroundProps {
  particleCount?: number;
  mouseInfluence?: number;
  gravity?: number;
}

export const PhysicsBackground: React.FC<PhysicsBackgroundProps> = ({
  particleCount: initialCount = 50,
  mouseInfluence = 0.5,
  gravity = 0.1,
}) => {
  const particleCount = window.innerWidth < 768 ? Math.floor(initialCount * 0.5) : initialCount;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);

  const colors = [
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
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      ax: 0,
      ay: 0,
      size: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      glow: Math.random() > 0.7,
      mass: Math.random() * 0.5 + 0.5,
      friction: 0.98,
    }));
  }, [particleCount]);

  const updateMouse = useCallback((e: MouseEvent | TouchEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

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

    const { width, height } = canvas;
    const mouse = mouseRef.current;

    particlesRef.current.forEach((particle, index) => {
      // Reset acceleration
      particle.ax = 0;
      particle.ay = gravity * particle.mass;

      // Mouse interaction
      const dx = mouse.x - particle.x;
      const dy = mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150) {
        const force = (150 - distance) / 150;
        const angle = Math.atan2(dy, dx);

        // Attraction/repulsion based on distance
        const attraction = distance < 50 ? -1 : 1;
        particle.ax += Math.cos(angle) * force * mouseInfluence * attraction / particle.mass;
        particle.ay += Math.sin(angle) * force * mouseInfluence * attraction / particle.mass;
      }

      // Particle interactions (simple collision avoidance)
      particlesRef.current.forEach((other, otherIndex) => {
        if (index === otherIndex) return;

        const dx2 = other.x - particle.x;
        const dy2 = other.y - particle.y;
        const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

        if (distance2 < 30) {
          const force = (30 - distance2) / 30;
          const angle = Math.atan2(dy2, dx2);
          particle.ax -= Math.cos(angle) * force * 0.5;
          particle.ay -= Math.sin(angle) * force * 0.5;
        }
      });

      // Update velocity with acceleration
      particle.vx += particle.ax * deltaTime;
      particle.vy += particle.ay * deltaTime;

      // Apply friction
      particle.vx *= particle.friction;
      particle.vy *= particle.friction;

      // Update position
      particle.x += particle.vx * deltaTime;
      particle.y += particle.vy * deltaTime;

      // Boundary conditions with bounce
      if (particle.x < 0 || particle.x > width) {
        particle.vx *= -0.8;
        particle.x = Math.max(0, Math.min(width, particle.x));
      }
      if (particle.y < 0 || particle.y > height) {
        particle.vy *= -0.8;
        particle.y = Math.max(0, Math.min(height, particle.y));
      }

      // Idle motion
      if (Math.abs(particle.vx) < 0.1 && Math.abs(particle.vy) < 0.1) {
        particle.vx += (Math.random() - 0.5) * 0.02;
        particle.vy += (Math.random() - 0.5) * 0.02;
      }
    });
  }, [gravity, mouseInfluence]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Clear with gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, 'rgba(147, 51, 234, 0.05)');
    gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.03)');
    gradient.addColorStop(1, 'rgba(236, 72, 153, 0.05)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw particles
    particlesRef.current.forEach(particle => {
      ctx.save();

      if (particle.glow) {
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 15;
      }

      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    });

    // Draw connections between nearby particles
    particlesRef.current.forEach((particle, index) => {
      particlesRef.current.slice(index + 1).forEach(other => {
        const dx = other.x - particle.x;
        const dy = other.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          const opacity = (100 - distance) / 100 * 0.2;
          ctx.strokeStyle = `rgba(147, 51, 234, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        }
      });
    });
  }, []);

  const animate = useCallback((currentTime: number) => {
    const deltaTime = Math.min((currentTime - lastTimeRef.current) / 16.67, 2); // Cap at 2x speed
    lastTimeRef.current = currentTime;

    updateParticles(deltaTime);
    draw();

    animationRef.current = requestAnimationFrame(animate);
  }, [updateParticles, draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', updateMouse);
    window.addEventListener('touchmove', updateMouse, { passive: true });

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', updateMouse);
      window.removeEventListener('touchmove', updateMouse);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initParticles, updateMouse, animate]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};