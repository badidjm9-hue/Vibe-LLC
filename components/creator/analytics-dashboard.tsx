"use client"

import {
  ChevronLeft,
  TrendingUp,
  TrendingDown,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Users,
  Clock,
  DollarSign,
} from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { cn } from "@/lib/utils"

const stats = [
  { label: "Total Views", value: "2.4M", change: "+12.5%", trend: "up", icon: Eye },
  { label: "Total Likes", value: "589K", change: "+8.2%", trend: "up", icon: Heart },
  { label: "Comments", value: "45.2K", change: "-2.1%", trend: "down", icon: MessageCircle },
  { label: "Shares", value: "12.8K", change: "+15.3%", trend: "up", icon: Share2 },
]

const demographics = [
  { label: "18-24", percentage: 35 },
  { label: "25-34", percentage: 42 },
  { label: "35-44", percentage: 15 },
  { label: "45+", percentage: 8 },
]

const bestTimes = [
  { day: "Mon", hour: "8 PM", engagement: 85 },
  { day: "Tue", hour: "7 PM", engagement: 72 },
  { day: "Wed", hour: "9 PM", engagement: 90 },
  { day: "Thu", hour: "8 PM", engagement: 78 },
  { day: "Fri", hour: "10 PM", engagement: 95 },
  { day: "Sat", hour: "3 PM", engagement: 88 },
  { day: "Sun", hour: "2 PM", engagement: 82 },
]

export function AnalyticsDashboard({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 glass-dark safe-top">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="font-bold text-white">Analytics</h1>
        <div className="w-10" />
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => {
            const Icon = stat.icon
            const isUp = stat.trend === "up"
            return (
              <GlassCard key={stat.label} className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4 text-white/60" />
                  <span className="text-xs text-white/60">{stat.label}</span>
                </div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <div className="flex items-center gap-1 mt-1">
                  {isUp ? (
                    <TrendingUp className="w-3 h-3 text-green-400" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-red-400" />
                  )}
                  <span className={cn("text-xs", isUp ? "text-green-400" : "text-red-400")}>{stat.change}</span>
                </div>
              </GlassCard>
            )
          })}
        </div>

        {/* Earnings */}
        <GlassCard className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-5 h-5 text-yellow-400" />
            <span className="font-semibold text-white">Earnings Overview</span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-white">$1,234.56</p>
              <p className="text-sm text-white/60">This month</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-green-400">+$234.50</p>
              <p className="text-xs text-white/60">vs last month</p>
            </div>
          </div>
        </GlassCard>

        {/* Audience demographics */}
        <GlassCard className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-pink-400" />
            <span className="font-semibold text-white">Audience Age</span>
          </div>
          <div className="space-y-3">
            {demographics.map((demo) => (
              <div key={demo.label} className="flex items-center gap-3">
                <span className="text-sm text-white/60 w-12">{demo.label}</span>
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full gradient-button rounded-full" style={{ width: `${demo.percentage}%` }} />
                </div>
                <span className="text-sm text-white w-10 text-right">{demo.percentage}%</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Best time to post */}
        <GlassCard className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-purple-400" />
            <span className="font-semibold text-white">Best Time to Post</span>
          </div>
          <div className="flex justify-between">
            {bestTimes.map((time) => (
              <div key={time.day} className="flex flex-col items-center gap-2">
                <div className="w-6 rounded-full gradient-button" style={{ height: `${time.engagement}px` }} />
                <span className="text-xs text-white/60">{time.day}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-white/60 mt-4">
            Best day: <span className="text-pink-400 font-semibold">Friday at 10 PM</span>
          </p>
        </GlassCard>
      </div>
    </div>
  )
}
