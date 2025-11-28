"use client"

import { useState, useRef, useEffect } from "react"
import {
  ArrowLeft,
  Phone,
  Video,
  MoreVertical,
  Send,
  Mic,
  ImageIcon,
  Smile,
  MapPin,
  File,
  Clock,
  Check,
  CheckCheck,
  Play,
  Pause,
  X,
} from "lucide-react"

interface Message {
  id: string
  senderId: string
  content: string
  type: "text" | "voice" | "video" | "gif" | "sticker" | "location" | "file" | "image"
  timestamp: string
  isRead: boolean
  isDelivered: boolean
  isDisappearing: boolean
  voiceDuration?: number
  fileName?: string
  fileSize?: string
  imageUrl?: string
  replyTo?: Message
}

interface ChatUser {
  id: string
  name: string
  username: string
  avatar: string
  isOnline: boolean
  lastSeen: string
}

interface ChatViewProps {
  user: ChatUser
  onBack: () => void
}

const mockMessages: Message[] = [
  {
    id: "1",
    senderId: "other",
    content: "Hey! Love your latest video",
    type: "text",
    timestamp: "10:30 AM",
    isRead: true,
    isDelivered: true,
    isDisappearing: false,
  },
  {
    id: "2",
    senderId: "me",
    content: "Thanks so much! Took me hours to edit",
    type: "text",
    timestamp: "10:32 AM",
    isRead: true,
    isDelivered: true,
    isDisappearing: false,
  },
  {
    id: "3",
    senderId: "other",
    content: "",
    type: "voice",
    voiceDuration: 15,
    timestamp: "10:35 AM",
    isRead: true,
    isDelivered: true,
    isDisappearing: false,
  },
  {
    id: "4",
    senderId: "me",
    content: "That sounds amazing! Let's collab",
    type: "text",
    timestamp: "10:38 AM",
    isRead: true,
    isDelivered: true,
    isDisappearing: false,
  },
  {
    id: "5",
    senderId: "other",
    content: "/summer-beach-vibes.jpg",
    type: "image",
    imageUrl: "/summer-beach-vibes.jpg",
    timestamp: "10:40 AM",
    isRead: false,
    isDelivered: true,
    isDisappearing: false,
  },
]

