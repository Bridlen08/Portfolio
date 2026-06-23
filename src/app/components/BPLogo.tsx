import { motion } from "framer-motion";

interface BPLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  animate?: boolean;
  className?: string;
}

const sizes = {
  sm:  { outer: 40,  inner: 34, text: "text-sm",    ring: 2 },
  md:  { outer: 56,  inner: 48, text: "text-base",  ring: 2 },
  lg:  { outer: 120, inner: 104,text: "text-3xl",   ring: 3 },
  xl:  { outer: 160, inner: 140,text: "text-5xl",   ring: 3 },
};

export function BPLogo({ size = "md", animate = true, className = "" }: BPLogoProps) {
  const s = sizes[size];

  return (
    <motion.div
      className={`relative flex items-center justify-center flex-shrink-0 ${className}`}
      style={{ width: s.outer, height: s.outer }}
      initial={animate ? { scale: 0, opacity: 0 } : false}
      animate={animate ? { scale: 1, opacity: 1 } : false}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
    >
      {/* Pulsing outer glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "conic-gradient(from 0deg, #7c3aed, #ec4899, #06b6d4, #7c3aed)",
          padding: s.ring,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Pulse ring */}
      <motion.div
        className="absolute rounded-full border-2 border-violet-500/40"
        style={{ width: s.outer + 12, height: s.outer + 12 }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.1, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />

      {/* Inner circle */}
      <div
        className="relative rounded-full flex items-center justify-center bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 dark:from-violet-950 dark:via-purple-950 dark:to-indigo-950 border border-violet-500/30"
        style={{ width: s.inner, height: s.inner, zIndex: 1 }}
      >
        <span
          className={`font-black tracking-tight bg-gradient-to-br from-violet-300 to-pink-300 bg-clip-text text-transparent select-none ${s.text}`}
          style={{ fontFamily: "'Inter var', Inter, sans-serif" }}
        >
          BP
        </span>
      </div>
    </motion.div>
  );
}
