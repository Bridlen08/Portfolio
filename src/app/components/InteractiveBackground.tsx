import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export function InteractiveBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 100 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Create different movement ranges for parallax layers
  const x1 = useTransform(mouseXSpring, [0, 1], [-50, 50]);
  const y1 = useTransform(mouseYSpring, [0, 1], [-50, 50]);

  const x2 = useTransform(mouseXSpring, [0, 1], [-30, 30]);
  const y2 = useTransform(mouseYSpring, [0, 1], [-30, 30]);

  const x3 = useTransform(mouseXSpring, [0, 1], [-70, 70]);
  const y3 = useTransform(mouseYSpring, [0, 1], [-70, 70]);

  const x4 = useTransform(mouseXSpring, [0, 1], [-40, 40]);
  const y4 = useTransform(mouseYSpring, [0, 1], [-40, 40]);

  const x5 = useTransform(mouseXSpring, [0, 1], [-60, 60]);
  const y5 = useTransform(mouseYSpring, [0, 1], [-60, 60]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Normalize to 0-1 range
      const x = clientX / innerWidth;
      const y = clientY / innerHeight;

      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Layer 1 - Purple blob */}
      <motion.div
        className="absolute top-20 left-20 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl"
        style={{ x: x1, y: y1 }}
      />

      {/* Layer 2 - Blue blob */}
      <motion.div
        className="absolute top-40 right-20 w-[500px] h-[500px] bg-blue-400/25 rounded-full blur-3xl"
        style={{ x: x2, y: y2 }}
      />

      {/* Layer 3 - Pink blob */}
      <motion.div
        className="absolute bottom-32 left-1/3 w-[450px] h-[450px] bg-pink-400/30 rounded-full blur-3xl"
        style={{ x: x3, y: y3 }}
      />

      {/* Layer 4 - Indigo blob */}
      <motion.div
        className="absolute top-1/2 right-1/4 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl"
        style={{ x: x4, y: y4 }}
      />

      {/* Layer 5 - Cyan blob */}
      <motion.div
        className="absolute bottom-20 right-40 w-[350px] h-[350px] bg-cyan-400/25 rounded-full blur-3xl"
        style={{ x: x5, y: y5 }}
      />

      {/* Grid overlay for depth */}
      <motion.div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          x: useTransform(mouseXSpring, [0, 1], [-20, 20]),
          y: useTransform(mouseYSpring, [0, 1], [-20, 20]),
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            x: useTransform(mouseXSpring, [0, 1], [
              -20 - Math.random() * 30,
              20 + Math.random() * 30,
            ]),
            y: useTransform(mouseYSpring, [0, 1], [
              -20 - Math.random() * 30,
              20 + Math.random() * 30,
            ]),
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Gradient mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-transparent to-blue-50/50 mix-blend-overlay" />
    </div>
  );
}
