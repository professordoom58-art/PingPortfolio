"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { MoreHorizontal } from "lucide-react"
import type { AppWindow } from "@/types"

// Apps pinned to the dock, mirroring the Launchpad grid.
//
// `iconScale` is an optical correction, not decoration. Every PNG below is drawn on a
// square canvas, but the squircle inside it covers a different share of that canvas.
// Coverage = height of the visible squircle (alpha >= 128, i.e. where the icon is at
// least half opaque) divided by canvas height:
//
//   launchpad 100.0%   mail 89.8%   notes 94.8%   weather 94.8%
//   premiere / aftereffects / photoshop / illustrator / terminal / youtube / spotify 80.5%
//
// Dropped into the same 48px slot that makes Finder look ~22% bigger than the Adobe
// icons. Each factor is  target / (slot * coverage)  with target = 42px, so the visible
// squircle of every icon is 41.8-42.2px tall and they all sit on one guide line.
//
//   launchpad     42 / (48 * 1.0000) = 0.875 -> scale-[0.88]
//   mail          42 / (48 * 0.8984) = 0.974 -> scale-[0.97]
//   notes/weather 42 / (48 * 0.9475) = 0.923 -> scale-[0.92]
//   adobe/term/yt/spotify  42 / (48 * 0.8047) = 1.087 -> scale-[1.09]
//
// Keep these as literal class strings: Tailwind only generates a utility it can find
// verbatim in the source, so a computed `scale-[${n}]` would silently produce nothing.
const dockApps = [
  { id: "launchpad", title: "Launchpad", icon: "/launchpad.png", component: "Launchpad", isSystem: true, iconScale: "scale-[0.88]" },
  { id: "mail", title: "Mail", icon: "/mail.png", component: "Mail", iconScale: "scale-[0.97]" },
  { id: "notes", title: "Notes", icon: "/notes.png", component: "Notes", iconScale: "scale-[0.92]" },
  { id: "premiere", title: "Premiere Pro", icon: "/premiere.png", component: "PremierePro", iconScale: "scale-[1.09]" },
  { id: "aftereffects", title: "After Effects", icon: "/aftereffects.png", component: "AfterEffects", iconScale: "scale-[1.09]" },
  { id: "photoshop", title: "Photoshop", icon: "/photoshop.png", component: "Photoshop", iconScale: "scale-[1.09]" },
  { id: "illustrator", title: "Illustrator", icon: "/illustrator.png", component: "Illustrator", iconScale: "scale-[1.09]" },
  { id: "terminal", title: "Terminal", icon: "/terminal.png", component: "Terminal", iconScale: "scale-[1.09]" },
  { id: "youtube", title: "YouTube", icon: "/youtube.png", component: "YouTube", iconScale: "scale-[1.09]" },
  { id: "spotify", title: "Spotify", icon: "/spotify.png", component: "Spotify", iconScale: "scale-[1.09]" },
]

interface DockProps {
  onAppClick: (app: AppWindow) => void
  onLaunchpadClick: () => void
  activeAppIds: string[]
}

