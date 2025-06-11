"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ServicesSection from "@/components/services-section"
import ProjectsSection from "@/components/projects-section"
import ExperienceSection from "@/components/experience-section"
import CertificatesSection from "@/components/certificates-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import ChatWidget from "@/components/chat-widget"
import ParticleBackground from "@/components/particle-background"
import AdminPanel from "@/components/admin-panel"
import AuthModal from "@/components/auth-modal"
import DataSync from "@/components/data-sync"

export default function Home() {
  const [isAdminOpen, setIsAdminOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = () => {
      const authToken = localStorage.getItem("portfolio-auth")
      const authExpiry = localStorage.getItem("portfolio-auth-expiry")

      if (authToken && authExpiry) {
        const expiryTime = Number.parseInt(authExpiry)
        if (Date.now() < expiryTime) {
          setIsAuthenticated(true)
        } else {
          // Token expired
          localStorage.removeItem("portfolio-auth")
          localStorage.removeItem("portfolio-auth-expiry")
          setIsAuthenticated(false)
        }
      }
    }

    checkAuth()
  }, [])

  const handleAdminToggle = () => {
    if (isAuthenticated) {
      setIsAdminOpen(true)
    } else {
      setIsAuthOpen(true)
    }
  }

  const handleAuthSuccess = () => {
    setIsAuthenticated(true)
    setIsAdminOpen(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("portfolio-auth")
    localStorage.removeItem("portfolio-auth-expiry")
    setIsAuthenticated(false)
    setIsAdminOpen(false)
  }

  return (
    <main className="relative overflow-hidden">
      <ParticleBackground />
      <Header onAdminToggle={handleAdminToggle} />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ExperienceSection />
      <CertificatesSection />
      <ContactSection />
      <Footer />
      <ChatWidget />
      <DataSync />

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onSuccess={handleAuthSuccess} />

      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />
    </main>
  )
}
