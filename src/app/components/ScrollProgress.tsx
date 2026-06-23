import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[9999] h-0.5 origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #7c3aed, #ec4899, #06b6d4)",
      }}
    />
  );
}
