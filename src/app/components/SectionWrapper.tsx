import { motion } from "framer-motion";
import React from "react";

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionWrapper({ id, children, className = "" }: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      className={`relative z-10 py-24 px-6 ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}

export function SectionHeading({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-16">
      <p className="text-xs font-bold tracking-widest uppercase text-violet-500 mb-3">{label}</p>
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
        <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
      <div className="w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-violet-500 to-pink-500" />
      {subtitle && (
        <p className="mt-4 max-w-2xl mx-auto text-sm leading-relaxed text-gray-600 dark:text-white/55">{subtitle}</p>
      )}
    </div>
  );
}
