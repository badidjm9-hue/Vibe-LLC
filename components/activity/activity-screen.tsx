"use client"

import { useState } from "react"
import { Heart, MessageCircle, UserPlus, AtSign, Gift } from "lucide-react"
import { cn } from "@/lib/utils"

const tabs = ["All", "Likes", "Comments", "Follows", "Mentions"]

const mockNotifications = [
  {
    id: "1",
    type: "like",
    user: { id: "u1", name: "alex_design", avatar: "/man.jpg" },
    content: "liked your video",
    timestamp: "2m",
    thumbnail: "/video-production-setup.png",
  },
  {
    id: "2",
    type: "follow",
    user: { id: "u2", name: "sarah_creates", avatar: "/diverse-woman-portrait.png" },
    content: "started following you",
    timestamp: "15m",
    isFollowing: false,
  },
  {
    id: "3",
    type: "comment",
    user: { id: "u3", name: "mike_travels", avatar: "/lone-traveler-mountain-path.png" },
    content: 'commented: "Amazing content!"',
    timestamp: "1h",
    thumbnail: "/diverse-travelers-world-map.png",
  },
  {
    id: "4",
    type: "mention",
    user: { id: "u4", name: "creative_jen", avatar: "/abstract-creative-explosion.png" },
    content: "mentioned you in a video",
    timestamp: "3h",
    thumbnail: "/abstract-creative-explosion.png",
  },
  {
    id: "5",
    type: "gift",
    user: { id: "u5", name: "fan_123", avatar: "/electric-fan.png" },
    content: "sent you a Diamond",
    timestamp: "5h",
  },
]

const iconMap = {
  like: Heart,
  comment: MessageCircle,
  follow: UserPlus,
  mention: AtSign,
  gift: Gift,
}

interface ActivityScreenProps {
  onNavigateToProfile?: (user: {
    id: string
    username: string
    avatar: string
  }) => void
}

export function ActivityScreen({ onNavigateToProfile }: ActivityScreenProps) {
  const [activeTab, setActiveTab] = useState("All")
  const [followedUsers, setFollowedUsers] = useState<string[]>([])

  const filteredNotifications = mockNotifications.filter((notif) => {
    if (activeTab === "All") return true
    if (activeTab === "Likes") return notif.type === "like"
    if (activeTab === "Comments") return notif.type === "comment"
    if (activeTab === "Follows") return notif.type === "follow"
    if (activeTab === "Mentions") return notif.type === "mention"
    return true
  })

  const handleFollow = (userId: string) => {
    setFollowedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const handleProfileClick = (user: { id: string; name: string; avatar: string }) => {
    if (onNavigateToProfile) {
      onNavigateToProfile({
        id: user.id,
        username: user.name,
        avatar: user.avatar,
      })
    }
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 safe-top">
        <h1 className="text-2xl font-bold text-white mb-4">Activity</h1>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 rounded-xl whitespace-nowrap transition-all",
                activeTab === tab ? "gradient-button text-white" : "bg-white/10 text-white/70",
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications list */}
      <div className="px-4 space-y-2">
        {filteredNotifications.map((notif) => {
          const Icon = iconMap[notif.type as keyof typeof iconMap]
          const isFollowing = followedUsers.includes(notif.id)

          return (
            <div key={notif.id} className="glass rounded-2xl p-4 flex items-center gap-3">
              <button className="relative" onClick={() => handleProfileClick(notif.user)}>
                <img
                  src={notif.user.avatar || "/placeholder.svg"}
                  alt={notif.user.name}
                  className="w-12 h-12 rounded-full object-cover hover:ring-2 hover:ring-pink-500 transition-all"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center">
                  <Icon className="w-3 h-3 text-white" />
                </div>
              </button>

              <div className="flex-1 min-w-0">
                <p className="text-white text-sm">
                  <button
                    onClick={() => handleProfileClick(notif.user)}
                    className="font-semibold hover:text-pink-400 transition-colors"
                  >
                    {notif.user.name}
                  </button>{" "}
                  {notif.content}
                </p>
                <p className="text-white/50 text-xs mt-1">{notif.timestamp}</p>
              </div>

              {notif.thumbnail && (
                <button className="flex-shrink-0">
                  <img
                    src={notif.thumbnail || "/placeholder.svg"}
                    alt=""
                    className="w-10 h-14 rounded-lg object-cover"
                  />
                </button>
              )}

              {notif.type === "follow" && (
                <button
                  onClick={() => handleFollow(notif.id)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                    isFollowing ? "bg-white/10 text-white/70" : "gradient-button text-white",
                  )}
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
              )}
            </div>
          )
        })}

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60">No notifications in this category</p>
          </div>
        )}
      </div>
    </div>
  )
}
