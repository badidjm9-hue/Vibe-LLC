"use client"

import { useState } from "react"
import { ArrowLeft, Check, X, Shield, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

interface MessageRequestsScreenProps {
  onBack: () => void
  onAccept: (requestId: string) => void
  onReject: (requestId: string) => void
  onNavigateToProfile?: (user: { id: string; username: string; avatar: string }) => void
}

const mockRequests = [
  {
    id: "1",
    user: {
      id: "u1",
      name: "Alex Designer",
      username: "alex_design",
      avatar: "/man.jpg",
      isVerified: true,
      mutualFriends: 5,
    },
    message: "Hey! I love your content. Would love to collaborate!",
    timestamp: "2h",
    category: "normal",
  },
  {
    id: "2",
    user: {
      id: "u2",
      name: "Sarah Creates",
      username: "sarah_creates",
      avatar: "/diverse-woman-portrait.png",
      isVerified: false,
      mutualFriends: 2,
    },
    message: "Hi there! Saw your latest video. Amazing work!",
    timestamp: "5h",
    category: "normal",
  },
  {
    id: "3",
    user: {
      id: "u3",
      name: "Unknown User",
      username: "user_38291",
      avatar: "/placeholder.svg",
      isVerified: false,
      mutualFriends: 0,
    },
    message: "Check out this link...",
    timestamp: "1d",
    category: "spam",
  },
  {
    id: "4",
    user: {
      id: "u4",
      name: "Creative Jen",
      username: "creative_jen",
      avatar: "/abstract-creative-explosion.png",
      isVerified: true,
      mutualFriends: 12,
    },
    message: "Would you be interested in a duet?",
    timestamp: "2d",
    category: "normal",
  },
]

export function MessageRequestsScreen({ onBack, onAccept, onReject, onNavigateToProfile }: MessageRequestsScreenProps) {
  const [requests, setRequests] = useState(mockRequests)
  const [filter, setFilter] = useState<"all" | "spam">("all")

  const filteredRequests = requests.filter((req) => {
    if (filter === "spam") return req.category === "spam"
    return req.category !== "spam"
  })

  const handleAccept = (id: string) => {
    onAccept(id)
    setRequests(requests.filter((r) => r.id !== id))
  }

  const handleReject = (id: string) => {
    onReject(id)
    setRequests(requests.filter((r) => r.id !== id))
  }

  const handleDeleteAll = () => {
    if (filter === "spam") {
      setRequests(requests.filter((r) => r.category !== "spam"))
    }
  }

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 safe-top">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-bold text-white">Message Requests</h1>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={cn(
              "px-4 py-2 rounded-full text-sm transition-all",
              filter === "all" ? "gradient-button text-white" : "bg-white/10 text-white/70",
            )}
          >
            Requests ({requests.filter((r) => r.category !== "spam").length})
          </button>
          <button
            onClick={() => setFilter("spam")}
            className={cn(
              "px-4 py-2 rounded-full text-sm transition-all",
              filter === "spam" ? "gradient-button text-white" : "bg-white/10 text-white/70",
            )}
          >
            Spam ({requests.filter((r) => r.category === "spam").length})
          </button>
        </div>
      </div>

      {/* Info banner */}
      <div className="px-4 mb-4">
        <div className="glass rounded-xl p-3 flex items-center gap-3">
          <Shield className="w-5 h-5 text-blue-400 flex-shrink-0" />
          <p className="text-sm text-white/70">
            These are message requests from people you don't follow. They won't know you've seen their request until you
            accept.
          </p>
        </div>
      </div>

      {/* Delete all spam button */}
      {filter === "spam" && filteredRequests.length > 0 && (
        <div className="px-4 mb-4">
          <button onClick={handleDeleteAll} className="w-full py-3 bg-red-500/20 text-red-400 rounded-xl font-medium">
            Delete All Spam
          </button>
        </div>
      )}

      {/* Requests list */}
      <div className="px-4 space-y-3">
        {filteredRequests.map((request) => (
          <div key={request.id} className="glass rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <button
                onClick={() =>
                  onNavigateToProfile?.({
                    id: request.user.id,
                    username: request.user.username,
                    avatar: request.user.avatar,
                  })
                }
                className="relative flex-shrink-0"
              >
                <img
                  src={request.user.avatar || "/placeholder.svg"}
                  alt={request.user.name}
                  className="w-12 h-12 rounded-full object-cover hover:ring-2 hover:ring-pink-500 transition-all"
                />
                {request.user.isVerified && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      onNavigateToProfile?.({
                        id: request.user.id,
                        username: request.user.username,
                        avatar: request.user.avatar,
                      })
                    }
                    className="font-semibold text-white hover:text-pink-400 transition-colors"
                  >
                    {request.user.name}
                  </button>
                  {request.category === "spam" && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                </div>
                <p className="text-sm text-white/50">@{request.user.username}</p>
                {request.user.mutualFriends > 0 && (
                  <p className="text-xs text-white/40 mt-1">{request.user.mutualFriends} mutual friends</p>
                )}
                <p className="text-sm text-white/70 mt-2 line-clamp-2">{request.message}</p>
                <p className="text-xs text-white/40 mt-1">{request.timestamp}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleReject(request.id)}
                className="flex-1 py-2 bg-white/10 rounded-xl text-white/70 font-medium flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                Decline
              </button>
              <button
                onClick={() => handleAccept(request.id)}
                className="flex-1 py-2 gradient-button rounded-xl text-white font-medium flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                Accept
              </button>
            </div>
          </div>
        ))}

        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60">No {filter === "spam" ? "spam" : "message requests"}</p>
          </div>
        )}
      </div>
    </div>
  )
}
