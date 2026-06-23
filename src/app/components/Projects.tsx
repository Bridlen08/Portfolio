import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import { SectionWrapper, SectionHeading } from "./SectionWrapper";
import { PROJECTS } from "../data/portfolio";

function ProjectModal({ project, onClose }: { project: typeof PROJECTS[0]; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
      <motion.div
        className="relative z-10 w-full max-w-lg rounded-2xl border border-white/15 bg-black/80 backdrop-blur-xl overflow-hidden shadow-2xl"
        initial={{ scale: 0.85, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.85, y: 40 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className={`h-28 bg-gradient-to-br ${project.color} flex items-center justify-center relative`}>
          <span className="text-6xl">{project.icon}</span>
          <button onClick={onClose} className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/30 flex items-center justify-center text-white">
            <X size={14} />
          </button>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map(t => (
              <span key={t} className="px-2.5 py-1 rounded-full text-xs font-semibold border border-violet-500/30 bg-violet-500/10 text-violet-300">{t}</span>
            ))}
          </div>
          <ul className="space-y-1.5">
            {project.features.map(f => (
              <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [selected, setSelected] = useState<typeof PROJECTS[0] | null>(null);

  // Filter out the 2 mobile apps and take the top 4 remaining best projects
  const mobileProjects = PROJECTS.filter(p => p.type === "mobile").slice(0, 2);
  const featuredProjects = PROJECTS.filter(p => p.type !== "mobile").slice(0, 4);

  // Helper render function to keep things DRY (Don't Repeat Yourself)
  const renderProjectCard = (p: typeof PROJECTS[0], i: number) => (
    <motion.div
      key={p.title}
      className="glass-card rounded-2xl overflow-hidden cursor-pointer group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.07 }}
      whileHover={{ y: -6, scale: 1.02 }}
      onClick={() => setSelected(p)}
    >
      <div className={`h-32 bg-gradient-to-br ${p.color} flex items-center justify-center relative overflow-hidden`}>
        <span className="text-6xl">{p.icon}</span>
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-white text-sm font-semibold">View Details →</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-sm font-bold text-white mb-2 group-hover:text-violet-400 transition-colors">{p.title}</h3>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {p.tech.slice(0, 3).map(t => (
            <span key={t} className="px-2 py-0.5 rounded-full text-[10px] font-medium border border-white/10 bg-white/5 text-white/60">{t}</span>
          ))}
        </div>
        <ul className="space-y-1">
          {p.features.slice(0, 3).map(f => (
            <li key={f} className="flex items-center gap-1.5 text-xs text-white/50">
              <span className="w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />{f}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );

  return (
    <SectionWrapper id="projects">
      <div className="max-w-6xl mx-auto space-y-12">
        <SectionHeading label="What I've Built" title="Featured Projects" />

        {/* Mobile Applications Section */}
        {mobileProjects.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-violet-400 tracking-wide uppercase text-sm">Mobile Applications</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mobileProjects.map((p, i) => renderProjectCard(p, i))}
            </div>
          </div>
        )}

        {/* Other Featured Projects Section */}
        {featuredProjects.length > 0 && (
          <div className="space-y-4 pt-4">
            <h4 className="text-lg font-semibold text-white/80 tracking-wide uppercase text-sm">Core Engineering & Web</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
              {featuredProjects.map((p, i) => renderProjectCard(p, i))}
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </SectionWrapper>
  );
}