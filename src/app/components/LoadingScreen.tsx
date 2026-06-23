import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { BPLogo } from "./BPLogo";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return Math.min(p + Math.random() * 12 + 3, 100);
      });
    }, 80);

    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => { setDone(true); setTimeout(onComplete, 600); }, 300);
    }, 2200);

    return () => { clearInterval(interval); clearTimeout(timer); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center"
          style={{ background: "linear-gradient(135deg, #0d0d1a 0%, #1a0a2e 60%, #0d0d1a 100%)" }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6 }}
        >
          {/* Glow blobs */}
          <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full blur-[120px] opacity-20" style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-[100px] opacity-15" style={{ background: "radial-gradient(circle, #ec4899, transparent)" }} />

          <div className="relative z-10 flex flex-col items-center gap-6">
            <BPLogo size="xl" animate />

            <motion.h1
              className="text-3xl font-black text-white tracking-tight"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            >
              Bridleen P
            </motion.h1>

            <motion.p
              className="text-xs text-white/30 tracking-widest uppercase"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            >
              Full Stack Developer
            </motion.p>

            <motion.div
              className="w-56"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            >
              <div className="h-0.5 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-500"
                  style={{ width: `${progress}%`, transition: "width 0.1s ease" }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-[10px] text-white/25">Loading portfolio</span>
                <span className="text-[10px] text-white/40 font-mono">{Math.round(progress)}%</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
