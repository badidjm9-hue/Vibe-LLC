"use client"

import { useState } from "react"
import { ArrowLeft, Play, Music, Volume2, Check } from "lucide-react"

interface DuetScreenProps {
  originalVideo: {
    id: string
    username: string
    videoUrl: string
    soundName: string
  }
  onBack: () => void
  onPost: () => void
}

const layouts = [
  { id: "side-by-side", name: "Side by Side", preview: "grid-cols-2" },
  { id: "top-bottom", name: "Top & Bottom", preview: "grid-rows-2" },
  { id: "react", name: "React", preview: "corner" },
  { id: "green-screen", name: "Green Screen", preview: "overlay" },
]

export function DuetScreen({ originalVideo, onBack, onPost }: DuetScreenProps) {
  const [selectedLayout, setSelectedLayout] = useState("side-by-side")
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [recordingProgress, setRecordingProgress] = useState(0)

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 safe-top flex items-center justify-between">
        <button onClick={onBack} className="p-2">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-lg font-semibold text-white">Create Duet</h1>
        <button onClick={onPost} className="px-4 py-2 gradient-button rounded-full">
          <span className="text-white font-semibold">Next</span>
        </button>
      </div>

      {/* Preview area */}
      <div className="flex-1 p-4">
        <div
          className={`h-full rounded-2xl overflow-hidden ${selectedLayout === "side-by-side" ? "grid grid-cols-2 gap-1" : selectedLayout === "top-bottom" ? "grid grid-rows-2 gap-1" : ""}`}
        >
          {/* Original video */}
          <div className="relative bg-gray-900 flex items-center justify-center">
            <img
              src={originalVideo.videoUrl || "/placeholder.svg?height=720&width=405&query=original video"}
              alt="Original video"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 px-2 py-1 glass rounded-lg">
              <p className="text-xs text-white">@{originalVideo.username}</p>
            </div>
          </div>

          {/* Your video */}
          <div className="relative bg-gray-800 flex items-center justify-center">
            {isRecording ? (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full border-4 border-pink-500 border-t-transparent animate-spin mx-auto mb-2" />
                  <p className="text-white">Recording...</p>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-20 h-20 rounded-full glass flex items-center justify-center mx-auto mb-2">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
                <p className="text-white/60 text-sm">Tap to record</p>
              </div>
            )}

            {selectedLayout === "react" && (
              <div className="absolute bottom-4 right-4 w-24 h-32 rounded-xl border-2 border-white/50 bg-black/50 flex items-center justify-center">
                <span className="text-xs text-white/70">You</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sound info */}
      <div className="px-4 py-2">
        <div className="glass rounded-xl p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg gradient-button flex items-center justify-center">
            <Music className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-white text-sm font-medium">{originalVideo.soundName}</p>
            <p className="text-xs text-white/60">Original sound</p>
          </div>
          <Volume2 className="w-5 h-5 text-white/60" />
        </div>
      </div>

      {/* Layout selector */}
      <div className="px-4 py-4 glass border-t border-white/10">
        <p className="text-sm text-white/70 mb-3">Layout</p>
        <div className="flex gap-3">
          {layouts.map((layout) => (
            <button
              key={layout.id}
              onClick={() => setSelectedLayout(layout.id)}
              className={`flex-1 aspect-[3/4] rounded-xl border-2 ${
                selectedLayout === layout.id ? "border-pink-500" : "border-white/20"
              } bg-white/5 flex items-center justify-center relative overflow-hidden`}
            >
              <div
                className={`w-full h-full p-1 ${layout.id === "side-by-side" ? "grid grid-cols-2 gap-0.5" : layout.id === "top-bottom" ? "grid grid-rows-2 gap-0.5" : ""}`}
              >
                {layout.id === "side-by-side" && (
                  <>
                    <div className="bg-white/30 rounded" />
                    <div className="bg-pink-500/30 rounded" />
                  </>
                )}
                {layout.id === "top-bottom" && (
                  <>
                    <div className="bg-white/30 rounded" />
                    <div className="bg-pink-500/30 rounded" />
                  </>
                )}
                {layout.id === "react" && (
                  <div className="relative w-full h-full bg-white/30 rounded">
                    <div className="absolute bottom-1 right-1 w-1/3 h-1/4 bg-pink-500/50 rounded" />
                  </div>
                )}
                {layout.id === "green-screen" && (
                  <div className="w-full h-full bg-gradient-to-br from-white/30 to-pink-500/30 rounded" />
                )}
              </div>
              {selectedLayout === layout.id && (
                <div className="absolute top-1 right-1 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
        <div className="flex justify-around mt-4 text-xs text-white/60">
          {layouts.map((layout) => (
            <span key={layout.id} className={selectedLayout === layout.id ? "text-pink-400" : ""}>
              {layout.name}
            </span>
          ))}
        </div>
      </div>

      {/* Record button */}
      <div className="px-4 py-6 safe-bottom flex justify-center">
        <button
          onClick={() => setIsRecording(!isRecording)}
          className={`w-20 h-20 rounded-full border-4 ${
            isRecording ? "border-red-500 bg-red-500" : "border-white"
          } flex items-center justify-center`}
        >
          {isRecording ? (
            <div className="w-8 h-8 rounded bg-white" />
          ) : (
            <div className="w-16 h-16 rounded-full gradient-button" />
          )}
        </button>
      </div>
    </div>
  )
}
