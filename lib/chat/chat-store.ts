// Chat Store - Mock data and state management for chat system
import type { Chat, Message, ChatUser, TypingStatus } from "./chat-types"

// Mock users for chat
export const mockChatUsers: ChatUser[] = [
  {
    id: "u1",
    name: "Alex Design",
    username: "alex_design",
    avatar: "/man-designer-portrait.jpg",
    isOnline: true,
    lastSeen: "Just now",
  },
  {
    id: "u2",
    name: "Sarah Creates",
    username: "sarah_creates",
    avatar: "/woman-creator-portrait.png",
    isOnline: true,
    lastSeen: "Just now",
  },
  {
    id: "u3",
    name: "Mike Travels",
    username: "mike_travels",
    avatar: "/traveler-man-portrait.jpg",
    isOnline: false,
    lastSeen: "2 hours ago",
  },
  {
    id: "u4",
    name: "Creative Jen",
    username: "creative_jen",
    avatar: "/creative-woman-portrait.png",
    isOnline: false,
    lastSeen: "Yesterday",
  },
  {
    id: "u5",
    name: "Tech Pro Max",
    username: "tech_pro",
    avatar: "/tech-guy-portrait.jpg",
    isOnline: true,
    lastSeen: "Just now",
  },
]

// Mock messages
const generateMockMessages = (chatId: string): Message[] => {
  const baseMessages: Partial<Message>[] = [
    {
      type: "text",
      content: "Hey! How are you doing?",
      senderId: "u1",
      senderName: "Alex Design",
    },
    {
      type: "text",
      content: "I'm great! Just finished editing my latest video",
      senderId: "me",
      senderName: "You",
    },
    {
      type: "voice",
      content: "",
      voiceDuration: 15,
      voiceWaveform: Array.from({ length: 30 }, () => Math.random()),
      senderId: "u1",
      senderName: "Alex Design",
    },
    {
      type: "text",
      content: "That sounds amazing! Can't wait to see it",
      senderId: "u1",
      senderName: "Alex Design",
    },
    {
      type: "image",
      content: "",
      fileUrl: "/beach-sunset.png",
      senderId: "me",
      senderName: "You",
    },
    {
      type: "text",
      content: "Wow, beautiful shot! Where was this?",
      senderId: "u1",
      senderName: "Alex Design",
      reactions: [{ emoji: "❤️", userId: "me", timestamp: Date.now() }],
    },
  ]

  return baseMessages.map((msg, i) => ({
    id: `${chatId}-msg-${i}`,
    chatId,
    senderId: msg.senderId || "u1",
    senderName: msg.senderName || "Unknown",
    senderAvatar: msg.senderId === "me" ? "/diverse-user-avatars.png" : mockChatUsers[0].avatar,
    content: msg.content || "",
    type: msg.type || "text",
    timestamp: Date.now() - (baseMessages.length - i) * 60000,
    isRead: true,
    isDelivered: true,
    isEdited: false,
    isDeleted: false,
    reactions: msg.reactions || [],
    voiceDuration: msg.voiceDuration,
    voiceWaveform: msg.voiceWaveform,
    fileUrl: msg.fileUrl,
  }))
}

