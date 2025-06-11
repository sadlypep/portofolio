"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { X, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  placeholder?: string
}

export default function ImageUpload({ value, onChange, placeholder = "Upload image" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB")
      return
    }

    setIsUploading(true)

    try {
      // Convert to base64 for demo (in production, upload to cloud storage)
      const reader = new FileReader()
      reader.onload = (e) => {
        const base64 = e.target?.result as string
        onChange(base64)
        setIsUploading(false)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error("Upload failed:", error)
      alert("Upload failed. Please try again.")
      setIsUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemove = () => {
    onChange("")
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">Project Image</label>

      {value ? (
        <div className="relative">
          <img
            src={value || "/placeholder.svg"}
            alt="Project preview"
            className="w-full h-48 object-cover rounded-lg border border-gray-600"
          />
          <Button
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full"
            size="sm"
          >
            <X size={16} />
          </Button>
        </div>
      ) : (
        <motion.div
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            dragActive ? "border-white bg-white/5" : "border-gray-600 hover:border-gray-500"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="loading-minimal" />
              <p className="text-gray-400 text-sm">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <p className="text-gray-300 font-medium">{placeholder}</p>
                <p className="text-gray-500 text-sm">Drag & drop or click to browse</p>
                <p className="text-gray-600 text-xs mt-1">PNG, JPG up to 5MB</p>
              </div>
            </div>
          )}
        </motion.div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFileSelect(file)
        }}
        className="hidden"
      />
    </div>
  )
}
