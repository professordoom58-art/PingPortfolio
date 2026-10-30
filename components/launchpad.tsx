"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import type { AppWindow } from "@/types"

// Same apps as dock, except launchpad itself.
// `iconScale` mirrors the optical normalisation in components/dock.tsx (see the table
// there): each value is target / (slot * alpha-coverage), so the visible squircle of
// every icon is the same size regardless of the transparent padding in the PNG.
const launchpadApps = [
  { id: "mail", title: "Mail", icon: "/mail.png", component: "Mail", iconScale: "scale-[0.97]" },
  { id: "notes", title: "Notes", icon: "/notes.png", component: "Notes", iconScale: "scale-[0.92]" },
  { id: "terminal", title: "Terminal", icon: "/terminal.png", component: "Terminal", iconScale: "scale-[1.09]" },
  { id: "youtube", title: "YouTube", icon: "/youtube.png", component: "YouTube", iconScale: "scale-[1.09]" },
  { id: "spotify", title: "Spotify", icon: "/spotify.png", component: "Spotify", iconScale: "scale-[1.09]" },
  { id: "weather", title: "Weather", icon: "/weather.png", component: "Weather", iconScale: "scale-[0.92]" },
  { id: "premiere", title: "Premiere Pro", icon: "/premiere.png", component: "PremierePro", iconScale: "scale-[1.09]" },
  { id: "aftereffects", title: "After Effects", icon: "/aftereffects.png", component: "AfterEffects", iconScale: "scale-[1.09]" },
  { id: "photoshop", title: "Photoshop", icon: "/photoshop.png", component: "Photoshop", iconScale: "scale-[1.09]" },
  { id: "illustrator", title: "Illustrator", icon: "/illustrator.png", component: "Illustrator", iconScale: "scale-[1.09]" },
]

interface LaunchpadProps {
  onAppClick: (app: AppWindow) => void
  onClose: () => void
}

export default function Launchpad({ onAppClick, onClose }: LaunchpadProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredApps, setFilteredApps] = useState(launchpadApps)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Animation effect
    setIsVisible(true)
  }, [])

  useEffect(() => {
    if (searchTerm) {
      setFilteredApps(
        launchpadApps.filter((app) => app.title.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    } else {
      setFilteredApps(launchpadApps)
    }
  }, [searchTerm])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return
      setIsVisible(false)
      setTimeout(onClose, 220)
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [onClose])

  const handleAppClick = (app: (typeof launchpadApps)[0]) => {
    onAppClick({
      id: app.id,
      title: app.title,
      component: app.component,
      position: { x: 0, y: 0 },
      size: { width: 850, height: 600 },
      innerHeight: typeof window !== "undefined" ? window.innerHeight : 600,
    })
    onClose()
  }

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 220) // Wait for the fade/scale animation to complete
  }

  return (
    <div
      className={`fixed inset-0 z-40 flex flex-col items-center justify-center overflow-y-auto bg-black/35 backdrop-blur-3xl transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        className={`flex w-full max-w-4xl flex-col items-center px-8 py-12 transition-transform duration-300 ${
          isVisible ? "translate-y-0 scale-100" : "translate-y-6 scale-95"
        }`}
      >
        {/* Search pill */}
        <div
          className="group flex h-8 w-64 items-center justify-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 text-xs text-white backdrop-blur-xl transition-all focus-within:justify-start"
          onClick={(e) => e.stopPropagation()}
        >
          <Search className="h-3.5 w-3.5 shrink-0 text-white/60" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-center text-xs text-white outline-none placeholder:text-white/60 group-focus-within:text-left"
          />
        </div>

        {/* App grid */}
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-4 gap-x-12 gap-y-10 sm:grid-cols-6">
          {filteredApps.map((app) => (
            <button
              key={app.id}
              onClick={(e) => {
                e.stopPropagation()
                handleAppClick(app)
              }}
              className="group flex flex-col items-center justify-center"
            >
              {/*
                Fixed 68px slot; hover/press magnification lives on this wrapper so the
                per-icon optical `scale-[...]` on the image composes with it instead of
                being overwritten by it.
              */}
              <span className="flex h-[68px] w-[68px] shrink-0 items-center justify-center transition-transform duration-200 group-hover:scale-110 group-active:scale-95">
                <img
                  src={app.icon}
                  alt={app.title}
                  className={`h-[68px] w-[68px] object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)] ${app.iconScale}`}
                  draggable={false}
                />
              </span>
              <span className="mt-2 w-24 truncate text-center text-[13px] font-medium text-white/90 tracking-tight">
                {app.title}
              </span>
            </button>
          ))}
        </div>

        {filteredApps.length === 0 && (
          <p className="mt-12 text-sm text-white/50">No apps found</p>
        )}

        {/* Page dots */}
        <div className="mt-14 flex items-center justify-center gap-2">
          <span className="h-2 w-2 rounded-full bg-white" />
          <span className="h-2 w-2 rounded-full bg-white/30" />
        </div>
      </div>
    </div>
  )
}
