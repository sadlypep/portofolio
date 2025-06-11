"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Briefcase, GraduationCap, Code } from "lucide-react"

interface Experience {
  id: string
  position: string
  company: string
  period: string
  responsibilities: string[]
  skills: string[]
  type: string
}

export default function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [experiences, setExperiences] = useState<Experience[]>([])

  useEffect(() => {
    // Load experiences from localStorage with fallback
    const loadExperiences = () => {
      const saved = localStorage.getItem("portfolio-experiences")
      if (saved) {
        try {
          const parsedExperiences = JSON.parse(saved)
          setExperiences(parsedExperiences)
        } catch (error) {
          console.error("Error parsing experiences:", error)
          setExperiences(getDefaultExperiences())
        }
      } else {
        setExperiences(getDefaultExperiences())
      }
    }

    // Default experiences function
    const getDefaultExperiences = () => [
      {
        id: "1",
        position: "Frontend Developer",
        company: "PT. TIMEDOOR INDONESIA",
        period: "Sep 2024 - Present",
        responsibilities: [
          "Developed responsive web applications using Vue.js and Nuxt.js",
          "Collaborated with backend team for seamless integration",
          "Optimized application performance and user experience",
        ],
        skills: ["Vue.js", "Nuxt.js", "JavaScript", "CSS", "Git"],
        type: "work",
      },
      {
        id: "2",
        position: "Cloud Computing Cohort",
        company: "Bangkit Academy 2024",
        period: "Sep 2024 - Jan 2025",
        responsibilities: [
          "Learned Google Cloud Platform services and architecture",
          "Built scalable cloud applications",
          "Implemented DevOps practices and CI/CD pipelines",
        ],
        skills: ["Google Cloud Platform", "Docker", "Kubernetes", "DevOps"],
        type: "education",
      },
    ]

    loadExperiences()

    // Listen for updates from admin panel
    const handleExperiencesUpdate = (event: CustomEvent) => {
      setExperiences(event.detail)
    }

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "portfolio-experiences" && e.newValue) {
        try {
          setExperiences(JSON.parse(e.newValue))
        } catch (error) {
          console.error("Error parsing updated experiences:", error)
        }
      }
    }

    window.addEventListener("experiencesUpdated", handleExperiencesUpdate as EventListener)
    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("experiencesUpdated", handleExperiencesUpdate as EventListener)
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  const getIcon = (type: string) => {
    switch (type) {
      case "education":
        return <GraduationCap className="w-4 h-4" />
      case "project":
        return <Code className="w-4 h-4" />
      default:
        return <Briefcase className="w-4 h-4" />
    }
  }

  return (
    <section id="experience" ref={ref} className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="tech-mono text-sm text-gray-500 mb-4">03 / Experience</div>
            <h2 className="tech-title text-3xl md:text-4xl font-bold">Work & Education</h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="timeline-pro">
              <div className="space-y-12">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Timeline dot */}
                    <div className="timeline-dot-pro" style={{ top: "1rem" }} />

                    {/* Content */}
                    <div className="md:flex md:gap-8">
                      <div className="md:w-1/3 mb-4 md:mb-0">
                        <div className="tech-mono text-sm text-gray-500">{exp.period}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-gray-400">{getIcon(exp.type)}</span>
                          <span className="tech-mono text-xs text-gray-400 capitalize">{exp.type}</span>
                        </div>
                      </div>

                      <div className="md:w-2/3">
                        <div className="minimal-card p-6 hover-lift">
                          <h3 className="tech-accent text-lg font-medium mb-1">{exp.position}</h3>
                          <p className="text-gray-400 mb-4">{exp.company}</p>

                          <ul className="space-y-2 mb-4">
                            {exp.responsibilities.map((item, i) => (
                              <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                                <span className="text-white mt-1 text-xs">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="flex flex-wrap gap-2">
                            {exp.skills.map((skill, i) => (
                              <span key={i} className="tech-mono text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {experiences.length === 0 && (
            <motion.div className="text-center py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-gray-400">No experiences added yet.</p>
              <p className="tech-mono text-sm text-gray-500 mt-2">Use the admin panel to add your experiences.</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
