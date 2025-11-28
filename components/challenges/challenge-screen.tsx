"use client"

import { useState } from "react"
import { ArrowLeft, Users, Clock, Trophy, ChevronRight, Plus, Flame } from "lucide-react"

interface ChallengeScreenProps {
  onBack: () => void
}

const activeChallenges = [
  {
    id: "1",
    title: "Dance Revolution",
    hashtag: "#DanceRevolution",
    thumbnail: "/vibrant-dance-party.png",
    participants: "2.5M",
    deadline: "3 days left",
    prize: "$10,000",
    description: "Show us your best dance moves!",
  },
  {
    id: "2",
    title: "Cooking Masters",
    hashtag: "#CookingMasters",
    thumbnail: "/cooking-food.png",
    participants: "890K",
    deadline: "5 days left",
    prize: "$5,000",
    description: "Create a unique dish in under 60 seconds",
  },
  {
    id: "3",
    title: "Travel Stories",
    hashtag: "#TravelStories",
    thumbnail: "/travel-adventure.png",
    participants: "1.2M",
    deadline: "1 week left",
    prize: "$7,500",
    description: "Share your favorite travel moment",
  },
]

const pastChallenges = [
  { id: "p1", title: "Summer Vibes", hashtag: "#SummerVibes", videos: "5.2M", winner: "@beachqueen" },
  { id: "p2", title: "Fitness Goals", hashtag: "#FitnessGoals", videos: "3.8M", winner: "@fitnessguru" },
]

export function ChallengeScreen({ onBack }: ChallengeScreenProps) {
  const [activeTab, setActiveTab] = useState<"active" | "past" | "my">("active")

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 safe-top">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-bold text-white">Challenges</h1>
        </div>

        {/* Featured challenge banner */}
        <div className="relative rounded-2xl overflow-hidden">
          <img src="/vibrant-dance-party.png" alt="Featured challenge" className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-orange-400" />
              <span className="text-sm text-orange-400 font-semibold">HOT CHALLENGE</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-1">Dance Revolution</h2>
            <p className="text-sm text-white/70 mb-3">Show us your best dance moves and win!</p>
            <button className="px-6 py-2 gradient-button rounded-full">
              <span className="text-white font-semibold">Join Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mt-4">
        <div className="flex gap-2">
          {[
            { id: "active", label: "Active" },
            { id: "past", label: "Past" },
            { id: "my", label: "My Challenges" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex-1 py-2 rounded-xl font-semibold text-sm ${
                activeTab === tab.id ? "gradient-button text-white" : "glass text-white/60"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "active" && (
        <div className="px-4 mt-6 space-y-4">
          {activeChallenges.map((challenge) => (
            <div key={challenge.id} className="glass rounded-2xl overflow-hidden">
              <div className="relative h-32">
                <img
                  src={challenge.thumbnail || "/placeholder.svg"}
                  alt={challenge.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                <div className="absolute top-3 left-3 px-3 py-1 glass rounded-full">
                  <span className="text-xs text-white font-semibold">{challenge.hashtag}</span>
                </div>
                <div className="absolute bottom-3 left-3">
                  <h3 className="text-lg font-bold text-white">{challenge.title}</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-white/70 mb-3">{challenge.description}</p>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-white/60" />
                      <span className="text-sm text-white">{challenge.participants}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-white/60" />
                      <span className="text-sm text-white">{challenge.deadline}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-yellow-400 font-semibold">{challenge.prize}</span>
                  </div>
                </div>
                <button className="w-full py-3 gradient-button rounded-xl flex items-center justify-center gap-2">
                  <Plus className="w-5 h-5 text-white" />
                  <span className="text-white font-semibold">Participate</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "past" && (
        <div className="px-4 mt-6 space-y-3">
          {pastChallenges.map((challenge) => (
            <button key={challenge.id} className="w-full glass rounded-xl p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-white font-semibold">{challenge.title}</p>
                <p className="text-xs text-white/60">
                  {challenge.videos} videos · Winner: {challenge.winner}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-white/50" />
            </button>
          ))}
        </div>
      )}

      {activeTab === "my" && (
        <div className="px-4 mt-6">
          <div className="glass rounded-2xl p-6 text-center">
            <Trophy className="w-12 h-12 text-white/30 mx-auto mb-3" />
            <p className="text-white/60">You haven't joined any challenges yet</p>
            <button className="mt-4 px-6 py-2 gradient-button rounded-full">
              <span className="text-white font-semibold">Browse Challenges</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
