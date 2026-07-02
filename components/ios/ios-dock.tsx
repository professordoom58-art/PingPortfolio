"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface IOSDockProps {
  onMailClick: () => void
  onNotesClick: () => void
  onWordleClick: () => void
}

const dockIconClass =
  "h-[60px] w-[60px] select-none object-contain transition-transform"

export default function IOSDock({
  onMailClick,
  onNotesClick,
  onWordleClick,
}: IOSDockProps) {
  const dockApps = [
    {
      id: "safari",
      icon: "/safari.png",
      alt: "Safari",
      scale: 1.1,
    },
    {
      id: "mail",
      icon: "/mail.png",
      alt: "Mail",
      scale: 1.04,
      onClick: onMailClick,
    },
    {
      id: "notes",
      layoutId: "notes",
      icon: "/notes.png",
      alt: "Notes",
      scale: 0.93,
      onClick: onNotesClick,
    },
    {
      id: "wordle",
      layoutId: "wordle",
      icon: "/wordle.png",
      alt: "Wordle",
      scale: 0.91,
      onClick: onWordleClick,
    },
  ]

  return (
    <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-40">
      <div
        className="
          flex items-center
          gap-4
          px-5
          py-3
          rounded-[32px]
          bg-white/10
          backdrop-blur-3xl
          border border-white/15
          shadow-2xl
        "
      >
        {dockApps.map((app) => (
          <motion.button
            key={app.id}
            layoutId={app.layoutId}
            onClick={app.onClick}
            whileTap={{ scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 420,
              damping: 32,
            }}
            className="
              w-[64px]
              h-[64px]
              flex
              items-center
              justify-center
            "
          >
            <Image
              src={app.icon}
              alt={app.alt}
              width={60}
              height={60}
              draggable={false}
              className={dockIconClass}
              style={{
                transform: `scale(${app.scale})`,
                transformOrigin: "center",
              }}
            />
          </motion.button>
        ))}
      </div>
    </div>
  )
}
