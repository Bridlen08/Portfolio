import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { GitBranch, Star, Code2, Users, BookOpen, Activity } from "lucide-react";
import { SectionWrapper, SectionHeading } from "./SectionWrapper";
import { OWNER } from "../data/portfolio";

const STAT_CARDS = [
  { icon: BookOpen,   label: "Repositories",        value: "10+",   sub: "Public projects",          color: "from-violet-500 to-purple-600" },
  { icon: GitBranch,  label: "Contributions",        value: "100+",  sub: "Commits & PRs",            color: "from-blue-500 to-cyan-600"    },
  { icon: Star,       label: "Stars",                value: "Growing", sub: "Across repositories",    color: "from-amber-500 to-orange-600" },
  { icon: Code2,      label: "Languages",            value: "6+",    sub: "Python, JS, Dart & more",  color: "from-green-500 to-emerald-600"},
  { icon: Users,      label: "Followers",            value: "Growing", sub: "Developer community",    color: "from-pink-500 to-rose-600"    },
  { icon: Activity,   label: "Active Projects",      value: "6+",    sub: "Web & mobile apps",        color: "from-teal-500 to-cyan-600"    },
];

const LANGUAGES = [
  { name: "Python",     pct: 35, color: "#3B82F6" },
  { name: "JavaScript", pct: 25, color: "#F59E0B" },
  { name: "Dart",       pct: 20, color: "#06B6D4" },
  { name: "HTML/CSS",   pct: 15, color: "#EC4899" },
  { name: "Others",     pct: 5,  color: "#8B5CF6" },
];

export function GitHubStats() {
  return (
    <SectionWrapper id="github">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          label="Open Source"
          title="GitHub Stats"
          subtitle="Tracking coding activity, contributions, and open-source projects."
        />

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {STAT_CARDS.map(({ icon: Icon, label, value, sub, color }, i) => (
            <motion.div
              key={label}
              className="glass-card rounded-2xl p-5"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              whileHover={{ y: -4 }}
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3`}>
                <Icon size={18} className="text-white" />
              </div>
              <p className={`text-2xl font-black bg-gradient-to-br ${color} bg-clip-text text-transparent`}>{value}</p>
              <p className="text-xs font-bold text-white mt-1">{label}</p>
              <p className="text-[10px] text-white/40 mt-0.5">{sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Language breakdown */}
        <motion.div
          className="glass-card rounded-2xl p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-sm font-bold text-white mb-5 flex items-center gap-2">
            <Code2 size={15} className="text-violet-400" /> Most Used Languages
          </h3>
          <div className="space-y-3">
            {LANGUAGES.map(({ name, pct, color }) => (
              <div key={name}>
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-medium text-white/70">{name}</span>
                  <span className="text-xs font-mono text-white/40">{pct}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contribution activity note */}
        <motion.div
          className="glass-card rounded-2xl p-5 mb-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-wrap justify-center gap-2 mb-3">
            {Array.from({ length: 52 }).map((_, wi) => (
              <div key={wi} className="flex flex-col gap-1">
                {Array.from({ length: 7 }).map((_, di) => {
                  const intensity = Math.random();
                  const opacity = intensity > 0.75 ? "opacity-90" : intensity > 0.5 ? "opacity-50" : intensity > 0.25 ? "opacity-25" : "opacity-10";
                  return (
                    <div
                      key={di}
                      className={`w-2.5 h-2.5 rounded-sm bg-violet-500 ${opacity}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
          <p className="text-xs text-white/30">Contribution activity — connect GitHub for live data</p>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <a
            href={OWNER.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold border border-white/20 bg-white/5 text-white hover:bg-violet-500/15 hover:border-violet-500/40 transition-all text-sm"
          >
            <FaGithub size={16} /> View GitHub Profile
          </a>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
