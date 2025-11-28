"use client"

import { useState } from "react"
import { ArrowLeft, Trophy, Users, Clock, Play, Plus, File as Fire, TrendingUp, Filter, Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChallengesScreenProps {
  onBack: () => void
  onNavigate: (screen: string) => void
}

interface Challenge {
  id: string
  title: string
  hashtag: string
  description: string
  thumbnail: string
  participants: number
  videos: number
  prize?: string
  endsIn: string
  difficulty: "easy" | "medium" | "hard"
  category: string
  isJoined: boolean
  isTrending: boolean
  creator: {
    name: string
    avatar: string
    isVerified: boolean
  }
}

const mockChallenges: Challenge[] = [
  {
    id: "1",
    title: "Dance Revolution",
    hashtag: "#DanceRevolution2024",
    description: "Show us your best dance moves! Any style welcome.",
    thumbnail: "/dance-challenge.jpg",
    participants: 125000,
    videos: 89000,
    prize: "$10,000",
    endsIn: "3 days",
    difficulty: "medium",
    category: "Dance",
    isJoined: false,
    isTrending: true,
    creator: {
      name: "DanceHub Official",
      avatar: "/dance-hub-avatar.png",
      isVerified: true,
    },
  },
  {
    id: "2",
    title: "Cooking Quick",
    hashtag: "#60SecondMeal",
    description: "Create a delicious meal in 60 seconds or less!",
    thumbnail: "/cooking-challenge.jpg",
    participants: 45000,
    videos: 32000,
    prize: "$5,000",
    endsIn: "5 days",
    difficulty: "hard",
    category: "Food",
    isJoined: true,
    isTrending: true,
    creator: {
      name: "FoodieTV",
      avatar: "/foodie-avatar.png",
      isVerified: true,
    },
  },
  {
    id: "3",
    title: "Pet Tricks",
    hashtag: "#PetTalent",
    description: "Show off your pet's amazing tricks and talents!",
    thumbnail: "/pet-challenge.jpg",
    participants: 78000,
    videos: 56000,
    endsIn: "1 week",
    difficulty: "easy",
    category: "Pets",
    isJoined: false,
    isTrending: false,
    creator: {
      name: "PetLovers",
      avatar: "/pet-avatar.png",
      isVerified: false,
    },
  },
  {
    id: "4",
    title: "Fitness Friday",
    hashtag: "#FitnessFriday",
    description: "Share your workout routine and inspire others!",
    thumbnail: "/fitness-challenge.jpg",
    participants: 92000,
    videos: 67000,
    prize: "$3,000",
    endsIn: "2 days",
    difficulty: "medium",
    category: "Fitness",
    isJoined: false,
    isTrending: true,
    creator: {
      name: "FitLife",
      avatar: "/fit-avatar.png",
      isVerified: true,
    },
  },
]

const categories = ["All", "Dance", "Food", "Fitness", "Comedy", "Music", "Pets", "Art"]

export function ChallengesScreen({ onBack, onNavigate }: ChallengesScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [challenges, setChallenges] = useState(mockChallenges)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"trending" | "newest" | "ending">("trending")

  const filteredChallenges = challenges.filter((challenge) => {
    const matchesCategory = selectedCategory === "All" || challenge.category === selectedCategory
    const matchesSearch =
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.hashtag.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleJoin = (id: string) => {
    setChallenges(challenges.map((c) => (c.id === id ? { ...c, isJoined: !c.isJoined } : c)))
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-400 bg-green-400/20"
      case "medium":
        return "text-yellow-400 bg-yellow-400/20"
      case "hard":
        return "text-red-400 bg-red-400/20"
      default:
        return "text-white/60 bg-white/10"
    }
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 safe-top glass sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white">Challenges</h1>
            <p className="text-sm text-white/60">Join trending challenges and win prizes</p>
          </div>
          <button className="p-2 glass rounded-full">
            <Plus className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
          <input
            type="text"
            placeholder="Search challenges..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 rounded-xl text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                selectedCategory === category ? "bg-pink-500 text-white" : "glass text-white/70",
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Sort options */}
      <div className="px-4 py-3 flex items-center gap-2">
        <Filter className="w-4 h-4 text-white/50" />
        {(["trending", "newest", "ending"] as const).map((sort) => (
          <button
            key={sort}
            onClick={() => setSortBy(sort)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors",
              sortBy === sort ? "bg-white/20 text-white" : "text-white/50",
            )}
          >
            {sort}
          </button>
        ))}
      </div>

      {/* Featured Challenge */}
      {filteredChallenges.find((c) => c.isTrending && c.prize) && (
        <div className="px-4 mb-6">
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src={filteredChallenges.find((c) => c.isTrending && c.prize)?.thumbnail || "/placeholder.svg"}
              alt="Featured challenge"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="px-2 py-1 bg-pink-500 rounded-full text-xs font-bold text-white flex items-center gap-1">
                <Fire className="w-3 h-3" /> HOT
              </span>
              <span className="px-2 py-1 bg-yellow-500 rounded-full text-xs font-bold text-black flex items-center gap-1">
                <Trophy className="w-3 h-3" /> {filteredChallenges.find((c) => c.isTrending && c.prize)?.prize}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-lg font-bold text-white mb-1">
                {filteredChallenges.find((c) => c.isTrending && c.prize)?.title}
              </h3>
              <p className="text-sm text-pink-400 mb-2">
                {filteredChallenges.find((c) => c.isTrending && c.prize)?.hashtag}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-white/70 text-xs">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {formatNumber(filteredChallenges.find((c) => c.isTrending && c.prize)?.participants || 0)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {filteredChallenges.find((c) => c.isTrending && c.prize)?.endsIn}
                  </span>
                </div>
                <button className="px-4 py-2 gradient-button rounded-full text-sm font-semibold text-white">
                  Join Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Challenges list */}
      <div className="px-4 space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-pink-400" />
          All Challenges
        </h2>

        {filteredChallenges.map((challenge) => (
          <div key={challenge.id} className="glass rounded-2xl overflow-hidden">
            <div className="flex gap-3 p-3">
              {/* Thumbnail */}
              <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={challenge.thumbnail || "/placeholder.svg?height=96&width=96&query=challenge"}
                  alt={challenge.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <Play className="w-8 h-8 text-white fill-white" />
                </div>
                {challenge.isTrending && (
                  <div className="absolute top-1 left-1">
                    <Fire className="w-4 h-4 text-orange-400" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-white truncate">{challenge.title}</h3>
                    <p className="text-sm text-pink-400">{challenge.hashtag}</p>
                  </div>
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded-full text-xs capitalize",
                      getDifficultyColor(challenge.difficulty),
                    )}
                  >
                    {challenge.difficulty}
                  </span>
                </div>

                <p className="text-xs text-white/60 mt-1 line-clamp-1">{challenge.description}</p>

                <div className="flex items-center gap-3 mt-2 text-xs text-white/50">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {formatNumber(challenge.participants)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Play className="w-3 h-3" />
                    {formatNumber(challenge.videos)} videos
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {challenge.endsIn}
                  </span>
                </div>

                {challenge.prize && (
                  <div className="flex items-center gap-1 mt-2">
                    <Trophy className="w-3 h-3 text-yellow-400" />
                    <span className="text-xs text-yellow-400 font-semibold">{challenge.prize} Prize</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action */}
            <div className="px-3 pb-3">
              <button
                onClick={() => handleJoin(challenge.id)}
                className={cn(
                  "w-full py-2.5 rounded-xl font-semibold text-sm transition-colors",
                  challenge.isJoined ? "bg-white/10 text-white/70" : "gradient-button text-white",
                )}
              >
                {challenge.isJoined ? "Joined" : "Join Challenge"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
