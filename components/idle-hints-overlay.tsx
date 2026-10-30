"use client"

import { useEffect, useState } from "react"
import { Caveat } from "next/font/google"

// KILLSWITCH: Set to false (or delete <IdleHintsOverlay/>) to completely disable idle hints
export const ENABLE_IDLE_HINTS = true

/** How long the desktop must sit untouched before the hints appear. */
const IDLE_DELAY = 3000

const handwritten = Caveat({ subsets: ["latin"], weight: ["400", "600"], display: "swap" })

interface IdleHintsOverlayProps {
  /** False while the desktop is covered (app window, Launchpad, Spotlight, etc.). */
  enabled: boolean
}

const ACTIVITY_EVENTS = ["mousemove", "mousedown", "keydown", "touchstart", "wheel"] as const

/* -------------------------------------------------------------------------- *
 * Dock geometry - mirrors components/dock.tsx so every arrow lands dead centre
 * on the right icon at any viewport width (the dock is centred and fixed).
 *
 *   dock   = fixed bottom-2 (8px) / h-16 (64px) / px-3 (12px) / border (1px)
 *   cell   = w-12 icon (48px) + px-2 * 2 (16px)                  -> 64px per icon
 *   width  = 10 cells (640px) + px-3 * 2 (24px) + border * 2 (2px) -> 666px
 *
 *   icon i centre, measured from the viewport centre:
 *     border + paddingX + cell * i + cell / 2 - width / 2
 * -------------------------------------------------------------------------- */
const DOCK_BOTTOM = 8
const DOCK_HEIGHT = 64
const DOCK_PADDING_X = 12
const DOCK_BORDER = 1
const DOCK_CELL = 64
const DOCK_ICONS = 10
const DOCK_WIDTH = DOCK_PADDING_X * 2 + DOCK_BORDER * 2 + DOCK_CELL * DOCK_ICONS // 666

/** Top edge of the dock container, measured from the viewport bottom. */
const DOCK_TOP = DOCK_BOTTOM + DOCK_HEIGHT // 72

/** Every arrow tip sits here: 12px above the dock's top border. */
const TIP_Y = DOCK_TOP + 12 // 84

/** Dock order: Launchpad 0 / Mail 1 / Notes 2 / Premiere 3 / Ae 4 / Ps 5 / Ai 6 / Terminal 7 / YouTube 8 / Spotify 9 */
const iconCenterX = (index: number) =>
  DOCK_BORDER + DOCK_PADDING_X + DOCK_CELL * index + DOCK_CELL / 2 - DOCK_WIDTH / 2

