"use client"

import { useState } from "react"
import { X, Globe, Users, Lock, Camera, ImageIcon, Music, Sparkles, Video, Mic, Film } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"
import { useApp } from "@/contexts/app-context"
import { cn } from "@/lib/utils"

const privacyOptions = [
  { id: "public", label: "Public", icon: Globe },
  { id: "friends", label: "Friends", icon: Users },
  { id: "private", label: "Private", icon: Lock },
]

const creationOptions = [
  { id: "camera", icon: Camera, label: "Record" },
  { id: "gallery", icon: ImageIcon, label: "Gallery" },
  { id: "duet", icon: Film, label: "Duet" },
  { id: "live", icon: Video, label: "Go Live" },
]

interface CreateScreenProps {
  onNavigate?: (screen: string) => void
}

export function CreateScreen({ onNavigate }: CreateScreenProps) {
  const { setActiveTab } = useApp()
  const [caption, setCaption] = useState("")
  const [hashtags, setHashtags] = useState("")
  const [privacy, setPrivacy] = useState("public")
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isRecording, setIsRecording] = useState(false)

  const handleClose = () => {
    setActiveTab("home")
  }

  const handlePost = () => {
    // Post logic
    setActiveTab("home")
  }

  const handleOptionClick = (optionId: string) => {
    setSelectedOption(optionId)
    switch (optionId) {
      case "live":
        onNavigate?.("goLiveSetup")
        break
      case "duet":
        onNavigate?.("duet")
        break
      case "camera":
        setIsRecording(true)
        break
      case "gallery":
        // Open gallery picker
        break
    }
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 safe-top">
        <button onClick={handleClose} className="w-10 h-10 flex items-center justify-center glass rounded-full">
          <X className="w-5 h-5 text-white" />
        </button>
        <h1 className="font-bold text-white text-lg">New Post</h1>
        <div className="w-10" />
      </div>

      <div className="px-4 mb-6">
        <div className="flex gap-3 justify-center">
          {creationOptions.map((option) => {
            const Icon = option.icon
            return (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option.id)}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-2xl transition-all",
                  selectedOption === option.id ? "glass border-2 border-pink-500" : "glass",
                )}
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center",
                    option.id === "live" ? "bg-red-500" : "bg-pink-500/20",
                  )}
                >
                  <Icon className={cn("w-6 h-6", option.id === "live" ? "text-white" : "text-pink-400")} />
                </div>
                <span className="text-xs text-white">{option.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 space-y-6">
        {/* Cover and caption */}
        <div className="flex gap-4">
          <div className="relative">
            <img
              src="/video-preview-concept.png"
              alt="Cover"
              className="w-32 h-44 rounded-2xl object-cover bg-white/10"
            />
            <button className="absolute bottom-2 left-2 right-2 text-center text-xs text-white/70 bg-black/50 py-1 rounded-lg">
              Select cover
            </button>
          </div>
          <div className="flex-1 space-y-3">
            <textarea
              placeholder="Write a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full h-28 px-4 py-3 bg-white rounded-2xl text-gray-900 placeholder:text-gray-500 outline-none resize-none"
            />
            <input
              type="text"
              placeholder="Add hashtags..."
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              className="w-full px-4 py-3 bg-white rounded-2xl text-gray-900 placeholder:text-gray-500 outline-none"
            />
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          <button
            onClick={() => onNavigate?.("editor")}
            className="flex items-center gap-2 px-4 py-2 glass rounded-xl whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span className="text-white text-sm">Effects</span>
          </button>
          <button
            onClick={() => onNavigate?.("sounds")}
            className="flex items-center gap-2 px-4 py-2 glass rounded-xl whitespace-nowrap"
          >
            <Music className="w-4 h-4 text-pink-400" />
            <span className="text-white text-sm">Add Sound</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 glass rounded-xl whitespace-nowrap">
            <Mic className="w-4 h-4 text-pink-400" />
            <span className="text-white text-sm">Voiceover</span>
          </button>
        </div>

        {/* Privacy options */}
        <div>
          <h2 className="text-white font-semibold mb-3">Who can watch this video</h2>
          <div className="flex gap-3">
            {privacyOptions.map((option) => {
              const Icon = option.icon
              return (
                <button
                  key={option.id}
                  onClick={() => setPrivacy(option.id)}
                  className={cn(
                    "flex-1 flex flex-col items-center gap-2 py-4 rounded-2xl transition-all",
                    privacy === option.id ? "glass border-2 border-purple-400" : "glass",
                  )}
                >
                  <Icon className="w-5 h-5 text-white" />
                  <span className="text-sm text-white">{option.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Post button */}
        <GradientButton onClick={handlePost} className="w-full py-4 text-lg">
          Post
        </GradientButton>
      </div>
    </div>
  )
}
