"use client"

import { useEffect } from "react"

// Component to handle data synchronization across devices
export default function DataSync() {
  useEffect(() => {
    // Force refresh data on page load
    const refreshData = () => {
      // Trigger events to refresh all sections
      const experiences = localStorage.getItem("portfolio-experiences")
      const certificates = localStorage.getItem("portfolio-certificates")
      const projects = localStorage.getItem("portfolio-projects")

      if (experiences) {
        try {
          window.dispatchEvent(
            new CustomEvent("experiencesUpdated", {
              detail: JSON.parse(experiences),
            }),
          )
        } catch (error) {
          console.error("Error syncing experiences:", error)
        }
      }

      if (certificates) {
        try {
          window.dispatchEvent(
            new CustomEvent("certificatesUpdated", {
              detail: JSON.parse(certificates),
            }),
          )
        } catch (error) {
          console.error("Error syncing certificates:", error)
        }
      }

      if (projects) {
        try {
          window.dispatchEvent(
            new CustomEvent("projectsUpdated", {
              detail: JSON.parse(projects),
            }),
          )
        } catch (error) {
          console.error("Error syncing projects:", error)
        }
      }
    }

    // Refresh on page load
    refreshData()

    // Refresh when page becomes visible (mobile browser switching)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        refreshData()
      }
    }

    // Refresh on focus (when user returns to tab)
    const handleFocus = () => {
      refreshData()
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("focus", handleFocus)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("focus", handleFocus)
    }
  }, [])

  return null // This component doesn't render anything
}
