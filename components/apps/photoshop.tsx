"use client"

import Image from "next/image"
import { useState } from "react"
import { ImageIcon, Brush, Layers, Sparkles, Mail } from "lucide-react"

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
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

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
                Assets • Thumbnails • Compositing
              </p>
            </div>
          </div>
          {/* Expertise */}

          <div className="mt-8 grid md:grid-cols-3 gap-4 max-w-4xl mb-10">
            <div
              className={`rounded-xl border ${cardClass} h-24 px-5 flex items-center justify-center gap-3`}
            >
              <ImageIcon size={22} className="shrink-0" />
              <span className="font-semibold">
                Assets
              </span>
            </div>

            <div
              className={`rounded-xl border ${cardClass} h-24 px-5 flex items-center justify-center gap-3`}
            >
              <Layers size={22} className="shrink-0" />
              <span className="font-semibold">
                Compositing
              </span>
            </div>

            <div
              className={`rounded-xl border ${cardClass} h-24 px-5 flex items-center justify-center gap-3`}
            >
              <Sparkles size={22} className="shrink-0" />
              <span className="font-semibold">
                Thumbnails
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
                "/ps1.gif",
                "/ps2.gif",
                "/ps3.gif",
                "/ps4.gif",
              ].map((gif, index) => (
                <div
                  key={gif}
                  onClick={() => setSelectedImage(gif)}
                  className={`cursor-pointer overflow-hidden rounded-xl border ${borderClass} ${cardClass}`}
                >
                  <img
                    src={gif}
                    alt={`Photoshop Work ${index + 1}`}
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
                "Motion Graphics Assets",
                "PSD Composites",
                "Layered Artwork",
                "Cutouts",
                "UI Mockups",
                "Textures",
                "Social Media Graphics",
                "Photo Manipulation",
                "Channel Branding",
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
                  className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-zinc-900 hover:bg-zinc-700 text-white text-xl"
                >
                  ×
                </button>

                <img
                  src={selectedImage}
                  alt="Preview"
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