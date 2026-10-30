"use client"

import { useMemo, useState } from "react"
import {
  ArrowUp,
  Calendar,
  Clock,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudSun,
  Droplets,
  Maximize2,
  Minus,
  Moon,
  Search,
  Sun,
  Sunrise,
  Sunset,
  Wind,
  X,
} from "lucide-react"

type Condition = "clear" | "night" | "partly-cloudy" | "cloudy" | "rain" | "snow"

interface HourlyForecast {
  time: string
  condition: Condition
  temp: number
}

interface DailyForecast {
  day: string
  condition: Condition
  low: number
  high: number
}

interface CityWeather {
  city: string
  country: string
  temp: number
  condition: string
  high: number
  low: number
  /** Tailwind gradient stops for the sky background. */
  gradient: string
  hourly: HourlyForecast[]
  daily: DailyForecast[]
  uv: number
  uvLabel: string
  windSpeed: number
  windDirection: string
  windDegrees: number
  sunrise: string
  sunset: string
  humidity: number
  dewPoint: number
  visibility: number
}

const CITIES: Record<string, CityWeather> = {
  Gurugram: {
    city: "Gurugram",
    country: "India",
    temp: 29,
    condition: "Mostly Clear",
    high: 33,
    low: 19,
    gradient: "from-[#0f1c3f] via-[#1b2e5e] to-[#25396d]",
    hourly: [
      { time: "Now", condition: "clear", temp: 29 },
      { time: "5 PM", condition: "clear", temp: 29 },
      { time: "6 PM", condition: "partly-cloudy", temp: 28 },
      { time: "7 PM", condition: "night", temp: 27 },
      { time: "8 PM", condition: "night", temp: 26 },
      { time: "9 PM", condition: "night", temp: 26 },
      { time: "10 PM", condition: "cloudy", temp: 25 },
      { time: "11 PM", condition: "cloudy", temp: 25 },
    ],
    daily: [
      { day: "Today", condition: "clear", low: 19, high: 33 },
      { day: "Sat", condition: "clear", low: 22, high: 31 },
      { day: "Sun", condition: "partly-cloudy", low: 23, high: 30 },
      { day: "Mon", condition: "rain", low: 22, high: 29 },
      { day: "Tue", condition: "rain", low: 21, high: 28 },
      { day: "Wed", condition: "partly-cloudy", low: 22, high: 30 },
      { day: "Thu", condition: "clear", low: 23, high: 31 },
      { day: "Fri", condition: "clear", low: 23, high: 32 },
      { day: "Sat", condition: "partly-cloudy", low: 24, high: 32 },
      { day: "Sun", condition: "cloudy", low: 23, high: 30 },
    ],
    uv: 2,
    uvLabel: "Low",
    windSpeed: 12,
    windDirection: "NW",
    windDegrees: 315,
    sunrise: "6:34 AM",
    sunset: "6:18 PM",
    humidity: 68,
    dewPoint: 21,
    visibility: 16,
  },
  Cupertino: {
    city: "Cupertino",
    country: "United States",
    temp: 21,
    condition: "Sunny",
    high: 24,
    low: 15,
    gradient: "from-[#2b6cb0] via-[#4299e1] to-[#63b3ed]",
    hourly: [
      { time: "Now", condition: "clear", temp: 21 },
      { time: "5 PM", condition: "clear", temp: 23 },
      { time: "6 PM", condition: "clear", temp: 22 },
      { time: "7 PM", condition: "partly-cloudy", temp: 20 },
      { time: "8 PM", condition: "night", temp: 18 },
      { time: "9 PM", condition: "night", temp: 17 },
      { time: "10 PM", condition: "night", temp: 16 },
      { time: "11 PM", condition: "cloudy", temp: 15 },
    ],
    daily: [
      { day: "Today", condition: "clear", low: 15, high: 24 },
      { day: "Sat", condition: "clear", low: 16, high: 25 },
      { day: "Sun", condition: "partly-cloudy", low: 15, high: 23 },
      { day: "Mon", condition: "cloudy", low: 14, high: 21 },
      { day: "Tue", condition: "rain", low: 13, high: 19 },
      { day: "Wed", condition: "partly-cloudy", low: 14, high: 22 },
      { day: "Thu", condition: "clear", low: 15, high: 25 },
      { day: "Fri", condition: "clear", low: 16, high: 26 },
      { day: "Sat", condition: "clear", low: 17, high: 27 },
      { day: "Sun", condition: "partly-cloudy", low: 16, high: 24 },
    ],
    uv: 7,
    uvLabel: "High",
    windSpeed: 9,
    windDirection: "W",
    windDegrees: 270,
    sunrise: "6:12 AM",
    sunset: "7:58 PM",
    humidity: 44,
    dewPoint: 12,
    visibility: 24,
  },
  Tokyo: {
    city: "Tokyo",
    country: "Japan",
    temp: 24,
    condition: "Partly Cloudy",
    high: 26,
    low: 19,
    gradient: "from-[#334a63] via-[#46617d] to-[#5d7894]",
    hourly: [
      { time: "Now", condition: "partly-cloudy", temp: 24 },
      { time: "5 PM", condition: "partly-cloudy", temp: 23 },
      { time: "6 PM", condition: "cloudy", temp: 22 },
      { time: "7 PM", condition: "night", temp: 21 },
      { time: "8 PM", condition: "night", temp: 20 },
      { time: "9 PM", condition: "cloudy", temp: 20 },
      { time: "10 PM", condition: "rain", temp: 19 },
      { time: "11 PM", condition: "rain", temp: 19 },
    ],
    daily: [
      { day: "Today", condition: "partly-cloudy", low: 19, high: 26 },
      { day: "Sat", condition: "cloudy", low: 19, high: 25 },
      { day: "Sun", condition: "rain", low: 18, high: 23 },
      { day: "Mon", condition: "rain", low: 18, high: 22 },
      { day: "Tue", condition: "partly-cloudy", low: 19, high: 25 },
      { day: "Wed", condition: "clear", low: 20, high: 27 },
      { day: "Thu", condition: "clear", low: 20, high: 28 },
      { day: "Fri", condition: "partly-cloudy", low: 21, high: 27 },
      { day: "Sat", condition: "cloudy", low: 20, high: 25 },
      { day: "Sun", condition: "rain", low: 19, high: 23 },
    ],
    uv: 4,
    uvLabel: "Moderate",
    windSpeed: 14,
    windDirection: "NE",
    windDegrees: 45,
    sunrise: "5:02 AM",
    sunset: "6:31 PM",
    humidity: 58,
    dewPoint: 16,
    visibility: 18,
  },
  "New York": {
    city: "New York",
    country: "United States",
    temp: 18,
    condition: "Light Rain",
    high: 21,
    low: 14,
    gradient: "from-[#1f2937] via-[#2d3b4f] to-[#3d4f66]",
    hourly: [
      { time: "Now", condition: "rain", temp: 18 },
      { time: "5 PM", condition: "rain", temp: 18 },
      { time: "6 PM", condition: "cloudy", temp: 17 },
      { time: "7 PM", condition: "cloudy", temp: 17 },
      { time: "8 PM", condition: "night", temp: 16 },
      { time: "9 PM", condition: "night", temp: 15 },
      { time: "10 PM", condition: "rain", temp: 15 },
      { time: "11 PM", condition: "rain", temp: 14 },
    ],
    daily: [
      { day: "Today", condition: "rain", low: 14, high: 21 },
      { day: "Sat", condition: "rain", low: 13, high: 19 },
      { day: "Sun", condition: "cloudy", low: 13, high: 20 },
      { day: "Mon", condition: "partly-cloudy", low: 14, high: 22 },
      { day: "Tue", condition: "clear", low: 15, high: 24 },
      { day: "Wed", condition: "clear", low: 16, high: 25 },
      { day: "Thu", condition: "partly-cloudy", low: 15, high: 23 },
      { day: "Fri", condition: "cloudy", low: 14, high: 21 },
      { day: "Sat", condition: "rain", low: 13, high: 19 },
      { day: "Sun", condition: "rain", low: 12, high: 18 },
    ],
    uv: 1,
    uvLabel: "Low",
    windSpeed: 18,
    windDirection: "SE",
    windDegrees: 135,
    sunrise: "6:55 AM",
    sunset: "7:12 PM",
    humidity: 82,
    dewPoint: 15,
    visibility: 9,
  },
}

