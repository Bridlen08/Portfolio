import { motion } from "framer-motion";
import { SectionWrapper, SectionHeading } from "./SectionWrapper";
import { ACHIEVEMENTS } from "../data/portfolio";

export function Achievements() {
  return (
    <SectionWrapper id="achievements">
      <div className="max-w-4xl mx-auto">
        <SectionHeading label="Milestones" title="Achievements" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div
              key={i}
              className="glass-card rounded-2xl p-5"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div className="text-3xl mb-3">{a.icon}</div>
              <p className="text-sm text-white/75 leading-relaxed">{a.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
