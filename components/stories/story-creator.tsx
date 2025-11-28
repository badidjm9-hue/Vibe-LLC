"use client"

import type React from "react"

import { useState, useRef } from "react"
import { X, ImageIcon, Type, Palette, Music2, Sticker, Sparkles, Download, Send, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

interface StoryCreatorProps {
  onClose: () => void
  onPublish: (story: StoryData) => void
}

interface StoryData {
  type: "image" | "video" | "text"
  content: string
  background?: string
  text?: string
  textStyle?: TextStyle
  stickers?: any[]
  music?: string
}

interface TextStyle {
  color: string
  font: string
  size: number
  position: { x: number; y: number }
}

const backgrounds = [
  "bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500",
  "bg-gradient-to-br from-orange-400 via-red-500 to-pink-500",
  "bg-gradient-to-br from-green-400 via-teal-500 to-blue-500",
  "bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500",
  "bg-gradient-to-br from-purple-600 via-pink-500 to-red-400",
  "bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-500",
  "bg-black",
  "bg-white",
]

const fonts = ["font-sans", "font-serif", "font-mono"]
const textColors = ["#ffffff", "#000000", "#ff6b6b", "#4ecdc4", "#ffe66d", "#a55eea"]

const stickerEmojis = ["😂", "❤️", "🔥", "👑", "⭐", "💯", "🎉", "😍", "🤩", "💫", "✨", "🌟"]

export function StoryCreator({ onClose, onPublish }: StoryCreatorProps) {
  const [mode, setMode] = useState<"camera" | "gallery" | "text">("text")
  const [selectedBg, setSelectedBg] = useState(0)
  const [text, setText] = useState("")
  const [textColor, setTextColor] = useState("#ffffff")
  const [selectedFont, setSelectedFont] = useState(0)
  const [stickers, setStickers] = useState<any[]>([])
  const [showTools, setShowTools] = useState<"bg" | "text" | "stickers" | "music" | null>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleGallerySelect = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string)
        setMode("gallery")
      }
      reader.readAsDataURL(file)
    }
  }

  const addSticker = (emoji: string) => {
    const newSticker = {
      id: Date.now().toString(),
      emoji,
      position: { x: 50, y: 50 },
      scale: 1,
    }
    setStickers([...stickers, newSticker])
  }

  const removeSticker = (id: string) => {
    setStickers(stickers.filter((s) => s.id !== id))
  }

  const handlePublish = () => {
    const storyData: StoryData = {
      type: capturedImage ? "image" : "text",
      content: capturedImage || "",
      background: backgrounds[selectedBg],
      text,
      textStyle: {
        color: textColor,
        font: fonts[selectedFont],
        size: 24,
        position: { x: 50, y: 50 },
      },
      stickers,
    }
    onPublish(storyData)
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 flex items-center justify-between safe-top">
        <button onClick={onClose} className="p-2">
          <X className="w-6 h-6 text-white" />
        </button>
        <div className="flex items-center gap-2">
          {capturedImage && (
            <button
              onClick={() => {
                setCapturedImage(null)
                setMode("text")
              }}
              className="p-2"
            >
              <RotateCcw className="w-5 h-5 text-white" />
            </button>
          )}
          <button className="p-2">
            <Download className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 mx-4 rounded-3xl overflow-hidden relative">
        {capturedImage ? (
          <img src={capturedImage || "/placeholder.svg"} alt="Story" className="w-full h-full object-cover" />
        ) : (
          <div className={cn("w-full h-full flex items-center justify-center", backgrounds[selectedBg])}>
            {text ? (
              <p
                className={cn("text-center px-8 text-2xl font-bold", fonts[selectedFont])}
                style={{ color: textColor }}
              >
                {text}
              </p>
            ) : (
              <p className="text-white/50 text-lg">Tap to add text</p>
            )}
          </div>
        )}

        {/* Stickers overlay */}
        {stickers.map((sticker) => (
          <div
            key={sticker.id}
            className="absolute cursor-move"
            style={{
              left: `${sticker.position.x}%`,
              top: `${sticker.position.y}%`,
              transform: `translate(-50%, -50%) scale(${sticker.scale})`,
            }}
          >
            <span className="text-5xl">{sticker.emoji}</span>
            <button
              onClick={() => removeSticker(sticker.id)}
              className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
            >
              <X className="w-3 h-3 text-white" />
            </button>
          </div>
        ))}

        {/* Text input overlay */}
        {!capturedImage && (
          <div className="absolute inset-0 flex items-center justify-center" onClick={() => setShowTools("text")}>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your story..."
              className={cn(
                "bg-transparent text-center text-2xl font-bold outline-none w-full px-8",
                fonts[selectedFont],
              )}
              style={{ color: textColor }}
            />
          </div>
        )}
      </div>

      {/* Tools */}
      <div className="px-4 py-4">
        {/* Tool selector */}
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => setShowTools(showTools === "bg" ? null : "bg")}
            className={cn("p-3 rounded-full", showTools === "bg" ? "bg-pink-500" : "glass")}
          >
            <Palette className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={() => setShowTools(showTools === "text" ? null : "text")}
            className={cn("p-3 rounded-full", showTools === "text" ? "bg-pink-500" : "glass")}
          >
            <Type className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={() => setShowTools(showTools === "stickers" ? null : "stickers")}
            className={cn("p-3 rounded-full", showTools === "stickers" ? "bg-pink-500" : "glass")}
          >
            <Sticker className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={() => setShowTools(showTools === "music" ? null : "music")}
            className={cn("p-3 rounded-full", showTools === "music" ? "bg-pink-500" : "glass")}
          >
            <Music2 className="w-5 h-5 text-white" />
          </button>
          <button onClick={handleGallerySelect} className="p-3 glass rounded-full">
            <ImageIcon className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Tool panels */}
        {showTools === "bg" && (
          <div className="glass rounded-2xl p-4 mb-4">
            <p className="text-sm text-white/70 mb-3">Background</p>
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {backgrounds.map((bg, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedBg(i)}
                  className={cn(
                    "w-10 h-10 rounded-full flex-shrink-0 border-2",
                    bg,
                    selectedBg === i ? "border-white" : "border-transparent",
                  )}
                />
              ))}
            </div>
          </div>
        )}

        {showTools === "text" && (
          <div className="glass rounded-2xl p-4 mb-4 space-y-4">
            <div>
              <p className="text-sm text-white/70 mb-3">Text Color</p>
              <div className="flex gap-2">
                {textColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setTextColor(color)}
                    className={cn(
                      "w-8 h-8 rounded-full border-2",
                      textColor === color ? "border-white" : "border-transparent",
                    )}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-white/70 mb-3">Font Style</p>
              <div className="flex gap-2">
                {fonts.map((font, i) => (
                  <button
                    key={font}
                    onClick={() => setSelectedFont(i)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm",
                      font,
                      selectedFont === i ? "bg-pink-500 text-white" : "glass text-white/70",
                    )}
                  >
                    Aa
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {showTools === "stickers" && (
          <div className="glass rounded-2xl p-4 mb-4">
            <p className="text-sm text-white/70 mb-3">Stickers</p>
            <div className="grid grid-cols-6 gap-2">
              {stickerEmojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => addSticker(emoji)}
                  className="w-10 h-10 flex items-center justify-center text-2xl hover:bg-white/10 rounded-lg transition-colors"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        {showTools === "music" && (
          <div className="glass rounded-2xl p-4 mb-4">
            <p className="text-sm text-white/70 mb-3">Add Music</p>
            <div className="space-y-2">
              {["Trending Songs", "For You", "Saved"].map((category) => (
                <button
                  key={category}
                  className="w-full p-3 glass rounded-xl text-left text-white flex items-center justify-between"
                >
                  <span>{category}</span>
                  <Music2 className="w-4 h-4 text-white/50" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom actions */}
      <div className="px-4 pb-8 safe-bottom flex gap-3">
        <button className="flex-1 py-3 glass rounded-full flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-white" />
          <span className="text-white font-semibold">Close Friends</span>
        </button>
        <button
          onClick={handlePublish}
          className="flex-1 py-3 gradient-button rounded-full flex items-center justify-center gap-2"
        >
          <Send className="w-5 h-5 text-white" />
          <span className="text-white font-semibold">Share Story</span>
        </button>
      </div>

      {/* Hidden file input */}
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
    </div>
  )
}
