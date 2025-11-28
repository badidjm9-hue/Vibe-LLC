"use client"

import { useState } from "react"
import {
  ChevronLeft,
  DollarSign,
  Gift,
  Crown,
  TrendingUp,
  CreditCard,
  Wallet,
  Clock,
  CheckCircle2,
  ChevronRight,
  Star,
  Users,
  Zap,
} from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { cn } from "@/lib/utils"

interface MonetizationDashboardProps {
  onBack: () => void
}

const earningsSources = [
  { id: "gifts", label: "Virtual Gifts", amount: 856.32, icon: Gift, color: "text-pink-400", change: "+15.2%" },
  { id: "tips", label: "Tips & Donations", amount: 234.5, icon: DollarSign, color: "text-green-400", change: "+8.7%" },
  { id: "subs", label: "Subscriptions", amount: 450.0, icon: Crown, color: "text-yellow-400", change: "+22.1%" },
  { id: "creator-fund", label: "Creator Fund", amount: 128.45, icon: Star, color: "text-purple-400", change: "+5.3%" },
  { id: "brand-deals", label: "Brand Deals", amount: 1500.0, icon: Zap, color: "text-blue-400", change: "New" },
]

const recentTransactions = [
  { id: "1", type: "gift", user: "alex_design", amount: 50, emoji: "💎", timestamp: Date.now() - 3600000 },
  { id: "2", type: "sub", user: "sarah_fan", amount: 4.99, timestamp: Date.now() - 7200000 },
  { id: "3", type: "tip", user: "mike_travels", amount: 10, timestamp: Date.now() - 14400000 },
  { id: "4", type: "gift", user: "creative_jen", amount: 100, emoji: "👑", timestamp: Date.now() - 28800000 },
  { id: "5", type: "sub", user: "new_follower", amount: 4.99, timestamp: Date.now() - 43200000 },
]

const subscriptionTiers = [
  { id: "basic", name: "Supporter", price: 2.99, subscribers: 234, perks: ["Early access", "Badges"] },
  {
    id: "premium",
    name: "Super Fan",
    price: 4.99,
    subscribers: 156,
    perks: ["All Basic perks", "Exclusive content", "Chat priority"],
  },
  {
    id: "vip",
    name: "VIP",
    price: 9.99,
    subscribers: 45,
    perks: ["All Premium perks", "1-on-1 messages", "Custom content"],
  },
]

