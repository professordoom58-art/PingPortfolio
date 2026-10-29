"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

interface TerminalProps {
  isMobile?: boolean
}

type Line =
  | { type: "cmd"; text: string; time: string }
  | { type: "out"; text: string }
  | { type: "neofetch" }

const NEOFETCH_SPECS: [string, string][] = [
  ["OS", "macOS Tahoe 26.0 arm64"],
  ["Host", "MacBookPro18,2 (Portfolio Edition)"],
  ["Kernel", "24.1.0-creative"],
  ["Uptime", "4+ years, 1000+ hours edited"],
  ["Packages", "35+ (projects), 6 (adobe-suite)"],
  ["Shell", "zsh 5.9"],
  ["Resolution", "3840x2160@60fps (4K Timeline)"],
  ["DE", "Aqua / Liquid Glass"],
  ["WM", "Quartz Compositor"],
  ["Terminal", "Apple_Terminal"],
  ["Terminal Font", "SFMono-Regular"],
  ["CPU", "Apple M4 Max (16) @ 4.50GHz"],
  ["GPU", "After Effects & Premiere Pro Engine"],
  ["Memory", "16384MiB / 65536MiB"],
]

const PALETTE_ROW_1 = [
  "bg-neutral-700",
  "bg-red-500",
  "bg-emerald-500",
  "bg-yellow-400",
  "bg-blue-500",
  "bg-fuchsia-500",
  "bg-cyan-400",
  "bg-neutral-200",
]

const PALETTE_ROW_2 = [
  "bg-neutral-500",
  "bg-red-400",
  "bg-emerald-400",
  "bg-yellow-300",
  "bg-blue-400",
  "bg-fuchsia-400",
  "bg-cyan-300",
  "bg-white",
]

