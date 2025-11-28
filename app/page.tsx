"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useApp } from "@/contexts/app-context"
import { OnboardingScreen } from "@/components/onboarding/onboarding-screen"
import { LoginScreen } from "@/components/auth/login-screen"
import { VideoFeed } from "@/components/feed/video-feed"
import { DiscoverScreen } from "@/components/discover/discover-screen"
import { CreateScreen } from "@/components/create/create-screen"
import { ActivityScreen } from "@/components/activity/activity-screen"
import { ProfileScreen } from "@/components/profile/profile-screen"
import { UserProfileView } from "@/components/profile/user-profile-view"
import { EditProfileScreen } from "@/components/profile/edit-profile-screen"
import { EnhancedMessagesScreen } from "@/components/messages/enhanced-messages-screen"
import { EnhancedChatView } from "@/components/messages/enhanced-chat-view"
import { CreateGroupScreen } from "@/components/messages/create-group-screen"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { PrivacySettingsScreen } from "@/components/settings/privacy-settings-screen"
import { AnalyticsDashboard } from "@/components/creator/analytics-dashboard"
import { MonetizationDashboard } from "@/components/creator/monetization-dashboard"
import { ContentModeration } from "@/components/moderation/content-moderation"
import { AdminPanel } from "@/components/admin/admin-panel"
import { AlgorithmControlPanel } from "@/components/admin/algorithm-control-panel"
import { SettingsScreen } from "@/components/settings/settings-screen"
import { CoinStore } from "@/components/coins/coin-store"
import { AdvancedSearchScreen } from "@/components/search/advanced-search-screen"
import { ChallengesScreen } from "@/components/challenges/challenges-screen"
import { MemoriesScreen } from "@/components/memories/memories-screen"
import { LiveStream } from "@/components/live/live-stream"
import { VideoEditor } from "@/components/video-editor/video-editor"
import { DuetScreen } from "@/components/duet/duet-screen"
import { TwoFactorAuth } from "@/components/security/two-factor-auth"
import { AppLock } from "@/components/security/app-lock"
import { StoriesBar, StoryViewer } from "@/components/stories/stories-bar"
import { StoryCreator } from "@/components/stories/story-creator"
import { BottomNav } from "@/components/ui/bottom-nav"
import { MessageRequestsScreen } from "@/components/messages/message-requests-screen"
import { SubscriptionsScreen } from "@/components/subscriptions/subscriptions-screen"
import { GoLiveSetup } from "@/components/live/go-live-setup"
import { SoundsLibrary } from "@/components/sounds/sounds-library"
import type { Chat } from "@/lib/chat/chat-types"
import { chatStore } from "@/lib/chat/chat-store"
import { cn } from "@/lib/utils"

const tabOrder = ["home", "discover", "create", "messages", "activity", "profile"]

