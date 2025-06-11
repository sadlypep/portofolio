"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Award, ExternalLink, Calendar } from "lucide-react"

interface Certificate {
  id: string
  title: string
  issuer: string
  date: string
  link: string
  description?: string
}

export default function CertificatesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [certificates, setCertificates] = useState<Certificate[]>([])

  useEffect(() => {
    // Load certificates from localStorage with fallback
    const loadCertificates = () => {
      const saved = localStorage.getItem("portfolio-certificates")
      if (saved) {
        try {
          const parsedCertificates = JSON.parse(saved)
          setCertificates(parsedCertificates)
        } catch (error) {
          console.error("Error parsing certificates:", error)
          setCertificates(getDefaultCertificates())
        }
      } else {
        setCertificates(getDefaultCertificates())
      }
    }

    // Default certificates function
    const getDefaultCertificates = () => [
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

    loadCertificates()

    // Listen for updates from admin panel
    const handleCertificatesUpdate = (event: CustomEvent) => {
      setCertificates(event.detail)
    }

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "portfolio-certificates" && e.newValue) {
        try {
          setCertificates(JSON.parse(e.newValue))
        } catch (error) {
          console.error("Error parsing updated certificates:", error)
        }
      }
    }

    window.addEventListener("certificatesUpdated", handleCertificatesUpdate as EventListener)
    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("certificatesUpdated", handleCertificatesUpdate as EventListener)
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  return (
    <section id="certificates" ref={ref} className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="tech-mono text-sm text-gray-500 mb-4">04 / Certifications</div>
            <h2 className="tech-title text-3xl md:text-4xl font-bold">Certificates & Badges</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                className="minimal-card p-6 hover-lift"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-white">
                    <Award className="w-5 h-5" />
                  </div>
                  <Link
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>

                <h3 className="tech-accent font-medium mb-2">{cert.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{cert.issuer}</p>

                <div className="flex items-center gap-2 text-gray-500 mb-3">
                  <Calendar className="w-3 h-3" />
                  <span className="tech-mono text-xs">{cert.date}</span>
                </div>

                {cert.description && <p className="text-gray-400 text-sm leading-relaxed">{cert.description}</p>}
              </motion.div>
            ))}
          </div>

          {certificates.length === 0 && (
            <motion.div className="text-center py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-gray-400">No certificates added yet.</p>
              <p className="tech-mono text-sm text-gray-500 mt-2">Use the admin panel to add your certificates.</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
