"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface IOSDockProps {
  onSafariClick: () => void
  onMailClick: () => void
  onNotesClick: () => void
  onWordleClick: () => void
}

export default function IOSDock({
  onSafariClick,
  onMailClick,
  onNotesClick,
  onWordleClick,
}: IOSDockProps) {
  const dockApps = [
    {
      id: "safari",
      layoutId: "safari",
      icon: "/safari.png",
      alt: "Safari",
      scale: 1.34,
      onClick: onSafariClick,
    },
    {
      id: "mail",
      icon: "/mail.png",
      alt: "Mail",
      scale: 1.27,
      onClick: onMailClick,
    },
    {
      id: "notes",
      layoutId: "notes",
      icon: "/notes.png",
      alt: "Notes",
      scale: 1.15,
      onClick: onNotesClick,
    },
    {
      id: "wordle",
      layoutId: "wordle",
      icon: "/wordle.png",
      alt: "Wordle",
      scale: 1.11,
      onClick: onWordleClick,
    },
  ]

  const dockIconClass =
    "h-[60px] w-[60px] select-none object-contain transition-transform"

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
