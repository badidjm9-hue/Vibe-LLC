"use client"

import { useState } from "react"
import {
  ArrowLeft,
  User,
  Bell,
  Shield,
  Lock,
  Eye,
  Moon,
  Globe,
  HelpCircle,
  FileText,
  LogOut,
  ChevronRight,
  Smartphone,
  Key,
  UserX,
  Trash2,
  Fingerprint,
  Coins,
  Settings2,
  DollarSign,
  BarChart3,
  Palette,
  Download,
  Database,
  Cpu,
} from "lucide-react"
import { useApp } from "@/contexts/app-context"

interface SettingsScreenProps {
  onBack: () => void
  onNavigate: (screen: string) => void
}

export function SettingsScreen({ onBack, onNavigate }: SettingsScreenProps) {
  const { user, logout } = useApp()
  const [darkMode, setDarkMode] = useState(true)

  const settingsSections = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Edit Profile", action: () => onNavigate("editProfile") },
        { icon: Key, label: "Change Password", action: () => onNavigate("changePassword") },
        { icon: Smartphone, label: "Two-Factor Auth", action: () => onNavigate("twoFactor"), badge: "OFF" },
        { icon: Coins, label: "Coin Store", action: () => onNavigate("coinStore") },
      ],
    },
    {
      title: "Creator Tools",
      items: [
        { icon: DollarSign, label: "Monetization", action: () => onNavigate("monetization"), badge: "$1,234" },
        { icon: BarChart3, label: "Analytics", action: () => onNavigate("analytics") },
        { icon: Palette, label: "Content Studio", action: () => onNavigate("editor") },
      ],
    },
    {
      title: "Privacy & Security",
      items: [
        { icon: Lock, label: "Privacy Settings", action: () => onNavigate("privacy") },
        { icon: Eye, label: "Account Visibility", action: () => onNavigate("visibility") },
        { icon: Shield, label: "Blocked Accounts", action: () => onNavigate("blocked") },
        { icon: Fingerprint, label: "App Lock", action: () => onNavigate("appLock") },
      ],
    },
    {
      title: "Notifications",
      items: [{ icon: Bell, label: "Push Notifications", action: () => onNavigate("notifications") }],
    },
    {
      title: "Preferences",
      items: [
        { icon: Moon, label: "Dark Mode", toggle: true, value: darkMode, onChange: setDarkMode },
        { icon: Globe, label: "Language", action: () => onNavigate("language"), subtitle: "English" },
      ],
    },
    {
      title: "Admin",
      items: [
        { icon: Settings2, label: "Admin Panel", action: () => onNavigate("admin"), admin: true },
        { icon: Cpu, label: "Algorithm Control", action: () => onNavigate("algorithm"), admin: true },
        { icon: Shield, label: "Content Moderation", action: () => onNavigate("moderation"), admin: true },
      ],
    },
    {
      title: "Data & Storage",
      items: [
        { icon: Download, label: "Download Your Data", action: () => onNavigate("downloadData") },
        { icon: Database, label: "Clear Cache", action: () => onNavigate("clearCache"), subtitle: "234 MB" },
      ],
    },
    {
      title: "Support",
      items: [
        { icon: HelpCircle, label: "Help Center", action: () => onNavigate("help") },
        { icon: FileText, label: "Terms of Service", action: () => onNavigate("terms") },
        { icon: FileText, label: "Privacy Policy", action: () => onNavigate("privacyPolicy") },
      ],
    },
    {
      title: "Account Actions",
      items: [
        { icon: UserX, label: "Deactivate Account", action: () => onNavigate("deactivate"), danger: true },
        { icon: Trash2, label: "Delete Account", action: () => onNavigate("delete"), danger: true },
      ],
    },
  ]

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 safe-top glass">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-bold text-white">Settings</h1>
        </div>
      </div>

      {/* User info */}
      <div className="px-4 mt-4">
        <div className="glass rounded-2xl p-4 flex items-center gap-4">
          <img
            src={user?.avatar || "/placeholder.svg"}
            alt={user?.displayName}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <p className="text-white font-semibold text-lg">{user?.displayName}</p>
            <p className="text-white/60">@{user?.username}</p>
          </div>
          <button onClick={() => onNavigate("editProfile")} className="px-4 py-2 glass rounded-full">
            <span className="text-white text-sm">Edit</span>
          </button>
        </div>
      </div>

      {/* Settings sections */}
      <div className="px-4 mt-6 space-y-6">
        {settingsSections.map((section) => (
          <div key={section.title}>
            <h2 className="text-sm text-white/50 font-semibold mb-2 px-1">{section.title}</h2>
            <div className="glass rounded-2xl overflow-hidden">
              {section.items.map((item, i) => (
                <button
                  key={item.label}
                  onClick={item.toggle ? undefined : item.action}
                  className={`w-full p-4 flex items-center gap-3 ${
                    i < section.items.length - 1 ? "border-b border-white/10" : ""
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 ${item.danger ? "text-red-400" : item.admin ? "text-purple-400" : "text-white/70"}`}
                  />
                  <span
                    className={`flex-1 text-left ${item.danger ? "text-red-400" : item.admin ? "text-purple-400" : "text-white"}`}
                  >
                    {item.label}
                  </span>
                  {item.subtitle && <span className="text-sm text-white/50">{item.subtitle}</span>}
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-xs text-green-400 font-medium">
                      {item.badge}
                    </span>
                  )}
                  {item.toggle ? (
                    <button
                      onClick={() => item.onChange?.(!item.value)}
                      className={`w-12 h-7 rounded-full p-1 transition-colors ${
                        item.value ? "bg-pink-500" : "bg-white/20"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white transition-transform ${
                          item.value ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  ) : (
                    <ChevronRight className="w-5 h-5 text-white/30" />
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Logout */}
      <div className="px-4 mt-6">
        <button onClick={logout} className="w-full glass rounded-2xl p-4 flex items-center justify-center gap-2">
          <LogOut className="w-5 h-5 text-red-400" />
          <span className="text-red-400 font-semibold">Log Out</span>
        </button>
      </div>

      {/* Version */}
      <div className="text-center mt-6">
        <p className="text-sm text-white/30">Vibe v2.0.0</p>
      </div>
    </div>
  )
}
