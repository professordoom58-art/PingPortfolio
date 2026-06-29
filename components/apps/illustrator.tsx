"use client"

import Image from "next/image"
import { useState } from "react"
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

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

          {/* Expertise */}

          <div className="mt-8 grid md:grid-cols-3 gap-4 max-w-4xl mb-10">
            <div
              className={`rounded-xl border ${cardClass} h-24 px-5 flex items-center justify-center gap-3`}
            >
              <PenTool size={22} className="shrink-0" />
              <span className="font-semibold">
                Thumbnails
              </span>
            </div>

            <div
              className={`rounded-xl border ${cardClass} h-24 px-5 flex items-center justify-center gap-3`}
            >
              <Palette size={22} className="shrink-0" />
              <span className="font-semibold">
                Infographics
              </span>
            </div>

            <div
              className={`rounded-xl border ${cardClass} h-24 px-5 flex items-center justify-center gap-3`}
            >
              <Shapes size={22} className="shrink-0" />
              <span className="font-semibold">
                Branding
              </span>
            </div>
          </div>
          {/* Portfolio */}

          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-5">
              Check Out
            </h2>

            <div className="grid grid-cols-2 gap-5">
              {[
                "/thumb1.jpg",
                "/thumb2.jpg",
                "/thumb3.jpg",
                "/thumb4.jpg",
              ].map((image, index) => (
                <div
                  key={image}
                  onClick={() => setSelectedImage(image)}
                  className={`cursor-pointer overflow-hidden rounded-xl border ${borderClass} ${cardClass}`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    width={1280}
                    height={720}
                    className="w-full aspect-video object-cover transition duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">
              Services
            </h2>

            <div className="flex flex-wrap gap-3">
              {[
                "YouTube Thumbnails",
                "Infographics",
                "Brand Assets",
                "Vector Graphics",
                "Typography",
                "Identity Design",
                "Media Graphics",
                "Video Assets",
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

          {/* Image Preview */}
          {selectedImage && (
            <div
              className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-8"
              onClick={() => setSelectedImage(null)}
            >
              <div
                className="relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-4 -right-4 bg-zinc-900 rounded-full p-2 hover:bg-zinc-700"
                >
                  ✕
                </button>

                <Image
                  src={selectedImage}
                  alt="Preview"
                  width={1920}
                  height={1080}
                  className="max-w-[90vw] max-h-[90vh] object-contain rounded-xl shadow-2xl"
                />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}