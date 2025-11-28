"use client"

import { useState, useEffect, useCallback } from "react"

interface CachedVideo {
  id: string
  videoUrl: string
  thumbnailUrl: string
  caption: string
  cachedAt: number
}

export function useOffline() {
  const [isOnline, setIsOnline] = useState(true)
  const [cachedVideos, setCachedVideos] = useState<CachedVideo[]>([])

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    setIsOnline(navigator.onLine)

    // Load cached videos from localStorage
    const cached = localStorage.getItem("vibe_cached_videos")
    if (cached) {
      setCachedVideos(JSON.parse(cached))
    }

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const cacheVideo = useCallback((video: Omit<CachedVideo, "cachedAt">) => {
    setCachedVideos((prev) => {
      const updated = [...prev.filter((v) => v.id !== video.id), { ...video, cachedAt: Date.now() }]
      localStorage.setItem("vibe_cached_videos", JSON.stringify(updated))
      return updated
    })
  }, [])

  const removeCachedVideo = useCallback((videoId: string) => {
    setCachedVideos((prev) => {
      const updated = prev.filter((v) => v.id !== videoId)
      localStorage.setItem("vibe_cached_videos", JSON.stringify(updated))
      return updated
    })
  }, [])

  const clearCache = useCallback(() => {
    setCachedVideos([])
    localStorage.removeItem("vibe_cached_videos")
  }, [])

  return {
    isOnline,
    cachedVideos,
    cacheVideo,
    removeCachedVideo,
    clearCache,
  }
}
