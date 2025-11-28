"use client"

import { useState } from "react"
import { ArrowLeft, Search, Check, Camera, X } from "lucide-react"
import { mockChatUsers } from "@/lib/chat/chat-store"
import type { ChatUser } from "@/lib/chat/chat-types"
import { cn } from "@/lib/utils"

interface CreateGroupScreenProps {
  onBack: () => void
  onCreateGroup: (name: string, participants: ChatUser[], description?: string) => void
}

export function CreateGroupScreen({ onBack, onCreateGroup }: CreateGroupScreenProps) {
  const [step, setStep] = useState<"select" | "details">("select")
  const [selectedUsers, setSelectedUsers] = useState<ChatUser[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [groupName, setGroupName] = useState("")
  const [groupDescription, setGroupDescription] = useState("")

  const filteredUsers = mockChatUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleUser = (user: ChatUser) => {
    if (selectedUsers.some((u) => u.id === user.id)) {
      setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id))
    } else {
      setSelectedUsers([...selectedUsers, user])
    }
  }

  const handleCreate = () => {
    if (groupName.trim() && selectedUsers.length > 0) {
      onCreateGroup(groupName, selectedUsers, groupDescription)
    }
  }

  if (step === "details") {
    return (
      <div className="min-h-screen">
        {/* Header */}
        <div className="px-4 pt-12 pb-4 safe-top glass">
          <div className="flex items-center gap-3">
            <button onClick={() => setStep("select")} className="p-2 -ml-2">
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-lg font-semibold text-white flex-1">New Group</h1>
            <button
              onClick={handleCreate}
              disabled={!groupName.trim()}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                groupName.trim() ? "gradient-button text-white" : "bg-white/10 text-white/40",
              )}
            >
              Create
            </button>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Group avatar */}
          <div className="flex justify-center">
            <button className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Camera className="w-4 h-4 text-white" />
              </div>
            </button>
          </div>

          {/* Group name */}
          <div>
            <label className="text-sm text-white/60 mb-2 block">Group Name</label>
            <input
              type="text"
              placeholder="Enter group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 rounded-2xl text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Group description */}
          <div>
            <label className="text-sm text-white/60 mb-2 block">Description (optional)</label>
            <textarea
              placeholder="What's this group about?"
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 bg-white/10 rounded-2xl text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-pink-500 resize-none"
            />
          </div>

          {/* Selected participants */}
          <div>
            <label className="text-sm text-white/60 mb-2 block">Participants ({selectedUsers.length})</label>
            <div className="flex flex-wrap gap-2">
              {selectedUsers.map((user) => (
                <div key={user.id} className="flex items-center gap-2 bg-white/10 rounded-full pl-1 pr-3 py-1">
                  <img
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-sm text-white">{user.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 safe-top glass">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-lg font-semibold text-white flex-1">Add Participants</h1>
          <button
            onClick={() => setStep("details")}
            disabled={selectedUsers.length === 0}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all",
              selectedUsers.length > 0 ? "gradient-button text-white" : "bg-white/10 text-white/40",
            )}
          >
            Next
          </button>
        </div>

        {/* Search */}
        <div className="relative mt-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/10 rounded-2xl text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Selected users preview */}
        {selectedUsers.length > 0 && (
          <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar">
            {selectedUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => toggleUser(user)}
                className="flex flex-col items-center gap-1 flex-shrink-0"
              >
                <div className="relative">
                  <img
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center">
                    <X className="w-3 h-3 text-white" />
                  </div>
                </div>
                <span className="text-xs text-white/70 max-w-[60px] truncate">{user.name.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* User list */}
      <div className="p-4 space-y-2">
        {filteredUsers.map((user) => {
          const isSelected = selectedUsers.some((u) => u.id === user.id)

          return (
            <button
              key={user.id}
              onClick={() => toggleUser(user)}
              className="w-full glass rounded-2xl p-4 flex items-center gap-3"
            >
              <div className="relative">
                <img
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {user.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                )}
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-white">{user.name}</p>
                <p className="text-sm text-white/60">@{user.username}</p>
              </div>
              <div
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center transition-colors",
                  isSelected ? "bg-pink-500" : "border-2 border-white/30",
                )}
              >
                {isSelected && <Check className="w-4 h-4 text-white" />}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
