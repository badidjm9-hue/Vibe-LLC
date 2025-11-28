"use client"

import { useState } from "react"
import { ArrowLeft, Search, X, TrendingUp, Clock, Hash, User, Music, Filter } from "lucide-react"

interface AdvancedSearchProps {
  onBack: () => void
}

const trendingSearches = [
  { id: "1", term: "dance challenge", count: "2.5M videos" },
  { id: "2", term: "cooking hacks", count: "1.8M videos" },
  { id: "3", term: "fitness routine", count: "956K videos" },
  { id: "4", term: "travel vlog", count: "1.2M videos" },
  { id: "5", term: "makeup tutorial", count: "3.1M videos" },
]

const recentSearches = ["sunset photography", "lo-fi music", "street food", "coding tips"]

const suggestedUsers = [
  {
    id: "1",
    username: "aurora_skye",
    name: "Aurora Skye",
    avatar: "/blonde-woman-avatar-illustration.jpg",
    followers: "5.6M",
    isVerified: true,
  },
  {
    id: "2",
    username: "tech_wizard",
    name: "Tech Wizard",
    avatar: "/man-tech-avatar.jpg",
    followers: "2.1M",
    isVerified: true,
  },
  {
    id: "3",
    username: "travel_mike",
    name: "Mike Travels",
    avatar: "/traveler-man.jpg",
    followers: "890K",
    isVerified: false,
  },
]

const trendingSounds = [
  { id: "1", name: "Original Sound - DJ Neon", uses: "1.2M videos" },
  { id: "2", name: "Trending Beat 2024", uses: "856K videos" },
  { id: "3", name: "Viral Dance Mix", uses: "2.3M videos" },
]

export function AdvancedSearch({ onBack }: AdvancedSearchProps) {
  const [query, setQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<"all" | "users" | "videos" | "sounds" | "hashtags">("all")
  const [showFilters, setShowFilters] = useState(false)

  const filters = [
    { id: "all", label: "All", icon: Search },
    { id: "users", label: "Users", icon: User },
    { id: "videos", label: "Videos", icon: TrendingUp },
    { id: "sounds", label: "Sounds", icon: Music },
    { id: "hashtags", label: "Tags", icon: Hash },
  ]

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 safe-top glass">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
            <input
              type="text"
              placeholder="Search videos, users, sounds..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3 bg-white/10 rounded-2xl text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-pink-500"
              autoFocus
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2">
                <X className="w-5 h-5 text-white/50" />
              </button>
            )}
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className="p-2">
            <Filter className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id as typeof activeFilter)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap ${
                activeFilter === filter.id ? "gradient-button" : "glass"
              }`}
            >
              <filter.icon className="w-4 h-4 text-white" />
              <span className="text-sm text-white">{filter.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Advanced filters */}
      {showFilters && (
        <div className="px-4 py-3 glass border-b border-white/10">
          <div className="grid grid-cols-2 gap-3">
            <div className="glass rounded-xl p-3">
              <p className="text-xs text-white/60 mb-2">Date</p>
              <select className="w-full bg-transparent text-white text-sm outline-none">
                <option value="all">All time</option>
                <option value="today">Today</option>
                <option value="week">This week</option>
                <option value="month">This month</option>
              </select>
            </div>
            <div className="glass rounded-xl p-3">
              <p className="text-xs text-white/60 mb-2">Sort by</p>
              <select className="w-full bg-transparent text-white text-sm outline-none">
                <option value="relevance">Relevance</option>
                <option value="views">Most views</option>
                <option value="likes">Most likes</option>
                <option value="recent">Most recent</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {!query ? (
        <>
          {/* Recent searches */}
          {recentSearches.length > 0 && (
            <div className="px-4 mt-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-white">Recent</h2>
                <button className="text-sm text-pink-400">Clear all</button>
              </div>
              <div className="space-y-2">
                {recentSearches.map((search, i) => (
                  <button key={i} className="w-full glass rounded-xl p-3 flex items-center gap-3">
                    <Clock className="w-5 h-5 text-white/50" />
                    <span className="text-white flex-1 text-left">{search}</span>
                    <X className="w-4 h-4 text-white/50" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Trending searches */}
          <div className="px-4 mt-6">
            <h2 className="text-lg font-semibold text-white mb-3">Trending Searches</h2>
            <div className="space-y-2">
              {trendingSearches.map((item, i) => (
                <button key={item.id} className="w-full glass rounded-xl p-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full gradient-button flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{i + 1}</span>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-white font-medium">{item.term}</p>
                    <p className="text-xs text-white/60">{item.count}</p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </button>
              ))}
            </div>
          </div>

          {/* Suggested users */}
          <div className="px-4 mt-6">
            <h2 className="text-lg font-semibold text-white mb-3">Suggested Users</h2>
            <div className="space-y-2">
              {suggestedUsers.map((user) => (
                <button key={user.id} className="w-full glass rounded-xl p-3 flex items-center gap-3">
                  <img
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-1">
                      <p className="text-white font-medium">{user.name}</p>
                      {user.isVerified && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-[8px]">✓</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-white/60">
                      @{user.username} · {user.followers} followers
                    </p>
                  </div>
                  <button className="px-4 py-1.5 gradient-button rounded-full">
                    <span className="text-white text-sm font-semibold">Follow</span>
                  </button>
                </button>
              ))}
            </div>
          </div>

          {/* Trending sounds */}
          <div className="px-4 mt-6 pb-8">
            <h2 className="text-lg font-semibold text-white mb-3">Trending Sounds</h2>
            <div className="space-y-2">
              {trendingSounds.map((sound) => (
                <button key={sound.id} className="w-full glass rounded-xl p-3 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl gradient-button flex items-center justify-center">
                    <Music className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-white font-medium">{sound.name}</p>
                    <p className="text-xs text-white/60">{sound.uses}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="px-4 mt-4">
          <p className="text-white/60 text-center py-8">Search results for "{query}" would appear here</p>
        </div>
      )}
    </div>
  )
}
