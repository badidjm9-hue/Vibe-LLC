"use client"

import { useState } from "react"
import { Search, TrendingUp, Hash, Music2, Users } from "lucide-react"
import { cn } from "@/lib/utils"

const categories = [
  { id: "trending", label: "Trending", icon: TrendingUp },
  { id: "hashtags", label: "Hashtags", icon: Hash },
  { id: "sounds", label: "Sounds", icon: Music2 },
  { id: "creators", label: "Creators", icon: Users },
]

const trendingItems = [
  {
    id: "1",
    title: "#summervibe",
    subtitle: "2.3M videos",
    image: "/summer-beach-vibes.jpg",
  },
  {
    id: "2",
    title: "#dancechallenge",
    subtitle: "5.1M videos",
    image: "/vibrant-dance-party.png",
  },
  {
    id: "3",
    title: "#cooking",
    subtitle: "890K videos",
    image: "/cooking-food.png",
  },
  {
    id: "4",
    title: "#travel",
    subtitle: "3.2M videos",
    image: "/travel-adventure.png",
  },
  {
    id: "5",
    title: "#fitness",
    subtitle: "1.5M videos",
    image: "/diverse-fitness-workout.png",
  },
  {
    id: "6",
    title: "#art",
    subtitle: "2.8M videos",
    image: "/abstract-expressionist-painting.png",
  },
]

const suggestedCreators = [
  { id: "c1", username: "creator1", avatar: "/smiling-woman-portrait.png", followers: "1.2M" },
  { id: "c2", username: "creator2", avatar: "/blonde-woman-avatar-illustration.jpg", followers: "890K" },
  { id: "c3", username: "creator3", avatar: "/man-tech-avatar.jpg", followers: "2.1M" },
  { id: "c4", username: "creator4", avatar: "/diverse-woman-avatar.png", followers: "567K" },
  { id: "c5", username: "creator5", avatar: "/man-avatar.png", followers: "3.4M" },
  { id: "c6", username: "creator6", avatar: "/travel-man.jpg", followers: "1.8M" },
]

interface DiscoverScreenProps {
  onNavigate?: (screen: string) => void
  onNavigateToProfile?: (user: {
    id: string
    username: string
    avatar: string
  }) => void
}

export function DiscoverScreen({ onNavigate, onNavigateToProfile }: DiscoverScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("trending")

  const handleSearchFocus = () => {
    if (onNavigate) {
      onNavigate("search")
    }
  }

  const handleCreatorClick = (creator: { id: string; username: string; avatar: string }) => {
    if (onNavigateToProfile) {
      onNavigateToProfile({
        id: creator.id,
        username: creator.username,
        avatar: creator.avatar,
      })
    }
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 safe-top">
        <h1 className="text-2xl font-bold text-white mb-4">Discover</h1>

        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
          <input
            type="text"
            placeholder="Search videos, sounds, users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleSearchFocus}
            className="w-full pl-12 pr-4 py-4 bg-white/10 rounded-2xl text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 px-4 mb-6 overflow-x-auto no-scrollbar">
        {categories.map((cat) => {
          const Icon = cat.icon
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all",
                activeCategory === cat.id ? "gradient-button text-white" : "bg-white/10 text-white/70",
              )}
            >
              <Icon className="w-4 h-4" />
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* Trending grid */}
      <div className="px-4">
        <h2 className="text-lg font-bold text-white mb-4">Trending Now</h2>
        <div className="grid grid-cols-2 gap-3">
          {trendingItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => onNavigate?.("challenges")}
              className={cn(
                "relative rounded-2xl overflow-hidden text-left",
                index === 0 ? "col-span-2 aspect-video" : "aspect-square",
              )}
            >
              <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3">
                <p className="font-bold text-white">{item.title}</p>
                <p className="text-sm text-white/70">{item.subtitle}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Suggested creators */}
      <div className="px-4 mt-8">
        <h2 className="text-lg font-bold text-white mb-4">Suggested Creators</h2>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
          {suggestedCreators.map((creator) => (
            <button
              key={creator.id}
              className="flex flex-col items-center gap-2 min-w-[80px]"
              onClick={() => handleCreatorClick(creator)}
            >
              <img
                src={creator.avatar || "/placeholder.svg"}
                alt={creator.username}
                className="w-16 h-16 rounded-full object-cover border-2 border-pink-400 hover:border-pink-300 transition-colors"
              />
              <p className="text-xs text-white/70 text-center truncate w-full">@{creator.username}</p>
              <p className="text-xs text-white/50">{creator.followers}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
