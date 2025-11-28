"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Bookmark,
  FolderPlus,
  MoreVertical,
  Grid,
  List,
  Play,
  Lock,
  Globe,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SavedVideosScreenProps {
  onBack: () => void
}

interface Collection {
  id: string
  name: string
  isPrivate: boolean
  videos: SavedVideo[]
  thumbnail: string
}

interface SavedVideo {
  id: string
  thumbnail: string
  views: string
  author: string
  savedAt: number
}

const mockCollections: Collection[] = [
  {
    id: "all",
    name: "All Saved",
    isPrivate: true,
    thumbnail: "/video-one.png",
    videos: [
      { id: "1", thumbnail: "/video-one.png", views: "2.5M", author: "@creator1", savedAt: Date.now() - 86400000 },
      { id: "2", thumbnail: "/video-2.png", views: "1.8M", author: "@creator2", savedAt: Date.now() - 172800000 },
      { id: "3", thumbnail: "/video-3.jpg", views: "950K", author: "@creator3", savedAt: Date.now() - 259200000 },
      { id: "4", thumbnail: "/video-4.jpg", views: "3.2M", author: "@creator4", savedAt: Date.now() - 345600000 },
    ],
  },
  {
    id: "recipes",
    name: "Recipes",
    isPrivate: false,
    thumbnail: "/cooking-food.png",
    videos: [
      { id: "5", thumbnail: "/cooking-food.png", views: "500K", author: "@foodie", savedAt: Date.now() - 86400000 },
    ],
  },
  {
    id: "dance",
    name: "Dance Tutorials",
    isPrivate: true,
    thumbnail: "/vibrant-dance-party.png",
    videos: [
      {
        id: "6",
        thumbnail: "/vibrant-dance-party.png",
        views: "1.2M",
        author: "@dancer",
        savedAt: Date.now() - 86400000,
      },
    ],
  },
]

export function SavedVideosScreen({ onBack }: SavedVideosScreenProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newCollectionName, setNewCollectionName] = useState("")
  const [newCollectionPrivate, setNewCollectionPrivate] = useState(true)

  const handleCreateCollection = () => {
    if (!newCollectionName.trim()) return
    // Create collection logic here
    setShowCreateModal(false)
    setNewCollectionName("")
  }

  if (selectedCollection) {
    return (
      <div className="min-h-screen pb-20">
        <div className="px-4 pt-12 pb-4 safe-top glass sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => setSelectedCollection(null)} className="p-2 -ml-2">
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-white flex items-center gap-2">
                  {selectedCollection.name}
                  {selectedCollection.isPrivate ? (
                    <Lock className="w-4 h-4 text-white/50" />
                  ) : (
                    <Globe className="w-4 h-4 text-white/50" />
                  )}
                </h1>
                <p className="text-sm text-white/60">{selectedCollection.videos.length} videos</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className="p-2 glass rounded-full"
              >
                {viewMode === "grid" ? (
                  <List className="w-5 h-5 text-white" />
                ) : (
                  <Grid className="w-5 h-5 text-white" />
                )}
              </button>
              <button className="p-2 glass rounded-full">
                <MoreVertical className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        <div className="px-4 py-4">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-3 gap-1">
              {selectedCollection.videos.map((video) => (
                <button key={video.id} className="relative aspect-[9/16] rounded-lg overflow-hidden">
                  <img src={video.thumbnail || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                  <div className="absolute bottom-1 left-1 flex items-center gap-1 text-white text-xs">
                    <Play className="w-3 h-3 fill-white" />
                    {video.views}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {selectedCollection.videos.map((video) => (
                <button key={video.id} className="w-full flex gap-3 glass rounded-xl p-3">
                  <div className="relative w-24 h-32 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={video.thumbnail || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play className="w-8 h-8 text-white fill-white" />
                    </div>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-white">{video.author}</p>
                    <p className="text-sm text-white/60">{video.views} views</p>
                    <p className="text-xs text-white/40 mt-2">Saved {new Date(video.savedAt).toLocaleDateString()}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="px-4 pt-12 pb-4 safe-top glass sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 -ml-2">
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-white">Saved</h1>
              <p className="text-sm text-white/60">Your saved videos and collections</p>
            </div>
          </div>
          <button onClick={() => setShowCreateModal(true)} className="p-2 glass rounded-full">
            <FolderPlus className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {mockCollections.map((collection) => (
          <button
            key={collection.id}
            onClick={() => setSelectedCollection(collection)}
            className="w-full glass rounded-xl p-4 flex items-center gap-4"
          >
            <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
              <img src={collection.thumbnail || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <Bookmark className="w-5 h-5 text-white fill-white" />
              </div>
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-white flex items-center gap-2">
                {collection.name}
                {collection.isPrivate ? (
                  <Lock className="w-3 h-3 text-white/50" />
                ) : (
                  <Globe className="w-3 h-3 text-white/50" />
                )}
              </p>
              <p className="text-sm text-white/60">{collection.videos.length} videos</p>
            </div>
            <ChevronRight className="w-5 h-5 text-white/50" />
          </button>
        ))}
      </div>

      {/* Create collection modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass rounded-2xl p-6 w-full max-w-sm space-y-4">
            <h3 className="text-lg font-bold text-white">New Collection</h3>
            <input
              type="text"
              placeholder="Collection name"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 rounded-xl text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-pink-500"
            />
            <div className="flex items-center justify-between">
              <span className="text-white/70">Private collection</span>
              <button
                onClick={() => setNewCollectionPrivate(!newCollectionPrivate)}
                className={cn(
                  "w-12 h-6 rounded-full transition-colors",
                  newCollectionPrivate ? "bg-pink-500" : "bg-white/20",
                )}
              >
                <div
                  className={cn(
                    "w-5 h-5 bg-white rounded-full transition-transform",
                    newCollectionPrivate ? "translate-x-6" : "translate-x-0.5",
                  )}
                />
              </button>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 py-3 glass rounded-xl text-white font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCollection}
                className="flex-1 py-3 gradient-button rounded-xl text-white font-semibold"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
