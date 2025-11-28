"use client"

import { useState } from "react"
import {
  ChevronLeft,
  Users,
  FileVideo,
  Flag,
  TrendingUp,
  Shield,
  Ban,
  CheckCircle,
  Search,
  Filter,
  Eye,
  Trash2,
  AlertTriangle,
  DollarSign,
  Activity,
  Globe,
  Zap,
} from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { cn } from "@/lib/utils"

const tabs = ["Overview", "Users", "Content", "Reports", "Analytics", "Moderation", "Algorithm"]

const mockStats = [
  { label: "Total Users", value: "2.4M", icon: Users, change: "+5.2%", color: "text-blue-400" },
  { label: "Total Videos", value: "12.8M", icon: FileVideo, change: "+12.3%", color: "text-green-400" },
  { label: "Pending Reports", value: "234", icon: Flag, change: "-8.1%", color: "text-yellow-400" },
  { label: "Daily Active", value: "890K", icon: Activity, change: "+3.7%", color: "text-pink-400" },
  { label: "Revenue Today", value: "$45.2K", icon: DollarSign, change: "+15.2%", color: "text-emerald-400" },
  { label: "Live Streams", value: "1,234", icon: Zap, change: "+22.1%", color: "text-purple-400" },
]

const mockReports = [
  {
    id: "1",
    type: "hate_speech",
    status: "pending",
    reportedBy: "user123",
    content: "Video ID: vid_abc123",
    timestamp: "2h ago",
    severity: "high",
  },
  {
    id: "2",
    type: "spam",
    status: "pending",
    reportedBy: "user456",
    content: "User ID: usr_def456",
    timestamp: "3h ago",
    severity: "medium",
  },
  {
    id: "3",
    type: "inappropriate",
    status: "resolved",
    reportedBy: "user789",
    content: "Comment ID: cmt_ghi789",
    timestamp: "5h ago",
    severity: "low",
  },
  {
    id: "4",
    type: "violence",
    status: "pending",
    reportedBy: "user321",
    content: "Video ID: vid_xyz789",
    timestamp: "1h ago",
    severity: "high",
  },
]

const mockUsers = [
  {
    id: "1",
    username: "creator_pro",
    email: "creator@example.com",
    status: "active",
    followers: "1.2M",
    videos: 234,
    joinDate: "Jan 2024",
    isVerified: true,
    earnings: "$12,450",
  },
  {
    id: "2",
    username: "new_user_123",
    email: "newuser@example.com",
    status: "active",
    followers: "5.2K",
    videos: 12,
    joinDate: "Nov 2024",
    isVerified: false,
    earnings: "$245",
  },
  {
    id: "3",
    username: "banned_account",
    email: "banned@example.com",
    status: "banned",
    followers: "0",
    videos: 0,
    joinDate: "Oct 2024",
    isVerified: false,
    earnings: "$0",
  },
]

const mockTrending = [
  { tag: "#newchallenge", videos: 45200, growth: "+234%" },
  { tag: "#viraltrend", videos: 32100, growth: "+189%" },
  { tag: "#weekend", videos: 28900, growth: "+156%" },
  { tag: "#dance2024", videos: 21500, growth: "+134%" },
  { tag: "#fyp", videos: 890000, growth: "+12%" },
]

const mockModerationQueue = [
  {
    id: "1",
    type: "video",
    thumbnail: "/video-thumbnail.png",
    creator: "user_abc",
    aiScore: 0.85,
    flagReason: "Potential nudity detected",
    timestamp: "5m ago",
  },
  {
    id: "2",
    type: "comment",
    content: "This is a flagged comment...",
    creator: "user_xyz",
    aiScore: 0.72,
    flagReason: "Toxic language detected",
    timestamp: "12m ago",
  },
]

