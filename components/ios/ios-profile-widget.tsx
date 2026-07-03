"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Instagram,
  Github,
  Youtube,
  Mail,
} from "lucide-react";

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

interface IOSProfileWidgetProps {
  desktop?: boolean;
}

export function IOSProfileWidget({
  desktop = false,
}: IOSProfileWidgetProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 380,
        damping: 36,
        mass: 0.9,
      }}
      className={`
relative
overflow-hidden
rounded-[32px]
border
border-white/30
bg-white/[0.08]
backdrop-blur-[15px]
supports-[backdrop-filter]:bg-black/[0.01]
shadow-[0_8px_30px_rgba(0,0,0,.18)]

${desktop
          ? "w-[430px] min-h-[215px] p-5"
          : "w-full p-4"
        }
`}
    >
      {/* Glass lighting */}
      <div className="pointer-events-none absolute inset-0">
        {/* Top to bottom tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.14] via-white/[0.05] to-black/[0.10]" />

        {/* Soft highlight */}
        <div className="absolute -top-8 -left-8 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

        {/* Bottom shade */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/15 to-transparent" />

        {/* Glossy top edge */}
        <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
      </div>
      <div className="relative">
        {/* Top */}
        <div
          className={`
    flex
    ${desktop ? "gap-5" : "gap-3"}
  `}
        >
          <div
            className={`relative shrink-0 overflow-hidden rounded-[22px]
    ${desktop
                ? "h-[112px] w-[112px]"
                : "h-24 w-24"
              }`}
          >
            <Image
              src="/avatar.png"
              alt="Mihir Suthar"
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className={`
flex
flex-1
flex-col
min-w-0
${desktop
              ? "justify-start pt-2"
              : "justify-center"
            }
`}>
            <p
              className={`
    font-semibold
    uppercase
    tracking-[0.18em]
    text-cyan-400
    ${desktop ? "text-[10px]" : "text-[11px]"}
  `}
            >
              Portfolio
            </p>

            <h2
              className={`
    mt-2
    font-bold
    tracking-[-0.04em]
    leading-none
    text-white
    ${desktop ? "text-[24px]" : "text-[22px]"}
  `}
            >
              Mihir Suthar
            </h2>

            <div
              className={`
    mt-2
    leading-5
    text-white/70
    ${desktop ? "text-[12px]" : "text-[13px]"}
  `}
            >
              <p>Motion Designer</p>
              <p>Video Editor</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className={`
    grid
    grid-cols-4
    ${desktop ? "mt-3 gap-1.5" : "mt-4 gap-2"}
  `}
        >
          {SOCIALS.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target={label === "Mail" ? undefined : "_blank"}
              rel="noopener noreferrer"
              whileTap={{ scale: 0.94 }}
              whileHover={{ scale: 1.03 }}
              className={`
flex
items-center
justify-center
rounded-[16px]
border
border-white/10
bg-black/[0.01]
shadow-[inset_0_1px_0_rgba(255,255,255,.04)]

${desktop
                  ? "h-12 w-[72px]"
                  : "h-11 w-[60px]"
                }
`}
            >
              <Icon
                size={desktop ? 24 : 18}
                strokeWidth={1.8}
                className="text-white/90"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div >
  );
}