"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronLeft,
  Ellipsis,
  Paperclip,
  PenLine,
  Search,
  Share,
  Undo2,
} from "lucide-react";

interface NoteRowData {
  id: number;
  title: string;
  timestamp: string;
  preview: string;
  openable?: boolean;
}

interface MonthGroup {
  label: string;
  notes: NoteRowData[];
}

const NOTE_GROUPS: MonthGroup[] = [
  {
    label: "Today",
    notes: [
      {
        id: 1,
        title: "Note",
        timestamp: "7:32 PM",
        preview: "No additional text",
        openable: true,
      },
    ],
  },
  {
    label: "May",
    notes: [
      {
        id: 2,
        title: "Sheep counter",
        timestamp: "17/05/26",
        preview: "No additional text",
      },
      {
        id: 3,
        title: "Meliorism edit",
        timestamp: "14/05/26",
        preview: "A mix of xp y2k steve rogers pegg...",
      },
      {
        id: 4,
        title: "Celebrity culture",
        timestamp: "09/05/26",
        preview: "Virat meets baba",
      },
    ],
  },
  {
    label: "April",
    notes: [
      {
        id: 5,
        title: "Just because it happened in the past...",
        timestamp: "26/04/26",
        preview: "200 years from now",
      },
    ],
  },
  {
    label: "March",
    notes: [
      {
        id: 6,
        title: "Slow neo-psychedelia ballad, 75 BPM...",
        timestamp: "24/03/26",
        preview: "R&B influence. Instrumentation: S...",
      },
      {
        id: 7,
        title: "Creators",
        timestamp: "10/03/26",
        preview: "",
      },
    ],
  },
];

const NOTE_DETAIL = {
  date: "1 July 2026 at 7:32 PM",
  title: "Note",
};

