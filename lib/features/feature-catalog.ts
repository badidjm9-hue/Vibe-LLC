// Feature Catalog - List of all implemented and planned features
// This provides a comprehensive overview of the app's capabilities

export interface Feature {
  id: string
  name: string
  category: string
  description: string
  status: "implemented" | "partial" | "planned"
  priority: "critical" | "high" | "medium" | "low"
}

export const featureCategories = [
  "Core Video",
  "Social",
  "Messaging",
  "Creator Tools",
  "Monetization",
  "Discovery",
  "Security",
  "Analytics",
  "Live",
  "AI/ML",
  "Admin",
  "Performance",
  "Accessibility",
  "Gamification",
] as const

// Feature catalog with implemented and planned features
export const featureCatalog: Feature[] = [
  // Core Video Features
  {
    id: "f001",
    name: "Video Feed with Infinite Scroll",
    category: "Core Video",
    description: "Full-screen vertical video feed with smooth scrolling",
    status: "implemented",
    priority: "critical",
  },
  {
    id: "f002",
    name: "Double-tap to Like",
    category: "Core Video",
    description: "Like videos with double-tap gesture",
    status: "implemented",
    priority: "critical",
  },
  {
    id: "f003",
    name: "Video Sharing",
    category: "Core Video",
    description: "Share videos to social platforms and direct messages",
    status: "implemented",
    priority: "high",
  },
  {
    id: "f004",
    name: "Video Bookmarking",
    category: "Core Video",
    description: "Save videos for later viewing",
    status: "implemented",
    priority: "high",
  },
  {
    id: "f005",
    name: "Video Editor",
    category: "Core Video",
    description: "In-app video editing with filters and effects",
    status: "implemented",
    priority: "high",
  },
  {
    id: "f006",
    name: "Duet Mode",
    category: "Core Video",
    description: "Create side-by-side videos with other creators",
    status: "implemented",
    priority: "medium",
  },
  {
    id: "f007",
    name: "Stitch Mode",
    category: "Core Video",
    description: "Clip and respond to other videos",
    status: "partial",
    priority: "medium",
  },
  {
    id: "f008",
    name: "AR Filters",
    category: "Core Video",
    description: "Augmented reality face filters and effects",
    status: "partial",
    priority: "medium",
  },
  {
    id: "f009",
    name: "Green Screen",
    category: "Core Video",
    description: "Replace background in videos",
    status: "partial",
    priority: "medium",
  },
  {
    id: "f010",
    name: "Speed Controls",
    category: "Core Video",
    description: "Adjust video playback and recording speed",
    status: "implemented",
    priority: "medium",
  },

  // Social Features
  {
    id: "f011",
    name: "Follow System",
    category: "Social",
    description: "Follow/unfollow creators",
    status: "implemented",
    priority: "critical",
  },
  {
    id: "f012",
    name: "Comments",
    category: "Social",
    description: "Comment on videos with replies and likes",
    status: "implemented",
    priority: "critical",
  },
  {
    id: "f013",
    name: "User Profiles",
    category: "Social",
    description: "Customizable user profiles",
    status: "implemented",
    priority: "critical",
  },
  {
    id: "f014",
    name: "Activity Feed",
    category: "Social",
    description: "Notifications for likes, comments, follows",
    status: "implemented",
    priority: "high",
  },
  {
    id: "f015",
    name: "Mentions",
    category: "Social",
    description: "Tag users in comments and captions",
    status: "implemented",
    priority: "high",
  },
  {
    id: "f016",
    name: "Stories",
    category: "Social",
    description: "24-hour ephemeral content",
    status: "implemented",
    priority: "high",
  },
  {
    id: "f017",
    name: "Challenges",
    category: "Social",
    description: "Participate in trending challenges",
    status: "implemented",
    priority: "medium",
  },
  {
    id: "f018",
    name: "Collaborative Videos",
    category: "Social",
    description: "Create videos with multiple creators",
    status: "partial",
    priority: "medium",
  },

  // Messaging Features
  {
    id: "f019",
    name: "Direct Messages",
    category: "Messaging",
    description: "One-to-one messaging",
    status: "implemented",
    priority: "critical",
  },
  {
    id: "f020",
    name: "Group Chats",
    category: "Messaging",
    description: "Multi-person group conversations",
    status: "implemented",
    priority: "high",
  },
  {
    id: "f021",
    name: "Voice Messages",
    category: "Messaging",
    description: "Send voice recordings in chats",
    status: "implemented",
    priority: "high",
  },
  {
    id: "f022",
    name: "Media Sharing",
    category: "Messaging",
    description: "Share images and videos in messages",
    status: "implemented",
    priority: "high",
  },
  {
    id: "f023",
    name: "Typing Indicators",
    category: "Messaging",
    description: "Show when users are typing",
    status: "implemented",
    priority: "medium",
  },
  {
    id: "f024",
    name: "Read Receipts",
    category: "Messaging",
    description: "Show message delivery and read status",
    status: "implemented",
    priority: "medium",
  },
  {
    id: "f025",
    name: "Message Reactions",
    category: "Messaging",
    description: "React to messages with emojis",
    status: "implemented",
    priority: "medium",
  },
  {
    id: "f026",
    name: "Secret Chats",
    category: "Messaging",
    description: "End-to-end encrypted conversations",
    status: "implemented",
    priority: "medium",
  },
  {
    id: "f027",
    name: "Chat Themes",
    category: "Messaging",
    description: "Customize chat appearance",
    status: "implemented",
    priority: "low",
  },
  {
    id: "f028",
    name: "Auto-Delete Messages",
    category: "Messaging",
    description: "Messages that disappear after timer",
    status: "implemented",
    priority: "low",
  },

  // Creator Tools
  {
    id: "f029",
    name: "Analytics Dashboard",
    category: "Creator Tools",
    description: "View performance metrics and insights",
    status: "implemented",
    priority: "high",
  },
  {
    id: "f030",
    name: "Best Time to Post",
    category: "Creator Tools",
    description: "AI suggestions for optimal posting times",
    status: "implemented",
    priority: "medium",
  },
  {
    id: "f031",
    name: "Audience Demographics",
    category: "Creator Tools",
    description: "Understand audience composition",
    status: "implemented",
    priority: "medium",
  },
  {
    id: "f032",
    name: "Content Scheduling",
    category: "Creator Tools",
    description: "Schedule posts for later",
    status: "partial",
    priority: "medium",
  },
  {
    id: "f033",
    name: "Trend Insights",
    category: "Creator Tools",
    description: "Discover trending sounds and hashtags",
    status: "implemented",
    priority: "medium",
  },

  // Monetization
  {
    id: "f034",
    name: "Virtual Gifts",
    category: "Monetization",
    description: "Send and receive virtual gifts",
    status: "implemented",
    priority: "high",
  },
  {
    id: "f035",
    name: "Creator Subscriptions",
    category: "Monetization",
    description: "Monthly subscription tiers",
    status: "implemented",
    priority: "high",
  },
  {
    id: "f036",
    name: "Tips",
    category: "Monetization",
    description: "Direct tips to creators",
    status: "implemented",
    priority: "high",
  },
  {
    id: "f037",
    name: "Creator Fund",
    category: "Monetization",
    description: "Revenue share from views",
    status: "implemented",
    priority: "medium",
  },
  {
    id: "f038",
    name: "Payout System",
    category: "Monetization",
    description: "Withdraw earnings to bank",
    status: "implemented",
    priority: "high",
  },
  {
    id: "f039",
    name: "Coin Store",
    category: "Monetization",
    description: "Purchase in-app currency",
    status: "implemented",
    priority: "high",
  },

  // Discovery
  {
    id: "f040",
    name: "For You Feed",
    category: "Discovery",
    description: "Personalized video recommendations",
    status: "implemented",
    priority: "critical",
  },
  {
    id: "f041",
    name: "Discover Page",
    category: "Discovery",
    description: "Explore trending content and creators",
    status: "implemented",
    priority: "critical",
  },
  {
    id: "f042",
    name: "Search",
    category: "Discovery",
    description: "Search users, videos, sounds, hashtags",
    status: "implemented",
    priority: "critical",
  },
  {
    id: "f043",
    name: "Hashtag Pages",
    category: "Discovery",
    description: "Browse content by hashtag",
    status: "implemented",
    priority: "high",
  },
  {
    id: "f044",
    name: "Sound Pages",
    category: "Discovery",
    description: "Browse videos using same sound",
    status: "partial",
    priority: "high",
  },

  // Security
  {
    id: "f045",
    name: "Two-Factor Auth",
    category: "Security",
    description: "Additional account security",
    status: "implemented",
    priority: "high",
  },
  {
    id: "f046",
    name: "App Lock",
    category: "Security",
    description: "PIN/biometric lock for app",
    status: "implemented",
    priority: "medium",
  },
  {
    id: "f047",
    name: "Privacy Settings",
    category: "Security",
    description: "Control who can interact with you",
    status: "implemented",
    priority: "high",
  },
  {
    id: "f048",
    name: "Block Users",
    category: "Security",
    description: "Block unwanted users",
    status: "implemented",
    priority: "high",
  },
  {
    id: "f049",
    name: "Report Content",
    category: "Security",
    description: "Report inappropriate content",
    status: "implemented",
    priority: "high",
  },

  // Live Features
  {
    id: "f050",
    name: "Go Live",
    category: "Live",
    description: "Start live broadcasts",
    status: "implemented",
    priority: "high",
  },
  {
    id: "f051",
    name: "Watch Live",
    category: "Live",
    description: "View live streams",
    status: "implemented",
    priority: "high",
  },
  {
    id: "f052",
    name: "Live Gifts",
    category: "Live",
    description: "Send gifts during live streams",
    status: "implemented",
    priority: "high",
  },
  {
    id: "f053",
    name: "Live Comments",
    category: "Live",
    description: "Real-time chat during streams",
    status: "implemented",
    priority: "high",
  },
  {
    id: "f054",
    name: "Live Guests",
    category: "Live",
    description: "Invite viewers to join live",
    status: "partial",
    priority: "medium",
  },

  // AI/ML Features
  {
    id: "f055",
    name: "3-Tier Recommendation",
    category: "AI/ML",
    description: "Advanced recommendation algorithm",
    status: "implemented",
    priority: "critical",
  },
  {
    id: "f056",
    name: "Content Moderation",
    category: "AI/ML",
    description: "AI-powered content filtering",
    status: "implemented",
    priority: "critical",
  },
  {
    id: "f057",
    name: "Toxicity Detection",
    category: "AI/ML",
    description: "Detect harmful comments",
    status: "implemented",
    priority: "high",
  },
  {
    id: "f058",
    name: "Auto-Captions",
    category: "AI/ML",
    description: "Generate video captions automatically",
    status: "partial",
    priority: "medium",
  },

  // Admin Features
  {
    id: "f059",
    name: "Admin Panel",
    category: "Admin",
    description: "Administrative controls",
    status: "implemented",
    priority: "high",
  },
  {
    id: "f060",
    name: "Algorithm Control",
    category: "Admin",
    description: "Adjust recommendation parameters",
    status: "implemented",
    priority: "high",
  },
  {
    id: "f061",
    name: "Moderation Queue",
    category: "Admin",
    description: "Review flagged content",
    status: "implemented",
    priority: "high",
  },
  {
    id: "f062",
    name: "User Management",
    category: "Admin",
    description: "Manage user accounts",
    status: "implemented",
    priority: "high",
  },

  // Performance
  {
    id: "f063",
    name: "Video Preloading",
    category: "Performance",
    description: "Preload next videos for smooth playback",
    status: "implemented",
    priority: "high",
  },
  {
    id: "f064",
    name: "Optimized Images",
    category: "Performance",
    description: "Lazy loading and optimized images",
    status: "implemented",
    priority: "medium",
  },

  // Accessibility
  {
    id: "f065",
    name: "Screen Reader Support",
    category: "Accessibility",
    description: "Compatible with screen readers",
    status: "partial",
    priority: "medium",
  },
  {
    id: "f066",
    name: "High Contrast Mode",
    category: "Accessibility",
    description: "Enhanced visibility option",
    status: "partial",
    priority: "low",
  },

  // Gamification
  {
    id: "f067",
    name: "Daily Rewards",
    category: "Gamification",
    description: "Login bonuses and streaks",
    status: "partial",
    priority: "medium",
  },
  {
    id: "f068",
    name: "Badges",
    category: "Gamification",
    description: "Achievement badges for milestones",
    status: "partial",
    priority: "low",
  },
  {
    id: "f069",
    name: "Leaderboards",
    category: "Gamification",
    description: "Creator rankings and leaderboards",
    status: "partial",
    priority: "low",
  },
  {
    id: "f070",
    name: "Missions",
    category: "Gamification",
    description: "Daily and weekly missions for rewards",
    status: "partial",
    priority: "low",
  },
]

// Get features by category
export function getFeaturesByCategory(category: string): Feature[] {
  return featureCatalog.filter((f) => f.category === category)
}

// Get features by status
export function getFeaturesByStatus(status: Feature["status"]): Feature[] {
  return featureCatalog.filter((f) => f.status === status)
}

// Get feature stats
export function getFeatureStats() {
  const total = featureCatalog.length
  const implemented = featureCatalog.filter((f) => f.status === "implemented").length
  const partial = featureCatalog.filter((f) => f.status === "partial").length
  const planned = featureCatalog.filter((f) => f.status === "planned").length

  return {
    total,
    implemented,
    partial,
    planned,
    implementedPercentage: Math.round((implemented / total) * 100),
    completionPercentage: Math.round(((implemented + partial * 0.5) / total) * 100),
  }
}
