"use client"

import { useState, useEffect } from "react"
import {
  X,
  Repeat,
  Sparkles,
  Gift,
  Share2,
  Users,
  Heart,
  Send,
  Volume2,
  VolumeX,
  Camera,
  Mic,
  MicOff,
} from "lucide-react"

interface LiveStreamProps {
  isHost: boolean
  onEnd: () => void
}

interface LiveComment {
  id: string
  user: { name: string; avatar: string; isVerified: boolean }
  message: string
  timestamp: number
}

interface LiveGift {
  id: string
  user: { name: string; avatar: string }
  gift: { name: string; emoji: string; value: number }
  timestamp: number
}

const mockComments: LiveComment[] = [
  {
    id: "1",
    user: { name: "Alex", avatar: "/man-designer.png", isVerified: true },
    message: "This is amazing! 🔥",
    timestamp: Date.now(),
  },
  {
    id: "2",
    user: { name: "Sarah", avatar: "/woman-creator.png", isVerified: false },
    message: "Hi from NYC!",
    timestamp: Date.now() - 1000,
  },
  {
    id: "3",
    user: { name: "Mike", avatar: "/traveler-man.jpg", isVerified: false },
    message: "Love your content ❤️",
    timestamp: Date.now() - 2000,
  },
]

const gifts = [
  { id: "rose", name: "Rose", emoji: "🌹", value: 10 },
  { id: "heart", name: "Heart", emoji: "❤️", value: 50 },
  { id: "star", name: "Star", emoji: "⭐", value: 100 },
  { id: "diamond", name: "Diamond", emoji: "💎", value: 500 },
  { id: "crown", name: "Crown", emoji: "👑", value: 1000 },
  { id: "rocket", name: "Rocket", emoji: "🚀", value: 5000 },
]

