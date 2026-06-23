import { motion } from "framer-motion";
import { Download, GraduationCap, Briefcase, Code2 } from "lucide-react";
import { OWNER, SKILLS, EXPERIENCE } from "../data/portfolio";
import { SectionWrapper, SectionHeading } from "./SectionWrapper";

const RESUME_SKILLS = [
  { category: "Frontend",skills: SKILLS["Frontend"],color: "text-violet-400" },
  { category: "Backend",skills: SKILLS["Backend"],color: "text-blue-400" },
  { category: "Mobile",skills: [...SKILLS["Mobile"], ...SKILLS["Database"]], color: "text-green-400" },
];

export function Resume() {
  return (
    <SectionWrapper id="resume">
      <div className="max-w-4xl mx-auto">
        <SectionHeading label="My Background" title="Resume" />

        {/* Download CTA */}
        <div className="text-center mb-10">
          <motion.a
            href={OWNER.resume}
            download="Bridleen_P_Resume.pdf"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-purple-700 text-white font-semibold text-sm shadow-lg shadow-violet-500/30 hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
          >
            <Download size={16} />
            Download PDF Resume
          </motion.a>
        </div>

        {/* Resume card */}
        <motion.div
          className="glass-card rounded-3xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >

          <div className="p-8 md:p-10">
            {/* Profile header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10 pb-8 border-b border-white/10">
              {/* <BPLogo size="lg" animate={false} /> */}
              <div className="text-center sm:text-left">
                <h3 className="text-2xl font-extrabold text-white mb-1">{OWNER.name}</h3>
                <p className="text-violet-400 font-semibold mb-3">
                  Full Stack Developer · MERN Stack · Flutter · Django
                </p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-xs text-white/50">
                  <a href={`mailto:${OWNER.email}`} className="hover:text-violet-400 transition-colors">{OWNER.email}</a>
                  <span>{OWNER.location}</span>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="mb-8">
              <h4 className="text-xs font-bold tracking-widest uppercase text-white/40 mb-3">Summary</h4>
              <p className="text-sm text-white/65 leading-relaxed">{OWNER.description}</p>
            </div>

            {/* Education */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <GraduationCap size={14} className="text-white" />
                </div>
                <h4 className="text-sm font-bold text-white">Education</h4>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h5 className="text-sm font-bold text-white">B.E. — Electronics & Communication Engineering</h5>
                <p className="text-violet-400 text-xs font-semibold mt-0.5">Sri Eshwar College of Engineering</p>
                <p className="text-xs text-white/40 mt-1">2024 – 2028</p>
              </div>
            </div>

            {/* Experience */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                  <Briefcase size={14} className="text-white" />
                </div>
                <h4 className="text-sm font-bold text-white">Experience</h4>
              </div>
              <div className="space-y-3">
                {EXPERIENCE.map((exp, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <h5 className="text-sm font-bold text-white">{exp.role}</h5>
                        <p className="text-blue-400 text-xs font-semibold mt-0.5">{exp.type}</p>
                      </div>
                    </div>
                    <ul className="mt-2 space-y-1">
                      {exp.points.slice(0, 2).map((pt, j) => (
                        <li key={j} className="flex items-start gap-1.5 text-xs text-white/50">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />{pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <Code2 size={14} className="text-white" />
                </div>
                <h4 className="text-sm font-bold text-white">Skills</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {RESUME_SKILLS.map((group, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <h5 className={`text-xs font-bold mb-2 ${group.color}`}>{group.category}</h5>
                    <div className="flex flex-wrap gap-1.5">
                      {group.skills.map(skill => (
                        <span key={skill} className="px-2 py-0.5 rounded-full text-[10px] bg-white/5 border border-white/10 text-white/60">{skill}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
