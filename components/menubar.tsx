"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Search, Wifi, WifiOff, Lock, ChevronRight } from "lucide-react"
import { AppleIcon } from "@/components/icons"

interface MenubarProps {
  time: Date
  onSleep: () => void
  onShutdown: () => void
  onRestart: () => void
  onSpotlightClick: () => void
  onControlCenterClick: () => void
  isControlCenterOpen?: boolean
  wifiEnabled: boolean
  onWifiEnabledChange: (value: boolean) => void
  wifiNetwork: string
  onWifiNetworkChange: (name: string) => void
  /** Fired when the Wi-Fi popover opens so other panels can close. */
  onWifiPopoverOpen?: () => void
  /** Apple menu actions. */
  onAboutThisMac: () => void
  onSystemSettings: () => void
  onAppStore: () => void
  onForceQuit: () => void
  onLockScreen: () => void
  /** Siri / Apple Intelligence orb. */
  onSiriClick: () => void
  isSiriOpen?: boolean
  activeWindow: { id: string; title: string } | null
}

const MENU_ITEMS = ["File", "Edit", "View", "Go", "Window", "Help"]

/** Nearby networks offered in the popover. */
const OTHER_NETWORKS = ["Studio_5G_Pro", "CoffeeShop_Guest", "iPhone Hotspot"]

/** Authentic macOS Control Center glyph: two tight stacked switches, thumbs opposed. */
function ControlCenterIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="3.5" width="20" height="7.5" rx="3.75" />
      <circle cx="17.8" cy="7.25" r="2.1" fill="currentColor" stroke="none" />
      <rect x="2" y="13" width="20" height="7.5" rx="3.75" />
      <circle cx="6.2" cy="16.75" r="2.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

/** Battery: rounded outline, ~90% white fill, positive terminal nub. */
function BatteryIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 26 12" className={className} fill="none" aria-hidden="true">
      <rect
        x="0.6"
        y="0.6"
        width="21.8"
        height="10.8"
        rx="3.2"
        stroke="white"
        strokeOpacity="0.8"
        strokeWidth="1.2"
      />
      <rect x="2.4" y="2.4" width="17.4" height="7.2" rx="1.9" fill="white" />
      <path d="M24 4.2c1.1.35 1.1 3.25 0 3.6V4.2Z" fill="white" fillOpacity="0.8" />
    </svg>
  )
}

/* Apple menu row + divider primitives, so every item matches exactly. */
const appleRow =
  "w-full px-2.5 py-[5px] rounded-[7px] text-[13px] leading-tight font-normal text-white/95 flex items-center justify-between hover:bg-[#007AFF] hover:text-white transition-none cursor-default group"

const appleShortcut = "text-[12px] text-white/45 group-hover:text-white/90 font-sans tracking-tight"

function AppleDivider() {
  return <div className="my-1 mx-2.5 h-[1px] bg-white/10" />
}

