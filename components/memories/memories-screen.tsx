"use client"

import { useState } from "react"
import { ArrowLeft, Play, Calendar, ChevronLeft, ChevronRight, Share2, Download, Heart } from "lucide-react"

interface MemoriesScreenProps {
  onBack: () => void
}

const mockMemories = [
  {
    date: "November 28, 2024",
    year: "Today",
    videos: [
      { id: "1", thumbnail: "/summer-beach-vibes.jpg", views: "12K" },
      { id: "2", thumbnail: "/majestic-mountain-vista.png", views: "8.5K" },
    ],
  },
  {
    date: "November 28, 2023",
    year: "1 Year Ago",
    videos: [
      { id: "3", thumbnail: "/lone-traveler-mountain-path.png", views: "45K" },
      { id: "4", thumbnail: "/diverse-travelers-world-map.png", views: "23K" },
      { id: "5", thumbnail: "/travel-adventure.png", views: "67K" },
    ],
  },
  {
    date: "November 28, 2022",
    year: "2 Years Ago",
    videos: [{ id: "6", thumbnail: "/vibrant-dance-party.png", views: "120K" }],
  },
]

export function MemoriesScreen({ onBack }: MemoriesScreenProps) {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [activeMemoryIndex, setActiveMemoryIndex] = useState(0)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
  }

  const goToPrevDay = () => {
    const newDate = new Date(selectedDate)
    newDate.setDate(newDate.getDate() - 1)
    setSelectedDate(newDate)
  }

  const goToNextDay = () => {
    const newDate = new Date(selectedDate)
    newDate.setDate(newDate.getDate() + 1)
    setSelectedDate(newDate)
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 safe-top">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-bold text-white">Memories</h1>
        </div>

        {/* Date selector */}
        <div className="flex items-center justify-between glass rounded-2xl p-4">
          <button onClick={goToPrevDay} className="p-2">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <div className="text-center">
            <p className="text-lg font-semibold text-white">{formatDate(selectedDate)}</p>
            <p className="text-sm text-white/60">On this day</p>
          </div>
          <button onClick={goToNextDay} className="p-2">
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Memories list */}
      <div className="px-4 mt-4 space-y-6">
        {mockMemories.map((memory, index) => (
          <div key={memory.date} className="glass rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-pink-400" />
                <div>
                  <p className="text-white font-semibold">{memory.year}</p>
                  <p className="text-sm text-white/60">{memory.date}</p>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-2 gap-2">
                {memory.videos.map((video) => (
                  <div key={video.id} className="relative aspect-[9/16] rounded-xl overflow-hidden group">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt="Memory"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full glass flex items-center justify-center">
                        <Play className="w-6 h-6 text-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 left-2 flex items-center gap-1">
                      <Play className="w-3 h-3 text-white" />
                      <span className="text-xs text-white">{video.views}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-4 mt-4">
                <button className="flex items-center gap-2 px-4 py-2 glass rounded-full">
                  <Share2 className="w-4 h-4 text-white" />
                  <span className="text-sm text-white">Share</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 glass rounded-full">
                  <Download className="w-4 h-4 text-white" />
                  <span className="text-sm text-white">Save</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 glass rounded-full">
                  <Heart className="w-4 h-4 text-pink-400" />
                  <span className="text-sm text-white">Love</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No memories placeholder */}
      {mockMemories.length === 0 && (
        <div className="px-4 mt-8">
          <div className="glass rounded-2xl p-8 text-center">
            <Calendar className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No Memories Yet</h3>
            <p className="text-white/60">Start creating videos to build your memories collection!</p>
          </div>
        </div>
      )}
    </div>
  )
}
