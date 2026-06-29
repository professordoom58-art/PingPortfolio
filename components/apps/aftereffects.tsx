"use client"

import Image from "next/image"
import { Sparkles, Layers, Wand2, Mail } from "lucide-react"

interface AfterEffectsProps {
  isDarkMode?: boolean
}

export default function AfterEffects({
  isDarkMode = true,
}: AfterEffectsProps) {
  const borderClass = isDarkMode ? "border-zinc-700" : "border-gray-200"
  const hoverClass = isDarkMode ? "hover:bg-zinc-800" : "hover:bg-gray-100"
  const mutedTextClass = isDarkMode ? "text-zinc-400" : "text-zinc-600"
  const cardClass = isDarkMode
    ? "bg-zinc-800 border-zinc-700"
    : "bg-white border-gray-200 shadow-sm"

  const pillClass = isDarkMode ? "bg-zinc-800" : "bg-gray-100"

  return (
    <div
      className={`h-full flex flex-col ${
        isDarkMode ? "bg-zinc-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Header */}
      <div
        className={`h-12 border-b ${borderClass} px-4 flex items-center justify-between`}
      >
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

      {/* Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
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

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-auto">
          <div className="flex items-center gap-5 mb-8">
            <Image
              src="/aftereffects.png"
              alt="After Effects"
              width={72}
              height={72}
            />

            <div>
              <h1 className="text-4xl font-bold">
                After Effects
              </h1>

              <p className={mutedTextClass}>
                Motion Design • Visual Effects • Animation
              </p>
            </div>
          </div>

          {/* Compact Feature Cards */}

<div className="grid grid-cols-3 gap-6 mb-10 max-w-3xl">
  <div
    className={`rounded-xl border ${cardClass} h-28 flex flex-col items-center justify-center`}
  >
    <Sparkles size={24} className="mb-2 shrink-0" />
    <span className="font-semibold text-center leading-tight">
      Visual
      <br />
      Effects
    </span>
  </div>

  <div
    className={`rounded-xl border ${cardClass} h-28 flex flex-col items-center justify-center`}
  >
    <Layers size={24} className="mb-2 shrink-0" />
    <span className="font-semibold text-center leading-tight">
      Motion
      <br />
      Graphics
    </span>
  </div>

  <div
    className={`rounded-xl border ${cardClass} h-28 flex flex-col items-center justify-center`}
  >
    <Wand2 size={24} className="mb-2 shrink-0" />
    <span className="font-semibold text-center leading-tight">
      Compositing
    </span>
  </div>
</div>
          {/* Featured Work */}
{/* Featured Work */}

<div className="mt-8">
  <h2 className="text-2xl font-semibold mb-6">
    Check Out My Skills
  </h2>

  <div className="space-y-10">

    {/* Video 1 */}
    <div className={`rounded-xl overflow-hidden border ${borderClass} ${cardClass}`}>
      <iframe
        className="block w-full aspect-video"
        src="https://www.youtube.com/embed/xCuF4gisbJc?rel=0"
        title="Apple Music UI"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
      <div className="p-5">
        <h3 className="text-xl font-semibold">
          Apple Music UI
        </h3>
      </div>
    </div>

    {/* Video 2 */}
    <div className={`rounded-xl overflow-hidden border ${borderClass} ${cardClass}`}>
      <iframe
        className="block w-full aspect-video"
        src="https://www.youtube.com/embed/VdNYaZsVRTg?rel=0"
        title="Newspaper Cutout B-roll"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
      <div className="p-5">
        <h3 className="text-xl font-semibold">
          Newspaper Cutout B-roll
        </h3>
      </div>
    </div>

    {/* Video 3 */}
    <div className={`rounded-xl overflow-hidden border ${borderClass} ${cardClass}`}>
      <iframe
        className="block w-full aspect-video"
        src="https://www.youtube.com/embed/Rhef5voXc1I?rel=0"
        title="Retro TV - NEWS"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
      <div className="p-5">
        <h3 className="text-xl font-semibold">
          Retro TV - NEWS
        </h3>
      </div>
    </div>

    {/* Video 4 */}
    <div className={`rounded-xl overflow-hidden border ${borderClass} ${cardClass}`}>
      <iframe
        className="block w-full aspect-video"
        src="https://www.youtube.com/embed/HlOH_RqeifU?rel=0"
        title="Article on Blue Mat - B roll"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
      <div className="p-5">
        <h3 className="text-xl font-semibold">
          Article on Blue Mat - B roll
        </h3>
      </div>
    </div>

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