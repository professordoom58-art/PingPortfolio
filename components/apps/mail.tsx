"use client"

import { useEffect } from "react"
import { Mail } from "lucide-react"

interface MailProps {
  isMobile?: boolean
}

export default function MailApp({}: MailProps) {
  const textColor = "text-white"
  const bgColor = "bg-gray-900"

  // Open mailto link when the app is opened
  useEffect(() => {
    const mailtoLink = "mailto:pingmihir@outlook.com"
    window.location.href = mailtoLink
  }, [])

  return (
    <div className={`min-h-full ${bgColor} ${textColor} p-6 flex items-center justify-center`}>
      <div className="text-center">
        <Mail className="w-16 h-16 mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Opening Mail...</h2>
        <p>Redirecting to your default mail application</p>
      </div>
    </div>
  )
}
