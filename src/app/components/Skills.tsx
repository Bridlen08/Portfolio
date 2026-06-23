import { motion } from "framer-motion";
import { SectionWrapper, SectionHeading } from "./SectionWrapper";
import { SKILLS } from "../data/portfolio";

const COLORS: Record<string, string> = {
  "Programming Languages": "from-violet-500 to-purple-600",
  "Frontend":   "from-blue-500 to-cyan-600",
  "Backend":    "from-green-500 to-emerald-600",
  "Mobile":     "from-pink-500 to-rose-600",
  "Database":   "from-amber-500 to-orange-600",
  "Core CS":    "from-red-500 to-pink-600",
  "Tools":      "from-teal-500 to-cyan-600",
  "Cloud":      "from-sky-500 to-blue-600",
};

export function Skills() {
  return (
    <SectionWrapper id="skills">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="Technical Toolkit" title="Skills & Expertise" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Object.entries(SKILLS).map(([cat, skills], i) => (
            <motion.div
              key={cat}
              className="glass-card rounded-2xl p-5"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div className={`inline-flex px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${COLORS[cat] ?? "from-violet-500 to-purple-600"} mb-4`}>
                {cat}
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span key={skill}
                    className="px-2.5 py-1 text-xs font-medium rounded-lg border dark:border-white/10 border-violet-200 dark:bg-white/5 bg-violet-50 dark:text-white/75 text-violet-900 hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-300 transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
