"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Newspaper,
  Search,
  Share2,
} from "lucide-react"
import IOSBackButton from "@/components/ios/ios-back-button"

interface SafariProps {
  isMobile?: boolean
  onBack?: () => void
}

interface NewsArticle {
  id: string
  title: string
  description: string | null
  image: string | null
  source: string
  publishedAt: string
  url: string
  content?: string | null
}

type Topic =
  | "Top"
  | "Technology"
  | "AI"
  | "Business"
  | "Science"
  | "Gaming"
  | "World"
  | "Politics"

const topics: Topic[] = [
  "Top",
  "Technology",
  "AI",
  "Business",
  "Science",
  "Gaming",
  "World",
  "Politics",
]

const topicKeywords: Record<Exclude<Topic, "Top">, string[]> = {
  Technology: [
    "technology",
    "tech",
    "software",
    "startup",
    "device",
    "app",
    "digital",
    "chip",
  ],
  AI: [
    "ai",
    "artificial intelligence",
    "openai",
    "machine learning",
    "model",
    "chatbot",
    "automation",
  ],
  Business: [
    "business",
    "market",
    "stock",
    "economy",
    "company",
    "funding",
    "revenue",
    "finance",
  ],
  Science: [
    "science",
    "space",
    "research",
    "climate",
    "health",
    "study",
    "nasa",
    "isro",
  ],
  Gaming: [
    "gaming",
    "game",
    "games",
    "xbox",
    "playstation",
    "nintendo",
    "esports",
  ],
  World: [
    "world",
    "global",
    "international",
    "foreign",
    "china",
    "us",
    "europe",
  ],
  Politics: [
    "politics",
    "government",
    "election",
    "minister",
    "parliament",
    "policy",
    "law",
  ],
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 18,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
}

function getArticleText(article: NewsArticle): string {
  return `${article.title} ${article.description ?? ""}`.toLowerCase()
}

function matchesTopic(article: NewsArticle, topic: Topic): boolean {
  if (topic === "Top") return true

  const text = getArticleText(article)

  return topicKeywords[topic].some((keyword) => text.includes(keyword))
}

function getRelativeTime(value: string): string {
  const publishedAt = new Date(value).getTime();
  const diffMs = Date.now() - publishedAt;

  if (!Number.isFinite(publishedAt) || diffMs < 0) {
    return "Just now";
  }

  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return "Yesterday";

  if (days < 7) {
    return new Date(value).toLocaleDateString(undefined, {
      weekday: "long",
    });
  }

  return new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function PlaceholderImage({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={[
        "flex h-full w-full items-center justify-center overflow-hidden",
        "bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_34%),linear-gradient(135deg,#1c1c1e,#0b0b0d)]",
        compact ? "rounded-2xl" : "rounded-[28px]",
      ].join(" ")}
    >
      <Newspaper className="h-8 w-8 text-white/[0.3]" strokeWidth={1.8} />
    </div>
  )
}

function ArticleImage({
  article,
  className,
  compact = false,
}: {
  article: NewsArticle
  className: string
  compact?: boolean
}) {
  if (!article.image) {
    return (
      <div className={className}>
        <PlaceholderImage compact={compact} />
      </div>
    )
  }

  return (
    <div className={className}>
      <img
        src={article.image}
        alt=""
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
    </div>
  )
}

function Metadata({
  article,
  compact = false,
}: {
  article: NewsArticle
  compact?: boolean
}) {
  return (
    <div
      className={[
        "flex min-w-0 flex-1 items-center text-[12px] font-medium text-white/[0.45]",
        compact ? "gap-1.5 overflow-hidden whitespace-nowrap" : "flex-wrap gap-x-2 gap-y-1",
      ].join(" ")}
    >
      <span className="min-w-0 flex-1 truncate text-white/[0.65]">
        {article.source}
      </span>
      <span>-</span>
      <span>{getRelativeTime(article.publishedAt)}</span>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="flex min-h-[120px] gap-3 rounded-[24px] border border-white/[0.07] bg-white/[0.055] p-3 shadow-[0_14px_44px_rgba(0,0,0,0.2)] backdrop-blur-xl">
      <div className="h-[94px] w-[82px] shrink-0 animate-pulse rounded-[19px] bg-white/[0.08]" />
      <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
        <div className="space-y-2.5">
          <div className="h-4 w-full animate-pulse rounded-full bg-white/[0.08]" />
          <div className="h-4 w-11/12 animate-pulse rounded-full bg-white/[0.08]" />
          <div className="h-4 w-3/5 animate-pulse rounded-full bg-white/[0.08]" />
        </div>
        <div>
          <div className="h-px bg-white/[0.07]" />
          <div className="mt-2 h-3 w-2/3 animate-pulse rounded-full bg-white/[0.08]" />
        </div>
      </div>
    </div>
  )
}

function EmptyState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center px-8 text-center">
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-[28px] border border-white/[0.08] bg-white/[0.06] shadow-[0_18px_48px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
        <Newspaper className="h-9 w-9 text-white/[0.45]" strokeWidth={1.8} />
      </div>
      <h2 className="text-[24px] font-semibold tracking-tight text-white">
        No news available.
      </h2>
      <p className="mt-2 max-w-[260px] text-[14px] leading-5 text-white/[0.45]">
        The briefing could not be refreshed right now.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-6 h-11 rounded-full bg-white px-6 text-[15px] font-semibold text-black active:scale-95 transition"
      >
        Retry
      </button>
    </div>
  )
}

