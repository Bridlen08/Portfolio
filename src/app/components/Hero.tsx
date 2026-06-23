import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Download, Mail, Eye } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MagneticElement } from "./MagneticElement";
import { OWNER } from "../data/portfolio";

function useTyping(words: string[], speed = 80, pause = 1500) {
  const [display, setDisplay] = useState(words[0][0]);
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(1);
  const [del, setDel] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => { setTimeout(() => setReady(true), 100); }, []);

  useEffect(() => {
  const cur = words[wi];
  let t: ReturnType<typeof setTimeout>;

  if (!del) {
    if (ci <= cur.length) {
      t = setTimeout(() => {
        setDisplay(cur.slice(0, ci));
        setCi(c => c + 1);
      }, speed);
    } else {
      t = setTimeout(() => setDel(true), pause);
    }
  } else {
    if (ci >= 0) {
      t = setTimeout(() => {
        setDisplay(cur.slice(0, ci));
        setCi(c => c - 1);
      }, speed / 2);
    } else {
      setWi(i => (i + 1) % words.length);
      setCi(0);
      setDisplay("");
      setDel(false);
    }
  }

  return () => clearTimeout(t);
}, [ci, del, wi, words, speed, pause]);

  return { display, ready };
}

export function Hero() {
  const { display, ready } = useTyping(OWNER.titles);
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-12">
      {/* Glass overlay for readability */}
      <div className="absolute inset-0 bg-black/35 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── LEFT: Text ── */}
          <div className="flex flex-col items-center lg:items-start gap-5 text-center lg:text-left order-2 lg:order-1">

            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/40 bg-violet-500/10 backdrop-blur-sm"
              initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-semibold text-violet-300 tracking-wide">Available for opportunities</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              className="text-5xl md:text-6xl xl:text-7xl font-black tracking-tight leading-tight"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            >
              <span className="bg-gradient-to-r from-white via-violet-100 to-white bg-clip-text text-transparent">
                {OWNER.name}
              </span>
            </motion.h1>

            {/* Typing */}
            <motion.div
              className="h-9 flex items-center justify-center lg:justify-start"
              initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ duration: 0.3 }}
            >
              <span className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                {display}
                <motion.span
                  className="inline-block w-0.5 h-6 bg-violet-400 ml-0.5 align-middle"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                />
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-white/65 max-w-xl leading-relaxed text-sm md:text-base"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            >
              {OWNER.description}
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="flex flex-wrap gap-3 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}
            >
              <MagneticElement strength={0.2}>
                <button
                  onClick={() => scrollTo("projects")}
                  className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white text-sm bg-gradient-to-r from-violet-600 to-purple-700 hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/30"
                >
                  <Eye size={14} /> View Projects
                </button>
              </MagneticElement>
              <MagneticElement strength={0.2}>
                <a
                  href={OWNER.resume} download="Bridleen_P_Resume.pdf"
                  className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold border border-white/25 bg-white/5 text-white hover:bg-white/10 transition-colors backdrop-blur-sm text-sm"
                >
                  <Download size={14} /> Resume
                </a>
              </MagneticElement>
              <MagneticElement strength={0.2}>
                <button
                  onClick={() => scrollTo("contact")}
                  className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold border border-violet-500/40 bg-violet-500/10 text-violet-300 hover:bg-violet-500/20 transition-colors text-sm"
                >
                  <Mail size={14} /> Contact Me
                </button>
              </MagneticElement>
            </motion.div>

            {/* Socials */}
            <motion.div
              className="flex gap-3"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            >
              {[
                { Icon: FaGithub,   href: OWNER.github,   label: "GitHub" },
                { Icon: FaLinkedin, href: OWNER.linkedin, label: "LinkedIn" },
              ].map(({ Icon, href, label }, i) => (
                <MagneticElement key={label} strength={0.3}>
                  <motion.a
                    href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="w-10 h-10 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:border-violet-500/50 hover:bg-violet-500/10 transition-all"
                    initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + i * 0.1, type: "spring" }}
                    whileHover={{ scale: 1.15, y: -2 }}
                  >
                    <Icon size={15} />
                  </motion.a>
                </MagneticElement>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Photo + BP Logo ── */}
          <motion.div
            className="flex justify-center lg:justify-end items-center order-1 lg:order-2"
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.35, type: "spring", stiffness: 120 }}
          >
            <div className="relative">
              {/* Ambient glow */}
              <motion.div
                className="absolute inset-[-20px] rounded-full blur-3xl opacity-40 pointer-events-none"
                style={{ background: "linear-gradient(135deg, #7c3aed, #ec4899, #06b6d4)" }}
                animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.06, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Rotating gradient ring */}
              <motion.div
                className="absolute inset-[-3px] rounded-full border-2 border-transparent pointer-events-none"
                style={{
                  background: "linear-gradient(#0d0d1a,#0d0d1a) padding-box, conic-gradient(from 0deg,#7c3aed,#ec4899,#06b6d4,#7c3aed) border-box",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />

              {/* Photo */}
              <motion.div
                className="relative overflow-hidden rounded-full shadow-2xl"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <img
                  src="/My_image.jpeg"
                  alt={OWNER.name}
                  className="w-[280px] h-[280px] md:w-[340px] md:h-[340px] object-cover rounded-full"
                  style={{ objectPosition: "center" }}
                  loading="eager"
                />
              </motion.div>

              {/* Open to work badge — bottom */}
              <motion.div
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 rounded-full border border-white/15 bg-black/70 backdrop-blur-md shadow-xl flex items-center gap-1.5 whitespace-nowrap"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.25, type: "spring", stiffness: 300 }}
              >
                {/* <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> */}
                <span className="text-xs font-bold text-green-400">Open to Work</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          onClick={() => scrollTo("about")}
          className="mt-12 mx-auto flex flex-col items-center gap-1 text-white/30 hover:text-white/60 transition-colors"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        >
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <motion.div
            className="w-0.5 h-8 bg-gradient-to-b from-violet-500 to-transparent rounded-full"
            animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </motion.button>
      </div>
    </section>
  );
}
