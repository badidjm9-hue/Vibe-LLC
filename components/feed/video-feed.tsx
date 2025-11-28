"use client"

import { useState, useRef, useEffect } from "react"
import { VideoCard } from "./video-card"
import { useApp } from "@/contexts/app-context"

interface VideoFeedProps {
  onNavigateToProfile?: (user: {
    id: string
    username: string
    avatar: string
    isFollowing?: boolean
  }) => void
}

export function VideoFeed({ onNavigateToProfile }: VideoFeedProps) {
  const { videos, currentVideoIndex, setCurrentVideoIndex } = useApp()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      setIsScrolling(true)
      const scrollTop = container.scrollTop
      const height = container.clientHeight
      const newIndex = Math.round(scrollTop / height)
      if (newIndex !== currentVideoIndex && newIndex >= 0 && newIndex < videos.length) {
        setCurrentVideoIndex(newIndex)
      }
    }

    const handleScrollEnd = () => {
      setIsScrolling(false)
    }

    container.addEventListener("scroll", handleScroll)
    container.addEventListener("scrollend", handleScrollEnd)

    return () => {
      container.removeEventListener("scroll", handleScroll)
      container.removeEventListener("scrollend", handleScrollEnd)
    }
  }, [currentVideoIndex, setCurrentVideoIndex, videos.length])

  return (
    <div ref={containerRef} className="h-screen overflow-y-scroll snap-y snap-mandatory no-scrollbar">
      {videos.map((video, index) => (
        <div key={video.id} className="h-screen snap-start snap-always">
          <VideoCard video={video} isActive={index === currentVideoIndex} onNavigateToProfile={onNavigateToProfile} />
        </div>
      ))}
    </div>
  )
}
