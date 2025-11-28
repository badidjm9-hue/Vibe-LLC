"use client"

import { useState } from "react"
import { ChevronLeft, MoreHorizontal } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"
import { cn } from "@/lib/utils"

interface OtherProfileProps {
  userId: string
  onBack: () => void
}

const mockUser = {
  username: "aurora_skye",
  displayName: "Aurora Skye",
  avatar: "/blonde-woman-illustration-avatar.jpg",
  bio: "Digital dreamer ✨ | Creating worlds one video at a time. Join the journey!",
  website: "aurora.dev/links",
  followers: 5600000,
  following: 1234,
  likes: 12800000,
  isFollowing: false,
  isVerified: true,
}

const mockVideos = Array.from({ length: 8 }, (_, i) => ({
  id: `video-${i}`,
  thumbnail: `/placeholder.svg?height=300&width=200&query=creative video ${i + 1}`,
  views: Math.floor(Math.random() * 5000000),
}))

export function OtherProfile({ userId, onBack }: OtherProfileProps) {
  const [isFollowing, setIsFollowing] = useState(mockUser.isFollowing)
  const [activeTab, setActiveTab] = useState("Videos")

  const formatCount = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
    return count.toString()
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 safe-top">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="font-bold text-white">{mockUser.username}</h1>
        <button className="w-10 h-10 flex items-center justify-center">
          <MoreHorizontal className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Profile card */}
      <div className="mx-4 glass-card rounded-3xl p-6">
        <div className="flex flex-col items-center">
          <img
            src={mockUser.avatar || "/placeholder.svg"}
            alt={mockUser.displayName}
            className="w-24 h-24 rounded-full border-4 border-pink-400/50 object-cover mb-4"
          />

          {/* Action buttons */}
          <div className="flex gap-3 mb-6">
            <GradientButton
              onClick={() => setIsFollowing(!isFollowing)}
              className={cn("px-8", isFollowing && "bg-white/10 from-transparent to-transparent")}
            >
              {isFollowing ? "Following" : "Follow"}
            </GradientButton>
            <button className="px-8 py-3 bg-white/10 rounded-2xl text-white font-semibold">Message</button>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 mb-4">
            <div className="text-center">
              <p className="text-lg font-bold text-white">{formatCount(mockUser.following)}</p>
              <p className="text-xs text-white/60">Following</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-white">{formatCount(mockUser.followers)}</p>
              <p className="text-xs text-white/60">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-white">{formatCount(mockUser.likes)}</p>
              <p className="text-xs text-white/60">Likes</p>
            </div>
          </div>

          {/* Bio */}
          <div className="text-center">
            <p className="font-semibold text-white">@{mockUser.username}</p>
            <p className="text-sm text-white/70 mt-1">{mockUser.bio}</p>
            <a href="#" className="text-pink-400 text-sm mt-1 block">
              {mockUser.website}
            </a>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 mt-6">
        {["Videos", "Liked", "Saved"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 py-4 text-sm font-medium transition-all relative",
              activeTab === tab ? "text-white" : "text-white/50",
            )}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-purple-500 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Video grid */}
      <div className="grid grid-cols-2 gap-2 p-4">
        {mockVideos.map((video) => (
          <div key={video.id} className="aspect-[3/4] relative rounded-2xl overflow-hidden">
            <img src={video.thumbnail || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
            <div className="absolute bottom-2 left-2 flex items-center gap-1">
              <span className="text-white text-xs font-medium">▶ {formatCount(video.views)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
