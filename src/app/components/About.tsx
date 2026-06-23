import { motion } from "framer-motion";
import { GraduationCap, Code2, Smartphone, Cloud } from "lucide-react";
import { SectionWrapper, SectionHeading } from "./SectionWrapper";
import { OWNER } from "../data/portfolio";

const highlights = [
  { icon: Code2,       label: "Full Stack", desc: "MERN & Django",  color: "from-violet-500 to-purple-600" },
  { icon: Smartphone,  label: "Mobile",     desc: "Flutter & Dart", color: "from-blue-500 to-cyan-600"    },
  { icon: Cloud,       label: "Cloud",      desc: "AWS Learning",   color: "from-amber-500 to-orange-600" },
  { icon: GraduationCap, label: "Student",  desc: "B.E. ECE",       color: "from-green-500 to-emerald-600"},
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export function About() {
  return (
    <SectionWrapper id="about">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="Who I Am" title="About Me" />

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-16"
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={containerVariants}
        >
          {/* Photo */}
          <motion.div variants={fadeUp} className="flex justify-center">
            <div className="relative">
              {/* Glow */}
              <motion.div
                className="absolute inset-[-16px] rounded-full blur-3xl opacity-35 pointer-events-none"
                style={{ background: "linear-gradient(135deg,#7c3aed,#ec4899)" }}
                animate={{ scale: [1, 1.08, 1], opacity: [0.25, 0.45, 0.25] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Rotating border */}
              <motion.div
                className="absolute inset-[-3px] rounded-full border-2 border-transparent pointer-events-none"
                style={{ background: "linear-gradient(#0d0d1a,#0d0d1a) padding-box, conic-gradient(from 0deg,#7c3aed,#ec4899,#06b6d4,#7c3aed) border-box" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
              {/* Image */}
              <motion.div
                className="relative overflow-hidden rounded-full shadow-2xl"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src="/My_image2.jpeg"
                  alt={OWNER.name}
                  className="w-[240px] h-[240px] object-cover rounded-full"
                  style={{ objectPosition: "center top" }}
                  loading="eager"
                />
              </motion.div>
              
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div variants={fadeUp} className="space-y-5">
            <h3 className="text-2xl font-bold text-white">{OWNER.name}</h3>
            <p className="text-sm font-semibold text-violet-400">{OWNER.titles[0]} · {OWNER.titles[1]}</p>

            {OWNER.about.map((para, i) => (
              <p key={i} className="text-white/65 leading-relaxed text-sm">{para}</p>
            ))}

            {/* Education */}
            <div className="glass-card rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-1.5">
                <GraduationCap size={15} className="text-violet-400" />
                <span className="text-xs font-bold text-white">Education</span>
              </div>
              <p className="text-sm font-semibold text-white">B.E. Electronics and Communication Engineering</p>
              <p className="text-xs text-violet-400 font-medium mt-0.5">Sri Eshwar College of Engineering</p>
            </div>

            {/* Traits */}
            <div className="flex flex-wrap gap-2">
              {OWNER.about.length > 0 && ["Problem Solver", "Quick Learner", "Team Player", "Creative Thinker"].map(t => (
                <span key={t} className="px-3 py-1.5 text-xs font-semibold rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300">{t}</span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Highlight cards */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={containerVariants}
        >
          {highlights.map(({ icon: Icon, label, desc, color }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              className="glass-card p-5 rounded-2xl flex flex-col items-center text-center gap-3 group"
              whileHover={{ y: -4, scale: 1.03 }}
            >
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
                <Icon size={18} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{label}</p>
                <p className="text-xs text-white/50 mt-0.5">{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
