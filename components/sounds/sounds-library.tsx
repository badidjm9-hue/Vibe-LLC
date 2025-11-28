"use client"

import { useState } from "react"
import { ArrowLeft, Search, Play, Pause, Heart, Plus, Music, TrendingUp, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface SoundsLibraryProps {
  onBack: () => void
  onSelectSound: (sound: Sound) => void
}

interface Sound {
  id: string
  name: string
  artist: string
  duration: string
  cover: string
  isOriginal: boolean
  usageCount: number
  isTrending: boolean
  isFavorite?: boolean
}

const mockSounds: Sound[] = [
  {
    id: "1",
    name: "Summer Vibes",
    artist: "DJ Cool",
    duration: "0:30",
    cover: "/summer-music-album.jpg",
    isOriginal: false,
    usageCount: 125000,
    isTrending: true,
  },
  {
    id: "2",
    name: "Original Sound",
    artist: "aurora_skye",
    duration: "0:15",
    cover: "/blonde-woman-avatar-illustration.jpg",
    isOriginal: true,
    usageCount: 45000,
    isTrending: true,
  },
  {
    id: "3",
    name: "Beat Drop",
    artist: "Bass Master",
    duration: "0:45",
    cover: "/electronic-music.jpg",
    isOriginal: false,
    usageCount: 89000,
    isTrending: false,
  },
  {
    id: "4",
    name: "Lo-fi Chill",
    artist: "Chill Hop",
    duration: "1:00",
    cover: "/lofi-music.jpg",
    isOriginal: false,
    usageCount: 230000,
    isTrending: true,
  },
  {
    id: "5",
    name: "Dance Remix",
    artist: "Mix Pro",
    duration: "0:20",
    cover: "/dance-music.jpg",
    isOriginal: false,
    usageCount: 67000,
    isTrending: false,
  },
]

const categories = ["For You", "Trending", "New", "Favorites", "My Sounds"]

export function SoundsLibrary({ onBack, onSelectSound }: SoundsLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("For You")
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])

  const filteredSounds = mockSounds.filter((sound) => {
    const matchesSearch =
      searchQuery === "" ||
      sound.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sound.artist.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeCategory === "Trending") return matchesSearch && sound.isTrending
    if (activeCategory === "Favorites") return matchesSearch && favorites.includes(sound.id)
    if (activeCategory === "My Sounds") return matchesSearch && sound.isOriginal

    return matchesSearch
  })

  const togglePlay = (id: string) => {
    setPlayingId(playingId === id ? null : id)
  }

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]))
  }

  const formatCount = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
    if (count >= 1000) return `${(count / 1000).toFixed(0)}K`
    return count.toString()
  }

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 safe-top">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-bold text-white">Sounds</h1>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
          <input
            type="text"
            placeholder="Search sounds..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 glass rounded-xl text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all",
                activeCategory === cat ? "gradient-button text-white" : "glass text-white/70",
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured sound */}
      {activeCategory === "For You" && (
        <div className="px-4 mb-6">
          <div className="glass rounded-2xl p-4 flex items-center gap-4">
            <div className="relative">
              <img src="/featured-music-album.jpg" alt="Featured" className="w-20 h-20 rounded-xl object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-xl">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-pink-500 text-white text-xs rounded-full">#1 Trending</span>
              </div>
              <p className="text-white font-bold text-lg mt-1">Viral Sound</p>
              <p className="text-white/60 text-sm">2.5M videos</p>
            </div>
            <button className="p-3 gradient-button rounded-full">
              <Plus className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Sounds list */}
      <div className="px-4 space-y-3">
        {filteredSounds.map((sound) => (
          <div key={sound.id} className="glass rounded-2xl p-3 flex items-center gap-3">
            <button onClick={() => togglePlay(sound.id)} className="relative flex-shrink-0">
              <img
                src={sound.cover || "/placeholder.svg"}
                alt={sound.name}
                className="w-14 h-14 rounded-xl object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-xl">
                {playingId === sound.id ? (
                  <Pause className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white ml-0.5" />
                )}
              </div>
              {playingId === sound.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 rounded-b-xl overflow-hidden">
                  <div className="h-full bg-pink-500 animate-progress" />
                </div>
              )}
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-white truncate">{sound.name}</p>
                {sound.isTrending && <TrendingUp className="w-4 h-4 text-pink-400 flex-shrink-0" />}
              </div>
              <p className="text-sm text-white/60 truncate">{sound.artist}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-white/40 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {sound.duration}
                </span>
                <span className="text-xs text-white/40 flex items-center gap-1">
                  <Music className="w-3 h-3" />
                  {formatCount(sound.usageCount)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => toggleFavorite(sound.id)} className="p-2">
                <Heart
                  className={cn(
                    "w-5 h-5 transition-colors",
                    favorites.includes(sound.id) ? "text-pink-500 fill-pink-500" : "text-white/50",
                  )}
                />
              </button>
              <button
                onClick={() => onSelectSound(sound)}
                className="px-3 py-1.5 gradient-button rounded-full text-sm text-white font-medium"
              >
                Use
              </button>
            </div>
          </div>
        ))}

        {filteredSounds.length === 0 && (
          <div className="text-center py-12">
            <Music className="w-12 h-12 text-white/30 mx-auto mb-3" />
            <p className="text-white/60">No sounds found</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        .animate-progress {
          animation: progress 30s linear;
        }
      `}</style>
    </div>
  )
}
