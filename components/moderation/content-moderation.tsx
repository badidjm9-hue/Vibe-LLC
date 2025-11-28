"use client"

import { useState } from "react"
import { ChevronLeft, Shield, AlertTriangle, CheckCircle2, XCircle, Play, Filter } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { cn } from "@/lib/utils"

interface ContentModerationProps {
  onBack: () => void
}

interface ModerationItem {
  id: string
  type: "video" | "comment" | "profile"
  content: string
  thumbnail?: string
  reporter: string
  reason: string
  severity: "low" | "medium" | "high" | "critical"
  status: "pending" | "approved" | "removed" | "escalated"
  timestamp: number
  aiScore: number
  aiFlags: string[]
}

const mockItems: ModerationItem[] = [
  {
    id: "1",
    type: "video",
    content: "Potentially inappropriate content",
    thumbnail: "/video-one.png",
    reporter: "auto_detection",
    reason: "Nudity/Sexual Content",
    severity: "high",
    status: "pending",
    timestamp: Date.now() - 1800000,
    aiScore: 0.85,
    aiFlags: ["nudity_detected", "adult_content"],
  },
  {
    id: "2",
    type: "comment",
    content: "This is a hateful comment that violates guidelines...",
    reporter: "user_report",
    reason: "Hate Speech",
    severity: "medium",
    status: "pending",
    timestamp: Date.now() - 3600000,
    aiScore: 0.72,
    aiFlags: ["hate_speech", "toxic_language"],
  },
  {
    id: "3",
    type: "video",
    content: "Spam/misleading content",
    thumbnail: "/video-2.png",
    reporter: "auto_detection",
    reason: "Spam/Scam",
    severity: "low",
    status: "pending",
    timestamp: Date.now() - 7200000,
    aiScore: 0.45,
    aiFlags: ["spam_detected"],
  },
  {
    id: "4",
    type: "profile",
    content: "Impersonation account",
    reporter: "user_report",
    reason: "Impersonation",
    severity: "critical",
    status: "escalated",
    timestamp: Date.now() - 14400000,
    aiScore: 0.92,
    aiFlags: ["impersonation", "fraud"],
  },
]

