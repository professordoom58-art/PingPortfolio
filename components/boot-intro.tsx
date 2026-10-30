"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

/*
 * 1s fade in -> 3s hold -> 1s glide into the top-left corner.
 * It is never faded out and never unmounted: after the glide it stays docked as a
 * permanent watermark on the desktop layer.
 */
const FADE_IN_MS = 1000
const HOLD_MS = 3000
const MOVE_MS = 1000

/**
 * Intro band, measured against the desktop chrome:
 *  - profile card: `absolute top-10` (40px) + `min-h-[215px]` -> bottom edge at 255px
 *  - dock: `fixed bottom-2` (8px) + `h-16` (64px)             -> top edge at 72px from the bottom
 * The lockup starts optically centred in that gap, so it stays centred at any viewport
 * height (≈58% of the viewport at 1080p, ≈60% at 900px).
 */
const BAND_TOP = 40 + 215 // 255px
const BAND_BOTTOM = 8 + 64 // 72px
const BAND_CENTRE = `calc(${BAND_TOP}px + (100vh - ${BAND_TOP + BAND_BOTTOM}px) / 2)`

/**
 * Docked watermark: `top-11` (44px) clears the `h-7` (28px) menu bar by 16px, `left-5`
 * (20px) matches the menu bar's left padding, and 0.45 keeps it clear of the centred
 * profile card at every desktop width.
 */
const DOCKED_LEFT = 20
const DOCKED_TOP = 44
const DOCKED_SCALE = 0.45

/** Width of the lockup while centred - the profile card's max-w-md (448) minus px-4. */
const INTRO_WIDTH = 416

interface BootIntroProps {
  /** Fired once the lockup has docked, so the desktop can stop holding back its hints. */
  onComplete?: () => void
}

export default function BootIntro({ onComplete }: BootIntroProps) {
  const [visible, setVisible] = useState(false)
  const [docked, setDocked] = useState(false)

  // Keeps the one-shot effect below from re-running when the parent passes a new closure.
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    // `useEffect` runs after the first paint, so opacity:0 is already on screen;
    // the rAF just guarantees the browser has a start value to transition from.
    const frame = requestAnimationFrame(() => setVisible(true))
    const dockAt = setTimeout(() => setDocked(true), FADE_IN_MS + HOLD_MS)
    const doneAt = setTimeout(() => onCompleteRef.current?.(), FADE_IN_MS + HOLD_MS + MOVE_MS)

    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(dockAt)
      clearTimeout(doneAt)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed z-10 select-none"
      style={{
        width: INTRO_WIDTH,
        // `origin-top-left` means the lockup shrinks towards the corner it is heading to,
        // so the glide and the scale-down read as one movement.
        transformOrigin: "top left",
        // Declared inline rather than with `ease-[cubic-bezier(...)]`: the arbitrary
        // utility loses the cascade against `transition-all`'s default timing function.
        transitionProperty: "opacity, left, top, transform",
        transitionDuration: `${MOVE_MS}ms`,
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        opacity: visible ? 1 : 0,
        ...(docked
          ? { left: DOCKED_LEFT, top: DOCKED_TOP, transform: `translate(0, 0) scale(${DOCKED_SCALE})` }
          : { left: "50%", top: BAND_CENTRE, transform: "translate(-50%, -50%) scale(1)" }),
      }}
    >
      <Image
        src="/intro.png"
        alt=""
        width={1068}
        height={383}
        priority
        draggable={false}
        className="h-auto w-full object-contain drop-shadow-2xl"
      />
    </div>
  )
}
