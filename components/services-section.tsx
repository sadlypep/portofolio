"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Code, Cloud, Smartphone, Database } from "lucide-react"

const services = [
  {
    icon: <Code className="w-6 h-6" />,
    title: "Web Development",
    description: "Full-stack web applications using modern frameworks and best practices.",
  },
  {
    icon: <Cloud className="w-6 h-6" />,
    title: "Cloud Architecture",
    description: "Scalable cloud solutions and infrastructure on Google Cloud Platform.",
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Mobile-First Design",
    description: "Responsive applications that work seamlessly across all devices.",
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "API Development",
    description: "RESTful APIs and microservices for robust backend systems.",
  },
]

export default function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="services" ref={ref} className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="tech-mono text-sm text-gray-500 mb-4">02 / Services</div>
            <h2 className="tech-title text-3xl md:text-4xl font-bold">What I do</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="minimal-card p-8 hover-lift"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-white mb-4">{service.icon}</div>
                <h3 className="tech-accent text-lg font-medium mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