export function AdminPanel({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState("Overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 glass-dark safe-top">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="font-bold text-white">Admin Panel</h1>
        <div className="w-10 h-10 rounded-full gradient-button flex items-center justify-center">
          <Shield className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 px-4 py-4 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-2 rounded-xl whitespace-nowrap transition-all text-sm",
              activeTab === tab ? "gradient-button text-white" : "bg-white/10 text-white/70",
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="px-4 space-y-6">
        {activeTab === "Overview" && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              {mockStats.map((stat) => {
                const Icon = stat.icon
                return (
                  <GlassCard key={stat.label} className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className={cn("w-4 h-4", stat.color)} />
                      <span className="text-xs text-white/60">{stat.label}</span>
                    </div>
                    <p className="text-xl font-bold text-white">{stat.value}</p>
                    <span className={cn("text-xs", stat.change.startsWith("+") ? "text-green-400" : "text-red-400")}>
                      {stat.change}
                    </span>
                  </GlassCard>
                )
              })}
            </div>

            {/* Live Activity */}
            <GlassCard className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="font-semibold text-white">Live Activity</span>
                </div>
                <span className="text-xs text-white/60">Last 24h</span>
              </div>
              <div className="h-32 flex items-end gap-1">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-pink-500/50 to-purple-500/50 rounded-t"
                    style={{ height: `${30 + Math.random() * 70}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-white/40">
                <span>00:00</span>
                <span>12:00</span>
                <span>Now</span>
              </div>
            </GlassCard>

            {/* Trending */}
            <GlassCard className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-pink-400" />
                <span className="font-semibold text-white">Trending Detection</span>
              </div>
              <div className="space-y-3">
                {mockTrending.slice(0, 5).map((tag, i) => (
                  <div key={tag.tag} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-white/60 text-sm w-6">#{i + 1}</span>
                      <span className="text-white font-medium">{tag.tag}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-white/60">{tag.videos.toLocaleString()} videos</span>
                      <span className="text-xs text-green-400 ml-2">{tag.growth}</span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Geographic Distribution */}
            <GlassCard className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-5 h-5 text-blue-400" />
                <span className="font-semibold text-white">Top Regions</span>
              </div>
              <div className="space-y-3">
                {[
                  { country: "United States", users: "45%", flag: "🇺🇸" },
                  { country: "United Kingdom", users: "15%", flag: "🇬🇧" },
                  { country: "Canada", users: "12%", flag: "🇨🇦" },
                  { country: "Australia", users: "8%", flag: "🇦🇺" },
                  { country: "Germany", users: "6%", flag: "🇩🇪" },
                ].map((region) => (
                  <div key={region.country} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>{region.flag}</span>
                      <span className="text-white">{region.country}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                          style={{ width: region.users }}
                        />
                      </div>
                      <span className="text-xs text-white/60 w-10">{region.users}</span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </>
        )}

        {activeTab === "Users" && (
          <>
            {/* Search and Filter */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                />
              </div>
              <button className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <Filter className="w-5 h-5 text-white/60" />
              </button>
            </div>

            {/* User List */}
            <div className="space-y-3">
              {mockUsers.map((user) => (
                <GlassCard key={user.id} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-white">{user.username}</p>
                          {user.isVerified && <CheckCircle className="w-4 h-4 text-blue-400 fill-blue-400" />}
                        </div>
                        <p className="text-xs text-white/60">{user.email}</p>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium",
                        user.status === "active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400",
                      )}
                    >
                      {user.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-center mb-3">
                    <div className="bg-white/5 rounded-lg p-2">
                      <p className="text-sm font-semibold text-white">{user.followers}</p>
                      <p className="text-xs text-white/40">Followers</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2">
                      <p className="text-sm font-semibold text-white">{user.videos}</p>
                      <p className="text-xs text-white/40">Videos</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2">
                      <p className="text-sm font-semibold text-white">{user.earnings}</p>
                      <p className="text-xs text-white/40">Earnings</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2">
                      <p className="text-sm font-semibold text-white">{user.joinDate}</p>
                      <p className="text-xs text-white/40">Joined</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-white/10 rounded-xl text-sm text-white flex items-center justify-center gap-1">
                      <Eye className="w-4 h-4" /> View
                    </button>
                    {user.status === "active" ? (
                      <button className="flex-1 py-2 bg-red-500/20 rounded-xl text-sm text-red-400 flex items-center justify-center gap-1">
                        <Ban className="w-4 h-4" /> Ban
                      </button>
                    ) : (
                      <button className="flex-1 py-2 bg-green-500/20 rounded-xl text-sm text-green-400 flex items-center justify-center gap-1">
                        <CheckCircle className="w-4 h-4" /> Unban
                      </button>
                    )}
                    <button className="flex-1 py-2 bg-blue-500/20 rounded-xl text-sm text-blue-400 flex items-center justify-center gap-1">
                      <Shield className="w-4 h-4" /> Verify
                    </button>
                  </div>
                </GlassCard>
              ))}
            </div>
          </>
        )}

        {activeTab === "Reports" && (
          <>
            {/* Report Stats */}
            <div className="grid grid-cols-3 gap-3">
              <GlassCard className="p-3 text-center">
                <p className="text-2xl font-bold text-yellow-400">234</p>
                <p className="text-xs text-white/60">Pending</p>
              </GlassCard>
              <GlassCard className="p-3 text-center">
                <p className="text-2xl font-bold text-green-400">1,234</p>
                <p className="text-xs text-white/60">Resolved</p>
              </GlassCard>
              <GlassCard className="p-3 text-center">
                <p className="text-2xl font-bold text-red-400">45</p>
                <p className="text-xs text-white/60">High Priority</p>
              </GlassCard>
            </div>

            {/* Report List */}
            <div className="space-y-3">
              {mockReports.map((report) => (
                <GlassCard key={report.id} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full",
                          report.severity === "high"
                            ? "bg-red-500"
                            : report.severity === "medium"
                              ? "bg-yellow-500"
                              : "bg-green-500",
                        )}
                      />
                      <Flag
                        className={cn("w-5 h-5", report.status === "pending" ? "text-yellow-400" : "text-green-400")}
                      />
                      <span className="font-semibold text-white capitalize">{report.type.replace("_", " ")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "px-2 py-1 rounded-lg text-xs",
                          report.severity === "high"
                            ? "bg-red-500/20 text-red-400"
                            : report.severity === "medium"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-green-500/20 text-green-400",
                        )}
                      >
                        {report.severity}
                      </span>
                      <span
                        className={cn(
                          "px-2 py-1 rounded-lg text-xs",
                          report.status === "pending"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-green-500/20 text-green-400",
                        )}
                      >
                        {report.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-white/60 mb-1">{report.content}</p>
                  <p className="text-xs text-white/40">
                    Reported by {report.reportedBy} • {report.timestamp}
                  </p>
                  {report.status === "pending" && (
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 py-2 bg-white/10 rounded-xl text-sm text-white flex items-center justify-center gap-1">
                        <Eye className="w-4 h-4" /> Review
                      </button>
                      <button className="flex-1 py-2 bg-green-500/20 rounded-xl text-sm text-green-400 flex items-center justify-center gap-1">
                        <CheckCircle className="w-4 h-4" /> Dismiss
                      </button>
                      <button className="flex-1 py-2 bg-red-500/20 rounded-xl text-sm text-red-400 flex items-center justify-center gap-1">
                        <Trash2 className="w-4 h-4" /> Remove
                      </button>
                    </div>
                  )}
                </GlassCard>
              ))}
            </div>
          </>
        )}

        {activeTab === "Moderation" && (
          <>
            {/* AI Moderation Queue */}
            <GlassCard className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                <span className="font-semibold text-white">AI Moderation Queue</span>
                <span className="ml-auto px-2 py-1 bg-yellow-500/20 rounded-lg text-xs text-yellow-400">
                  {mockModerationQueue.length} items
                </span>
              </div>

              <div className="space-y-3">
                {mockModerationQueue.map((item) => (
                  <div key={item.id} className="bg-white/5 rounded-xl p-3">
                    <div className="flex items-start gap-3">
                      {item.type === "video" ? (
                        <div className="w-16 h-16 bg-white/10 rounded-lg overflow-hidden">
                          <img
                            src={item.thumbnail || "/placeholder.svg"}
                            alt="Thumbnail"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                          <FileVideo className="w-8 h-8 text-white/40" />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-white">{item.creator}</span>
                          <span className="text-xs text-white/40">{item.timestamp}</span>
                        </div>
                        <p className="text-xs text-white/60 mb-2">{item.flagReason}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className={cn(
                                "h-full rounded-full",
                                item.aiScore > 0.8
                                  ? "bg-red-500"
                                  : item.aiScore > 0.6
                                    ? "bg-yellow-500"
                                    : "bg-green-500",
                              )}
                              style={{ width: `${item.aiScore * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-white/60">{Math.round(item.aiScore * 100)}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 py-2 bg-green-500/20 rounded-xl text-xs text-green-400">Approve</button>
                      <button className="flex-1 py-2 bg-red-500/20 rounded-xl text-xs text-red-400">Remove</button>
                      <button className="flex-1 py-2 bg-white/10 rounded-xl text-xs text-white">Review</button>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Moderation Settings */}
            <GlassCard className="p-4">
              <h3 className="font-semibold text-white mb-4">AI Moderation Settings</h3>
              <div className="space-y-3">
                {[
                  { label: "Auto-remove high toxicity", value: true },
                  { label: "Flag nudity detection", value: true },
                  { label: "Hate speech filter", value: true },
                  { label: "Spam detection", value: true },
                  { label: "Violence detection", value: false },
                ].map((setting) => (
                  <div key={setting.label} className="flex items-center justify-between">
                    <span className="text-sm text-white/80">{setting.label}</span>
                    <div
                      className={cn(
                        "w-12 h-6 rounded-full p-1 transition-colors cursor-pointer",
                        setting.value ? "bg-pink-500" : "bg-white/20",
                      )}
                    >
                      <div
                        className={cn(
                          "w-4 h-4 rounded-full bg-white transition-transform",
                          setting.value ? "translate-x-6" : "translate-x-0",
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </>
        )}

        {activeTab === "Analytics" && (
          <>
            {/* Platform Overview */}
            <GlassCard className="p-4">
              <h3 className="font-semibold text-white mb-4">Platform Performance</h3>
              <div className="space-y-4">
                {[
                  { label: "Server Response Time", value: "45ms", status: "good" },
                  { label: "API Uptime", value: "99.99%", status: "good" },
                  { label: "Video Processing Queue", value: "234", status: "warning" },
                  { label: "Active Connections", value: "89,234", status: "good" },
                  { label: "Storage Used", value: "4.2TB / 10TB", status: "good" },
                ].map((metric) => (
                  <div key={metric.label} className="flex items-center justify-between">
                    <span className="text-sm text-white/60">{metric.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">{metric.value}</span>
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full",
                          metric.status === "good" ? "bg-green-500" : "bg-yellow-500",
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Revenue Analytics */}
            <GlassCard className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">Revenue Breakdown</h3>
                <span className="text-xs text-white/60">This Month</span>
              </div>
              <div className="space-y-3">
                {[
                  { source: "In-App Purchases", amount: "$234,500", percentage: 45 },
                  { source: "Subscriptions", amount: "$156,200", percentage: 30 },
                  { source: "Ads Revenue", amount: "$78,100", percentage: 15 },
                  { source: "Creator Tips", amount: "$52,000", percentage: 10 },
                ].map((item) => (
                  <div key={item.source}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-white/80">{item.source}</span>
                      <span className="text-sm font-medium text-white">{item.amount}</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </>
        )}

        {activeTab === "Algorithm" && (
          <>
            {/* Algorithm Settings */}
            <GlassCard className="p-4">
              <h3 className="font-semibold text-white mb-4">Algorithm Settings</h3>
              <div className="space-y-3">
                {[
                  { label: "Enable Content Filtering", value: true },
                  { label: "Enable User Verification", value: true },
                  { label: "Enable Trend Analysis", value: true },
                ].map((setting) => (
                  <div key={setting.label} className="flex items-center justify-between">
                    <span className="text-sm text-white/80">{setting.label}</span>
                    <div
                      className={cn(
                        "w-12 h-6 rounded-full p-1 transition-colors cursor-pointer",
                        setting.value ? "bg-pink-500" : "bg-white/20",
                      )}
                    >
                      <div
                        className={cn(
                          "w-4 h-4 rounded-full bg-white transition-transform",
                          setting.value ? "translate-x-6" : "translate-x-0",
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </>
        )}
      </div>
    </div>
  )
}
