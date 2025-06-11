"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Admin credentials (in production, this should be in environment variables)
  const ADMIN_CREDENTIALS = {
    username: "mickey",
    password: "admin123", // In production, use hashed passwords
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      // Set authentication token (in production, use JWT)
      const authToken = btoa(`${username}:${Date.now()}`)
      localStorage.setItem("portfolio-auth", authToken)
      localStorage.setItem("portfolio-auth-expiry", (Date.now() + 24 * 60 * 60 * 1000).toString()) // 24 hours

      onSuccess()
      onClose()
      setUsername("")
      setPassword("")
    } else {
      setError("Invalid username or password")
    }

    setIsLoading(false)
  }

  const handleClose = () => {
    setUsername("")
    setPassword("")
    setError("")
    setShowPassword(false)
    onClose()
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
            className="minimal-card w-full max-w-md"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <Lock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="tech-title text-lg">Admin Access</h2>
                    <p className="tech-mono text-xs text-gray-500">Authentication required</p>
                  </div>
                </div>
                <Button onClick={handleClose} className="pro-button-outline p-2">
                  <X size={16} />
                </Button>
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    className="bg-black border-gray-600 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="bg-black border-gray-600 text-white pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg p-3"
                  >
                    {error}
                  </motion.div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="pro-button w-full flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="loading-minimal" />
                  ) : (
                    <>
                      <Lock size={16} className="mr-2" />
                      Sign In
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
