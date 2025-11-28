"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Share2,
  MoreHorizontal,
  Grid,
  Bookmark,
  Heart,
  Play,
  Lock,
  MessageCircle,
  Flag,
  UserX,
  Bell,
  BellOff,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface UserProfileViewProps {
  user: {
    id: string
    username: string
    displayName?: string
    avatar: string
    bio?: string
    followers?: number
    following?: number
    likes?: number
    isVerified?: boolean
    isFollowing?: boolean
  }
  onBack: () => void
  onMessage?: (userId: string) => void
}

const mockVideos = [
  { id: "1", thumbnail: "/video-one.png", views: "1.2M", isLocked: false },
  { id: "2", thumbnail: "/video-2.png", views: "890K", isLocked: false },
  { id: "3", thumbnail: "/video-3.jpg", views: "456K", isLocked: false },
  { id: "4", thumbnail: "/video-4.jpg", views: "234K", isLocked: true },
  { id: "5", thumbnail: "/video-5.jpg", views: "123K", isLocked: false },
  { id: "6", thumbnail: "/video-6.jpg", views: "89K", isLocked: false },
]

export function UserProfileView({ user, onBack, onMessage }: UserProfileViewProps) {
  const [activeTab, setActiveTab] = useState<"videos" | "liked" | "saved">("videos")
  const [isFollowing, setIsFollowing] = useState(user.isFollowing || false)
  const [showMenu, setShowMenu] = useState(false)
  const [notificationsOn, setNotificationsOn] = useState(false)

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
    if (num >= 1000) return (num / 1000).toFixed(1) + "K"
    return num.toString()
  }

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing)
    if (!isFollowing) {
      // Show notification toggle when following
      setNotificationsOn(true)
    }
  }

  const handleMessageClick = () => {
    if (onMessage) {
      onMessage(user.id)
    }
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 safe-top flex items-center justify-between">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h1 className="text-lg font-bold text-white">@{user.username}</h1>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
          >
            <MoreHorizontal className="w-5 h-5 text-white" />
          </button>
          {showMenu && (
            <div className="absolute top-12 right-0 glass rounded-xl overflow-hidden min-w-[180px] z-50">
              <button
                onClick={() => {
                  setNotificationsOn(!notificationsOn)
                  setShowMenu(false)
                }}
                className="w-full px-4 py-3 text-left text-white hover:bg-white/10 flex items-center gap-2"
              >
                {notificationsOn ? <BellOff className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                {notificationsOn ? "Turn off notifications" : "Turn on notifications"}
              </button>
              <button
                onClick={() => setShowMenu(false)}
                className="w-full px-4 py-3 text-left text-white hover:bg-white/10 flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share profile
              </button>
              <button
                onClick={() => setShowMenu(false)}
                className="w-full px-4 py-3 text-left text-white hover:bg-white/10 flex items-center gap-2"
              >
                <Flag className="w-4 h-4" />
                Report
              </button>
              <button
                onClick={() => setShowMenu(false)}
                className="w-full px-4 py-3 text-left text-red-400 hover:bg-white/10 flex items-center gap-2"
              >
                <UserX className="w-4 h-4" />
                Block
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-4 text-center">
        <div className="relative w-24 h-24 mx-auto mb-4">
          <img
            src={user.avatar || "/placeholder.svg"}
            alt={user.username}
            className="w-full h-full rounded-full object-cover border-3 border-pink-500"
          />
          {user.isVerified && (
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-pink-500 rounded-full flex items-center justify-center border-2 border-black">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>

        <h2 className="text-xl font-bold text-white mb-1">{user.displayName || user.username}</h2>
        <p className="text-white/60 text-sm mb-4">@{user.username}</p>

        {/* Stats */}
        <div className="flex justify-center gap-8 mb-4">
          <div className="text-center">
            <p className="text-xl font-bold text-white">{formatNumber(user.following || 150)}</p>
            <p className="text-white/60 text-sm">Following</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-white">{formatNumber(user.followers || 12500)}</p>
            <p className="text-white/60 text-sm">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-white">{formatNumber(user.likes || 58000)}</p>
            <p className="text-white/60 text-sm">Likes</p>
          </div>
        </div>

        {/* Bio */}
        {user.bio && <p className="text-white/80 text-sm mb-4 max-w-xs mx-auto">{user.bio}</p>}

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center mb-6">
          <button
            onClick={handleFollowToggle}
            className={cn(
              "px-8 py-3 rounded-xl font-semibold transition-all",
              isFollowing ? "bg-white/10 text-white" : "gradient-button text-white",
            )}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
          <button
            onClick={handleMessageClick}
            className="px-6 py-3 bg-white/10 rounded-xl font-semibold text-white flex items-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Message
          </button>
          <button className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
            <Share2 className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 mb-4">
        <button
          onClick={() => setActiveTab("videos")}
          className={cn(
            "flex-1 py-3 flex items-center justify-center gap-2 transition-all border-b-2",
            activeTab === "videos" ? "border-pink-500 text-white" : "border-transparent text-white/50",
          )}
        >
          <Grid className="w-5 h-5" />
        </button>
        <button
          onClick={() => setActiveTab("liked")}
          className={cn(
            "flex-1 py-3 flex items-center justify-center gap-2 transition-all border-b-2",
            activeTab === "liked" ? "border-pink-500 text-white" : "border-transparent text-white/50",
          )}
        >
          <Heart className="w-5 h-5" />
        </button>
        <button
          onClick={() => setActiveTab("saved")}
          className={cn(
            "flex-1 py-3 flex items-center justify-center gap-2 transition-all border-b-2",
            activeTab === "saved" ? "border-pink-500 text-white" : "border-transparent text-white/50",
          )}
        >
          <Bookmark className="w-5 h-5" />
        </button>
      </div>

      {/* Videos Grid */}
      <div className="px-2 grid grid-cols-3 gap-1">
        {mockVideos.map((video) => (
          <button key={video.id} className="relative aspect-[9/16] rounded-lg overflow-hidden group">
            <img src={video.thumbnail || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all" />
            {video.isLocked && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                <Lock className="w-6 h-6 text-white" />
              </div>
            )}
            <div className="absolute bottom-1 left-1 flex items-center gap-1">
              <Play className="w-3 h-3 text-white fill-white" />
              <span className="text-white text-xs font-medium">{video.views}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