// Mock chats
export const mockChats: Chat[] = [
  {
    id: "chat1",
    type: "direct",
    participants: [mockChatUsers[0]],
    lastMessage: {
      id: "lm1",
      chatId: "chat1",
      senderId: "u1",
      senderName: "Alex Design",
      senderAvatar: mockChatUsers[0].avatar,
      content: "That sounds amazing! Let's collab",
      type: "text",
      timestamp: Date.now() - 120000,
      isRead: false,
      isDelivered: true,
      isEdited: false,
      isDeleted: false,
      reactions: [],
    },
    unreadCount: 3,
    isPinned: true,
    isMuted: false,
    isArchived: false,
    isSecret: false,
    createdAt: Date.now() - 86400000 * 7,
  },
  {
    id: "chat2",
    type: "direct",
    participants: [mockChatUsers[1]],
    lastMessage: {
      id: "lm2",
      chatId: "chat2",
      senderId: "u2",
      senderName: "Sarah Creates",
      senderAvatar: mockChatUsers[1].avatar,
      content: "Thanks for the follow! Love your content",
      type: "text",
      timestamp: Date.now() - 900000,
      isRead: true,
      isDelivered: true,
      isEdited: false,
      isDeleted: false,
      reactions: [],
    },
    unreadCount: 0,
    isPinned: true,
    isMuted: false,
    isArchived: false,
    isSecret: false,
    createdAt: Date.now() - 86400000 * 3,
  },
  {
    id: "chat3",
    type: "group",
    name: "Content Creators Hub",
    avatar: "/group-chat-creative.jpg",
    participants: [mockChatUsers[0], mockChatUsers[1], mockChatUsers[2], mockChatUsers[4]],
    admins: ["me", "u1"],
    description: "A place for creators to share ideas and collaborate",
    lastMessage: {
      id: "lm3",
      chatId: "chat3",
      senderId: "u4",
      senderName: "Tech Pro Max",
      senderAvatar: mockChatUsers[4].avatar,
      content: "Check out this new editing technique!",
      type: "text",
      timestamp: Date.now() - 1800000,
      isRead: false,
      isDelivered: true,
      isEdited: false,
      isDeleted: false,
      reactions: [],
    },
    unreadCount: 5,
    isPinned: false,
    isMuted: false,
    isArchived: false,
    isSecret: false,
    createdAt: Date.now() - 86400000 * 30,
  },
  {
    id: "chat4",
    type: "direct",
    participants: [mockChatUsers[2]],
    lastMessage: {
      id: "lm4",
      chatId: "chat4",
      senderId: "u3",
      senderName: "Mike Travels",
      senderAvatar: mockChatUsers[2].avatar,
      content: "Voice message (0:15)",
      type: "voice",
      timestamp: Date.now() - 10800000,
      isRead: true,
      isDelivered: true,
      isEdited: false,
      isDeleted: false,
      reactions: [],
      voiceDuration: 15,
    },
    unreadCount: 0,
    isPinned: false,
    isMuted: true,
    isArchived: false,
    isSecret: false,
    createdAt: Date.now() - 86400000 * 14,
  },
  {
    id: "chat5",
    type: "direct",
    participants: [mockChatUsers[3]],
    lastMessage: {
      id: "lm5",
      chatId: "chat5",
      senderId: "me",
      senderName: "You",
      senderAvatar: "/diverse-user-avatars.png",
      content: "See you at the event!",
      type: "text",
      timestamp: Date.now() - 86400000,
      isRead: true,
      isDelivered: true,
      isEdited: false,
      isDeleted: false,
      reactions: [],
    },
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
    isArchived: false,
    isSecret: false,
    createdAt: Date.now() - 86400000 * 5,
  },
]

// Chat store class
class ChatStore {
  private chats: Chat[] = mockChats
  private messages: Map<string, Message[]> = new Map()
  private typingStatuses: Map<string, TypingStatus[]> = new Map()

  constructor() {
    // Initialize messages for each chat
    this.chats.forEach((chat) => {
      this.messages.set(chat.id, generateMockMessages(chat.id))
    })
  }

  getChats(): Chat[] {
    return [...this.chats].sort((a, b) => {
      // Pinned first
      if (a.isPinned && !b.isPinned) return -1
      if (!a.isPinned && b.isPinned) return 1
      // Then by last message time
      const aTime = a.lastMessage?.timestamp || a.createdAt
      const bTime = b.lastMessage?.timestamp || b.createdAt
      return bTime - aTime
    })
  }

  getChat(chatId: string): Chat | undefined {
    return this.chats.find((c) => c.id === chatId)
  }

  getMessages(chatId: string): Message[] {
    return this.messages.get(chatId) || []
  }

