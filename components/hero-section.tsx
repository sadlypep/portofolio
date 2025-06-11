"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Github, Linkedin, Twitter, Award, ArrowRight, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden"
    >
      {/* Minimal grid background */}
      <div className="absolute inset-0 tech-grid opacity-30" />

      <div className="container mx-auto px-6 z-10 relative">
        <div className="max-w-4xl mx-auto">
          {/* Status indicator */}
          <motion.div
            className="status-online mb-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.2 }}
          >
            Available for work
          </motion.div>

          {/* Main content */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h1 className="tech-title text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
              Mickey Jiyestha
            </h1>

            <div className="tech-mono text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
              Full-stack developer specializing in modern web technologies and cloud architecture. Building scalable
              solutions with precision and attention to detail.
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link href="#contact">
                <Button className="pro-button flex items-center gap-2">
                  Get in touch
                  <ArrowRight size={16} />
                </Button>
              </Link>
              <Link href="/CV.pdf">
                <Button className="pro-button-outline flex items-center gap-2">
                  <Download size={16} />
                  Resume
                </Button>
              </Link>
            </div>

            {/* Social links */}
            <motion.div
              className="flex justify-center gap-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.8 }}
            >
              {[
                { icon: Github, href: "https://github.com/mickeyjiyestha", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/in/mickeyjiyestha", label: "LinkedIn" },
                { icon: Twitter, href: "https://twitter.com/simpingmickeyyy", label: "Twitter" },
                { icon: Award, href: "https://www.credly.com/users/mickey", label: "Credly" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200 hover-lift"
                  whileHover={{ y: -1 }}
                  title={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Tech stack */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="tech-mono text-sm text-gray-500 mb-4">Currently working with</div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              {["Vue.js", "Nuxt.js", "Laravel", "Google Cloud", "TypeScript", "Docker"].map((tech, index) => (
                <motion.span
                  key={tech}
                  className="hover:text-white transition-colors duration-200"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 4, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
      >
        <Link href="#about" className="text-gray-400 hover:text-white transition-colors duration-200">
          <div className="w-5 h-8 border border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-gray-400 rounded-full mt-2" />
          </div>
        </Link>
      </motion.div>
    </section>
  )
}
