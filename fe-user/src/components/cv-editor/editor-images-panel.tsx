"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import type { CVElement } from "@/lib/types"

interface EditorImagesPanelProps {
  onAddImage: (element: Omit<CVElement, "id" | "position">) => void
}

export function EditorImagesPanel({ onAddImage }: EditorImagesPanelProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock image categories and items
  const imageCategories = [
    {
      name: "Icons",
      images: [
        "/placeholder.svg?height=100&width=100&text=Icon+1",
        "/placeholder.svg?height=100&width=100&text=Icon+2",
        "/placeholder.svg?height=100&width=100&text=Icon+3",
        "/placeholder.svg?height=100&width=100&text=Icon+4",
        "/placeholder.svg?height=100&width=100&text=Icon+5",
        "/placeholder.svg?height=100&width=100&text=Icon+6",
      ],
    },
    {
      name: "Backgrounds",
      images: [
        "/placeholder.svg?height=100&width=100&text=BG+1",
        "/placeholder.svg?height=100&width=100&text=BG+2",
        "/placeholder.svg?height=100&width=100&text=BG+3",
        "/placeholder.svg?height=100&width=100&text=BG+4",
      ],
    },
    {
      name: "Decorative",
      images: [
        "/placeholder.svg?height=100&width=100&text=Deco+1",
        "/placeholder.svg?height=100&width=100&text=Deco+2",
        "/placeholder.svg?height=100&width=100&text=Deco+3",
        "/placeholder.svg?height=100&width=100&text=Deco+4",
      ],
    },
  ]

  const handleAddImage = (imageUrl: string) => {
    onAddImage({
      type: "image",
      content: imageUrl,
      style: {},
    })
  }

  return (
    <div className="p-4">
      <h3 className="font-medium mb-4">Images</h3>

      <div className="relative mb-4">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search images..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </div>

      {imageCategories.map((category) => (
        <div key={category.name} className="mb-6">
          <h4 className="text-sm font-medium text-gray-500 mb-2">{category.name}</h4>
          <div className="grid grid-cols-2 gap-2">
            {category.images.map((image, index) => (
              <button
                key={`${category.name}-${index}`}
                className="border rounded overflow-hidden hover:border-blue-500 transition-colors"
                onClick={() => handleAddImage(image)}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${category.name} ${index + 1}`}
                  className="w-full h-auto"
                />
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
