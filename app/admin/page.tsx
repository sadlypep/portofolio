"use client"

import { useState } from "react"
import AdminPanel from "@/components/admin-panel"
import Header from "@/components/header"

export default function AdminPage() {
  const [isAdminOpen, setIsAdminOpen] = useState(true)

  return (
    <div className="min-h-screen bg-black">
      <Header onAdminToggle={() => setIsAdminOpen(!isAdminOpen)} />
      <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  )
}
