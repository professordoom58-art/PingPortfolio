"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Dock from "@/components/dock"
import Menubar from "@/components/menubar"
import Wallpaper from "@/components/wallpaper"
import BootIntro from "@/components/boot-intro"
import Window from "@/components/window"
import Launchpad from "@/components/launchpad"
import ControlCenter from "@/components/control-center"
import Spotlight from "@/components/spotlight"
import AboutThisMac from "@/components/about-this-mac"
import SiriAssistant from "@/components/siri-assistant"
import IdleHintsOverlay, { ENABLE_IDLE_HINTS } from "@/components/idle-hints-overlay"
import { MusicProvider } from "@/components/music-provider"
import type { AppWindow } from "@/types"
import { IOSProfileWidget } from "@/components/ios/ios-profile-widget";

interface DesktopProps {
  onSleep: () => void
  onShutdown: () => void
  onRestart: () => void
  initialBrightness: number
  onBrightnessChange: (value: number) => void
}

export default function Desktop({
  onSleep,
  onShutdown,
  onRestart,
  initialBrightness,
  onBrightnessChange,
}: DesktopProps) {
  const [time, setTime] = useState(new Date())
  const [openWindows, setOpenWindows] = useState<AppWindow[]>([])
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null)
  const [showLaunchpad, setShowLaunchpad] = useState(false)
  const [showControlCenter, setShowControlCenter] = useState(false)
  const [showSpotlight, setShowSpotlight] = useState(false)
  // True until the boot intro has docked in the top-left; idle hints wait for it.
  const [introActive, setIntroActive] = useState(true)
  const [screenBrightness, setScreenBrightness] = useState(initialBrightness)
  const [wifiEnabled, setWifiEnabled] = useState(true)
  const [wifiNetwork, setWifiNetwork] = useState("Home")
  const [showAbout, setShowAbout] = useState(false)
  // Apple Intelligence opens with the desktop on first load; it can be
  // dismissed via click-outside, Escape, or the menu-bar orb.
  const [showSiri, setShowSiri] = useState(true)
  const desktopRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    // No default app opening to avoid duplicate key issues

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    setScreenBrightness(initialBrightness)
  }, [initialBrightness])

  // Wi-Fi state is shared by the menu bar popover and the Control Center.
  useEffect(() => {
    const savedWifi = localStorage.getItem("wifiEnabled")
    if (savedWifi !== null) setWifiEnabled(savedWifi === "true")

    const savedNetwork = localStorage.getItem("wifiNetwork")
    if (savedNetwork) setWifiNetwork(savedNetwork)
  }, [])

  const updateWifiEnabled = (value: boolean) => {
    setWifiEnabled(value)
    localStorage.setItem("wifiEnabled", value.toString())
  }

  const updateWifiNetwork = (name: string) => {
    setWifiNetwork(name)
    localStorage.setItem("wifiNetwork", name)
  }

  const openApp = (app: AppWindow) => {
    // Check if app is already open
    const isOpen = openWindows.some((window) => window.id === app.id)

    if (!isOpen) {
      // Record how many windows were already open so the new one can cascade.
      setOpenWindows((prev) => [...prev, { ...app, cascadeIndex: prev.length }])
    }

    // Set as active window
    setActiveWindowId(app.id)

    // Close launchpad if open
    if (showLaunchpad) {
      setShowLaunchpad(false)
    }
  }

  const closeWindow = (id: string) => {
    setOpenWindows((prev) => prev.filter((window) => window.id !== id))

    // If we closed the active window, set the last window as active
    if (activeWindowId === id && openWindows.length > 1) {
      const remainingWindows = openWindows.filter((window) => window.id !== id)
      setActiveWindowId(remainingWindows[remainingWindows.length - 1].id)
    } else if (openWindows.length <= 1) {
      setActiveWindowId(null)
    }
  }

  const setActiveWindow = (id: string) => {
    setActiveWindowId(id)
  }

  const toggleLaunchpad = () => {
    setShowLaunchpad(!showLaunchpad)
    if (showControlCenter) setShowControlCenter(false)
    if (showSpotlight) setShowSpotlight(false)
  }

  const toggleControlCenter = () => {
    setShowControlCenter(!showControlCenter)
    if (showSpotlight) setShowSpotlight(false)
  }

  const toggleSpotlight = () => {
    setShowSpotlight(!showSpotlight)
    if (showControlCenter) setShowControlCenter(false)
  }

  // Cmd+K / Ctrl+K toggles Spotlight, matching macOS.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setShowSpotlight((prev) => !prev)
        setShowControlCenter(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const updateBrightness = (value: number) => {
    setScreenBrightness(value)
    onBrightnessChange(value)
  }

  // Used by the Control Center media card: focus (or open) Spotify, then dismiss.
  const openSpotifyFromControlCenter = () => {
    openApp({
      id: "spotify",
      title: "Spotify",
      component: "Spotify",
      position: { x: 0, y: 0 },
      size: { width: 850, height: 600 },
      innerHeight: typeof window !== "undefined" ? window.innerHeight : 600,
    })
    setShowControlCenter(false)
  }

  /** Open (or focus) an app by id, used by the Apple menu and the assistant. */
  const openAppById = (id: string, title: string, component: string) => {
    openApp({
      id,
      title,
      component,
      position: { x: 0, y: 0 },
      size: { width: 850, height: 600 },
      innerHeight: typeof window !== "undefined" ? window.innerHeight : 600,
    })
  }

  const handleDesktopClick = (e: React.MouseEvent) => {    // Only handle clicks directly on the desktop, not on children
    if (e.target === desktopRef.current) {
      setActiveWindowId(null)
      if (showControlCenter) setShowControlCenter(false)
      if (showSpotlight) setShowSpotlight(false)
    }
  }

  return (
    <MusicProvider>
      <div className="relative">
      <div
        ref={desktopRef}
        className="dark relative h-screen w-screen overflow-hidden"
        onClick={handleDesktopClick}
      >
        <Wallpaper />

        {/* Startup intro: fades in centred, then glides to the top-left and stays there */}
        <BootIntro onComplete={() => setIntroActive(false)} />

        <Menubar
          time={time}
          onSleep={onSleep}
          onShutdown={onShutdown}
          onRestart={onRestart}
          onSpotlightClick={toggleSpotlight}
          onControlCenterClick={toggleControlCenter}
          isControlCenterOpen={showControlCenter}
          wifiEnabled={wifiEnabled}
          onWifiEnabledChange={updateWifiEnabled}
          wifiNetwork={wifiNetwork}
          onWifiNetworkChange={updateWifiNetwork}
          onWifiPopoverOpen={() => {
            setShowControlCenter(false)
            setShowSpotlight(false)
            setShowSiri(false)
          }}
          onAboutThisMac={() => setShowAbout(true)}
          onSystemSettings={() => setShowControlCenter(true)}
          onAppStore={() => openAppById("launchpad", "Launchpad", "Launchpad")}
          onForceQuit={() => setShowSpotlight(true)}
          onLockScreen={() => onSleep()}
          onSiriClick={() => {
            setShowSiri((prev) => !prev)
            setShowControlCenter(false)
            setShowSpotlight(false)
          }}
          isSiriOpen={showSiri}
          activeWindow={activeWindowId ? openWindows.find((w) => w.id === activeWindowId) || null : null}
        />

        {/* Desktop Widget - stays in the background desktop layer, links stay clickable */}
        <div className="absolute left-1/2 top-10 z-10 -translate-x-1/2">
          <IOSProfileWidget desktop />
        </div>

        {/* Windows layer - above desktop widgets, below the dock and menu bar */}
        <div className="pointer-events-none absolute inset-0 z-20">
          {openWindows.map((window, index) => (
            <Window
              key={window.id}
              window={window}
              isActive={activeWindowId === window.id}
              zIndex={10 + index}
              onClose={() => closeWindow(window.id)}
              onFocus={() => setActiveWindow(window.id)}
            />
          ))}
        </div>

        {/* Launchpad */}
        {showLaunchpad && <Launchpad onAppClick={openApp} onClose={() => setShowLaunchpad(false)} />}

        {/* Control Center */}
        {showControlCenter && (
          <ControlCenter
            onClose={() => setShowControlCenter(false)}
            brightness={screenBrightness}
            onBrightnessChange={updateBrightness}
            onOpenSpotify={openSpotifyFromControlCenter}
            wifiEnabled={wifiEnabled}
            onWifiEnabledChange={updateWifiEnabled}
            wifiNetwork={wifiNetwork}
          />
        )}

        {/* Spotlight */}
        {showSpotlight && (
          <Spotlight
            onClose={() => setShowSpotlight(false)}
            onAppClick={openApp}
            onOpenLaunchpad={() => setShowLaunchpad(true)}
            onOpenControlCenter={() => setShowControlCenter(true)}
            onSleep={onSleep}
            onRestart={onRestart}
            onShutdown={onShutdown}
          />
        )}

        <Dock
          onAppClick={openApp}
          onLaunchpadClick={toggleLaunchpad}
          activeAppIds={openWindows.map((w) => w.id)}
        />

        {/* About This Mac modal */}
        {showAbout && (
          <AboutThisMac
            onClose={() => setShowAbout(false)}
            onMoreInfo={() => openAppById("notes", "Notes", "Notes")}
          />
        )}

        {/* Idle handwritten hints — disabled by ENABLE_IDLE_HINTS in idle-hints-overlay.tsx */}
        {ENABLE_IDLE_HINTS && (
          <IdleHintsOverlay
            enabled={
              !introActive &&
              openWindows.length === 0 &&
              !showLaunchpad &&
              !showControlCenter &&
              !showSpotlight &&
              !showAbout
            }
          />
        )}

        {/* Apple Intelligence assistant */}
        {showSiri && (
          <SiriAssistant
            onClose={() => setShowSiri(false)}
            onLaunchApp={(app) => openAppById(app.id, app.title, app.component)}
          />
        )}
      </div>

      {/* Brightness overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-[2000] bg-black transition-opacity duration-300"
        style={{ opacity: Math.max(0.1, 0.9 - screenBrightness / 100) }}
      />
      </div>
    </MusicProvider>
  )
}
