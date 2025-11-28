"use client"

import { useState } from "react"
import { Send, Heart, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

interface CommentsSheetProps {
  isOpen: boolean
  onClose: () => void
  videoId: string
  onNavigateToProfile?: (user: {
    id: string
    username: string
    avatar: string
  }) => void
}

const mockComments = [
  {
    id: "1",
    user: { id: "u1", name: "alex_design", avatar: "/man-avatar.png" },
    text: "This is absolutely amazing! The colors are so vibrant 🔥",
    likes: 234,
    isLiked: false,
    timestamp: "2h",
    replies: 12,
  },
  {
    id: "2",
    user: { id: "u2", name: "sarah_creates", avatar: "/diverse-woman-avatar.png" },
    text: "How did you get this shot? Tutorial please! 📸",
    likes: 89,
    isLiked: true,
    timestamp: "1h",
    replies: 5,
  },
  {
    id: "3",
    user: { id: "u3", name: "travel_mike", avatar: "/travel-man.jpg" },
    text: "Adding this to my bucket list right now",
    likes: 45,
    isLiked: false,
    timestamp: "45m",
    replies: 2,
  },
]

export function CommentsSheet({ isOpen, onClose, videoId, onNavigateToProfile }: CommentsSheetProps) {
  const [comments, setComments] = useState(mockComments)
  const [newComment, setNewComment] = useState("")

  const handleLikeComment = (commentId: string) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId ? { ...c, isLiked: !c.isLiked, likes: c.isLiked ? c.likes - 1 : c.likes + 1 } : c,
      ),
    )
  }

  const handleSendComment = () => {
    if (!newComment.trim()) return
    // Add comment logic
    setNewComment("")
  }

  const handleProfileClick = (user: { id: string; name: string; avatar: string }) => {
    if (onNavigateToProfile) {
      onClose()
      onNavigateToProfile({
        id: user.id,
        username: user.name,
        avatar: user.avatar,
      })
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60" />
      <div
        className="absolute bottom-0 left-0 right-0 h-[70vh] glass-dark rounded-t-3xl flex flex-col animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-white/10">
          <div className="w-12 h-1 bg-white/30 rounded-full mx-auto mb-4" />
          <h2 className="text-lg font-bold text-white text-center">{comments.length} Comments</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <button onClick={() => handleProfileClick(comment.user)}>
                <img
                  src={comment.user.avatar || "/placeholder.svg"}
                  alt={comment.user.name}
                  className="w-10 h-10 rounded-full object-cover hover:ring-2 hover:ring-pink-500 transition-all"
                />
              </button>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleProfileClick(comment.user)}
                    className="font-semibold text-white text-sm hover:text-pink-400 transition-colors"
                  >
                    {comment.user.name}
                  </button>
                  <span className="text-white/40 text-xs">{comment.timestamp}</span>
                </div>
                <p className="text-white/80 text-sm mt-1">{comment.text}</p>
                <div className="flex items-center gap-4 mt-2">
                  <button
                    onClick={() => handleLikeComment(comment.id)}
                    className="flex items-center gap-1 text-white/50 text-xs"
                  >
                    <Heart className={cn("w-4 h-4", comment.isLiked && "fill-pink-500 text-pink-500")} />
                    {comment.likes}
                  </button>
                  <button className="text-white/50 text-xs">Reply</button>
                  {comment.replies > 0 && (
                    <button className="text-pink-400 text-xs">View {comment.replies} replies</button>
                  )}
                </div>
              </div>
              <button className="text-white/30">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Comment input */}
        <div className="p-4 border-t border-white/10 safe-bottom">
          <div className="flex items-center gap-3">
            <img src="/current-user-avatar.png" alt="You" className="w-10 h-10 rounded-full object-cover" />
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 rounded-2xl text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-pink-500 pr-12"
              />
              <button
                onClick={handleSendComment}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center"
              >
                <Send className="w-5 h-5 text-pink-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
