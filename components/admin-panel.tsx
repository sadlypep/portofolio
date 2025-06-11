"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, Edit, Trash2, Save, Award, Briefcase, LogOut, Shield, Code, ExternalLink, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import ImageUpload from "./image-upload"

interface Experience {
  id: string
  position: string
  company: string
  period: string
  responsibilities: string[]
  skills: string[]
  type: string
}

interface Certificate {
  id: string
  title: string
  issuer: string
  date: string
  link: string
  description?: string
}

interface Project {
  id: string
  title: string
  description: string
  image: string
  link: string
  technologies: string[]
  featured: boolean
}

interface AdminPanelProps {
  isOpen: boolean
  onClose: () => void
  isAuthenticated: boolean
  onLogout: () => void
}

export default function AdminPanel({ isOpen, onClose, isAuthenticated, onLogout }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<"experience" | "certificates" | "projects">("experience")
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [editingExp, setEditingExp] = useState<Experience | null>(null)
  const [editingCert, setCertingCert] = useState<Certificate | null>(null)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)

  // Check authentication on mount
  useEffect(() => {
    if (!isAuthenticated) {
      return
    }

    const savedExperiences = localStorage.getItem("portfolio-experiences")
    const savedCertificates = localStorage.getItem("portfolio-certificates")
    const savedProjects = localStorage.getItem("portfolio-projects")

    if (savedExperiences) {
      setExperiences(JSON.parse(savedExperiences))
    } else {
      // Default experiences
      const defaultExperiences: Experience[] = [
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
      setExperiences(defaultExperiences)
      localStorage.setItem("portfolio-experiences", JSON.stringify(defaultExperiences))
    }

    if (savedCertificates) {
      setCertificates(JSON.parse(savedCertificates))
    } else {
      // Default certificates
      const defaultCertificates: Certificate[] = [
        {
          id: "1",
          title: "Cloud Computing",
          issuer: "Bangkit Academy",
          date: "November 2024",
          link: "https://drive.google.com/file/d/19kE1J1eWMFKoh1Qz56gv80nTwxu3VvFz/view",
          description: "Comprehensive cloud computing certification covering GCP services",
        },
        {
          id: "2",
          title: "Menjadi Google Cloud Engineer",
          issuer: "Dicoding",
          date: "January 2024",
          link: "https://www.dicoding.com/certificates/JMZV4LWRNXN9",
          description: "Google Cloud Platform engineering fundamentals",
        },
      ]
      setCertificates(defaultCertificates)
      localStorage.setItem("portfolio-certificates", JSON.stringify(defaultCertificates))
    }

    if (savedProjects) {
      setProjects(JSON.parse(savedProjects))
    } else {
      // Default projects
      const defaultProjects: Project[] = [
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
      ]
      setProjects(defaultProjects)
      localStorage.setItem("portfolio-projects", JSON.stringify(defaultProjects))
    }
  }, [isAuthenticated])

  // Save functions
  const saveExperiences = (newExperiences: Experience[]) => {
    setExperiences(newExperiences)
    localStorage.setItem("portfolio-experiences", JSON.stringify(newExperiences))
    window.dispatchEvent(new CustomEvent("experiencesUpdated", { detail: newExperiences }))
  }

  const saveCertificates = (newCertificates: Certificate[]) => {
    setCertificates(newCertificates)
    localStorage.setItem("portfolio-certificates", JSON.stringify(newCertificates))
    window.dispatchEvent(new CustomEvent("certificatesUpdated", { detail: newCertificates }))
  }

  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects)
    localStorage.setItem("portfolio-projects", JSON.stringify(newProjects))
    window.dispatchEvent(new CustomEvent("projectsUpdated", { detail: newProjects }))
  }

  // Experience handlers
  const handleSaveExperience = (exp: Experience) => {
    if (isAddingNew) {
      const newExp = { ...exp, id: Date.now().toString() }
      saveExperiences([...experiences, newExp])
      setIsAddingNew(false)
    } else {
      saveExperiences(experiences.map((e) => (e.id === exp.id ? exp : e)))
    }
    setEditingExp(null)
  }

  const handleDeleteExperience = (id: string) => {
    if (confirm("Are you sure you want to delete this experience?")) {
      saveExperiences(experiences.filter((e) => e.id !== id))
    }
  }

  // Certificate handlers
  const handleSaveCertificate = (cert: Certificate) => {
    if (isAddingNew) {
      const newCert = { ...cert, id: Date.now().toString() }
      saveCertificates([...certificates, newCert])
      setIsAddingNew(false)
    } else {
      saveCertificates(certificates.map((c) => (c.id === cert.id ? cert : c)))
    }
    setCertingCert(null)
  }

  const handleDeleteCertificate = (id: string) => {
    if (confirm("Are you sure you want to delete this certificate?")) {
      saveCertificates(certificates.filter((c) => c.id !== id))
    }
  }

  // Project handlers
  const handleSaveProject = (project: Project) => {
    if (isAddingNew) {
      const newProject = { ...project, id: Date.now().toString() }
      saveProjects([...projects, newProject])
      setIsAddingNew(false)
    } else {
      saveProjects(projects.map((p) => (p.id === project.id ? project : p)))
    }
    setEditingProject(null)
  }

  const handleDeleteProject = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      saveProjects(projects.filter((p) => p.id !== id))
    }
  }

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      onLogout()
      onClose()
    }
  }

  // Project Form Component
  const ProjectForm = ({
    project,
    onSave,
    onCancel,
  }: {
    project: Project
    onSave: (project: Project) => void
    onCancel: () => void
  }) => {
    const [formData, setFormData] = useState(project)

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="minimal-card p-6 mb-4">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Project Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-black border-gray-600 text-white"
            />
            <Input
              placeholder="Project Link (GitHub/Live Demo)"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              className="bg-black border-gray-600 text-white"
            />
          </div>

          <Textarea
            placeholder="Project Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="bg-black border-gray-600 text-white min-h-[100px]"
          />

          <ImageUpload
            value={formData.image}
            onChange={(url) => setFormData({ ...formData, image: url })}
            placeholder="Upload project image"
          />

          <Input
            placeholder="Technologies (comma separated)"
            value={formData.technologies.join(", ")}
            onChange={(e) =>
              setFormData({
                ...formData,
                technologies: e.target.value
                  .split(",")
                  .map((t) => t.trim())
                  .filter((t) => t),
              })
            }
            className="bg-black border-gray-600 text-white"
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 text-white bg-black border-gray-600 rounded focus:ring-white"
            />
            <label htmlFor="featured" className="text-sm text-gray-300">
              Featured Project
            </label>
          </div>

          <div className="flex gap-2">
            <Button onClick={() => onSave(formData)} className="pro-button flex items-center gap-2">
              <Save size={16} />
              Save
            </Button>
            <Button onClick={onCancel} className="pro-button-outline">
              Cancel
            </Button>
          </div>
        </div>
      </motion.div>
    )
  }

  // Experience Form Component
  const ExperienceForm = ({
    experience,
    onSave,
    onCancel,
  }: {
    experience: Experience
    onSave: (exp: Experience) => void
    onCancel: () => void
  }) => {
    const [formData, setFormData] = useState(experience)

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="minimal-card p-6 mb-4">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Position"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="bg-black border-gray-600 text-white"
            />
            <Input
              placeholder="Company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="bg-black border-gray-600 text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Period (e.g., Jan 2024 - Present)"
              value={formData.period}
              onChange={(e) => setFormData({ ...formData, period: e.target.value })}
              className="bg-black border-gray-600 text-white"
            />
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full p-2 bg-black border border-gray-600 text-white rounded-md"
            >
              <option value="work">Work Experience</option>
              <option value="education">Education</option>
              <option value="project">Project</option>
            </select>
          </div>

          <Textarea
            placeholder="Responsibilities (one per line)"
            value={formData.responsibilities.join("\n")}
            onChange={(e) =>
              setFormData({
                ...formData,
                responsibilities: e.target.value.split("\n").filter((r) => r.trim()),
              })
            }
            className="bg-black border-gray-600 text-white min-h-[100px]"
          />

          <Input
            placeholder="Skills (comma separated)"
            value={formData.skills.join(", ")}
            onChange={(e) =>
              setFormData({
                ...formData,
                skills: e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter((s) => s),
              })
            }
            className="bg-black border-gray-600 text-white"
          />

          <div className="flex gap-2">
            <Button onClick={() => onSave(formData)} className="pro-button flex items-center gap-2">
              <Save size={16} />
              Save
            </Button>
            <Button onClick={onCancel} className="pro-button-outline">
              Cancel
            </Button>
          </div>
        </div>
      </motion.div>
    )
  }

  // Certificate Form Component
  const CertificateForm = ({
    certificate,
    onSave,
    onCancel,
  }: {
    certificate: Certificate
    onSave: (cert: Certificate) => void
    onCancel: () => void
  }) => {
    const [formData, setFormData] = useState(certificate)

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="minimal-card p-6 mb-4">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Certificate Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-black border-gray-600 text-white"
            />
            <Input
              placeholder="Issuer"
              value={formData.issuer}
              onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
              className="bg-black border-gray-600 text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Date (e.g., January 2024)"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="bg-black border-gray-600 text-white"
            />
            <Input
              placeholder="Certificate Link"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              className="bg-black border-gray-600 text-white"
            />
          </div>

          <Textarea
            placeholder="Description (optional)"
            value={formData.description || ""}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="bg-black border-gray-600 text-white"
          />

          <div className="flex gap-2">
            <Button onClick={() => onSave(formData)} className="pro-button flex items-center gap-2">
              <Save size={16} />
              Save
            </Button>
            <Button onClick={onCancel} className="pro-button-outline">
              Cancel
            </Button>
          </div>
        </div>
      </motion.div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="minimal-card w-full max-w-6xl max-h-[90vh] overflow-hidden"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="tech-title text-xl">Admin Panel</h2>
                    <p className="tech-mono text-xs text-gray-500">Authenticated session</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button onClick={handleLogout} className="pro-button-outline flex items-center gap-2">
                    <LogOut size={16} />
                    Logout
                  </Button>
                  <Button onClick={onClose} className="pro-button-outline p-2">
                    <X size={20} />
                  </Button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-4 mb-6 border-b border-gray-700">
                <button
                  onClick={() => setActiveTab("experience")}
                  className={`pb-2 px-1 text-sm font-medium transition-colors ${
                    activeTab === "experience" ? "text-white border-b-2 border-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Briefcase size={16} className="inline mr-2" />
                  Experience
                </button>
                <button
                  onClick={() => setActiveTab("certificates")}
                  className={`pb-2 px-1 text-sm font-medium transition-colors ${
                    activeTab === "certificates"
                      ? "text-white border-b-2 border-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Award size={16} className="inline mr-2" />
                  Certificates
                </button>
                <button
                  onClick={() => setActiveTab("projects")}
                  className={`pb-2 px-1 text-sm font-medium transition-colors ${
                    activeTab === "projects" ? "text-white border-b-2 border-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Code size={16} className="inline mr-2" />
                  Projects
                </button>
              </div>

              {/* Content */}
              <div className="max-h-[60vh] overflow-y-auto">
                {activeTab === "experience" && (
                  <div>
                    <div className="mb-6">
                      <Button
                        onClick={() => {
                          setIsAddingNew(true)
                          setEditingExp({
                            id: "",
                            position: "",
                            company: "",
                            period: "",
                            responsibilities: [],
                            skills: [],
                            type: "work",
                          })
                        }}
                        className="pro-button flex items-center gap-2"
                      >
                        <Plus size={16} />
                        Add Experience
                      </Button>
                    </div>

                    {isAddingNew && editingExp && activeTab === "experience" && (
                      <ExperienceForm
                        experience={editingExp}
                        onSave={handleSaveExperience}
                        onCancel={() => {
                          setIsAddingNew(false)
                          setEditingExp(null)
                        }}
                      />
                    )}

                    <div className="space-y-4">
                      {experiences.map((exp) => (
                        <div key={exp.id}>
                          {editingExp?.id === exp.id && !isAddingNew ? (
                            <ExperienceForm
                              experience={editingExp}
                              onSave={handleSaveExperience}
                              onCancel={() => setEditingExp(null)}
                            />
                          ) : (
                            <div className="minimal-card p-4 hover-lift">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h3 className="tech-accent font-medium">{exp.position}</h3>
                                  <p className="text-gray-400 text-sm">{exp.company}</p>
                                  <p className="tech-mono text-xs text-gray-500">{exp.period}</p>
                                  <div className="mt-2 flex flex-wrap gap-1">
                                    {exp.skills.slice(0, 3).map((skill, i) => (
                                      <span key={i} className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded">
                                        {skill}
                                      </span>
                                    ))}
                                    {exp.skills.length > 3 && (
                                      <span className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded">
                                        +{exp.skills.length - 3}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex gap-2 ml-4">
                                  <Button
                                    onClick={() => setEditingExp(exp)}
                                    size="sm"
                                    className="pro-button-outline p-2"
                                  >
                                    <Edit size={14} />
                                  </Button>
                                  <Button
                                    onClick={() => handleDeleteExperience(exp.id)}
                                    size="sm"
                                    className="pro-button-outline p-2 text-red-400 border-red-400 hover:bg-red-400/10"
                                  >
                                    <Trash2 size={14} />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "certificates" && (
                  <div>
                    <div className="mb-6">
                      <Button
                        onClick={() => {
                          setIsAddingNew(true)
                          setCertingCert({
                            id: "",
                            title: "",
                            issuer: "",
                            date: "",
                            link: "",
                            description: "",
                          })
                        }}
                        className="pro-button flex items-center gap-2"
                      >
                        <Plus size={16} />
                        Add Certificate
                      </Button>
                    </div>

                    {isAddingNew && editingCert && activeTab === "certificates" && (
                      <CertificateForm
                        certificate={editingCert}
                        onSave={handleSaveCertificate}
                        onCancel={() => {
                          setIsAddingNew(false)
                          setCertingCert(null)
                        }}
                      />
                    )}

                    <div className="space-y-4">
                      {certificates.map((cert) => (
                        <div key={cert.id}>
                          {editingCert?.id === cert.id && !isAddingNew ? (
                            <CertificateForm
                              certificate={editingCert}
                              onSave={handleSaveCertificate}
                              onCancel={() => setCertingCert(null)}
                            />
                          ) : (
                            <div className="minimal-card p-4 hover-lift">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h3 className="tech-accent font-medium">{cert.title}</h3>
                                  <p className="text-gray-400 text-sm">{cert.issuer}</p>
                                  <p className="tech-mono text-xs text-gray-500">{cert.date}</p>
                                  {cert.description && (
                                    <p className="text-gray-400 text-xs mt-1 line-clamp-2">{cert.description}</p>
                                  )}
                                </div>
                                <div className="flex gap-2 ml-4">
                                  <Button
                                    onClick={() => setCertingCert(cert)}
                                    size="sm"
                                    className="pro-button-outline p-2"
                                  >
                                    <Edit size={14} />
                                  </Button>
                                  <Button
                                    onClick={() => handleDeleteCertificate(cert.id)}
                                    size="sm"
                                    className="pro-button-outline p-2 text-red-400 border-red-400 hover:bg-red-400/10"
                                  >
                                    <Trash2 size={14} />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "projects" && (
                  <div>
                    <div className="mb-6">
                      <Button
                        onClick={() => {
                          setIsAddingNew(true)
                          setEditingProject({
                            id: "",
                            title: "",
                            description: "",
                            image: "",
                            link: "",
                            technologies: [],
                            featured: false,
                          })
                        }}
                        className="pro-button flex items-center gap-2"
                      >
                        <Plus size={16} />
                        Add Project
                      </Button>
                    </div>

                    {isAddingNew && editingProject && activeTab === "projects" && (
                      <ProjectForm
                        project={editingProject}
                        onSave={handleSaveProject}
                        onCancel={() => {
                          setIsAddingNew(false)
                          setEditingProject(null)
                        }}
                      />
                    )}

                    <div className="space-y-4">
                      {projects.map((project) => (
                        <div key={project.id}>
                          {editingProject?.id === project.id && !isAddingNew ? (
                            <ProjectForm
                              project={editingProject}
                              onSave={handleSaveProject}
                              onCancel={() => setEditingProject(null)}
                            />
                          ) : (
                            <div className="minimal-card p-4 hover-lift">
                              <div className="flex items-start gap-4">
                                {project.image && (
                                  <img
                                    src={project.image || "/placeholder.svg"}
                                    alt={project.title}
                                    className="w-20 h-20 object-cover rounded-lg border border-gray-600"
                                  />
                                )}
                                <div className="flex-1">
                                  <div className="flex items-start justify-between">
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <h3 className="tech-accent font-medium">{project.title}</h3>
                                        {project.featured && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                                      </div>
                                      <p className="text-gray-400 text-sm mt-1 line-clamp-2">{project.description}</p>
                                      <div className="mt-2 flex flex-wrap gap-1">
                                        {project.technologies.slice(0, 3).map((tech, i) => (
                                          <span key={i} className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded">
                                            {tech}
                                          </span>
                                        ))}
                                        {project.technologies.length > 3 && (
                                          <span className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded">
                                            +{project.technologies.length - 3}
                                          </span>
                                        )}
                                      </div>
                                      {project.link && (
                                        <a
                                          href={project.link}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-white mt-2"
                                        >
                                          <ExternalLink size={12} />
                                          View Project
                                        </a>
                                      )}
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                      <Button
                                        onClick={() => setEditingProject(project)}
                                        size="sm"
                                        className="pro-button-outline p-2"
                                      >
                                        <Edit size={14} />
                                      </Button>
                                      <Button
                                        onClick={() => handleDeleteProject(project.id)}
                                        size="sm"
                                        className="pro-button-outline p-2 text-red-400 border-red-400 hover:bg-red-400/10"
                                      >
                                        <Trash2 size={14} />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
