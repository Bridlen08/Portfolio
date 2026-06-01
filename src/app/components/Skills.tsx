import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

// Skill categories with proficiency levels
const skillCategories = [
  {
    name: "Frontend",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 92 },
      { name: "HTML/CSS", level: 98 },
    ],
    color: "bg-gradient-to-r from-purple-500 to-purple-600",
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Express", level: 85 },
      { name: "PostgreSQL", level: 82 },
      { name: "GraphQL", level: 80 },
    ],
    color: "bg-gradient-to-r from-blue-500 to-blue-600",
  },
  {
    name: "Tools & Others",
    skills: [
      { name: "Git", level: 93 },
      { name: "Figma", level: 87 },
      { name: "Docker", level: 78 },
      { name: "AWS", level: 75 },
    ],
    color: "bg-gradient-to-r from-pink-500 to-pink-600",
  },
];

/**
 * SkillBar Component
 * Displays an animated progress bar for each skill
 * Uses Framer Motion for smooth animations triggered on scroll
 */
function SkillBar({ 
  skill, 
  color, 
  delay 
}: { 
  skill: { name: string; level: number }
  color: string
  delay: number
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-foreground font-medium">{skill.name}</span>
        <span className="text-muted-foreground text-sm">{skill.level}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${color}`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Content container with proper z-index to stay above motion background */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-bold">
            Skills & Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive overview of my technical skills and proficiencies across various technologies.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              className="bg-background/40 backdrop-blur-md rounded-3xl p-8 border border-border/50 hover:border-border transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              {/* Category Badge */}
              <div className={`inline-block px-4 py-2 ${category.color} text-white rounded-full mb-6 font-semibold`}>
                <h3 className="text-lg">{category.name}</h3>
              </div>

              {/* Skills List */}
              <div>
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    color={category.color}
                    delay={categoryIndex * 0.1 + skillIndex * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technology Badges */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="inline-flex flex-wrap gap-4 justify-center max-w-4xl">
            {[
              "React",
              "TypeScript",
              "Next.js",
              "Node.js",
              "Tailwind CSS",
              "GraphQL",
              "MongoDB",
              "PostgreSQL",
              "Docker",
              "AWS",
              "Git",
              "Figma",
              "Jest",
              "Cypress",
              "Redux",
              "REST API",
            ].map((tech, index) => (
              <motion.span
                key={tech}
                className="px-6 py-3 bg-background/50 backdrop-blur-sm rounded-2xl text-foreground border border-border/50 hover:border-border shadow-lg hover:shadow-xl transition-all"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -4 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}