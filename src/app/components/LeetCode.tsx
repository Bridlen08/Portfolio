import { motion } from "framer-motion";
import { Code2, Trophy, Target, Zap } from "lucide-react";
import { SectionWrapper, SectionHeading } from "./SectionWrapper";

const stats = [
  { icon: Code2,  label: "Problems Solved", value: "237+",  color: "from-violet-500 to-purple-600", sub: "and growing" },
  { icon: Target, label: "Easy",value: "178+",   color: "from-green-500 to-emerald-600", sub: "solved" },
  { icon: Zap,    label: "Medium",value: "52+",   color: "from-amber-500 to-orange-600",  sub: "solved" },
  { icon: Trophy, label: "Hard",value: "7+",   color: "from-red-500 to-pink-600",      sub: "solved" },
];

export function LeetCode() {
  return (
    <SectionWrapper id="leetcode">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          label="Competitive Coding"
          title="LeetCode Journey"
          subtitle="Continuously sharpening problem-solving skills through algorithmic challenges."
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
          {stats.map(({ icon: Icon, label, value, color, sub }, i) => (
            <motion.div
              key={label}
              className="glass-card rounded-2xl p-5 text-center"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-3`}>
                <Icon size={18} className="text-white" />
              </div>
              <p className={`text-2xl font-black bg-gradient-to-br ${color} bg-clip-text text-transparent`}>{value}</p>
              <p className="text-xs font-bold text-white mt-1">{label}</p>
              <p className="text-[10px] text-white/40 mt-0.5">{sub}</p>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="glass-card rounded-2xl p-6 text-center"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.35 }}
        >
          <p className="text-white/60 text-sm mb-4">
            Focused on Data Structures, Algorithms, and problem-solving patterns.
            Dynamic stats integration planned for future updates.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Arrays", "Strings", "Linked Lists", "Trees", "Graphs", "DP", "Recursion", "Sorting"].map(t => (
              <span key={t} className="px-3 py-1.5 text-xs font-medium rounded-full border border-white/10 bg-white/5 text-white/60">{t}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
