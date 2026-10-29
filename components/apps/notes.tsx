"use client"

import type React from "react"

import { useState } from "react"
import { Search, Share, SquarePen, Trash2 } from "lucide-react"

interface NotesProps {
  isMobile?: boolean
}

interface Note {
  id: number
  title: string
  content: string
  date: string
  stamp: string
}

const initialNotes: Note[] = [
  {
    id: 1,
    title: "About Me",
    content: `# Mihir Suthar
Video Editor, Motion Designer & Creative Developer

## Creative Skills
### Video Editing
- Adobe Premiere Pro
- Storytelling & Narrative Editing
- Short-form Content Editing
- Long-form Content Editing
- Social Media Content
- YouTube Video Production
- Audio Synchronization
- Color Correction

### Motion Design
- Adobe After Effects
- Motion Graphics
- Logo Animation
- Kinetic Typography
- Explainer Videos
- Visual Effects
- Transitions & Compositing
- Animation Principles

### Design
- Adobe Photoshop
- Adobe Illustrator
- Thumbnail Design
- Brand Assets
- Social Media Creatives
- Marketing Visuals
- UI Design Fundamentals
- Visual Communication

### Technical Skills
- React & Next.js
- TypeScript & JavaScript
- Git & GitHub
- AI-Assisted Workflows
- Content Strategy
- Creative Problem Solving
- Workflow Optimization
- Project Management

## Experience
Currently building expertise in video editing, motion design, and digital content creation. Focused on helping creators, brands, and businesses communicate ideas through engaging visuals, animation, and storytelling.

## Contact
Email: pingmihir@outlook.com
Portfolio: Mihir Suthar | macOS Portfolio`,
    date: "10:30 AM",
    stamp: "October 29, 2026 at 10:30 AM",
  },
  {
    id: 2,
    title: "Goals & Vision",
    content: `# Goals & Vision

## Career Growth
- Build a successful video editing and motion design business
- Work with creators, startups, and established brands
- Develop a strong personal brand and professional network
- Create work that delivers measurable value for clients

## Creative Development
- Master advanced motion graphics and visual effects
- Improve storytelling through editing and pacing
- Develop high-converting commercial and advertising content
- Learn cinematic editing techniques and workflows

## Personal Projects
- Build a portfolio of standout creative work
- Launch content focused on design, creativity, and technology
- Create original motion graphics templates and assets
- Experiment with AI-powered creative tools and workflows

## Long-Term Vision
- Establish a creative studio serving global clients
- Combine design, motion, and technology into unique experiences
- Build systems that enable consistent creative output
- Create projects that inspire, educate, and entertain

## Work Philosophy
- Prioritize quality over quantity
- Focus on solving problems, not just completing tasks
- Learn continuously through building and experimentation
- Deliver work that clients are proud to share`,
    date: "3:15 PM",
    stamp: "October 28, 2026 at 3:15 PM",
  },
]

const SCROLLBAR_CLASSES =
  "[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/15 [&::-webkit-scrollbar-track]:bg-transparent"

