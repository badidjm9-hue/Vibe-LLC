"use client"

import { useState } from "react"
import { Heart, MessageCircle, Share2, Bookmark, Gift, Music2, ChevronDown } from "lucide-react"
import { ActionButton } from "@/components/ui/action-button"
import { ShareSheet } from "@/components/share/share-sheet"
import { GiftSheet } from "@/components/gift/gift-sheet"
import { CommentsSheet } from "@/components/comments/comments-sheet"
import { useApp } from "@/contexts/app-context"
import { cn } from "@/lib/utils"

interface VideoCardProps {
  video: {
    id: string
    username: string
    userAvatar: string
    videoUrl: string
    thumbnailUrl: string
    caption: string
    hashtags: string[]
    soundName: string
    soundAuthor: string
    likes: number
    comments: number
    shares: number
    saves: number
    isLiked: boolean
    isSaved: boolean
    isFollowing: boolean
  }
  isActive: boolean
  onNavigateToProfile?: (user: {
    id: string
    username: string
    avatar: string
    isFollowing?: boolean
  }) => void
}

export function VideoCard({ video, isActive, onNavigateToProfile }: VideoCardProps) {
  const { likeVideo, saveVideo, followUser } = useApp()
  const [showShare, setShowShare] = useState(false)
  const [showGift, setShowGift] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const [isLikeAnimating, setIsLikeAnimating] = useState(false)

  const handleDoubleTap = () => {
    if (!video.isLiked) {
      likeVideo(video.id)
      setIsLikeAnimating(true)
      setTimeout(() => setIsLikeAnimating(false), 600)
    }
  }

  const handleLike = () => {
    likeVideo(video.id)
    if (!video.isLiked) {
      setIsLikeAnimating(true)
      setTimeout(() => setIsLikeAnimating(false), 600)
    }
  }

  const handleProfileClick = () => {
    if (onNavigateToProfile) {
      onNavigateToProfile({
        id: video.id,
        username: video.username,
        avatar: video.userAvatar,
        isFollowing: video.isFollowing,
      })
    }
  }

  return (
    <div className="relative h-full w-full bg-black" onDoubleClick={handleDoubleTap}>
      {/* Video/Image Background */}
      <div className="absolute inset-0">
        <img src={video.thumbnailUrl || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
      </div>

      {/* Double tap heart animation */}
      {isLikeAnimating && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <Heart className="w-32 h-32 text-pink-500 fill-pink-500 animate-heart-pop" />
        </div>
      )}

      {/* Top indicator */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-10">
        <ChevronDown className="w-6 h-6 text-white/50" />
      </div>

      {/* Right action buttons */}
      <div className="absolute right-4 bottom-32 flex flex-col gap-5 z-10">
        <ActionButton icon={<Gift className="w-6 h-6 text-white" />} label="Gift" onClick={() => setShowGift(true)} />
        <ActionButton
          icon={
            <Heart
              className={cn("w-6 h-6 transition-all", video.isLiked ? "text-pink-500 fill-pink-500" : "text-white")}
            />
          }
          count={video.likes}
          active={video.isLiked}
          onClick={handleLike}
        />
        <ActionButton
          icon={<MessageCircle className="w-6 h-6 text-white" />}
          count={video.comments}
          onClick={() => setShowComments(true)}
        />
        <ActionButton
          icon={<Share2 className="w-6 h-6 text-white" />}
          count={video.shares}
          onClick={() => setShowShare(true)}
        />
        <ActionButton
          icon={
            <Bookmark
              className={cn("w-6 h-6 transition-all", video.isSaved ? "text-white fill-white" : "text-white")}
            />
          }
          count={video.saves}
          active={video.isSaved}
          onClick={() => saveVideo(video.id)}
        />

        <button className="relative mt-2" onClick={handleProfileClick}>
          <img
            src={video.userAvatar || "/placeholder.svg"}
            alt={video.username}
            className="w-12 h-12 rounded-full border-2 border-white object-cover hover:border-pink-500 transition-colors"
          />
        </button>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-24 left-4 right-20 z-10">
        <div className="flex items-center gap-2 mb-2">
          <button onClick={handleProfileClick} className="font-bold text-white hover:text-pink-400 transition-colors">
            @{video.username}
          </button>
          {!video.isFollowing && (
            <button
              onClick={() => followUser(video.id)}
              className="px-3 py-1 text-sm font-semibold text-white border border-white rounded-lg hover:bg-white/10 transition-colors"
            >
              Follow
            </button>
          )}
        </div>

        <p className="text-white text-sm leading-relaxed">
          {showMore ? video.caption : video.caption.slice(0, 80)}
          {video.caption.length > 80 && (
            <button onClick={() => setShowMore(!showMore)} className="text-white/70 ml-1">
              {showMore ? " less" : "... more"}
            </button>
          )}
        </p>

        <div className="flex gap-2 mt-2">
          {video.hashtags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/90">
              #{tag}
            </span>
          ))}
        </div>

        {/* Sound info */}
        <div className="flex items-center gap-2 mt-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center animate-spin-slow">
            <Music2 className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-white text-sm truncate">
              {video.soundName} • {video.soundAuthor}
            </p>
          </div>
        </div>
      </div>

      {/* Sheets */}
      <ShareSheet isOpen={showShare} onClose={() => setShowShare(false)} />
      <GiftSheet isOpen={showGift} onClose={() => setShowGift(false)} />
      <CommentsSheet
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        videoId={video.id}
        onNavigateToProfile={onNavigateToProfile}
      />
    </div>
  )
}
