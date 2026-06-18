"use client"

import Image from "next/image"
import { PenTool, Palette, Shapes, Mail } from "lucide-react"

interface IllustratorProps {
  isDarkMode?: boolean
}

export default function Illustrator({
  isDarkMode = true,
}: IllustratorProps) {
  const borderClass = isDarkMode ? "border-zinc-700" : "border-gray-200"
  const hoverClass = isDarkMode ? "hover:bg-zinc-800" : "hover:bg-gray-100"
  const mutedTextClass = isDarkMode ? "text-zinc-400" : "text-zinc-600"
  const cardClass = isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-white border-gray-200 shadow-sm"
  const pillClass = isDarkMode ? "bg-zinc-800" : "bg-gray-100"

  return (
    <div className={`h-full flex flex-col ${isDarkMode ? "bg-zinc-900 text-white" : "bg-white text-black"}`}>
      <div className={`h-12 border-b ${borderClass} px-4 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <Image
            src="/illustrator.png"
            alt="Illustrator"
            width={28}
            height={28}
          />
          <span>Adobe Illustrator</span>
        </div>

        <button
          onClick={() =>
            (window.location.href =
              "mailto:pingmihir@outlook.com?subject=Illustrator Inquiry")
          }
          className="flex items-center gap-2 px-3 py-1 rounded bg-orange-700 hover:bg-orange-600"
        >
          <Mail size={16} />
          Connect
        </button>
      </div>

      <div className="flex flex-1">
        <div className={`w-64 border-r ${borderClass} p-4`}>
          <div className="space-y-2">
            <button className={`block w-full text-left p-2 rounded ${hoverClass}`}>
              Home
            </button>
            <button className={`block w-full text-left p-2 rounded ${hoverClass}`}>
              Vector Projects
            </button>
            <button className={`block w-full text-left p-2 rounded ${hoverClass}`}>
              Branding
            </button>
            <button className={`block w-full text-left p-2 rounded ${hoverClass}`}>
              Templates
            </button>
          </div>
        </div>

        <div className="flex-1 p-8 overflow-auto">
          <div className="flex items-center gap-4 mb-8">
            <Image
              src="/illustrator.png"
              alt="Illustrator"
              width={64}
              height={64}
            />

            <div>
              <h1 className="text-3xl font-bold">Illustrator</h1>
              <p className={mutedTextClass}>
                Vector Design • Branding • Illustration
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className={`rounded-xl border p-6 ${cardClass}`}>
              <PenTool size={32} className="mb-4" />
              <h2 className="font-semibold mb-2">Vector Graphics</h2>
              <p className={`text-sm ${mutedTextClass}`}>
                Create scalable vector artwork and assets.
              </p>
            </div>

            <div className={`rounded-xl border p-6 ${cardClass}`}>
              <Palette size={32} className="mb-4" />
              <h2 className="font-semibold mb-2">Brand Identity</h2>
              <p className={`text-sm ${mutedTextClass}`}>
                Logos, typography systems and visual identity.
              </p>
            </div>

            <div className={`rounded-xl border p-6 ${cardClass}`}>
              <Shapes size={32} className="mb-4" />
              <h2 className="font-semibold mb-2">Illustrations</h2>
              <p className={`text-sm ${mutedTextClass}`}>
                Custom vector illustrations and iconography.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">
              Services
            </h2>

            <div className="flex flex-wrap gap-3">
              {[
                "Logo Design",
                "Brand Identity",
                "Vector Illustration",
                "Packaging Design",
                "Icon Sets",
                "Infographics",
                "Typography",
                "Print Design",
              ].map((item) => (
                <div
                  key={item}
                  className={`px-4 py-2 rounded-full ${pillClass}`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
