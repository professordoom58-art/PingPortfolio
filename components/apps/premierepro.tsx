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
          {/* Editing Dashboard */}

          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-5">
              Editing Workspace
            </h2>

            {/* Timeline Mockup */}

            <div
              className={`rounded-xl border p-6 ${cardClass} mb-6 overflow-hidden`}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-lg">
                  Editing Timeline
                </h3>

                <span className={`text-sm ${mutedTextClass}`}>
                  Creatively Processing...
                </span>
              </div>

              <div className="space-y-5">
                {[
                  { label: "Narrative Cut", width: "92%" },
                  { label: "Motion Graphics", width: "74%" },
                  { label: "Sound Design", width: "100%" },
                ].map((track) => (
                  <div key={track.label} className="flex items-center gap-4">
                    <span className={`w-36 text-sm ${mutedTextClass}`}>
                      {track.label}
                    </span>

                    <div className="flex-1 h-8 bg-zinc-900 rounded overflow-hidden relative">
                      <div
                        className="h-full rounded bg-gradient-to-r from-purple-700 via-fuchsia-500 to-violet-400"
                        style={{ width: track.width }}
                      />

                      <div className="absolute left-[72%] top-0 bottom-0 w-[2px] bg-white/80" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-between text-xs text-zinc-500">
                <span>00:00</span>
                <span>02:30</span>
                <span>05:00</span>
                <span>07:30</span>
                <span>10:00</span>
              </div>
            </div>

            {/* Stats */}

            <div className="grid grid-cols-3 gap-5">
              <div className={`rounded-xl border p-6 text-center ${cardClass}`}>
                <h3 className="text-4xl font-bold text-purple-400">
                  1000+
                </h3>

                <p className={`mt-2 ${mutedTextClass}`}>
                  Hours Edited
                </p>
              </div>

              <div className={`rounded-xl border p-6 text-center ${cardClass}`}>
                <h3 className="text-4xl font-bold text-purple-400">
                  35+
                </h3>

                <p className={`mt-2 ${mutedTextClass}`}>
                  Projects
                </p>
              </div>

              <div className={`rounded-xl border p-6 text-center ${cardClass}`}>
                <h3 className="text-4xl font-bold text-purple-400">
                  4+
                </h3>

                <p className={`mt-2 ${mutedTextClass}`}>
                  Years Learning
                </p>

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
      </div >
    </div >
  )
}
