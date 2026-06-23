import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useState } from "react";
import { SectionWrapper, SectionHeading } from "./SectionWrapper";
import { OWNER } from "../data/portfolio";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:${OWNER.email}?subject=Portfolio Contact&body=${body}`;
    setTimeout(() => { setSending(false); setSent(true); setForm({ name: "", email: "", message: "" }); }, 800);
  };

  const inputCls = "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 focus:bg-white/8 transition-all text-sm";

  return (
    <SectionWrapper id="contact">
      <div className="max-w-5xl mx-auto">
        <SectionHeading label="Get In Touch" title="Contact Me" />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Info */}
          <motion.div
            className="lg:col-span-2 space-y-5"
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55 }}
          >
            <p className="text-white/65 text-sm leading-relaxed">
              I'm always open to discussing new opportunities, projects, or collaborations. Feel free to reach out!
            </p>

            {[
              { icon: Mail,   label: "Email",    value: OWNER.email,    href: `mailto:${OWNER.email}`, color: "from-violet-500 to-purple-600" },
              { icon: MapPin, label: "Location", value: OWNER.location, href: undefined,               color: "from-pink-500 to-rose-600" },
            ].map(({ icon: Icon, label, value, href, color }) => (
              <div key={label} className="glass-card rounded-2xl p-4 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider">{label}</p>
                  {href
                    ? <a href={href} className="text-sm text-white font-medium hover:text-violet-400 transition-colors">{value}</a>
                    : <p className="text-sm text-white font-medium">{value}</p>
                  }
                </div>
              </div>
            ))}

            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-white/30 mb-3">Find me on</p>
              <div className="flex gap-3">
                {[
                  { Icon: FaGithub,   href: OWNER.github,   label: "GitHub" },
                  { Icon: FaLinkedin, href: OWNER.linkedin, label: "LinkedIn" },
                ].map(({ Icon, href, label }) => (
                  <motion.a
                    key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:border-violet-500/40 hover:bg-violet-500/10 transition-all"
                    whileHover={{ scale: 1.1, y: -2 }}
                  >
                    <Icon size={16} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 space-y-4">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent rounded-t-2xl" />

              {sent && (
                <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-white text-[10px]">✓</span>
                  Email client opened — message ready to send!
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-white/50 mb-1.5 uppercase tracking-wider">Name</label>
                  <input className={inputCls} placeholder="Your name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-white/50 mb-1.5 uppercase tracking-wider">Email</label>
                  <input type="email" className={inputCls} placeholder="you@example.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-white/50 mb-1.5 uppercase tracking-wider">Message</label>
                <textarea className={`${inputCls} resize-none`} rows={5} placeholder="Tell me about your project..." value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} />
              </div>
              <motion.button
                type="submit" disabled={sending}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 text-white font-semibold text-sm shadow-lg shadow-violet-500/25 disabled:opacity-60"
                whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
              >
                {sending ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send size={15} /> Send Message</>}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
