"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

export interface Track {
  title: string
  artist: string
  album: string
  cover: string
  file: string
  duration: string
}

export const PLAYLIST: Track[] = [
  {
    title: "Good Morning",
    artist: "Kanye West",
    album: "Graduation",
    cover: "/kanye.jpg",
    file: "/Good Morning.mp3",
    duration: "3:15",
  },
  {
    title: "National Treasures",
    artist: "Drake",
    album: "National Treasures",
    cover: "/drake.jpg",
    file: "/National Treasures.mp3",
    duration: "3:20",
  },
  {
    title: "Doomsday",
    artist: "MF DOOM",
    album: "Operation: Doomsday",
    cover: "/doomsday.jpg",
    file: "/Doomsday.mp3",
    duration: "4:58",
  },
]

interface MusicContextValue {
  playlist: Track[]
  currentTrack: Track
  currentTrackIndex: number
  isPlaying: boolean
  isAudioReady: boolean
  currentTime: number
  duration: number
  /** 0..1, matching HTMLMediaElement.volume */
  volume: number
  isMuted: boolean
  error: string | null
  togglePlay: () => void
  nextTrack: () => void
  prevTrack: () => void
  selectTrack: (index: number) => void
  /** 0..1 */
  setVolume: (value: number) => void
  toggleMute: () => void
  seek: (time: number) => void
}

const MusicContext = createContext<MusicContextValue | null>(null)

export function useMusic() {
  const ctx = useContext(MusicContext)
  if (!ctx) {
    throw new Error("useMusic must be used inside a <MusicProvider>")
  }
  return ctx
}

/**
 * Owns the single <audio> element for the whole desktop.
 *
 * The element lives here rather than inside the Spotify window so playback
 * survives the window being closed, and so the Control Center widget can drive
 * the exact same track, play state and volume.
 */
export function MusicProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null)

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isAudioReady, setIsAudioReady] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolumeState] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Refs mirror state so the audio event listeners never read stale closures.
  const isPlayingRef = useRef(false)
  const indexRef = useRef(0)
  const autoPlayRef = useRef(false)

  useEffect(() => {
    isPlayingRef.current = isPlaying
  }, [isPlaying])

  useEffect(() => {
    indexRef.current = currentTrackIndex
  }, [currentTrackIndex])

  const currentTrack = PLAYLIST[currentTrackIndex]

  const play = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return
    try {
      await audio.play()
      setIsPlaying(true)
      setError(null)
    } catch {
      // Autoplay policies reject play() until a user gesture; recover quietly.
      setIsPlaying(false)
      setError("Playback was blocked by the browser. Press play again.")
    }
  }, [])

  const changeTrack = useCallback((nextIndex: number) => {
    const audio = audioRef.current
    const wasPlaying = isPlayingRef.current

    // Remember whether we should resume once the new source is ready.
    autoPlayRef.current = wasPlaying

    if (audio) audio.pause()
    setIsPlaying(false)
    setIsAudioReady(false)
    setCurrentTime(0)
    setDuration(0)
    setCurrentTrackIndex(nextIndex)
  }, [])

  const nextTrack = useCallback(() => {
    changeTrack((indexRef.current + 1) % PLAYLIST.length)
  }, [changeTrack])

  const prevTrack = useCallback(() => {
    changeTrack((indexRef.current - 1 + PLAYLIST.length) % PLAYLIST.length)
  }, [changeTrack])

  const selectTrack = useCallback(
    (index: number) => {
      if (index === indexRef.current) {
        // Same track: behave like a play/pause toggle.
        const audio = audioRef.current
        if (!audio) return
        if (isPlayingRef.current) {
          audio.pause()
          setIsPlaying(false)
        } else {
          void play()
        }
        return
      }
      changeTrack(index)
    },
    [changeTrack, play],
  )

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio || !isAudioReady) return

    if (isPlayingRef.current) {
      audio.pause()
      setIsPlaying(false)
    } else {
      void play()
    }
  }, [isAudioReady, play])

  const setVolume = useCallback((value: number) => {
    const next = Math.min(1, Math.max(0, value))
    setVolumeState(next)
    // Any non-zero volume implies unmuted.
    setIsMuted(next === 0)
  }, [])

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev)
  }, [])

  const seek = useCallback((time: number) => {
    const audio = audioRef.current
    if (!audio) return
    try {
      audio.currentTime = time
      setCurrentTime(time)
    } catch {
      // Setting currentTime before metadata loads throws; ignore.
    }
  }, [])

  // Bind media events once.
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTime = () => setCurrentTime(audio.currentTime)
    const handleMeta = () => {
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0)
      setIsAudioReady(true)
    }
    const handleCanPlay = () => {
      setIsAudioReady(true)
      if (autoPlayRef.current) {
        autoPlayRef.current = false
        void play()
      }
    }
    const handleEnded = () => {
      changeTrack((indexRef.current + 1) % PLAYLIST.length)
    }
    const handleError = () => {
      setError("Error loading audio")
      setIsPlaying(false)
    }

    audio.addEventListener("timeupdate", handleTime)
    audio.addEventListener("loadedmetadata", handleMeta)
    audio.addEventListener("canplay", handleCanPlay)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("error", handleError)

    return () => {
      audio.removeEventListener("timeupdate", handleTime)
      audio.removeEventListener("loadedmetadata", handleMeta)
      audio.removeEventListener("canplay", handleCanPlay)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("error", handleError)
    }
  }, [changeTrack, play])

  // Keep the element's volume in sync with shared state.
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = isMuted ? 0 : volume
  }, [volume, isMuted])

  const value = useMemo<MusicContextValue>(
    () => ({
      playlist: PLAYLIST,
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
    }),
    [
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
    ],
  )

  return (
    <MusicContext.Provider value={value}>
      {children}
      {/* Single shared audio element: survives the Spotify window closing. */}
      <audio ref={audioRef} src={currentTrack.file} preload="auto" />
    </MusicContext.Provider>
  )
}
