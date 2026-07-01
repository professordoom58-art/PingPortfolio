"use client"

import { useState } from "react"
import Image from "next/image"
import IOSStatusBar from "./ios-statusbar"
import IOSDock from "./ios-dock"
import IOSIcon from "./ios-icon"
import IOSApp from "./ios-app"
import PremierePro from "@/components/apps/premierepro"
import AfterEffects from "@/components/apps/aftereffects"
import Photoshop from "@/components/apps/photoshop"
import Illustrator from "@/components/apps/illustrator"
import { LayoutGroup } from "framer-motion"
import IOSNotes from "./ios-notes"

export default function IOSHome() {
  const [activeApp, setActiveApp] = useState<string | null>(null)

  const apps = [
    {
      id: "premiere",
      name: "Premiere",
      icon: "/premiere.png",
    },
    {
      id: "aftereffects",
      name: "After Effects",
      icon: "/aftereffects.png",
    },
    {
      id: "photoshop",
      name: "Photoshop",
      icon: "/photoshop.png",
    },
    {
      id: "illustrator",
      name: "Illustrator",
      icon: "/illustrator.png",
    },
  ]


  return (
    <LayoutGroup>
      <div
        className="relative h-screen w-screen overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: "url('/bg1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <IOSStatusBar />
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-9 rounded-full bg-black z-50" />

        <div className="px-8 pt-24">

          <div className="grid grid-cols-2 gap-y-10 gap-x-6">

            {apps.map((app) => (
              <IOSIcon
                layoutId={app.id}
                key={app.id}
                icon={app.icon}
                title={app.name}
                onClick={() => setActiveApp(app.id)}
              />
            ))}

          </div>

        </div>

        <IOSDock
          onMailClick={() =>
            window.location.href =
            "mailto:pingmihir@outlook.com?subject=Portfolio Inquiry"
          }
          onNotesClick={() => setActiveApp("notes")}
        />
        {activeApp === "premiere" && (
          <IOSApp
            layoutId="premiere"
            title="Premiere Pro"
            onBack={() => setActiveApp(null)}
          >
            <PremierePro
              isMobile
              hideAdobeHeader
            />
          </IOSApp>
        )}

        {activeApp === "illustrator" && (
          <IOSApp
            layoutId="illustrator"
            title="Illustrator"
            onBack={() => setActiveApp(null)}
          >
            <Illustrator
              isMobile
              hideAdobeHeader
            />


          </IOSApp>
        )}
        {activeApp === "aftereffects" && (
          <IOSApp
            layoutId="aftereffects"
            title="After Effects"
            onBack={() => setActiveApp(null)}
          >
            <AfterEffects
              isMobile
              hideAdobeHeader
            />
          </IOSApp>
        )}
        {activeApp === "photoshop" && (
          <IOSApp
            layoutId="photoshop"
            title="Photoshop"
            onBack={() => setActiveApp(null)}
          >
            <Photoshop
              isMobile
              hideAdobeHeader
            />
          </IOSApp>
        )}
        {activeApp === "notes" && (
          <IOSApp
            layoutId="notes"
            title=""
            showAppChrome={false}
            onBack={() => setActiveApp(null)}
          >
            <IOSNotes
              isMobile
              onBack={() => setActiveApp(null)}
            />
          </IOSApp>
        )}
      </div>
    </LayoutGroup>
  )
}
