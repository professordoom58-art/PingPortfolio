"use client"

import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
    ChevronLeft,
    Search,
    Share,
    Paperclip,
    PenLine,
    CheckCircle2,
    Ellipsis,
} from "lucide-react"

type Note = {
    id: string
    title: string
    date: string
    month: string
    body: string
}

const NOTES: Note[] = [
    {
        id: "portfolio",
        title: "Portfolio",
        date: "1 July 2026",
        month: "Today",
        body: `Hi, I'm Mihir.

I'm a Motion Designer, Video Editor and Frontend Developer.

This website recreates macOS and iOS inside the browser using React, TypeScript and Framer Motion.

Current Focus

• Interactive Portfolio
• Motion Graphics
• Apple UI Recreation
• React + TypeScript

Software

• Premiere Pro
• After Effects
• Photoshop
• Illustrator

Contact

pingmihir@outlook.com`,
    },

    {
        id: "adobe",
        title: "Adobe Projects",
        date: "29 June 2026",
        month: "June",
        body: `Premiere Pro

After Effects

Photoshop

Illustrator

Figma`,
    },

    {
        id: "youtube",
        title: "YouTube Ideas",
        date: "17 June 2026",
        month: "June",
        body: `Celebrity Culture

Freedom of Speech

Attention Economy

Editing Philosophy

Artificial Intelligence`,
    },

    {
        id: "motion",
        title: "Motion Graphics",
        date: "8 May 2026",
        month: "May",
        body: `Apple UI

Liquid Glass

HUD Design

Animation Principles

Documentary Graphics`,
    },

    {
        id: "freelance",
        title: "Freelance Checklist",
        date: "26 April 2026",
        month: "April",
        body: `Portfolio

Behance

Resume

Cold Emails

Invoice Template`,
    },
]

interface IOSNotesProps {
    isMobile?: boolean
    onBack?: () => void
}

