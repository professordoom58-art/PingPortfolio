"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Clock,
  Cloud,
  Cpu,
  Eye,
  FolderOpen,
  GraduationCap,
  Home,
  LayoutTemplate,
  Lock,
  Mail,
  Plus,
  Video,
} from "lucide-react"
import IOSBackButton from "@/components/ios/ios-back-button"

interface PremiereProProps {
  isMobile?: boolean
  hideAdobeHeader?: boolean
  onBack?: () => void
}

const WORKSPACES = ["Home", "Edit", "Color", "Export"] as const

const NAV_ITEMS = [
  { label: "Home", icon: Home },
  { label: "Projects", icon: FolderOpen },
  { label: "Templates", icon: LayoutTemplate },
  { label: "Learn", icon: GraduationCap },
] as const

const SPECIALTIES = [
  { label: "Documentary", icon: Video },
  { label: "Explainers", icon: FolderOpen },
  { label: "Narrative", icon: Clock },
] as const

interface TimelineClip {
  label: string
  /** Percentage offset from the start of the sequence. */
  left: number
  /** Percentage width of the clip. */
  width: number
  /** The clip that carries the track's primary portfolio skill. */
  primary?: boolean
  audio?: boolean
}

interface TimelineTrack {
  id: string
  name: string
  clips: TimelineClip[]
}

/** Tracks in Premiere Pro stacking order: overlays above, audio below. */
const TIMELINE_TRACKS: TimelineTrack[] = [
  {
    id: "V2",
    name: "Motion Graphics",
    clips: [
      { label: "Intro Title", left: 4, width: 22 },
      { label: "Motion Graphics", left: 34, width: 38, primary: true },
      { label: "Lower Third", left: 80, width: 14 },
    ],
  },
  {
    id: "V1",
    name: "Narrative Cut",
    clips: [
      { label: "Hook", left: 0, width: 18 },
      { label: "Narrative Cut", left: 19, width: 46, primary: true },
      { label: "B-Roll", left: 66, width: 18 },
      { label: "Outro", left: 85, width: 11 },
    ],
  },
  {
    id: "A1",
    name: "Sound Design",
    clips: [
      { label: "Sound Design", left: 0, width: 52, primary: true, audio: true },
      { label: "SFX Riser", left: 55, width: 16, audio: true },
      { label: "Master Mix", left: 73, width: 25, audio: true },
    ],
  },
]

/** Deterministic waveform silhouette for the A1 audio clips. */
const WAVEFORM = [35, 62, 44, 78, 52, 90, 40, 68, 55, 82, 38, 60, 48, 74, 42, 66, 36, 58, 46, 72]

const TIMECODE_TICKS = ["00:00:00", "00:01:30", "00:03:00", "00:04:30"] as const

const SERVICES = [
  "Video Editing",
  "YouTube Videos",
  "Short Form",
  "Documentaries",
  "Explainers",
  "Motion Graphics",
  "Color Correction",
  "Sound Design",
] as const

/** Spectrum dark surface used for every elevated panel. */
const PANEL =
  "bg-[#1f1f23] border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"

const MUTED = "text-zinc-400"

function SpecialtyCard({
  label,
  icon: Icon,
  isMobile,
}: {
  label: string
  icon: typeof Video
  isMobile: boolean
}) {
  return (
    <div
      className="flex items-center gap-3.5 rounded-xl border border-white/10 bg-[#1f1f23] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-[#242429]"
    >
      <span
        className={`flex shrink-0 items-center justify-center rounded-lg bg-[#9333ea]/15 text-[#d8b4fe] ring-1 ring-inset ring-[#9333ea]/20 ${
          isMobile ? "h-9 w-9" : "h-11 w-11"
        }`}
      >
        <Icon size={isMobile ? 16 : 20} strokeWidth={2} />
      </span>

      <span className="min-w-0 flex-1">
        <span className={`block truncate font-semibold ${isMobile ? "text-[15px]" : "text-sm"}`}>
          {label}
        </span>
      </span>
    </div>
  )
}

