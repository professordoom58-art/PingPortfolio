"use client"

import type React from "react"

import { useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Home,
  Library,
  ListMusic,
  Pause,
  Play,
  Search,
  Shuffle,
  Repeat,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react"
import { useMusic } from "@/components/music-provider"

interface SpotifyProps {
  isMobile?: boolean
}

/** Decorative portfolio playlists shown in the sidebar. */
const PLAYLISTS = ["🎬 Video Editing Bangers", "✨ Motion Design Lo-Fi", "🚀 Mihir's Top Tracks"]

const GREEN = "#1db954"

export default function Spotify({}: SpotifyProps) {
  const {
    playlist,
    currentTrack,
    currentTrackIndex,
    isPlaying,
    isAudioReady,
    currentTime,
    duration,
    volume,
    isMuted,
    error,
    togglePlay,
    nextTrack,
    prevTrack,
    selectTrack,
    setVolume,
    toggleMute,
    seek,
  } = useMusic()

  const [isShuffleOn, setIsShuffleOn] = useState(false)
  const [isRepeatOn, setIsRepeatOn] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const progress = duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0
  const volumeLevel = isMuted ? 0 : volume

  const formatTime = (time: number) => {
    if (!Number.isFinite(time) || time < 0) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(Number.parseFloat(e.target.value))
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number.parseFloat(e.target.value))
  }

  return (
    <div className="flex h-full select-none flex-col overflow-hidden bg-[#121212] text-white">
      <div className="flex min-h-0 flex-1">
        {/* ---------------------------------------------------------------- */}
        {/* Sidebar                                                          */}
        {/* ---------------------------------------------------------------- */}
        <aside className="flex w-56 shrink-0 flex-col justify-between border-r border-white/5 bg-black p-4">
          <div className="min-h-0 flex-1 overflow-y-auto">
            {/* Brand */}
            <div className="mb-5 flex items-center gap-2 px-2">
              <img src="/spotify.png" alt="" className="h-6 w-6" />
              <span className="text-sm font-bold tracking-tight">Spotify</span>
            </div>

            {/* Primary navigation */}
            <nav className="space-y-0.5">
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-md bg-white/10 px-2 py-2 text-sm font-semibold text-white"
              >
                <Home className="h-[18px] w-[18px]" />
                Home
              </button>
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm font-semibold text-white/60 transition-colors hover:text-white"
              >
                <Search className="h-[18px] w-[18px]" />
                Search
              </button>
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm font-semibold text-white/60 transition-colors hover:text-white"
              >
                <Library className="h-[18px] w-[18px]" />
                Your Library
              </button>
            </nav>

            {/* Playlists */}
            <div className="mt-6">
              <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-white/50">
                Playlists
              </p>

              <button
                type="button"
                className="mb-1 flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-white/10"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-gradient-to-br from-[#450af5] to-[#c4efd9]">
                  <Heart className="h-4 w-4 fill-white text-white" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">Liked Songs</span>
                  <span className="block text-[11px] text-white/50">Playlist</span>
                </span>
              </button>

              <div className="space-y-0.5">
                {PLAYLISTS.map((name) => (
                  <button
                    key={name}
                    type="button"
                    className="flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-white/10"
                  >
                    <ListMusic className="h-4 w-4 shrink-0 text-white/50" />
                    <span className="truncate text-sm text-white/80">{name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* User profile pill */}
          <button
            type="button"
            className="mt-4 flex w-full items-center gap-2 rounded-full bg-white/5 p-1.5 pr-3 text-left transition-colors hover:bg-white/10"
          >
            <img src="/avatar.png" alt="Mihir" className="h-7 w-7 rounded-full object-cover" />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs font-semibold">Mihir</span>
              <span className="block truncate text-[10px] text-white/50">Premium</span>
            </span>
          </button>
        </aside>

        {/* ---------------------------------------------------------------- */}
        {/* Main content                                                     */}
        {/* ---------------------------------------------------------------- */}
        <main className="relative flex min-h-0 flex-1 flex-col overflow-y-auto bg-gradient-to-b from-[#2a1b3d] via-[#121212] to-[#121212] p-6">
          {/* Top header */}
          <header className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Go back"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white/80 transition-colors hover:bg-black/60 hover:text-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Go forward"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white/80 transition-colors hover:bg-black/60 hover:text-white"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="rounded-full bg-[#1db954] px-4 py-1.5 text-xs font-bold text-black transition-transform hover:scale-105 active:scale-95"
              >
                Upgrade
              </button>
              <img
                src="/avatar.png"
                alt="Mihir"
                className="h-8 w-8 rounded-full object-cover ring-2 ring-black/40"
              />
            </div>
          </header>

          {/* Hero / album view */}
          <section className="mb-6 flex items-end gap-6 pt-4">
            <img
              src={currentTrack.cover || "/placeholder.svg"}
              alt={`${currentTrack.title} cover`}
              className="h-44 w-44 shrink-0 rounded-xl object-cover shadow-[0_12px_30px_rgba(0,0,0,0.5)]"
            />
            <div className="min-w-0 pb-1">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/70">Album</p>
              <h1 className="truncate text-[32px] font-bold leading-tight">{currentTrack.title}</h1>
              <p className="truncate text-sm text-white/70">{currentTrack.artist}</p>
              <p className="truncate text-sm text-white/50">{currentTrack.album}</p>
            </div>
          </section>

          {/* Playback controls */}
          <section className="mb-6">
            {/* Shuffle / Repeat / Like */}
            <div className="mb-4 flex items-center gap-5">
              <button
                type="button"
                aria-label="Shuffle"
                aria-pressed={isShuffleOn}
                onClick={() => setIsShuffleOn((prev) => !prev)}
                className="relative transition-colors"
                style={{ color: isShuffleOn ? GREEN : "rgba(255,255,255,0.7)" }}
              >
                <Shuffle className="h-4 w-4" />
                {isShuffleOn && (
                  <span className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#1db954]" />
                )}
              </button>
              <button
                type="button"
                aria-label="Repeat"
                aria-pressed={isRepeatOn}
                onClick={() => setIsRepeatOn((prev) => !prev)}
                className="relative transition-colors"
                style={{ color: isRepeatOn ? GREEN : "rgba(255,255,255,0.7)" }}
              >
                <Repeat className="h-4 w-4" />
                {isRepeatOn && (
                  <span className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#1db954]" />
                )}
              </button>
              <button
                type="button"
                aria-label={isLiked ? "Remove from Liked Songs" : "Save to Liked Songs"}
                aria-pressed={isLiked}
                onClick={() => setIsLiked((prev) => !prev)}
                className="ml-auto text-white/70 transition-colors hover:text-white"
              >
                <Heart
                  className={`h-5 w-5 ${
                    isLiked ? "fill-[#1db954] text-[#1db954]" : "text-white/70 hover:text-white"
                  }`}
                />
              </button>
            </div>

            {/* Progress bar */}
            <div className="group relative flex h-1 cursor-pointer items-center rounded-full bg-white/20">
              <div
                className="pointer-events-none h-full rounded-full bg-[#1db954]"
                style={{ width: `${progress}%` }}
              />
              <div
                className="pointer-events-none absolute h-3 w-3 -translate-x-1/2 rounded-full bg-white opacity-0 shadow-md transition-opacity group-hover:opacity-100"
                style={{ left: `${progress}%` }}
              />
              <input
                type="range"
                min="0"
                max={duration || 100}
                step="0.1"
                value={Math.min(currentTime, duration || 100)}
                onChange={handleSeek}
                disabled={!isAudioReady}
                aria-label="Seek"
                className="absolute inset-x-0 top-1/2 z-10 h-5 w-full -translate-y-1/2 cursor-pointer appearance-none bg-transparent opacity-0 disabled:cursor-default"
              />
            </div>

            {/* Timestamps */}
            <div className="mt-2 flex items-center justify-between text-[11px] text-white/50">
              <span>{formatTime(currentTime)}</span>
              <span>{isAudioReady && duration > 0 ? formatTime(duration) : currentTrack.duration}</span>
            </div>

            {/* Transport */}
            <div className="my-2 flex items-center justify-center gap-6">
              <button
                type="button"
                aria-label="Previous track"
                onClick={prevTrack}
                className="transition-transform active:scale-90"
              >
                <SkipBack className="h-5 w-5 text-white/80 transition-colors hover:text-white" />
              </button>

              <button
                type="button"
                aria-label={isPlaying ? "Pause" : "Play"}
                onClick={togglePlay}
                disabled={!isAudioReady}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-lg transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5 fill-black" />
                ) : (
                  <Play className="ml-0.5 h-5 w-5 fill-black" />
                )}
              </button>

              <button
                type="button"
                aria-label="Next track"
                onClick={nextTrack}
                className="transition-transform active:scale-90"
              >
                <SkipForward className="h-5 w-5 text-white/80 transition-colors hover:text-white" />
              </button>
            </div>

            {error && <p className="mt-2 text-center text-[11px] text-red-400">{error}</p>}
          </section>

          {/* Track list (album view) */}
          <section className="mb-2">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-base font-bold">Tracks</h2>
              <span className="text-xs text-white/50">{playlist.length} songs</span>
            </div>

            <ul>
              {playlist.map((track, index) => {
                const isActive = index === currentTrackIndex
                return (
                  <li key={track.title}>
                    <button
                      type="button"
                      onClick={() => selectTrack(index)}
                      className={`group flex w-full items-center gap-3 rounded-md px-2 py-2 text-left transition-colors hover:bg-white/10 ${
                        isActive ? "bg-white/10" : ""
                      }`}
                    >
                      <span className="w-4 shrink-0 text-center text-xs text-white/50">
                        {isActive && isPlaying ? (
                          <span className="flex items-end justify-center gap-[2px]">
                            <span className="h-2 w-[2px] animate-pulse rounded-full bg-[#1db954]" />
                            <span className="h-3 w-[2px] animate-pulse rounded-full bg-[#1db954]" />
                            <span className="h-1.5 w-[2px] animate-pulse rounded-full bg-[#1db954]" />
                          </span>
                        ) : (
                          index + 1
                        )}
                      </span>
                      <img
                        src={track.cover || "/placeholder.svg"}
                        alt=""
                        className="h-10 w-10 shrink-0 rounded object-cover"
                      />
                      <span className="min-w-0 flex-1">
                        <span
                          className={`block truncate text-sm font-medium ${
                            isActive ? "text-[#1db954]" : "text-white"
                          }`}
                        >
                          {track.title}
                        </span>
                        <span className="block truncate text-xs text-white/50">{track.artist}</span>
                      </span>
                      <span className="shrink-0 text-xs text-white/50">{track.duration}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>

          {/* Volume & extra toolbar */}
          <footer className="mt-auto flex items-center gap-4 border-t border-white/10 pt-4">
            <button
              type="button"
              aria-label={isMuted ? "Unmute" : "Mute"}
              onClick={toggleMute}
              className="text-white/70 transition-colors hover:text-white"
            >
              {volumeLevel === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>

            <div className="group relative flex h-1 w-28 cursor-pointer items-center rounded-full bg-white/20">
              <div
                className="pointer-events-none h-full rounded-full bg-white"
                style={{ width: `${volumeLevel * 100}%` }}
              />
              <div
                className="pointer-events-none absolute h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-white opacity-0 shadow-md transition-opacity group-hover:opacity-100"
                style={{ left: `${volumeLevel * 100}%` }}
              />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volumeLevel}
                onChange={handleVolumeChange}
                aria-label="Volume"
                className="absolute inset-x-0 top-1/2 z-10 h-4 w-full -translate-y-1/2 cursor-pointer appearance-none bg-transparent opacity-0"
              />
            </div>

            <div className="ml-auto flex items-center gap-4 text-white/60">
              <button type="button" aria-label="Queue" className="transition-colors hover:text-white">
                <ListMusic className="h-4 w-4" />
              </button>
              <span className="text-[11px] text-white/40">
                {isPlaying ? "Playing" : "Paused"} · {currentTrack.album}
              </span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  )
}
