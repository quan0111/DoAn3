"use client"

import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, Download, Share2 } from "lucide-react"
import { useState } from "react"

export function CVTemplatePreview() {
  const [zoomLevel, setZoomLevel] = useState(80)

  const handleZoomIn = () => {
    if (zoomLevel < 150) {
      setZoomLevel(zoomLevel + 10)
    }
  }

  const handleZoomOut = () => {
    if (zoomLevel > 50) {
      setZoomLevel(zoomLevel - 10)
    }
  }

  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <div className="flex items-center justify-between border-b p-3">
        <h2 className="font-medium">Xem trước</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handleZoomOut} disabled={zoomLevel <= 50}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm">{zoomLevel}%</span>
          <Button variant="outline" size="icon" onClick={handleZoomIn} disabled={zoomLevel >= 150}>
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex min-h-[500px] items-center justify-center bg-gray-100 p-4">
        <div
          className="relative rounded-md bg-white shadow-lg"
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "center", transition: "transform 0.2s" }}
        >
          <img
            src="/placeholder.svg?height=1000&width=700&text=Preview%20CV"
            alt="CV Preview"
            className="h-auto w-[700px]"
          />
        </div>
      </div>

      <div className="flex items-center justify-between border-t p-3">
        <div className="text-sm text-gray-500">
          <span>Trang 1/1</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Chia sẻ</span>
          </Button>
          <Button size="sm" className="gap-1 bg-green-600 hover:bg-green-700">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Tải xuống</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
