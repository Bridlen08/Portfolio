import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CursorTracker() {
  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  // Trailing dot — more lag
  const trailX = useSpring(rawX, { stiffness: 80, damping: 20 });
  const trailY = useSpring(rawY, { stiffness: 80, damping: 20 });

  // Main dot — snappy
  const dotX = useSpring(rawX, { stiffness: 600, damping: 30 });
  const dotY = useSpring(rawY, { stiffness: 600, damping: 30 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovering(
        !!(t.tagName === "BUTTON" || t.tagName === "A" || t.closest("button") || t.closest("a"))
      );
    };
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [rawX, rawY]);

  return (
    <>
      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full border border-violet-500/50"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          width: hovering ? 44 : 32,
          height: hovering ? 44 : 32,
          borderColor: hovering ? "rgba(139,92,246,0.7)" : "rgba(139,92,246,0.4)",
          transition: "width 0.2s, height 0.2s, border-color 0.2s",
        }}
        animate={{ scale: clicking ? 0.8 : 1 }}
        transition={{ duration: 0.15 }}
      />

      {/* Main dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          background: hovering
            ? "linear-gradient(135deg,#7c3aed,#ec4899)"
            : "linear-gradient(135deg,#a78bfa,#c084fc)",
          width: hovering ? 8 : 6,
          height: hovering ? 8 : 6,
          transition: "width 0.2s, height 0.2s, background 0.2s",
        }}
        animate={{ scale: clicking ? 0.6 : 1 }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
}
