"use client"

import Image from "next/image"
import { Sparkles, Layers, Wand2, Mail } from "lucide-react"

interface AfterEffectsProps {
  isDarkMode?: boolean
  isMobile?: boolean
  hideAdobeHeader?: boolean
}

export default function AfterEffects({
  isDarkMode = true,
  isMobile = false,
  hideAdobeHeader = false,
}: AfterEffectsProps) {
  const borderClass = isDarkMode ? "border-zinc-700" : "border-gray-200"
  const hoverClass = isDarkMode ? "hover:bg-zinc-800" : "hover:bg-gray-100"
  const mutedTextClass = isDarkMode ? "text-zinc-400" : "text-zinc-600"
  const cardClass = isDarkMode
    ? "bg-zinc-800 border-zinc-700"
    : "bg-white border-gray-200 shadow-sm"

  const pillClass = isDarkMode ? "bg-zinc-800" : "bg-gray-100"
  const videos = [
    {
      title: "Apple Music UI",
      embed: "https://www.youtube.com/embed/xCuF4gisbJc?rel=0",
    },
    {
      title: "Newspaper Cutout - B roll",
      embed: "https://www.youtube.com/embed/VdNYaZsVRTg?rel=0",
    },
    {
      title: "Retro TV - News",
      embed: "https://www.youtube.com/embed/Rhef5voXc1I?rel=0",
    },
    {
      title: "Article on Blue Mat - B roll",
      embed: "https://www.youtube.com/embed/HlOH_RqeifU?rel=0",
    },
  ]

  return (
    <div
      className={`h-full flex flex-col ${isDarkMode ? "bg-zinc-900 text-white" : "bg-white text-black"
        }`}
    >
      {!hideAdobeHeader && (
        <div className={`h-12 border-b ${borderClass} px-4 flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <Image
              src="/aftereffects.png"
              alt="After Effects"
              width={28}
              height={28}
              className="object-contain"
            />

            <span className="font-medium">
              Adobe After Effects
            </span>
          </div>
          <button
            onClick={() =>
            (window.location.href =
              "mailto:pingmihir@outlook.com?subject=After Effects Inquiry")
            }
            className="flex items-center gap-2 px-3 py-1 rounded bg-indigo-700 hover:bg-indigo-600 transition"
          >
            <Mail size={16} />
            Connect
          </button>
        </div>
      )}
      {/* Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        {!isMobile && (
          <div className={`w-64 border-r ${borderClass} p-4`}>
            <div className="space-y-3">
              <button
                className={`w-full text-left px-3 py-2 rounded ${hoverClass}`}
              >
                Home
              </button>

              <button
                className={`w-full text-left px-3 py-2 rounded ${hoverClass}`}
              >
                Compositions
              </button>

              <button
                className={`w-full text-left px-3 py-2 rounded ${hoverClass}`}
              >
                Templates
              </button>

              <button
                className={`w-full text-left px-3 py-2 rounded ${hoverClass}`}
              >
                Motion Graphics
              </button>
            </div>
          </div>
        )}
        {/* Main Content */}
        <div
          className={`flex-1 overflow-auto ${isMobile ? "px-6 py-6" : "p-8"
            }`}
        >
          <div
            className={`flex items-center ${isMobile ? "gap-4 mb-6" : "gap-4 mb-8"
              }`}
          >
            <Image
              src="/aftereffects.png"
              alt="After Effects"
              width={isMobile ? 56 : 64}
              height={isMobile ? 56 : 64}
              className="shrink-0"
            />

            <div className="min-w-0">
              <h1 className={isMobile ? "text-2xl font-bold" : "text-3xl font-bold"}>
                After Effects
              </h1>

              <p className={mutedTextClass}>
                Motion Design • Visuals • Animation
              </p>
            </div>
          </div>

          {/* Compact Feature Cards */}
          <div
            className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-3 max-w-3xl"
              } gap-4 mb-10`}
          >
            <div
              className={`rounded-xl border ${cardClass} ${isMobile ? "h-16 flex-row gap-2" : "h-28 flex-col"
                } flex items-center justify-center`}
            >
              <Sparkles
                size={isMobile ? 18 : 24}
                strokeWidth={2}
                className={isMobile ? "" : "mb-2 shrink-0"}
              />
              <span
                className={`font-semibold text-center ${isMobile ? "text-[15px]" : "leading-tight"
                  }`}
              >
                {isMobile ? "Visual Effects" : <>Visual<br />Effects</>}
              </span>
            </div>

            <div
              className={`rounded-xl border ${cardClass} ${isMobile ? "h-16 flex-row gap-2" : "h-28 flex-col"
                } flex items-center justify-center`}
            >
              <Layers
                size={isMobile ? 18 : 24}
                strokeWidth={2}
                className={isMobile ? "" : "mb-2 shrink-0"}
              />
              <span
                className={`font-semibold text-center ${isMobile ? "text-[15px]" : "leading-tight"
                  }`}
              >
                {isMobile ? "Motion Graphics" : <>Motion<br />Graphics</>}
              </span>
            </div>

            <div
              className={`rounded-xl border ${cardClass} ${isMobile ? "h-16 flex-row gap-2" : "h-28 flex-col"
                } flex items-center justify-center`}
            >
              <Wand2
                size={isMobile ? 18 : 24}
                strokeWidth={2}
                className={isMobile ? "" : "mb-2 shrink-0"}
              />
              <span className={isMobile ? "text-[15px] font-semibold" : "font-semibold"}>
                Compositing
              </span>
            </div>
          </div>
          {/* Featured Work */}

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-6">
              Check Out
            </h2>

            <div className="space-y-10">

              {videos.map((video) => (
                <div
                  key={video.title}
                  className={`rounded-xl overflow-hidden border ${borderClass} ${cardClass}`}
                >
                  <iframe
                    className="block w-full aspect-video"
                    src={video.embed}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />

                  <div className="p-5">
                    <h3 className="text-xl font-semibold">
                      {video.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Services */}

          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-5">
              Services
            </h2>

            <div className="flex flex-wrap gap-3">
              {[
                "Motion Design",
                "2D Animation",
                "Explainer Videos",
                "Logo Animation",
                "YouTube Graphics",
                "Visual Effects",
                "Compositing",
                "Social Media Ads",
              ].map((skill) => (
                <div
                  key={skill}
                  className={`px-4 py-2 rounded-full text-sm ${pillClass}`}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>        </div>
      </div>
    </div>
  )
}