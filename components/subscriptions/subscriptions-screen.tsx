"use client"

import { useState } from "react"
import { ArrowLeft, Crown, Star, Zap, Check, Gift, Users, Video, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

interface SubscriptionsScreenProps {
  onBack: () => void
}

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: "$4.99",
    period: "month",
    features: ["Ad-free experience", "HD video quality", "Basic badges"],
    popular: false,
    color: "from-gray-500 to-gray-600",
  },
  {
    id: "pro",
    name: "Pro",
    price: "$9.99",
    period: "month",
    features: ["Everything in Basic", "Priority support", "Exclusive filters", "Pro badge", "Early access to features"],
    popular: true,
    color: "from-pink-500 to-purple-500",
  },
  {
    id: "creator",
    name: "Creator",
    price: "$19.99",
    period: "month",
    features: [
      "Everything in Pro",
      "Analytics dashboard",
      "Monetization tools",
      "Creator badge",
      "Priority in algorithm",
      "Custom profile themes",
    ],
    popular: false,
    color: "from-yellow-500 to-orange-500",
  },
]

const subscribedCreators = [
  {
    id: "1",
    name: "Aurora Skye",
    username: "aurora_skye",
    avatar: "/blonde-woman-avatar-illustration.jpg",
    tier: "VIP",
    nextBilling: "Dec 15, 2024",
    price: "$5.99",
  },
  {
    id: "2",
    name: "Alex Designer",
    username: "alex_design",
    avatar: "/man.jpg",
    tier: "Supporter",
    nextBilling: "Dec 20, 2024",
    price: "$2.99",
  },
]

export function SubscriptionsScreen({ onBack }: SubscriptionsScreenProps) {
  const [activeTab, setActiveTab] = useState<"plans" | "creators">("plans")
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 safe-top">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-bold text-white">Subscriptions</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("plans")}
            className={cn(
              "flex-1 py-3 rounded-xl font-semibold transition-all",
              activeTab === "plans" ? "gradient-button text-white" : "glass text-white/60",
            )}
          >
            <div className="flex items-center justify-center gap-2">
              <Crown className="w-4 h-4" />
              Premium Plans
            </div>
          </button>
          <button
            onClick={() => setActiveTab("creators")}
            className={cn(
              "flex-1 py-3 rounded-xl font-semibold transition-all",
              activeTab === "creators" ? "gradient-button text-white" : "glass text-white/60",
            )}
          >
            <div className="flex items-center justify-center gap-2">
              <Users className="w-4 h-4" />
              Creators
            </div>
          </button>
        </div>
      </div>

      {activeTab === "plans" ? (
        <div className="px-4 space-y-4">
          {/* Current status */}
          <div className="glass rounded-2xl p-4 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
              <Star className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold">Free Plan</p>
              <p className="text-sm text-white/60">Upgrade to unlock premium features</p>
            </div>
          </div>

          {/* Plans */}
          {plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={cn(
                "w-full glass rounded-2xl p-5 text-left relative overflow-hidden transition-all",
                selectedPlan === plan.id && "ring-2 ring-pink-500",
              )}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-bl-xl">
                  <span className="text-xs text-white font-bold">POPULAR</span>
                </div>
              )}

              <div className="flex items-center gap-3 mb-3">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center",
                    plan.color,
                  )}
                >
                  {plan.id === "basic" && <Star className="w-5 h-5 text-white" />}
                  {plan.id === "pro" && <Zap className="w-5 h-5 text-white" />}
                  {plan.id === "creator" && <Crown className="w-5 h-5 text-white" />}
                </div>
                <div>
                  <p className="text-lg font-bold text-white">{plan.name}</p>
                  <p className="text-white/60">
                    <span className="text-xl font-bold text-white">{plan.price}</span>/{plan.period}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="text-sm text-white/80">{feature}</span>
                  </div>
                ))}
              </div>
            </button>
          ))}

          {/* Subscribe button */}
          {selectedPlan && (
            <button className="w-full py-4 gradient-button rounded-2xl mt-4">
              <span className="text-white font-bold text-lg">
                Subscribe to {plans.find((p) => p.id === selectedPlan)?.name}
              </span>
            </button>
          )}

          {/* Benefits */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-white mb-3">Premium Benefits</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Video, title: "HD Videos", desc: "Watch in high quality" },
                { icon: Shield, title: "No Ads", desc: "Ad-free experience" },
                { icon: Gift, title: "Exclusive", desc: "Premium content" },
                { icon: Zap, title: "Priority", desc: "Algorithm boost" },
              ].map((benefit, i) => (
                <div key={i} className="glass rounded-xl p-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center">
                    <benefit.icon className="w-5 h-5 text-pink-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{benefit.title}</p>
                    <p className="text-xs text-white/50">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="px-4 space-y-4">
          {/* Subscribed creators */}
          <h2 className="text-lg font-semibold text-white">Your Subscriptions</h2>

          {subscribedCreators.length > 0 ? (
            <div className="space-y-3">
              {subscribedCreators.map((creator) => (
                <div key={creator.id} className="glass rounded-2xl p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={creator.avatar || "/placeholder.svg"}
                      alt={creator.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-white">{creator.name}</p>
                        <span className="px-2 py-0.5 bg-pink-500/20 text-pink-400 text-xs rounded-full">
                          {creator.tier}
                        </span>
                      </div>
                      <p className="text-sm text-white/50">@{creator.username}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">{creator.price}/mo</p>
                      <p className="text-xs text-white/50">Renews {creator.nextBilling}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 py-2 bg-white/10 rounded-xl text-white/70 text-sm font-medium">
                      Manage
                    </button>
                    <button className="flex-1 py-2 bg-red-500/20 rounded-xl text-red-400 text-sm font-medium">
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 glass rounded-2xl">
              <Users className="w-12 h-12 text-white/30 mx-auto mb-3" />
              <p className="text-white/60">No creator subscriptions yet</p>
              <p className="text-sm text-white/40 mt-1">Subscribe to your favorite creators for exclusive content</p>
            </div>
          )}

          {/* Discover creators */}
          <h2 className="text-lg font-semibold text-white mt-6">Discover Creators</h2>
          <div className="space-y-3">
            {[
              {
                name: "Travel Pro",
                username: "travel_pro",
                avatar: "/lone-traveler-mountain-path.png",
                tiers: ["$2.99", "$9.99"],
              },
              {
                name: "Chef Mike",
                username: "chef_mike",
                avatar: "/diverse-chef-preparing-food.png",
                tiers: ["$4.99", "$14.99"],
              },
            ].map((creator, i) => (
              <div key={i} className="glass rounded-2xl p-4 flex items-center gap-3">
                <img
                  src={creator.avatar || "/placeholder.svg"}
                  alt={creator.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold text-white">{creator.name}</p>
                  <p className="text-sm text-white/50">@{creator.username}</p>
                </div>
                <button className="px-4 py-2 gradient-button rounded-full text-sm text-white font-medium">
                  Subscribe
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
