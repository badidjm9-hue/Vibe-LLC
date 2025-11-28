// Recommendation Algorithm Engine with 3 modes
// Conservative, Personalization-First, and Hybrid (default)

export type AlgorithmMode = "conservative" | "personalization" | "hybrid"

export interface UserInteraction {
  videoId: string
  userId: string
  type: "view" | "like" | "share" | "comment" | "save" | "skip" | "replay"
  watchTime: number // in seconds
  totalDuration: number
  timestamp: number
  dwellTime: number // time spent on video before scrolling
}

export interface VideoFeatures {
  id: string
  creatorId: string
  hashtags: string[]
  soundId: string
  duration: number
  engagement: {
    likes: number
    comments: number
    shares: number
    saves: number
    views: number
    avgWatchTime: number
    completionRate: number
  }
  freshness: number // hours since posted
  qualityScore: number // 0-1, based on production quality signals
  creatorReputation: number // 0-1, based on creator history
}

export interface UserProfile {
  id: string
  interests: Record<string, number> // hashtag/topic -> affinity score
  preferredCreators: string[]
  watchHistory: string[]
  likedVideos: string[]
  avgSessionLength: number
  preferredVideoLength: "short" | "medium" | "long"
  activeHours: number[] // hours of day when most active
}

export interface RecommendationConfig {
  mode: AlgorithmMode
  explorationRate: number // 0-1, for explore/exploit balance
  freshnessWeight: number
  popularityWeight: number
  personalizationWeight: number
  diversityWeight: number
  coldStartBoost: number // boost for new creators
}

// Default configurations for each mode
export const MODE_CONFIGS: Record<AlgorithmMode, RecommendationConfig> = {
  conservative: {
    mode: "conservative",
    explorationRate: 0.1,
    freshnessWeight: 0.35,
    popularityWeight: 0.45,
    personalizationWeight: 0.15,
    diversityWeight: 0.05,
    coldStartBoost: 0.1,
  },
  personalization: {
    mode: "personalization",
    explorationRate: 0.15,
    freshnessWeight: 0.15,
    popularityWeight: 0.15,
    personalizationWeight: 0.6,
    diversityWeight: 0.1,
    coldStartBoost: 0.05,
  },
  hybrid: {
    mode: "hybrid",
    explorationRate: 0.2,
    freshnessWeight: 0.25,
    popularityWeight: 0.25,
    personalizationWeight: 0.35,
    diversityWeight: 0.15,
    coldStartBoost: 0.15,
  },
}

export class RecommendationEngine {
  private config: RecommendationConfig
  private userInteractions: Map<string, UserInteraction[]> = new Map()

  constructor(mode: AlgorithmMode = "hybrid") {
    this.config = MODE_CONFIGS[mode]
  }

  setMode(mode: AlgorithmMode) {
    this.config = MODE_CONFIGS[mode]
  }

  getMode(): AlgorithmMode {
    return this.config.mode
  }

  getConfig(): RecommendationConfig {
    return { ...this.config }
  }

  // Log user interaction for learning
  logInteraction(interaction: UserInteraction) {
    const existing = this.userInteractions.get(interaction.userId) || []
    existing.push(interaction)
    // Keep last 1000 interactions per user
    if (existing.length > 1000) existing.shift()
    this.userInteractions.set(interaction.userId, existing)
  }

  // Calculate video score based on current mode
  calculateScore(video: VideoFeatures, userProfile: UserProfile | null): number {
    const { freshnessWeight, popularityWeight, personalizationWeight, diversityWeight, coldStartBoost } = this.config

    // Freshness score (newer = higher, decays over 48 hours)
    const freshnessScore = Math.max(0, 1 - video.freshness / 48)

    // Popularity score (normalized engagement)
    const popularityScore = this.calculatePopularityScore(video)

    // Personalization score (how well it matches user interests)
    const personalizationScore = userProfile ? this.calculatePersonalizationScore(video, userProfile) : 0.5

    // Diversity score (to avoid filter bubbles)
    const diversityScore = userProfile ? this.calculateDiversityScore(video, userProfile) : 0.5

    // Cold start boost for new creators
    const creatorBoost = video.creatorReputation < 0.3 ? coldStartBoost * video.qualityScore : 0

    // Weighted combination
    let score =
      freshnessScore * freshnessWeight +
      popularityScore * popularityWeight +
      personalizationScore * personalizationWeight +
      diversityScore * diversityWeight +
      creatorBoost

    // Apply exploration/exploitation (Thompson Sampling simplified)
    if (Math.random() < this.config.explorationRate) {
      score += (Math.random() - 0.5) * 0.3 // Add noise for exploration
    }

    return Math.max(0, Math.min(1, score))
  }

  private calculatePopularityScore(video: VideoFeatures): number {
    const { likes, comments, shares, saves, views, completionRate } = video.engagement

    // Engagement rate (likes + comments + shares + saves) / views
    const engagementRate = views > 0 ? (likes + comments * 2 + shares * 3 + saves * 2) / views : 0

    // Combine with completion rate
    return Math.min(1, engagementRate * 10 * 0.6 + completionRate * 0.4)
  }

  private calculatePersonalizationScore(video: VideoFeatures, profile: UserProfile): number {
    let score = 0

    // Interest matching
    for (const hashtag of video.hashtags) {
      if (profile.interests[hashtag]) {
        score += profile.interests[hashtag] * 0.2
      }
    }

    // Creator preference
    if (profile.preferredCreators.includes(video.creatorId)) {
      score += 0.3
    }

    // Video length preference
    const lengthPref = profile.preferredVideoLength
    const duration = video.duration
    if (
      (lengthPref === "short" && duration < 30) ||
      (lengthPref === "medium" && duration >= 30 && duration < 60) ||
      (lengthPref === "long" && duration >= 60)
    ) {
      score += 0.1
    }

    return Math.min(1, score)
  }

  private calculateDiversityScore(video: VideoFeatures, profile: UserProfile): number {
    // Penalize videos too similar to recent watch history
    const recentWatched = profile.watchHistory.slice(-20)

    // Check if creator is overrepresented
    const creatorCount = recentWatched.filter((id) => id.startsWith(video.creatorId)).length
    const creatorPenalty = creatorCount > 3 ? 0.3 : 0

    // Check if hashtags are overrepresented
    let hashtagOverlap = 0
    for (const hashtag of video.hashtags) {
      if (profile.interests[hashtag] && profile.interests[hashtag] > 0.8) {
        hashtagOverlap += 0.1
      }
    }

    return Math.max(0, 1 - creatorPenalty - hashtagOverlap)
  }

  // Rank a batch of videos
  rankVideos(videos: VideoFeatures[], userProfile: UserProfile | null): VideoFeatures[] {
    const scored = videos.map((video) => ({
      video,
      score: this.calculateScore(video, userProfile),
    }))

    // Sort by score descending
    scored.sort((a, b) => b.score - a.score)

    return scored.map((s) => s.video)
  }

  // Get analytics for admin dashboard
  getAnalytics() {
    return {
      mode: this.config.mode,
      config: this.config,
      totalInteractionsLogged: Array.from(this.userInteractions.values()).reduce((sum, arr) => sum + arr.length, 0),
      uniqueUsers: this.userInteractions.size,
    }
  }
}

// Singleton instance
let engineInstance: RecommendationEngine | null = null

export function getRecommendationEngine(): RecommendationEngine {
  if (!engineInstance) {
    engineInstance = new RecommendationEngine("hybrid")
  }
  return engineInstance
}

export function setAlgorithmMode(mode: AlgorithmMode) {
  getRecommendationEngine().setMode(mode)
}
