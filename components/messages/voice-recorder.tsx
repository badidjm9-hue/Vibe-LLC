"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Pause, Play, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface VoiceRecorderProps {
  onSend: (duration: number, waveform: number[]) => void
  onCancel: () => void
}

export function VoiceRecorder({ onSend, onCancel }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [duration, setDuration] = useState(0)
  const [waveform, setWaveform] = useState<number[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const animationRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRecording && !isPaused) {
      intervalRef.current = setInterval(() => {
        setDuration((d) => d + 1)
      }, 1000)

      animationRef.current = setInterval(() => {
        setWaveform((prev) => {
          const newWave = [...prev, Math.random() * 0.8 + 0.2]
          if (newWave.length > 50) newWave.shift()
          return newWave
        })
      }, 100)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (animationRef.current) clearInterval(animationRef.current)
    }
  }, [isRecording, isPaused])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handlePauseResume = () => {
    setIsPaused(!isPaused)
  }

  const handleStop = () => {
    setIsRecording(false)
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (animationRef.current) clearInterval(animationRef.current)
  }

  const handleSend = () => {
    onSend(duration, waveform)
  }

  const handlePlayPreview = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="flex items-center gap-3 w-full">
      {/* Cancel button */}
      <button onClick={onCancel} className="p-3 rounded-full bg-red-500/20 hover:bg-red-500/30 transition-colors">
        <Trash2 className="w-5 h-5 text-red-400" />
      </button>

      {/* Waveform visualization */}
      <div className="flex-1 glass rounded-full px-4 py-3">
        <div className="flex items-center gap-2">
          {/* Recording indicator */}
          {isRecording && !isPaused && <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse flex-shrink-0" />}

          {/* Waveform */}
          <div className="flex-1 h-10 flex items-center gap-0.5 overflow-hidden">
            {waveform.map((height, i) => (
              <div
                key={i}
                className={cn(
                  "w-1 rounded-full transition-all duration-100",
                  isRecording ? "bg-pink-400" : "bg-white/40",
                )}
                style={{ height: `${height * 100}%` }}
              />
            ))}
            {waveform.length < 50 &&
              Array.from({ length: 50 - waveform.length }).map((_, i) => (
                <div key={`empty-${i}`} className="w-1 h-1 bg-white/20 rounded-full" />
              ))}
          </div>

          {/* Duration */}
          <span className="text-white font-mono text-sm flex-shrink-0">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Control buttons */}
      {isRecording ? (
        <div className="flex gap-2">
          <button
            onClick={handlePauseResume}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            {isPaused ? <Play className="w-5 h-5 text-white" /> : <Pause className="w-5 h-5 text-white" />}
          </button>
          <button
            onClick={() => {
              handleStop()
              handleSend()
            }}
            className="p-3 rounded-full gradient-button"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={handlePlayPreview}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
          </button>
          <button onClick={handleSend} className="p-3 rounded-full gradient-button">
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      )}
    </div>
  )
}