function NewsCard({
  article,
  isBookmarked,
  onToggleBookmark,
  onShare,
  onOpen,
  index,
}: {
  article: NewsArticle
  isBookmarked: boolean
  onToggleBookmark: (id: string) => void
  onShare: (article: NewsArticle) => void
  onOpen: (article: NewsArticle) => void
  index: number
}) {
  const BookmarkIcon = isBookmarked ? BookmarkCheck : Bookmark
  const openArticle = useCallback(() => onOpen(article), [article, onOpen])

  return (
    <motion.article
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      whileTap={{ scale: 0.985 }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 30,
        delay: Math.min(index * 0.035, 0.18),
      }}
      role="button"
      tabIndex={0}
      onClick={openArticle}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          openArticle()
        }
      }}
      className="min-h-[120px] cursor-pointer rounded-[24px] border border-white/[0.07] bg-white/[0.055] p-3 text-left shadow-[0_14px_44px_rgba(0,0,0,0.2)] outline-none backdrop-blur-xl transition-colors hover:bg-white/[0.07] focus-visible:ring-2 focus-visible:ring-white/30"
    >
      <div className="flex gap-3">
        <ArticleImage
          article={article}
          compact
          className="h-[94px] w-[82px] shrink-0 overflow-hidden rounded-[19px]"
        />

        <div className="flex min-h-[94px] min-w-0 flex-1 flex-col justify-between py-0.5">
          <h3 className="line-clamp-3 text-[16px] font-semibold leading-5 tracking-tight text-white">
            {article.title}
          </h3>

          <div>
            <div className="h-px bg-white/[0.07]" />
            <div className="mt-2 flex items-center gap-2">
              <Metadata article={article} compact />

              <div className="ml-auto flex shrink-0 items-center gap-1">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.9 }}
                  onClick={(event) => {
                    event.stopPropagation()
                    onToggleBookmark(article.id)
                  }}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.07] text-white/[0.68]"
                  aria-label="Bookmark article"
                >
                  <BookmarkIcon size={14} strokeWidth={2.2} />
                </motion.button>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.9 }}
                  onClick={(event) => {
                    event.stopPropagation()
                    onShare(article)
                  }}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.07] text-white/[0.68]"
                  aria-label="Share article"
                >
                  <Share2 size={14} strokeWidth={2.2} />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function TrendingRow({
  article,
  index,
  onOpen,
}: {
  article: NewsArticle
  index: number
  onOpen: (article: NewsArticle) => void
}) {
  return (
    <motion.button
      type="button"
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileTap={{ scale: 0.985 }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 30,
        delay: index * 0.035,
      }}
      onClick={() => onOpen(article)}
      className="flex w-full gap-3 rounded-[22px] border border-white/[0.06] bg-white/[0.045] p-3 text-left outline-none backdrop-blur-xl transition-colors hover:bg-white/[0.065] focus-visible:ring-2 focus-visible:ring-white/30"
    >
      <ArticleImage
        article={article}
        compact
        className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl"
      />
      <div className="min-w-0 flex-1 py-0.5">
        <h3 className="line-clamp-2 text-[15px] font-semibold leading-5 text-white">
          {article.title}
        </h3>
        <div className="mt-2 flex items-center gap-2 text-[12px] font-medium text-white/[0.42]">
          <span className="max-w-[120px] truncate text-white/[0.58]">
            {article.source}
          </span>
          <span>-</span>
          <span>{getRelativeTime(article.publishedAt)}</span>
        </div>
      </div>
    </motion.button>
  )
}

