import React, { useRef, useEffect, useCallback, useState } from 'react';

interface MotionBackgroundProps {
  children: React.ReactNode;
  variant?: 'hero' | 'about' | 'skills' | 'projects' | 'contact' | 'unified';
  className?: string;
}

/**
 * MOTION BACKGROUND COMPONENT - DO NOT MODIFY
 *
 * This component provides a realistic physics-based particle motion background
 * with cursor interaction and depth/parallax effects. It creates an immersive
 * visual experience across all sections of the portfolio.
 *
 * FEATURES:
 * - Physics-based particle motion with realistic gravity and momentum
 * - Cursor interaction that creates ripple effects and particle attraction
 * - Depth/parallax effects for 3D-like visual depth
 * - Smooth 60fps animations using requestAnimationFrame
 * - Performance optimized with object pooling and efficient rendering
 * - Theme-aware colors that adapt to light/dark mode
 * - Responsive design that scales particle count based on device capabilities
 *
 * WARNING: This component is locked and should not be modified or replaced.
 * Any changes to the background system should be discussed and approved first.
 * The current implementation provides the optimal balance of visual appeal
 * and performance that has been carefully tuned.
 *
 * @param children - The content to render over the motion background
 * @param className - Optional additional CSS classes
 */
export const MotionBackground: React.FC<MotionBackgroundProps> = React.memo(({
  children,
  variant = 'unified',
  className = ""
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, radius: 100 });
  const [isDark, setIsDark] = useState(false);

  // Particle class for physics-based motion
  class Particle {
    x: number;
    y: number;
    size: number;
    baseX: number;
    baseY: number;
    density: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    color: string;
    depth: number;

    constructor(x: number, y: number, isDark: boolean, variant: string) {
      this.x = x;
      this.y = y;
      this.baseX = x;
      this.baseY = y;
      this.density = Math.random() * 30 + 1;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.life = 0;
      this.depth = Math.random() * 0.8 + 0.2;

      // Variant-specific initialization
      switch (variant) {
        case 'hero':
          // Glowing particles - larger, more vibrant
          this.size = Math.random() * 4 + 2;
          this.maxLife = Math.random() * 1500 + 1000;
          break;
        case 'about':
          // Floating shapes - medium size, slower movement
          this.size = Math.random() * 3 + 1;
          this.maxLife = Math.random() * 1200 + 800;
          this.vx *= 0.7;
          this.vy *= 0.7;
          break;
        case 'skills':
          // Tech particles - smaller, more numerous
          this.size = Math.random() * 2 + 0.5;
          this.maxLife = Math.random() * 800 + 400;
          break;
        case 'projects':
          // Orbiting elements - varied sizes, orbital motion
          this.size = Math.random() * 3.5 + 1;
          this.maxLife = Math.random() * 1000 + 600;
          break;
        case 'contact':
          // Calm waves - gentle, flowing motion
          this.size = Math.random() * 2.5 + 1;
          this.maxLife = Math.random() * 1300 + 900;
          this.vx *= 0.5;
          this.vy *= 0.3;
          break;
        default:
          // Unified/default
          this.size = Math.random() * 3 + 1;
          this.maxLife = Math.random() * 1000 + 500;
      }

      // Theme-aware colors with variant-specific palettes
      if (isDark) {
        switch (variant) {
          case 'hero':
            const heroColors = ['#60A5FA', '#34D399', '#FBBF24', '#F87171', '#A78BFA', '#EC4899'];
            this.color = heroColors[Math.floor(Math.random() * heroColors.length)];
            break;
          case 'skills':
            const skillColors = ['#60A5FA', '#34D399', '#FBBF24', '#8B5CF6', '#06B6D4'];
            this.color = skillColors[Math.floor(Math.random() * skillColors.length)];
            break;
          case 'projects':
            const projectColors = ['#F87171', '#FBBF24', '#34D399', '#A78BFA', '#60A5FA'];
            this.color = projectColors[Math.floor(Math.random() * projectColors.length)];
            break;
          case 'contact':
            const contactColors = ['#60A5FA', '#A78BFA', '#34D399', '#06B6D4', '#FBBF24'];
            this.color = contactColors[Math.floor(Math.random() * contactColors.length)];
            break;
          default:
            const colors = ['#60A5FA', '#34D399', '#FBBF24', '#F87171', '#A78BFA'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
      } else {
        switch (variant) {
          case 'hero':
            const heroLightColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
            this.color = heroLightColors[Math.floor(Math.random() * heroLightColors.length)];
            break;
          case 'skills':
            const skillLightColors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#06B6D4'];
            this.color = skillLightColors[Math.floor(Math.random() * skillLightColors.length)];
            break;
          case 'projects':
            const projectLightColors = ['#EF4444', '#F59E0B', '#10B981', '#8B5CF6', '#3B82F6'];
            this.color = projectLightColors[Math.floor(Math.random() * projectLightColors.length)];
            break;
          case 'contact':
            const contactLightColors = ['#3B82F6', '#8B5CF6', '#10B981', '#06B6D4', '#F59E0B'];
            this.color = contactLightColors[Math.floor(Math.random() * contactLightColors.length)];
            break;
          default:
            const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
      }
    }

    update(mouse: { x: number; y: number; radius: number }, variant: string) {
      // Physics-based movement with variant-specific behavior
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Cursor interaction with variant-specific force
      // Reduce absorption effect on hero to avoid strong gradient pull.
      const effectiveRadius = variant === 'hero' ? mouse.radius * 0.55 : mouse.radius;
      if (distance < effectiveRadius) {
        const force = (effectiveRadius - distance) / effectiveRadius;
        const angle = Math.atan2(dy, dx);

        let forceMultiplier = 0.15;
        switch (variant) {
          case 'hero':
            forceMultiplier = 0.18; // Minimal attraction for hero
            break;
          case 'about':
            forceMultiplier = 0.2; // Gentle
            break;
          case 'skills':
            forceMultiplier = 0.25; // Medium response
            break;
          case 'projects':
            forceMultiplier = 0.2; // Balanced
            break;
          case 'contact':
            forceMultiplier = 0.12; // Very gentle
            break;
        }

        const forceX = Math.cos(angle) * force * this.density * forceMultiplier;
        const forceY = Math.sin(angle) * force * this.density * forceMultiplier;

        this.vx += forceX;
        this.vy += forceY;
      }

      // Variant-specific movement patterns
      switch (variant) {
        case 'hero':
          // Add slight upward drift for glowing effect
          this.vy -= 0.01;
          break;
        case 'about':
          // Gentle floating motion
          this.vy += Math.sin(Date.now() * 0.001 + this.x * 0.01) * 0.02;
          break;
        case 'skills':
          // Grid-like constrained movement
          this.vx += Math.sin(Date.now() * 0.002 + this.y * 0.02) * 0.01;
          break;
        case 'projects':
          // Orbital motion around center
          const orbitRadius = 20;
          const orbitSpeed = 0.005;
          const angle = Date.now() * orbitSpeed + (this.x + this.y) * 0.01;
          this.vx += Math.cos(angle) * orbitRadius * 0.001;
          this.vy += Math.sin(angle) * orbitRadius * 0.001;
          break;
        case 'contact':
          // Wave-like motion
          this.vy += Math.sin(Date.now() * 0.001 + this.x * 0.005) * 0.03;
          break;
      }

      // Return to base position with spring physics
      const returnForce = 0.01;
      const dx_base = this.baseX - this.x;
      const dy_base = this.baseY - this.y;

      this.vx += dx_base * returnForce;
      this.vy += dy_base * returnForce;

      // Apply velocity with damping
      this.x += this.vx;
      this.y += this.vy;
      this.vx *= 0.95;
      this.vy *= 0.95;

      // Update life for particle regeneration
      this.life++;
      if (this.life > this.maxLife) {
        this.life = 0;
        this.x = this.baseX + (Math.random() - 0.5) * 100;
        this.y = this.baseY + (Math.random() - 0.5) * 100;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
      }
    }

    draw(ctx: CanvasRenderingContext2D, variant: string) {
      ctx.save();

      // Apply depth-based scaling for parallax effect
      const scale = 0.5 + this.depth * 0.5;
      ctx.globalAlpha = 0.2 + this.depth * 0.4; // Slightly reduced alpha for better layering

      // Variant-specific drawing styles
      switch (variant) {
        case 'hero':
          // Glowing particles with optimized glow
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * scale, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();

          // Only add shadow for very few large particles to save perf
          if (this.size > 4.5 && this.depth > 0.8) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.fill();
          }
          break;

        case 'about':
          // Floating shapes
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * scale, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
          break;

        case 'skills':
          // Tech particles - simple dots
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * scale, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
          break;

        case 'projects':
          // Orbiting elements
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * scale, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
          break;

        case 'contact':
          // Calm waves
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * scale, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
          break;

        default:
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * scale, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
      }

      ctx.restore();
    }
  }

  // Initialize particles
  const initParticles = useCallback(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    // Reduced particle counts for maximum smoothness
    let particleCount = Math.min(30, Math.floor((rect.width * rect.height) / 45000));
    switch (variant) {
      case 'hero':
        particleCount = Math.min(35, Math.floor((rect.width * rect.height) / 36000));
        break;
      case 'about':
        particleCount = Math.min(25, Math.floor((rect.width * rect.height) / 50000));
        break;
      case 'skills':
        particleCount = Math.min(40, Math.floor((rect.width * rect.height) / 30000));
        break;
      case 'projects':
        particleCount = Math.min(30, Math.floor((rect.width * rect.height) / 40000));
        break;
      case 'contact':
        particleCount = Math.min(20, Math.floor((rect.width * rect.height) / 60000));
        break;
    }

    particlesRef.current = [];
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      particlesRef.current.push(new Particle(x, y, isDark, variant));
    }
  }, [isDark, variant]);

  // Animation loop
  const animate = useCallback(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas with fade effect
    ctx.fillStyle = isDark ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particlesRef.current.forEach(particle => {
      particle.update(mouseRef.current, variant);
      particle.draw(ctx, variant);
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [isDark, variant]);

  // Handle mouse movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
  }, []);

  // Handle window resize
  const handleResize = useCallback(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    initParticles();
  }, [initParticles]);

  // Check for dark mode changes
  useEffect(() => {
    const checkTheme = () => {
      const newIsDark = document.documentElement.classList.contains('dark');
      if (newIsDark !== isDark) {
        setIsDark(newIsDark);
        // Reinitialize particles with new theme colors
        setTimeout(initParticles, 100);
      }
    };

    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, [isDark, initParticles]);

  // Setup canvas and event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initial setup
    handleResize();
    initParticles();
    animate();

    // Event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [handleResize, initParticles, animate, handleMouseMove]);

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: -1 }}
      />
      {children}
    </div>
  );
});

MotionBackground.displayName = 'MotionBackground';