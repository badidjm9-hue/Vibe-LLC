"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Phone } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"
import { useApp } from "@/contexts/app-context"
import { cn } from "@/lib/utils"

export function LoginScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState("")
  const { login, signup, isLoading } = useApp()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLogin) {
      await login(email, password)
    } else {
      await signup(email, password, username)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="w-20 h-20 rounded-2xl overflow-hidden mb-8">
        <img src="/images/logo.png" alt="App Logo" className="w-full h-full object-cover" />
      </div>

      <h1 className="text-3xl font-bold text-white mb-2">{isLogin ? "Welcome Back" : "Create Account"}</h1>
      <p className="text-white/60 mb-8">{isLogin ? "Log in to your account to continue" : "Sign up to get started"}</p>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        {!isLogin && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-4 bg-white rounded-2xl text-gray-900 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-pink-500"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-4 bg-white rounded-2xl text-gray-900 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-pink-500"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-4 bg-white/10 rounded-2xl text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-pink-500 pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        {isLogin && (
          <div className="text-right">
            <button type="button" className="text-pink-400 text-sm font-medium">
              Forgot Password?
            </button>
          </div>
        )}

        <GradientButton type="submit" className="w-full py-4 mt-4" disabled={isLoading}>
          {isLoading ? "Loading..." : isLogin ? "Log In" : "Sign Up"}
        </GradientButton>
      </form>

      <div className="flex items-center gap-4 my-8 w-full max-w-sm">
        <div className="flex-1 h-px bg-white/20" />
        <span className="text-white/50 text-sm">or continue with</span>
        <div className="flex-1 h-px bg-white/20" />
      </div>

      <div className="flex gap-4">
        {[
          { icon: "G", bg: "bg-white/10" },
          { icon: "🍎", bg: "bg-white/10" },
          { icon: "f", bg: "bg-blue-600/30" },
          { icon: <Phone className="w-5 h-5" />, bg: "bg-white/10" },
        ].map((social, index) => (
          <button
            key={index}
            className={cn("w-14 h-14 rounded-full flex items-center justify-center text-white text-xl", social.bg)}
          >
            {social.icon}
          </button>
        ))}
      </div>

      <p className="mt-8 text-white/60">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button onClick={() => setIsLogin(!isLogin)} className="text-pink-400 font-semibold">
          {isLogin ? "Sign Up" : "Log In"}
        </button>
      </p>
    </div>
  )
}
