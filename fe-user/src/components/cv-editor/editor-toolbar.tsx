"use client"

import { Undo, Redo, Save, Download, ZoomIn, ZoomOut, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface EditorToolbarProps {
  onUndo: () => void
  onRedo: () => void
  canUndo: boolean
  canRedo: boolean
  zoom: number
  onZoomChange: (zoom: number) => void
  onSave: () => void
}

export function EditorToolbar({ onUndo, onRedo, canUndo, canRedo, zoom, onZoomChange, onSave }: EditorToolbarProps) {
  return (
    <div className="absolute top-0 left-0 right-0 h-12 bg-white border-b flex items-center px-4 z-10">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" onClick={onUndo} disabled={!canUndo} title="Undo (Ctrl+Z)">
          <Undo size={18} />
        </Button>
        <Button variant="ghost" size="icon" onClick={onRedo} disabled={!canRedo} title="Redo (Ctrl+Y)">
          <Redo size={18} />
        </Button>
      </div>

      <div className="ml-6 flex items-center space-x-2">
        <Button variant="ghost" size="icon" onClick={() => onZoomChange(Math.max(50, zoom - 10))} title="Zoom Out">
          <ZoomOut size={18} />
        </Button>
        <div className="w-32 flex items-center">
          <Slider
            value={[zoom]}
            min={50}
            max={200}
            step={10}
            onValueChange={(value) => onZoomChange(value[0])}
            className="mx-2"
          />
        </div>
        <div className="text-sm w-12">{zoom}%</div>
        <Button variant="ghost" size="icon" onClick={() => onZoomChange(Math.min(200, zoom + 10))} title="Zoom In">
          <ZoomIn size={18} />
        </Button>
      </div>

      <div className="ml-auto flex items-center space-x-2">
        <Button variant="outline" size="sm" className="flex items-center" title="Preview">
          <Eye size={16} className="mr-1" /> Preview
        </Button>
        <Button variant="outline" size="sm" className="flex items-center" title="Download">
          <Download size={16} className="mr-1" /> Download
        </Button>
        <Button variant="default" size="sm" className="flex items-center" onClick={onSave} title="Save (Ctrl+S)">
          <Save size={16} className="mr-1" /> Save
        </Button>
      </div>
    </div>
  )
}
