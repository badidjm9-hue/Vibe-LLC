"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  username: string
  displayName: string
  avatar: string
  bio: string
  followers: number
  following: number
  likes: number
  isVerified: boolean
  coins: number
  creatorLevel: number
}

interface Video {
  id: string
  userId: string
  username: string
  userAvatar: string
  videoUrl: string
  thumbnailUrl: string
  caption: string
  hashtags: string[]
  soundName: string
  soundAuthor: string
  likes: number
  comments: number
  shares: number
  saves: number
  views: number
  isLiked: boolean
  isSaved: boolean
  isFollowing: boolean
  createdAt: string
}

interface Message {
  id: string
  chatId: string
  senderId: string
  content: string
  type: "text" | "voice" | "video" | "gif" | "sticker" | "location" | "file"
  timestamp: string
  isRead: boolean
  isDisappearing: boolean
  disappearAfter?: number
}

interface Chat {
  id: string
  participantIds: string[]
  participants: User[]
  lastMessage: Message | null
  unreadCount: number
  isPinned: boolean
  isMuted: boolean
  isSecret: boolean
  theme: string
}

interface Notification {
  id: string
  type: "like" | "comment" | "follow" | "mention" | "message" | "gift"
  fromUser: User
  content: string
  timestamp: string
  isRead: boolean
  videoId?: string
}

interface AppContextType {
  // Auth
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, username: string) => Promise<void>
  logout: () => void

  // Videos
  videos: Video[]
  currentVideoIndex: number
  setCurrentVideoIndex: (index: number) => void
  likeVideo: (videoId: string) => void
  saveVideo: (videoId: string) => void
  followUser: (userId: string) => void

  // Chats
  chats: Chat[]
  activeChat: Chat | null
  setActiveChat: (chat: Chat | null) => void
  sendMessage: (chatId: string, content: string, type: Message["type"]) => void

  // Notifications
  notifications: Notification[]
  unreadNotifications: number
  markNotificationRead: (id: string) => void

  // Settings
  notificationSettings: {
    likes: boolean
    comments: boolean
    followers: boolean
    mentions: boolean
    messageRequests: boolean
    messages: boolean
  }
  updateNotificationSettings: (key: string, value: boolean) => void

  // Coins
  coins: number
  addCoins: (amount: number) => void
  spendCoins: (amount: number) => boolean

  // Navigation
  showOnboarding: boolean
  completeOnboarding: () => void
  activeTab: string
  setActiveTab: (tab: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

// Mock data
const mockVideos: Video[] = [
  {
    id: "1",
    userId: "user1",
    username: "creatorname",
    userAvatar: "/smiling-woman-portrait.png",
    videoUrl: "/images/screen.png",
    thumbnailUrl: "/images/screen.png",
    caption: "Exploring the vibrant streets tonight! This city never sleeps...",
    hashtags: ["citylights", "nightvibe"],
    soundName: "Night City Vibes",
    soundAuthor: "DJ Neon",
    likes: 12300,
    comments: 1124,
    shares: 580,
    saves: 245,
    views: 89000,
    isLiked: false,
    isSaved: false,
    isFollowing: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    userId: "user2",
    username: "aurora_skye",
    userAvatar: "/blonde-woman-avatar-illustration.jpg",
    videoUrl: "/majestic-mountain-vista.png",
    thumbnailUrl: "/majestic-mountain-vista.png",
    caption: "Nature's beauty never fails to amaze me 🏔️",
    hashtags: ["nature", "mountains", "explore"],
    soundName: "Peaceful Melody",
    soundAuthor: "Nature Sounds",
    likes: 45200,
    comments: 892,
    shares: 1200,
    saves: 678,
    views: 234000,
    isLiked: true,
    isSaved: false,
    isFollowing: true,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "3",
    userId: "user3",
    username: "tech_wizard",
    userAvatar: "/man-tech-avatar.jpg",
    videoUrl: "/coding-programming-video.jpg",
    thumbnailUrl: "/coding-screen.png",
    caption: "New tutorial dropping tomorrow! Stay tuned 💻",
    hashtags: ["coding", "tech", "tutorial"],
    soundName: "Lo-fi Beats",
    soundAuthor: "Chill Hop",
    likes: 8900,
    comments: 456,
    shares: 234,
    saves: 890,
    views: 56000,
    isLiked: false,
    isSaved: true,
    isFollowing: false,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
]

const mockUser: User = {
  id: "currentUser",
  username: "username",
  displayName: "User's Full Name",
  avatar: "/woman-asian-portrait-illustration.jpg",
  bio: "A short and engaging user bio goes here.",
  followers: 1200000,
  following: 150,
  likes: 5800000,
  isVerified: true,
  coins: 5000,
  creatorLevel: 3,
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [videos, setVideos] = useState<Video[]>(mockVideos)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [chats, setChats] = useState<Chat[]>([])
  const [activeChat, setActiveChat] = useState<Chat | null>(null)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [activeTab, setActiveTab] = useState("home")
  const [coins, setCoins] = useState(5000)
  const [notificationSettings, setNotificationSettings] = useState({
    likes: true,
    comments: true,
    followers: false,
    mentions: true,
    messageRequests: false,
    messages: true,
  })

  useEffect(() => {
    // Check for stored auth
    const storedAuth = localStorage.getItem("vibe_auth")
    if (storedAuth) {
      setUser(mockUser)
      setIsAuthenticated(true)
      setShowOnboarding(false)
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setUser(mockUser)
    setIsAuthenticated(true)
    localStorage.setItem("vibe_auth", "true")
    setIsLoading(false)
  }

  const signup = async (email: string, password: string, username: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const newUser = { ...mockUser, username, displayName: username }
    setUser(newUser)
    setIsAuthenticated(true)
    localStorage.setItem("vibe_auth", "true")
    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("vibe_auth")
  }

  const likeVideo = (videoId: string) => {
    setVideos((prev) =>
      prev.map((v) =>
        v.id === videoId ? { ...v, isLiked: !v.isLiked, likes: v.isLiked ? v.likes - 1 : v.likes + 1 } : v,
      ),
    )
  }

  const saveVideo = (videoId: string) => {
    setVideos((prev) =>
      prev.map((v) =>
        v.id === videoId ? { ...v, isSaved: !v.isSaved, saves: v.isSaved ? v.saves - 1 : v.saves + 1 } : v,
      ),
    )
  }

  const followUser = (userId: string) => {
    setVideos((prev) => prev.map((v) => (v.userId === userId ? { ...v, isFollowing: !v.isFollowing } : v)))
  }

  const sendMessage = (chatId: string, content: string, type: Message["type"]) => {
    // Implementation for sending messages
  }

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
  }

  const updateNotificationSettings = (key: string, value: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [key]: value }))
  }

  const addCoins = (amount: number) => {
    setCoins((prev) => prev + amount)
  }

  const spendCoins = (amount: number) => {
    if (coins >= amount) {
      setCoins((prev) => prev - amount)
      return true
    }
    return false
  }

  const completeOnboarding = () => {
    setShowOnboarding(false)
  }

  const unreadNotifications = notifications.filter((n) => !n.isRead).length

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        signup,
        logout,
        videos,
        currentVideoIndex,
        setCurrentVideoIndex,
        likeVideo,
        saveVideo,
        followUser,
        chats,
        activeChat,
        setActiveChat,
        sendMessage,
        notifications,
        unreadNotifications,
        markNotificationRead,
        notificationSettings,
        updateNotificationSettings,
        coins,
        addCoins,
        spendCoins,
        showOnboarding,
        completeOnboarding,
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within AppProvider")
  }
  return context
}
