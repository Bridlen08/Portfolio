import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { SectionWrapper, SectionHeading } from "./SectionWrapper";
import { CERTIFICATIONS } from "../data/portfolio";

export function Certifications() {
  return (
    <SectionWrapper id="certifications">
      <div className="max-w-5xl mx-auto">
        <SectionHeading label="Credentials" title="Certifications" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CERTIFICATIONS.map((cert, i) => (
            <motion.div
              key={i}
              className="glass-card rounded-2xl p-5 flex items-start gap-4 group"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -4 }}
            >
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center flex-shrink-0 shadow-md`}>
                <Award size={18} className="text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white leading-tight group-hover:text-violet-400 transition-colors">{cert.title}</h3>
                <p className="text-xs text-white/50 mt-1">{cert.issuer}</p>
                <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-semibold border border-violet-500/30 bg-violet-500/10 text-violet-400">Certified</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
