"use client"

import { useEffect, useRef } from "react"

interface YouTubeProps {
  isMobile?: boolean
}

export default function YouTube({}: YouTubeProps) {
  const textColor = "text-white"
  const bgColor = "bg-gray-900"
  const hasOpenedRef = useRef(false)

  // Open YouTube channel when the app is opened
  useEffect(() => {
    // Only open once
    if (!hasOpenedRef.current) {
      hasOpenedRef.current = true

      // Your YouTube channel URL
      const youtubeUrl = "https://www.youtube.com/@Cactuxbeer"

      // Open in new tab
      window.open(youtubeUrl, "_blank")
    }
  }, [])

  return (
    <div className={`min-h-full ${bgColor} ${textColor} p-6 flex items-center justify-center`}>
      <div className="text-center">
        <img src="/youtube.png" alt="YouTube" className="w-16 h-16 mx-auto mb-4 object-contain" />
        <h2 className="text-xl font-semibold mb-2">Opening YouTube...</h2>
        <p>Redirecting to your YouTube channel</p>
      </div>
    </div>
  )
}
