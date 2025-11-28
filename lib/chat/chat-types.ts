// Chat System Types

export interface ChatUser {
  id: string
  name: string
  username: string
  avatar: string
  isOnline: boolean
  lastSeen: string
  isTyping?: boolean
}

export interface MessageReaction {
  emoji: string
  userId: string
  timestamp: number
}

export interface Message {
  id: string
  chatId: string
  senderId: string
  senderName: string
  senderAvatar: string
  content: string
  type: "text" | "voice" | "video" | "image" | "gif" | "sticker" | "location" | "file"
  timestamp: number
  isRead: boolean
  isDelivered: boolean
  isEdited: boolean
  isDeleted: boolean
  reactions: MessageReaction[]
  replyTo?: {
    id: string
    content: string
    senderName: string
  }
  // Voice message specific
  voiceDuration?: number
  voiceWaveform?: number[]
  // File/Media specific
  fileName?: string
  fileSize?: number
  fileUrl?: string
  thumbnailUrl?: string
  // Auto-delete for secret chats
  expiresAt?: number
  // Mentions
  mentions?: string[] // user IDs mentioned
}

export interface Chat {
  id: string
  type: "direct" | "group"
  name?: string // For group chats
  avatar?: string // For group chats
  participants: ChatUser[]
  lastMessage?: Message
  unreadCount: number
  isPinned: boolean
  isMuted: boolean
  isArchived: boolean
  isSecret: boolean // For secret/encrypted chats
  autoDeleteTimer?: number // in seconds, for secret chats
  theme?: string
  wallpaper?: string
  createdAt: number
  // Group specific
  admins?: string[] // user IDs
  description?: string
}

export interface ChatSettings {
  notifications: boolean
  mediaAutoDownload: boolean
  readReceipts: boolean
  typingIndicators: boolean
  onlineStatus: boolean
  lastSeenVisibility: "everyone" | "contacts" | "nobody"
}

export interface TypingStatus {
  chatId: string
  userId: string
  isTyping: boolean
  timestamp: number
}
