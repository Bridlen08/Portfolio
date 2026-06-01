import { motion } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Code2, Palette, Rocket, Users } from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Writing maintainable, scalable, and efficient code that stands the test of time.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Palette,
    title: "Creative Design",
    description: "Blending aesthetics with functionality to create stunning user experiences.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Rocket,
    title: "Fast Performance",
    description: "Optimizing every pixel and byte for lightning-fast load times.",
    color: "from-pink-500 to-pink-600",
  },
  {
    icon: Users,
    title: "User Focused",
    description: "Putting users first in every decision, from concept to deployment.",
    color: "from-indigo-500 to-indigo-600",
  },
];

export function About() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Content container with proper z-index to stay above motion background */}
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I'm a passionate developer who loves turning ideas into reality through elegant code and thoughtful design.
          </p>
        </motion.div>
        {/* Profile Image Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-2xl opacity-30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <ImageWithFallback
                src="/My_image.jpeg"
                alt="Bridleen P"
                className="relative w-48 h-48 rounded-full object-cover border-4 border-white/20 shadow-2xl"
                loading="eager"
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-purple-400/50"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-bold text-foreground mb-4">Bridleen P</h3>
              <p className="text-lg text-muted-foreground mb-6 max-w-md">
                Full Stack Developer passionate about creating innovative digital solutions.
                I specialize in modern web technologies and love bringing creative ideas to life through code.
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {["Problem Solver", "Team Player", "Quick Learner", "Creative Thinker"].map(
                  (trait) => (
                    <span
                      key={trait}
                      className="px-4 py-2 bg-muted text-foreground rounded-full text-sm border border-border"
                    >
                      {trait}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="relative overflow-hidden rounded-3xl bg-card p-8 h-full border border-border hover:border-border/80 transition-all shadow-lg hover:shadow-xl">
                <div className="relative z-10">
                  <div
                    className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${feature.color} mb-4`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl mb-3 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>

                {/* Hover effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="max-w-4xl mx-auto bg-card/80 backdrop-blur-md rounded-3xl p-12 border border-border">
            <p className="text-lg text-muted-foreground mb-6">
              I'm a passionate developer and ECE student at Sri Eshwar College of Engineering, focused on building modern, responsive, and user-friendly web applications. I specialize in React, Node.js, and creative UI development — turning ideas into polished digital experiences.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {["React", "TypeScript", "Node.js", "Tailwind CSS", "Next.js", "GraphQL"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-muted text-foreground rounded-full text-sm border border-border hover:bg-muted/80 transition-colors"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}