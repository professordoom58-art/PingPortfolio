"use client"

import Image from "next/image"

interface PreviewProps {
  image?: string
}

export default function Preview({
  image,
}: PreviewProps) {
  if (!image) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-zinc-950 text-zinc-500">
        No image selected
      </div>
    )
  }

  return (
    <div className="w-full h-full bg-zinc-900 flex flex-col">

      {/* Toolbar */}

      <div className="h-12 border-b border-zinc-700 bg-zinc-800 flex items-center justify-center">

        <span className="text-sm text-zinc-300 font-medium">
          Preview
        </span>

      </div>

      {/* Image */}

      <div className="flex-1 flex items-center justify-center bg-zinc-950 overflow-hidden">

        <Image
          src={image}
          alt="Preview"
          width={2500}
          height={2500}
          priority
          className="max-w-full max-h-full object-contain select-none"
          draggable={false}
        />

      </div>

      {/* Footer */}

      <div className="h-12 border-t border-zinc-700 bg-zinc-800 flex items-center justify-center">

        <span className="text-sm text-zinc-400">
          Created using Adobe Illustrator
        </span>

      </div>

    </div>
  )
}