"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import type { ElementStyle } from "@/lib/types"

interface EditorBackgroundPanelProps {
  onApplyBackground: (style: Partial<ElementStyle>) => void
}

export function EditorBackgroundPanel({ onApplyBackground }: EditorBackgroundPanelProps) {
  const [selectedColor, setSelectedColor] = useState("#ffffff")

  const colorPalettes = [
    {
      name: "Basic",
      colors: [
        "#ffffff",
        "#f8f9fa",
        "#e9ecef",
        "#dee2e6",
        "#ced4da",
        "#adb5bd",
        "#6c757d",
        "#495057",
        "#343a40",
        "#212529",
      ],
    },
    {
      name: "Professional",
      colors: [
        "#f8f9fa",
        "#e2e8f0",
        "#cbd5e1",
        "#94a3b8",
        "#64748b",
        "#475569",
        "#334155",
        "#1e293b",
        "#0f172a",
        "#020617",
      ],
    },
    {
      name: "Warm",
      colors: [
        "#fff7ed",
        "#ffedd5",
        "#fed7aa",
        "#fdba74",
        "#fb923c",
        "#f97316",
        "#ea580c",
        "#c2410c",
        "#9a3412",
        "#7c2d12",
      ],
    },
    {
      name: "Cool",
      colors: [
        "#f0f9ff",
        "#e0f2fe",
        "#bae6fd",
        "#7dd3fc",
        "#38bdf8",
        "#0ea5e9",
        "#0284c7",
        "#0369a1",
        "#075985",
        "#0c4a6e",
      ],
    },
    {
      name: "Pastel",
      colors: [
        "#fce7f3",
        "#fbcfe8",
        "#f9a8d4",
        "#f472b6",
        "#ec4899",
        "#db2777",
        "#be185d",
        "#9d174d",
        "#831843",
        "#500724",
      ],
    },
  ]

  const handleColorSelect = (color: string) => {
    setSelectedColor(color)
    onApplyBackground({ backgroundColor: color })
  }

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(e.target.value)
    onApplyBackground({ backgroundColor: e.target.value })
  }

  return (
    <div className="p-4">
      <h3 className="font-medium mb-4">Background</h3>

      <div className="mb-4">
        <div className="flex items-center mb-2">
          <div
            className="w-8 h-8 border rounded-l flex items-center justify-center"
            style={{ backgroundColor: selectedColor }}
          />
          <Input type="color" value={selectedColor} onChange={handleColorChange} className="rounded-l-none" />
        </div>
      </div>

      {colorPalettes.map((palette) => (
        <div key={palette.name} className="mb-6">
          <h4 className="text-sm font-medium text-gray-500 mb-2">{palette.name}</h4>
          <div className="grid grid-cols-5 gap-2">
            {palette.colors.map((color, index) => (
              <button
                key={`${palette.name}-${index}`}
                className={`w-full h-10 rounded border ${selectedColor === color ? "ring-2 ring-blue-500" : "hover:ring-1 hover:ring-gray-400"}`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
                title={color}
              />
            ))}
          </div>
        </div>
      ))}

      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-500 mb-2">Patterns</h4>
        <div className="grid grid-cols-2 gap-2">
          <button
            className="border rounded p-2 hover:border-blue-500"
            onClick={() =>
              onApplyBackground({
                backgroundImage:
                  "linear-gradient(45deg, #f3f4f6 25%, transparent 25%, transparent 75%, #f3f4f6 75%, #f3f4f6)",
                backgroundSize: "20px 20px",
              })
            }
          >
            <div
              className="w-full h-16"
              style={{
                backgroundImage:
                  "linear-gradient(45deg, #f3f4f6 25%, transparent 25%, transparent 75%, #f3f4f6 75%, #f3f4f6)",
                backgroundSize: "20px 20px",
              }}
            />
            <div className="text-xs mt-1">Grid</div>
          </button>
          <button
            className="border rounded p-2 hover:border-blue-500"
            onClick={() =>
              onApplyBackground({
                backgroundImage: "radial-gradient(#e5e7eb 2px, transparent 2px)",
                backgroundSize: "20px 20px",
              })
            }
          >
            <div
              className="w-full h-16"
              style={{
                backgroundImage: "radial-gradient(#e5e7eb 2px, transparent 2px)",
                backgroundSize: "20px 20px",
              }}
            />
            <div className="text-xs mt-1">Dots</div>
          </button>
          <button
            className="border rounded p-2 hover:border-blue-500"
            onClick={() =>
              onApplyBackground({
                backgroundImage:
                  "linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              })
            }
          >
            <div
              className="w-full h-16"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
            <div className="text-xs mt-1">Lines</div>
          </button>
          <button
            className="border rounded p-2 hover:border-blue-500"
            onClick={() =>
              onApplyBackground({
                backgroundImage:
                  "linear-gradient(135deg, #f3f4f6 25%, transparent 25%), linear-gradient(225deg, #f3f4f6 25%, transparent 25%), linear-gradient(45deg, #f3f4f6 25%, transparent 25%), linear-gradient(315deg, #f3f4f6 25%, transparent 25%)",
                backgroundSize: "20px 20px",
                backgroundPosition: "0 0, 10px 0, 10px -10px, 0px 10px",
              })
            }
          >
            <div
              className="w-full h-16"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #f3f4f6 25%, transparent 25%), linear-gradient(225deg, #f3f4f6 25%, transparent 25%), linear-gradient(45deg, #f3f4f6 25%, transparent 25%), linear-gradient(315deg, #f3f4f6 25%, transparent 25%)",
                backgroundSize: "20px 20px",
                backgroundPosition: "0 0, 10px 0, 10px -10px, 0px 10px",
              }}
            />
            <div className="text-xs mt-1">Zigzag</div>
          </button>
        </div>
      </div>
    </div>
  )
}
