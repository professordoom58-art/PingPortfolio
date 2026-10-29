// Shared geometry for desktop app windows.
//
// All window coordinates are viewport-relative (the windows layer is a
// full-screen `inset-0` container), so these helpers can work directly with
// window.innerWidth / window.innerHeight.

/** Height of the macOS menu bar (`h-6` in menubar.tsx). */
export const MENUBAR_HEIGHT = 24

/** Vertical space reserved for the dock at the bottom of the screen. */
export const DOCK_RESERVED = 88

/** Breathing room between a window edge and the screen edge. */
export const SCREEN_MARGIN = 20

/** Gap between the menu bar and a window's title bar. */
export const TOP_GAP = 8

/** Cascade step applied to each additional open window. */
export const CASCADE_STEP = 20

export const MIN_WINDOW_WIDTH = 320
export const MIN_WINDOW_HEIGHT = 240

export interface WindowGeometry {
  position: { x: number; y: number }
  size: { width: number; height: number }
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), Math.max(min, max))

/** The top-most y a window may occupy (just below the menu bar). */
export const getTopBound = () => MENUBAR_HEIGHT + TOP_GAP

/** The bottom-most y a window may reach (just above the dock). */
export const getBottomBound = () =>
  (typeof globalThis.window === "undefined" ? 900 : globalThis.window.innerHeight) -
  DOCK_RESERVED

/** Vertical space available to windows between the menu bar and the dock. */
export const getAvailableHeight = () => getBottomBound() - getTopBound()

/**
 * Default window size: spacious but always inside the usable desktop area.
 * Desktop target is min(850px, 85vw) x min(600px, 75vh).
 */
export const getDefaultSize = () => {
  if (typeof globalThis.window === "undefined") {
    return { width: 850, height: 600 }
  }

  const vw = globalThis.window.innerWidth
  const vh = globalThis.window.innerHeight
  const availableHeight = getAvailableHeight()

  const width = Math.round(
    clamp(Math.min(850, vw * 0.85), MIN_WINDOW_WIDTH, vw - SCREEN_MARGIN * 2),
  )
  const height = Math.round(
    clamp(
      Math.min(600, vh * 0.75),
      Math.min(MIN_WINDOW_HEIGHT, availableHeight),
      availableHeight,
    ),
  )

  return { width, height }
}

/**
 * Centered position for a window, with a cascade offset based on how many
 * windows are already open so stacked windows stay individually reachable.
 */
export const getCenteredPosition = (
  size: { width: number; height: number },
  openCount = 0,
) => {
  if (typeof globalThis.window === "undefined") {
    return { x: 20, y: 40 }
  }

  const vw = globalThis.window.innerWidth
  const topBound = getTopBound()
  const bottomBound = getBottomBound()

  const centeredX = (vw - size.width) / 2
  const centeredY = topBound + (getAvailableHeight() - size.height) / 2

  // Cascade each additional window down and to the right, then pull the whole
  // offset back so the last window in the stack still fits on screen.
  const maxCascadeX = Math.max(0, vw - SCREEN_MARGIN - (centeredX + size.width))
  const maxCascadeY = Math.max(0, bottomBound - (centeredY + size.height))
  const offset = Math.min(openCount * CASCADE_STEP, maxCascadeX, maxCascadeY)

  return {
    x: Math.round(clamp(centeredX + offset, SCREEN_MARGIN, vw - size.width - SCREEN_MARGIN)),
    y: Math.round(clamp(centeredY + offset, topBound, bottomBound - size.height)),
  }
}

/** Full default geometry for a newly opened window. */
export const getInitialGeometry = (openCount = 0): WindowGeometry => {
  const size = getDefaultSize()
  return { size, position: getCenteredPosition(size, openCount) }
}

/**
 * Keep a window's title bar below the menu bar and its body above the dock.
 * Allows a window to hang off the left/right edges slightly, but never so far
 * that the traffic lights become unreachable.
 */
export const clampPosition = (
  position: { x: number; y: number },
  size: { width: number; height: number },
) => {
  if (typeof globalThis.window === "undefined") return position

  const vw = globalThis.window.innerWidth
  const topBound = getTopBound()
  const bottomBound = getBottomBound()

  return {
    x: Math.round(clamp(position.x, -(size.width - 120), vw - 120)),
    y: Math.round(clamp(position.y, topBound, Math.max(topBound, bottomBound - 40))),
  }
}

/** Clamp a size so a window can never be larger than the usable desktop. */
export const clampSize = (
  size: { width: number; height: number },
  position: { x: number; y: number },
) => {
  if (typeof globalThis.window === "undefined") return size

  const vw = globalThis.window.innerWidth
  const availableHeight = getAvailableHeight()

  return {
    width: Math.round(
      clamp(size.width, MIN_WINDOW_WIDTH, Math.max(MIN_WINDOW_WIDTH, vw - position.x - SCREEN_MARGIN)),
    ),
    height: Math.round(
      clamp(size.height, MIN_WINDOW_HEIGHT, Math.max(MIN_WINDOW_HEIGHT, availableHeight)),
    ),
  }
}
