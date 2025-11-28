"use client"

import { useState } from "react"
import { Search, Edit3, Pin, Bell, BellOff } from "lucide-react"

interface MessagesScreenProps {
  onOpenChat?: (user: { id: string; name: string; username: string; avatar: string }) => void
}

const mockChats = [
  {
    id: "1",
    user: {
      id: "u1",
      name: "Alex Design",
      username: "alex_design",
      avatar: "/man-designer.png",
      isOnline: true,
    },
    lastMessage: "That sounds amazing! Let's collab",
    timestamp: "2m",
    unread: 3,
    isPinned: true,
    isMuted: false,
  },
  {
    id: "2",
    user: {
      id: "u2",
      name: "Sarah Creates",
      username: "sarah_creates",
      avatar: "/woman-creator.png",
      isOnline: true,
    },
    lastMessage: "Thanks for the follow! Love your content",
    timestamp: "15m",
    unread: 0,
    isPinned: true,
    isMuted: false,
  },
  {
    id: "3",
    user: {
      id: "u3",
      name: "Mike Travels",
      username: "mike_travels",
      avatar: "/traveler-man.jpg",
      isOnline: false,
    },
    lastMessage: "Where was that video filmed?",
    timestamp: "1h",
    unread: 0,
    isPinned: false,
    isMuted: true,
  },
  {
    id: "4",
    user: {
      id: "u4",
      name: "Creative Jen",
      username: "creative_jen",
      avatar: "/creative-woman.png",
      isOnline: false,
    },
    lastMessage: "Voice message (0:15)",
    timestamp: "3h",
    unread: 1,
    isPinned: false,
    isMuted: false,
  },
]

export function MessagesScreen({ onOpenChat }: MessagesScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [chats] = useState(mockChats)

  const sortedChats = [...chats].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return 0
  })

  const filteredChats = sortedChats.filter(
    (chat) =>
      chat.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.user.username.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 safe-top">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-white">Messages</h1>
          <button className="w-10 h-10 flex items-center justify-center glass rounded-full">
            <Edit3 className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/10 rounded-2xl text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
      </div>

      {/* Chat list */}
      <div className="px-4 space-y-2">
        {filteredChats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onOpenChat?.(chat.user)}
            className="w-full glass rounded-2xl p-4 flex items-center gap-3 active:scale-[0.98] transition-transform"
          >
            <div className="relative">
              <img
                src={chat.user.avatar || "/placeholder.svg"}
                alt={chat.user.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              {chat.user.isOnline && (
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
              )}
            </div>

            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-white truncate">{chat.user.name}</p>
                {chat.isPinned && <Pin className="w-3 h-3 text-pink-400" />}
                {chat.isMuted && <BellOff className="w-3 h-3 text-white/40" />}
              </div>
              <p className="text-sm text-white/60 truncate">{chat.lastMessage}</p>
            </div>

            <div className="flex flex-col items-end gap-1">
              <p className="text-xs text-white/50">{chat.timestamp}</p>
              {chat.unread > 0 && (
                <div className="w-5 h-5 rounded-full gradient-button flex items-center justify-center">
                  <span className="text-xs text-white font-bold">{chat.unread}</span>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Message requests */}
      <div className="px-4 mt-6">
        <button className="w-full glass rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-white">Message Requests</p>
              <p className="text-sm text-white/60">5 pending requests</p>
            </div>
          </div>
          <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center">
            <span className="text-xs text-white font-bold">5</span>
          </div>
        </button>
      </div>
    </div>
  )
}