function WeatherIcon({
  condition,
  className = "h-5 w-5",
}: {
  condition: Condition
  className?: string
}) {
  switch (condition) {
    case "clear":
      return <Sun className={className} style={{ color: "#FDB813" }} strokeWidth={1.8} />
    case "night":
      return <Moon className={className} style={{ color: "#F5F3CE" }} strokeWidth={1.8} />
    case "partly-cloudy":
      return <CloudSun className={className} style={{ color: "#E8EEF7" }} strokeWidth={1.8} />
    case "rain":
      return <CloudRain className={className} style={{ color: "#60A5FA" }} strokeWidth={1.8} />
    case "snow":
      return <CloudSnow className={className} style={{ color: "#BFDBFE" }} strokeWidth={1.8} />
    default:
      return <Cloud className={className} style={{ color: "#CBD5E1" }} strokeWidth={1.8} />
  }
}

interface WeatherProps {
  isMobile?: boolean
  onClose?: () => void
  onMinimize?: () => void
  onMaximize?: () => void
}

export default function Weather({ onClose, onMinimize, onMaximize }: WeatherProps) {
  const [activeCity, setActiveCity] = useState("Gurugram")
  const [query, setQuery] = useState("")

  const weather = CITIES[activeCity]

  const cities = useMemo(() => Object.values(CITIES), [])
  const filteredCities = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return cities
    return cities.filter(
      (c) => c.city.toLowerCase().includes(q) || c.country.toLowerCase().includes(q),
    )
  }, [cities, query])

  const weekLow = Math.min(...weather.daily.map((day) => day.low))
  const weekHigh = Math.max(...weather.daily.map((day) => day.high))
  const weekRange = Math.max(1, weekHigh - weekLow)

  const selectCity = (city: string) => {
    setActiveCity(city)
    setQuery("")
  }

  return (
    <div
      className={`relative flex h-full w-full select-none overflow-hidden bg-gradient-to-b ${weather.gradient} text-white`}
    >
      {/* macOS traffic lights */}
      <div className="absolute left-3.5 top-3.5 z-20 flex items-center gap-2">
        <button
          type="button"
          aria-label="Close window"
          onClick={onClose}
          className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#FF5F57] ring-1 ring-black/10 transition hover:brightness-110"
        >
          <X className="h-2 w-2 text-black/50 opacity-0 transition group-hover:opacity-100" strokeWidth={3} />
        </button>
        <button
          type="button"
          aria-label="Minimize window"
          onClick={onMinimize}
          className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#FEBC2E] ring-1 ring-black/10 transition hover:brightness-110"
        >
          <Minus className="h-2 w-2 text-black/50 opacity-0 transition group-hover:opacity-100" strokeWidth={3} />
        </button>
        <button
          type="button"
          aria-label="Maximize window"
          onClick={onMaximize}
          className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#28C840] ring-1 ring-black/10 transition hover:brightness-110"
        >
          <Maximize2 className="h-2 w-2 text-black/50 opacity-0 transition group-hover:opacity-100" strokeWidth={3} />
        </button>
      </div>

      {/* Saved locations sidebar */}
      <aside className="flex w-60 shrink-0 flex-col gap-2 border-r border-white/10 bg-black/20 p-3 pt-11 backdrop-blur-2xl">
        <div className="flex h-7 w-full items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-2.5 text-xs text-white">
          <Search className="h-3.5 w-3.5 shrink-0 text-white/60" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && filteredCities[0]) selectCity(filteredCities[0].city)
            }}
            placeholder="Search for a city"
            className="w-full bg-transparent text-xs text-white outline-none placeholder:text-white/50"
          />
        </div>

        <div className="px-1 pt-1 text-[10px] font-semibold uppercase tracking-wider text-white/45">
          Saved Locations
        </div>

        <div className="no-scrollbar flex flex-1 flex-col gap-2 overflow-y-auto">
          {filteredCities.map((city) => {
            const isActive = city.city === activeCity
            return (
              <button
                key={city.city}
                type="button"
                onClick={() => selectCity(city.city)}
                className={`flex w-full items-center justify-between rounded-2xl border p-3 text-left transition-all ${
                  isActive
                    ? "border-white/30 bg-white/20 shadow-lg"
                    : "border-white/15 bg-white/10 hover:bg-white/15"
                }`}
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-bold text-white">{city.city}</div>
                  <div className="truncate text-[11px] text-white/75">{city.condition}</div>
                  <div className="truncate text-[10px] text-white/50">{city.country}</div>
                </div>
                <div className="ml-2 shrink-0 text-right">
                  <div className="text-2xl font-light leading-none text-white">{city.temp}°</div>
                  <div className="mt-1 text-[10px] text-white/70">
                    H:{city.high}° L:{city.low}°
                  </div>
                </div>
              </button>
            )
          })}

          {filteredCities.length === 0 && (
            <p className="px-1 py-3 text-[11px] text-white/50">No cities found</p>
          )}
        </div>
      </aside>

      {/* Main weather dashboard */}
      <main className="no-scrollbar flex-1 overflow-y-auto p-6 pt-8">
        {/* Hero */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl font-normal tracking-tight text-white drop-shadow-sm">
            {weather.city}
          </h1>
          <div className="my-1 text-7xl font-thin tracking-tighter text-white">{weather.temp}°</div>
          <div className="text-base font-medium text-white/85">{weather.condition}</div>
          <div className="mt-0.5 text-sm font-medium text-white/90">
            H:{weather.high}°&nbsp;&nbsp;L:{weather.low}°
          </div>
        </div>

        {/* Hourly forecast */}
        <section className="mt-6 rounded-2xl border border-white/15 bg-white/[0.08] p-4 shadow-lg backdrop-blur-xl">
          <div className="mb-3 flex items-center gap-1.5 border-b border-white/10 pb-2 text-[11px] font-semibold uppercase tracking-wider text-white/60">
            <Clock className="h-3.5 w-3.5" />
            Hourly Forecast
          </div>
          <div className="no-scrollbar flex items-center justify-between gap-4 overflow-x-auto">
            {weather.hourly.map((hour, index) => (
              <div
                key={`${hour.time}-${index}`}
                className="flex shrink-0 flex-col items-center gap-2"
              >
                <span className="text-xs font-medium text-white/85">{hour.time}</span>
                <WeatherIcon condition={hour.condition} className="h-6 w-6" />
                <span className="text-sm font-semibold text-white">{hour.temp}°</span>
              </div>
            ))}
          </div>
        </section>

        {/* 10-day forecast + metric widgets */}
        <div className="mt-4 grid grid-cols-1 gap-4 pb-6 lg:grid-cols-2">
          {/* 10-day forecast */}
          <section className="rounded-2xl border border-white/15 bg-white/[0.08] p-4 backdrop-blur-xl">
            <div className="mb-2 flex items-center gap-1.5 border-b border-white/10 pb-2 text-[11px] font-semibold uppercase tracking-wider text-white/60">
              <Calendar className="h-3.5 w-3.5" />
              10-Day Forecast
            </div>

            <div>
              {weather.daily.map((day, index) => {
                const left = ((day.low - weekLow) / weekRange) * 100
                const width = Math.max(8, ((day.high - day.low) / weekRange) * 100)
                return (
                  <div
                    key={`${day.day}-${index}`}
                    className="flex items-center justify-between border-b border-white/5 py-2 text-xs last:border-none"
                  >
                    <span className="w-14 font-medium text-white/90">{day.day}</span>
                    <WeatherIcon condition={day.condition} className="h-4 w-4" />
                    <span className="w-7 text-right text-white/55">{day.low}°</span>
                    <div className="relative mx-3 h-1.5 flex-1 overflow-hidden rounded-full bg-black/30">
                      <div
                        className="absolute inset-y-0 rounded-full bg-gradient-to-r from-cyan-400 via-yellow-400 to-orange-500"
                        style={{ left: `${left}%`, width: `${Math.min(width, 100 - left)}%` }}
                      />
                    </div>
                    <span className="w-7 font-medium text-white">{day.high}°</span>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Metric widgets */}
          <div className="grid grid-cols-2 gap-4">
            {/* UV Index */}
            <div className="flex aspect-square flex-col justify-between rounded-2xl border border-white/15 bg-white/[0.08] p-3.5 backdrop-blur-xl">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/60">
                <Sun className="h-3 w-3" />
                UV Index
              </div>
              <div>
                <div className="text-2xl font-semibold leading-none text-white">{weather.uv}</div>
                <div className="mt-1 text-xs text-white/80">{weather.uvLabel}</div>
              </div>
              <div className="relative mt-2 h-1.5 w-full rounded-full bg-[linear-gradient(90deg,#4ade80,#facc15,#fb923c,#e879f9)]">
                <div
                  className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border border-white/60 bg-white shadow"
                  style={{ left: `calc(${Math.min(weather.uv / 11, 1) * 100}% - 5px)` }}
                />
              </div>
            </div>

            {/* Wind */}
            <div className="flex aspect-square flex-col justify-between overflow-hidden rounded-2xl border border-white/15 bg-white/[0.08] p-3.5 backdrop-blur-xl">
              <div className="flex shrink-0 items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/55">
                <Wind className="h-3.5 w-3.5" />
                Wind
              </div>

              <div className="relative mx-auto my-auto h-[92px] w-[92px] shrink-0 rounded-full border border-white/20 bg-black/15">
                <span className="absolute left-1/2 top-1 -translate-x-1/2 text-[8px] font-bold text-white/70">
                  N
                </span>
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[8px] font-semibold text-white/40">
                  S
                </span>
                <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[8px] font-semibold text-white/40">
                  E
                </span>
                <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-[8px] font-semibold text-white/40">
                  W
                </span>

                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ transform: `rotate(${weather.windDegrees}deg)` }}
                  aria-hidden="true"
                >
                  <ArrowUp className="absolute left-1/2 top-4 h-2 w-2 -translate-x-1/2 text-cyan-300/80" strokeWidth={3} />
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold leading-none text-white">{weather.windSpeed}</span>
                  <span className="mt-0.5 text-[9px] font-medium leading-tight text-white/60">km/h</span>
                  <span className="mt-0.5 text-[9px] font-semibold leading-none text-cyan-300/90">
                    {weather.windDirection}
                  </span>
                </div>
              </div>

              <div className="truncate text-[11px] text-white/60">Gusts up to 18 km/h</div>
            </div>

            {/* Sunset */}
            <div className="flex aspect-square flex-col justify-between rounded-2xl border border-white/15 bg-white/[0.08] p-3.5 backdrop-blur-xl">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/60">
                <Sunset className="h-3 w-3" />
                Sunset
              </div>
              <div>
                <div className="text-2xl font-semibold leading-none text-white">
                  {weather.sunset}
                </div>
                <svg viewBox="0 0 100 26" className="mt-2 w-full text-white/25" fill="none" aria-hidden="true">
                  <path
                    d="M0 23 Q 25 6 50 16 T 100 11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <circle cx="50" cy="16" r="3.5" fill="#FDB813" />
                </svg>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-white/70">
                <Sunrise className="h-3 w-3" />
                Sunrise: {weather.sunrise}
              </div>
            </div>

            {/* Humidity */}
            <div className="flex aspect-square flex-col justify-between rounded-2xl border border-white/15 bg-white/[0.08] p-3.5 backdrop-blur-xl">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/60">
                <Droplets className="h-3 w-3" />
                Humidity
              </div>
              <div className="text-2xl font-semibold leading-none text-white">
                {weather.humidity}%
              </div>
              <div className="space-y-0.5 text-[11px] text-white/70">
                <p>The dew point is {weather.dewPoint}° right now.</p>
                <p className="text-white/50">Visibility {weather.visibility} km</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
