"use client"

import Image from "next/image"

export default function IOSDock() {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2">

      <div className="flex items-center gap-5 rounded-[32px] border border-white/20 bg-white/10 backdrop-blur-3xl px-6 py-4 shadow-2xl">

        <Image
          src="/safari.png"
          alt="Safari"
          width={58}
          height={58}
        />

        <Image
          src="/mail.png"
          alt="Mail"
          width={58}
          height={58}
        />

        <Image
          src="/github.png"
          alt="GitHub"
          width={58}
          height={58}
        />

        <Image
          src="/contact.png"
          alt="Contact"
          width={58}
          height={58}
        />

      </div>

    </div>
  )
}