"use client"

import { useEffect } from "react"

interface AboutThisMacProps {
  onClose: () => void
  /** Closes the panel and opens the main portfolio / skills window. */
  onMoreInfo?: () => void
}

const SPECS = [
  { label: "Chip", value: "Apple M4 Max" },
  { label: "Memory", value: "64 GB" },
  { label: "Creator", value: "Mihir Suthar" },
  { label: "Role", value: "Motion & Video Editor" },
  { label: "macOS", value: "Tahoe 26.0" },
]

export default function AboutThisMac({ onClose, onMoreInfo }: AboutThisMacProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[1500] flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative flex w-[280px] origin-center animate-in select-none flex-col items-center rounded-[18px] border border-white/15 bg-[#28282d]/85 px-6 pb-5 pt-3 text-center shadow-[0_25px_70px_rgba(0,0,0,0.65),inset_0_1px_0.5px_rgba(255,255,255,0.2)] backdrop-blur-3xl duration-150 fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Traffic lights */}
        <div className="absolute left-3.5 top-3.5 flex items-center gap-2">
          <button
            aria-label="Close"
            onClick={onClose}
            className="h-3 w-3 cursor-pointer rounded-full border border-[#E0443E] bg-[#FF5F56] hover:brightness-90"
          />
          <span className="h-3 w-3 rounded-full bg-white/15" />
          <span className="h-3 w-3 rounded-full bg-white/15" />
        </div>

        {/* MacBook Pro illustration */}
        <div className="mb-3 mt-6 flex flex-col items-center">
          <div className="relative flex h-16 w-28 items-center justify-center rounded-t-md border-[2.5px] border-neutral-400 bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-950 shadow-inner">
            <div className="absolute left-1/2 top-0 h-1 w-4 -translate-x-1/2 rounded-b-sm bg-black" />
            <div className="h-10 w-[88px] rounded-sm bg-gradient-to-br from-indigo-500/25 via-purple-500/20 to-slate-900/40" />
          </div>
          <div className="h-1.5 w-32 rounded-b-md bg-gradient-to-r from-neutral-400 via-neutral-200 to-neutral-400 shadow-md" />
        </div>

        {/* Name */}
        <div className="mb-4">
          <h2 className="text-[20px] font-bold leading-tight tracking-tight text-white">MacBook Pro</h2>
          <p className="mt-0.5 text-[11px] font-normal text-white/50">16-inch, 2026</p>
        </div>

        {/* Specs */}
        <div className="mb-5 flex w-full flex-col gap-1.5 text-[11.5px] leading-snug">
          {SPECS.map(({ label, value }) => (
            <div key={label} className="grid grid-cols-[85px_1fr] items-baseline gap-2.5">
              <span className="text-right font-normal text-white/55">{label}</span>
              <span className="text-left font-medium text-white/95">{value}</span>
            </div>
          ))}
        </div>

        {/* More info */}
        <button
          onClick={() => {
            onMoreInfo?.()
            onClose()
          }}
          className="rounded-[6px] border border-white/10 bg-white/15 px-3.5 py-1 text-[12px] font-medium text-white shadow-sm transition-colors hover:bg-white/25 active:bg-white/30"
        >
          More Info...
        </button>

        {/* Legal */}
        <p className="mt-4 text-[9.5px] leading-tight text-white/30">
          ™ and © 1983–2026 Apple Inc.
          <br />
          All Rights Reserved.
        </p>
      </div>
    </div>
  )
}