export function MonetizationDashboard({ onBack }: MonetizationDashboardProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "gifts" | "subs" | "withdraw">("overview")
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)

  const totalEarnings = earningsSources.reduce((sum, source) => sum + source.amount, 0)
  const availableBalance = 2845.67
  const pendingBalance = 323.6

  const formatTime = (timestamp: number) => {
    const hours = Math.floor((Date.now() - timestamp) / 3600000)
    if (hours < 1) return "Just now"
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 glass-dark safe-top">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="font-bold text-white">Monetization</h1>
        <div className="w-10" />
      </div>

      {/* Balance Card */}
      <div className="px-4 py-4">
        <GlassCard className="p-6 bg-gradient-to-br from-pink-500/20 to-purple-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Wallet className="w-6 h-6 text-white" />
              <span className="text-white/70">Total Balance</span>
            </div>
            <button
              onClick={() => setShowWithdrawModal(true)}
              className="px-4 py-2 gradient-button rounded-full text-sm font-semibold text-white"
            >
              Withdraw
            </button>
          </div>
          <p className="text-4xl font-bold text-white mb-2">${availableBalance.toFixed(2)}</p>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-yellow-400" />
              <span className="text-white/70">Pending: ${pendingBalance.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-green-400">+18.5% this month</span>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Tabs */}
      <div className="px-4 mb-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {[
            { key: "overview", label: "Overview" },
            { key: "gifts", label: "Gifts" },
            { key: "subs", label: "Subscriptions" },
            { key: "withdraw", label: "Payouts" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={cn(
                "px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all",
                activeTab === tab.key ? "gradient-button text-white" : "glass text-white/70",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 space-y-4">
        {activeTab === "overview" && (
          <>
            {/* Earnings breakdown */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-white">Earnings Breakdown</h2>
              {earningsSources.map((source) => {
                const Icon = source.icon
                return (
                  <GlassCard key={source.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn("w-10 h-10 rounded-full glass flex items-center justify-center", source.color)}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{source.label}</p>
                          <p className="text-sm text-green-400">{source.change}</p>
                        </div>
                      </div>
                      <p className="text-lg font-bold text-white">${source.amount.toFixed(2)}</p>
                    </div>
                  </GlassCard>
                )
              })}
            </div>

            {/* Recent transactions */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
              {recentTransactions.map((tx) => (
                <GlassCard key={tx.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {tx.emoji && <span className="text-2xl">{tx.emoji}</span>}
                      {!tx.emoji && tx.type === "sub" && <Crown className="w-6 h-6 text-yellow-400" />}
                      {!tx.emoji && tx.type === "tip" && <DollarSign className="w-6 h-6 text-green-400" />}
                      <div>
                        <p className="font-medium text-white">@{tx.user}</p>
                        <p className="text-xs text-white/60">{formatTime(tx.timestamp)}</p>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-green-400">+${tx.amount.toFixed(2)}</p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </>
        )}

        {activeTab === "subs" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white">Subscription Tiers</h2>
            {subscriptionTiers.map((tier) => (
              <GlassCard key={tier.id} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Crown
                      className={cn(
                        "w-5 h-5",
                        tier.id === "vip"
                          ? "text-yellow-400"
                          : tier.id === "premium"
                            ? "text-purple-400"
                            : "text-pink-400",
                      )}
                    />
                    <span className="font-semibold text-white">{tier.name}</span>
                  </div>
                  <span className="text-lg font-bold text-white">${tier.price}/mo</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-4 h-4 text-white/60" />
                  <span className="text-sm text-white/60">{tier.subscribers} subscribers</span>
                  <span className="text-sm text-green-400">= ${(tier.subscribers * tier.price).toFixed(2)}/mo</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tier.perks.map((perk) => (
                    <span key={perk} className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/70">
                      {perk}
                    </span>
                  ))}
                </div>
              </GlassCard>
            ))}
            <button className="w-full py-3 glass rounded-2xl text-white font-semibold">+ Create New Tier</button>
          </div>
        )}

        {activeTab === "gifts" && (
          <div className="space-y-4">
            <GlassCard className="p-4">
              <h3 className="font-semibold text-white mb-3">Gift Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold text-white">1,234</p>
                  <p className="text-sm text-white/60">Total gifts received</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">$856.32</p>
                  <p className="text-sm text-white/60">Gift earnings</p>
                </div>
              </div>
            </GlassCard>

            <h3 className="font-semibold text-white">Top Gifters</h3>
            {[
              { user: "diamond_fan", amount: 250, avatar: "/man-designer-portrait.jpg" },
              { user: "super_supporter", amount: 180, avatar: "/woman-creator-portrait.png" },
              { user: "loyal_viewer", amount: 120, avatar: "/traveler-man-portrait.jpg" },
            ].map((gifter, i) => (
              <GlassCard key={gifter.user} className="p-4">
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                      i === 0
                        ? "bg-yellow-400 text-black"
                        : i === 1
                          ? "bg-gray-300 text-black"
                          : "bg-orange-400 text-black",
                    )}
                  >
                    {i + 1}
                  </span>
                  <img
                    src={gifter.avatar || "/placeholder.svg"}
                    alt={gifter.user}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-white">@{gifter.user}</p>
                  </div>
                  <p className="font-bold text-pink-400">${gifter.amount}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        )}

        {activeTab === "withdraw" && (
          <div className="space-y-4">
            <GlassCard className="p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white/70">Available for withdrawal</span>
                <span className="text-2xl font-bold text-white">${availableBalance.toFixed(2)}</span>
              </div>
              <button
                onClick={() => setShowWithdrawModal(true)}
                className="w-full py-3 gradient-button rounded-2xl text-white font-semibold"
              >
                Withdraw Funds
              </button>
            </GlassCard>

            <h3 className="font-semibold text-white">Payout History</h3>
            {[
              { date: "Nov 15, 2024", amount: 500, status: "completed" },
              { date: "Oct 15, 2024", amount: 450, status: "completed" },
              { date: "Sep 15, 2024", amount: 380, status: "completed" },
            ].map((payout) => (
              <GlassCard key={payout.date} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">${payout.amount.toFixed(2)}</p>
                    <p className="text-sm text-white/60">{payout.date}</p>
                  </div>
                  <div className="flex items-center gap-1 text-green-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-sm capitalize">{payout.status}</span>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <GlassCard className="w-full max-w-sm p-6">
            <h2 className="text-xl font-bold text-white mb-4">Withdraw Funds</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-white/70 mb-2 block">Amount</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  defaultValue={availableBalance}
                  className="w-full px-4 py-3 bg-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="text-sm text-white/70 mb-2 block">Payment Method</label>
                <button className="w-full p-4 glass rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-white" />
                    <span className="text-white">Bank Account ****4523</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/60" />
                </button>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setShowWithdrawModal(false)} className="flex-1 py-3 glass rounded-xl text-white">
                  Cancel
                </button>
                <button className="flex-1 py-3 gradient-button rounded-xl text-white font-semibold">Withdraw</button>
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  )
}
