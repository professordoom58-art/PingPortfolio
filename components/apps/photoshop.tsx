"use client"

import Image from "next/image"
import { useState } from "react"
import { ImageIcon, Brush, Layers, Sparkles, Mail } from "lucide-react"

interface PhotoshopProps {
  isDarkMode?: boolean
  isMobile?: boolean
  hideAdobeHeader?: boolean
}

export default function Photoshop({
  isDarkMode = true,
  isMobile = false,
  hideAdobeHeader = false,
}: PhotoshopProps) {
  const borderClass = isDarkMode ? "border-zinc-700" : "border-gray-200"
  const hoverClass = isDarkMode ? "hover:bg-zinc-800" : "hover:bg-gray-100"
  const mutedTextClass = isDarkMode ? "text-zinc-400" : "text-zinc-600"
  const cardClass = isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-white border-gray-200 shadow-sm"
  const pillClass = isDarkMode ? "bg-zinc-800" : "bg-gray-100"
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <div className={`h-full flex flex-col ${isDarkMode ? "bg-zinc-900 text-white" : "bg-white text-black"}`}>
      {!hideAdobeHeader && (
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
      )}

      <div className="flex flex-1">
        {!isMobile && (
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
        )}

        <div className="flex-1 p-8 overflow-auto">
          <div
            className={`flex items-center ${isMobile ? "gap-3 mb-6" : "gap-4 mb-8"
              }`}
          >
            <Image
              src="/photoshop.png"
              alt="Photoshop"
              width={isMobile ? 56 : 64}
              height={isMobile ? 56 : 64}
            />

            <div>
              <h1 className={isMobile ? "text-2xl font-bold" : "text-3xl font-bold"}>
                Photoshop
              </h1>
              <p className={mutedTextClass}>
                Assets • Thumbnails • Compositing
              </p>
            </div>
          </div>

          {/* Expertise */}
          <div
            className={`grid ${isMobile
              ? "grid-cols-1"
              : "md:grid-cols-3 max-w-4xl"
              } gap-4 mb-10`}
          >
            <div
              className={`rounded-xl border ${cardClass} ${isMobile ? "h-16 gap-2" : "h-24 gap-3 px-5"
                } flex items-center justify-center`}
            >
              <ImageIcon
                size={isMobile ? 18 : 22}
                strokeWidth={2}
                className="shrink-0"
              />
              <span className={isMobile ? "text-[15px] font-semibold" : "font-semibold"}>
                Assets
              </span>
            </div>

            <div
              className={`rounded-xl border ${cardClass} ${isMobile ? "h-16 gap-2" : "h-24 gap-3 px-5"
                } flex items-center justify-center`}
            >
              <Layers
                size={isMobile ? 18 : 22}
                strokeWidth={2}
                className="shrink-0"
              />
              <span className={isMobile ? "text-[15px] font-semibold" : "font-semibold"}>
                Compositing
              </span>
            </div>

            <div
              className={`rounded-xl border ${cardClass} ${isMobile ? "h-16 gap-2" : "h-24 gap-3 px-5"
                } flex items-center justify-center`}
            >
              <Sparkles
                size={isMobile ? 18 : 22}
                strokeWidth={2}
                className="shrink-0"
              />
              <span className={isMobile ? "text-[15px] font-semibold" : "font-semibold"}>
                Thumbnails
              </span>
            </div>
          </div>
          {/* Portfolio */}

          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-5">
              Check Out
            </h2>

            <div
              className={
                isMobile
                  ? "space-y-5"
                  : "grid grid-cols-2 gap-5"
              }
            >
              {[
                "/ps1.gif",
                "/ps2.gif",
                "/ps3.gif",
                "/ps4.gif",
              ].map((gif, index) => (
                <div
                  key={gif}
                  onClick={() => setSelectedImage(gif)}
                  className={`group cursor-pointer overflow-hidden ${isMobile ? "rounded-2xl" : "rounded-xl"
                    }`}
                >
                  <img
                    src={gif}
                    alt="Photoshop Work"
                    className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${isMobile ? "h-52" : "aspect-video"
                      }`}
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
              className={`fixed inset-0 z-[9999] bg-black/70 backdrop-blur-md flex ${isMobile
                ? "items-center justify-center p-4"
                : "items-center justify-center"
                }`}
              onClick={() => setSelectedImage(null)}
            >
              <div
                className={`relative bg-zinc-900 ${isMobile
                  ? "w-[94vw] max-w-md rounded-3xl p-4"
                  : "max-w-6xl w-full rounded-2xl p-6"
                  }`}
                onClick={(e) => e.stopPropagation()}
              >
                {!isMobile && (
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 w-7 h-7 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors"
                  >
                    ×
                  </button>
                )}

                <img
                  src={selectedImage}
                  alt="Preview"
                  className={`w-full object-contain ${isMobile
                    ? "rounded-2xl"
                    : "max-h-[70vh] rounded-xl"
                    }`}
                />

                {!isMobile && (
                  <div className="mt-5 text-center">
                    <p className="text-zinc-400">
                      Created using Adobe Photoshop
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div >
  )
}