export function ChatView({ user, onBack }: ChatViewProps) {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [inputValue, setInputValue] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [showAttachments, setShowAttachments] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [playingVoice, setPlayingVoice] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((t) => t + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  // Simulate typing indicator
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(true)
      setTimeout(() => setIsTyping(false), 3000)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  const sendMessage = () => {
    if (!inputValue.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: "me",
      content: inputValue,
      type: "text",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isRead: false,
      isDelivered: true,
      isDisappearing: false,
    }
    setMessages((prev) => [...prev, newMessage])
    setInputValue("")
  }

  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const toggleVoicePlay = (messageId: string) => {
    setPlayingVoice(playingVoice === messageId ? null : messageId)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 safe-top glass border-b border-white/10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>

          <div className="relative">
            <img
              src={user.avatar || "/placeholder.svg"}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {user.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
            )}
          </div>

          <div className="flex-1">
            <p className="font-semibold text-white">{user.name}</p>
            <p className="text-xs text-white/60">{user.isOnline ? "Online" : `Last seen ${user.lastSeen}`}</p>
          </div>

          <button className="p-2">
            <Phone className="w-5 h-5 text-white" />
          </button>
          <button className="p-2">
            <Video className="w-5 h-5 text-white" />
          </button>
          <button className="p-2">
            <MoreVertical className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => {
          const isMe = message.senderId === "me"

          return (
            <div key={message.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[75%] rounded-2xl p-3 ${
                  isMe ? "bg-gradient-to-r from-pink-500 to-purple-500" : "glass"
                }`}
              >
                {message.type === "text" && <p className="text-white">{message.content}</p>}

                {message.type === "voice" && (
                  <div className="flex items-center gap-3 min-w-[180px]">
                    <button
                      onClick={() => toggleVoicePlay(message.id)}
                      className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
                    >
                      {playingVoice === message.id ? (
                        <Pause className="w-5 h-5 text-white" />
                      ) : (
                        <Play className="w-5 h-5 text-white ml-0.5" />
                      )}
                    </button>
                    <div className="flex-1">
                      <div className="h-8 flex items-center gap-0.5">
                        {[...Array(20)].map((_, i) => (
                          <div
                            key={i}
                            className="w-1 bg-white/60 rounded-full"
                            style={{ height: `${Math.random() * 100}%` }}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-white/70">0:{message.voiceDuration}</span>
                  </div>
                )}

                {message.type === "image" && (
                  <img
                    src={message.imageUrl || "/placeholder.svg"}
                    alt="Shared image"
                    className="rounded-xl max-w-full"
                  />
                )}

                <div className={`flex items-center gap-1 mt-1 ${isMe ? "justify-end" : "justify-start"}`}>
                  <span className="text-xs text-white/50">{message.timestamp}</span>
                  {isMe && (
                    <>
                      {message.isRead ? (
                        <CheckCheck className="w-3 h-3 text-blue-400" />
                      ) : message.isDelivered ? (
                        <CheckCheck className="w-3 h-3 text-white/50" />
                      ) : (
                        <Check className="w-3 h-3 text-white/50" />
                      )}
                    </>
                  )}
                  {message.isDisappearing && <Clock className="w-3 h-3 text-yellow-400" />}
                </div>
              </div>
            </div>
          )
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="glass rounded-2xl p-3 px-4">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Attachment options */}
      {showAttachments && (
        <div className="px-4 py-3 glass border-t border-white/10">
          <div className="flex justify-around">
            {[
              { icon: ImageIcon, label: "Photo", color: "text-pink-400" },
              { icon: Video, label: "Video", color: "text-purple-400" },
              { icon: File, label: "File", color: "text-blue-400" },
              { icon: MapPin, label: "Location", color: "text-green-400" },
              { icon: Smile, label: "GIF", color: "text-yellow-400" },
            ].map((item) => (
              <button key={item.label} className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center">
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <span className="text-xs text-white/70">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input bar */}
      <div className="px-4 py-3 safe-bottom glass border-t border-white/10">
        {isRecording ? (
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsRecording(false)
                setRecordingTime(0)
              }}
              className="p-3 rounded-full bg-red-500/20"
            >
              <X className="w-6 h-6 text-red-500" />
            </button>
            <div className="flex-1 flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className="text-white font-mono">{formatRecordingTime(recordingTime)}</span>
              <div className="flex-1 h-8 flex items-center gap-0.5">
                {[...Array(30)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-pink-400/60 rounded-full animate-pulse"
                    style={{
                      height: `${Math.random() * 100}%`,
                      animationDelay: `${i * 50}ms`,
                    }}
                  />
                ))}
              </div>
            </div>
            <button
              onClick={() => {
                setIsRecording(false)
                setRecordingTime(0)
                // Send voice message
              }}
              className="p-3 rounded-full gradient-button"
            >
              <Send className="w-6 h-6 text-white" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button onClick={() => setShowAttachments(!showAttachments)} className="p-2">
              <ImageIcon className="w-6 h-6 text-white/70" />
            </button>

            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="w-full px-4 py-3 bg-white/10 rounded-full text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-pink-500"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <Smile className="w-5 h-5 text-white/50" />
              </button>
            </div>

            {inputValue ? (
              <button onClick={sendMessage} className="p-3 rounded-full gradient-button">
                <Send className="w-6 h-6 text-white" />
              </button>
            ) : (
              <button
                onMouseDown={() => setIsRecording(true)}
                className="p-3 rounded-full bg-white/10 active:bg-pink-500 transition-colors"
              >
                <Mic className="w-5 h-5 text-white" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
