"use client"

import AppIcon from "./app-icon"

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
        <div className="flex flex-col items-center">
            <AppIcon
                icon={icon}
                alt={title}
                layoutId={layoutId}
                size={80}
                onClick={onClick}
            />

            <span className="mt-1.0 text-[15px] font-medium text-white text-center leading-none">
                {title}
            </span>
        </div>
    )
}
