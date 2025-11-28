"use client"

import { Coins } from "lucide-react"
import { useApp } from "@/contexts/app-context"
import { cn } from "@/lib/utils"

interface GiftSheetProps {
  isOpen: boolean
  onClose: () => void
}

const gifts = [
  { id: "rose", emoji: "🌹", name: "Rose", price: 10 },
  { id: "heart", emoji: "💖", name: "Heart", price: 50 },
  { id: "star", emoji: "⭐", name: "Star", price: 100 },
  { id: "diamond", emoji: "💎", name: "Diamond", price: 500 },
  { id: "crown", emoji: "👑", name: "Crown", price: 1000 },
  { id: "rocket", emoji: "🚀", name: "Rocket", price: 2000 },
  { id: "unicorn", emoji: "🦄", name: "Unicorn", price: 5000 },
  { id: "galaxy", emoji: "🌌", name: "Galaxy", price: 10000 },
]

export function GiftSheet({ isOpen, onClose }: GiftSheetProps) {
  const { coins, spendCoins } = useApp()

  const handleSendGift = (price: number) => {
    if (spendCoins(price)) {
      // Gift sent animation
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60" />
      <div
        className="absolute bottom-0 left-0 right-0 glass-dark rounded-t-3xl p-6 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1 bg-white/30 rounded-full mx-auto mb-6" />

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Send a Gift</h2>
          <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 rounded-xl">
            <Coins className="w-5 h-5 text-yellow-400" />
            <span className="font-bold text-yellow-400">{coins.toLocaleString()}</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {gifts.map((gift) => (
            <button
              key={gift.id}
              onClick={() => handleSendGift(gift.price)}
              disabled={coins < gift.price}
              className={cn(
                "flex flex-col items-center gap-2 p-3 rounded-2xl glass transition-all",
                coins >= gift.price ? "hover:bg-white/10 active:scale-95" : "opacity-50 cursor-not-allowed",
              )}
            >
              <span className="text-3xl">{gift.emoji}</span>
              <span className="text-xs text-white/70">{gift.name}</span>
              <div className="flex items-center gap-1">
                <Coins className="w-3 h-3 text-yellow-400" />
                <span className="text-xs text-yellow-400">{gift.price}</span>
              </div>
            </button>
          ))}
        </div>

        <button className="w-full mt-6 py-4 gradient-button rounded-2xl text-white font-semibold">
          Get More Coins
        </button>
      </div>
    </div>
  )
}
