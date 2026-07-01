"use client"

import Image from "next/image"
import { Video, FolderOpen, Clock, Mail } from "lucide-react"

interface PremiereProProps {
  isDarkMode?: boolean
  isMobile?: boolean
  hideAdobeHeader?: boolean
}

export default function PremierePro({
  isDarkMode = true,
  isMobile = false,
  hideAdobeHeader = false,
}: PremiereProProps) {
  const borderClass = isDarkMode
    ? "border-zinc-700"
    : "border-gray-200"

  const hoverClass = isDarkMode
    ? "hover:bg-zinc-800"
    : "hover:bg-gray-100"

  const mutedTextClass = isDarkMode
    ? "text-zinc-400"
    : "text-zinc-600"

  const cardClass = isDarkMode
    ? "bg-zinc-800 border-zinc-700"
    : "bg-white border-gray-200 shadow-sm"

  const pillClass = isDarkMode
    ? "bg-zinc-800"
    : "bg-gray-100"

  return (
    <div
      className={`h-full flex flex-col ${isDarkMode
        ? "bg-zinc-900 text-white"
        : "bg-white text-black"
        }`}
    >
      {/* Desktop Header */}

      {!hideAdobeHeader && (
        <div
          className={`h-12 border-b ${borderClass} px-4 flex items-center justify-between`}
        >
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
      )}

      {/* Body */}

      <div className="flex flex-1">

        {/* Sidebar */}

        {!isMobile && (
          <div
            className={`w-64 border-r ${borderClass} p-4`}
          >
            <div className="flex flex-col gap-2">

              <button
                className={`text-left px-3 py-2 rounded ${hoverClass}`}
              >
                Home
              </button>

              <button
                className={`text-left px-3 py-2 rounded ${hoverClass}`}
              >
                Projects
              </button>

              <button
                className={`text-left px-3 py-2 rounded ${hoverClass}`}
              >
                Templates
              </button>

              <button
                className={`text-left px-3 py-2 rounded ${hoverClass}`}
              >
                Learn
              </button>

            </div>
          </div>
        )}

        {/* Main */}

        <div
          className={`flex-1 overflow-auto ${isMobile
            ? "px-6 py-6"
            : "p-8"
            }`}
        >

          {/* Hero */}

          <div
            className={`flex items-center ${isMobile ? "gap-4 mb-6" : "gap-4 mb-8"
              }`}
          >

            <Image
              src="/premiere.png"
              alt="Premiere Pro"
              width={isMobile ? 56 : 64}
              height={isMobile ? 56 : 64}
            />

            <div className="flex-1 min-w-0">

              <h1
                className={`font-bold ${isMobile
                  ? "text-2xl"
                  : "text-3xl"
                  }`}
              >
                Premiere Pro
              </h1>

              <p className={mutedTextClass}>
                Narrative • Long-Form • Explainer
              </p>

            </div>

          </div>

          {/* Expertise */}
          <div
            className={`grid ${isMobile
              ? "grid-cols-1"
              : "md:grid-cols-3"
              } gap-4 max-w-4xl mb-10`}
          >
            <div
              className={`rounded-xl border ${cardClass} ${isMobile ? "h-16 gap-2" : "h-20 gap-3"
                } flex items-center justify-center`}
            >
              <Video
                size={isMobile ? 18 : 22}
                strokeWidth={2}
              />
              <span className={isMobile ? "text-[15px] font-semibold" : "font-semibold"}>
                Documentary
              </span>
            </div>

            <div
              className={`rounded-xl border ${cardClass} ${isMobile ? "h-16 gap-2" : "h-20 gap-3"
                } flex items-center justify-center`}
            >
              <FolderOpen
                size={isMobile ? 18 : 22}
                strokeWidth={2}
              />
              <span className={isMobile ? "text-[15px] font-semibold" : "font-semibold"}>
                Explainers
              </span>
            </div>

            <div
              className={`rounded-xl border ${cardClass} ${isMobile ? "h-16 gap-2" : "h-20 gap-3"
                } flex items-center justify-center`}
            >
              <Clock
                size={isMobile ? 18 : 22}
                strokeWidth={2}
              />
              <span className={isMobile ? "text-[15px] font-semibold" : "font-semibold"}>
                Narrative
              </span>
            </div>
          </div>
          {/* Editing Dashboard */}

          {isMobile ? (

            <div className="mt-10">

              <h2 className="text-xl font-semibold mb-5">
                Editing Workspace
              </h2>

              <div className={`rounded-2xl border p-5 ${cardClass}`}>

                <div className="flex items-center justify-between mb-6">

                  <div>

                    <p className={`text-sm ${mutedTextClass}`}>
                      Current Project
                    </p>

                    <h3 className="text-xl font-semibold">
                      Documentary Edit
                    </h3>

                  </div>

                  <div className="text-right">

                    <p className="text-3xl font-bold text-purple-400">
                      92%
                    </p>

                    <p className={`text-xs ${mutedTextClass}`}>
                      Complete
                    </p>

                  </div>

                </div>

                {[
                  {
                    label: "Narrative Cut",
                    value: 92,
                  },
                  {
                    label: "Motion Graphics",
                    value: 74,
                  },
                  {
                    label: "Sound Design",
                    value: 100,
                  },
                ].map((item) => (

                  <div
                    key={item.label}
                    className="mb-5"
                  >

                    <div className="flex justify-between mb-2">

                      <span>
                        {item.label}
                      </span>

                      <span className={mutedTextClass}>
                        {item.value}%
                      </span>

                    </div>

                    <div className="h-3 rounded-full bg-zinc-900 overflow-hidden">

                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-700 via-fuchsia-500 to-violet-400"
                        style={{
                          width: `${item.value}%`,
                        }}
                      />

                    </div>

                  </div>

                ))}

                <div className="mt-8 border-t border-zinc-700 pt-5">

                  <div className="flex justify-between">

                    <div>

                      <p className={`text-sm ${mutedTextClass}`}>
                        Export
                      </p>

                      <p className="font-medium">
                        H.264 • 4K
                      </p>

                    </div>

                    <div className="text-right">

                      <p className={`text-sm ${mutedTextClass}`}>
                        ETA
                      </p>

                      <p className="font-medium">
                        37 min
                      </p>

                    </div>

                  </div>

                </div>

              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">

                <div className={`rounded-2xl border p-5 ${cardClass}`}>

                  <h3 className="text-3xl font-bold text-purple-400">
                    1000+
                  </h3>

                  <p className={`mt-2 text-sm ${mutedTextClass}`}>
                    Hours Edited
                  </p>

                </div>

                <div className={`rounded-2xl border p-5 ${cardClass}`}>

                  <h3 className="text-3xl font-bold text-purple-400">
                    35+
                  </h3>

                  <p className={`mt-2 text-sm ${mutedTextClass}`}>
                    Projects
                  </p>

                </div>

                <div className={`rounded-2xl border p-5 col-span-2 ${cardClass}`}>

                  <h3 className="text-3xl font-bold text-purple-400">
                    4+
                  </h3>

                  <p className={`mt-2 text-sm ${mutedTextClass}`}>
                    Years Learning
                  </p>

                </div>

              </div>

            </div>

          ) : (

            <div className="mt-10">

              <h2 className="text-xl font-semibold mb-5">
                Editing Workspace
              </h2>

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
                    {
                      label: "Narrative Cut",
                      width: "92%",
                    },
                    {
                      label: "Motion Graphics",
                      width: "74%",
                    },
                    {
                      label: "Sound Design",
                      width: "100%",
                    },
                  ].map((track) => (

                    <div
                      key={track.label}
                      className="flex items-center gap-4"
                    >

                      <span className={`w-36 text-sm ${mutedTextClass}`}>
                        {track.label}
                      </span>

                      <div className="flex-1 h-8 bg-zinc-900 rounded overflow-hidden relative">

                        <div
                          className="h-full rounded bg-gradient-to-r from-purple-700 via-fuchsia-500 to-violet-400"
                          style={{
                            width: track.width,
                          }}
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

                <div
                  className={`rounded-xl border ${cardClass} h-20 flex flex-col items-center justify-center`}
                >
                  <h3 className="text-4xl font-bold text-purple-400">4+</h3>
                  <p className="text-zinc-400">Years Learning</p>
                </div>

              </div>

            </div>

          )}
          {/* Services */}

          <div className="mt-10">

            <h2 className="text-xl font-semibold mb-5">
              Services
            </h2>

            <div
              className={`flex flex-wrap ${isMobile ? "gap-2" : "gap-3"
                }`}
            >

              {[
                "Video Editing",
                "YouTube Videos",
                "Short Form",
                "Documentaries",
                "Explainers",
                "Motion Graphics",
                "Color Correction",
                "Sound Design",
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