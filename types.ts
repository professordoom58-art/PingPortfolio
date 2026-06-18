export interface AppWindow {
  innerHeight: number;
  id: string
  title: string
  component: string
  position: { x: number; y: number }
  size: { width: number; height: number }
}
