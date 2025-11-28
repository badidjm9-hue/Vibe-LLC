"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Search, X, TrendingUp, Clock, Users, Play, Hash, Mic } from "lucide-react"
import { cn } from "@/lib/utils"

interface AdvancedSearchScreenProps {
  onBack: () => void
  onNavigate: (screen: string) => void
  onViewUserProfile: (userId: string) => void
}

type SearchTab = "top" | "users" | "videos" | "sounds" | "hashtags"

interface SearchResult {
  id: string
  type: "user" | "video" | "sound" | "hashtag"
  title: string
  subtitle: string
  thumbnail?: string
  avatar?: string
  isVerified?: boolean
  stats: string
}

const recentSearches = ["dance tutorial", "cooking hacks", "@alex_design", "#summervibes"]

const trendingSearches = [
  { term: "viral dance 2024", count: "2.5M" },
  { term: "easy recipes", count: "1.8M" },
  { term: "workout routine", count: "950K" },
  { term: "travel tips", count: "780K" },
  { term: "fashion trends", count: "650K" },
]

const mockResults: SearchResult[] = [
  {
    id: "u1",
    type: "user",
    title: "alex_design",
    subtitle: "Alex Designer",
    avatar: "/man-designer-portrait.jpg",
    isVerified: true,
    stats: "1.2M followers",
  },
  {
    id: "u2",
    type: "user",
    title: "sarah_creates",
    subtitle: "Sarah Creative",
    avatar: "/woman-creator-portrait.png",
    isVerified: true,
    stats: "890K followers",
  },
  {
    id: "v1",
    type: "video",
    title: "Amazing dance tutorial",
    subtitle: "@alex_design",
    thumbnail: "/video-one.png",
    stats: "2.5M views",
  },
  {
    id: "v2",
    type: "video",
    title: "5 minute recipes",
    subtitle: "@foodie_master",
    thumbnail: "/video-2.png",
    stats: "1.8M views",
  },
  {
    id: "s1",
    type: "sound",
    title: "Original Sound - Trending Beat",
    subtitle: "@music_producer",
    stats: "45K videos",
  },
  {
    id: "h1",
    type: "hashtag",
    title: "#dancechallenge",
    subtitle: "Trending in Dance",
    stats: "125M views",
  },
]

export function AdvancedSearchScreen({ onBack, onNavigate, onViewUserProfile }: AdvancedSearchScreenProps) {
  const [query, setQuery] = useState("")
  const [activeTab, setActiveTab] = useState<SearchTab>("top")
  const [results, setResults] = useState<SearchResult[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    if (query.length > 0) {
      setIsSearching(true)
      const timer = setTimeout(() => {
        setResults(
          mockResults.filter(
            (r) =>
              r.title.toLowerCase().includes(query.toLowerCase()) ||
              r.subtitle.toLowerCase().includes(query.toLowerCase()),
          ),
        )
        setIsSearching(false)
      }, 300)
      return () => clearTimeout(timer)
    } else {
      setResults([])
    }
  }, [query])

  const filteredResults = results.filter((r) => {
    if (activeTab === "top") return true
    if (activeTab === "users") return r.type === "user"
    if (activeTab === "videos") return r.type === "video"
    if (activeTab === "sounds") return r.type === "sound"
    if (activeTab === "hashtags") return r.type === "hashtag"
    return true
  })

  const handleResultClick = (result: SearchResult) => {
    if (result.type === "user") {
      onViewUserProfile(result.id)
    } else if (result.type === "video") {
      onNavigate("home")
    } else if (result.type === "hashtag") {
      onNavigate("challenges")
    }
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 safe-top glass sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>

          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
            <input
              type="text"
              placeholder="Search users, videos, sounds..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              className="w-full pl-10 pr-10 py-3 bg-white/10 rounded-xl text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-pink-500"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="w-5 h-5 text-white/50" />
              </button>
            )}
          </div>

          <button className="p-2 glass rounded-full">
            <Mic className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Tabs */}
        {query && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {(["top", "users", "videos", "sounds", "hashtags"] as SearchTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium capitalize whitespace-nowrap transition-colors",
                  activeTab === tab ? "bg-pink-500 text-white" : "glass text-white/70",
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      {!query ? (
        <div className="px-4 pt-4">
          {/* Recent searches */}
          {recentSearches.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-white/50" />
                  Recent Searches
                </h2>
                <button className="text-sm text-pink-400">Clear all</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term, i) => (
                  <button
                    key={i}
                    onClick={() => setQuery(term)}
                    className="px-3 py-2 glass rounded-full text-sm text-white/80 flex items-center gap-2"
                  >
                    {term.startsWith("@") ? (
                      <Users className="w-3 h-3" />
                    ) : term.startsWith("#") ? (
                      <Hash className="w-3 h-3" />
                    ) : (
                      <Clock className="w-3 h-3" />
                    )}
                    {term}
                    <X className="w-3 h-3 text-white/50" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Trending searches */}
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-pink-400" />
              Trending Searches
            </h2>
            <div className="space-y-2">
              {trendingSearches.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setQuery(item.term)}
                  className="w-full flex items-center gap-3 p-3 glass rounded-xl"
                >
                  <span className="w-6 h-6 rounded-full bg-pink-500/20 text-pink-400 text-sm font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="flex-1 text-left text-white">{item.term}</span>
                  <span className="text-sm text-white/50">{item.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="px-4 pt-4">
          {isSearching ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredResults.length > 0 ? (
            <div className="space-y-3">
              {filteredResults.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className="w-full flex items-center gap-3 p-3 glass rounded-xl"
                >
                  {result.type === "user" && (
                    <img
                      src={result.avatar || "/placeholder.svg"}
                      alt={result.title}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  {result.type === "video" && (
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden">
                      <img
                        src={result.thumbnail || "/placeholder.svg"}
                        alt={result.title}
                        className="w-full h-full object-cover"
                      />
                      <Play className="absolute inset-0 m-auto w-5 h-5 text-white" />
                    </div>
                  )}
                  {result.type === "sound" && (
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                      <Mic className="w-5 h-5 text-white" />
                    </div>
                  )}
                  {result.type === "hashtag" && (
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                      <Hash className="w-6 h-6 text-pink-400" />
                    </div>
                  )}

                  <div className="flex-1 text-left">
                    <p className="font-semibold text-white flex items-center gap-1">
                      {result.title}
                      {result.isVerified && (
                        <span className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-[10px]">✓</span>
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-white/60">{result.subtitle}</p>
                  </div>

                  <span className="text-xs text-white/50">{result.stats}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <Search className="w-12 h-12 text-white/20 mb-4" />
              <p className="text-white/60">No results found for "{query}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