export function LiveStream({ isHost, onEnd }: LiveStreamProps) {
  const [viewerCount, setViewerCount] = useState(1234)
  const [comments, setComments] = useState<LiveComment[]>(mockComments)
  const [recentGifts, setRecentGifts] = useState<LiveGift[]>([])
  const [showGifts, setShowGifts] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [isMuted, setIsMuted] = useState(false)
  const [isCameraOn, setIsCameraOn] = useState(true)
  const [isMicOn, setIsMicOn] = useState(true)
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number }[]>([])
  const [duration, setDuration] = useState(0)

  // Simulate viewer count changes
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount((prev) => prev + Math.floor(Math.random() * 10) - 3)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Duration timer
  useEffect(() => {
    const interval = setInterval(() => {
      setDuration((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Simulate incoming comments
  useEffect(() => {
    const interval = setInterval(() => {
      const newComment: LiveComment = {
        id: Date.now().toString(),
        user: {
          name: ["Emily", "John", "Lisa", "David", "Anna"][Math.floor(Math.random() * 5)],
          avatar: "/placeholder.svg",
          isVerified: Math.random() > 0.8,
        },
        message: ["Amazing!", "Love this!", "Hi from Brazil!", "Keep going!", "🔥🔥🔥"][Math.floor(Math.random() * 5)],
        timestamp: Date.now(),
      }
      setComments((prev) => [...prev.slice(-20), newComment])
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const sendComment = () => {
    if (!inputValue.trim()) return
    const newComment: LiveComment = {
      id: Date.now().toString(),
      user: { name: "You", avatar: "/woman-asian-portrait-illustration.jpg", isVerified: true },
      message: inputValue,
      timestamp: Date.now(),
    }
    setComments((prev) => [...prev, newComment])
    setInputValue("")
  }

  const sendGift = (gift: (typeof gifts)[0]) => {
    const newGift: LiveGift = {
      id: Date.now().toString(),
      user: { name: "You", avatar: "/woman-asian-portrait-illustration.jpg" },
      gift,
      timestamp: Date.now(),
    }
    setRecentGifts((prev) => [...prev.slice(-5), newGift])
    setShowGifts(false)
  }

  const addFloatingHeart = () => {
    const id = Date.now()
    const x = Math.random() * 60 + 20
    setFloatingHearts((prev) => [...prev, { id, x }])
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== id))
    }, 2000)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0">
        <img src="/live-stream-person-talking.jpg" alt="Live stream" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
      </div>

      {/* Floating hearts */}
      {floatingHearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute bottom-32 animate-float-up pointer-events-none"
          style={{ left: `${heart.x}%` }}
        >
          <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
        </div>
      ))}

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 pt-12 px-4 safe-top z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={isHost ? "/woman-asian-portrait-illustration.jpg" : "/blonde-woman-avatar-illustration.jpg"}
                alt="Host"
                className="w-10 h-10 rounded-full border-2 border-pink-500"
              />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-red-500 rounded text-[10px] text-white font-bold">
                LIVE
              </div>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">{isHost ? "Your Live" : "aurora_skye"}</p>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-white/70" />
                  <span className="text-xs text-white/70">{viewerCount.toLocaleString()}</span>
                </div>
                <span className="text-xs text-white/50">{formatDuration(duration)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isHost && (
              <button className="px-4 py-1.5 gradient-button rounded-full">
                <span className="text-white text-sm font-semibold">Follow</span>
              </button>
            )}
            <button onClick={onEnd} className="p-2 glass rounded-full">
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Recent gifts */}
      <div className="absolute top-32 left-4 space-y-2 z-10">
        {recentGifts.map((gift) => (
          <div key={gift.id} className="glass rounded-full pl-1 pr-3 py-1 flex items-center gap-2 animate-slide-in">
            <img src={gift.user.avatar || "/placeholder.svg"} alt={gift.user.name} className="w-6 h-6 rounded-full" />
            <span className="text-white text-xs">{gift.user.name}</span>
            <span className="text-lg">{gift.gift.emoji}</span>
          </div>
        ))}
      </div>

      {/* Host controls */}
      {isHost && (
        <div className="absolute top-32 right-4 flex flex-col gap-2 z-10">
          <button
            onClick={() => setIsCameraOn(!isCameraOn)}
            className={`p-3 rounded-full ${isCameraOn ? "glass" : "bg-red-500"}`}
          >
            <Camera className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={() => setIsMicOn(!isMicOn)}
            className={`p-3 rounded-full ${isMicOn ? "glass" : "bg-red-500"}`}
          >
            {isMicOn ? <Mic className="w-5 h-5 text-white" /> : <MicOff className="w-5 h-5 text-white" />}
          </button>
          <button className="p-3 glass rounded-full">
            <Repeat className="w-5 h-5 text-white" />
          </button>
          <button className="p-3 glass rounded-full">
            <Sparkles className="w-5 h-5 text-white" />
          </button>
        </div>
      )}

      {/* Comments section */}
      <div className="absolute bottom-32 left-0 right-20 px-4 z-10">
        <div className="space-y-2 max-h-64 overflow-y-auto no-scrollbar">
          {comments.slice(-10).map((comment) => (
            <div key={comment.id} className="flex items-start gap-2 animate-fade-in">
              <img
                src={comment.user.avatar || "/placeholder.svg"}
                alt={comment.user.name}
                className="w-8 h-8 rounded-full"
              />
              <div className="glass rounded-2xl rounded-tl-none px-3 py-2 max-w-[80%]">
                <p className="text-xs text-pink-400 font-medium">{comment.user.name}</p>
                <p className="text-sm text-white">{comment.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right side actions */}
      <div className="absolute right-4 bottom-32 flex flex-col items-center gap-4 z-10">
        <button onClick={addFloatingHeart} className="flex flex-col items-center">
          <div className="w-12 h-12 glass rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-pink-500" />
          </div>
        </button>
        <button onClick={() => setShowGifts(true)} className="flex flex-col items-center">
          <div className="w-12 h-12 glass rounded-full flex items-center justify-center">
            <Gift className="w-6 h-6 text-yellow-400" />
          </div>
        </button>
        <button className="flex flex-col items-center">
          <div className="w-12 h-12 glass rounded-full flex items-center justify-center">
            <Share2 className="w-6 h-6 text-white" />
          </div>
        </button>
        <button onClick={() => setIsMuted(!isMuted)} className="flex flex-col items-center">
          <div className="w-12 h-12 glass rounded-full flex items-center justify-center">
            {isMuted ? <VolumeX className="w-6 h-6 text-white" /> : <Volume2 className="w-6 h-6 text-white" />}
          </div>
        </button>
      </div>

      {/* Input bar */}
      <div className="absolute bottom-0 left-0 right-0 p-4 safe-bottom z-10">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Say something..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendComment()}
              className="w-full px-4 py-3 glass rounded-full text-white placeholder:text-white/50 outline-none"
            />
          </div>
          <button onClick={sendComment} className="p-3 gradient-button rounded-full">
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Gift modal */}
      {showGifts && (
        <div className="absolute inset-0 z-20 flex items-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowGifts(false)} />
          <div className="relative w-full glass rounded-t-3xl p-4 pb-8 safe-bottom">
            <div className="w-12 h-1 bg-white/30 rounded-full mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-4">Send a Gift</h3>
            <div className="grid grid-cols-3 gap-3">
              {gifts.map((gift) => (
                <button
                  key={gift.id}
                  onClick={() => sendGift(gift)}
                  className="glass rounded-xl p-3 flex flex-col items-center gap-1"
                >
                  <span className="text-3xl">{gift.emoji}</span>
                  <span className="text-xs text-white">{gift.name}</span>
                  <span className="text-xs text-pink-400">{gift.value} coins</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
