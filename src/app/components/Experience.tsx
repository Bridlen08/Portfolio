import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { SectionWrapper, SectionHeading } from "./SectionWrapper";
import { EXPERIENCE } from "../data/portfolio";

export function Experience() {
  return (
    <SectionWrapper id="experience">
      <div className="max-w-3xl mx-auto">
        <SectionHeading label="Work History" title="Experience" />

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/50 via-purple-500/30 to-transparent" />

          <div className="space-y-10">
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={i}
                className="relative flex gap-6"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.15 }}
              >
                {/* Dot */}
                <div className="relative flex-shrink-0">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${exp.color} flex items-center justify-center shadow-lg z-10 relative`}>
                    <Briefcase size={18} className="text-white" />
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
                  />
                </div>

                <div className="glass-card rounded-2xl p-6 flex-1">
                  <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                    <div>
                      <span className="text-[10px] font-bold tracking-widest uppercase text-violet-400">{exp.type}</span>
                      <h3 className="text-base font-bold text-white mt-0.5">{exp.role}</h3>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {exp.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-white/65">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