export default function IOSNotes({
  isMobile = true,
  onClose,
}: {
  isMobile?: boolean;
  onClose?: () => void;
}) {
  const [selectedNote, setSelectedNote] = useState<number | null>(null);

  return (
    <div
      className="relative h-full w-full overflow-hidden bg-black text-white"
      style={{
        fontFamily:
          '"SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
      }}
    >
      <AnimatePresence initial={false} mode="popLayout">
        {selectedNote === null ? (
          <motion.div
            key="list"
            initial={{ x: "-20%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-20%", opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0"
          >
            <NotesList
              onClose={onClose}
              onOpenNote={(id) => setSelectedNote(id)}
              isMobile={isMobile}
            />
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0"
          >
            <NoteDetail onBack={() => setSelectedNote(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NotesList({
  onClose,
  onOpenNote,
  isMobile,
}: {
  onClose?: () => void;
  onOpenNote: (id: number) => void;
  isMobile: boolean;
}) {
  return (
    <div className="relative flex h-full flex-col">
      <div className="pointer-events-none absolute inset-x-0 top-12 z-20 flex items-center justify-between px-5">
        <IconButton ariaLabel="Back" onClick={onClose}>
          <ChevronLeft className="h-6 w-6" strokeWidth={3.2} />
        </IconButton>

        <IconButton ariaLabel="More">
          <Ellipsis className="h-6 w-6" strokeWidth={3.2} />
        </IconButton>
      </div>
      {/* Heading */}
      <div className="flex-1 overflow-y-auto px-5 pb-36 pt-36 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <h1 className="text-[32px] font-bold leading-none tracking-[-0.03em] text-white">
          Notes
        </h1>
        <p className="pt-1 text-[16px] font-normal text-neutral-500">
          163 Notes
        </p>

        <div className="pt-10">
          {NOTE_GROUPS.map((group) => (
            <section key={group.label} className="mb-8">
              <h2 className="pb-2 text-[17px] font-semibold text-white">
                {group.label}
              </h2>
              <div className="overflow-hidden rounded-[28px] bg-[#1c1c1e]">
                {group.notes.map((note, idx) => (
                  <NoteRow
                    key={note.id}
                    note={note}
                    isLast={idx === group.notes.length - 1}
                    onOpen={() => note.openable && onOpenNote(note.id)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Month headings*/}

      <div className="pointer-events-none absolute inset-x-0 bottom-9 z-30 flex items-center gap-4 px-7">
        <div className="pointer-events-auto flex h-16 flex-1 items-center gap-4 rounded-full border border-white/10 bg-[#1c1c1e]/90 px-6 text-neutral-400 shadow-[inset_0_0_18px_rgba(255,255,255,0.03)] backdrop-blur-xl">
          <Search className="h-6 w-6 shrink-0 text-white" strokeWidth={2.8} />
          <span className="text-[17px] font-semibold leading-none text-neutral-400">
            Search
          </span>
        </div>

        <IconButton ariaLabel="New note" className="h-16 w-16">
          <PenLine className="h-6 w-6" strokeWidth={2.7} />
        </IconButton>
      </div>
    </div>
  );
}

function NoteRow({
  note,
  isLast,
  onOpen,
}: {
  note: NoteRowData;
  isLast: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      disabled={!note.openable}
      className={`block w-full px-7 py-4 text-left ${note.openable ? "active:bg-[#2c2c2e]" : ""
        } ${!isLast ? "border-b border-white/10" : ""}`}
    >
      <div className="truncate text-[18px] font-semibold leading-none tracking-tight text-white">
        {note.title}
      </div>
      <div className="mt-2 flex min-w-0 items-center gap-5 truncate text-[15px] font-medium leading-none text-neutral-500">
        <span className="shrink-0">{note.timestamp}</span>
        {note.preview && <span className="truncate">{note.preview}</span>}
      </div>
    </button>
  );
}

function NoteDetail({ onBack }: { onBack: () => void }) {
  return (
    <div className="relative flex h-full flex-col bg-black">
      <div className="pointer-events-none absolute inset-x-0 top-12 z-20 flex items-center justify-between px-5">
        <IconButton ariaLabel="Back" onClick={onBack}>
          <ChevronLeft className="h-6 w-6" strokeWidth={3.2} />
        </IconButton>

        <div className="pointer-events-none flex items-center gap-3">
          <IconButton ariaLabel="Undo">
            <Undo2 className="h-6 w-6" strokeWidth={2.8} />
          </IconButton>
          <div className="pointer-events-auto flex h-14 items-center gap-7 rounded-full border border-white/10 bg-[#1c1c1e] px-7 text-white shadow-[inset_0_0_18px_rgba(255,255,255,0.03)]">
            <Share className="h-6 w-6" strokeWidth={2.7} />
            <Ellipsis className="h-6 w-6" strokeWidth={3.2} />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-8 pb-40 pt-52 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <p className="text-center text-2xl font-medium leading-none text-neutral-500">
          {NOTE_DETAIL.date}
        </p>

        <h1 className="pt-9 text-5xl font-bold leading-none tracking-tight text-white">
          {NOTE_DETAIL.title}
        </h1>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-9 z-30 flex items-center justify-between px-8">
        <div className="pointer-events-auto flex h-16 items-center gap-14 rounded-full border border-white/10 bg-[#1c1c1e]/90 px-9 text-white shadow-[inset_0_0_18px_rgba(255,255,255,0.03)] backdrop-blur-xl">
          <ListWithCheckIcon />
          <Paperclip className="h-9 w-9" strokeWidth={2.7} />
          <MarkupIcon />
        </div>

        <IconButton ariaLabel="New note" className="h-16 w-16">
          <PenLine className="h-6 w-6" strokeWidth={2.7} />
        </IconButton>
      </div>
    </div>
  );
}

function IconButton({
  ariaLabel,
  children,
  className = "h-12 w-12",
  onClick,
}: {
  ariaLabel: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={`pointer-events-auto flex shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#1c1c1e] text-white shadow-[inset_0_0_18px_rgba(255,255,255,0.03)] active:opacity-70 ${className}`}
    >
      {children}
    </button>
  );
}

function ListWithCheckIcon() {
  return (
    <span className="relative block h-9 w-9">
      <CheckCircle2
        className="absolute left-0 top-0 h-4 w-4 text-white"
        strokeWidth={3}
      />
      <span className="absolute left-5 top-1 h-[3px] w-5 rounded-full bg-white" />
      <span className="absolute left-0 top-6 h-4 w-4 rounded-full border-[3px] border-white" />
      <span className="absolute left-5 top-7 h-[3px] w-5 rounded-full bg-white" />
    </span>
  );
}

function MarkupIcon() {
  return (
    <span className="relative flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-white">
      <PenLine className="h-7 w-7 text-white" strokeWidth={2.7} />
    </span>
  );
}
