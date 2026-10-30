"use client"

import { useState, useEffect } from "react"
import {
  Wifi,
  WifiOff,
  Bluetooth,
  Radio,
  Moon,
  Sun,
  Volume1,
  Volume2,
  VolumeX,
  Rewind,
  Play,
  Pause,
  FastForward,
} from "lucide-react"
import { useMusic } from "@/components/music-provider"

/* ------------------------------------------------------------------ */
/* Custom icons (not available in this lucide-react version)           */
/* ------------------------------------------------------------------ */

function AirPlayIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" />
      <path d="m12 15 5 6H7l5-6Z" fill="currentColor" stroke="none" />
    </svg>
  )
}

function StageManagerIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="9" y="4" width="12" height="16" rx="2.5" />
      <path d="M9 8H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h3" />
      <circle cx="4.6" cy="10.5" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="4.6" cy="13.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

function ScreenMirroringIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="4" width="13" height="10" rx="2" />
      <path d="M6 18h5" />
      <rect x="17" y="9" width="5" height="11" rx="1.6" fill="currentColor" fillOpacity="0.25" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Apple-style glass slider                                            */
/* ------------------------------------------------------------------ */

interface GlassSliderProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  label: string
}

function GlassSlider({ value, onChange, min = 0, max = 100, label }: GlassSliderProps) {
  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100))

  return (
    <div className="relative flex h-4 flex-1 items-center">
      <div className="pointer-events-none absolute inset-x-0 h-1.5 rounded-full bg-black/25" />
      <div
        className="pointer-events-none absolute left-0 h-1.5 rounded-full bg-white"
        style={{ width: `${pct}%` }}
      />
      <div
        className="pointer-events-none absolute h-4 w-4 -translate-x-1/2 rounded-full bg-white shadow-md"
        style={{ left: `${pct}%` }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        aria-label={label}
        onChange={(e) => onChange(Number(e.target.value))}
        className="relative z-10 h-4 w-full cursor-pointer appearance-none bg-transparent
          [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-transparent
          [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-transparent"
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Control Center                                                      */
/* ------------------------------------------------------------------ */

interface ControlCenterProps {
  onClose: () => void
  brightness: number
  onBrightnessChange: (value: number) => void
  /** Bring the Spotify window to the front (and close the Control Center). */
  onOpenSpotify: () => void
  wifiEnabled: boolean
  onWifiEnabledChange: (value: boolean) => void
  wifiNetwork: string
}

/** macOS system blue used for every active (ON) icon. */
const ACTIVE_ICON = "text-[#007AFF]"
const INACTIVE_ICON = "text-white"

/** Shared frosted-glass surface: crisp 1px border + inner specular highlight. */
const glass =
  "border border-white/25 bg-white/15 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.3)]"

/** Circular button shell. Colour is decided by the caller, never hardcoded. */
const circleBase =
  "flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-full transition-all active:scale-95"

/** Active surface: solid white so the blue icon reads clearly. */
const circleOn = "border border-white bg-white shadow-md"
/** Inactive surface: frosted glass with a white icon. */
const circleOff = "border border-white/25 bg-white/15 backdrop-blur-2xl hover:bg-white/25"

export default function ControlCenter({
  brightness,
  onBrightnessChange,
  onOpenSpotify,
  wifiEnabled,
  onWifiEnabledChange,
  wifiNetwork,
}: ControlCenterProps) {
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true)
  const [airdropEnabled, setAirdropEnabled] = useState(false)
  const [focusEnabled, setFocusEnabled] = useState(false)
  const [stageManagerEnabled, setStageManagerEnabled] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Shared with the Spotify app window.
  const {
    currentTrack,
    isPlaying,
    volume,
    togglePlay,
    nextTrack,
    prevTrack,
    setVolume,
  } = useMusic()

  useEffect(() => {
    setIsFullscreen(!!document.fullscreenElement)

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }

  return (
    <div
      className="fixed right-4 top-10 z-40 w-[308px] origin-top-right animate-in fade-in zoom-in-95 duration-200"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="grid w-[308px] auto-rows-[68px] grid-cols-4 gap-3">
        {/* ---------- Wi-Fi pill (rows 1, cols 1-2) ---------- */}
        <button
          type="button"
          onClick={() => onWifiEnabledChange(!wifiEnabled)}
          aria-pressed={wifiEnabled}
          className={`col-span-2 flex h-[68px] cursor-pointer items-center gap-3 rounded-full px-2.5 text-left transition-all ${glass}`}
        >
          <span
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors ${
              wifiEnabled ? "bg-white" : "bg-white/10"
            }`}
          >
            {wifiEnabled ? (
              <Wifi className={`h-[18px] w-[18px] ${ACTIVE_ICON}`} strokeWidth={2.4} />
            ) : (
              <WifiOff className={`h-[18px] w-[18px] ${INACTIVE_ICON}`} strokeWidth={2.4} />
            )}
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold leading-tight text-white">Wi-Fi</span>
            <span className="block truncate text-xs text-white/75">
              {wifiEnabled ? wifiNetwork : "Off"}
            </span>
          </span>
        </button>

        {/* ---------- Media card (rows 1-2, cols 3-4) ---------- */}
        <div
          className={`col-span-2 row-span-2 flex h-[148px] flex-col justify-between rounded-[28px] p-3.5 ${glass}`}
        >
          {/* Album art + title open the Spotify window */}
          <button
            type="button"
            onClick={onOpenSpotify}
            aria-label="Open Spotify"
            className="min-w-0 text-left transition active:scale-[0.98]"
          >
            <img
              src={currentTrack.cover}
              alt={`${currentTrack.title} cover`}
              className="h-11 w-11 rounded-xl object-cover shadow-md"
            />
            <p className="mt-1 truncate text-sm font-bold text-white">{currentTrack.title}</p>
            <p className="truncate text-[11px] text-white/75">{currentTrack.artist}</p>
          </button>

          <div className="flex items-center justify-around pt-1 text-white">
            <button
              type="button"
              aria-label="Previous track"
              onClick={prevTrack}
              className="transition active:scale-90"
            >
              <Rewind className="h-4 w-4 fill-current" />
            </button>
            <button
              type="button"
              aria-label={isPlaying ? "Pause" : "Play"}
              onClick={togglePlay}
              className="transition active:scale-90"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 fill-current" />
              ) : (
                <Play className="h-5 w-5 fill-current" />
              )}
            </button>
            <button
              type="button"
              aria-label="Next track"
              onClick={nextTrack}
              className="transition active:scale-90"
            >
              <FastForward className="h-4 w-4 fill-current" />
            </button>
          </div>
        </div>

        {/* ---------- Bluetooth (row 2, col 1) ---------- */}
        <button
          type="button"
          onClick={() => setBluetoothEnabled((prev) => !prev)}
          aria-pressed={bluetoothEnabled}
          aria-label="Bluetooth"
          className={`col-span-1 ${circleBase} ${bluetoothEnabled ? circleOn : circleOff}`}
        >
          <Bluetooth
            className={`h-5 w-5 ${bluetoothEnabled ? ACTIVE_ICON : INACTIVE_ICON}`}
            strokeWidth={2.2}
          />
        </button>

        {/* ---------- AirDrop (row 2, col 2) ---------- */}
        <button
          type="button"
          onClick={() => setAirdropEnabled((prev) => !prev)}
          aria-pressed={airdropEnabled}
          aria-label="AirDrop"
          className={`col-span-1 ${circleBase} ${airdropEnabled ? circleOn : circleOff}`}
        >
          <Radio
            className={`h-5 w-5 ${airdropEnabled ? ACTIVE_ICON : INACTIVE_ICON}`}
            strokeWidth={2.2}
          />
        </button>

        {/* ---------- Focus pill (row 3, cols 1-2) ---------- */}
        <button
          type="button"
          onClick={() => setFocusEnabled((prev) => !prev)}
          aria-pressed={focusEnabled}
          className={`col-span-2 flex h-[68px] cursor-pointer items-center gap-3 rounded-full px-2.5 text-left transition-all ${glass}`}
        >
          <span
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors ${
              focusEnabled ? "bg-white" : "bg-white/15"
            }`}
          >
            <Moon
              className={
                focusEnabled
                  ? `h-5 w-5 fill-[#007AFF] ${ACTIVE_ICON}`
                  : "h-5 w-5 fill-white text-white"
              }
            />
          </span>
          <span className="text-sm font-semibold text-white">Focus</span>
        </button>

        {/* ---------- Stage Manager (row 3, col 3) ---------- */}
        <button
          type="button"
          onClick={() => setStageManagerEnabled((prev) => !prev)}
          aria-pressed={stageManagerEnabled}
          aria-label="Stage Manager"
          className={`col-span-1 ${circleBase} ${stageManagerEnabled ? circleOn : circleOff}`}
        >
          <StageManagerIcon
            className={`h-5 w-5 ${stageManagerEnabled ? ACTIVE_ICON : INACTIVE_ICON}`}
          />
        </button>

        {/* ---------- Screen Mirroring / Fullscreen (row 3, col 4) ---------- */}
        <button
          type="button"
          onClick={toggleFullscreen}
          aria-pressed={isFullscreen}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          className={`col-span-1 ${circleBase} ${isFullscreen ? circleOn : circleOff}`}
        >
          <ScreenMirroringIcon
            className={`h-5 w-5 ${isFullscreen ? ACTIVE_ICON : INACTIVE_ICON}`}
          />
        </button>

        {/* ---------- Display brightness (row 4) ---------- */}
        <div className={`col-span-4 rounded-[24px] px-4 py-3 ${glass}`}>
          <p className="mb-2 text-xs font-semibold text-white">Display</p>
          <div className="flex items-center gap-3">
            <Sun className="h-3.5 w-3.5 shrink-0 text-white/80" />
            <GlassSlider
              value={brightness}
              min={10}
              max={100}
              onChange={onBrightnessChange}
              label="Display brightness"
            />
            <Sun className="h-4 w-4 shrink-0 text-white/80" />
          </div>
        </div>

        {/* ---------- Sound (row 5) ---------- */}
        <div className={`col-span-4 rounded-[24px] px-4 py-3 ${glass}`}>
          <p className="mb-2 text-xs font-semibold text-white">Sound</p>
          <div className="flex items-center gap-2.5">
            {volume === 0 ? (
              <VolumeX className="h-4 w-4 shrink-0 text-white/80" />
            ) : (
              <Volume1 className="h-4 w-4 shrink-0 text-white/80" />
            )}
            <GlassSlider
              value={Math.round(volume * 100)}
              min={0}
              max={100}
              onChange={(next) => setVolume(next / 100)}
              label="Volume"
            />
            <Volume2 className="h-4 w-4 shrink-0 text-white/80" />
            <button
              type="button"
              aria-label="AirPlay"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/15 text-white transition hover:bg-white/25"
            >
              <AirPlayIcon className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