export default function IOSNotes({
    isMobile = true,
    onBack,
}: IOSNotesProps) {
    const [selectedNote, setSelectedNote] = useState<Note | null>(null)

    const [search, setSearch] = useState("")
    const [scrollY, setScrollY] = useState(0)
    const filteredNotes = useMemo(() => {
        if (!search.trim()) return NOTES

        const query = search.toLowerCase()

        return NOTES.filter((note) => {
            return (
                note.title.toLowerCase().includes(query) ||
                note.body.toLowerCase().includes(query)
            )
        })
    }, [search])

    const groupedNotes = useMemo(() => {
        const groups: Record<string, Note[]> = {}

        filteredNotes.forEach((note) => {
            if (!groups[note.month]) {
                groups[note.month] = []
            }

            groups[note.month].push(note)
        })

        return groups
    }, [filteredNotes])
    return (
        <div className="relative h-full bg-black text-white overflow-hidden">
            <div className="absolute top-14 left-5 z-50">

                <button
                    onClick={onBack}
                    className="
            flex
            items-center
            justify-center
            w-14
            h-14
            rounded-full
            bg-[#1c1c1e]/90
            backdrop-blur-xl
            border
            border-white/10
            shadow-[inset_0_0_18px_rgba(255,255,255,.03)]
            active:scale-95
            transition
        "
                >
                    <ChevronLeft
                        size={28}
                        strokeWidth={3}
                    />
                </button>

            </div>

            <div className="absolute top-14 right-5 z-50">

                <button
                    className="
            flex
            items-center
            justify-center
            w-14
            h-14
            rounded-full
            bg-[#1c1c1e]/90
            backdrop-blur-xl
            border
            border-white/10
            shadow-[inset_0_0_18px_rgba(255,255,255,.03)]
            active:scale-95
            transition
        "
                >
                    <Ellipsis
                        size={26}
                        strokeWidth={3}
                    />
                </button>

            </div>
            <AnimatePresence mode="wait">


                {/* ===========================
             NOTES LIST
        ============================ */}

                {!selectedNote ? (

                    <motion.div
                        key="notes-list"
                        initial={{ x: -15, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -40, opacity: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 36,
                            mass: 0.9,
                        }}
                        onScroll={(e) => setScrollY(e.currentTarget.scrollTop)}
                        className="absolute inset-0 overflow-y-auto pb-24"
                    >

                        {/* Search */}
                        <div className="px-5 pt-5 pb-3">
                            <h1 className="text-[30px] font-bold tracking-[-0.03em] text-white">
                                Notes
                            </h1>

                            <p className="mt-1 text-[13px] text-zinc-500">
                                {filteredNotes.length} Notes
                            </p>
                        </div>
                        <div className="px-5 pt-5 pb-4">

                            <div
                                className="flex items-center gap-3 h-11 rounded-full bg-[#1c1c1e] px-4"
                            >
                                <Search
                                    size={18}
                                    className="text-zinc-500"
                                />

                                <input
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                    placeholder="Search"
                                    className="
                    flex-1
                    bg-transparent
                    outline-none
                    text-white
                    placeholder:text-zinc-500
                  "
                                />

                            </div>

                        </div>

                        {/* Notes */}

                        <div
                            className="
              flex-1
              overflow-y-auto
              px-5
              pb-24
            "
                        >

                            {Object.entries(groupedNotes).map(
                                ([month, monthNotes]) => (

                                    <div
                                        key={month}
                                        className="mb-8"
                                    >

                                        <h2
                                            className="
                      text-[18px]
                      font-semibold
                      text-zinc-500
                      mb-2
                    "
                                        >
                                            {month}
                                        </h2>

                                        <div
                                            className="
                      rounded-3xl
                      overflow-hidden
                      bg-[#1c1c1e]
                    "
                                        >

                                            {monthNotes.map(
                                                (note, index) => (

                                                    <button
                                                        key={note.id}
                                                        onClick={() =>
                                                            setSelectedNote(note)
                                                        }
                                                        className={`
                              w-full
                              px-5
                              py-4
                              text-left
                              active:bg-[#2c2c2e]
                              transition-colors
                              ${index !==
                                                                monthNotes.length - 1
                                                                ? "border-b border-white/10"
                                                                : ""
                                                            }
                            `}
                                                    >

                                                        <div
                                                            className="
                              text-[17px]
                              font-semibold
                              truncate
                            "
                                                        >
                                                            {note.title}
                                                        </div>

                                                        <div
                                                            className="
                              mt-1
                              flex
                              gap-2
                              text-[15px]
                              text-zinc-500
                              overflow-hidden
                            "
                                                        >

                                                            <span className="shrink-0">
                                                                {note.date}
                                                            </span>

                                                            <span className="truncate">
                                                                {
                                                                    note.body
                                                                        .split("\n")
                                                                        .find(
                                                                            (line) =>
                                                                                line.trim()
                                                                        )
                                                                }
                                                            </span>

                                                        </div>

                                                    </button>

                                                )
                                            )}

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    </motion.div>

                ) : (

                    <motion.div
                        key="note"
                        initial={{
                            x: "100%",
                        }}
                        animate={{
                            x: 0,
                        }}
                        exit={{
                            x: "100%",
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 36,
                            mass: 0.9,
                        }}
                        className="
              h-full
              flex
              flex-col
            "
                    >

                        {/* Content */}

                        <div
                            className="
              flex-1
              overflow-y-auto
              px-6
              pb-28
            "
                        >

                            <p
                                className="
                text-center
                text-[13px]
                text-zinc-500
              "
                            >
                                {selectedNote.date}
                            </p>

                            <h1
                                className="
                text-[34px]
                font-bold
                mt-4
                mb-8
              "
                            >
                                {selectedNote.title}
                            </h1>

                            <div
                                className="
                whitespace-pre-wrap
                leading-8
                text-[17px]
              "
                            >
                                {selectedNote.body}
                            </div>

                        </div>

                    </motion.div>

                )}

            </AnimatePresence>
            {/* Bottom Toolbar */}

            <div
                className="
              absolute
              bottom-0
              left-0
              right-0
              h-20
              px-6
              pb-6
              flex
              items-end
              justify-between
              bg-gradient-to-t
              from-black
              to-transparent
            "
            >
                <div
                    className="
                flex
                items-center
                gap-8
                text-[#FFD60A]
              "
                >
                    <CheckCircle2 size={21} />

                    <Paperclip size={21} />

                    <PenLine size={21} />

                    <Share size={21} />
                </div>

                <motion.button
                    className="
                text-[#FFD60A]
                active:scale-90
                transition-transform
              "
                >
                    <Ellipsis size={22} />
                </motion.button>
            </div>

        </div>
    )
}