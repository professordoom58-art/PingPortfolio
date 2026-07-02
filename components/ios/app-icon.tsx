"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface AppIconProps {
    icon: string
    alt: string
    layoutId: string
    size: number
    scale?: number
    onClick?: () => void
}

export default function AppIcon({
    icon,
    alt,
    layoutId,
    size,
    scale = 1,
    onClick,
}: AppIconProps) {
    return (
        <motion.button
            layoutId={layoutId}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.03 }}
            transition={{
                type: "spring",
                stiffness: 420,
                damping: 32,
            }}
            onClick={onClick}
            className="flex items-center justify-center"
        >
            <div
                className="relative overflow-hidden rounded-[22px]"
                style={{
                    width: size,
                    height: size,
                }}
            >
                <Image
                    src={icon}
                    alt={alt}
                    fill
                    draggable={false}
                    className="object-cover select-none"
                    style={{
                        transform: `scale(${scale})`,
                        transformOrigin: "center",
                    }}
                />
            </div>
        </motion.button>
    )
}
