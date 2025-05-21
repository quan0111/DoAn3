"use client"

import type React from "react"

import { useState } from "react"
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Trash2,
  Copy,
  MoveUp,
  MoveDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { CVElement, ElementStyle } from "@/lib/types"

interface EditorPropertiesProps {
  selectedElement: CVElement | null
  onStyleChange: (style: Partial<ElementStyle>) => void
  onContentChange: (content: string) => void
  onDelete?: () => void
  onDuplicate?: () => void
  onBringForward?: () => void
  onSendBackward?: () => void
}

export function EditorProperties({
  selectedElement,
  onStyleChange,
  onContentChange,
  onDelete,
  onDuplicate,
  onBringForward,
  onSendBackward,
}: EditorPropertiesProps) {
  const [activeTab, setActiveTab] = useState("style")

  if (!selectedElement) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p>Select an element to edit its properties</p>
      </div>
    )
  }

  const handleFontSizeChange = (value: number[]) => {
    onStyleChange({ fontSize: value[0] })
  }

  const handleLineHeightChange = (value: number[]) => {
    onStyleChange({ lineHeight: value[0] / 10 })
  }

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onStyleChange({ color: e.target.value })
  }

  const handleBgColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onStyleChange({ backgroundColor: e.target.value })
  }

  const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStyleChange({ fontFamily: e.target.value })
  }

  const toggleBold = () => {
    onStyleChange({ fontWeight: selectedElement.style?.fontWeight === "bold" ? "normal" : "bold" })
  }

  const toggleItalic = () => {
    onStyleChange({ fontStyle: selectedElement.style?.fontStyle === "italic" ? "normal" : "italic" })
  }

  const toggleUnderline = () => {
    onStyleChange({ textDecoration: selectedElement.style?.textDecoration === "underline" ? "none" : "underline" })
  }

  const setTextAlign = (align: "left" | "center" | "right" | "justify") => {
    onStyleChange({ textAlign: align })
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Element Properties</h3>
        <div className="flex space-x-1">
          {onDelete && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onDelete}
              title="Delete"
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 size={16} />
            </Button>
          )}
          {onDuplicate && (
            <Button variant="ghost" size="icon" onClick={onDuplicate} title="Duplicate">
              <Copy size={16} />
            </Button>
          )}
          {onBringForward && (
            <Button variant="ghost" size="icon" onClick={onBringForward} title="Bring Forward">
              <MoveUp size={16} />
            </Button>
          )}
          {onSendBackward && (
            <Button variant="ghost" size="icon" onClick={onSendBackward} title="Send Backward">
              <MoveDown size={16} />
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="style" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="style">Style</TabsTrigger>
          <TabsTrigger value="position">Position</TabsTrigger>
        </TabsList>

        {activeTab === "style" && (
          <div className="space-y-4">
            {selectedElement.type === "text" && (
              <>
                <div className="space-y-2">
                  <Label>Font</Label>
                  <select
                    className="w-full p-2 border rounded"
                    value={selectedElement.style?.fontFamily || "Arial"}
                    onChange={handleFontFamilyChange}
                  >
                    <option value="Arial">Arial</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Open Sans">Open Sans</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Font Size</Label>
                    <span>{selectedElement.style?.fontSize || 16}px</span>
                  </div>
                  <Slider
                    value={[selectedElement.style?.fontSize || 16]}
                    min={8}
                    max={72}
                    step={1}
                    onValueChange={handleFontSizeChange}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Line Height</Label>
                    <span>{(selectedElement.style?.lineHeight || 1.2).toFixed(1)}</span>
                  </div>
                  <Slider
                    value={[(selectedElement.style?.lineHeight || 1.2) * 10]}
                    min={10}
                    max={30}
                    step={1}
                    onValueChange={handleLineHeightChange}
                  />
                </div>

                <div className="flex space-x-1 mb-4">
                  <Button
                    variant={selectedElement.style?.fontWeight === "bold" ? "default" : "outline"}
                    size="icon"
                    onClick={toggleBold}
                    title="Bold"
                  >
                    <Bold size={16} />
                  </Button>
                  <Button
                    variant={selectedElement.style?.fontStyle === "italic" ? "default" : "outline"}
                    size="icon"
                    onClick={toggleItalic}
                    title="Italic"
                  >
                    <Italic size={16} />
                  </Button>
                  <Button
                    variant={selectedElement.style?.textDecoration === "underline" ? "default" : "outline"}
                    size="icon"
                    onClick={toggleUnderline}
                    title="Underline"
                  >
                    <Underline size={16} />
                  </Button>
                  <div className="border-l mx-1"></div>
                  <Button
                    variant={selectedElement.style?.textAlign === "left" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setTextAlign("left")}
                    title="Align Left"
                  >
                    <AlignLeft size={16} />
                  </Button>
                  <Button
                    variant={selectedElement.style?.textAlign === "center" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setTextAlign("center")}
                    title="Align Center"
                  >
                    <AlignCenter size={16} />
                  </Button>
                  <Button
                    variant={selectedElement.style?.textAlign === "right" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setTextAlign("right")}
                    title="Align Right"
                  >
                    <AlignRight size={16} />
                  </Button>
                  <Button
                    variant={selectedElement.style?.textAlign === "justify" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setTextAlign("justify")}
                    title="Justify"
                  >
                    <AlignJustify size={16} />
                  </Button>
                </div>
              </>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Text Color</Label>
                <div className="flex">
                  <div
                    className="w-8 h-8 border rounded-l flex items-center justify-center"
                    style={{ backgroundColor: selectedElement.style?.color || "#000000" }}
                  />
                  <Input
                    type="color"
                    value={selectedElement.style?.color || "#000000"}
                    onChange={handleColorChange}
                    className="rounded-l-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Background</Label>
                <div className="flex">
                  <div
                    className="w-8 h-8 border rounded-l flex items-center justify-center"
                    style={{ backgroundColor: selectedElement.style?.backgroundColor || "transparent" }}
                  />
                  <Input
                    type="color"
                    value={selectedElement.style?.backgroundColor || "#ffffff"}
                    onChange={handleBgColorChange}
                    className="rounded-l-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "position" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>X Position</Label>
                <Input
                  type="number"
                  value={selectedElement.position.x}
                  onChange={(e) => onStyleChange({ x: Number.parseInt(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label>Y Position</Label>
                <Input
                  type="number"
                  value={selectedElement.position.y}
                  onChange={(e) => onStyleChange({ y: Number.parseInt(e.target.value) })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Width</Label>
                <Input
                  type="number"
                  value={selectedElement.position.width}
                  onChange={(e) => onStyleChange({ width: Number.parseInt(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label>Height</Label>
                <Input
                  type="number"
                  value={selectedElement.position.height}
                  onChange={(e) => onStyleChange({ height: Number.parseInt(e.target.value) })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Z-Index</Label>
              <Input
                type="number"
                value={selectedElement.zIndex || 0}
                onChange={(e) => onStyleChange({ zIndex: Number.parseInt(e.target.value) })}
              />
            </div>
          </div>
        )}
      </Tabs>
    </div>
  )
}
