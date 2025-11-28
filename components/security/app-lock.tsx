"use client"

import { useState } from "react"
import { Lock, Fingerprint, EyeOff } from "lucide-react"

interface AppLockProps {
  onUnlock: () => void
  lockType: "pin" | "biometric"
}

export function AppLock({ onUnlock, lockType }: AppLockProps) {
  const [pin, setPin] = useState<string[]>([])
  const [error, setError] = useState(false)
  const [showPin, setShowPin] = useState(false)

  const correctPin = "1234" // This would be stored securely

  const handlePinInput = (digit: string) => {
    if (pin.length < 4) {
      const newPin = [...pin, digit]
      setPin(newPin)

      if (newPin.length === 4) {
        if (newPin.join("") === correctPin) {
          onUnlock()
        } else {
          setError(true)
          setTimeout(() => {
            setPin([])
            setError(false)
          }, 500)
        }
      }
    }
  }

  const handleDelete = () => {
    setPin(pin.slice(0, -1))
  }

  const handleBiometric = async () => {
    // This would use device biometric APIs
    // For demo, just unlock
    onUnlock()
  }

  const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-8">
        <Lock className="w-10 h-10 text-pink-400" />
      </div>

      <h1 className="text-2xl font-bold text-white mb-2">Unlock Vibe</h1>
      <p className="text-white/60 mb-8">Enter your PIN to continue</p>

      {/* PIN dots */}
      <div className="flex gap-4 mb-8">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full transition-all ${
              error ? "bg-red-500" : pin.length > index ? "bg-pink-500" : "bg-white/20"
            }`}
          />
        ))}
      </div>

      {/* Number pad */}
      <div className="grid grid-cols-3 gap-4 max-w-xs">
        {digits.map((digit, index) => {
          if (digit === "") {
            return <div key={index} />
          }

          if (digit === "del") {
            return (
              <button
                key={index}
                onClick={handleDelete}
                className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/60 active:bg-white/10"
              >
                <EyeOff className="w-6 h-6" />
              </button>
            )
          }

          return (
            <button
              key={index}
              onClick={() => handlePinInput(digit)}
              className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-2xl font-semibold text-white active:bg-white/20 transition-all"
            >
              {showPin ? digit : digit}
            </button>
          )
        })}
      </div>

      {/* Biometric option */}
      <button onClick={handleBiometric} className="mt-8 flex items-center gap-2 text-pink-400">
        <Fingerprint className="w-6 h-6" />
        <span>Use Face ID / Touch ID</span>
      </button>
    </div>
  )
}