function ArticleReader({
  article,
  isBookmarked,
  onToggleBookmark,
  onShare,
}: {
  article: NewsArticle
  isBookmarked: boolean
  onToggleBookmark: (id: string) => void
  onShare: (article: NewsArticle) => void
}) {
  const BookmarkIcon = isBookmarked ? BookmarkCheck : Bookmark
  const articleContent = article.content?.trim()
  const shouldShowArticleContent =
    Boolean(articleContent) && articleContent !== article.description?.trim()

  const openOriginalArticle = useCallback(() => {
    window.open(article.url, "_blank", "noopener,noreferrer")
  }, [article.url])

  return (
    <div className="mx-0 rounded-[30px]">
      <div className="mb-5 flex items-center gap-2">
        <Metadata article={article} />
      </div>

      <h1 className="text-[29px] font-semibold leading-[34px] tracking-tight text-white">
        {article.title}
      </h1>

      <div className="mt-5 flex items-center gap-2">
        <motion.button
          type="button"
          whileTap={{ scale: 0.92 }}
          onClick={() => onToggleBookmark(article.id)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.08] text-white/[0.72] backdrop-blur-xl"
          aria-label="Bookmark article"
        >
          <BookmarkIcon size={18} strokeWidth={2.2} />
        </motion.button>
        <motion.button
          type="button"
          whileTap={{ scale: 0.92 }}
          onClick={() => onShare(article)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.08] text-white/[0.72] backdrop-blur-xl"
          aria-label="Share article"
        >
          <Share2 size={18} strokeWidth={2.2} />
        </motion.button>
      </div>

      <ArticleImage
        article={article}
        className="mt-7 h-[280px] w-full overflow-hidden rounded-[30px] border border-white/[0.08] bg-white/[0.05] shadow-[0_24px_70px_rgba(0,0,0,0.28)]"
      />

      {article.description && (
        <p className="mt-6 text-[18px] font-normal leading-8 text-white/80">
          {article.description}
        </p>
      )}

      {shouldShowArticleContent && (
        <div className="mt-6 space-y-5 text-[17px] leading-8 text-white/[0.68]">
          {articleContent
            ?.split(/\n+/)
            .map((paragraph) => paragraph.trim())
            .filter(Boolean)
            .map((paragraph, index) => (
              <p key={`${article.id}-paragraph-${index}`}>{paragraph}</p>
            ))}
        </div>
      )}

      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        onClick={openOriginalArticle}
        className="mt-8 flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-white px-5 text-[16px] font-semibold text-black shadow-[0_18px_50px_rgba(255,255,255,0.12)]"
      >
        Read Full Article
        <ExternalLink size={17} strokeWidth={2.2} />
      </motion.button>
    </div>
  )
}

