"use client"

import { cn } from "@/lib/utils"

interface ToggleSwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}

export function ToggleSwitch({ checked, onChange, disabled }: ToggleSwitchProps) {
  return (
    <button
      onClick={() => !disabled && onChange(!checked)}
      className={cn(
        "relative w-14 h-8 rounded-full transition-all duration-300",
        checked ? "bg-gradient-to-r from-pink-500 to-purple-500" : "bg-white/20",
        disabled && "opacity-50 cursor-not-allowed",
      )}
    >
      <div
        className={cn(
          "absolute top-1 w-6 h-6 rounded-full bg-white shadow-lg transition-all duration-300",
          checked ? "left-7" : "left-1",
        )}
      />
    </button>
  )
}
