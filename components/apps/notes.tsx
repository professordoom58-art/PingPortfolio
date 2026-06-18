"use client"

import type React from "react"

import { useState } from "react"

interface NotesProps {
  isDarkMode?: boolean
}

export default function Notes({ isDarkMode = true }: NotesProps) {
  // Update the notes state with enhanced content
  const [notes, setNotes] = useState([
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
  date: "Today, 10:30 AM",
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
  date: "Yesterday, 3:15 PM",
}])

  const [selectedNoteId, setSelectedNoteId] = useState(1)
  const [editableContent, setEditableContent] = useState("")

  const selectedNote = notes.find((note) => note.id === selectedNoteId)

  const handleNoteSelect = (id: number) => {
    setSelectedNoteId(id)
    const note = notes.find((n) => n.id === id)
    if (note) {
      setEditableContent(note.content)
    }
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableContent(e.target.value)

    // Update the note content
    setNotes(
      notes.map((note) => {
        if (note.id === selectedNoteId) {
          return { ...note, content: e.target.value }
        }
        return note
      }),
    )
  }

  const textColor = isDarkMode ? "text-white" : "text-gray-800"
  const bgColor = isDarkMode ? "bg-gray-900" : "bg-white"
  const sidebarBg = isDarkMode ? "bg-gray-800" : "bg-gray-100"
  const borderColor = isDarkMode ? "border-gray-700" : "border-gray-200"
  const hoverBg = isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
  const selectedBg = isDarkMode ? "bg-gray-700" : "bg-gray-300"

  return (
    <div className={`flex h-full ${bgColor} ${textColor}`}>
      {/* Sidebar */}
      <div className={`w-64 ${sidebarBg} border-r ${borderColor} flex flex-col`}>
        <div className="p-3 border-b border-gray-700 flex justify-between items-center">
          <h2 className="font-medium">Notes</h2>
          <button className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto flex-1">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`p-3 cursor-pointer ${selectedNoteId === note.id ? selectedBg : hoverBg}`}
              onClick={() => handleNoteSelect(note.id)}
            >
              <h3 className="font-medium truncate">{note.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{note.date}</p>
              <p className={`text-sm mt-1 truncate ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                {note.content.split("\n")[0].replace(/^#+ /, "")}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Note content */}
      <div className="flex-1 flex flex-col">
        {selectedNote && (
          <>
            <div className={`p-3 border-b ${borderColor}`}>
              <h2 className="font-medium">{selectedNote.title}</h2>
              <p className="text-xs text-gray-500">{selectedNote.date}</p>
            </div>
            <div className="flex-1 p-4 overflow-auto">
              <textarea
                className={`w-full h-full resize-none ${bgColor} ${textColor} focus:outline-none`}
                value={selectedNote.content}
                onChange={handleContentChange}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
