"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function IOSStatusBar() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      )
    }

    updateTime()

    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-9 pt-4">

      {/* Time */}

      <div className="flex items-center gap-1">
        <Image
          src="/arrow.svg"
          alt="Location"
          width={9}
          height={9}
          className="-translate-y-[1px]"
        />

        <span className="font-semibold text-white">
          {time}
        </span>
      </div>

      {/* Icons */}

      <div className="flex items-center gap-[4px] translate-y-[1px]">

        <Image
          src="/cellular.svg"
          alt="Cellular"
          width={17}
          height={10}
          priority
        />

        <Image
          src="/wifi.svg"
          alt="WiFi"
          width={15}
          height={11}
          priority
        />

        <Image
          src="/battery.svg"
          alt="Battery"
          width={24}
          height={11}
          priority
        />

      </div>

    </div>
  )
}