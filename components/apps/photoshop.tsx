"use client"

import Image from "next/image"
import { ImageIcon, Brush, Layers, Mail } from "lucide-react"

interface PhotoshopProps {
  isDarkMode?: boolean
}

export default function Photoshop({
  isDarkMode = true,
}: PhotoshopProps) {
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
            src="/photoshop.png"
            alt="Photoshop"
            width={28}
            height={28}
          />
          <span>Adobe Photoshop</span>
        </div>

        <button
          onClick={() =>
            (window.location.href =
              "mailto:pingmihir@outlook.com?subject=Photoshop Inquiry")
          }
          className="flex items-center gap-2 px-3 py-1 rounded bg-blue-700 hover:bg-blue-600"
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
              Recent Files
            </button>
            <button className={`block w-full text-left p-2 rounded ${hoverClass}`}>
              Assets
            </button>
            <button className={`block w-full text-left p-2 rounded ${hoverClass}`}>
              Templates
            </button>
          </div>
        </div>

        <div className="flex-1 p-8 overflow-auto">
          <div className="flex items-center gap-4 mb-8">
            <Image
              src="/photoshop.png"
              alt="Photoshop"
              width={64}
              height={64}
            />

            <div>
              <h1 className="text-3xl font-bold">Photoshop</h1>
              <p className={mutedTextClass}>
                Image Editing • Retouching • Digital Design
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className={`rounded-xl border p-6 ${cardClass}`}>
              <ImageIcon size={32} className="mb-4" />
              <h2 className="font-semibold mb-2">Photo Editing</h2>
              <p className={`text-sm ${mutedTextClass}`}>
                Professional image manipulation and enhancement.
              </p>
            </div>

            <div className={`rounded-xl border p-6 ${cardClass}`}>
              <Brush size={32} className="mb-4" />
              <h2 className="font-semibold mb-2">Digital Art</h2>
              <p className={`text-sm ${mutedTextClass}`}>
                Create illustrations, artwork and concepts.
              </p>
            </div>

            <div className={`rounded-xl border p-6 ${cardClass}`}>
              <Layers size={32} className="mb-4" />
              <h2 className="font-semibold mb-2">Compositing</h2>
              <p className={`text-sm ${mutedTextClass}`}>
                Combine images into polished visual designs.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">
              Services
            </h2>

            <div className="flex flex-wrap gap-3">
              {[
                "Photo Retouching",
                "Thumbnail Design",
                "Social Media Graphics",
                "Poster Design",
                "Photo Manipulation",
                "Album Covers",
                "Brand Assets",
                "Web Graphics",
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
