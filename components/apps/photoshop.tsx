"use client"

import Image from "next/image"
import { useState } from "react"
import {
  Clock,
  HardDrive,
  Home,
  ImageIcon,
  LayoutTemplate,
  Mail,
  Sparkles,
} from "lucide-react"
import IOSBackButton from "@/components/ios/ios-back-button"

interface PhotoshopProps {
  isMobile?: boolean
  hideAdobeHeader?: boolean
  onBack?: () => void
}

const WORKSPACES = ["Essentials", "Retouching", "Motion", "3D"] as const

const NAV_ITEMS = [
  { label: "Home", icon: Home },
  { label: "Recent Files", icon: Clock },
  { label: "Assets", icon: ImageIcon },
  { label: "Templates", icon: LayoutTemplate },
] as const

const SPECIALTIES = [
  { label: "Assets", icon: ImageIcon },
  { label: "Thumbnails", icon: LayoutTemplate },
  { label: "Compositing", icon: Sparkles },
] as const

const SERVICES = [
  "YouTube Thumbnails",
  "Motion Graphics Assets",
  "PSD Composites",
  "Layered Artwork",
  "Cutouts",
  "UI Mockups",
  "Textures",
  "Social Media Graphics",
  "Photo Manipulation",
  "Channel Branding",
] as const

const PROJECTS = [
  { id: "ps-1", title: "Neon Portrait Retouch", category: "Retouching", media: "/ps1.gif" },
  { id: "ps-2", title: "Cyberpunk Brand Identity", category: "Compositing", media: "/ps2.gif" },
  { id: "ps-3", title: "Fashion Editorial", category: "Photography", media: "/ps3.gif" },
  { id: "ps-4", title: "Social Campaign Series", category: "UI Mockups", media: "/ps4.gif" },
] as const

/** Spectrum dark surface used for every elevated panel. */
const PANEL =
  "bg-[#1f1f23] border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"

const MUTED = "text-zinc-400"

