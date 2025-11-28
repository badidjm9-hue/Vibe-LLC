"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Shield, Lock, Eye, EyeOff } from "lucide-react"
import { AdminPanel } from "@/components/admin/admin-panel"

export default function AdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Admin password - in production this should be handled securely
  const ADMIN_PASSWORD = "admin123"

  useEffect(() => {
    // Check if already authenticated
    const adminAuth = sessionStorage.getItem("admin_auth")
    if (adminAuth === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_auth", "true")
      setIsAuthenticated(true)
    } else {
      setError("Incorrect password")
    }
    setIsLoading(false)
  }

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth")
    setIsAuthenticated(false)
    setPassword("")
  }

  // Admin login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Back button */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to App</span>
          </button>

          {/* Login card */}
          <div className="glass-dark rounded-3xl p-8">
            <div className="flex flex-col items-center mb-8">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mb-4">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
              <p className="text-white/60 text-sm mt-2">Enter your credentials to continue</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-white/60 text-sm mb-2">Admin Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="w-full px-12 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !password}
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:shadow-pink-500/30"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Authenticating...</span>
                  </div>
                ) : (
                  "Access Admin Panel"
                )}
              </button>
            </form>

            <p className="text-white/40 text-xs text-center mt-6">
              This area is restricted to authorized personnel only.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Authenticated admin panel
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      <AdminPanel onBack={() => router.push("/")} onLogout={handleLogout} isStandalone />
    </div>
  )
}
