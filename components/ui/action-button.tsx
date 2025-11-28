"use client"

import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface ActionButtonProps {
  icon: ReactNode
  label?: string
  count?: number | string
  active?: boolean
  onClick?: () => void
  className?: string
  size?: "sm" | "md" | "lg"
}

export function ActionButton({ icon, label, count, active, onClick, className, size = "md" }: ActionButtonProps) {
  const sizes = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-14 h-14",
  }

  return (
    <button onClick={onClick} className={cn("flex flex-col items-center gap-1", className)}>
      <div
        className={cn(
          "flex items-center justify-center rounded-full glass transition-all duration-200",
          "active:scale-90",
          sizes[size],
          active && "bg-pink-500/30 border-pink-500/50",
        )}
      >
        {icon}
      </div>
      {(count !== undefined || label) && (
        <span className="text-xs font-medium text-white">{count !== undefined ? formatCount(count) : label}</span>
      )}
    </button>
  )
}

function formatCount(count: number | string): string {
  if (typeof count === "string") return count
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
  return count.toString()
}