export function ContentModeration({ onBack }: ContentModerationProps) {
  const [items, setItems] = useState<ModerationItem[]>(mockItems)
  const [filter, setFilter] = useState<"all" | "pending" | "resolved">("pending")
  const [selectedItem, setSelectedItem] = useState<ModerationItem | null>(null)

  const filteredItems = items.filter((item) => {
    if (filter === "pending") return item.status === "pending" || item.status === "escalated"
    if (filter === "resolved") return item.status === "approved" || item.status === "removed"
    return true
  })

  const handleAction = (itemId: string, action: "approve" | "remove" | "escalate") => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? { ...item, status: action === "approve" ? "approved" : action === "remove" ? "removed" : "escalated" }
          : item,
      ),
    )
    setSelectedItem(null)
  }

  const getSeverityColor = (severity: ModerationItem["severity"]) => {
    switch (severity) {
      case "critical":
        return "text-red-500 bg-red-500/20"
      case "high":
        return "text-orange-500 bg-orange-500/20"
      case "medium":
        return "text-yellow-500 bg-yellow-500/20"
      case "low":
        return "text-green-500 bg-green-500/20"
    }
  }

  const formatTime = (timestamp: number) => {
    const mins = Math.floor((Date.now() - timestamp) / 60000)
    if (mins < 60) return `${mins}m ago`
    const hours = Math.floor(mins / 60)
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 glass-dark safe-top">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="font-bold text-white">Content Moderation</h1>
        <button className="w-10 h-10 flex items-center justify-center">
          <Filter className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Stats */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "Pending", value: items.filter((i) => i.status === "pending").length, color: "text-yellow-400" },
            { label: "Escalated", value: items.filter((i) => i.status === "escalated").length, color: "text-red-400" },
            { label: "Approved", value: items.filter((i) => i.status === "approved").length, color: "text-green-400" },
            { label: "Removed", value: items.filter((i) => i.status === "removed").length, color: "text-gray-400" },
          ].map((stat) => (
            <GlassCard key={stat.label} className="p-3 text-center">
              <p className={cn("text-2xl font-bold", stat.color)}>{stat.value}</p>
              <p className="text-xs text-white/60">{stat.label}</p>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="px-4 mb-4">
        <div className="flex gap-2">
          {[
            { key: "pending", label: "Pending" },
            { key: "resolved", label: "Resolved" },
            { key: "all", label: "All" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as typeof filter)}
              className={cn(
                "px-4 py-2 rounded-full text-sm transition-all",
                filter === tab.key ? "gradient-button text-white" : "glass text-white/70",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Queue */}
      <div className="px-4 space-y-3">
        {filteredItems.map((item) => (
          <GlassCard
            key={item.id}
            className="p-4 cursor-pointer active:scale-[0.98] transition-transform"
            onClick={() => setSelectedItem(item)}
          >
            <div className="flex gap-3">
              {item.thumbnail && (
                <div className="relative w-16 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={item.thumbnail || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", getSeverityColor(item.severity))}>
                    {item.severity.toUpperCase()}
                  </span>
                  <span className="text-xs text-white/50">{formatTime(item.timestamp)}</span>
                </div>
                <p className="text-sm text-white font-medium mb-1">{item.reason}</p>
                <p className="text-xs text-white/60 truncate">{item.content}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Shield className="w-3 h-3 text-pink-400" />
                  <span className="text-xs text-pink-400">AI Score: {(item.aiScore * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <p className="text-white font-semibold">All caught up!</p>
            <p className="text-white/60 text-sm">No items in the queue</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50">
          <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-3xl max-h-[85vh] overflow-y-auto animate-slide-up">
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">Review Content</h2>
                <button onClick={() => setSelectedItem(null)} className="p-2">
                  <XCircle className="w-6 h-6 text-white/60" />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-4">
              {/* Content preview */}
              {selectedItem.thumbnail && (
                <div className="relative aspect-[9/16] rounded-2xl overflow-hidden">
                  <img
                    src={selectedItem.thumbnail || "/placeholder.svg"}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {selectedItem.type === "comment" && (
                <GlassCard className="p-4">
                  <p className="text-white">{selectedItem.content}</p>
                </GlassCard>
              )}

              {/* Details */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Reason</span>
                  <span className="text-white font-medium">{selectedItem.reason}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Severity</span>
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded-full text-xs font-medium",
                      getSeverityColor(selectedItem.severity),
                    )}
                  >
                    {selectedItem.severity.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Reporter</span>
                  <span className="text-white">{selectedItem.reporter}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">AI Confidence</span>
                  <span className="text-pink-400">{(selectedItem.aiScore * 100).toFixed(0)}%</span>
                </div>
              </div>

              {/* AI Flags */}
              <div>
                <p className="text-white/60 text-sm mb-2">AI Detection Flags</p>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.aiFlags.map((flag) => (
                    <span key={flag} className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs">
                      {flag.replace("_", " ")}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => handleAction(selectedItem.id, "approve")}
                  className="flex-1 py-3 bg-green-500/20 text-green-400 rounded-xl font-semibold flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Approve
                </button>
                <button
                  onClick={() => handleAction(selectedItem.id, "remove")}
                  className="flex-1 py-3 bg-red-500/20 text-red-400 rounded-xl font-semibold flex items-center justify-center gap-2"
                >
                  <XCircle className="w-5 h-5" />
                  Remove
                </button>
              </div>
              <button
                onClick={() => handleAction(selectedItem.id, "escalate")}
                className="w-full py-3 glass rounded-xl text-yellow-400 font-semibold flex items-center justify-center gap-2"
              >
                <AlertTriangle className="w-5 h-5" />
                Escalate to Senior Moderator
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
