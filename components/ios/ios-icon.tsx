"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface IOSIconProps {
    icon: string
    title: string
    onClick: () => void
    layoutId: string
}

export default function IOSIcon({
    icon,
    title,
    onClick,
    layoutId,
}: IOSIconProps) {
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
            className="flex flex-col items-center"
        >
            <div className="relative w-20 h-20 rounded-[22px] overflow-hidden">
                <Image
                    src={icon}
                    alt={title}
                    fill
                    className="object-cover"
                />
            </div>
            <span className="mt-2.5 text-[15px] font-medium text-white text-center leading-none">
                {title}
            </span>
        </motion.button>
    )
}