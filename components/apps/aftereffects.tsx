"use client"

import { useState } from "react"
import Image from "next/image"
import {
  FolderOpen,
  Gauge,
  Home,
  Layers,
  LayoutTemplate,
  Mail,
  Sparkles,
  Wand2,
} from "lucide-react"
import IOSBackButton from "@/components/ios/ios-back-button"

interface AfterEffectsProps {
  isMobile?: boolean
  hideAdobeHeader?: boolean
  onBack?: () => void
}

const WORKSPACES = ["Composition", "Effects", "Graph", "Render"] as const

const NAV_ITEMS = [
  { label: "Home", icon: Home },
  { label: "Compositions", icon: Layers },
  { label: "Templates", icon: LayoutTemplate },
  { label: "Motion Graphics", icon: Wand2 },
] as const

const FEATURES = [
  { label: "Visual Effects", icon: Sparkles },
  { label: "Motion Graphics", icon: Layers },
  { label: "Compositing", icon: Wand2 },
] as const

const SERVICES = [
  "Motion Design",
  "2D Animation",
  "Explainer Videos",
  "Logo Animation",
  "YouTube Graphics",
  "Visual Effects",
  "Compositing",
  "Social Media Ads",
] as const

/** Spectrum dark surface used for every elevated panel. */
const PANEL =
  "bg-[#1f1f23] border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"

const MUTED = "text-zinc-400"

