"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface IOSIconProps {
    icon: string
    title: string
    onClick: () => void
}

export default function IOSIcon({
    icon,
    title,
    onClick,
}: IOSIconProps) {
    return (
        <motion.button
            whileTap={{
                scale: 0.9,
            }}

            whileHover={{
                scale: 1.03,
            }}

            transition={{
                type: "spring",
                stiffness: 650,
                damping: 30,
            }}
            onClick={onClick}
            className="flex flex-col items-center"
        >
            <div className="w-20 h-20 rounded-[22px] bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-xl">
                <Image
                    src={icon}
                    alt={title}
                    width={56}
                    height={56}
                    className="object-contain"
                />
            </div>

            <span className="mt-2 text-white text-sm font-medium">
                {title}
            </span>
        </motion.button>
    )
}