  sendMessage(
    chatId: string,
    message: Omit<Message, "id" | "timestamp" | "isRead" | "isDelivered" | "isEdited" | "isDeleted">,
  ): Message {
    const newMessage: Message = {
      ...message,
      id: `msg-${Date.now()}`,
      timestamp: Date.now(),
      isRead: false,
      isDelivered: true,
      isEdited: false,
      isDeleted: false,
    }

    const chatMessages = this.messages.get(chatId) || []
    chatMessages.push(newMessage)
    this.messages.set(chatId, chatMessages)

    // Update last message in chat
    const chatIndex = this.chats.findIndex((c) => c.id === chatId)
    if (chatIndex !== -1) {
      this.chats[chatIndex].lastMessage = newMessage
    }

    return newMessage
  }

  togglePin(chatId: string): void {
    const chat = this.chats.find((c) => c.id === chatId)
    if (chat) chat.isPinned = !chat.isPinned
  }

  toggleMute(chatId: string): void {
    const chat = this.chats.find((c) => c.id === chatId)
    if (chat) chat.isMuted = !chat.isMuted
  }

  markAsRead(chatId: string): void {
    const chat = this.chats.find((c) => c.id === chatId)
    if (chat) chat.unreadCount = 0

    const messages = this.messages.get(chatId)
    if (messages) {
      messages.forEach((m) => (m.isRead = true))
    }
  }

  addReaction(chatId: string, messageId: string, emoji: string, userId: string): void {
    const messages = this.messages.get(chatId)
    if (!messages) return

    const message = messages.find((m) => m.id === messageId)
    if (!message) return

    // Remove existing reaction from this user
    message.reactions = message.reactions.filter((r) => r.userId !== userId)
    // Add new reaction
    message.reactions.push({ emoji, userId, timestamp: Date.now() })
  }

  deleteMessage(chatId: string, messageId: string): void {
    const messages = this.messages.get(chatId)
    if (!messages) return

    const message = messages.find((m) => m.id === messageId)
    if (message) {
      message.isDeleted = true
      message.content = "This message was deleted"
    }
  }

  setTyping(chatId: string, userId: string, isTyping: boolean): void {
    const statuses = this.typingStatuses.get(chatId) || []
    const existing = statuses.findIndex((s) => s.userId === userId)

    if (existing !== -1) {
      statuses[existing] = { chatId, userId, isTyping, timestamp: Date.now() }
    } else {
      statuses.push({ chatId, userId, isTyping, timestamp: Date.now() })
    }

    this.typingStatuses.set(chatId, statuses)
  }

  getTypingUsers(chatId: string): string[] {
    const statuses = this.typingStatuses.get(chatId) || []
    const now = Date.now()
    // Only show typing if within last 5 seconds
    return statuses.filter((s) => s.isTyping && now - s.timestamp < 5000).map((s) => s.userId)
  }

  createChat(chatData: Chat): Chat {
    // Check if chat already exists
    const existing = this.chats.find((c) => c.id === chatData.id)
    if (existing) return existing

    const newChat: Chat = {
      ...chatData,
      createdAt: chatData.createdAt || Date.now(),
      isPinned: chatData.isPinned || false,
      isMuted: chatData.isMuted || false,
      isArchived: chatData.isArchived || false,
      isSecret: chatData.isSecret || false,
    }

    this.chats.push(newChat)
    this.messages.set(newChat.id, [])

    return newChat
  }

  createGroupChat(name: string, participants: ChatUser[], description?: string): Chat {
    const newChat: Chat = {
      id: `chat-${Date.now()}`,
      type: "group",
      name,
      participants,
      admins: ["me"],
      description,
      unreadCount: 0,
      isPinned: false,
      isMuted: false,
      isArchived: false,
      isSecret: false,
      createdAt: Date.now(),
    }

    this.chats.push(newChat)
    this.messages.set(newChat.id, [])

    return newChat
  }

  findChatByParticipant(userId: string): Chat | undefined {
    return this.chats.find((chat) => chat.type === "direct" && chat.participants.some((p) => p.id === userId))
  }

  archiveChat(chatId: string): void {
    const chat = this.chats.find((c) => c.id === chatId)
    if (chat) chat.isArchived = true
  }

  getArchivedChats(): Chat[] {
    return this.chats.filter((c) => c.isArchived)
  }
}

// Singleton instance
export const chatStore = new ChatStore()
