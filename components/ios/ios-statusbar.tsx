"use client"

import { useEffect, useState } from "react"
import {
    Signal,
    Wifi,
    BatteryFull,
} from "lucide-react"

export default function IOSStatusBar() {
    const [time, setTime] = useState("")

    useEffect(() => {
        const updateTime = () => {
            const now = new Date()

            setTime(
                now.toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                })
            )
        }

        updateTime()

        const interval = setInterval(updateTime, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="absolute top-0 left-0 right-0 z-50 h-14 px-6 flex items-center justify-between text-white font-semibold">

            <span className="text-[15px]">
                {time}
            </span>

            <div className="flex items-center gap-2">

                <Signal size={16} />

                <Wifi size={16} />

                <BatteryFull size={18} />

            </div>

        </div>
    )
}