export default function Dock({ onAppClick, onLaunchpadClick, activeAppIds }: DockProps) {
  const [mouseX, setMouseX] = useState<number | null>(null)
  const dockRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  // Check if we're on a mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!showMobileMenu) return

    const handleClickOutside = (event: MouseEvent) => {
      if (dockRef.current && !dockRef.current.contains(event.target as Node)) {
        setShowMobileMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showMobileMenu])

  const handleAppClick = (app: (typeof dockApps)[0]) => {
    if (app.id === "launchpad") {
      onLaunchpadClick()
      return
    }

    // Position and size are computed by the Window component on mount so every
    // window opens centered in the current viewport.
    onAppClick({
      id: app.id,
      title: app.title,
      component: app.component,
      position: { x: 0, y: 0 },
      size: { width: 850, height: 600 },
      innerHeight: typeof window !== "undefined" ? window.innerHeight : 600,
    })

    // Close mobile menu after clicking an app
    if (showMobileMenu) {
      setShowMobileMenu(false)
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dockRef.current && !isMobile) {
      const rect = dockRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      setMouseX(x)
    }
  }

  const handleMouseLeave = () => {
    setMouseX(null)
  }

  // Calculate scale for each icon based on distance from mouse
  const getIconScale = (index: number, iconCount: number) => {
    if (mouseX === null || isMobile) return 1

    // Get the dock width and calculate the position of each icon
    const dockWidth = dockRef.current?.offsetWidth || 0
    const iconWidth = dockWidth / iconCount
    const iconPosition = iconWidth * (index + 0.5) // Center of the icon

    // Distance from mouse to icon center
    const distance = Math.abs(mouseX - iconPosition)

    // Maximum scale and distance influence
    const maxScale = 2
    const maxDistance = iconWidth * 2.5

    // Calculate scale based on distance (closer = larger)
    if (distance > maxDistance) return 1

    // Smooth parabolic scaling function
    const scale = 1 + (maxScale - 1) * Math.pow(1 - distance / maxDistance, 2)

    return scale
  }

  // For mobile, we'll show only the first 4 apps plus a "more" button
  const visibleApps = isMobile ? dockApps.slice(0, 4) : dockApps
  const hiddenApps = isMobile ? dockApps.slice(4) : []

  return (
    <div ref={dockRef} className="fixed bottom-2 left-1/2 z-[1000] -translate-x-1/2">
      {/* Mobile expanded menu */}
      {isMobile && showMobileMenu && (
        <div
          className={`absolute bottom-20 left-1/2 transform -translate-x-1/2 w-[280px] 
          bg-gray-800/90 backdrop-blur-xl 
          rounded-xl border border-white/20 shadow-lg p-4 mb-2`}
        >
          <div className="grid grid-cols-4 gap-4">
            {hiddenApps.map((app) => (
              <div
                key={app.id}
                className="flex flex-col items-center justify-center"
                onClick={() => handleAppClick(app)}
              >
                <div className="w-14 h-14 flex items-center justify-center">
                  <img
                    src={app.icon || "/placeholder.svg"}
                    alt={app.title}
                    className={`w-12 h-12 object-contain ${app.iconScale}`}
                    draggable="false"
                  />
                </div>
                <span className="text-xs mt-1 text-white">{app.title}</span>
                {activeAppIds.includes(app.id) && <div className="w-1 h-1 bg-white rounded-full mt-1"></div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main dock */}
      <div
        className={`px-3 py-2 rounded-2xl 
          bg-white/10 backdrop-blur-xl 
          flex items-end border border-white/20 shadow-lg
          ${isMobile ? "h-20" : "h-16"}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {visibleApps.map((app, index) => {
          const scale = getIconScale(index, visibleApps.length)

          return (
            <div
              key={app.id}
              className={`flex flex-col items-center justify-end h-full ${isMobile ? "px-3" : "px-2"}`}
              style={{
                transform: isMobile ? "none" : `translateY(${(scale - 1) * -8}px)`,
                zIndex: scale > 1 ? 10 : 1,
                transition: mouseX === null ? "transform 0.2s ease-out" : "none",
              }}
              onClick={() => handleAppClick(app)}
            >
              <div
                className={`relative flex shrink-0 cursor-pointer items-center justify-center ${
                  isMobile ? "h-14 w-14" : "h-12 w-12"
                }`}
                style={{
                  transform: isMobile ? "none" : `scale(${scale})`,
                  transformOrigin: "bottom center",
                  transition: mouseX === null ? "transform 0.2s ease-out" : "none",
                }}
              >
                {/*
                  Fixed square slot (48px desktop / 56px mobile) + `iconScale`, which
                  normalises the transparent padding baked into each PNG around the
                  slot's centre. Hover magnification stays on this wrapper, so it
                  multiplies the optical scale instead of replacing it.
                */}
                <img
                  src={app.icon || "/placeholder.svg"}
                  alt={app.title}
                  className={`object-contain ${isMobile ? "h-14 w-14" : "h-12 w-12"} ${app.iconScale}`}
                  draggable="false"
                />

                {/* Tooltip - only on desktop */}
                {!isMobile && scale > 1.5 && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-black/70 text-white text-xs rounded whitespace-nowrap">
                    {app.title}
                  </div>
                )}

                {/* Indicator dot for active apps */}
                {activeAppIds.includes(app.id) && (
                  <div className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
                )}
              </div>
            </div>
          )
        })}

        {/* More button for mobile */}
        {isMobile && (
          <div
            className="flex flex-col items-center justify-end h-full px-3"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <div className="relative cursor-pointer">
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center 
                bg-gray-700 
                ${showMobileMenu ? "bg-blue-700" : ""}`}
              >
                <MoreHorizontal className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
