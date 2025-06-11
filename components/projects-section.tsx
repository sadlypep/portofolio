"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, Star } from "lucide-react"

export default function ProjectsSection() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    // Load projects from localStorage with fallback
    const loadProjects = () => {
      const saved = localStorage.getItem("portfolio-projects")
      if (saved) {
        try {
          const parsedProjects = JSON.parse(saved)
          setProjects(parsedProjects)
        } catch (error) {
          console.error("Error parsing projects:", error)
          // Fallback to default projects if parsing fails
          setProjects(getDefaultProjects())
        }
      } else {
        // Set default projects if none exist
        setProjects(getDefaultProjects())
      }
    }

    // Default projects function
    const getDefaultProjects = () => [
      {
        id: "1",
        title: "Story Time",
        description:
          "Story Time is a platform where users can create, share, and publish their own stories. Built with Nuxt.js, this project focuses on providing a seamless and interactive experience for storytelling enthusiasts.",
        image: "/placeholder.svg?height=300&width=400",
        link: "https://github.com/mickeyjiyestha/tailwind-transition",
        technologies: ["Nuxt.js", "Vue.js", "Tailwind CSS", "JavaScript"],
        featured: true,
      },
      {
        id: "2",
        title: "Pizza Landing Page",
        description:
          "A modern and visually appealing landing page designed for a pizza business. The page is crafted to provide an engaging user experience, showcasing the menu, promotions, and easy ordering options.",
        image: "/placeholder.svg?height=300&width=400",
        link: "https://github.com/mickeyjiyestha/pizza-vue",
        technologies: ["Vue.js", "CSS", "JavaScript"],
        featured: false,
      },
      {
        id: "3",
        title: "Aetheria E-Commerce",
        description:
          "Developed an e-commerce platform tailored specifically for online shoppers, ensuring seamless product browsing and secure transactions. This platform features a user-friendly interface.",
        image: "/placeholder.svg?height=300&width=400",
        link: "https://github.com/mickeyjiyestha/PKL-E-COMMERCE",
        technologies: ["Laravel", "PHP", "MySQL", "Bootstrap"],
        featured: true,
      },
      {
        id: "4",
        title: "Tasty Recipe",
        description:
          "Tasty Recipe is a platform designed for food lovers to explore, share, and save delicious recipes. It offers a seamless browsing experience with a user-friendly interface, making it easy to discover new culinary ideas.",
        image: "/placeholder.svg?height=300&width=400",
        link: "https://github.com/mickeyjiyestha/PKL-E-COMMERCE",
        technologies: ["React", "Node.js", "MongoDB"],
        featured: false,
      },
      {
        id: "5",
        title: "Hatarika Shoes",
        description:
          "Hatarika Shoes is an e-commerce platform designed for shoe enthusiasts, offering a seamless shopping experience with easy product browsing and secure transactions. The platform features a clean and intuitive user interface.",
        image: "/placeholder.svg?height=300&width=400",
        link: "https://github.com/mickeyjiyestha/PKL-E-COMMERCE",
        technologies: ["Vue.js", "Laravel", "MySQL"],
        featured: false,
      },
      {
        id: "6",
        title: "Tailwind Transition",
        description:
          "In this project, I demonstrated how to create smooth slide-in animations using Tailwind CSS. The main objective was to enhance user experience by adding visually appealing transitions to web elements.",
        image: "/placeholder.svg?height=300&width=400",
        link: "https://github.com/mickeyjiyestha/tailwind-transition",
        technologies: ["Tailwind CSS", "JavaScript", "HTML"],
        featured: false,
      },
    ]

    loadProjects()

    // Listen for updates from admin panel
    const handleProjectsUpdate = (event: CustomEvent) => {
      setProjects(event.detail)
    }

    // Listen for storage changes (for cross-tab sync)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "portfolio-projects" && e.newValue) {
        try {
          setProjects(JSON.parse(e.newValue))
        } catch (error) {
          console.error("Error parsing updated projects:", error)
        }
      }
    }

    window.addEventListener("projectsUpdated", handleProjectsUpdate as EventListener)
    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("projectsUpdated", handleProjectsUpdate as EventListener)
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  if (projects.length === 0) {
    return (
      <section id="projects" ref={ref} className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7 }}
          >
            My <span className="text-gradient">Projects</span>
          </motion.h2>
          <div className="text-center py-20">
            <p className="text-gray-400">Loading projects...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="projects"
      ref={ref}
      className="py-20 relative overflow-hidden bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center bg-fixed"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-0" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
        >
          My <span className="text-gradient">Projects</span>
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <motion.div key={project.id} className="project-card group" variants={itemVariants}>
              <div className="relative overflow-hidden h-48">
                {project.featured && (
                  <div className="absolute top-2 right-2 z-10">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  </div>
                )}
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-gray-300 text-sm mb-4 line-clamp-3">{project.description}</p>

                {project.technologies && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-primary/20 text-primary rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <Link href={project.link} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary text-primary hover:bg-primary/10 rounded-full w-full flex items-center justify-center gap-2"
                  >
                    <Github size={16} />
                    View Project
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
