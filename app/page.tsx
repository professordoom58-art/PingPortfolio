"use client"

import { useState, useEffect } from "react"
import BootScreen from "@/components/boot-screen"
import Desktop from "@/components/desktop"
import SleepScreen from "@/components/sleep-screen"
import ShutdownScreen from "@/components/shutdown-screen"
import IOSHome from "@/components/ios/ios-home"

type SystemState = "booting" | "desktop" | "sleeping" | "shutdown" | "restarting"

export default function Home() {
  const [systemState, setSystemState] = useState<SystemState>("booting")
  const [screenBrightness, setScreenBrightness] = useState(90)
  const [isMobile, setIsMobile] = useState(false)

  // Boot sequence: the boot animation plays, then we go straight to the desktop.
  // There is no login/lock screen step anymore.
  useEffect(() => {
    if (systemState === "booting" || systemState === "restarting") {
      const timer = setTimeout(() => {
        setSystemState("desktop")
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [systemState])

  // Load persisted screen brightness
  useEffect(() => {
    const savedBrightness = localStorage.getItem("screenBrightness")
    if (savedBrightness !== null) {
      setScreenBrightness(Number.parseInt(savedBrightness))
    }
  }, [])

  const handleSleep = () => {
    setSystemState("sleeping")
  }

  const handleWakeUp = () => {
    setSystemState("desktop")
  }

  const handleShutdown = () => {
    setSystemState("shutdown")
  }

  const handleBoot = () => {
    setSystemState("booting")
  }

  const handleRestart = () => {
    setSystemState("restarting")
  }

  const updateBrightness = (value: number) => {
    setScreenBrightness(value)
    localStorage.setItem("screenBrightness", value.toString())
  }

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()

    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Render the appropriate screen based on system state
  const renderScreen = () => {
    switch (systemState) {
      case "booting":
      case "restarting":
        return <BootScreen />

      case "desktop":
        if (isMobile) {
          return <IOSHome />
        }

        return (
          <Desktop
            onSleep={handleSleep}
            onShutdown={handleShutdown}
            onRestart={handleRestart}
            initialBrightness={screenBrightness}
            onBrightnessChange={updateBrightness}
          />
        )

      case "sleeping":
        return <SleepScreen onWakeUp={handleWakeUp} />

      case "shutdown":
        return <ShutdownScreen onBoot={handleBoot} />

      default:
        return <BootScreen />
    }
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {renderScreen()}

      {/* Brightness overlay - apply to all screens */}
      <div
        className="absolute inset-0 bg-black pointer-events-none z-50 transition-opacity duration-300"
        style={{ opacity: Math.max(0.1, 0.9 - screenBrightness / 100) }}
      />
    </div>
  )
}
