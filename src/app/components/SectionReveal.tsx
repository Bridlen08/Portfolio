import { motion } from "framer-motion";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  label: string;
  id?: string;
}

/**
 * SectionReveal — lightweight scroll-triggered fade-in wrapper.
 * Removed expensive mouse-tracking state updates and cursor spotlight
 * that were causing dozens of re-renders per second.
 */
export function SectionReveal({ children, className = "", label: _label, id }: SectionRevealProps) {
  return (
    <motion.section
      id={id}
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="relative z-20">{children}</div>
    </motion.section>
  );
}
