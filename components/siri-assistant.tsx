"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUp, Sparkles } from "lucide-react"

export interface AssistantReply {
  text: string
  /** Optional app to launch when the visitor clicks through. */
  launch?: { id: string; title: string; component: string }
}

interface SiriAssistantProps {
  onClose: () => void
  onLaunchApp: (app: { id: string; title: string; component: string }) => void
}

const QUICK_PROMPTS = [
  "Who is Mihir Suthar?",
  "Show Premiere Pro & AE work",
  "How can I hire/contact Mihir?",
]

/**
 * Answers are derived from the portfolio's own content (the Notes app copy and
 * the contact details used across the site), not invented.
 */
function answer(query: string): AssistantReply {
  const q = query.toLowerCase()

  if (q.includes("contact") || q.includes("hire") || q.includes("email") || q.includes("reach")) {
    return {
      text: "Email pingmihir@outlook.com, or use the Mail app in the dock. He is open to freelance editing, motion design and brand work.",
      launch: { id: "mail", title: "Mail", component: "Mail" },
    }
  }

  if (q.includes("premiere") || q.includes("after effects") || q.includes("ae") || q.includes("video") || q.includes("edit")) {
    return {
      text: "Mihir edits narrative, long-form and explainer video in Premiere Pro, and builds motion graphics, VFX and logo animation in After Effects. Over 1000 hours edited across 35+ projects.",
      launch: { id: "premiere", title: "Premiere Pro", component: "PremierePro" },
    }
  }

  if (q.includes("photoshop") || q.includes("illustrator") || q.includes("design") || q.includes("thumbnail")) {
    return {
      text: "Design work covers Photoshop and Illustrator: thumbnails, brand assets, social creatives and marketing visuals.",
      launch: { id: "photoshop", title: "Photoshop", component: "Photoshop" },
    }
  }

  if (q.includes("skill") || q.includes("stack") || q.includes("tool")) {
    return {
      text: "Creative: Premiere Pro, After Effects, Photoshop, Illustrator. Technical: React, Next.js, TypeScript, Git, and AI-assisted workflows.",
    }
  }

  if (q.includes("who") || q.includes("mihir") || q.includes("about") || q.includes("portfolio")) {
    return {
      text: "Mihir Suthar is a video editor, motion designer and creative developer. He helps creators, brands and businesses tell better stories through editing, animation and design.",
      launch: { id: "notes", title: "Notes", component: "Notes" },
    }
  }

  return {
    text: "I can tell you about Mihir's editing and motion design work, his design skills, or how to get in touch. Try one of the suggestions below.",
  }
}

export default function SiriAssistant({ onClose, onLaunchApp }: SiriAssistantProps) {
  const [query, setQuery] = useState("")
  const [reply, setReply] = useState<AssistantReply | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    inputRef.current?.focus()

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    const handleClickOutside = (e: MouseEvent) => {
      // Let the menu-bar orb handle its own toggle instead of closing here
      // and immediately reopening on the following click event.
      if ((e.target as HTMLElement)?.closest?.('[aria-label="Siri"]')) return
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) onClose()
    }

    window.addEventListener("keydown", handleKey)
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      window.removeEventListener("keydown", handleKey)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  const ask = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setQuery(trimmed)
    setReply(answer(trimmed))
  }

  return (
    <div
      ref={panelRef}
      className="fixed right-3 top-9 z-[100] w-[320px] origin-top-right animate-in select-none overflow-hidden rounded-[24px] border border-white/15 bg-[#1c1c22]/85 p-4 text-white shadow-[0_24px_60px_rgba(0,0,0,0.65),0_0_25px_rgba(168,85,247,0.18),inset_0_1px_0.5px_rgba(255,255,255,0.2)] backdrop-blur-3xl duration-150 fade-in zoom-in-95"
    >
      {/* Contained Apple Intelligence ambient glow — clipped by overflow-hidden */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-cyan-400/20 blur-2xl"
      />

      <div className="relative z-10">
        <div className="mb-3 flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-[#ff4593] via-[#a855f7] to-[#38bdf8]">
            <Sparkles className="h-3 w-3 text-white" />
          </span>
          <span className="text-[13px] font-semibold">Apple Intelligence</span>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            ask(query)
          }}
          className="mb-3 flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 transition-all focus-within:border-purple-400/60 focus-within:shadow-[0_0_15px_rgba(168,85,247,0.25)]"
        >
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about Mihir..."
            className="w-full bg-transparent text-[13px] text-white outline-none placeholder:text-white/45"
          />
          <button
            type="submit"
            aria-label="Ask"
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-[#007AFF]"
          >
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </form>

        {reply ? (
          <div className="mb-3 rounded-[14px] border border-white/10 bg-white/5 p-3">
            <p className="text-[12.5px] leading-relaxed text-white/90">{reply.text}</p>
            {reply.launch && (
              <button
                onClick={() => {
                  onLaunchApp(reply.launch!)
                  onClose()
                }}
                className="mt-2.5 rounded-[7px] bg-[#007AFF] px-3 py-1 text-[12px] font-medium text-white transition-colors hover:bg-[#0071e3]"
              >
                Open {reply.launch.title}
              </button>
            )}
          </div>
        ) : (
          <p className="mb-3 text-[12px] leading-relaxed text-white/50">
            Ask about Mihir&apos;s work, skills, or how to get in touch.
          </p>
        )}

        <div className="space-y-1.5">
          {QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => ask(prompt)}
              className="group flex w-full items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.06] px-3.5 py-2 text-left text-[13px] font-medium text-white/90 transition-all hover:bg-white/[0.12] active:scale-[0.99]"
            >
              <span>{prompt}</span>
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-purple-400 opacity-70 transition-opacity group-hover:opacity-100" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
