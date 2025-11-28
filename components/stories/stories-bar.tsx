"use client"

import type React from "react"

import { useState } from "react"
import { Plus, X, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

interface Story {
  id: string
  userId: string
  username: string
  avatar: string
  items: {
    id: string
    type: "image" | "video"
    url: string
    timestamp: number
    views: number
  }[]
  hasUnviewed: boolean
  isOwn: boolean
}

interface StoriesBarProps {
  onOpenStory: (story: Story) => void
  onCreateStory: () => void
}

const mockStories: Story[] = [
  {
    id: "my-story",
    userId: "me",
    username: "Add Story",
    avatar: "/diverse-user-avatars.png",
    items: [],
    hasUnviewed: false,
    isOwn: true,
  },
  {
    id: "s1",
    userId: "u1",
    username: "alex_design",
    avatar: "/man-designer-portrait.jpg",
    items: [{ id: "s1-1", type: "image", url: "/beach-sunset.png", timestamp: Date.now() - 3600000, views: 234 }],
    hasUnviewed: true,
    isOwn: false,
  },
  {
    id: "s2",
    userId: "u2",
    username: "sarah_creates",
    avatar: "/woman-creator-portrait.png",
    items: [
      { id: "s2-1", type: "image", url: "/majestic-mountain-vista.png", timestamp: Date.now() - 7200000, views: 567 },
    ],
    hasUnviewed: true,
    isOwn: false,
  },
  {
    id: "s3",
    userId: "u3",
    username: "mike_travels",
    avatar: "/traveler-man-portrait.jpg",
    items: [
      { id: "s3-1", type: "image", url: "/summer-beach-vibes.jpg", timestamp: Date.now() - 14400000, views: 123 },
    ],
    hasUnviewed: false,
    isOwn: false,
  },
  {
    id: "s4",
    userId: "u4",
    username: "creative_jen",
    avatar: "/creative-woman-portrait.png",
    items: [{ id: "s4-1", type: "image", url: "/video-one.png", timestamp: Date.now() - 21600000, views: 891 }],
    hasUnviewed: true,
    isOwn: false,
  },
]

export function StoriesBar({ onOpenStory, onCreateStory }: StoriesBarProps) {
  return (
    <div className="px-4 py-3">
      <div className="flex gap-3 overflow-x-auto no-scrollbar">
        {mockStories.map((story) => (
          <button
            key={story.id}
            onClick={() => (story.isOwn ? onCreateStory() : onOpenStory(story))}
            className="flex flex-col items-center gap-1 flex-shrink-0"
          >
            <div
              className={cn(
                "relative p-0.5 rounded-full",
                story.hasUnviewed
                  ? "bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500"
                  : story.isOwn
                    ? "bg-white/20"
                    : "bg-white/30",
              )}
            >
              <div className="p-0.5 bg-background rounded-full">
                <img
                  src={story.avatar || "/placeholder.svg"}
                  alt={story.username}
                  className="w-14 h-14 rounded-full object-cover"
                />
              </div>
              {story.isOwn && (
                <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center border-2 border-background">
                  <Plus className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            <span className="text-xs text-white/70 truncate w-16 text-center">
              {story.isOwn ? "Add Story" : story.username}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

interface StoryViewerProps {
  story: Story
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export function StoryViewer({ story, onClose, onNext, onPrev }: StoryViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const currentItem = story.items[currentIndex]

  const handleTap = (e: React.MouseEvent) => {
    const { clientX, currentTarget } = e
    const { left, width } = currentTarget.getBoundingClientRect()
    const tapPosition = (clientX - left) / width

    if (tapPosition < 0.3) {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
      } else {
        onPrev()
      }
    } else if (tapPosition > 0.7) {
      if (currentIndex < story.items.length - 1) {
        setCurrentIndex(currentIndex + 1)
      } else {
        onNext()
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black z-50" onClick={handleTap}>
      {/* Progress bars */}
      <div className="absolute top-12 left-4 right-4 flex gap-1 z-10 safe-top">
        {story.items.map((_, i) => (
          <div key={i} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full bg-white transition-all duration-[5000ms] ease-linear",
                i < currentIndex ? "w-full" : i === currentIndex && !isPaused ? "w-full" : "w-0",
              )}
            />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-16 left-4 right-4 flex items-center justify-between z-10 safe-top">
        <div className="flex items-center gap-3">
          <img
            src={story.avatar || "/placeholder.svg"}
            alt={story.username}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-white">{story.username}</p>
            <p className="text-xs text-white/60">
              {new Date(currentItem?.timestamp || Date.now()).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
        <button onClick={onClose} className="p-2">
          <X className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Content */}
      {currentItem && <img src={currentItem.url || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />}

      {/* Views */}
      <div className="absolute bottom-8 left-4 flex items-center gap-2 safe-bottom">
        <Eye className="w-5 h-5 text-white/70" />
        <span className="text-white/70">{currentItem?.views || 0} views</span>
      </div>
    </div>
  )
}
