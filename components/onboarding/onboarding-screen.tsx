"use client"

import { useState } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { GradientButton } from "@/components/ui/gradient-button"
import { useApp } from "@/contexts/app-context"
import { cn } from "@/lib/utils"

const slides = [
  {
    image: "/images/screen.png",
    title: "Create & Share Instantly",
    description:
      "Easily record, edit, and share stunning videos with our powerful creation tools. Bring your moments to life in just a few taps.",
  },
  {
    image: "/images/screen.png",
    title: "Create Like a Pro",
    description:
      "Access a full suite of professional editing tools. Add stunning effects, transitions, and audio to make your videos stand out.",
  },
  {
    image: "/images/screen.png",
    title: "Collaborate & Connect",
    description:
      "Join forces with other creators. Remix, duet, and collaborate on videos to reach a wider audience and spark new trends.",
  },
]

export function OnboardingScreen() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { completeOnboarding } = useApp()

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      completeOnboarding()
    }
  }

  const handleSkip = () => {
    completeOnboarding()
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm animate-scale-in">
        <GlassCard className="p-6 text-center">
          <div className="relative w-full aspect-square mb-6 rounded-2xl overflow-hidden">
            <img
              src={slides[currentSlide].image || "/placeholder.svg"}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">{slides[currentSlide].title}</h1>
          <p className="text-white/70 leading-relaxed">{slides[currentSlide].description}</p>
        </GlassCard>
      </div>

      {/* Pagination dots */}
      <div className="flex items-center gap-2 mt-8">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              index === currentSlide ? "w-8 bg-purple-400" : "w-2 bg-white/30",
            )}
          />
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-4 mt-12 w-full max-w-sm">
        <GradientButton variant="secondary" className="flex-1" onClick={handleSkip}>
          Skip
        </GradientButton>
        <GradientButton className="flex-1" onClick={handleNext}>
          {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
        </GradientButton>
      </div>
    </div>
  )
}
