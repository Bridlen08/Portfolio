import { motion } from "framer-motion";
import { Heart, ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { BPLogo } from "./BPLogo";
import { OWNER, NAV_ITEMS } from "../data/portfolio";

export function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <BPLogo size="md" animate={false} />
              <span className="font-bold text-white text-lg">{OWNER.name}</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Full Stack Developer building scalable web and mobile applications.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-[10px] font-bold tracking-widest uppercase text-white/30 mb-4">Quick Links</p>
            <div className="grid grid-cols-2 gap-y-2">
              {NAV_ITEMS.slice(0, 8).map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-sm text-white/50 hover:text-violet-400 transition-colors text-left"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <p className="text-[10px] font-bold tracking-widest uppercase text-white/30 mb-4">Connect</p>
            <a href={`mailto:${OWNER.email}`} className="text-sm text-white/50 hover:text-violet-400 transition-colors block mb-4">{OWNER.email}</a>
            <div className="flex gap-3">
              {[
                { Icon: FaGithub,   href: OWNER.github,   label: "GitHub" },
                { Icon: FaLinkedin, href: OWNER.linkedin, label: "LinkedIn" },
              ].map(({ Icon, href, label }) => (
                <motion.a
                  key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-9 h-9 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:border-violet-500/40 transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 text-xs text-white/40">
            <span>Made by {OWNER.name}</span>
            <Heart size={11} className="text-blue-500" />
            <span> © {new Date().getFullYear()}</span>
          </div>
          <motion.button
            onClick={scrollTop}
            className="flex items-center gap-2 text-xs text-white/50 hover:text-violet-400 transition-colors border border-white/10 bg-white/5 rounded-full px-4 py-2"
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <ArrowUp size={13} /> Back to Top
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
