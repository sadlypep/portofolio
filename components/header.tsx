"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import Link from "next/link"
import { Menu, X, Settings, Shield } from "lucide-react"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Work", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
]

interface HeaderProps {
  onAdminToggle?: () => void
}

export default function Header({ onAdminToggle }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [hidden, setHidden] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]")
      const scrollPosition = window.scrollY + 100

      sections.forEach((section) => {
        const sectionId = section.getAttribute("id") || ""
        const sectionTop = (section as HTMLElement).offsetTop
        const sectionHeight = (section as HTMLElement).offsetHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId)
        }
      })
    }

    // Check authentication status
    const checkAuth = () => {
      const authToken = localStorage.getItem("portfolio-auth")
      const authExpiry = localStorage.getItem("portfolio-auth-expiry")

      if (authToken && authExpiry) {
        const expiryTime = Number.parseInt(authExpiry)
        setIsAuthenticated(Date.now() < expiryTime)
      }
    }

    window.addEventListener("scroll", handleScroll)
    checkAuth()

    // Listen for auth changes
    const handleStorageChange = () => checkAuth()
    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="#home" className="tech-title text-xl">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            mickey.dev
          </motion.span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  activeSection === item.href.substring(1) ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}

          <button
            onClick={() => onAdminToggle?.()}
            className="text-gray-400 hover:text-white transition-colors duration-200 p-1 flex items-center gap-1"
            title={isAuthenticated ? "Admin Panel" : "Admin Login"}
          >
            {isAuthenticated ? <Shield size={16} /> : <Settings size={16} />}
          </button>
        </div>

        <button className="md:hidden text-white focus:outline-none" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={mobileMenuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden bg-black/90 border-t border-white/10"
      >
        <div className="px-6 py-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block py-2 text-sm transition-colors duration-200 ${
                activeSection === item.href.substring(1) ? "text-white" : "text-gray-400"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <button
            onClick={() => {
              onAdminToggle?.()
              setMobileMenuOpen(false)
            }}
            className="block py-2 text-sm text-gray-400 w-full text-left flex items-center gap-2"
          >
            {isAuthenticated ? <Shield size={14} /> : <Settings size={14} />}
            {isAuthenticated ? "Admin Panel" : "Admin Login"}
          </button>
        </div>
      </motion.div>
    </motion.header>
  )
}
