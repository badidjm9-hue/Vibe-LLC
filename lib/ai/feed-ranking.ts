// AI-powered feed ranking algorithm

interface VideoFeatures {
  videoId: string
  likes: number
  comments: number
  shares: number
  views: number
  watchTime: number
  completionRate: number
  creatorFollowers: number
  creatorEngagementRate: number
  hoursOld: number
  hasCaption: boolean
  hashtags: string[]
}

interface UserPreferences {
  userId: string
  watchedVideos: string[]
  likedVideos: string[]
  followedCreators: string[]
  preferredHashtags: string[]
  avgWatchTime: number
  activeHours: number[]
}

export class FeedRankingService {
  // Calculate video score for ranking
  static calculateVideoScore(video: VideoFeatures, user: UserPreferences): number {
    let score = 0

    // Engagement signals (40%)
    const engagementRate = (video.likes + video.comments * 2 + video.shares * 3) / Math.max(video.views, 1)
    score += engagementRate * 40

    // Completion rate (20%)
    score += video.completionRate * 20

    // Creator relevance (15%)
    if (user.followedCreators.includes(video.videoId.split("_")[0])) {
      score += 15
    }

    // Hashtag relevance (10%)
    const matchingTags = video.hashtags.filter((tag) => user.preferredHashtags.includes(tag))
    score += (matchingTags.length / Math.max(video.hashtags.length, 1)) * 10

    // Freshness decay (10%)
    const freshnessScore = Math.max(0, 10 - video.hoursOld * 0.2)
    score += freshnessScore

    // Diversity penalty (5%)
    if (user.watchedVideos.includes(video.videoId)) {
      score -= 50 // Heavily penalize already watched
    }

    return Math.max(0, Math.min(100, score))
  }

  // Rank videos for user
  static rankVideosForUser(videos: VideoFeatures[], user: UserPreferences): VideoFeatures[] {
    const scoredVideos = videos.map((video) => ({
      ...video,
      score: this.calculateVideoScore(video, user),
    }))

    // Sort by score with some randomness for exploration
    return scoredVideos
      .sort((a, b) => {
        const randomFactor = (Math.random() - 0.5) * 10 // Add randomness for discovery
        return b.score - a.score + randomFactor
      })
      .map(({ score, ...video }) => video)
  }

  // Detect trending content
  static detectTrending(videos: VideoFeatures[], timeWindowHours = 24): { videoId: string; trendScore: number }[] {
    const recentVideos = videos.filter((v) => v.hoursOld <= timeWindowHours)

    const trending = recentVideos.map((video) => {
      // Calculate velocity of engagement
      const engagementVelocity = (video.likes + video.comments + video.shares) / Math.max(video.hoursOld, 1)

      // Factor in absolute numbers
      const absoluteScore = Math.log10(video.views + 1)

      // Combine for trend score
      const trendScore = engagementVelocity * 0.7 + absoluteScore * 0.3

      return { videoId: video.videoId, trendScore }
    })

    return trending.sort((a, b) => b.trendScore - a.trendScore).slice(0, 50)
  }

  // Get personalized "For You" recommendations
  static getForYouRecommendations(allVideos: VideoFeatures[], user: UserPreferences, count = 20): string[] {
    // Mix of trending, personalized, and discovery
    const trending = this.detectTrending(allVideos).slice(0, Math.floor(count * 0.3))
    const personalized = this.rankVideosForUser(allVideos, user).slice(0, Math.floor(count * 0.5))
    const discovery = allVideos
      .filter((v) => !user.watchedVideos.includes(v.videoId))
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(count * 0.2))

    // Combine and deduplicate
    const combined = [
      ...trending.map((t) => t.videoId),
      ...personalized.map((p) => p.videoId),
      ...discovery.map((d) => d.videoId),
    ]

    return [...new Set(combined)].slice(0, count)
  }

  // Sound-based recommendations
  static getSoundBasedRecommendations(videos: VideoFeatures[], soundId: string, count = 10): VideoFeatures[] {
    // This would filter videos using the same sound
    // For demo, return top videos
    return videos.sort((a, b) => b.views - a.views).slice(0, count)
  }

  // Follow recommendations
  static getFollowRecommendations(
    user: UserPreferences,
    allUsers: { userId: string; followers: number; videos: VideoFeatures[] }[],
    count = 10,
  ): string[] {
    const recommendations = allUsers
      .filter((u) => !user.followedCreators.includes(u.userId))
      .map((u) => {
        // Score based on content relevance and popularity
        const contentScore = u.videos.reduce((sum, v) => {
          const tagMatch = v.hashtags.filter((t) => user.preferredHashtags.includes(t)).length
          return sum + tagMatch
        }, 0)

        const popularityScore = Math.log10(u.followers + 1)

        return {
          userId: u.userId,
          score: contentScore * 0.6 + popularityScore * 0.4,
        }
      })
      .sort((a, b) => b.score - a.score)

    return recommendations.slice(0, count).map((r) => r.userId)
  }
}
