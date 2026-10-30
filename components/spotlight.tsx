"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import {
  Search,
  Folder,
  Layers,
  Files,
  FileAudio,
  Github,
  Youtube,
  Instagram,
  Mail,
  AppWindow,
  Grid2x2,
  SlidersHorizontal,
  Moon,
  RotateCcw,
  Power,
} from "lucide-react"
import type { AppWindow as AppWindowType } from "@/types"

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const spotlightApps = [
  { id: "mail", title: "Mail", icon: "/mail.png", component: "Mail" },
  { id: "notes", title: "Notes", icon: "/notes.png", component: "Notes" },
  { id: "terminal", title: "Terminal", icon: "/terminal.png", component: "Terminal" },
  { id: "premiere", title: "Premiere Pro", icon: "/premiere.png", component: "PremierePro" },
  { id: "aftereffects", title: "After Effects", icon: "/aftereffects.png", component: "AfterEffects" },
  { id: "photoshop", title: "Photoshop", icon: "/photoshop.png", component: "Photoshop" },
  { id: "illustrator", title: "Illustrator", icon: "/illustrator.png", component: "Illustrator" },
  { id: "youtube", title: "YouTube", icon: "/youtube.png", component: "YouTube" },
  { id: "spotify", title: "Spotify", icon: "/spotify.png", component: "Spotify" },
  { id: "weather", title: "Weather", icon: "/weather.png", component: "Weather" },
]

/** Real audio files shipped in /public, surfaced as openable "files". */
const spotlightFiles = [
  { id: "file-good-morning", title: "Good Morning.mp3", subtitle: "Kanye West" },
  { id: "file-national-treasures", title: "National Treasures.mp3", subtitle: "Drake" },
  { id: "file-doomsday", title: "Doomsday.mp3", subtitle: "MF DOOM" },
]

/** Real outbound links used elsewhere in the portfolio. */
const spotlightDocs = [
  { id: "doc-github", title: "GitHub Repository", subtitle: "github.com", href: "https://github.com/professordoom58-art/PingPortfolio", Icon: Github },
  { id: "doc-youtube", title: "YouTube Channel", subtitle: "youtube.com", href: "https://www.youtube.com/@Cactuxbeer", Icon: Youtube },
  { id: "doc-instagram", title: "Instagram", subtitle: "instagram.com", href: "https://www.instagram.com/cactuxbeer/", Icon: Instagram },
  { id: "doc-mail", title: "Send an Email", subtitle: "pingmihir@outlook.com", href: "mailto:pingmihir@outlook.com", Icon: Mail },
]

type Category = "apps" | "files" | "actions" | "docs"

interface SpotlightProps {
  onClose: () => void
  onAppClick: (app: AppWindowType) => void
  onOpenLaunchpad?: () => void
  onOpenControlCenter?: () => void
  onSleep?: () => void
  onRestart?: () => void
  onShutdown?: () => void
}

interface Result {
  id: string
  title: string
  subtitle?: string
  /** Image path for app icons. */
  image?: string
  /** Lucide icon for everything else. */
  Icon?: React.ComponentType<{ className?: string }>
  run: () => void
}

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

