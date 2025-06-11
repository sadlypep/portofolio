"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" ref={ref} className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="grid md:grid-cols-2 gap-16 items-start"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <div className="tech-mono text-sm text-gray-500 mb-4">01 / About</div>
              <h2 className="tech-title text-3xl md:text-4xl font-bold mb-8">
                Building digital experiences with precision and purpose
              </h2>
            </div>

            <div className="space-y-6 text-gray-400 leading-relaxed">
              <p>
                I'm a full-stack developer with a passion for creating efficient, scalable web applications. My
                expertise spans modern frontend frameworks, robust backend systems, and cloud infrastructure.
              </p>
              <p>
                Currently focused on Vue.js and Nuxt.js for frontend development, Laravel for backend services, and
                Google Cloud Platform for deployment and scaling. I believe in writing clean, maintainable code that
                stands the test of time.
              </p>
              <p>
                When I'm not coding, I'm exploring new technologies, contributing to open source projects, or sharing
                knowledge with the developer community.
              </p>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            className="mt-20"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3 }}
          >
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Frontend",
                  skills: ["Vue.js", "Nuxt.js", "TypeScript", "Tailwind CSS", "React"],
                },
                {
                  title: "Backend",
                  skills: ["Laravel", "Node.js", "PHP", "MySQL", "PostgreSQL"],
                },
                {
                  title: "Cloud & Tools",
                  skills: ["Google Cloud", "Docker", "Git", "CI/CD", "Kubernetes"],
                },
              ].map((category, index) => (
                <motion.div
                  key={category.title}
                  className="minimal-card p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <h3 className="tech-accent font-medium mb-4">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.skills.map((skill) => (
                      <li key={skill} className="tech-mono text-sm text-gray-400">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