export default function AfterEffects({
  isMobile = false,
  hideAdobeHeader = false,
  onBack,
}: AfterEffectsProps) {
  const [activeNav, setActiveNav] = useState<string>("Home")
  const [activeWorkspace, setActiveWorkspace] = useState<string>("Composition")

  const videos = [
    {
      title: "Apple Music UI",
      embed: "https://www.youtube.com/embed/xCuF4gisbJc?rel=0",
    },
    {
      title: "Newspaper Cutout - B roll",
      embed: "https://www.youtube.com/embed/VdNYaZsVRTg?rel=0",
    },
    {
      title: "Retro TV - News",
      embed: "https://www.youtube.com/embed/Rhef5voXc1I?rel=0",
    },
    {
      title: "Article on Blue Mat - B roll",
      embed: "https://www.youtube.com/embed/HlOH_RqeifU?rel=0",
    },
  ]

  const handleConnect = () => {
    window.location.href = "mailto:pingmihir@outlook.com?subject=After Effects Inquiry"
  }

  return (
    <div
      className={`relative flex flex-col bg-[#141414] text-white ${
        isMobile ? "min-h-full" : "h-full"
      }`}
    >
      {/* Unified macOS toolbar (single header, no redundant app bar) */}
      {!hideAdobeHeader && (
        <div className="flex h-12 shrink-0 items-center gap-3 border-b border-white/10 bg-[#1f1f23]/90 px-4 backdrop-blur-md">
          <div className="flex min-w-0 flex-1 items-center gap-2.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[#9999ff]/30 bg-[#00005b] text-[11px] font-bold text-[#9999ff]">
              Ae
            </span>
            <span className="truncate text-[13px] font-semibold tracking-tight">
              Adobe After Effects
            </span>
          </div>

          {/* Native segmented workspace control */}
          <div className="hidden shrink-0 items-center gap-0.5 rounded-lg border border-white/10 bg-black/40 p-0.5 sm:flex">
            {WORKSPACES.map((workspace) => (
              <button
                key={workspace}
                type="button"
                onClick={() => setActiveWorkspace(workspace)}
                aria-pressed={activeWorkspace === workspace}
                className={`rounded-md px-3 py-1 text-[11px] font-medium transition-colors ${
                  activeWorkspace === workspace
                    ? "bg-white/10 text-white shadow-sm"
                    : "text-white/55 hover:text-white"
                }`}
              >
                {workspace}
              </button>
            ))}
          </div>

          <div className="flex flex-1 justify-end">
            <button
              type="button"
              onClick={handleConnect}
              className="flex shrink-0 items-center gap-2 rounded-md border border-[#a855f7]/40 bg-[#9333ea] px-3 py-1.5 text-[13px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] transition-colors hover:bg-[#a855f7]"
            >
              <Mail size={15} />
              Connect
            </button>
          </div>
        </div>
      )}

      <div className="flex min-h-0 flex-1">
        {/* Vibrancy sidebar */}
        {!isMobile && (
          <aside className="flex w-60 shrink-0 flex-col border-r border-white/10 bg-[#18181b]/80 backdrop-blur-xl">
            <nav className="space-y-0.5 p-3">
              {NAV_ITEMS.map(({ label, icon: Icon }) => {
                const isActive = activeNav === label
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setActiveNav(label)}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex w-full items-center gap-2.5 rounded-md border px-3 py-2 text-[13px] transition-colors ${
                      isActive
                        ? "border-[#9333ea]/30 bg-[#9333ea]/20 font-medium text-[#d8b4fe]"
                        : "border-transparent text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${isActive ? "text-[#d8b4fe]" : "text-white/50"}`} />
                    {label}
                  </button>
                )
              })}
            </nav>

            <div className="mt-auto p-3">
              <div className="space-y-1.5 rounded-lg border border-white/10 bg-white/5 p-3 text-[11px]">
                <p className="flex items-center gap-2 text-white/70">
                  <Gauge className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  RAM Preview: Cached • 60 fps
                </p>
                <p className="flex items-center gap-2 text-white/45">
                  <FolderOpen className="h-3.5 w-3.5 shrink-0" />
                  Comp 1 saved locally
                </p>
              </div>
            </div>
          </aside>
        )}

        {/* Main canvas */}
        <div
          className={`min-h-0 flex-1 overflow-y-auto ${
            isMobile ? "px-6 pt-28 pb-6" : "p-8"
          }`}
        >
          {isMobile && onBack && (
            <div className="fixed top-14 left-6 z-50">
              <IOSBackButton onClick={onBack} />
            </div>
          )}

          {/* Hero */}
          <div className={`flex items-center gap-4 ${isMobile ? "mb-6 mt-4" : "mb-8"}`}>
            <Image
              src="/aftereffects.png"
              alt="After Effects"
              width={isMobile ? 56 : 64}
              height={isMobile ? 56 : 64}
              className="shrink-0"
            />

            <div className="min-w-0">
              <h1 className={isMobile ? "text-2xl font-bold" : "text-3xl font-bold"}>
                After Effects
              </h1>

              <p className={MUTED}>Motion Design • Visuals • Animation</p>
            </div>
          </div>

          {/* Specialty cards */}
          <div
            className={`mb-10 grid gap-4 ${
              isMobile ? "grid-cols-1" : "max-w-3xl grid-cols-3"
            }`}
          >
            {FEATURES.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className={`flex items-center gap-3.5 rounded-xl p-3 transition-all hover:-translate-y-0.5 hover:border-[#a855f7]/50 hover:bg-[#242429] ${PANEL}`}
              >
                <span
                  className={`flex shrink-0 items-center justify-center rounded-lg bg-[#a855f7]/10 text-[#d8b4fe] ring-1 ring-inset ring-[#a855f7]/25 ${
                    isMobile ? "h-9 w-9" : "h-11 w-11"
                  }`}
                >
                  <Icon size={isMobile ? 16 : 20} strokeWidth={2} />
                </span>

                <span className="min-w-0 flex-1">
                  <span
                    className={`block truncate font-semibold ${
                      isMobile ? "text-[15px]" : "text-sm"
                    }`}
                  >
                    {label}
                  </span>
                </span>
              </div>
            ))}
          </div>

          {/* Check Out — Composition viewport showcase */}
          <div>
            <div className="mb-6 flex items-baseline justify-between gap-3">
              <h2 className={`font-semibold ${isMobile ? "text-xl" : "text-2xl"}`}>
                Check Out
              </h2>
              <span className={`truncate text-xs ${MUTED}`}>
                Composition Viewport • 60 fps
              </span>
            </div>

            <div className="space-y-8">
              {videos.map((video) => (
                <div
                  key={video.title}
                  className="overflow-hidden rounded-xl border border-white/10 bg-[#0d0d11] shadow-[0_15px_40px_rgba(0,0,0,0.45)]"
                >
                  {/* Composition viewport header */}
                  <div className="flex items-center justify-between gap-3 border-b border-white/10 px-3 py-2">
                    <span className="flex items-center gap-2 text-[11px] font-medium text-white/70">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
                      Comp 1
                    </span>
                    <span className="truncate font-mono text-[10px] text-white/40">
                      1920×1080 • 60 fps • Full Resolution
                    </span>
                  </div>

                  <iframe
                    className="block w-full aspect-video"
                    src={video.embed}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />

                  {/* RAM preview cache line */}
                  <div className="h-[2px] w-full bg-emerald-400/80" />

                  <div className="p-5">
                    <h3 className="text-xl font-semibold">{video.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="mt-12">
            <h2 className="mb-5 text-2xl font-semibold">Services</h2>

            <div className="flex flex-wrap gap-3">
              {SERVICES.map((skill) => (
                <div
                  key={skill}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 ring-1 ring-inset ring-white/5"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
