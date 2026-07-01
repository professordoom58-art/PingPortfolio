"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function IOSStatusBar() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()

      const hours = now.getHours() % 12 || 12
      const minutes = now.getMinutes().toString().padStart(2, "0")

      setTime(`${hours}:${minutes}`)
    }

    updateTime()

    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])
  return (
    <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-9 pt-4">

      {/* Time */}

      <div className="flex items-center">
        <span className="text-white font-semibold text-[17px]">
          {time}
        </span>

        <Image
          src="/arrow.svg"
          alt="Location"
          width={11}
          height={11}
          className="ml-1.5 relative top-[2px]"
        />
      </div>

      {/* Icons */}

      <div className="flex items-center gap-[4px] translate-y-[1px]">

        <Image
          src="/cellular.svg"
          alt="Cellular"
          width={20}
          height={12}
          priority
        />

        <Image
          src="/wifi.svg"
          alt="WiFi"
          width={18}
          height={14}
          priority
        />

        <Image
          src="/battery.svg"
          alt="Battery"
          width={27}
          height={13}
          priority
        />

      </div>

    </div>
  )
}