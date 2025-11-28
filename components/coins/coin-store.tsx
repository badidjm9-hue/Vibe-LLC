"use client"

import { useState } from "react"
import { ArrowLeft, Coins, Gift, Star, Zap, Crown, Sparkles, Check } from "lucide-react"
import { useApp } from "@/contexts/app-context"

interface CoinStoreProps {
  onBack: () => void
}

const coinPackages = [
  { id: "1", coins: 100, price: "$0.99", bonus: 0, popular: false },
  { id: "2", coins: 500, price: "$4.99", bonus: 50, popular: false },
  { id: "3", coins: 1000, price: "$9.99", bonus: 150, popular: true },
  { id: "4", coins: 2500, price: "$19.99", bonus: 500, popular: false },
  { id: "5", coins: 5000, price: "$39.99", bonus: 1500, popular: false },
  { id: "6", coins: 10000, price: "$79.99", bonus: 4000, popular: false },
]

const premiumFeatures = [
  { icon: Star, name: "Premium Badge", description: "Stand out with a special badge" },
  { icon: Zap, name: "Priority Feed", description: "Your content gets boosted" },
  { icon: Gift, name: "Exclusive Gifts", description: "Access premium gift options" },
  { icon: Crown, name: "Ad-Free", description: "Enjoy without interruptions" },
]

export function CoinStore({ onBack }: CoinStoreProps) {
  const { coins } = useApp()
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"coins" | "premium">("coins")

  const handlePurchase = () => {
    if (!selectedPackage) return
    // Handle purchase logic
    alert("Purchase flow would open here")
  }

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 safe-top glass">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-bold text-white">Store</h1>
        </div>

        {/* Current balance */}
        <div className="glass rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-white/60">Your Balance</p>
            <p className="text-2xl font-bold text-white">{coins.toLocaleString()}</p>
          </div>
          <div className="w-14 h-14 rounded-full gradient-button flex items-center justify-center">
            <Coins className="w-7 h-7 text-white" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mt-4">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("coins")}
            className={`flex-1 py-3 rounded-xl font-semibold ${
              activeTab === "coins" ? "gradient-button text-white" : "glass text-white/60"
            }`}
          >
            Buy Coins
          </button>
          <button
            onClick={() => setActiveTab("premium")}
            className={`flex-1 py-3 rounded-xl font-semibold ${
              activeTab === "premium" ? "gradient-button text-white" : "glass text-white/60"
            }`}
          >
            Premium
          </button>
        </div>
      </div>

      {activeTab === "coins" ? (
        <>
          {/* Coin packages */}
          <div className="px-4 mt-6">
            <h2 className="text-lg font-semibold text-white mb-3">Coin Packages</h2>
            <div className="grid grid-cols-2 gap-3">
              {coinPackages.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg.id)}
                  className={`relative glass rounded-2xl p-4 text-left ${
                    selectedPackage === pkg.id ? "ring-2 ring-pink-500" : ""
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-pink-500 rounded-full">
                      <span className="text-[10px] text-white font-bold">POPULAR</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 mb-2">
                    <Coins className="w-6 h-6 text-yellow-400" />
                    <span className="text-xl font-bold text-white">{pkg.coins.toLocaleString()}</span>
                  </div>
                  {pkg.bonus > 0 && <p className="text-xs text-green-400 mb-1">+{pkg.bonus} bonus</p>}
                  <p className="text-lg font-semibold text-white">{pkg.price}</p>
                  {selectedPackage === pkg.id && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Purchase button */}
          {selectedPackage && (
            <div className="px-4 mt-6">
              <button onClick={handlePurchase} className="w-full py-4 gradient-button rounded-2xl">
                <span className="text-white font-bold text-lg">Purchase Now</span>
              </button>
            </div>
          )}

          {/* What are coins for */}
          <div className="px-4 mt-8">
            <h2 className="text-lg font-semibold text-white mb-3">What are Coins for?</h2>
            <div className="space-y-3">
              {[
                { icon: Gift, title: "Send Gifts", desc: "Support your favorite creators" },
                { icon: Sparkles, title: "Unlock Features", desc: "Access premium effects and filters" },
                { icon: Star, title: "Boost Content", desc: "Promote your videos to more viewers" },
              ].map((item, i) => (
                <div key={i} className="glass rounded-xl p-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-pink-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{item.title}</p>
                    <p className="text-sm text-white/60">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Premium subscription */}
          <div className="px-4 mt-6">
            <div className="glass rounded-2xl p-6 text-center">
              <div className="w-20 h-20 rounded-full gradient-button flex items-center justify-center mx-auto mb-4">
                <Crown className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Vibe Premium</h2>
              <p className="text-white/60 mb-4">Unlock the full experience</p>
              <div className="text-3xl font-bold text-white mb-1">
                $9.99<span className="text-lg font-normal text-white/60">/month</span>
              </div>
              <p className="text-sm text-green-400">Save 40% with annual plan</p>
            </div>

            <div className="mt-6 space-y-3">
              {premiumFeatures.map((feature, i) => (
                <div key={i} className="glass rounded-xl p-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-pink-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">{feature.name}</p>
                    <p className="text-sm text-white/60">{feature.description}</p>
                  </div>
                  <Check className="w-5 h-5 text-green-400 ml-auto" />
                </div>
              ))}
            </div>

            <button className="w-full py-4 gradient-button rounded-2xl mt-6">
              <span className="text-white font-bold text-lg">Start Free Trial</span>
            </button>
            <p className="text-center text-sm text-white/50 mt-2">7 days free, then $9.99/month</p>
          </div>
        </>
      )}
    </div>
  )
}
