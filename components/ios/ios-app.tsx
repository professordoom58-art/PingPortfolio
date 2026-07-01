"use client"

import { ChevronLeft } from "lucide-react"
import IOSStatusBar from "./ios-statusbar"
import { motion } from "framer-motion"

interface IOSAppProps {
    title: string
    children: React.ReactNode
    onBack: () => void
    layoutId: string
}

export default function IOSApp({
    title,
    children,
    onBack,
    layoutId,
}: IOSAppProps) {
    return (
        <motion.div
            layoutId={layoutId}
            initial={{
                borderRadius: 28,
                opacity: 0.9,
                scale: 0.92,
            }}
            animate={{
                borderRadius: 0,
                opacity: 1,
                scale: 1,
            }}
            exit={{
                borderRadius: 28,
                opacity: 0.9,
                scale: 0.92,
            }}
            transition={{
                type: "spring",
                stiffness: 380,
                damping: 32,
            }}
            className="fixed inset-0 bg-zinc-950 text-white overflow-hidden z-[100]"
        >

            {/* Status Bar */}
            <IOSStatusBar />

            {/* Dynamic Island */}
            <div
                className="absolute top-3 left-1/2 -translate-x-1/2
                   w-32 h-9 rounded-full bg-black
                   shadow-[0_0_20px_rgba(0,0,0,0.45)]
                   z-50"
            />

            {/* Main Layout */}
            <div className="pt-14 h-full flex flex-col">

                {/* Navigation Bar */}
                <div className="h-14 flex items-center justify-between px-4 bg-black/40 backdrop-blur-xl border-b border-white/10">

                    <button
                        onClick={onBack}
                        className="flex items-center gap-1 text-blue-400 font-medium"
                    >
                        <ChevronLeft size={22} />
                        Home
                    </button>

                    <span className="font-semibold">
                        {title}
                    </span>

                    {/* Spacer */}
                    <div className="w-12" />

                </div>

                {/* App Content */}
                <div className="flex-1 overflow-y-auto">
                    {children}
                </div>

            </div>

        </motion.div>
    )
}