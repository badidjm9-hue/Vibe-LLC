"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, Edit3, Pin, BellOff, Users, Plus, Archive, X } from "lucide-react"
import { chatStore, mockChatUsers } from "@/lib/chat/chat-store"
import type { Chat } from "@/lib/chat/chat-types"
import { cn } from "@/lib/utils"

interface EnhancedMessagesScreenProps {
  onOpenChat: (chat: Chat) => void
  onOpenGroupCreate?: () => void
  onNavigateToProfile?: (user: {
    id: string
    username: string
    avatar: string
  }) => void
}

export function EnhancedMessagesScreen({
  onOpenChat,
  onOpenGroupCreate,
  onNavigateToProfile,
}: EnhancedMessagesScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [chats, setChats] = useState<Chat[]>([])
  const [filter, setFilter] = useState<"all" | "unread" | "groups">("all")
  const [showNewChatModal, setShowNewChatModal] = useState(false)

  useEffect(() => {
    setChats(chatStore.getChats())
  }, [])

  const filteredChats = chats.filter((chat) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      chat.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.participants.some(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.username.toLowerCase().includes(searchQuery.toLowerCase()),
      )

    // Tab filter
    if (filter === "unread" && chat.unreadCount === 0) return false
    if (filter === "groups" && chat.type !== "group") return false

    return matchesSearch
  })

  const formatTimestamp = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m`
    if (hours < 24) return `${hours}h`
    if (days < 7) return `${days}d`
    return new Date(timestamp).toLocaleDateString()
  }

  const getChatAvatar = (chat: Chat) => {
    if (chat.type === "group") {
      return chat.avatar || "/diverse-group-chat.png"
    }
    return chat.participants[0]?.avatar || "/abstract-geometric-shapes.png"
  }

  const getChatName = (chat: Chat) => {
    if (chat.type === "group") return chat.name
    return chat.participants[0]?.name || "Unknown"
  }

  const getOnlineStatus = (chat: Chat) => {
    if (chat.type === "group") {
      return chat.participants.filter((p) => p.isOnline).length > 0
    }
    return chat.participants[0]?.isOnline || false
  }

  const handlePinChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    chatStore.togglePin(chatId)
    setChats(chatStore.getChats())
  }

  const handleMuteChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    chatStore.toggleMute(chatId)
    setChats(chatStore.getChats())
  }

  const handleAvatarClick = (chat: Chat, e: React.MouseEvent) => {
    e.stopPropagation()
    if (chat.type === "direct" && chat.participants[0] && onNavigateToProfile) {
      const participant = chat.participants[0]
      onNavigateToProfile({
        id: participant.id,
        username: participant.username,
        avatar: participant.avatar,
      })
    }
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 safe-top">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-white">Messages</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowNewChatModal(true)}
              className="w-10 h-10 flex items-center justify-center glass rounded-full"
            >
              <Edit3 className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/10 rounded-2xl text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2">
          {[
            { key: "all", label: "All" },
            { key: "unread", label: "Unread" },
            { key: "groups", label: "Groups" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as "all" | "unread" | "groups")}
              className={cn(
                "px-4 py-2 rounded-full text-sm transition-all",
                filter === tab.key ? "gradient-button text-white" : "bg-white/10 text-white/70",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat list */}
      <div className="px-4 space-y-2">
        {filteredChats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onOpenChat(chat)}
            className="w-full glass rounded-2xl p-4 flex items-center gap-3 active:scale-[0.98] transition-transform"
          >
            <div className="relative" onClick={(e) => handleAvatarClick(chat, e)}>
              {chat.type === "group" ? (
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              ) : (
                <img
                  src={getChatAvatar(chat) || "/placeholder.svg"}
                  alt={getChatName(chat)}
                  className="w-14 h-14 rounded-full object-cover hover:ring-2 hover:ring-pink-500 transition-all"
                />
              )}
              {getOnlineStatus(chat) && (
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
              )}
            </div>

            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-white truncate">{getChatName(chat)}</p>
                {chat.isPinned && <Pin className="w-3 h-3 text-pink-400" />}
                {chat.isMuted && <BellOff className="w-3 h-3 text-white/40" />}
                {chat.type === "group" && <span className="text-xs text-white/40">({chat.participants.length})</span>}
              </div>
              <p className="text-sm text-white/60 truncate">
                {chat.lastMessage?.isDeleted
                  ? "Message deleted"
                  : chat.lastMessage?.type === "voice"
                    ? `Voice message (0:${chat.lastMessage.voiceDuration})`
                    : chat.lastMessage?.type === "image"
                      ? "Sent a photo"
                      : chat.lastMessage?.content || "No messages yet"}
              </p>
            </div>

            <div className="flex flex-col items-end gap-1">
              <p className="text-xs text-white/50">
                {chat.lastMessage ? formatTimestamp(chat.lastMessage.timestamp) : ""}
              </p>
              {chat.unreadCount > 0 && (
                <div className="w-5 h-5 rounded-full gradient-button flex items-center justify-center">
                  <span className="text-xs text-white font-bold">{chat.unreadCount}</span>
                </div>
              )}
            </div>
          </button>
        ))}

        {filteredChats.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60">No conversations found</p>
          </div>
        )}
      </div>

      {/* Create group button */}
      <div className="px-4 mt-6">
        <button onClick={onOpenGroupCreate} className="w-full glass rounded-2xl p-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
            <Plus className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-white">Create Group</p>
            <p className="text-sm text-white/60">Start a group conversation</p>
          </div>
        </button>
      </div>

      {/* Message requests */}
      <div className="px-4 mt-4">
        <button
          onClick={() => {
            // Navigate to message requests screen
            window.dispatchEvent(new CustomEvent("navigate", { detail: "messageRequests" }))
          }}
          className="w-full glass rounded-2xl p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              <Archive className="w-5 h-5 text-white" />
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

      {/* New Chat Modal */}
      {showNewChatModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end">
          <div className="w-full bg-background rounded-t-3xl p-6 animate-slide-up max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">New Message</h2>
              <button onClick={() => setShowNewChatModal(false)} className="p-2">
                <X className="w-6 h-6 text-white/60" />
              </button>
            </div>

            <div className="space-y-2">
              {mockChatUsers.map((user) => (
                <button
                  key={user.id}
                  onClick={() => {
                    // Find or create chat with this user
                    const existingChat = chats.find(
                      (c) => c.type === "direct" && c.participants.some((p) => p.id === user.id),
                    )
                    if (existingChat) {
                      onOpenChat(existingChat)
                    }
                    setShowNewChatModal(false)
                  }}
                  className="w-full glass rounded-2xl p-4 flex items-center gap-3"
                >
                  <div
                    className="relative"
                    onClick={(e) => {
                      e.stopPropagation()
                      if (onNavigateToProfile) {
                        setShowNewChatModal(false)
                        onNavigateToProfile({
                          id: user.id,
                          username: user.username,
                          avatar: user.avatar,
                        })
                      }
                    }}
                  >
                    <img
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover hover:ring-2 hover:ring-pink-500 transition-all"
                    />
                    {user.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-white">{user.name}</p>
                    <p className="text-sm text-white/60">@{user.username}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
