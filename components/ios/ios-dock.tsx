"use client"

import Image from "next/image"

interface IOSDockProps {
  onMailClick: () => void
}

export default function IOSDock({
  onMailClick,
}: IOSDockProps) {
  const dockApps = [
    {
      id: "safari",
      icon: "/safari.png",
      alt: "Safari",
      scale: 1.0,
    },
    {
      id: "mail",
      icon: "/mail.png",
      alt: "Mail",
      scale: 0.95,
      onClick: onMailClick,
    },
    {
      id: "github",
      icon: "/github.png",
      alt: "GitHub",
      scale: 0.9,
    },
    {
      id: "contact",
      icon: "/contact.png",
      alt: "Contact",
      scale: 0.85,
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
          <button
            key={app.id}
            onClick={app.onClick}
            className="
              w-[68px]
              h-[68px]
              flex
              items-center
              justify-center
              transition-transform
              active:scale-90
            "
          >
            <Image
              src={app.icon}
              alt={app.alt}
              width={68}
              height={68}
              draggable={false}
              className="select-none transition-transform"
              style={{
                transform: `scale(${app.scale})`,
              }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}