/** App Store style "A" built from three sticks. */
function AppStoreGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M12 4.5 6.2 18M12 4.5 17.8 18M8.4 13.6h7.2"
        stroke="currentColor"
        strokeWidth={2.1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const CATEGORIES: { key: Category; label: string; render: (cls: string) => React.ReactNode }[] = [
  { key: "apps", label: "Applications", render: (cls) => <AppStoreGlyph className={cls} /> },
  { key: "files", label: "Files", render: (cls) => <Folder className={cls} strokeWidth={1.8} /> },
  { key: "actions", label: "Quick Actions", render: (cls) => <Layers className={cls} strokeWidth={1.8} /> },
  { key: "docs", label: "Documents", render: (cls) => <Files className={cls} strokeWidth={1.8} /> },
]

/* ------------------------------------------------------------------ */
/* Spotlight                                                           */
/* ------------------------------------------------------------------ */

export default function Spotlight({
  onClose,
  onAppClick,
  onOpenLaunchpad,
  onOpenControlCenter,
  onSleep,
  onRestart,
  onShutdown,
}: SpotlightProps) {
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<Category | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const openApp = (app: (typeof spotlightApps)[0]) => {
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

  // Actions are real desktop commands, not placeholders.
  const actionResults: Result[] = useMemo(
    () => [
      { id: "act-launchpad", title: "Open Launchpad", subtitle: "Applications", Icon: Grid2x2, run: () => { onOpenLaunchpad?.(); onClose() } },
      { id: "act-control-center", title: "Open Control Center", subtitle: "Settings", Icon: SlidersHorizontal, run: () => { onOpenControlCenter?.(); onClose() } },
      { id: "act-sleep", title: "Sleep", subtitle: "System", Icon: Moon, run: () => { onSleep?.(); onClose() } },
      { id: "act-restart", title: "Restart", subtitle: "System", Icon: RotateCcw, run: () => { onRestart?.(); onClose() } },
      { id: "act-shutdown", title: "Shut Down", subtitle: "System", Icon: Power, run: () => { onShutdown?.(); onClose() } },
    ],
    [onOpenLaunchpad, onOpenControlCenter, onSleep, onRestart, onShutdown, onClose],
  )

  const appResults: Result[] = useMemo(
    () =>
      spotlightApps.map((app) => ({
        id: app.id,
        title: app.title,
        subtitle: "Application",
        image: app.icon,
        run: () => openApp(app),
      })),
    // openApp closes over onAppClick/onClose; both are stable per render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onAppClick, onClose],
  )

  const fileResults: Result[] = useMemo(
    () =>
      spotlightFiles.map((file) => ({
        id: file.id,
        title: file.title,
        subtitle: file.subtitle,
        Icon: FileAudio,
        run: () => openApp(spotlightApps.find((a) => a.id === "spotify")!),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onAppClick, onClose],
  )

  const docResults: Result[] = useMemo(
    () =>
      spotlightDocs.map((doc) => ({
        id: doc.id,
        title: doc.title,
        subtitle: doc.subtitle,
        Icon: doc.Icon,
        run: () => {
          window.open(doc.href, "_blank")
          onClose()
        },
      })),
    [onClose],
  )

  const byCategory: Record<Category, Result[]> = {
    apps: appResults,
    files: fileResults,
    actions: actionResults,
    docs: docResults,
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    const pool = activeCategory
      ? byCategory[activeCategory]
      : [...appResults, ...fileResults, ...actionResults, ...docResults]

    if (!q) return pool
    return pool.filter(
      (r) =>
        r.title.toLowerCase().includes(q) || (r.subtitle?.toLowerCase().includes(q) ?? false),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, activeCategory, appResults, fileResults, actionResults, docResults])

  // Results only appear once the user types or picks a category.
  const showResults = query.trim() !== "" || activeCategory !== null

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Reset the highlight whenever the result set changes.
  useEffect(() => {
    setSelectedIndex(0)
  }, [query, activeCategory])

  // Keyboard: Escape closes, arrows move, Enter launches.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((prev) => (results.length ? (prev + 1) % results.length : 0))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((prev) => (results.length ? (prev - 1 + results.length) % results.length : 0))
      } else if (e.key === "Enter" && results.length > 0) {
        e.preventDefault()
        results[Math.min(selectedIndex, results.length - 1)].run()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [results, selectedIndex, onClose])

  // Click outside the bar closes Spotlight.
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener("mousedown", handleMouseDown)
    return () => document.removeEventListener("mousedown", handleMouseDown)
  }, [onClose])

  const toggleCategory = (key: Category) => {
    setActiveCategory((prev) => (prev === key ? null : key))
  }

  return (
    <div
      className="fixed left-1/2 top-[22%] z-[100] flex -translate-x-1/2 flex-col items-center gap-3"
      ref={wrapperRef}
    >
      {/* Top row: search pill + 4 category circles */}
      <div className="flex items-center gap-2.5">
        <div className="flex h-12 w-[340px] items-center gap-3 rounded-full border border-white/15 bg-neutral-900/65 px-4 shadow-[0_16px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-2xl transition-all sm:w-[400px]">
          <Search className="h-5 w-5 shrink-0 stroke-[2.2] text-white/70" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Spotlight Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border-none bg-transparent text-[17px] font-normal tracking-tight text-white outline-none placeholder:text-white/50"
          />
        </div>

        <div className="flex items-center gap-2">
          {CATEGORIES.map(({ key, label, render }) => {
            const isActive = activeCategory === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => toggleCategory(key)}
                aria-label={label}
                aria-pressed={isActive}
                title={label}
                className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border shadow-[0_8px_25px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-2xl transition-all duration-200 ${
                  isActive
                    ? "scale-105 border-white/30 bg-[#007AFF] text-white shadow-[0_8px_25px_rgba(0,122,255,0.5)]"
                    : "border-white/15 bg-neutral-900/65 text-white/85 hover:scale-105 hover:bg-white/15 hover:text-white active:scale-95"
                }`}
              >
                {render("h-5 w-5")}
              </button>
            )
          })}
        </div>
      </div>

      {/* Results card */}
      {showResults && (
        <div className="w-full max-w-[620px] animate-in fade-in slide-in-from-top-2 overflow-hidden rounded-[26px] border border-white/15 bg-neutral-900/75 p-2 text-white shadow-[0_24px_60px_rgba(0,0,0,0.6)] backdrop-blur-3xl duration-150 [&::-webkit-scrollbar]:hidden">
          {results.length === 0 ? (
            <p className="px-3.5 py-4 text-sm text-white/50">No results for “{query}”</p>
          ) : (
            <div className="max-h-[320px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {results.map((result, index) => {
                const isSelected = index === selectedIndex
                return (
                  <div
                    key={result.id}
                    onMouseEnter={() => setSelectedIndex(index)}
                    onClick={result.run}
                    className={`flex cursor-pointer items-center justify-between rounded-2xl px-3.5 py-2.5 transition-colors ${
                      isSelected ? "bg-[#007AFF] text-white shadow-sm" : "text-white/90 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center">
                        {result.image ? (
                          <img src={result.image} alt="" className="h-6 w-6 object-contain" />
                        ) : result.Icon ? (
                          <result.Icon className="h-5 w-5" />
                        ) : (
                          <AppWindow className="h-5 w-5" />
                        )}
                      </span>
                      <span className="truncate text-[15px] font-medium">{result.title}</span>
                    </div>

                    {result.subtitle && (
                      <span
                        className={`ml-3 shrink-0 truncate text-xs ${
                          isSelected ? "text-white/80" : "text-white/50"
                        }`}
                      >
                        {result.subtitle}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
