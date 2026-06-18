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
  const cardClass = isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-white border-gray-200 shadow-sm"
  const pillClass = isDarkMode ? "bg-zinc-800" : "bg-gray-100"

  return (
    <div
      className={`h-full flex flex-col ${
        isDarkMode
          ? "bg-zinc-900 text-white"
          : "bg-white text-black"
      }`}
    >
      {/* Header */}
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

      {/* Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className={`w-64 border-r ${borderClass} p-4`}>
          <div className="space-y-3">
            <button className={`w-full text-left px-3 py-2 rounded ${hoverClass}`}>
              Home
            </button>

            <button className={`w-full text-left px-3 py-2 rounded ${hoverClass}`}>
              Compositions
            </button>

            <button className={`w-full text-left px-3 py-2 rounded ${hoverClass}`}>
              Templates
            </button>

            <button className={`w-full text-left px-3 py-2 rounded ${hoverClass}`}>
              Motion Graphics
            </button>
          </div>
        </div>

        {/* Main Area */}
        <div className="flex-1 p-8 overflow-auto">
          <div className="flex items-center gap-4 mb-8">
            <Image
              src="/aftereffects.png"
              alt="After Effects"
              width={64}
              height={64}
              className="object-contain"
            />

            <div>
              <h1 className="text-3xl font-bold">
                After Effects
              </h1>
              <p className={mutedTextClass}>
                Motion Design • Visual Effects • Animation
              </p>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className={`rounded-xl border p-6 ${cardClass}`}>
              <Sparkles size={32} className="mb-4" />
              <h2 className="font-semibold mb-2">
                Visual Effects
              </h2>
              <p className={`text-sm ${mutedTextClass}`}>
                Create cinematic effects, compositing and advanced visual sequences.
              </p>
            </div>

            <div className={`rounded-xl border p-6 ${cardClass}`}>
              <Layers size={32} className="mb-4" />
              <h2 className="font-semibold mb-2">
                Motion Graphics
              </h2>
              <p className={`text-sm ${mutedTextClass}`}>
                Build animated titles, lower thirds and branding systems.
              </p>
            </div>

            <div className={`rounded-xl border p-6 ${cardClass}`}>
              <Wand2 size={32} className="mb-4" />
              <h2 className="font-semibold mb-2">
                Compositing
              </h2>
              <p className={`text-sm ${mutedTextClass}`}>
                Combine footage, graphics and effects into polished scenes.
              </p>
            </div>
          </div>

          {/* Portfolio Section */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">
              Featured Motion Work
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="aspect-video rounded-xl bg-gradient-to-br from-indigo-900 via-purple-800 to-black flex items-center justify-center">
                <span className="text-lg font-medium">
                  Motion Graphics Reel
                </span>
              </div>

              <div className="aspect-video rounded-xl bg-gradient-to-br from-violet-900 via-indigo-800 to-black flex items-center justify-center">
                <span className="text-lg font-medium">
                  VFX Showcase
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
          </div>
        </div>
      </div>
    </div>
  )
}
