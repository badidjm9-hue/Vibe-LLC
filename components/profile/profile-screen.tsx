"use client"

import { useState } from "react"
import {
  Settings,
  Grid3X3,
  List,
  Edit3,
  Bookmark,
  Heart,
  MoreHorizontal,
  Share2,
  Coins,
  BarChart3,
  DollarSign,
  Video,
  Users,
  Zap,
  Star,
  TrendingUp,
} from "lucide-react"
import { useApp } from "@/contexts/app-context"
import { cn } from "@/lib/utils"

const tabs = ["Videos", "Liked", "Saved"]

const mockVideos = Array.from({ length: 12 }, (_, i) => ({
  id: `video-${i}`,
  thumbnail: `/placeholder.svg?height=200&width=150&query=video thumbnail ${i + 1}`,
  views: Math.floor(Math.random() * 1000000),
}))

interface ProfileScreenProps {
  onNavigate?: (screen: string) => void
}

export function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const { user } = useApp()
  const [activeTab, setActiveTab] = useState("Videos")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showMenu, setShowMenu] = useState(false)

  const formatCount = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
    return count.toString()
  }

  const getFilteredVideos = () => {
    switch (activeTab) {
      case "Liked":
        return mockVideos.slice(0, 6)
      case "Saved":
        return mockVideos.slice(0, 4)
      default:
        return mockVideos
    }
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="glass-dark px-4 py-3 flex items-center justify-between safe-top">
        <button
          onClick={() => onNavigate?.("coinStore")}
          className="flex items-center gap-1 px-3 py-1.5 glass rounded-full"
        >
          <Coins className="w-4 h-4 text-yellow-400" />
          <span className="text-yellow-400 text-sm font-bold">{user?.coins || 0}</span>
        </button>
        <h1 className="font-bold text-white">@{user?.username}</h1>
        <button onClick={() => onNavigate?.("settings")} className="w-10 h-10 flex items-center justify-center">
          <Settings className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Profile info */}
      <div className="px-6 py-8 flex flex-col items-center">
        <div className="relative mb-4">
          <img
            src={user?.avatar || "/placeholder.svg?height=100&width=100&query=user avatar"}
            alt={user?.displayName}
            className="w-24 h-24 rounded-full border-4 border-purple-400/50 object-cover"
          />
          <button
            onClick={() => onNavigate?.("editProfile")}
            className="absolute bottom-0 right-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center border-2 border-background"
          >
            <Edit3 className="w-4 h-4 text-white" />
          </button>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-background">
            <Star className="w-3 h-3 text-white fill-white" />
          </div>
        </div>

        <h2 className="text-xl font-bold text-white mb-1">{user?.displayName}</h2>
        <p className="text-white/60 text-sm text-center max-w-xs">{user?.bio}</p>

        <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar w-full justify-center">
          <button
            onClick={() => onNavigate?.("monetization")}
            className="flex items-center gap-2 px-4 py-2 glass rounded-full text-sm"
          >
            <DollarSign className="w-4 h-4 text-green-400" />
            <span className="text-white">$1,234</span>
          </button>
          <button
            onClick={() => onNavigate?.("live")}
            className="flex items-center gap-2 px-4 py-2 glass rounded-full text-sm"
          >
            <Video className="w-4 h-4 text-red-400" />
            <span className="text-white">Go Live</span>
          </button>
          <button
            onClick={() => onNavigate?.("challenges")}
            className="flex items-center gap-2 px-4 py-2 glass rounded-full text-sm"
          >
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-white">Challenges</span>
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => onNavigate?.("editProfile")}
            className="px-6 py-2 gradient-button rounded-xl text-white text-sm font-medium"
          >
            Edit Profile
          </button>
          <button
            onClick={() => onNavigate?.("analytics")}
            className="px-6 py-2 bg-white/10 rounded-xl text-white text-sm font-medium flex items-center gap-2"
          >
            <BarChart3 className="w-4 h-4" />
            Analytics
          </button>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center"
            >
              <MoreHorizontal className="w-5 h-5 text-white" />
            </button>
            {showMenu && (
              <div className="absolute top-12 right-0 glass rounded-xl overflow-hidden min-w-[180px] z-50">
                <button
                  onClick={() => {
                    onNavigate?.("monetization")
                    setShowMenu(false)
                  }}
                  className="w-full px-4 py-3 text-left text-white hover:bg-white/10 flex items-center gap-2"
                >
                  <DollarSign className="w-4 h-4 text-green-400" />
                  Monetization
                </button>
                <button
                  onClick={() => {
                    onNavigate?.("settings")
                    setShowMenu(false)
                  }}
                  className="w-full px-4 py-3 text-left text-white hover:bg-white/10 flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                <button
                  onClick={() => setShowMenu(false)}
                  className="w-full px-4 py-3 text-left text-white hover:bg-white/10 flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share Profile
                </button>
                <button
                  onClick={() => {
                    onNavigate?.("coinStore")
                    setShowMenu(false)
                  }}
                  className="w-full px-4 py-3 text-left text-white hover:bg-white/10 flex items-center gap-2"
                >
                  <Coins className="w-4 h-4 text-yellow-400" />
                  Coin Store
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-6 mt-6">
          {[
            { label: "Followers", value: user?.followers || 0, icon: Users },
            { label: "Following", value: user?.following || 0, icon: Heart },
            { label: "Likes", value: user?.likes || 0, icon: TrendingUp },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-2xl px-6 py-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <stat.icon className="w-4 h-4 text-pink-400" />
                <p className="text-lg font-bold text-white">{formatCount(stat.value)}</p>
              </div>
              <p className="text-xs text-white/60">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* View mode toggle */}
        <div className="flex glass rounded-2xl mt-6 p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={cn("flex-1 py-3 px-8 rounded-xl transition-all", viewMode === "grid" ? "bg-white/20" : "")}
          >
            <Grid3X3 className="w-5 h-5 text-white mx-auto" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={cn("flex-1 py-3 px-8 rounded-xl transition-all", viewMode === "list" ? "bg-white/20" : "")}
          >
            <List className="w-5 h-5 text-white mx-auto" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 py-4 text-sm font-medium transition-all relative flex items-center justify-center gap-2",
              activeTab === tab ? "text-white" : "text-white/50",
            )}
          >
            {tab === "Liked" && <Heart className="w-4 h-4" />}
            {tab === "Saved" && <Bookmark className="w-4 h-4" />}
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-purple-500 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Video grid */}
      <div className={cn("p-0.5", viewMode === "grid" ? "grid grid-cols-3 gap-0.5" : "space-y-2 px-4")}>
        {getFilteredVideos().map((video) => (
          <button
            key={video.id}
            className={cn(
              "relative",
              viewMode === "grid" ? "aspect-[3/4]" : "w-full aspect-video rounded-xl overflow-hidden",
            )}
          >
            <img src={video.thumbnail || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
            <div className="absolute bottom-2 left-2 flex items-center gap-1">
              <span className="text-white text-xs font-medium">▶ {formatCount(video.views)}</span>
            </div>
          </button>
        ))}
      </div>

      {getFilteredVideos().length === 0 && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
            {activeTab === "Liked" ? (
              <Heart className="w-8 h-8 text-white/40" />
            ) : (
              <Bookmark className="w-8 h-8 text-white/40" />
            )}
          </div>
          <p className="text-white/60">No {activeTab.toLowerCase()} videos yet</p>
        </div>
      )}
    </div>
  )
}