function Neofetch() {
  return (
    <div className="my-2 flex flex-col items-start gap-6 font-mono text-[12px] leading-[1.2] sm:flex-row">
      {/* Rainbow Apple logo */}
      <pre className="shrink-0 whitespace-pre text-[12px] leading-[1.2]">
        <span className="text-[#4EBA6F]">
          {`                    'c.
                 ,xNMM.
               .OMMMMo
               OMMM0,
     .;loddo:' loolloddol;.
   cKMMMMMMMMMMNWMMMMMMMMMM0:
`}
        </span>
        <span className="text-[#F2C94C]">
          {` .KMMMMMMMMMMMMMMMMMMMMMMMWd.
 XMMMMMMMMMMMMMMMMMMMMMMMX.
`}
        </span>
        <span className="text-[#EB5757]">
          {`;MMMMMMMMMMMMMMMMMMMMMMMM:
:MMMMMMMMMMMMMMMMMMMMMMMM:
.MMMMMMMMMMMMMMMMMMMMMMMMMX.
 kMMMMMMMMMMMMMMMMMMMMMMMMWd.
`}
        </span>
        <span className="text-[#BB6BD9]">
          {` .XMMMMMMMMMMMMMMMMMMMMMMMMMMk
  .XMMMMMMMMMMMMMMMMMMMMMMMMK.
`}
        </span>
        <span className="text-[#56CCF2]">
          {`    kMMMMMMMMMMMMMMMMMMMMMMd
     ;KMMMMMMMWXXWMMMMMMMk.
       .cooc,.    .,coo:.`}
        </span>
      </pre>

      {/* System + portfolio specs */}
      <div className="min-w-0 flex-1">
        <div className="font-bold">
          <span className="text-[#4EBA6F]">mihir</span>
          <span className="text-white">@</span>
          <span className="text-[#4EBA6F]">MacBook-Pro</span>
        </div>
        <div className="mb-1 text-white/40">-----------------</div>

        <div className="space-y-0.5">
          {NEOFETCH_SPECS.map(([label, value]) => (
            <div key={label} className="flex gap-2">
              <span className="shrink-0 font-bold text-[#F2C94C]">{label}:</span>
              <span className="min-w-0 break-words text-white/90">{value}</span>
            </div>
          ))}
        </div>

        {/* ANSI color blocks */}
        <div className="mt-3 flex flex-col">
          <div className="flex">
            {PALETTE_ROW_1.map((color) => (
              <span key={color} className={`h-3.5 w-6 ${color}`} />
            ))}
          </div>
          <div className="flex">
            {PALETTE_ROW_2.map((color) => (
              <span key={color} className={`h-3.5 w-6 ${color}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Terminal({}: TerminalProps) {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<Line[]>([
    { type: "cmd", text: "neofetch", time: "10:38:03" },
    { type: "neofetch" },
  ])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [promptTime, setPromptTime] = useState("10:38:03")
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setPromptTime(
        new Date().toLocaleTimeString("en-GB", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      )
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      executeCommand(input)
      setCommandHistory((prev) => [...prev, input])
      setHistoryIndex(-1)
      setInput("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      navigateHistory(-1)
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      navigateHistory(1)
    }
  }

  const navigateHistory = (direction: number) => {
    if (commandHistory.length === 0) return

    const newIndex = historyIndex + direction

    if (newIndex >= commandHistory.length) {
      setHistoryIndex(-1)
      setInput("")
    } else if (newIndex >= 0) {
      setHistoryIndex(newIndex)
      setInput(commandHistory[commandHistory.length - 1 - newIndex])
    }
  }

  const pushOutput = (lines: string[]) => {
    setHistory((prev) => [...prev, ...lines.map((text) => ({ type: "out" as const, text }))])
  }

  const executeCommand = (cmd: string) => {
    const command = cmd.trim()
    const args = command.split(/\s+/)
    const mainCommand = args[0].toLowerCase()

    setHistory((prev) => [...prev, { type: "cmd", text: command, time: promptTime }])

    switch (mainCommand) {
      case "neofetch":
        setHistory((prev) => [...prev, { type: "neofetch" }])
        break

      case "help":
        pushOutput([
          "Available commands:",
          "  neofetch  — Show device & portfolio information",
          "  help      — Show this help message",
          "  skills    — My creative & technical skills",
          "  projects  — Selected projects",
          "  whoami    — Show current user",
          "  contact   — Contact information",
          "  about     — About me",
          "  echo      — Print text",
          "  date      — Show current date and time",
          "  ls        — List files",
          "  clear     — Clear the terminal",
          "",
        ])
        break

      case "clear":
        setHistory([])
        break

      case "echo":
        pushOutput([args.slice(1).join(" "), ""])
        break

      case "date":
        pushOutput([new Date().toString(), ""])
        break

      case "ls":
        pushOutput(["Documents", "Projects", "Downloads", "Desktop", "Music", "Pictures", "Videos", ""])
        break

      case "whoami":
        pushOutput(["mihir", ""])
        break

      case "about":
        pushOutput([
          "┌─────────────────────────────────────┐",
          "│ Mihir Suthar                        │",
          "│ Video Editor & Motion Designer      │",
          "└─────────────────────────────────────┘",
          "",
          "I'm a passionate video editor and motion designer with expertise in",
          "creating compelling visual content that captures attention and communicates ideas clearly.",
          "",
          "I work across Premiere Pro, After Effects,",
          "Photoshop, and Illustrator to transform",
          "raw footage and concepts into polished",
          "videos, social content, advertisements,",
          "and visual experiences.",
          "",
          "My goal is simple:",
          "help brands, creators, and businesses",
          "tell better stories through design,",
          "motion, and thoughtful execution.",
          "",
        ])
        break

      case "skills":
        pushOutput([
          "┌──────────────┐",
          "│   Skills     │",
          "└──────────────┘",
          "",
          "Technical:",
          "• Adobe Creative Suite (Premiere Pro, After Effects, Photoshop, Illustrator)",
          "• React, Next.js, TypeScript",
          "",
          "Creative:",
          "• Best B-roll hunting",
          "• Storyboarding & Concept Development",
          "• Visual Hierarchy & Composition",
          "",
        ])
        break

      case "projects":
        pushOutput([
          "┌────────────────────────────────────┐",
          "│           Projects                 │",
          "└────────────────────────────────────┘",
          "",
          "• macOS Portfolio        — This desktop experience",
          "• Motion Reel            — After Effects showcase",
          "• Brand Campaigns        — Social-first edits",
          "• Thumbnail Systems      — Photoshop & Illustrator",
          "• Short-form Content     — Premiere Pro workflows",
          "",
        ])
        break

      case "contact":
        pushOutput([
          "┌─────────┐",
          "│ Contact │",
          "└─────────┘",
          "",
          "Email: pingmihir@outlook.com",
          "Website: https://www.youtube.com/@Cactuxbeer",
          "",
        ])
        break

      default:
        pushOutput([`zsh: command not found: ${mainCommand}`, 'Type "help" to see available commands', ""])
    }
  }

  return (
    <div
      ref={terminalRef}
      onClick={() => inputRef.current?.focus()}
      className="h-full min-h-full select-text overflow-y-auto bg-[#161b22]/85 p-4 font-mono text-[13px] leading-[1.35] text-white backdrop-blur-2xl"
    >
      {history.map((line, index) => {
        if (line.type === "neofetch") return <Neofetch key={index} />
        if (line.type === "cmd") {
          return (
            <div key={index} className="whitespace-pre-wrap">
              <span className="text-yellow-300">{line.time}</span>{" "}
              <span className="font-bold text-pink-500">❯</span>{" "}
              <span className="text-emerald-400">{line.text}</span>
            </div>
          )
        }
        return (
          <div key={index} className="min-h-[1.35em] whitespace-pre-wrap text-white/90">
            {line.text}
          </div>
        )
      })}

      {/* Oh-My-Zsh style two-line prompt */}
      <div className="mt-1">
        <div className="text-cyan-400">~/portfolio</div>
        <div className="flex items-center">
          <span className="text-yellow-300">{promptTime}</span>
          <span className="ml-1.5 font-bold text-pink-500">❯</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            className="ml-1.5 bg-transparent text-white caret-transparent outline-none"
            style={{ width: `${Math.max(1, input.length + 1)}ch` }}
            autoFocus
            aria-label="Terminal input"
          />
          <span className="-ml-[0.5ch] inline-block h-[15px] w-[7px] animate-pulse bg-white align-middle" />
        </div>
      </div>
    </div>
  )
}
