"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Eye, Lock, Users, MessageCircle, AtSign, Download } from "lucide-react"

interface PrivacySettingsScreenProps {
  onBack: () => void
}

export function PrivacySettingsScreen({ onBack }: PrivacySettingsScreenProps) {
  const [accountPrivacy, setAccountPrivacy] = useState<"public" | "private">("public")
  const [allowComments, setAllowComments] = useState<"everyone" | "followers" | "off">("everyone")
  const [allowDuets, setAllowDuets] = useState<"everyone" | "followers" | "off">("followers")
  const [allowStitch, setAllowStitch] = useState<"everyone" | "followers" | "off">("followers")
  const [allowMessages, setAllowMessages] = useState<"everyone" | "followers" | "off">("followers")
  const [allowMentions, setAllowMentions] = useState<"everyone" | "followers" | "off">("everyone")
  const [allowDownloads, setAllowDownloads] = useState(true)

  const OptionSelector = ({
    label,
    icon: Icon,
    value,
    onChange,
    options,
  }: {
    label: string
    icon: React.ElementType
    value: string
    onChange: (val: any) => void
    options: { key: string; label: string }[]
  }) => (
    <div className="glass rounded-2xl p-4 mb-3">
      <div className="flex items-center gap-3 mb-3">
        <Icon className="w-5 h-5 text-white/70" />
        <span className="text-white font-medium">{label}</span>
      </div>
      <div className="flex gap-2">
        {options.map((opt) => (
          <button
            key={opt.key}
            onClick={() => onChange(opt.key)}
            className={`flex-1 py-2 rounded-xl text-sm transition-all ${
              value === opt.key ? "gradient-button text-white" : "bg-white/10 text-white/60"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 safe-top glass">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-bold text-white">Privacy Settings</h1>
        </div>
      </div>

      <div className="px-4 mt-6">
        {/* Account Privacy */}
        <h2 className="text-sm text-white/50 font-semibold mb-3">Account Privacy</h2>
        <div className="glass rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-white/70" />
              <div>
                <p className="text-white font-medium">Private Account</p>
                <p className="text-sm text-white/50">Only followers can see your content</p>
              </div>
            </div>
            <button
              onClick={() => setAccountPrivacy(accountPrivacy === "public" ? "private" : "public")}
              className={`w-12 h-7 rounded-full p-1 transition-colors ${
                accountPrivacy === "private" ? "bg-pink-500" : "bg-white/20"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  accountPrivacy === "private" ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Interactions */}
        <h2 className="text-sm text-white/50 font-semibold mb-3">Interactions</h2>

        <OptionSelector
          label="Who can comment"
          icon={MessageCircle}
          value={allowComments}
          onChange={setAllowComments}
          options={[
            { key: "everyone", label: "Everyone" },
            { key: "followers", label: "Followers" },
            { key: "off", label: "Off" },
          ]}
        />

        <OptionSelector
          label="Who can duet"
          icon={Users}
          value={allowDuets}
          onChange={setAllowDuets}
          options={[
            { key: "everyone", label: "Everyone" },
            { key: "followers", label: "Followers" },
            { key: "off", label: "Off" },
          ]}
        />

        <OptionSelector
          label="Who can stitch"
          icon={Eye}
          value={allowStitch}
          onChange={setAllowStitch}
          options={[
            { key: "everyone", label: "Everyone" },
            { key: "followers", label: "Followers" },
            { key: "off", label: "Off" },
          ]}
        />

        <OptionSelector
          label="Who can message"
          icon={MessageCircle}
          value={allowMessages}
          onChange={setAllowMessages}
          options={[
            { key: "everyone", label: "Everyone" },
            { key: "followers", label: "Followers" },
            { key: "off", label: "Off" },
          ]}
        />

        <OptionSelector
          label="Who can mention"
          icon={AtSign}
          value={allowMentions}
          onChange={setAllowMentions}
          options={[
            { key: "everyone", label: "Everyone" },
            { key: "followers", label: "Followers" },
            { key: "off", label: "Off" },
          ]}
        />

        {/* Downloads */}
        <div className="glass rounded-2xl p-4 mt-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-white/70" />
              <div>
                <p className="text-white font-medium">Allow video downloads</p>
                <p className="text-sm text-white/50">Others can save your videos</p>
              </div>
            </div>
            <button
              onClick={() => setAllowDownloads(!allowDownloads)}
              className={`w-12 h-7 rounded-full p-1 transition-colors ${
                allowDownloads ? "bg-pink-500" : "bg-white/20"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  allowDownloads ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
