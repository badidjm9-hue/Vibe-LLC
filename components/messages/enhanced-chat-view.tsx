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
  Check,
  CheckCheck,
  Play,
  Pause,
  X,
  Reply,
  Trash2,
  Copy,
  Users,
  Info,
  Camera,
} from "lucide-react"
import { chatStore } from "@/lib/chat/chat-store"
import type { Chat, Message } from "@/lib/chat/chat-types"
import { cn } from "@/lib/utils"

interface EnhancedChatViewProps {
  chat: Chat
  onBack: () => void
}

const REACTION_EMOJIS = ["❤️", "👍", "😂", "😮", "😢", "😡"]

export function EnhancedChatView({ chat, onBack }: EnhancedChatViewProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [showAttachments, setShowAttachments] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [playingVoice, setPlayingVoice] = useState<string | null>(null)
  const [replyTo, setReplyTo] = useState<Message | null>(null)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [showReactions, setShowReactions] = useState<string | null>(null)
  const [showChatInfo, setShowChatInfo] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const longPressTimer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setMessages(chatStore.getMessages(chat.id))
    chatStore.markAsRead(chat.id)
  }, [chat.id])

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

  const getChatName = () => {
    if (chat.type === "group") return chat.name
    return chat.participants[0]?.name || "Unknown"
  }

  const getChatAvatar = () => {
    if (chat.type === "group") return chat.avatar
    return chat.participants[0]?.avatar
  }

  const getOnlineStatus = () => {
    if (chat.type === "group") {
      const online = chat.participants.filter((p) => p.isOnline).length
      return `${online} online`
    }
    return chat.participants[0]?.isOnline ? "Online" : `Last seen ${chat.participants[0]?.lastSeen}`
  }

  const sendMessage = () => {
    if (!inputValue.trim()) return

    const newMessage = chatStore.sendMessage(chat.id, {
      chatId: chat.id,
      senderId: "me",
      senderName: "You",
      senderAvatar: "/diverse-user-avatars.png",
      content: inputValue,
      type: "text",
      reactions: [],
      replyTo: replyTo
        ? {
            id: replyTo.id,
            content: replyTo.content,
            senderName: replyTo.senderName,
          }
        : undefined,
    })

    setMessages((prev) => [...prev, newMessage])
    setInputValue("")
    setReplyTo(null)
  }

  const sendVoiceMessage = () => {
    const newMessage = chatStore.sendMessage(chat.id, {
      chatId: chat.id,
      senderId: "me",
      senderName: "You",
      senderAvatar: "/diverse-user-avatars.png",
      content: "",
      type: "voice",
      voiceDuration: recordingTime,
      voiceWaveform: Array.from({ length: 30 }, () => Math.random()),
      reactions: [],
    })

    setMessages((prev) => [...prev, newMessage])
    setIsRecording(false)
    setRecordingTime(0)
  }

  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleLongPress = (message: Message) => {
    setSelectedMessage(message)
  }

  const handleReaction = (messageId: string, emoji: string) => {
    chatStore.addReaction(chat.id, messageId, emoji, "me")
    setMessages(chatStore.getMessages(chat.id))
    setShowReactions(null)
  }

  const handleDeleteMessage = (messageId: string) => {
    chatStore.deleteMessage(chat.id, messageId)
    setMessages(chatStore.getMessages(chat.id))
    setSelectedMessage(null)
  }

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
    setSelectedMessage(null)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 safe-top glass border-b border-white/10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>

          <button onClick={() => setShowChatInfo(true)} className="flex items-center gap-3 flex-1">
            <div className="relative">
              {chat.type === "group" ? (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
              ) : (
                <img
                  src={getChatAvatar() || "/placeholder.svg"}
                  alt={getChatName()}
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
              {chat.type === "direct" && chat.participants[0]?.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
              )}
            </div>

            <div className="flex-1 text-left">
              <p className="font-semibold text-white">{getChatName()}</p>
              <p className="text-xs text-white/60">{getOnlineStatus()}</p>
            </div>
          </button>

          <button className="p-2">
            <Phone className="w-5 h-5 text-white" />
          </button>
          <button className="p-2">
            <Video className="w-5 h-5 text-white" />
          </button>
          <button className="p-2" onClick={() => setShowChatInfo(true)}>
            <MoreVertical className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => {
          const isMe = message.senderId === "me"

          return (
            <div
              key={message.id}
              className={cn("flex", isMe ? "justify-end" : "justify-start")}
              onContextMenu={(e) => {
                e.preventDefault()
                handleLongPress(message)
              }}
            >
              <div className="relative max-w-[75%]">
                {/* Reply preview */}
                {message.replyTo && (
                  <div
                    className={cn(
                      "text-xs px-3 py-2 rounded-t-2xl border-l-2 border-pink-500 mb-1",
                      isMe ? "bg-white/10" : "bg-white/5",
                    )}
                  >
                    <p className="text-pink-400 font-medium">{message.replyTo.senderName}</p>
                    <p className="text-white/60 truncate">{message.replyTo.content}</p>
                  </div>
                )}

                <div
                  className={cn(
                    "rounded-2xl p-3",
                    isMe ? "bg-gradient-to-r from-pink-500 to-purple-500" : "glass",
                    message.isDeleted && "opacity-60",
                  )}
                >
                  {message.isDeleted ? (
                    <p className="text-white/60 italic text-sm">This message was deleted</p>
                  ) : (
                    <>
                      {message.type === "text" && <p className="text-white">{message.content}</p>}

                      {message.type === "voice" && (
                        <div className="flex items-center gap-3 min-w-[180px]">
                          <button
                            onClick={() => setPlayingVoice(playingVoice === message.id ? null : message.id)}
                            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0"
                          >
                            {playingVoice === message.id ? (
                              <Pause className="w-5 h-5 text-white" />
                            ) : (
                              <Play className="w-5 h-5 text-white ml-0.5" />
                            )}
                          </button>
                          <div className="flex-1">
                            <div className="h-8 flex items-center gap-0.5">
                              {(message.voiceWaveform || Array(20).fill(0.5)).map((height, i) => (
                                <div
                                  key={i}
                                  className="w-1 bg-white/60 rounded-full transition-all"
                                  style={{ height: `${height * 100}%` }}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-xs text-white/70">0:{message.voiceDuration}</span>
                        </div>
                      )}

                      {message.type === "image" && (
                        <img
                          src={message.fileUrl || "/placeholder.svg"}
                          alt="Shared image"
                          className="rounded-xl max-w-full"
                        />
                      )}
                    </>
                  )}

                  {/* Timestamp and status */}
                  <div className={cn("flex items-center gap-1 mt-1", isMe ? "justify-end" : "justify-start")}>
                    <span className="text-xs text-white/50">
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    {message.isEdited && <span className="text-xs text-white/40">edited</span>}
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
                  </div>
                </div>

                {/* Reactions */}
                {message.reactions.length > 0 && (
                  <div className={cn("flex gap-1 mt-1", isMe ? "justify-end" : "justify-start")}>
                    {message.reactions.map((reaction, i) => (
                      <span key={i} className="text-sm bg-white/10 rounded-full px-2 py-0.5">
                        {reaction.emoji}
                      </span>
                    ))}
                  </div>
                )}

                {/* Quick reaction button */}
                <button
                  onClick={() => setShowReactions(showReactions === message.id ? null : message.id)}
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity",
                    isMe ? "-left-10" : "-right-10",
                  )}
                >
                  <Smile className="w-4 h-4 text-white/60" />
                </button>

                {/* Reaction picker */}
                {showReactions === message.id && (
                  <div
                    className={cn(
                      "absolute top-0 flex gap-1 p-2 glass rounded-full animate-scale-in z-10",
                      isMe ? "right-0 -translate-y-full" : "left-0 -translate-y-full",
                    )}
                  >
                    {REACTION_EMOJIS.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => handleReaction(message.id, emoji)}
                        className="w-8 h-8 flex items-center justify-center hover:scale-125 transition-transform"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
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

      {/* Reply preview */}
      {replyTo && (
        <div className="px-4 py-2 glass border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex-1 border-l-2 border-pink-500 pl-3">
              <p className="text-xs text-pink-400">Replying to {replyTo.senderName}</p>
              <p className="text-sm text-white/60 truncate">{replyTo.content}</p>
            </div>
            <button onClick={() => setReplyTo(null)}>
              <X className="w-5 h-5 text-white/60" />
            </button>
          </div>
        </div>
      )}

      {/* Attachment options */}
      {showAttachments && (
        <div className="px-4 py-3 glass border-t border-white/10">
          <div className="flex justify-around">
            {[
              { icon: ImageIcon, label: "Photo", color: "text-pink-400" },
              { icon: Camera, label: "Camera", color: "text-purple-400" },
              { icon: Video, label: "Video", color: "text-blue-400" },
              { icon: File, label: "File", color: "text-green-400" },
              { icon: MapPin, label: "Location", color: "text-yellow-400" },
            ].map((item) => (
              <button key={item.label} className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center">
                  <item.icon className={cn("w-6 h-6", item.color)} />
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
                {Array.from({ length: 30 }).map((_, i) => (
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
            <button onClick={sendVoiceMessage} className="p-3 rounded-full gradient-button">
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
                onTouchStart={() => setIsRecording(true)}
                className="p-3 rounded-full bg-white/10 active:bg-pink-500 transition-colors"
              >
                <Mic className="w-5 h-5 text-white" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Message options modal */}
      {selectedMessage && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMessage(null)}
        >
          <div className="glass rounded-2xl p-4 w-full max-w-sm space-y-2" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => {
                setReplyTo(selectedMessage)
                setSelectedMessage(null)
              }}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors"
            >
              <Reply className="w-5 h-5 text-white" />
              <span className="text-white">Reply</span>
            </button>
            <button
              onClick={() => handleCopyMessage(selectedMessage.content)}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors"
            >
              <Copy className="w-5 h-5 text-white" />
              <span className="text-white">Copy</span>
            </button>
            {selectedMessage.senderId === "me" && (
              <button
                onClick={() => handleDeleteMessage(selectedMessage.id)}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/20 transition-colors"
              >
                <Trash2 className="w-5 h-5 text-red-400" />
                <span className="text-red-400">Delete</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Chat info modal */}
      {showChatInfo && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50">
          <div className="min-h-screen bg-background animate-slide-up">
            <div className="px-4 pt-12 pb-4 safe-top glass">
              <div className="flex items-center gap-3">
                <button onClick={() => setShowChatInfo(false)} className="p-2 -ml-2">
                  <ArrowLeft className="w-6 h-6 text-white" />
                </button>
                <h1 className="text-lg font-semibold text-white">Chat Info</h1>
              </div>
            </div>

            <div className="p-4 space-y-6">
              {/* Profile */}
              <div className="flex flex-col items-center">
                {chat.type === "group" ? (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mb-4">
                    <Users className="w-12 h-12 text-white" />
                  </div>
                ) : (
                  <img
                    src={getChatAvatar() || "/placeholder.svg"}
                    alt={getChatName()}
                    className="w-24 h-24 rounded-full object-cover mb-4"
                  />
                )}
                <h2 className="text-xl font-bold text-white">{getChatName()}</h2>
                <p className="text-white/60">{getOnlineStatus()}</p>
                {chat.description && <p className="text-sm text-white/60 text-center mt-2">{chat.description}</p>}
              </div>

              {/* Actions */}
              <div className="flex justify-center gap-4">
                <button className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs text-white/70">Call</span>
                </button>
                <button className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center">
                    <Video className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs text-white/70">Video</span>
                </button>
                <button className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center">
                    <Info className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs text-white/70">Info</span>
                </button>
              </div>

              {/* Participants (for groups) */}
              {chat.type === "group" && (
                <div className="glass rounded-2xl p-4">
                  <h3 className="font-semibold text-white mb-3">{chat.participants.length} Participants</h3>
                  <div className="space-y-2">
                    {chat.participants.map((p) => (
                      <div key={p.id} className="flex items-center gap-3">
                        <img
                          src={p.avatar || "/placeholder.svg"}
                          alt={p.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <p className="text-white font-medium">{p.name}</p>
                          <p className="text-xs text-white/60">@{p.username}</p>
                        </div>
                        {chat.admins?.includes(p.id) && (
                          <span className="text-xs text-pink-400 bg-pink-500/20 px-2 py-1 rounded-full">Admin</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Settings */}
              <div className="glass rounded-2xl divide-y divide-white/10">
                <button className="w-full flex items-center justify-between p-4">
                  <span className="text-white">Mute notifications</span>
                  <div
                    className={cn(
                      "w-12 h-6 rounded-full transition-colors",
                      chat.isMuted ? "bg-pink-500" : "bg-white/20",
                    )}
                  >
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full bg-white mt-0.5 transition-transform",
                        chat.isMuted ? "translate-x-6" : "translate-x-0.5",
                      )}
                    />
                  </div>
                </button>
                <button className="w-full flex items-center justify-between p-4">
                  <span className="text-white">Pin conversation</span>
                  <div
                    className={cn(
                      "w-12 h-6 rounded-full transition-colors",
                      chat.isPinned ? "bg-pink-500" : "bg-white/20",
                    )}
                  >
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full bg-white mt-0.5 transition-transform",
                        chat.isPinned ? "translate-x-6" : "translate-x-0.5",
                      )}
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
