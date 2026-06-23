import React from 'react';

interface MotionBackgroundProps {
  children: React.ReactNode;
  variant?: 'hero' | 'about' | 'skills' | 'projects' | 'contact' | 'unified';
  className?: string;
}

/**
 * Aurora / gradient-mesh motion background.
 * Pure CSS animations — no canvas, no particles.
 * Looks great in both light and dark mode.
 */
export const MotionBackground: React.FC<MotionBackgroundProps> = React.memo(({
  children,
  className = '',
}) => {
  return (
    <div className={`aurora-bg relative ${className}`}>
      {/* Orb 1 */}
      <div className="aurora-orb aurora-orb-1" />
      {/* Orb 2 */}
      <div className="aurora-orb aurora-orb-2" />
      {/* Orb 3 */}
      <div className="aurora-orb aurora-orb-3" />
      {/* Orb 4 — accent */}
      <div className="aurora-orb aurora-orb-4" />

      {/* Content sits above the orbs */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
});

MotionBackground.displayName = 'MotionBackground';
