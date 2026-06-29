"use client"

import Image from "next/image"
import { Video, FolderOpen, Clock, Mail } from "lucide-react"

interface PremiereProProps {
  isDarkMode?: boolean
}

export default function PremierePro({
  isDarkMode = true,
}: PremiereProProps) {
  const borderClass = isDarkMode ? "border-zinc-700" : "border-gray-200"
  const hoverClass = isDarkMode ? "hover:bg-zinc-800" : "hover:bg-gray-100"
  const mutedTextClass = isDarkMode ? "text-zinc-400" : "text-zinc-600"
  const cardClass = isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-white border-gray-200 shadow-sm"
  const pillClass = isDarkMode ? "bg-zinc-800" : "bg-gray-100"

  return (
    <div
      className={`h-full flex flex-col ${isDarkMode
        ? "bg-zinc-900 text-white"
        : "bg-white text-black"
        }`}
    >
      {/* Header */}
      <div className={`h-12 border-b ${borderClass} px-4 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <Image
            src="/premiere.png"
            alt="Premiere Pro"
            width={28}
            height={28}
            className="object-contain"
          />
          <span className="font-medium">
            Adobe Premiere Pro
          </span>
        </div>

        <button
          onClick={() =>
          (window.location.href =
            "mailto:pingmihir@outlook.com?subject=Premiere Pro Inquiry")
          }
          className="flex items-center gap-2 px-3 py-1 rounded bg-purple-700 hover:bg-purple-600 transition"
        >
          <Mail size={16} />
          Connect
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className={`w-64 border-r ${borderClass} p-4`}>
          <div className="flex flex-col gap-2">
            <button className={`text-left px-3 py-2 rounded ${hoverClass}`}>
              Home
            </button>

            <button className={`text-left px-3 py-2 rounded ${hoverClass}`}>
              Projects
            </button>

            <button className={`text-left px-3 py-2 rounded ${hoverClass}`}>
              Templates
            </button>

            <button className={`text-left px-3 py-2 rounded ${hoverClass}`}>
              Learn
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-auto">
          <div className="flex items-center gap-4 mb-8">
            <Image
              src="/premiere.png"
              alt="Premiere Pro"
              width={64}
              height={64}
              className="object-contain"
            />

            <div>
              <h1 className="text-3xl font-bold">
                Premiere Pro
              </h1>
              <p className={mutedTextClass}>
                Documentary • Long-Form • Storytelling
              </p>
            </div>
          </div>

          {/* Expertise */}

          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mb-10">
            <div
              className={`rounded-xl border ${cardClass} h-24 px-5 flex items-center justify-center gap-3`}
            >
              <Video size={22} className="shrink-0" />
              <span className="font-semibold">
                Documentary
              </span>
            </div>

            <div
              className={`rounded-xl border ${cardClass} h-24 px-5 flex items-center justify-center gap-3`}
            >
              <FolderOpen size={22} className="shrink-0" />
              <span className="font-semibold">
                Explainers
              </span>
            </div>

            <div
              className={`rounded-xl border ${cardClass} h-24 px-5 flex items-center justify-center gap-3`}
            >
              <Clock size={22} className="shrink-0" />
              <span className="font-semibold">
                Narrative
              </span>
            </div>
          </div>
          {/* Portfolio Section */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">
              Featured Projects
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="aspect-video rounded-xl bg-gradient-to-br from-purple-900 via-purple-700 to-black flex items-center justify-center">
                <span className="text-lg font-medium">
                  Commercial Edit
                </span>
              </div>

              <div className="aspect-video rounded-xl bg-gradient-to-br from-indigo-900 via-purple-800 to-black flex items-center justify-center">
                <span className="text-lg font-medium">
                  Documentary Reel
                </span>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">
              Services
            </h2>

            <div className="flex flex-wrap gap-3">
              {[
                "Video Editing",
                "YouTube Videos",
                "Short Form Content",
                "Commercial Ads",
                "Color Correction",
                "Sound Design",
                "Motion Graphics",
                "Documentaries",
              ].map((service) => (
                <div
                  key={service}
                  className={`px-4 py-2 rounded-full text-sm ${pillClass}`}
                >
                  {service}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