export default function Photoshop({
  isMobile = false,
  hideAdobeHeader = false,
  onBack,
}: PhotoshopProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [activeNav, setActiveNav] = useState<string>("Home")
  const [activeWorkspace, setActiveWorkspace] = useState<string>("Essentials")

  const handleConnect = () => {
    window.location.href = "mailto:pingmihir@outlook.com?subject=Photoshop Inquiry"
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
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[#31a8ff]/40 bg-[#001e36] text-[11px] font-bold text-[#31a8ff]">
              Ps
            </span>
            <span className="truncate text-[13px] font-semibold tracking-tight">
              Adobe Photoshop
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
              className="flex shrink-0 items-center gap-2 rounded-md border border-[#31a8ff]/40 bg-gradient-to-b from-[#0ea5e9] to-[#0369a1] px-3 py-1.5 text-[13px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] transition-colors hover:from-[#38bdf8] hover:to-[#0284c7]"
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
                        ? "border-[#31a8ff]/30 bg-[#31a8ff]/15 font-medium text-[#7dd3fc]"
                        : "border-transparent text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${isActive ? "text-[#7dd3fc]" : "text-white/50"}`} />
                    {label}
                  </button>
                )
              })}
            </nav>

            <div className="mt-auto p-3">
              <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-[11px]">
                <p className="flex items-start gap-2 text-white/65">
                  <HardDrive className="mt-px h-3.5 w-3.5 shrink-0 text-[#7dd3fc]" />
                  <span>Scratch Disks: 94% Free • 16-bit RGB</span>
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
              src="/photoshop.png"
              alt="Photoshop"
              width={isMobile ? 56 : 64}
              height={isMobile ? 56 : 64}
              className="shrink-0"
            />

            <div className="min-w-0">
              <h1 className={isMobile ? "text-2xl font-bold" : "text-3xl font-bold"}>
                Photoshop
              </h1>
              <p className={MUTED}>Assets • Thumbnails • Compositing</p>
            </div>
          </div>

          {/* Specialty cards */}
          <div
            className={`mb-10 grid gap-4 ${
              isMobile ? "grid-cols-1" : "max-w-3xl grid-cols-3"
            }`}
          >
            {SPECIALTIES.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className={`flex items-center gap-3.5 rounded-xl p-3 transition-all hover:-translate-y-0.5 hover:border-[#31a8ff]/50 hover:bg-[#242429] ${PANEL}`}
              >
                <span
                  className={`flex shrink-0 items-center justify-center rounded-lg bg-[#31a8ff]/15 text-[#7dd3fc] ring-1 ring-inset ring-[#31a8ff]/25 ${
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

          {/* Check Out — artboard viewport */}
          <div>
            <div className="mb-5 flex items-baseline justify-between gap-3">
              <h2 className={`font-semibold ${isMobile ? "text-xl" : "text-2xl"}`}>
                Check Out
              </h2>
              <span className={`truncate font-mono text-[10px] ${MUTED}`}>
                Retouched Projects
              </span>
            </div>

            <div className="overflow-hidden rounded-xl border border-white/10 bg-[#111114] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              {/* Document bar */}
              <div className="flex items-center justify-between gap-3 border-b border-white/10 px-3 py-2">
                <span className="truncate font-mono text-[10px] text-white/55">
                  Portfolio_Master.psd @ 100% (RGB/8#)
                </span>
                <span className="shrink-0 font-mono text-[10px] text-white/35">1920 × 1080</span>
              </div>

              <div className="flex">
                {/* Left pixel ruler */}
                <div className="hidden w-4 shrink-0 flex-col items-center justify-between border-r border-white/10 bg-[#15151a] py-2 sm:flex">
                  {Array.from({ length: 22 }).map((_, index) => (
                    <span
                      key={index}
                      className={`h-px ${
                        index % 5 === 0 ? "w-2 bg-white/25" : "w-1 bg-white/10"
                      }`}
                    />
                  ))}
                </div>

                <div className="min-w-0 flex-1">
                  {/* Top pixel ruler */}
                  <div className="hidden h-4 items-end justify-between border-b border-white/10 bg-[#15151a] px-1 sm:flex">
                    {Array.from({ length: 40 }).map((_, index) => (
                      <span
                        key={index}
                        className={`w-px ${
                          index % 5 === 0 ? "h-2.5 bg-white/25" : "h-1.5 bg-white/10"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Pasteboard with existing GIF artboards */}
                  <div
                    className={`p-4 ${
                      isMobile ? "space-y-5" : "grid grid-cols-2 gap-5"
                    }`}
                  >
                    {PROJECTS.map((project) => (
                      <div
                        key={project.id}
                        onClick={() => setSelectedImage(project.media)}
                        className="group cursor-pointer overflow-hidden rounded-lg border border-white/10 bg-[#0d0d10] shadow-[0_10px_25px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#31a8ff]/50 hover:shadow-[0_20px_40px_rgba(49,168,255,0.18)]"
                      >
                        <div className="relative overflow-hidden bg-black">
                          <img
                            src={project.media}
                            alt={project.title}
                            className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                              isMobile ? "h-52" : "aspect-video"
                            }`}
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="mt-10">
            <h2 className="mb-4 text-xl font-semibold">Services</h2>

            <div className="flex flex-wrap gap-3">
              {SERVICES.map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 ring-1 ring-inset ring-white/5"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Image Preview */}
          {selectedImage && (
            <div
              className={`fixed inset-0 z-[9999] flex bg-black/70 backdrop-blur-md ${
                isMobile ? "items-center justify-center p-4" : "items-center justify-center"
              }`}
              onClick={() => setSelectedImage(null)}
            >
              <div
                className={`relative bg-black ${
                  isMobile
                    ? "w-[94vw] max-w-md rounded-3xl p-4"
                    : "w-full max-w-6xl rounded-2xl p-6"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                {!isMobile && (
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 transition-colors hover:bg-red-600"
                  >
                    ×
                  </button>
                )}

                <img
                  src={selectedImage}
                  alt="Preview"
                  className={`w-full object-contain ${
                    isMobile ? "rounded-2xl" : "max-h-[70vh] rounded-xl"
                  }`}
                />

                {!isMobile && (
                  <div className="mt-5 text-center">
                    <p className="text-zinc-400">Created using Adobe Photoshop</p>
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