const stripMarkdown = (text: string) =>
  text
    .replace(/^#+\s*/, "")
    .replace(/^-\s*/, "")
    .trim()

/** Turns the note's lightweight Markdown into real Apple Notes typography. */
function NoteBody({ content }: { content: string }) {
  const lines = content.split("\n")
  const blocks: React.ReactNode[] = []
  let list: string[] = []
  let key = 0

  const flushList = () => {
    if (list.length === 0) return

    const items = list
    list = []

    blocks.push(
      <ul key={`list-${key++}`} className="mb-3 space-y-1.5">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-white/80"
          >
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#F5C542]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>,
    )
  }

  lines.forEach((rawLine) => {
    const line = rawLine.trimEnd()

    if (!line.trim()) {
      flushList()
      return
    }

    if (line.startsWith("### ")) {
      flushList()
      blocks.push(
        <h3
          key={`h3-${key++}`}
          className="mb-2 mt-4 text-sm font-semibold uppercase tracking-wider text-white/90"
        >
          {line.slice(4)}
        </h3>,
      )
      return
    }

    if (line.startsWith("## ")) {
      flushList()
      blocks.push(
        <h2
          key={`h2-${key++}`}
          className="mb-2 mt-6 flex items-center gap-2 text-lg font-semibold text-[#F5C542]"
        >
          {line.slice(3)}
        </h2>,
      )
      return
    }

    if (line.startsWith("# ")) {
      flushList()
      blocks.push(
        <h1 key={`h1-${key++}`} className="mb-1 text-2xl font-bold tracking-tight text-white">
          {line.slice(2)}
        </h1>,
      )
      return
    }

    if (line.startsWith("- ")) {
      list.push(line.slice(2))
      return
    }

    flushList()
    blocks.push(
      <p key={`p-${key++}`} className="mb-2 text-[13.5px] leading-relaxed text-white/75">
        {line}
      </p>,
    )
  })

  flushList()

  return <>{blocks}</>
}

export default function Notes({}: NotesProps) {
  const [notes, setNotes] = useState<Note[]>(initialNotes)
  const [selectedNoteId, setSelectedNoteId] = useState(1)
  const [isEditing, setIsEditing] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const selectedNote = notes.find((note) => note.id === selectedNoteId) ?? notes[0]

  const visibleNotes = notes.filter((note) =>
    `${note.title} ${note.content}`.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleNoteSelect = (id: number) => {
    setSelectedNoteId(id)
    setIsEditing(false)
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setNotes((prev) =>
      prev.map((note) => (note.id === selectedNoteId ? { ...note, content: value } : note)),
    )
  }

  const handleCreateNote = () => {
    const now = new Date()
    const newNote: Note = {
      id: Date.now(),
      title: "New Note",
      content: "",
      date: now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      stamp: `${now.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })} at ${now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`,
    }

    setNotes((prev) => [newNote, ...prev])
    setSelectedNoteId(newNote.id)
    setSearchTerm("")
    setIsEditing(true)
  }

  const handleDeleteNote = () => {
    if (notes.length <= 1) return

    const remaining = notes.filter((note) => note.id !== selectedNoteId)
    setNotes(remaining)
    setSelectedNoteId(remaining[0].id)
    setIsEditing(false)
  }

  return (
    <div className="flex h-full min-h-full flex-col bg-[#18181b] text-white">
      {/* Unified toolbar */}
      <div className="flex h-11 shrink-0 items-center gap-1 border-b border-white/10 bg-[#232327]/90 px-3">
        <button
          onClick={handleDeleteNote}
          aria-label="Delete note"
          className="flex h-7 w-7 items-center justify-center rounded-md text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        >
          <Trash2 className="h-4 w-4" />
        </button>
        <button
          onClick={handleCreateNote}
          aria-label="New note"
          className="flex h-7 w-7 items-center justify-center rounded-md text-[#F5C542] transition-colors hover:bg-white/10"
        >
          <SquarePen className="h-4 w-4" />
        </button>
        <button
          aria-label="Share note"
          className="flex h-7 w-7 items-center justify-center rounded-md text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        >
          <Share className="h-4 w-4" />
        </button>

        <div className="ml-2 text-[12px] font-semibold text-white/45">Notes</div>

        <div className="ml-auto flex h-7 w-44 items-center gap-1.5 rounded-md border border-white/10 bg-white/10 px-2">
          <Search className="h-3.5 w-3.5 shrink-0 text-white/40" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            className="w-full bg-transparent text-[12px] text-white outline-none placeholder:text-white/40"
          />
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Sidebar */}
        <div className="flex w-60 shrink-0 flex-col border-r border-white/10 bg-[#1e1e22]/90 p-2.5">
          <div className="px-1.5 pb-2 pt-1 text-[10.5px] font-semibold uppercase tracking-wider text-white/35">
            iCloud · {notes.length} Notes
          </div>
          <div className={`flex-1 overflow-y-auto ${SCROLLBAR_CLASSES}`}>
            {visibleNotes.map((note) => {
              const isSelected = note.id === selectedNoteId
              const preview =
                note.content
                  .split("\n")
                  .map(stripMarkdown)
                  .find((line) => line.length > 0) ?? "No additional text"

              return (
                <button
                  key={note.id}
                  onClick={() => handleNoteSelect(note.id)}
                  className={`mb-1 block w-full rounded-xl px-3 py-2.5 text-left transition-colors ${
                    isSelected
                      ? "bg-[#D9A528]/90 text-white shadow-sm"
                      : "text-white/75 hover:bg-white/10"
                  }`}
                >
                  <div className="truncate text-[12.5px] font-semibold">{note.title}</div>
                  <div
                    className={`mt-0.5 text-[10.5px] ${isSelected ? "text-white/80" : "text-white/40"}`}
                  >
                    {note.date}
                  </div>
                  <div
                    className={`mt-0.5 truncate text-[11px] ${
                      isSelected ? "text-white/85" : "text-white/45"
                    }`}
                  >
                    {preview}
                  </div>
                </button>
              )
            })}

            {visibleNotes.length === 0 && (
              <p className="px-2 py-4 text-center text-[11px] text-white/35">No results</p>
            )}
          </div>
        </div>

        {/* Editor */}
        <div className="flex min-w-0 flex-1 flex-col bg-[#18181b]">
          {selectedNote && (
            <div
              className={`flex-1 overflow-y-auto px-8 py-6 ${SCROLLBAR_CLASSES}`}
              onClick={() => {
                if (!isEditing) setIsEditing(true)
              }}
            >
              <div className="mb-4 text-center text-[11px] font-medium text-white/40">
                {selectedNote.stamp}
              </div>

              {isEditing ? (
                <textarea
                  autoFocus
                  value={selectedNote.content}
                  onChange={handleContentChange}
                  onBlur={() => setIsEditing(false)}
                  spellCheck={false}
                  placeholder="Start typing…"
                  className="min-h-[60vh] w-full resize-none bg-transparent text-[13.5px] leading-relaxed text-white/90 outline-none placeholder:text-white/30"
                />
              ) : (
                <div className="cursor-text">
                  {selectedNote.content.trim() ? (
                    <NoteBody content={selectedNote.content} />
                  ) : (
                    <p className="text-[13.5px] text-white/30">Start typing…</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
