"use client"

import { Link2, QrCode, Download, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

interface ShareSheetProps {
  isOpen: boolean
  onClose: () => void
}

const socialApps = [
  { name: "WhatsApp", icon: "📱", color: "bg-green-600" },
  { name: "Instagram", icon: "📷", color: "bg-gradient-to-br from-purple-600 to-pink-500" },
  { name: "Facebook", icon: "f", color: "bg-blue-600" },
  { name: "Twitter", icon: "𝕏", color: "bg-sky-500" },
  { name: "Messenger", icon: "💬", color: "bg-gradient-to-br from-blue-500 to-purple-600" },
  { name: "TikTok", icon: "♪", color: "bg-black" },
]

const actions = [
  { name: "Copy Link", icon: Link2 },
  { name: "QR Code", icon: QrCode },
  { name: "Save Video", icon: Download },
  { name: "More Options", icon: MoreHorizontal },
]

export function ShareSheet({ isOpen, onClose }: ShareSheetProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60" />
      <div
        className="absolute bottom-0 left-0 right-0 glass-dark rounded-t-3xl p-6 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="w-12 h-1 bg-white/30 rounded-full mx-auto mb-6" />

        <h2 className="text-xl font-bold text-white mb-6">Share to...</h2>

        {/* Add to story */}
        <div className="glass rounded-2xl p-4 flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              📸
            </div>
            <div>
              <p className="font-semibold text-white">Add to your story</p>
              <p className="text-sm text-white/60">Quick share with friends</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-pink-500 rounded-xl text-white font-semibold">Share</button>
        </div>

        {/* Social apps */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {socialApps.map((app) => (
            <button key={app.name} className="flex flex-col items-center gap-2">
              <div
                className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-xl text-white", app.color)}
              >
                {app.icon}
              </div>
              <span className="text-xs text-white/70">{app.name}</span>
            </button>
          ))}
        </div>

        <div className="h-px bg-white/10 mb-6" />

        {/* Actions */}
        <div className="space-y-2">
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <button
                key={action.name}
                className="w-full flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-medium">{action.name}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
