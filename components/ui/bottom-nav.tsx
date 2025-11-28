"use client"

import { cn } from "@/lib/utils"
import { Home, Search, Bell, User, Plus, MessageCircle } from "lucide-react"
import { useApp } from "@/contexts/app-context"

const navItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "discover", icon: Search, label: "Discover" },
  { id: "create", icon: Plus, label: "" },
  { id: "messages", icon: MessageCircle, label: "Messages" },
  { id: "activity", icon: Bell, label: "Activity" },
  { id: "profile", icon: User, label: "Profile" },
]

export function BottomNav() {
  const { activeTab, setActiveTab, unreadNotifications } = useApp()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto">
      <div className="glass-dark mx-4 mb-4 rounded-3xl px-2 py-2 safe-bottom">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            const isCreate = item.id === "create"

            if (isCreate) {
              return (
                <button key={item.id} onClick={() => setActiveTab(item.id)} className="relative -mt-4">
                  <div className="w-14 h-14 rounded-full gradient-button flex items-center justify-center shadow-lg shadow-pink-500/30 animate-pulse-glow">
                    <Plus className="w-7 h-7 text-white" />
                  </div>
                </button>
              )
            }

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "flex flex-col items-center gap-1 py-2 px-3 rounded-2xl transition-all",
                  isActive ? "text-pink-400" : "text-white/60",
                )}
              >
                <div className="relative">
                  <Icon className={cn("w-5 h-5", isActive && "text-pink-400")} />
                  {item.id === "activity" && unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold">
                      {unreadNotifications}
                    </span>
                  )}
                  {item.id === "messages" && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold">
                      3
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
