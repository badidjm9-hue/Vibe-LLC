"use client"

import { useState, useEffect } from "react"
import { WifiOff, Download, Check, Clock, Trash2 } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"

interface OfflineVideo {
  id: string
  title: string
  thumbnail: string
  duration: string
  size: string
  downloadedAt: string
  progress?: number
}

export function OfflineManager() {
  const [isOnline, setIsOnline] = useState(true)
  const [offlineVideos, setOfflineVideos] = useState<OfflineVideo[]>([
    {
      id: "1",
      title: "Amazing sunset timelapse",
      thumbnail: "/vibrant-sunset-scene.png",
      duration: "0:45",
      size: "12.5 MB",
      downloadedAt: "2 hours ago",
    },
    {
      id: "2",
      title: "Dance tutorial #viral",
      thumbnail: "/vibrant-dance-performance.png",
      duration: "1:30",
      size: "28.3 MB",
      downloadedAt: "1 day ago",
    },
  ])
  const [downloadingVideos, setDownloadingVideos] = useState<OfflineVideo[]>([
    {
      id: "3",
      title: "Cooking recipe masterclass",
      thumbnail: "/cooking-video-scene.png",
      duration: "2:15",
      size: "45.2 MB",
      downloadedAt: "",
      progress: 65,
    },
  ])

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    setIsOnline(navigator.onLine)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const totalSize = offlineVideos.reduce((sum, v) => {
    const size = Number.parseFloat(v.size.replace(" MB", ""))
    return sum + size
  }, 0)

  const deleteVideo = (id: string) => {
    setOfflineVideos((prev) => prev.filter((v) => v.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      {!isOnline && (
        <GlassCard className="p-4 border border-yellow-500/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <WifiOff className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="font-semibold text-white">You're Offline</p>
              <p className="text-sm text-white/60">Only downloaded videos are available</p>
            </div>
          </div>
        </GlassCard>
      )}

      {/* Storage Info */}
      <GlassCard className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white font-semibold">Offline Storage</span>
          <span className="text-sm text-white/60">{totalSize.toFixed(1)} MB used</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
            style={{ width: `${Math.min((totalSize / 500) * 100, 100)}%` }}
          />
        </div>
        <p className="text-xs text-white/40">500 MB available</p>
      </GlassCard>

      {/* Downloading */}
      {downloadingVideos.length > 0 && (
        <div>
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <Download className="w-5 h-5 text-pink-400" />
            Downloading
          </h3>
          <div className="space-y-3">
            {downloadingVideos.map((video) => (
              <GlassCard key={video.id} className="p-3">
                <div className="flex gap-3">
                  <div className="w-20 h-14 bg-white/10 rounded-lg overflow-hidden">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white line-clamp-1">{video.title}</p>
                    <p className="text-xs text-white/60">
                      {video.duration} • {video.size}
                    </p>
                    <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-pink-500 rounded-full transition-all"
                        style={{ width: `${video.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* Downloaded Videos */}
      <div>
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <Check className="w-5 h-5 text-green-400" />
          Downloaded ({offlineVideos.length})
        </h3>
        <div className="space-y-3">
          {offlineVideos.map((video) => (
            <GlassCard key={video.id} className="p-3">
              <div className="flex gap-3">
                <div className="relative w-20 h-14 bg-white/10 rounded-lg overflow-hidden">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 right-1 bg-black/70 px-1 rounded text-xs text-white">
                    {video.duration}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white line-clamp-1">{video.title}</p>
                  <div className="flex items-center gap-2 text-xs text-white/60">
                    <span>{video.size}</span>
                    <span>•</span>
                    <Clock className="w-3 h-3" />
                    <span>{video.downloadedAt}</span>
                  </div>
                </div>
                <button
                  onClick={() => deleteVideo(video.id)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {offlineVideos.length === 0 && downloadingVideos.length === 0 && (
        <div className="text-center py-12">
          <Download className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <p className="text-white/60">No downloaded videos</p>
          <p className="text-sm text-white/40">Download videos to watch offline</p>
        </div>
      )}
    </div>
  )
}
