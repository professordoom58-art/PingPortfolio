export interface AppWindow {
  id: string
  title: string
  component: string

  /** Viewport-relative position. Recomputed on mount by the Window component. */
  position: {
    x: number
    y: number
  }

  size: {
    width: number
    height: number
  }

  innerHeight: number

  /** How many windows were already open when this one launched (cascade offset). */
  cascadeIndex?: number
}
