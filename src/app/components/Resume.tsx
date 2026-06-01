import { motion } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Download, GraduationCap, Briefcase, Code, Award, Mail, Phone, MapPin } from "lucide-react";

export function Resume() {
  const education = [
    {
      degree: "BE-ECE",
      school: "Sri Eshwar college of Engineering",
      year: "2024 - 2028",
      description: "Specialized in Software Engineering and Web Technologies"
    },
    {
      degree: "Higher Secondary Education",
      school: "Brindhavan Higher Secondary scholl",
      year: "2023 - 2024",
      description: "Mathematics, Physics, Chemistry, Computer Science"
    }
  ];

  const experience = [
    {
      position: "Full Stack Developer Intern",
      company: "TechCorp Solutions",
      year: "2024 - Present",
      description: "Developing modern web applications using React, Node.js, and cloud technologies. Collaborated with cross-functional teams to deliver scalable solutions."
    },
    {
      position: "Frontend Developer",
      company: "Freelance Projects",
      year: "2023 - 2024",
      description: "Built responsive websites and web applications for various clients using modern JavaScript frameworks and design systems."
    }
  ];

  const skills = [
    { category: "Frontend", skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
    { category: "Backend", skills: ["Node.js", "Express", "Python", "PostgreSQL", "MongoDB"] },
    { category: "Tools & Technologies", skills: ["Git", "Docker", "AWS", "Figma", "VS Code"] }
  ];

  const projects = [
    {
      name: "E-Commerce Platform",
      tech: "React, Node.js, Stripe",
      description: "Full-stack e-commerce solution with payment integration"
    },
    {
      name: "Task Management App",
      tech: "Vue.js, Express, Socket.io",
      description: "Real-time collaborative task management system"
    },
    {
      name: "Weather Dashboard",
      tech: "React, OpenWeather API",
      description: "Interactive weather visualization dashboard"
    }
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Resume
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            A comprehensive overview of my education, experience, skills, and achievements
          </p>

          {/* Download Button */}
          <motion.a
            href="/Bridleen.resume.pdf"
            download="Bridleen_Resume.pdf"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Download className="w-5 h-5" />
            Download PDF Resume
          </motion.a>
        </motion.div>

        {/* Resume Preview Card */}
        <motion.div
          className="bg-card/80 backdrop-blur-md rounded-3xl p-8 border border-border shadow-2xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {/* Personal Info */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
            >
              <ImageWithFallback
                src="/My_image.jpeg"
                alt="Bridleen"
                className="w-24 h-24 rounded-full object-cover border-4 border-purple-500/20"
                loading="lazy"
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-purple-400/50"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-bold text-foreground mb-2">Bridleen P</h3>
              <p className="text-xl text-muted-foreground mb-4">Full Stack Developer</p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  perricpp@gmail.com
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +91 9080812306
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Pudukkottai, Tamil Nadu
                </div>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-6 h-6 text-purple-600" />
              <h4 className="text-2xl font-semibold text-foreground">Education</h4>
            </div>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  className="bg-muted/50 rounded-xl p-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h5 className="text-lg font-medium text-foreground">{edu.degree}</h5>
                  <p className="text-purple-600 font-medium">{edu.school}</p>
                  <p className="text-sm text-muted-foreground">{edu.year}</p>
                  <p className="text-muted-foreground mt-2">{edu.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="w-6 h-6 text-blue-600" />
              <h4 className="text-2xl font-semibold text-foreground">Experience</h4>
            </div>
            <div className="space-y-4">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  className="bg-muted/50 rounded-xl p-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h5 className="text-lg font-medium text-foreground">{exp.position}</h5>
                  <p className="text-blue-600 font-medium">{exp.company}</p>
                  <p className="text-sm text-muted-foreground">{exp.year}</p>
                  <p className="text-muted-foreground mt-2">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Code className="w-6 h-6 text-green-600" />
              <h4 className="text-2xl font-semibold text-foreground">Skills</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {skills.map((skillGroup, index) => (
                <motion.div
                  key={index}
                  className="bg-muted/50 rounded-xl p-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h5 className="text-lg font-medium text-foreground mb-3">{skillGroup.category}</h5>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-background text-foreground rounded-full text-sm border border-border"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-6 h-6 text-orange-600" />
              <h4 className="text-2xl font-semibold text-foreground">Featured Projects</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  className="bg-muted/50 rounded-xl p-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h5 className="text-lg font-medium text-foreground">{project.name}</h5>
                  <p className="text-orange-600 font-medium text-sm">{project.tech}</p>
                  <p className="text-muted-foreground mt-2 text-sm">{project.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}