"use client"

import { useState } from "react"
import { ChevronLeft, Shield, Smartphone, Mail, Key, Check } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { GradientButton } from "@/components/ui/gradient-button"
import { cn } from "@/lib/utils"

interface TwoFactorAuthProps {
  onBack: () => void
  onEnable: (method: string) => void
  isEnabled: boolean
}

export function TwoFactorAuth({ onBack, onEnable, isEnabled }: TwoFactorAuthProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [step, setStep] = useState<"select" | "setup" | "verify">("select")
  const [code, setCode] = useState(["", "", "", "", "", ""])

  const methods = [
    {
      id: "authenticator",
      name: "Authenticator App",
      description: "Use Google Authenticator or similar app",
      icon: Smartphone,
    },
    {
      id: "sms",
      name: "SMS Code",
      description: "Receive codes via text message",
      icon: Mail,
    },
    {
      id: "email",
      name: "Email Code",
      description: "Receive codes via email",
      icon: Mail,
    },
  ]

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.querySelector(`input[data-index="${index + 1}"]`) as HTMLInputElement
      nextInput?.focus()
    }
  }

  const handleVerify = () => {
    const fullCode = code.join("")
    if (fullCode.length === 6) {
      onEnable(selectedMethod || "authenticator")
    }
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 glass-dark safe-top">
        <button
          onClick={() => {
            if (step === "select") onBack()
            else setStep("select")
          }}
          className="w-10 h-10 flex items-center justify-center"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="font-bold text-white">Two-Factor Authentication</h1>
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
          <Shield className="w-5 h-5 text-pink-400" />
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {isEnabled && step === "select" && (
          <GlassCard className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="font-semibold text-white">2FA is Enabled</p>
                <p className="text-sm text-white/60">Your account is protected</p>
              </div>
            </div>
          </GlassCard>
        )}

        {step === "select" && (
          <>
            <div className="text-center">
              <h2 className="text-xl font-bold text-white mb-2">Add Extra Security</h2>
              <p className="text-white/60 text-sm">Protect your account with two-factor authentication</p>
            </div>

            <div className="space-y-3">
              {methods.map((method) => {
                const Icon = method.icon
                return (
                  <button
                    key={method.id}
                    onClick={() => {
                      setSelectedMethod(method.id)
                      setStep("setup")
                    }}
                    className={cn(
                      "w-full p-4 rounded-2xl transition-all text-left",
                      selectedMethod === method.id
                        ? "bg-pink-500/20 border border-pink-500/50"
                        : "bg-white/5 border border-white/10",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-pink-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{method.name}</p>
                        <p className="text-sm text-white/60">{method.description}</p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </>
        )}

        {step === "setup" && selectedMethod === "authenticator" && (
          <div className="text-center space-y-6">
            <div className="w-48 h-48 mx-auto bg-white rounded-2xl p-4">
              {/* QR Code placeholder */}
              <div className="w-full h-full bg-black/10 rounded-lg flex items-center justify-center">
                <Key className="w-16 h-16 text-gray-400" />
              </div>
            </div>

            <div>
              <p className="text-white font-semibold mb-2">Scan QR Code</p>
              <p className="text-white/60 text-sm">Open your authenticator app and scan this QR code</p>
            </div>

            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-xs text-white/40 mb-1">Manual entry code</p>
              <p className="font-mono text-white">ABCD-EFGH-IJKL-MNOP</p>
            </div>

            <GradientButton onClick={() => setStep("verify")} className="w-full">
              Continue
            </GradientButton>
          </div>
        )}

        {step === "verify" && (
          <div className="text-center space-y-6">
            <div>
              <p className="text-white font-semibold mb-2">Enter Verification Code</p>
              <p className="text-white/60 text-sm">Enter the 6-digit code from your authenticator app</p>
            </div>

            <div className="flex justify-center gap-2">
              {code.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  data-index={index}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  className="w-12 h-14 text-center text-xl font-bold bg-white/10 border border-white/20 rounded-xl text-white focus:border-pink-500 focus:outline-none"
                />
              ))}
            </div>

            <GradientButton onClick={handleVerify} className="w-full">
              Verify & Enable
            </GradientButton>
          </div>
        )}
      </div>
    </div>
  )
}