export default function Menubar({
  time,
  onSleep,
  onShutdown,
  onRestart,
  onSpotlightClick,
  onControlCenterClick,
  isControlCenterOpen = false,
  wifiEnabled,
  onWifiEnabledChange,
  wifiNetwork,
  onWifiNetworkChange,
  onWifiPopoverOpen,
  onAboutThisMac,
  onSystemSettings,
  onAppStore,
  onForceQuit,
  onLockScreen,
  onSiriClick,
  isSiriOpen = false,
  activeWindow,
}: MenubarProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [showWifiToggle, setShowWifiToggle] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const wifiRef = useRef<HTMLDivElement>(null)

  // "Thu Oct 29  4:10 PM" - no commas, double space before the clock.
  const weekday = time.toLocaleDateString("en-US", { weekday: "short" })
  const month = time.toLocaleDateString("en-US", { month: "short" })
  const clock = time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
  const formattedTime = `${weekday} ${month} ${time.getDate()}  ${clock}`

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null)
      }

      if (
        wifiRef.current &&
        !wifiRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest(".wifi-icon")
      ) {
        setShowWifiToggle(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleMenu = (menuName: string) => {
    setActiveMenu((prev) => (prev === menuName ? null : menuName))
  }

  const toggleWifiPopup = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowWifiToggle((prev) => {
      const next = !prev
      // Opening the popover dismisses Control Center / Spotlight.
      if (next) onWifiPopoverOpen?.()
      return next
    })
  }

  /** Run an Apple-menu action and dismiss the menu. */
  const runAppleAction = (action: () => void) => {
    setActiveMenu(null)
    action()
  }

  return (
    <div
      ref={menuRef}
      className="fixed left-0 right-0 top-0 z-50 flex h-7 select-none items-center justify-between bg-transparent px-3.5 text-[13px] tracking-[-0.01em] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
    >
      {/* ---------------- Left: Apple + app menus ---------------- */}
      <div className="flex items-center gap-4">
        <button
          className={`flex items-center rounded px-2 py-0.5 transition-colors ${
            activeMenu === "apple" ? "bg-white/20" : "hover:bg-white/10"
          }`}
          onClick={() => toggleMenu("apple")}
          aria-label="Apple menu"
          aria-expanded={activeMenu === "apple"}
        >
          <AppleIcon className="h-3.5 w-3.5 fill-white" />
        </button>

        {/* Active app title, or Finder when nothing is focused */}
        <span className="cursor-default text-[13px] font-bold text-white">
          {activeWindow?.title ?? "Finder"}
        </span>

        <div className="hidden items-center gap-1 sm:flex">
          {MENU_ITEMS.map((item) => (
            <button
              key={item}
              className="cursor-default rounded px-2 py-0.5 text-[13px] font-normal text-white/95 transition-colors hover:bg-white/15"
            >
              {item}
            </button>
          ))}
        </div>

        {activeMenu === "apple" && (
          <div className="fixed left-2 top-7 z-[100] w-[235px] origin-top-left animate-in fade-in zoom-in-95 select-none rounded-[14px] border border-white/15 bg-[#1e1e24]/80 p-1.5 text-white shadow-[0_20px_50px_rgba(0,0,0,0.65),inset_0_1px_0.5px_rgba(255,255,255,0.2)] backdrop-blur-3xl duration-100 saturate-150">
            <button className={appleRow} onClick={() => runAppleAction(onAboutThisMac)}>
              About This Mac
            </button>

            <AppleDivider />

            <button className={appleRow} onClick={() => runAppleAction(onSystemSettings)}>
              <span>System Settings...</span>
              <span className="rounded-full bg-white/15 px-1.5 py-[1px] text-[10px] font-medium text-white/70 group-hover:bg-white/25 group-hover:text-white">
                1 update
              </span>
            </button>

            <button className={appleRow} onClick={() => runAppleAction(onAppStore)}>
              App Store...
            </button>

            <AppleDivider />

            <button className={appleRow}>
              <span>Recent Items</span>
              <ChevronRight className="h-3.5 w-3.5 text-white/50 group-hover:text-white" />
            </button>

            <AppleDivider />

            <button className={appleRow} onClick={() => runAppleAction(onForceQuit)}>
              <span>Force Quit...</span>
              <span className={appleShortcut}>⌥⌘⎋</span>
            </button>

            <AppleDivider />

            <button className={appleRow} onClick={() => runAppleAction(onSleep)}>
              Sleep
            </button>
            <button className={appleRow} onClick={() => runAppleAction(onRestart)}>
              Restart...
            </button>
            <button className={appleRow} onClick={() => runAppleAction(onShutdown)}>
              Shut Down...
            </button>

            <AppleDivider />

            <button className={appleRow} onClick={() => runAppleAction(onLockScreen)}>
              <span>Lock Screen</span>
              <span className={appleShortcut}>⌃⌘Q</span>
            </button>
          </div>
        )}
      </div>

      {/* ---------------- Right: status items ---------------- */}
      <div className="flex items-center gap-3.5">
        {/* 1. Battery */}
        <span className="flex items-center" aria-label="Battery 90%">
          <BatteryIcon className="h-[11px] w-[22px]" />
        </span>

        {/* 2. Wi-Fi */}
        <div className="relative">
          <button
            className={`wifi-icon flex items-center rounded px-1.5 py-0.5 transition-colors ${
              showWifiToggle ? "bg-white/20" : "hover:bg-white/10"
            }`}
            onClick={toggleWifiPopup}
            aria-label="Wi-Fi"
            aria-expanded={showWifiToggle}
          >
            {wifiEnabled ? (
              <Wifi className="h-[15px] w-[15px] stroke-[2.2] text-white" />
            ) : (
              <WifiOff className="h-[15px] w-[15px] stroke-[2.2] text-white/60" />
            )}
          </button>

          {showWifiToggle && (
            <div
              ref={wifiRef}
              className="fixed right-16 top-8 z-50 w-[280px] origin-top-right animate-in fade-in zoom-in-95 select-none rounded-2xl border border-white/15 bg-neutral-900/75 p-3 text-white shadow-[0_20px_50px_rgba(0,0,0,0.55),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-3xl duration-150"
            >
              {/* Header + macOS switch */}
              <div className="flex items-center justify-between border-b border-white/10 px-1 pb-2.5">
                <span className="text-[13px] font-semibold text-white">Wi-Fi</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={wifiEnabled}
                  aria-label="Toggle Wi-Fi"
                  onClick={() => onWifiEnabledChange(!wifiEnabled)}
                  className={`h-5 w-9 cursor-pointer rounded-full p-0.5 transition-colors ${
                    wifiEnabled ? "bg-[#007AFF]" : "bg-white/20"
                  }`}
                >
                  <span
                    className={`block h-4 w-4 rounded-full bg-white shadow-md transition-transform ${
                      wifiEnabled ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {wifiEnabled ? (
                <>
                  <div className="px-1 pb-1 pt-2.5 text-[11px] font-semibold text-white/50">
                    Known Network
                  </div>

                  <div className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-1.5 transition-colors hover:bg-white/10">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#007AFF] text-white shadow-sm">
                        <Wifi className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-[13px] font-medium text-white">{wifiNetwork}</span>
                    </div>
                    <Lock className="h-3.5 w-3.5 text-white/60" />
                  </div>

                  <div className="my-1.5 border-t border-white/10" />

                  <div className="px-1 py-1 text-[11px] font-semibold text-white/50">
                    Other Networks
                  </div>

                  {OTHER_NETWORKS.filter((name) => name !== wifiNetwork).map((name) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => onWifiNetworkChange(name)}
                      className="group flex w-full cursor-pointer items-center justify-between rounded-lg px-2 py-1.5 transition-colors hover:bg-[#007AFF]"
                    >
                      <span className="flex items-center gap-2.5">
                        <Wifi className="h-3.5 w-3.5 text-white/60 group-hover:text-white" />
                        <span className="text-[13px] text-white/85 group-hover:text-white">
                          {name}
                        </span>
                      </span>
                      <Lock className="h-3 w-3 text-white/50 group-hover:text-white" />
                    </button>
                  ))}
                </>
              ) : (
                <p className="px-1 py-3 text-[12px] text-white/50">
                  Wi-Fi is off. Turn it on to see available networks.
                </p>
              )}

              <div className="mt-1.5 border-t border-white/10 pt-1.5">
                <button
                  type="button"
                  className="w-full rounded-md px-2 py-1 text-left text-[13px] text-white/90 transition-colors hover:bg-[#007AFF] hover:text-white"
                >
                  Wi-Fi Settings...
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 3. Spotlight */}
        <button onClick={onSpotlightClick} aria-label="Spotlight Search">
          <Search className="h-[14px] w-[14px] cursor-pointer stroke-[2.2] text-white hover:opacity-80" />
        </button>

        {/* 4. Control Center - no pill when idle */}
        <button
          onClick={onControlCenterClick}
          aria-label="Control Center"
          aria-expanded={isControlCenterOpen}
          className={`flex items-center justify-center transition-colors ${
            isControlCenterOpen ? "rounded bg-white/20 px-1.5 py-0.5" : ""
          }`}
        >
          <ControlCenterIcon className="h-[15px] w-[15px] text-white" />
        </button>

        {/* 5. Siri / Apple Intelligence orb */}
        <button
          onClick={onSiriClick}
          aria-label="Siri"
          aria-expanded={isSiriOpen}
          className={`flex items-center rounded px-1 py-0.5 transition-colors ${
            isSiriOpen ? "bg-white/20" : "hover:bg-white/10"
          }`}
        >
          <img
            src="/apple-intelligence.png"
            alt="Apple Intelligence"
            className="w-4 h-4 object-contain select-none"
            draggable={false}
          />
        </button>

        {/* 6. Date and time */}
        <span className="whitespace-nowrap text-[13px] font-medium tracking-tight text-white">
          {formattedTime}
        </span>
      </div>
    </div>
  )
}