/* Hand-drawn chalk stroke, shared by the squiggle and the arrowhead. */
const ARROW = {
  fill: "none",
  stroke: "rgba(255, 255, 255, 0.85)",
  strokeWidth: 2.2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const

/**
 * Each squiggle is a chain of cubic Beziers whose anchors share a tangent
 * (C1 continuous, so there are no kinks). The final segment always ends with
 *   c2 = (tipX, tipY - 25)
 * so the curve arrives on a perfectly vertical tangent, straight into the
 * vertex of the open "V" arrowhead drawn at the very same (tipX, tipY).
 */
const HINTS = [
  {
    id: "mail",
    label: "email me!",
    /** Icon 1 -> Mail. Centre offset from the viewport centre: -224px. */
    centerX: iconCenterX(1),
    tilt: -2,
    // Puts the label's centre exactly on the squiggle's start x (114 - 280/2).
    labelShift: -26,
    svg: { w: 280, h: 132 },
    // starts under the middle of "email me!" (x = 114) -> loops left -> wave right ->
    // wave left -> sweeps right -> vertical drop into (140, 132)
    d: "M 114 8 C 101.15 14.28, 70.86 19.58, 78 32 C 84.8 43.84, 116.8 46.16, 110 58 C 104.63 67.35, 83.17 72.44, 88 82 C 98.71 103.19, 140 107, 140 132",
    head: "M 133 123 L 140 132 L 147 123",
  },
  {
    id: "aftereffects",
    label: "check out my skills",
    /** Icon 4 -> After Effects. Centre offset from the viewport centre: -32px. */
    centerX: iconCenterX(4),
    tilt: -3,
    // Puts the label's centre exactly on the squiggle's start x (88 - 300/2).
    labelShift: -62,
    svg: { w: 300, h: 132 },
    // starts under the middle of "check out my skills" (x = 88) -> 2-wave cascade
    // down and to the right -> vertical drop into (150, 132)
    d: "M 88 8 C 104.47 16.05, 147.15 16.08, 138 32 C 130.4 45.22, 92.4 44.78, 100 58 C 108.17 72.22, 128.65 77.46, 136 92 C 142.29 104.45, 150 107, 150 132",
    head: "M 143 123 L 150 132 L 157 123",
  },
  {
    id: "spotify",
    label: "listen to some music",
    /** Icon 9 -> Spotify. Centre offset from the viewport centre: +288px. */
    centerX: iconCenterX(9),
    tilt: 3,
    // Puts the label's centre exactly on the squiggle's start x (92 - 300/2).
    labelShift: -58,
    svg: { w: 300, h: 132 },
    // starts under the middle of "listen to some music" (x = 92) -> rhythmic cascade
    // down and to the right -> vertical drop into (150, 132)
    d: "M 92 8 C 107.68 15.67, 147.84 14.49, 140 30 C 133.16 43.52, 94.4 42.78, 102 56 C 110.17 70.22, 130.65 75.46, 138 90 C 144.49 102.83, 150 107, 150 132",
    head: "M 143 123 L 150 132 L 157 123",
  },
] as const

export default function IdleHintsOverlay({ enabled }: IdleHintsOverlayProps) {
  const [idle, setIdle] = useState(false)

  useEffect(() => {
    if (!enabled) {
      setIdle(false)
      return
    }

    let timer: ReturnType<typeof setTimeout>
    const reset = () => {
      setIdle(false)
      clearTimeout(timer)
      timer = setTimeout(() => setIdle(true), IDLE_DELAY)
    }

    ACTIVITY_EVENTS.forEach((event) => window.addEventListener(event, reset, { passive: true }))
    reset()

    return () => {
      ACTIVITY_EVENTS.forEach((event) => window.removeEventListener(event, reset))
      clearTimeout(timer)
    }
  }, [enabled])

  if (!ENABLE_IDLE_HINTS) return null

  const visible = enabled && idle
  const labelClass = `${handwritten.className} whitespace-nowrap text-xl text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] select-none sm:text-2xl`

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-30 hidden select-none transition-opacity duration-500 xl:block ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {HINTS.map((hint) => (
        <div
          key={hint.id}
          className="fixed flex -translate-x-1/2 flex-col items-center"
          style={{ left: `calc(50% + ${hint.centerX}px)`, bottom: TIP_Y }}
        >
          <span
            className={labelClass}
            style={{ transform: `translateX(${hint.labelShift}px) rotate(${hint.tilt}deg)` }}
          >
            {hint.label}
          </span>

          {/*
            The SVG's bottom edge IS the arrow tip (viewBox height === tip y), so
            pinning the wrapper to `bottom: TIP_Y` puts the tip exactly 12px above
            the dock's top border. `overflow-visible` keeps the 2.2px stroke from
            being clipped at the viewBox edge.
          */}
          <svg
            className="mt-1 overflow-visible"
            width={hint.svg.w}
            height={hint.svg.h}
            viewBox={`0 0 ${hint.svg.w} ${hint.svg.h}`}
            fill="none"
            aria-hidden="true"
          >
            <path d={hint.d} {...ARROW} />
            <path d={hint.head} {...ARROW} />
          </svg>
        </div>
      ))}
    </div>
  )
}
