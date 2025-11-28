"use client"

import { useState } from "react"
import { ArrowLeft, Camera, Mic, Settings, Users, Gift, Eye, Globe, Lock, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface GoLiveSetupProps {
  onBack: () => void
  onStartLive: (settings: LiveSettings) => void
}

interface LiveSettings {
  title: string
  description: string
  category: string
  privacy: "public" | "followers" | "friends"
  allowGifts: boolean
  allowComments: boolean
  allowDuet: boolean
  scheduledTime?: Date
}

const categories = [
  { id: "chat", name: "Just Chatting", icon: "💬" },
  { id: "music", name: "Music", icon: "🎵" },
  { id: "gaming", name: "Gaming", icon: "🎮" },
  { id: "dance", name: "Dance", icon: "💃" },
  { id: "cooking", name: "Cooking", icon: "🍳" },
  { id: "fitness", name: "Fitness", icon: "💪" },
  { id: "art", name: "Art", icon: "🎨" },
  { id: "education", name: "Education", icon: "📚" },
]

export function GoLiveSetup({ onBack, onStartLive }: GoLiveSetupProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("chat")
  const [privacy, setPrivacy] = useState<"public" | "followers" | "friends">("public")
  const [allowGifts, setAllowGifts] = useState(true)
  const [allowComments, setAllowComments] = useState(true)
  const [allowDuet, setAllowDuet] = useState(true)
  const [showSchedule, setShowSchedule] = useState(false)
  const [cameraReady, setCameraReady] = useState(true)
  const [micReady, setMicReady] = useState(true)

  const handleStartLive = () => {
    onStartLive({
      title: title || "Live Stream",
      description,
      category: selectedCategory,
      privacy,
      allowGifts,
      allowComments,
      allowDuet,
    })
  }

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 safe-top">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-bold text-white">Go Live</h1>
        </div>
      </div>

      {/* Camera preview */}
      <div className="px-4 mb-6">
        <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden relative">
          <img src="/camera-preview-dark.jpg" alt="Camera preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Status indicators */}
          <div className="absolute top-4 left-4 flex gap-2">
            <div
              className={cn(
                "px-3 py-1 rounded-full flex items-center gap-1.5",
                cameraReady ? "bg-green-500/20" : "bg-red-500/20",
              )}
            >
              <Camera className={cn("w-4 h-4", cameraReady ? "text-green-400" : "text-red-400")} />
              <span className={cn("text-xs", cameraReady ? "text-green-400" : "text-red-400")}>
                {cameraReady ? "Ready" : "Off"}
              </span>
            </div>
            <div
              className={cn(
                "px-3 py-1 rounded-full flex items-center gap-1.5",
                micReady ? "bg-green-500/20" : "bg-red-500/20",
              )}
            >
              <Mic className={cn("w-4 h-4", micReady ? "text-green-400" : "text-red-400")} />
              <span className={cn("text-xs", micReady ? "text-green-400" : "text-red-400")}>
                {micReady ? "Ready" : "Muted"}
              </span>
            </div>
          </div>

          {/* Camera/Mic toggle */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
            <button
              onClick={() => setCameraReady(!cameraReady)}
              className={cn("p-3 rounded-full", cameraReady ? "glass" : "bg-red-500")}
            >
              <Camera className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => setMicReady(!micReady)}
              className={cn("p-3 rounded-full", micReady ? "glass" : "bg-red-500")}
            >
              <Mic className="w-5 h-5 text-white" />
            </button>
            <button className="p-3 glass rounded-full">
              <Settings className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-4">
        {/* Title */}
        <div>
          <label className="text-sm text-white/70 mb-2 block">Stream Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What's your stream about?"
            className="w-full px-4 py-3 glass rounded-xl text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="text-sm text-white/70 mb-2 block">Category</label>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "px-4 py-2 rounded-full flex items-center gap-2 whitespace-nowrap transition-all",
                  selectedCategory === cat.id ? "gradient-button text-white" : "glass text-white/70",
                )}
              >
                <span>{cat.icon}</span>
                <span className="text-sm">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div>
          <label className="text-sm text-white/70 mb-2 block">Who can watch</label>
          <div className="flex gap-2">
            {[
              { id: "public", label: "Everyone", icon: Globe },
              { id: "followers", label: "Followers", icon: Users },
              { id: "friends", label: "Friends", icon: Lock },
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => setPrivacy(option.id as typeof privacy)}
                className={cn(
                  "flex-1 py-3 rounded-xl flex flex-col items-center gap-1 transition-all",
                  privacy === option.id ? "gradient-button text-white" : "glass text-white/70",
                )}
              >
                <option.icon className="w-5 h-5" />
                <span className="text-xs">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Settings toggles */}
        <div className="glass rounded-2xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Gift className="w-5 h-5 text-pink-400" />
              <span className="text-white">Allow Gifts</span>
            </div>
            <button
              onClick={() => setAllowGifts(!allowGifts)}
              className={cn("w-12 h-6 rounded-full transition-colors", allowGifts ? "bg-pink-500" : "bg-white/20")}
            >
              <div
                className={cn(
                  "w-5 h-5 rounded-full bg-white transition-transform",
                  allowGifts ? "translate-x-6" : "translate-x-0.5",
                )}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-blue-400" />
              <span className="text-white">Allow Comments</span>
            </div>
            <button
              onClick={() => setAllowComments(!allowComments)}
              className={cn("w-12 h-6 rounded-full transition-colors", allowComments ? "bg-pink-500" : "bg-white/20")}
            >
              <div
                className={cn(
                  "w-5 h-5 rounded-full bg-white transition-transform",
                  allowComments ? "translate-x-6" : "translate-x-0.5",
                )}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-green-400" />
              <span className="text-white">Allow Guest Join</span>
            </div>
            <button
              onClick={() => setAllowDuet(!allowDuet)}
              className={cn("w-12 h-6 rounded-full transition-colors", allowDuet ? "bg-pink-500" : "bg-white/20")}
            >
              <div
                className={cn(
                  "w-5 h-5 rounded-full bg-white transition-transform",
                  allowDuet ? "translate-x-6" : "translate-x-0.5",
                )}
              />
            </button>
          </div>
        </div>

        {/* Schedule option */}
        <button
          onClick={() => setShowSchedule(!showSchedule)}
          className="w-full glass rounded-xl p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-yellow-400" />
            <span className="text-white">Schedule for later</span>
          </div>
          <div
            className={cn(
              "w-5 h-5 rounded border-2 flex items-center justify-center",
              showSchedule ? "bg-pink-500 border-pink-500" : "border-white/30",
            )}
          >
            {showSchedule && <span className="text-white text-xs">✓</span>}
          </div>
        </button>

        {/* Go Live button */}
        <button
          onClick={handleStartLive}
          disabled={!cameraReady && !micReady}
          className={cn(
            "w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all",
            cameraReady || micReady
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-white/10 text-white/40 cursor-not-allowed",
          )}
        >
          <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
          Go Live Now
        </button>
      </div>
    </div>
  )
}
