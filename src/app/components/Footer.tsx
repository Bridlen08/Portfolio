import { motion } from "framer-motion";
import { Heart, Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const socials = [
    { Icon: Github, href: "https://github.com/Bridlen08", label: "GitHub" },
    { Icon: Linkedin, href: "https://www.linkedin.com/in/bridleen-p-a6ab68304/", label: "LinkedIn" },
    { Icon: Mail, href: "mailto:perricpp@gmail.com", label: "Email" },
  ];

  return (
    <footer className="py-12 px-6 bg-card text-card-foreground border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
            <span className="text-sm text-muted-foreground">Made with love by Bridleen P</span>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {socials.map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-purple-600 hover:bg-muted/80 transition-colors border border-border"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            © 2026 All rights reserved.
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