export default function App() {
  const { showOnboarding, isAuthenticated, isLoading, activeTab, setActiveTab } = useApp()
  const [currentScreen, setCurrentScreen] = useState<string | null>(null)
  const [isLocked, setIsLocked] = useState(false)
  const [activeChat, setActiveChat] = useState<Chat | null>(null)
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [activeStory, setActiveStory] = useState<any>(null)
  const [showStoryCreator, setShowStoryCreator] = useState(false)

  const [viewingUser, setViewingUser] = useState<{
    id: string
    username: string
    displayName?: string
    avatar: string
    bio?: string
    followers?: number
    following?: number
    likes?: number
    isVerified?: boolean
    isFollowing?: boolean
  } | null>(null)

  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (currentScreen || activeChat || showCreateGroup || viewingUser || activeStory || showStoryCreator) return

    const swipeDistance = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50

    if (Math.abs(swipeDistance) < minSwipeDistance) return

    const currentIndex = tabOrder.indexOf(activeTab)

    if (swipeDistance > 0 && currentIndex < tabOrder.length - 1) {
      setSwipeDirection("left")
      setIsAnimating(true)
      setTimeout(() => {
        setActiveTab(tabOrder[currentIndex + 1])
        setSwipeDirection(null)
        setIsAnimating(false)
      }, 200)
    } else if (swipeDistance < 0 && currentIndex > 0) {
      setSwipeDirection("right")
      setIsAnimating(true)
      setTimeout(() => {
        setActiveTab(tabOrder[currentIndex - 1])
        setSwipeDirection(null)
        setIsAnimating(false)
      }, 200)
    }
  }

  const navigateToUserProfile = (user: {
    id: string
    username: string
    displayName?: string
    avatar: string
    bio?: string
    followers?: number
    following?: number
    likes?: number
    isVerified?: boolean
    isFollowing?: boolean
  }) => {
    setViewingUser(user)
  }

  const handleMessageFromProfile = (userId: string) => {
    const existingChat = chatStore.findChatByParticipant(userId)

    if (existingChat) {
      setActiveChat(existingChat)
    } else {
      const newChat = chatStore.createChat({
        id: `chat-${userId}-${Date.now()}`,
        type: "direct",
        participants: [
          {
            id: userId,
            name: viewingUser?.displayName || viewingUser?.username || "User",
            username: viewingUser?.username || "user",
            avatar: viewingUser?.avatar || "/placeholder.svg",
            isOnline: true,
            lastSeen: "Just now",
          },
        ],
        unreadCount: 0,
        isPinned: false,
        isMuted: false,
        isArchived: false,
        isSecret: false,
        createdAt: Date.now(),
      })
      setActiveChat(newChat)
    }
    setViewingUser(null)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading Vibe...</p>
        </div>
      </div>
    )
  }

  if (isLocked) {
    return <AppLock onUnlock={() => setIsLocked(false)} lockType="pin" />
  }

  if (showOnboarding) {
    return <OnboardingScreen />
  }

  if (!isAuthenticated) {
    return <LoginScreen />
  }

  if (showStoryCreator) {
    return (
      <StoryCreator
        onClose={() => setShowStoryCreator(false)}
        onPublish={(story) => {
          console.log("Story published:", story)
          setShowStoryCreator(false)
        }}
      />
    )
  }

  if (activeStory) {
    return (
      <StoryViewer
        story={activeStory}
        onClose={() => setActiveStory(null)}
        onNext={() => setActiveStory(null)}
        onPrev={() => setActiveStory(null)}
      />
    )
  }

  if (viewingUser) {
    return (
      <UserProfileView user={viewingUser} onBack={() => setViewingUser(null)} onMessage={handleMessageFromProfile} />
    )
  }

  if (showCreateGroup) {
    return (
      <CreateGroupScreen
        onBack={() => setShowCreateGroup(false)}
        onCreateGroup={(name, participants, description) => {
          const newChat = chatStore.createGroupChat(name, participants, description)
          setShowCreateGroup(false)
          setActiveChat(newChat)
        }}
      />
    )
  }

  if (activeChat) {
    return <EnhancedChatView chat={activeChat} onBack={() => setActiveChat(null)} />
  }

  if (currentScreen === "notifications") {
    return <NotificationSettings onBack={() => setCurrentScreen(null)} />
  }
  if (currentScreen === "analytics") {
    return <AnalyticsDashboard onBack={() => setCurrentScreen(null)} />
  }
  if (currentScreen === "monetization") {
    return <MonetizationDashboard onBack={() => setCurrentScreen(null)} />
  }
  if (currentScreen === "moderation") {
    return <ContentModeration onBack={() => setCurrentScreen(null)} />
  }
  if (currentScreen === "admin") {
    return <AdminPanel onBack={() => setCurrentScreen(null)} />
  }
  if (currentScreen === "algorithm") {
    return <AlgorithmControlPanel onBack={() => setCurrentScreen(null)} />
  }
  if (currentScreen === "settings") {
    return <SettingsScreen onBack={() => setCurrentScreen(null)} onNavigate={(screen) => setCurrentScreen(screen)} />
  }
  if (currentScreen === "coinStore") {
    return <CoinStore onBack={() => setCurrentScreen(null)} />
  }
  if (currentScreen === "search") {
    return (
      <AdvancedSearchScreen
        onBack={() => setCurrentScreen(null)}
        onNavigate={setCurrentScreen}
        onViewUserProfile={(userId) => {
          navigateToUserProfile({
            id: userId,
            username: "user_" + userId,
            avatar: "/placeholder.svg",
          })
        }}
      />
    )
  }
  if (currentScreen === "challenges") {
    return <ChallengesScreen onBack={() => setCurrentScreen(null)} onNavigate={setCurrentScreen} />
  }
  if (currentScreen === "memories") {
    return <MemoriesScreen onBack={() => setCurrentScreen(null)} />
  }
  if (currentScreen === "live") {
    return <LiveStream isHost={true} onEnd={() => setCurrentScreen(null)} />
  }
  if (currentScreen === "watchLive") {
    return <LiveStream isHost={false} onEnd={() => setCurrentScreen(null)} />
  }
  if (currentScreen === "editor") {
    return (
      <VideoEditor
        videoUrl="/summer-beach-vibes.jpg"
        onBack={() => setCurrentScreen(null)}
        onSave={() => setCurrentScreen(null)}
      />
    )
  }
  if (currentScreen === "duet") {
    return (
      <DuetScreen
        originalVideo={{
          id: "1",
          username: "aurora_skye",
          videoUrl: "/majestic-mountain-vista.png",
          soundName: "Original Sound",
        }}
        onBack={() => setCurrentScreen(null)}
        onPost={() => setCurrentScreen(null)}
      />
    )
  }
  if (currentScreen === "twoFactor") {
    return (
      <TwoFactorAuth
        onBack={() => setCurrentScreen(null)}
        onEnable={(method) => {
          setCurrentScreen(null)
        }}
        isEnabled={false}
      />
    )
  }
  if (currentScreen === "editProfile") {
    return <EditProfileScreen onBack={() => setCurrentScreen(null)} />
  }
  if (currentScreen === "privacy") {
    return <PrivacySettingsScreen onBack={() => setCurrentScreen(null)} />
  }
  if (currentScreen === "messageRequests") {
    return (
      <MessageRequestsScreen
        onBack={() => setCurrentScreen(null)}
        onAccept={(id) => console.log("Accepted:", id)}
        onReject={(id) => console.log("Rejected:", id)}
        onNavigateToProfile={navigateToUserProfile}
      />
    )
  }

  if (currentScreen === "subscriptions") {
    return <SubscriptionsScreen onBack={() => setCurrentScreen(null)} />
  }

  if (currentScreen === "goLiveSetup") {
    return (
      <GoLiveSetup
        onBack={() => setCurrentScreen(null)}
        onStartLive={(settings) => {
          console.log("Starting live with settings:", settings)
          setCurrentScreen("live")
        }}
      />
    )
  }

  if (currentScreen === "sounds") {
    return (
      <SoundsLibrary
        onBack={() => setCurrentScreen(null)}
        onSelectSound={(sound) => {
          console.log("Selected sound:", sound)
          setCurrentScreen(null)
        }}
      />
    )
  }

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="relative">
            <div className="absolute top-0 left-0 right-0 z-10 pt-12 safe-top bg-gradient-to-b from-black/80 to-transparent">
              <StoriesBar
                onOpenStory={(story) => setActiveStory(story)}
                onCreateStory={() => setShowStoryCreator(true)}
              />
            </div>
            <VideoFeed onNavigateToProfile={navigateToUserProfile} />
          </div>
        )
      case "discover":
        return <DiscoverScreen onNavigate={setCurrentScreen} onNavigateToProfile={navigateToUserProfile} />
      case "create":
        return <CreateScreen onNavigate={setCurrentScreen} />
      case "activity":
        return <ActivityScreen onNavigateToProfile={navigateToUserProfile} />
      case "profile":
        return <ProfileScreen onNavigate={setCurrentScreen} />
      case "messages":
        return (
          <EnhancedMessagesScreen
            onOpenChat={(chat) => setActiveChat(chat)}
            onOpenGroupCreate={() => setShowCreateGroup(true)}
            onNavigateToProfile={navigateToUserProfile}
          />
        )
      default:
        return <VideoFeed onNavigateToProfile={navigateToUserProfile} />
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={cn(
          "transition-transform duration-200 ease-out",
          isAnimating && swipeDirection === "left" && "-translate-x-4 opacity-80",
          isAnimating && swipeDirection === "right" && "translate-x-4 opacity-80",
        )}
      >
        {renderScreen()}
      </div>
      {activeTab !== "create" && <BottomNav />}
    </div>
  )
}
