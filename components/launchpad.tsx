"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import type { AppWindow } from "@/types"

// Same apps as dock, except launchpad itself
const launchpadApps = [
  { id: "mail", title: "Mail", icon: "/mail.png", component: "Mail" },
  { id: "notes", title: "Notes", icon: "/notes.png", component: "Notes" },
  { id: "terminal", title: "Terminal", icon: "/terminal.png", component: "Terminal" },
  { id: "youtube", title: "YouTube", icon: "/youtube.png", component: "YouTube" },
  { id: "spotify", title: "Spotify", icon: "/spotify.png", component: "Spotify" },
  { id: "snake", title: "Snake", icon: "/snake.png", component: "Snake" },
  { id: "weather", title: "Weather", icon: "/weather.png", component: "Weather" },
  { id: "premiere", title: "Premiere Pro", icon: "/premiere.png", component: "PremierePro" },
  { id: "aftereffects", title: "After Effects", icon: "/aftereffects.png", component: "AfterEffects" },
  { id: "photoshop", title: "Photoshop", icon: "/photoshop.png", component: "Photoshop" },
  { id: "illustrator", title: "Illustrator", icon: "/illustrator.png", component: "Illustrator" },
]

// The Adobe tiles are drawn in-house so they share the exact same squircle
// weight as the system app icons instead of relying on tiny raster glyphs.
const adobeIcons: Record<
  string,
  { mark: string; className: string; glow: string }
> = {
  premiere: {
    mark: "Pr",
    className: "border-[#9B6DFF]/70 bg-gradient-to-br from-[#2B1055] to-[#0B0718] text-[#C9B0FF]",
    glow: "shadow-[0_10px_25px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.25),0_0_22px_rgba(155,109,255,0.35)]",
  },
  aftereffects: {
    mark: "Ae",
    className: "border-[#A78BFA]/70 bg-gradient-to-br from-[#241458] to-[#0A0A20] text-[#D4C4FF]",
    glow: "shadow-[0_10px_25px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.25),0_0_22px_rgba(167,139,250,0.35)]",
  },
  photoshop: {
    mark: "Ps",
    className: "border-[#37A5FF]/70 bg-gradient-to-br from-[#062B55] to-[#04101F] text-[#9FD3FF]",
    glow: "shadow-[0_10px_25px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.25),0_0_22px_rgba(55,165,255,0.35)]",
  },
  illustrator: {
    mark: "Ai",
    className: "border-[#FF9F1A]/70 bg-gradient-to-br from-[#552806] to-[#1F1003] text-[#FFC97A]",
    glow: "shadow-[0_10px_25px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.25),0_0_22px_rgba(255,159,26,0.35)]",
  },
}

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
          {filteredApps.map((app) => {
            const adobe = adobeIcons[app.id]

            return (
              <button
                key={app.id}
                onClick={(e) => {
                  e.stopPropagation()
                  handleAppClick(app)
                }}
                className="group flex flex-col items-center justify-center"
              >
                {adobe ? (
                  <div
                    className={`flex h-[72px] w-[72px] items-center justify-center rounded-[18px] border transition-transform duration-200 hover:scale-110 active:scale-95 ${adobe.className} ${adobe.glow}`}
                  >
                    <span className="text-2xl font-bold tracking-tight">{adobe.mark}</span>
                  </div>
                ) : (
                  <div className="h-[72px] w-[72px] overflow-hidden rounded-[18px] shadow-[0_10px_25px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.25)] transition-transform duration-200 hover:scale-110 active:scale-95">
                    <img
                      src={app.icon || "/placeholder.svg"}
                      alt={app.title}
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                  </div>
                )}
                <span className="mt-2 w-24 truncate text-center text-xs text-white/90">
                  {app.title}
                </span>
              </button>
            )
          })}
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
