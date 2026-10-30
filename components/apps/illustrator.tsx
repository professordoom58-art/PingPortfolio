"use client"

import Image from "next/image"
import { useState } from "react"
import {
  Cpu,
  Home,
  LayoutTemplate,
  Mail,
  Palette,
  PenTool,
  Shapes,
  X,
} from "lucide-react"
import IOSBackButton from "@/components/ios/ios-back-button"

interface IllustratorProps {
  isMobile?: boolean
  hideAdobeHeader?: boolean
  onBack?: () => void
}

const WORKSPACES = ["Essentials", "Typography", "Vector", "Export"] as const

const NAV_ITEMS = [
  { label: "Home", icon: Home },
  { label: "Vector Projects", icon: PenTool },
  { label: "Branding", icon: Palette },
  { label: "Templates", icon: LayoutTemplate },
] as const

const CATEGORY_CARDS = [
  { label: "Thumbnails", icon: PenTool },
  { label: "Infographics", icon: Palette },
  { label: "Branding", icon: Shapes },
] as const

const SHOWCASE_ITEMS = [
  { image: "/thumb1.jpg", title: "Thumbnail Design" },
  { image: "/thumb2.jpg", title: "Infographic" },
  { image: "/thumb3.jpg", title: "Brand Artwork" },
  { image: "/thumb4.jpg", title: "Media Graphic" },
] as const

const SERVICES = [
  "YouTube Thumbnails",
  "Infographics",
  "Brand Assets",
  "Vector Graphics",
  "Typography",
  "Identity Design",
  "Media Graphics",
  "Video Assets",
] as const

/** Spectrum dark surface used for every elevated panel. */
const PANEL =
  "bg-[#1f1f23] border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"

const MUTED = "text-zinc-400"

export default function Illustrator({
  isMobile = false,
  hideAdobeHeader = false,
  onBack,
}: IllustratorProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [activeNav, setActiveNav] = useState<string>("Home")
  const [activeWorkspace, setActiveWorkspace] = useState<string>("Essentials")

  const handleConnect = () => {
    window.location.href = "mailto:pingmihir@outlook.com?subject=Illustrator Inquiry"
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
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[#ff9a00]/40 bg-[#331b00] text-[11px] font-bold text-[#ff9a00]">
              Ai
            </span>
            <span className="truncate text-[13px] font-semibold tracking-tight">
              Adobe Illustrator
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
              className="flex shrink-0 items-center gap-2 rounded-md border border-[#ff9a00]/40 bg-gradient-to-b from-[#ea580c] to-[#c2410c] px-3 py-1.5 text-[13px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] transition-colors hover:from-[#f97316] hover:to-[#ea580c]"
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
                        ? "border-[#ff9a00]/30 bg-[#ff9a00]/15 font-medium text-[#fdba74]"
                        : "border-transparent text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${isActive ? "text-[#fdba74]" : "text-white/50"}`} />
                    {label}
                  </button>
                )
              })}
            </nav>

            <div className="mt-auto p-3">
              <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-[11px]">
                <p className="flex items-start gap-2 text-white/65">
                  <Cpu className="mt-px h-3.5 w-3.5 shrink-0 text-[#fdba74]" />
                  <span>GPU Performance: Metal • 300 PPI CMYK/RGB</span>
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
          <div className={`flex items-center ${isMobile ? "gap-3 mb-6 mt-4" : "gap-4 mb-8"}`}>
            <Image
              src="/illustrator.png"
              alt="Illustrator"
              width={isMobile ? 56 : 64}
              height={isMobile ? 56 : 64}
              className="shrink-0"
            />

            <div className="min-w-0">
              <h1 className={isMobile ? "text-2xl font-bold" : "text-3xl font-bold"}>
                Illustrator
              </h1>
              <p className={MUTED}>Vector Design • Branding • Illustration</p>
            </div>
          </div>

          {/* Specialty cards */}
          <div
            className={`mb-10 grid gap-4 ${
              isMobile ? "grid-cols-1" : "max-w-3xl grid-cols-3"
            }`}
          >
            {CATEGORY_CARDS.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className={`flex items-center gap-3.5 rounded-xl p-3 transition-all hover:-translate-y-0.5 hover:border-[#ff9a00]/50 hover:bg-[#242429] ${PANEL}`}
              >
                <span
                  className={`flex shrink-0 items-center justify-center rounded-lg bg-[#ff9a00]/15 text-[#fdba74] ring-1 ring-inset ring-[#ff9a00]/25 ${
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

          {/* Check Out */}
          <div>
            <div className="mb-5 flex items-baseline justify-between gap-3">
              <h2 className={`font-semibold ${isMobile ? "text-xl" : "text-2xl"}`}>
                Check Out
              </h2>
              <span className={`truncate text-xs ${MUTED}`}>
                Vector Showcase • Artboards
              </span>
            </div>

            <div className={isMobile ? "space-y-5" : "grid grid-cols-2 gap-5"}>
              {SHOWCASE_ITEMS.map((item) => (
                <div
                  key={item.image}
                  onClick={() => setSelectedImage(item.image)}
                  className="group cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-[#1f1f23] shadow-[0_15px_40px_rgba(0,0,0,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ff9a00]/50"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={1280}
                    height={720}
                    className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                      isMobile ? "h-52" : "aspect-video"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="mt-10">
            <h2 className="mb-4 text-xl font-semibold">Services</h2>

            <div className="flex flex-wrap gap-3">
              {SERVICES.map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-[#ff9a00]/30 bg-[#1a1206] px-4 py-2 text-sm text-white/90"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Image Preview */}
          {selectedImage && (
            <div
              className={`fixed inset-0 z-[9999] flex bg-black/80 backdrop-blur-md ${
                isMobile ? "items-center justify-center p-4" : "items-center justify-center"
              }`}
              onClick={() => setSelectedImage(null)}
            >
              <div
                className={`relative bg-black ${
                  isMobile
                    ? "w-[94vw] max-w-none rounded-3xl p-4"
                    : "max-w-6xl w-full rounded-2xl p-6"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                {!isMobile && (
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 transition-colors hover:bg-red-600"
                  >
                    <X size={13} className="text-white" strokeWidth={2.5} />
                  </button>
                )}

                <Image
                  src={selectedImage}
                  alt="Preview"
                  width={1920}
                  height={1080}
                  onClick={() => isMobile && setSelectedImage(null)}
                  className={`w-full object-contain cursor-pointer ${
                    isMobile ? "rounded-2xl" : "max-h-[70vh] rounded-xl"
                  }`}
                />
                {!isMobile && (
                  <div className="mt-5 text-center">
                    <p className="text-zinc-400">Created using Adobe Illustrator</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
