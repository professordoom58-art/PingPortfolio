"use client"

import { ChevronLeft } from "lucide-react"

interface IOSBackButtonProps {
    onClick: () => void
}

export default function IOSBackButton({
    onClick,
}: IOSBackButtonProps) {
    return (
        <button
            onClick={onClick}
            className="
                flex
                items-center
                justify-center
                w-14
                h-14
                rounded-full

                bg-white/[0.08]

                backdrop-blur-2xl

                border
                border-white/[0.08]

                shadow-[0_6px_30px_rgba(0,0,0,.35),inset_0_1px_0_rgba(255,255,255,.08)]

                active:scale-95
                transition-all
                duration-200
            "
        >
            <ChevronLeft
                size={30}
                className="text-white"
                strokeWidth={2.6}
            />
        </button>
    )
}