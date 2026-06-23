import { motion } from "framer-motion";
import { SectionWrapper, SectionHeading } from "./SectionWrapper";
import { TECH_STACK } from "../data/portfolio";

export function TechStack() {
  return (
    <SectionWrapper id="techstack">
      <div className="max-w-4xl mx-auto">
        <SectionHeading label="Tools I Use" title="Tech Stack" />
        <div className="flex flex-wrap justify-center gap-5">
          {TECH_STACK.map((tech, i) => (
            <motion.div
              key={tech.name}
              className="glass-card rounded-2xl px-5 py-4 flex flex-col items-center gap-2 min-w-[90px] cursor-default group"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              whileHover={{ y: -6, scale: 1.08 }}
            >
              <span className="text-3xl">{tech.icon}</span>
              <span className="text-xs font-semibold text-white/70 group-hover:text-white transition-colors">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
