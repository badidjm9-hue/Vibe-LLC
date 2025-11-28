"use client"

import { useState } from "react"
import { X, Bell, BellOff, ImageIcon, Lock, Timer, Trash2, Flag, UserX, Archive, Download } from "lucide-react"
import type { Chat } from "@/lib/chat/chat-types"
import { cn } from "@/lib/utils"

interface ChatSettingsSheetProps {
  chat: Chat
  isOpen: boolean
  onClose: () => void
  onUpdate: (settings: Partial<Chat>) => void
}

const THEMES = [
  { id: "default", name: "Default", gradient: "from-pink-500 to-purple-500" },
  { id: "ocean", name: "Ocean", gradient: "from-blue-500 to-cyan-500" },
  { id: "sunset", name: "Sunset", gradient: "from-orange-500 to-red-500" },
  { id: "forest", name: "Forest", gradient: "from-green-500 to-emerald-500" },
  { id: "midnight", name: "Midnight", gradient: "from-indigo-500 to-purple-500" },
  { id: "rose", name: "Rose", gradient: "from-rose-500 to-pink-500" },
]

const WALLPAPERS = [
  { id: "none", name: "None", url: null },
  { id: "gradient1", name: "Gradient 1", url: "/beach-sunset.png" },
  { id: "gradient2", name: "Gradient 2", url: "/majestic-mountain-vista.png" },
  { id: "pattern1", name: "Pattern 1", url: "/summer-beach-vibes.jpg" },
]

const AUTO_DELETE_OPTIONS = [
  { value: 0, label: "Off" },
  { value: 30, label: "30 seconds" },
  { value: 300, label: "5 minutes" },
  { value: 3600, label: "1 hour" },
  { value: 86400, label: "24 hours" },
  { value: 604800, label: "7 days" },
]