export default function Safari({ onBack }: SafariProps) {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null)
  const [query, setQuery] = useState("")
  const [activeTopic, setActiveTopic] = useState<Topic>("Top")
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const fetchNews = useCallback(async () => {
    setIsLoading(true)
    setHasError(false)

    try {
      const response = await fetch("/api/news")

      if (!response.ok) {
        throw new Error("News request failed.")
      }

      const data = (await response.json()) as unknown

      if (!Array.isArray(data)) {
        throw new Error("News response was invalid.")
      }

      setArticles(data as NewsArticle[])
    } catch {
      setHasError(true)
      setArticles([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchNews()
  }, [fetchNews])

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return articles.filter((article) => {
      const matchesSearch =
        !normalizedQuery || getArticleText(article).includes(normalizedQuery)

      return matchesSearch && matchesTopic(article, activeTopic)
    })
  }, [activeTopic, articles, query])

  const feedArticles = filteredArticles.slice(0, 15)
  const trendingArticles = articles.slice(0, 5)

  const toggleBookmark = useCallback((id: string) => {
    setBookmarkedIds((previous) => {
      const next = new Set(previous)

      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }

      return next
    })
  }, [])

  const shareArticle = useCallback((article: NewsArticle) => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.description ?? article.source,
        url: article.url,
      })

      return
    }

    navigator.clipboard?.writeText(article.url)
  }, [])

  const openArticle = useCallback((article: NewsArticle) => {
    setSelectedArticle(article)
  }, [])

  const handleBack = useCallback(() => {
    if (selectedArticle) {
      setSelectedArticle(null)
      return
    }

    onBack?.()
  }, [onBack, selectedArticle])

  return (
    <div
      className={[
        "h-full overflow-hidden text-white",
        "bg-black",
      ].join(" ")}
    >
      {(onBack || selectedArticle) && (
        <div className="fixed top-14 left-6 z-50">
          <IOSBackButton onClick={handleBack} />
        </div>
      )}
      {(onBack || selectedArticle) && (
        <div className="fixed top-14 left-6 z-50">
          <IOSBackButton onClick={handleBack} />
        </div>
      )}

      <div
        className="
    pointer-events-none
    absolute
    inset-x-0
    top-0
    h-36
    z-40
    bg-gradient-to-b
    from-black
    via-black/90
    to-transparent
  "
      />

      <AnimatePresence initial={false}></AnimatePresence>
      <AnimatePresence initial={false}>
        {!selectedArticle ? (
          <motion.div
            key="safari-feed"
            initial={{ x: -8, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -18, opacity: 0.92 }}
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 36,
              mass: 0.9,
            }}
            className="absolute inset-0 overflow-y-auto px-6 pb-24 pt-28"
          >
            <header className="mt-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-[38px] font-bold leading-none tracking-tight">
                    Safari
                  </h1>
                  <p className="mt-2 text-[16px] font-medium text-white/[0.45]">
                    Today's Briefing
                  </p>
                </div>

                <motion.button
                  type="button"
                  whileTap={{ scale: 0.92 }}
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.08] text-[16px] font-semibold text-white shadow-[0_12px_34px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl"
                  aria-label="Profile"
                >
                  MS
                </motion.button>
              </div>

              <div className="mt-6 flex h-12 items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.08] px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-2xl">
                <Search className="h-5 w-5 text-white/[0.38]" strokeWidth={2.2} />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search stories"
                  className="min-w-0 flex-1 bg-transparent text-[16px] text-white outline-none placeholder:text-white/[0.35]"
                  type="search"
                />
              </div>
            </header>

            <nav className="-mx-6 mt-6 overflow-x-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex w-max gap-2">
                {topics.map((topic) => {
                  const isActive = topic === activeTopic

                  return (
                    <motion.button
                      key={topic}
                      type="button"
                      whileTap={{ scale: 0.94 }}
                      onClick={() => setActiveTopic(topic)}
                      className={[
                        "h-10 rounded-full px-4 text-[14px] font-semibold transition-colors",
                        isActive
                          ? "bg-white text-black"
                          : "bg-white/[0.08] text-white/[0.62]",
                      ].join(" ")}
                    >
                      {topic}
                    </motion.button>
                  )
                })}
              </div>
            </nav>

            {isLoading ? (
              <div className="mt-7 space-y-4">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </div>
            ) : hasError ? (
              <EmptyState onRetry={fetchNews} />
            ) : filteredArticles.length === 0 ? (
              <EmptyState onRetry={fetchNews} />
            ) : (
              <>
                <section className="mt-7 space-y-4">
                  <h2 className="text-[25px] font-semibold tracking-tight">
                    Latest News
                  </h2>
                  {feedArticles.map((article, index) => (
                    <NewsCard
                      key={article.id}
                      article={article}
                      index={index}
                      isBookmarked={bookmarkedIds.has(article.id)}
                      onToggleBookmark={toggleBookmark}
                      onShare={shareArticle}
                      onOpen={openArticle}
                    />
                  ))}
                </section>

                {trendingArticles.length > 0 && (
                  <section className="mt-10">
                    <h2 className="mb-4 text-[25px] font-semibold tracking-tight">
                      Trending Today
                    </h2>
                    <div className="space-y-3">
                      {trendingArticles.map((article, index) => (
                        <TrendingRow
                          key={article.id}
                          article={article}
                          index={index}
                          onOpen={openArticle}
                        />
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="safari-reader"
            initial={{ x: 24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 24, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 36,
              mass: 0.9,
            }}
            className="absolute inset-0 overflow-y-auto px-6 pb-24 pt-32"
          >
            <ArticleReader
              article={selectedArticle}
              isBookmarked={bookmarkedIds.has(selectedArticle.id)}
              onToggleBookmark={toggleBookmark}
              onShare={shareArticle}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
