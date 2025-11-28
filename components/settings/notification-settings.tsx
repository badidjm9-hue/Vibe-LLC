"use client"

import { ChevronLeft, Heart, MessageCircle, UserPlus, AtSign, Mail, MessageSquare } from "lucide-react"
import { ToggleSwitch } from "@/components/ui/toggle-switch"
import { useApp } from "@/contexts/app-context"
import { GlassCard } from "@/components/ui/glass-card"

const activitySettings = [
  {
    key: "likes",
    label: "Likes",
    description: "When someone likes your video",
    icon: Heart,
  },
  {
    key: "comments",
    label: "Comments",
    description: "When someone comments on your video",
    icon: MessageCircle,
  },
  {
    key: "followers",
    label: "New Followers",
    description: "When someone starts following you",
    icon: UserPlus,
  },
  {
    key: "mentions",
    label: "Mentions",
    description: "When someone mentions you in a video",
    icon: AtSign,
  },
]

const messageSettings = [
  {
    key: "messageRequests",
    label: "Message Requests",
    description: "From people you don't follow",
    icon: Mail,
  },
  {
    key: "messages",
    label: "Messages from Everyone",
    description: "When anyone sends you a message",
    icon: MessageSquare,
  },
]

export function NotificationSettings({ onBack }: { onBack: () => void }) {
  const { notificationSettings, updateNotificationSettings } = useApp()

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 glass-dark safe-top">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="font-bold text-white">Notifications</h1>
        <div className="w-10" />
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Activity section */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4">Activity</h2>
          <div className="space-y-3">
            {activitySettings.map((setting) => {
              const Icon = setting.icon
              return (
                <GlassCard key={setting.key} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white">{setting.label}</p>
                    <p className="text-sm text-white/60">{setting.description}</p>
                  </div>
                  <ToggleSwitch
                    checked={notificationSettings[setting.key as keyof typeof notificationSettings]}
                    onChange={(checked) => updateNotificationSettings(setting.key, checked)}
                  />
                </GlassCard>
              )
            })}
          </div>
        </div>

        {/* Direct Messages section */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4">Direct Messages</h2>
          <div className="space-y-3">
            {messageSettings.map((setting) => {
              const Icon = setting.icon
              return (
                <GlassCard key={setting.key} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white">{setting.label}</p>
                    <p className="text-sm text-white/60">{setting.description}</p>
                  </div>
                  <ToggleSwitch
                    checked={notificationSettings[setting.key as keyof typeof notificationSettings]}
                    onChange={(checked) => updateNotificationSettings(setting.key, checked)}
                  />
                </GlassCard>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
