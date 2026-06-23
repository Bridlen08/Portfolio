import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { BPLogo } from "./BPLogo";
import { NAV_ITEMS } from "../data/portfolio";
import { MagneticElement } from "./MagneticElement";
import { useTheme } from "../ui/ThemeProvider";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 20);
    for (const item of [...NAV_ITEMS].reverse()) {
      const el = document.getElementById(item.id);
      if (el && el.getBoundingClientRect().top <= 120) { setActive(item.id); break; }
    }
  });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  const navBg = scrolled
    ? isDark
      ? "bg-black/65 backdrop-blur-xl border-b border-white/10 shadow-lg"
      : "bg-white/80 backdrop-blur-xl border-b border-violet-200/50 shadow-lg"
    : "bg-transparent";

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
      initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <MagneticElement strength={0.15}>
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2.5" aria-label="Home">
            <BPLogo size="sm" animate={false} />
            <span className={`hidden sm:block font-bold tracking-tight text-sm ${isDark ? "text-white/90" : "text-violet-900"}`}>
              Bridleen P
            </span>
          </button>
        </MagneticElement>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-0.5">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`relative px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors duration-200 ${
                active === item.id
                  ? "text-violet-500"
                  : isDark ? "text-white/55 hover:text-white" : "text-violet-900/60 hover:text-violet-900"
              }`}
            >
              {item.label}
              {active === item.id && (
                <motion.div
                  className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-violet-500"
                  layoutId="nav-underline"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
          <button
            onClick={toggleTheme}
            className={`ml-2 w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
              isDark
                ? "border-white/20 bg-white/5 text-white/70 hover:text-white"
                : "border-violet-300 bg-violet-50 text-violet-700 hover:bg-violet-100"
            }`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>

        {/* Mobile */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className={`w-8 h-8 rounded-full border flex items-center justify-center ${
              isDark ? "border-white/20 bg-white/5 text-white/70" : "border-violet-300 bg-violet-50 text-violet-700"
            }`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className={`w-8 h-8 rounded-full border flex items-center justify-center ${
              isDark ? "border-white/20 bg-white/5 text-white" : "border-violet-300 bg-violet-50 text-violet-900"
            }`}
            aria-label="Menu"
          >
            {open ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>
      </div>

      <motion.div
        className={`lg:hidden border-t overflow-hidden ${
          isDark ? "bg-black/85 backdrop-blur-xl border-white/10" : "bg-white/90 backdrop-blur-xl border-violet-200/50"
        }`}
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-4 py-3 grid grid-cols-3 gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`py-2 px-2 rounded-lg text-xs font-semibold text-center transition-colors ${
                active === item.id
                  ? "bg-violet-500/20 text-violet-500"
                  : isDark ? "text-white/60 hover:text-white hover:bg-white/5" : "text-violet-900/60 hover:text-violet-900 hover:bg-violet-50"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
}
