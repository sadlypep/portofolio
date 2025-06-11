"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Github, Linkedin, Instagram, Twitter } from "lucide-react"

const navItems = [
  { name: "FAQ", href: "#" },
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]

export default function Footer() {
  return (
    <footer className="py-12 bg-black/80 border-t border-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <motion.div
            className="flex space-x-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="https://github.com/mickeyjiyestha"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-all duration-300"
            >
              <Github size={20} />
            </Link>
            <Link
              href="https://linkedin.com/in/mickeyjiyestha"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-all duration-300"
            >
              <Linkedin size={20} />
            </Link>
            <Link
              href="https://www.instagram.com/definitely.notmickey/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-all duration-300"
            >
              <Instagram size={20} />
            </Link>
            <Link
              href="https://twitter.com/simpingmickeyyy"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-all duration-300"
            >
              <Twitter size={20} />
            </Link>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-primary transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
          </motion.div>

          <motion.p
            className="text-center text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            © 2024 Mickey Jiyestha | All Rights Reserved
          </motion.p>
        </div>
      </div>
    </footer>
  )
}
