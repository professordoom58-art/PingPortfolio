"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export default function IOSStatusBar() {
  const [time, setTime] = useState("");
  const albums = ["/kanye.jpg", "/fifity.jpg", "/doomsday.jpg"];

  const [albumIndex, setAlbumIndex] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const hours = now.getHours() % 12 || 12;
      const minutes = now.getMinutes().toString().padStart(2, "0");

      setTime(`${hours}:${minutes}`);
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const delays = [0, 0.12, 0.24, 0.08, 0.18, 0.3];
  const baseHeights = [8, 12, 18, 18, 12, 8];
  useEffect(() => {
    const interval = setInterval(() => {
      setAlbumIndex((prev) => (prev + 1) % albums.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      {/* Status Bar */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-9 pt-4">
        <div className="flex items-center">
          <span className="text-[17px] font-semibold text-white">
            {time}
          </span>

          <Image
            src="/arrow.svg"
            alt="Location"
            width={13}
            height={13}
            className="relative ml-1.5 top-[1px]"
          />
        </div>

        <div className="flex translate-y-[1px] items-center gap-[4px]">
          <Image
            src="/cellular.svg"
            alt="Cellular"
            width={20}
            height={12}
            priority
          />

          <Image
            src="/wifi.svg"
            alt="WiFi"
            width={18}
            height={14}
            priority
          />

          <Image
            src="/battery.svg"
            alt="Battery"
            width={27}
            height={13}
            priority
          />
        </div>
      </div>

      {/* Dynamic Island */}
      <div className="absolute left-1/2 top-3 z-40 -translate-x-1/2">
        <div className="relative h-9 w-36 overflow-hidden rounded-full bg-black">
          {/* Album Cover */}
          <div className="absolute left-2.5 top-1/2 h-[22px] w-[22px] -translate-y-1/2 overflow-hidden rounded-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={albums[albumIndex]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="absolute inset-0"
              >
                <Image
                  src={albums[albumIndex]}
                  alt="Now Playing"
                  fill
                  priority
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Animated Waveform */}
          <div className="absolute right-3 top-1/2 flex h-3 -translate-y-1/2 items-center gap-[2px]">


            {baseHeights.map((height, index) => (
              <span
                key={index}
                className="wave-bar"
                style={{
                  height: `${height}px`,
                  animationDelay: `${delays[index]}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}