function StatCard({
  value,
  label,
  isMobile,
  className = "",
}: {
  value: string
  label: string
  isMobile: boolean
  className?: string
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl p-6 text-center ${PANEL} ${className}`}
    >
      <h3 className={`font-bold text-purple-400 ${isMobile ? "text-3xl" : "text-4xl"}`}>{value}</h3>
      <p className={`mt-2 ${MUTED} ${isMobile ? "text-sm" : ""}`}>{label}</p>
    </div>
  )
}

export default function PremierePro({
  isMobile = false,
  hideAdobeHeader = false,
  onBack,
}: PremiereProProps) {
  const [activeNav, setActiveNav] = useState<string>("Home")
  const [activeWorkspace, setActiveWorkspace] = useState<string>("Home")

  const handleConnect = () => {
    window.location.href = "mailto:pingmihir@outlook.com?subject=Premiere Pro Inquiry"
  }

  return (
    <div
      className={`flex flex-col bg-[#141414] text-white ${
        isMobile ? "min-h-full" : "h-full"
      }`}
    >
      {/* Unified macOS toolbar (single header, no redundant app bar) */}
      {!hideAdobeHeader && (
        <div className="flex h-12 shrink-0 items-center gap-3 border-b border-white/10 bg-[#1f1f23]/90 px-4 backdrop-blur-md">
          <div className="flex min-w-0 flex-1 items-center gap-2.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#2b2b31] ring-1 ring-inset ring-white/10">
              <Image
                src="/premiere.png"
                alt="Premiere Pro"
                width={20}
                height={20}
                className="object-contain"
              />
            </span>
            <span className="truncate text-[13px] font-semibold tracking-tight">
              Adobe Premiere Pro
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
            <div className="p-3">
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[13px] font-medium text-white/85 transition-colors hover:bg-white/10"
              >
                <Plus className="h-4 w-4" />
                New Project
              </button>
            </div>

            <nav className="space-y-0.5 px-2">
              {NAV_ITEMS.map(({ label, icon: Icon }) => {
                const isActive = activeNav === label
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setActiveNav(label)}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-[13px] transition-colors ${
                      isActive
                        ? "bg-[#9333ea]/20 font-medium text-[#d8b4fe]"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
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
                  <Cloud className="h-3.5 w-3.5 shrink-0 text-[#d8b4fe]" />
                  Creative Cloud Synced
                </p>
                <p className="flex items-center gap-2 text-white/45">
                  <Cpu className="h-3.5 w-3.5 shrink-0" />
                  Metal GPU
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
              src="/premiere.png"
              alt="Premiere Pro"
              width={isMobile ? 56 : 64}
              height={isMobile ? 56 : 64}
            />

            <div className="min-w-0 flex-1">
              <h1 className={`font-bold ${isMobile ? "text-2xl" : "text-3xl"}`}>Premiere Pro</h1>
              <p className={MUTED}>Narrative • Long-Form • Explainer</p>
            </div>
          </div>

          {/* Specialties */}
          <div
            className={`mb-10 grid gap-3 ${
              isMobile ? "grid-cols-1" : "max-w-4xl grid-cols-3"
            }`}
          >
            {SPECIALTIES.map(({ label, icon }) => (
              <SpecialtyCard
                key={label}
                label={label}
                icon={icon}
                isMobile={isMobile}
              />
            ))}
          </div>

          {isMobile ? (
            /* ------------------------- Mobile dashboard ------------------------- */
            <div className="mt-10">
              <h2 className="mb-5 text-xl font-semibold">Editing Workspace</h2>

              <div className={`rounded-2xl p-5 ${PANEL}`}>
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${MUTED}`}>Current Project</p>
                    <h3 className="text-xl font-semibold">Documentary Edit</h3>
                  </div>

                  <div className="text-right">
                    <p className="text-3xl font-bold text-purple-400">92%</p>
                    <p className={`text-xs ${MUTED}`}>Complete</p>
                  </div>
                </div>

                {[
                  { label: "Narrative Cut", value: 92 },
                  { label: "Motion Graphics", value: 74 },
                  { label: "Sound Design", value: 100 },
                ].map((item) => (
                  <div key={item.label} className="mb-5">
                    <div className="mb-2 flex justify-between">
                      <span>{item.label}</span>
                      <span className={MUTED}>{item.value}%</span>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-black/60">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-700 via-fuchsia-500 to-violet-400"
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}

                <div className="mt-8 border-t border-white/10 pt-5">
                  <div className="flex justify-between">
                    <div>
                      <p className={`text-sm ${MUTED}`}>Export</p>
                      <p className="font-medium">H.264 • 4K</p>
                    </div>

                    <div className="text-right">
                      <p className={`text-sm ${MUTED}`}>ETA</p>
                      <p className="font-medium">37 min</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <StatCard value="1000+" label="Hours Edited" isMobile />
                <StatCard value="35+" label="Projects" isMobile />
                <StatCard value="4+" label="Years Learning" isMobile className="col-span-2" />
              </div>
            </div>
          ) : (
            /* ------------------------ Desktop workspace ------------------------- */
            <div className="mt-10">
              <h2 className="mb-5 text-xl font-semibold">Editing Workspace</h2>

              <div className={`mb-6 overflow-hidden rounded-xl ${PANEL}`}>
                {/* Sequence header */}
                <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3">
                  <h3 className="font-semibold text-lg">Editing Timeline</h3>
                  <span className={`flex items-center gap-2 text-sm ${MUTED}`}>
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#a855f7]" />
                    Creatively Processing...
                  </span>
                </div>

                {/* Timecode ruler */}
                <div className="border-b border-white/10 bg-black/25 px-4 py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-20 shrink-0 text-[10px] font-medium uppercase tracking-wider text-white/35">
                      Sequence 01
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between font-mono text-[10px] text-white/40">
                        {TIMECODE_TICKS.map((tick) => (
                          <span key={tick}>{tick}</span>
                        ))}
                      </div>
                      <div className="mt-1 flex items-end justify-between">
                        {Array.from({ length: 25 }).map((_, index) => (
                          <span
                            key={index}
                            className={`w-px ${
                              index % 8 === 0 ? "h-2 bg-white/30" : "h-1 bg-white/10"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="shrink-0 font-mono text-[11px] font-medium text-[#d8b4fe]">
                      00:03:42:18
                    </div>
                  </div>
                </div>

                {/* Tracks */}
                <div className="flex gap-3 px-4 py-3">
                  {/* Track headers */}
                  <div className="w-20 shrink-0 space-y-1.5">
                    {TIMELINE_TRACKS.map((track) => (
                      <div
                        key={track.id}
                        title={track.name}
                        className="flex h-10 items-center justify-between rounded-md border border-white/5 bg-black/25 px-2 text-[10px] text-white/50"
                      >
                        <span className="font-mono font-medium text-white/60">{track.id}</span>
                        <span className="flex items-center gap-1.5">
                          <Eye className="h-3 w-3 text-white/40" />
                          <Lock className="h-3 w-3 text-white/25" />
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Clips + playhead */}
                  <div className="relative min-w-0 flex-1 space-y-1.5">
                    {TIMELINE_TRACKS.map((track) => (
                      <div
                        key={track.id}
                        className="relative h-10 overflow-hidden rounded-md border border-white/5 bg-black/30"
                      >
                        {track.clips.map((clip) => (
                          <div
                            key={clip.label}
                            title={`${clip.label} — ${track.name}`}
                            className={`absolute inset-y-0 overflow-hidden rounded-[5px] border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] ${
                              clip.primary
                                ? "bg-gradient-to-r from-purple-700 via-fuchsia-500 to-violet-400"
                                : "bg-gradient-to-r from-[#4c1d95]/90 via-[#6d28d9]/80 to-[#7c3aed]/60"
                            }`}
                            style={{ left: `${clip.left}%`, width: `${clip.width}%` }}
                          >
                            <span className="absolute inset-x-0 top-0 h-1.5 bg-white/15" />
                            <span
                              className={`absolute inset-x-1.5 top-2 truncate ${
                                clip.primary
                                  ? "text-xs font-semibold text-white"
                                  : "text-[10px] font-medium text-white/75"
                              }`}
                            >
                              {clip.label}
                            </span>

                            {clip.audio && (
                              <span className="pointer-events-none absolute inset-x-1 bottom-1 flex h-3 items-end gap-px opacity-70">
                                {WAVEFORM.map((height, index) => (
                                  <span
                                    key={index}
                                    className="flex-1 rounded-sm bg-white/40"
                                    style={{ height: `${height}%` }}
                                  />
                                ))}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}

                    {/* Playhead */}
                    <div className="pointer-events-none absolute -top-2 bottom-0 left-[74%] z-10 w-px bg-[#e9d5ff] shadow-[0_0_10px_2px_rgba(192,132,252,0.55)]">
                      <span className="absolute -top-0.5 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 rounded-[2px] bg-[#e9d5ff] shadow-[0_0_8px_rgba(192,132,252,0.8)]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-5">
                <StatCard value="1000+" label="Hours Edited" isMobile={false} />
                <StatCard value="35+" label="Projects" isMobile={false} />
                <StatCard value="4+" label="Years Learning" isMobile={false} />
              </div>
            </div>
          )}

          {/* Services */}
          <div className="mt-10">
            <h2 className="mb-5 text-xl font-semibold">Services</h2>

            <div className={`flex flex-wrap ${isMobile ? "gap-2" : "gap-3"}`}>
              {SERVICES.map((service) => (
                <div
                  key={service}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 ring-1 ring-inset ring-white/5"
                >
                  {service}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
