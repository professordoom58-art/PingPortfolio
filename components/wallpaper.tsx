export default function Wallpaper({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div
      className="absolute inset-0 bg-cover bg-center transition-all duration-500"
      style={{
        backgroundImage: isDarkMode ? "url('/wallpaper-night1.jpg')" : "url('/wallpaper-day1.png')",
      }}
    />
  )
}