export function ChatSettingsSheet({ chat, isOpen, onClose, onUpdate }: ChatSettingsSheetProps) {
  const [activeTab, setActiveTab] = useState<"general" | "theme" | "privacy">("general")
  const [selectedTheme, setSelectedTheme] = useState(chat.theme || "default")
  const [selectedWallpaper, setSelectedWallpaper] = useState(chat.wallpaper || "none")
  const [autoDeleteTimer, setAutoDeleteTimer] = useState(chat.autoDeleteTimer || 0)
  const [isSecret, setIsSecret] = useState(chat.isSecret)

  if (!isOpen) return null

  const handleSave = () => {
    onUpdate({
      theme: selectedTheme,
      wallpaper: selectedWallpaper,
      autoDeleteTimer,
      isSecret,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50">
      <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-3xl max-h-[80vh] overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-lg font-bold text-white">Chat Settings</h2>
          <button onClick={onClose} className="p-2">
            <X className="w-6 h-6 text-white/60" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10">
          {[
            { key: "general", label: "General" },
            { key: "theme", label: "Theme" },
            { key: "privacy", label: "Privacy" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={cn(
                "flex-1 py-3 text-sm font-medium transition-colors",
                activeTab === tab.key ? "text-pink-400 border-b-2 border-pink-400" : "text-white/60",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[50vh]">
          {activeTab === "general" && (
            <div className="space-y-4">
              {/* Mute notifications */}
              <button
                onClick={() => onUpdate({ isMuted: !chat.isMuted })}
                className="w-full flex items-center justify-between p-4 glass rounded-2xl"
              >
                <div className="flex items-center gap-3">
                  {chat.isMuted ? (
                    <BellOff className="w-5 h-5 text-white/60" />
                  ) : (
                    <Bell className="w-5 h-5 text-white" />
                  )}
                  <span className="text-white">{chat.isMuted ? "Unmute Notifications" : "Mute Notifications"}</span>
                </div>
              </button>

              {/* Archive chat */}
              <button className="w-full flex items-center justify-between p-4 glass rounded-2xl">
                <div className="flex items-center gap-3">
                  <Archive className="w-5 h-5 text-white" />
                  <span className="text-white">Archive Chat</span>
                </div>
              </button>

              {/* Export chat */}
              <button className="w-full flex items-center justify-between p-4 glass rounded-2xl">
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5 text-white" />
                  <span className="text-white">Export Chat</span>
                </div>
              </button>

              {/* Block user (only for direct chats) */}
              {chat.type === "direct" && (
                <button className="w-full flex items-center justify-between p-4 glass rounded-2xl">
                  <div className="flex items-center gap-3">
                    <UserX className="w-5 h-5 text-red-400" />
                    <span className="text-red-400">Block User</span>
                  </div>
                </button>
              )}

              {/* Report */}
              <button className="w-full flex items-center justify-between p-4 glass rounded-2xl">
                <div className="flex items-center gap-3">
                  <Flag className="w-5 h-5 text-orange-400" />
                  <span className="text-orange-400">Report</span>
                </div>
              </button>

              {/* Delete chat */}
              <button className="w-full flex items-center justify-between p-4 glass rounded-2xl">
                <div className="flex items-center gap-3">
                  <Trash2 className="w-5 h-5 text-red-400" />
                  <span className="text-red-400">Delete Chat</span>
                </div>
              </button>
            </div>
          )}

          {activeTab === "theme" && (
            <div className="space-y-6">
              {/* Color themes */}
              <div>
                <h3 className="text-white font-medium mb-3">Chat Color</h3>
                <div className="grid grid-cols-3 gap-3">
                  {THEMES.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setSelectedTheme(theme.id)}
                      className={cn(
                        "p-4 rounded-2xl transition-all",
                        selectedTheme === theme.id ? "ring-2 ring-pink-500 ring-offset-2 ring-offset-background" : "",
                      )}
                    >
                      <div className={cn("w-full h-12 rounded-xl bg-gradient-to-r", theme.gradient)} />
                      <p className="text-xs text-white/70 mt-2 text-center">{theme.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Wallpapers */}
              <div>
                <h3 className="text-white font-medium mb-3">Wallpaper</h3>
                <div className="grid grid-cols-4 gap-3">
                  {WALLPAPERS.map((wallpaper) => (
                    <button
                      key={wallpaper.id}
                      onClick={() => setSelectedWallpaper(wallpaper.id)}
                      className={cn(
                        "aspect-[3/4] rounded-xl overflow-hidden transition-all",
                        selectedWallpaper === wallpaper.id ? "ring-2 ring-pink-500" : "",
                      )}
                    >
                      {wallpaper.url ? (
                        <img
                          src={wallpaper.url || "/placeholder.svg"}
                          alt={wallpaper.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-white/10 flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-white/40" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "privacy" && (
            <div className="space-y-4">
              {/* Secret chat toggle */}
              <div className="flex items-center justify-between p-4 glass rounded-2xl">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-white" />
                  <div>
                    <p className="text-white">Secret Chat</p>
                    <p className="text-xs text-white/60">Messages are end-to-end encrypted</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsSecret(!isSecret)}
                  className={cn("w-12 h-6 rounded-full transition-colors", isSecret ? "bg-pink-500" : "bg-white/20")}
                >
                  <div
                    className={cn(
                      "w-5 h-5 bg-white rounded-full transition-transform",
                      isSecret ? "translate-x-6" : "translate-x-0.5",
                    )}
                  />
                </button>
              </div>

              {/* Auto-delete timer */}
              <div className="p-4 glass rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <Timer className="w-5 h-5 text-white" />
                  <div>
                    <p className="text-white">Auto-Delete Messages</p>
                    <p className="text-xs text-white/60">Messages will be deleted after</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {AUTO_DELETE_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setAutoDeleteTimer(option.value)}
                      className={cn(
                        "py-2 px-3 rounded-xl text-sm transition-colors",
                        autoDeleteTimer === option.value ? "gradient-button text-white" : "bg-white/10 text-white/70",
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Save button */}
        <div className="p-4 border-t border-white/10">
          <button onClick={handleSave} className="w-full py-3 gradient-button rounded-2xl text-white font-semibold">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
