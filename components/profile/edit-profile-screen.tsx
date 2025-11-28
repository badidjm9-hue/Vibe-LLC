"use client"

import { useState } from "react"
import { ArrowLeft, Camera } from "lucide-react"
import { useApp } from "@/contexts/app-context"
import { GradientButton } from "@/components/ui/gradient-button"

interface EditProfileScreenProps {
  onBack: () => void
}

export function EditProfileScreen({ onBack }: EditProfileScreenProps) {
  const { user } = useApp()
  const [displayName, setDisplayName] = useState(user?.displayName || "")
  const [username, setUsername] = useState(user?.username || "")
  const [bio, setBio] = useState(user?.bio || "")
  const [website, setWebsite] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    onBack()
  }

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 safe-top glass flex items-center justify-between">
        <button onClick={onBack} className="p-2 -ml-2">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-lg font-bold text-white">Edit Profile</h1>
        <div className="w-10" />
      </div>

      {/* Avatar */}
      <div className="flex flex-col items-center py-8">
        <div className="relative">
          <img
            src={user?.avatar || "/placeholder.svg?height=120&width=120&query=user avatar"}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-pink-500/50"
          />
          <button className="absolute bottom-0 right-0 w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center border-4 border-background">
            <Camera className="w-5 h-5 text-white" />
          </button>
        </div>
        <button className="mt-4 text-pink-400 font-medium">Change Photo</button>
      </div>

      {/* Form */}
      <div className="px-4 space-y-6">
        <div>
          <label className="text-sm text-white/60 mb-2 block">Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 rounded-xl text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Your display name"
          />
        </div>

        <div>
          <label className="text-sm text-white/60 mb-2 block">Username</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">@</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-8 pr-4 py-3 bg-white/10 rounded-xl text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="username"
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-white/60 mb-2 block">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            maxLength={150}
            className="w-full px-4 py-3 bg-white/10 rounded-xl text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-pink-500 resize-none"
            placeholder="Tell us about yourself"
          />
          <p className="text-xs text-white/40 mt-1 text-right">{bio.length}/150</p>
        </div>

        <div>
          <label className="text-sm text-white/60 mb-2 block">Website</label>
          <input
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 rounded-xl text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="https://yourwebsite.com"
          />
        </div>

        {/* Social Links */}
        <div>
          <label className="text-sm text-white/60 mb-2 block">Social Links</label>
          <div className="space-y-2">
            {["Instagram", "Twitter", "YouTube"].map((platform) => (
              <div key={platform} className="flex items-center gap-3 glass rounded-xl p-3">
                <span className="text-white/60 text-sm w-24">{platform}</span>
                <input
                  type="text"
                  className="flex-1 bg-transparent text-white placeholder:text-white/40 outline-none"
                  placeholder={`Add ${platform} link`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <GradientButton onClick={handleSave} disabled={isSaving} className="w-full py-4 mt-6">
          {isSaving ? "Saving..." : "Save Changes"}
        </GradientButton>
      </div>
    </div>
  )
}
