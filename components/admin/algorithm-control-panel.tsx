"use client"

import { useState, useEffect } from "react"
import {
  ChevronLeft,
  Brain,
  Sliders,
  BarChart3,
  Users,
  TrendingUp,
  Shield,
  RefreshCw,
  Info,
  CheckCircle,
} from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import {
  getRecommendationEngine,
  setAlgorithmMode,
  MODE_CONFIGS,
  type AlgorithmMode,
} from "@/lib/recommendation/recommendation-engine"
import { cn } from "@/lib/utils"

interface AlgorithmControlPanelProps {
  onBack: () => void
}

const ALGORITHM_MODES: { key: AlgorithmMode; name: string; description: string; icon: typeof Brain }[] = [
  {
    key: "conservative",
    name: "Conservative",
    description: "Prioritizes popular and fresh content. Safe for new users and broad appeal.",
    icon: Shield,
  },
  {
    key: "personalization",
    name: "Personalization-First",
    description: "Heavy user preference modeling. Best for engaged users with clear interests.",
    icon: Users,
  },
  {
    key: "hybrid",
    name: "Hybrid (Recommended)",
    description: "Balances all signals with exploration. Best overall performance.",
    icon: Brain,
  },
]

export function AlgorithmControlPanel({ onBack }: AlgorithmControlPanelProps) {
  const [currentMode, setCurrentMode] = useState<AlgorithmMode>("hybrid")
  const [analytics, setAnalytics] = useState<{
    mode: AlgorithmMode
    config: typeof MODE_CONFIGS.hybrid
    totalInteractionsLogged: number
    uniqueUsers: number
  } | null>(null)
  const [isApplying, setIsApplying] = useState(false)

  useEffect(() => {
    const engine = getRecommendationEngine()
    setCurrentMode(engine.getMode())
    setAnalytics(engine.getAnalytics())
  }, [])

  const handleModeChange = async (mode: AlgorithmMode) => {
    setIsApplying(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setAlgorithmMode(mode)
    setCurrentMode(mode)
    setAnalytics(getRecommendationEngine().getAnalytics())
    setIsApplying(false)
  }

  const config = analytics?.config || MODE_CONFIGS[currentMode]

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 glass-dark safe-top">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="font-bold text-white">Algorithm Control</h1>
        <div className="w-10 h-10 rounded-full gradient-button flex items-center justify-center">
          <Brain className="w-5 h-5 text-white" />
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Current Mode Status */}
        <GlassCard className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-white/60">Current Mode</p>
              <p className="text-lg font-bold text-white capitalize">{currentMode}</p>
            </div>
            {isApplying && <RefreshCw className="w-5 h-5 text-pink-400 animate-spin ml-auto" />}
          </div>

          {/* Analytics summary */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-white">{analytics?.totalInteractionsLogged.toLocaleString() || 0}</p>
              <p className="text-xs text-white/60">Interactions Logged</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-white">{analytics?.uniqueUsers.toLocaleString() || 0}</p>
              <p className="text-xs text-white/60">Unique Users</p>
            </div>
          </div>
        </GlassCard>

        {/* Mode Selection */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Select Algorithm Mode</h2>
          <div className="space-y-3">
            {ALGORITHM_MODES.map((mode) => {
              const Icon = mode.icon
              const isSelected = currentMode === mode.key

              return (
                <button
                  key={mode.key}
                  onClick={() => handleModeChange(mode.key)}
                  disabled={isApplying}
                  className={cn(
                    "w-full glass rounded-2xl p-4 text-left transition-all",
                    isSelected && "ring-2 ring-pink-500",
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                        isSelected ? "bg-gradient-to-br from-pink-500 to-purple-500" : "bg-white/10",
                      )}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-white">{mode.name}</p>
                        {isSelected && <CheckCircle className="w-4 h-4 text-pink-400" />}
                      </div>
                      <p className="text-sm text-white/60 mt-1">{mode.description}</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Current Configuration */}
        <GlassCard className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Sliders className="w-5 h-5 text-pink-400" />
            <h2 className="font-semibold text-white">Configuration Weights</h2>
          </div>

          <div className="space-y-4">
            {[
              { label: "Exploration Rate", value: config.explorationRate, color: "bg-blue-500" },
              { label: "Freshness Weight", value: config.freshnessWeight, color: "bg-green-500" },
              { label: "Popularity Weight", value: config.popularityWeight, color: "bg-yellow-500" },
              { label: "Personalization Weight", value: config.personalizationWeight, color: "bg-pink-500" },
              { label: "Diversity Weight", value: config.diversityWeight, color: "bg-purple-500" },
              { label: "Cold Start Boost", value: config.coldStartBoost, color: "bg-cyan-500" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/70">{item.label}</span>
                  <span className="text-white font-medium">{Math.round(item.value * 100)}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={cn("h-full rounded-full transition-all", item.color)}
                    style={{ width: `${item.value * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* A/B Testing Info */}
        <GlassCard className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-green-400" />
            <h2 className="font-semibold text-white">A/B Testing</h2>
          </div>

          <div className="bg-white/5 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-4 h-4 text-blue-400" />
              <p className="text-sm text-white/80">No active tests</p>
            </div>
            <p className="text-xs text-white/60">
              A/B tests allow you to compare algorithm performance across user segments.
            </p>
          </div>

          <button className="w-full py-3 gradient-button rounded-xl text-white font-medium">Create A/B Test</button>
        </GlassCard>

        {/* Performance Metrics */}
        <GlassCard className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-pink-400" />
            <h2 className="font-semibold text-white">Key Metrics (Simulated)</h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "CTR", value: "4.2%", change: "+0.3%" },
              { label: "Watch-Through Rate", value: "68%", change: "+5%" },
              { label: "Session Length", value: "12m", change: "+1.2m" },
              { label: "DAU/MAU", value: "45%", change: "+2%" },
            ].map((metric) => (
              <div key={metric.label} className="bg-white/5 rounded-xl p-3">
                <p className="text-lg font-bold text-white">{metric.value}</p>
                <p className="text-xs text-white/60">{metric.label}</p>
                <p className="text-xs text-green-400">{metric.change}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Safety & Moderation */}
        <GlassCard className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-yellow-400" />
            <h2 className="font-semibold text-white">Safety Filters</h2>
          </div>

          <div className="space-y-3">
            {[
              { label: "Toxicity Filter", enabled: true },
              { label: "NSFW Detection", enabled: true },
              { label: "Spam Prevention", enabled: true },
              { label: "Misinformation Check", enabled: false },
            ].map((filter) => (
              <div key={filter.label} className="flex items-center justify-between">
                <span className="text-white/80">{filter.label}</span>
                <div
                  className={cn(
                    "w-12 h-6 rounded-full transition-colors",
                    filter.enabled ? "bg-green-500" : "bg-white/20",
                  )}
                >
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full bg-white mt-0.5 transition-transform",
                      filter.enabled ? "translate-x-6" : "translate-x-0.5",
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
