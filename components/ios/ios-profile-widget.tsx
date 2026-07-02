"use client";

import { motion } from "framer-motion";
import { Instagram, Github, Youtube, Mail } from "lucide-react";

const SOCIALS = [
  {
    icon: Instagram,
    href: "https://www.instagram.com/cactuxbeer/",
    label: "Instagram",
  },
  {
    icon: Github,
    href: "https://github.com/professordoom58-art/PingPortfolio",
    label: "GitHub",
  },
  {
    icon: Youtube,
    href: "https://www.youtube.com/@Cactuxbeer",
    label: "YouTube",
  },
  {
    icon: Mail,
    href: "mailto:pingmihir@outlook.com",
    label: "Mail",
  },
];

export function IOSProfileWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="w-full h-[176px] rounded-[28px] bg-[#1C1C1E] border border-white/10
                 shadow-[0_8px_24px_rgba(0,0,0,0.35)]
                 [box-shadow:inset_0_1px_0_rgba(255,255,255,0.06),0_8px_24px_rgba(0,0,0,0.35)]
                 px-5 py-4 flex flex-col justify-between"
    >
      <div>
        <p className="text-white/50 text-xs font-medium">Hi, I&apos;m</p>
        <h2 className="text-white text-2xl font-bold leading-tight mt-0.5">
          Mihir Suthar
        </h2>
        <p className="text-white/60 text-xs mt-1 leading-snug">
          Motion Designer · Video Editor · Frontend Developer
        </p>
      </div>

      <div className="flex items-center gap-3">
        {SOCIALS.map(({ icon: Icon, href, label }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className="w-11 h-11 rounded-full bg-white/8 flex items-center justify-center"
          >
            <Icon className="w-4 h-4 text-white/80" strokeWidth={1.75} />
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}