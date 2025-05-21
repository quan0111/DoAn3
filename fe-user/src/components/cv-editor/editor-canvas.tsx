"use client"

import type React from "react"
import { forwardRef, useState, useRef } from "react"
import { useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import type { CVElement, CVTemplate } from "@/lib/types"
import type { CSSProperties } from "react"


interface EditorCanvasProps {
  elements: CVElement[]
  selectedElement: CVElement | null
  onSelectElement: (element: CVElement | null) => void
  onUpdateElement: (id: string, updates: Partial<CVElement>) => void
  onDragStart: () => void
  onDragEnd: () => void
  zoom: number
  template: CVTemplate
}

export const EditorCanvas = forwardRef<HTMLDivElement, EditorCanvasProps>(
  ({ elements, selectedElement, onSelectElement, onUpdateElement, onDragStart, onDragEnd, zoom, template }, ref) => {
    const [canvasSize, setCanvasSize] = useState({ width: 595, height: 842 }) // A4 size in pixels at 72dpi
    const canvasRef = useRef<HTMLDivElement>(null)

    // Handle click outside to deselect
    const handleCanvasClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onSelectElement(null)
      }
    }

    // Sort elements by z-index for proper rendering
    const sortedElements = [...elements].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0))

    // Monitor drag events
    useDndMonitor({
      onDragStart: () => {
        onDragStart()
      },
      onDragEnd: () => {
        onDragEnd()
      },
    })

    // Set up droppable area
    const { setNodeRef: setDroppableRef } = useDroppable({
      id: "canvas-droppable",
    })

    return (
      <div
        className="relative shadow-xl bg-white mx-auto"
        style={{
          width: `${canvasSize.width * (zoom / 100)}px`,
          height: `${canvasSize.height * (zoom / 100)}px`,
          transform: `scale(${zoom / 100})`,
          transformOrigin: "top left",
        }}
        onClick={handleCanvasClick}
        ref={(node) => {
          // Combine refs
          if (typeof ref === "function") {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
          setDroppableRef(node)
        }}
      >
        {/* Template background if any */}
        <div className={`absolute inset-0 ${template.className}`} style={{ backgroundColor: "#ffffff" }} />

        {/* Render all elements */}
        {sortedElements.map((element) => (
          <ElementRenderer
            key={element.id}
            element={element}
            isSelected={selectedElement?.id === element.id}
            onSelect={() => onSelectElement(element)}
            onUpdate={(updates) => onUpdateElement(element.id, updates)}
            zoom={zoom}
          />
        ))}
      </div>
    )
  },
)

EditorCanvas.displayName = "EditorCanvas"

interface ElementRendererProps {
  element: CVElement
  isSelected: boolean
  onSelect: () => void
  onUpdate: (updates: Partial<CVElement>) => void
  zoom: number
}

function ElementRenderer({ element, isSelected, onSelect, onUpdate, zoom }: ElementRendererProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: element.id,
    data: {
      type: "element",
      element,
    },
  })

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    onUpdate({ content: e.target.value })
  }

  // Apply transform from dnd-kit
  const style = {
    transform: CSS.Translate.toString(transform),
    position: "absolute",
    left: `${element.position.x}px`,
    top: `${element.position.y}px`,
    width: `${element.position.width}px`,
    height: `${element.position.height}px`,
    zIndex: element.zIndex || 0,
  }

  // Render different element types
  const renderElementContent = () => {
    switch (element.type) {
      case "text":
        return (
          <div
            className="w-full h-full"
            style={{
             ...(element.style as CSSProperties), // ép kiểu an toàn
              outline: "none",
              overflow: "hidden",
              whiteSpace: isSelected ? "normal" : "pre-wrap",
            }}
          >
            {isSelected ? (
              <textarea
                value={element.content}
                onChange={handleTextChange}
                className="w-full h-full resize-none border-0 bg-transparent p-0 focus:outline-none focus:ring-0"
                style={{
                  ...element.style,
                  fontFamily: element.style?.fontFamily || "Arial",
                  fontSize: element.style?.fontSize || 16,
                  fontWeight: element.style?.fontWeight || "normal",
                  color: element.style?.color || "#000000",
                  textAlign: (element.style?.textAlign as any) || "left",
                  lineHeight: element.style?.lineHeight || 1.2,
                }}
                autoFocus
              />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: element.content.replace(/\n/g, "<br>") }} />
            )}
          </div>
        )

      case "image":
        return (
          <img src={element.content || "/placeholder.svg"} alt="CV element" className="w-full h-full object-contain" />
        )

      case "shape":
        return (
          <div
            className="w-full h-full"
            style={{
              backgroundColor: element.style?.backgroundColor || "#000000",
              borderRadius: element.style?.borderRadius || 0,
            }}
          />
        )

      case "divider":
        return (
          <div
            className="w-full"
            style={{
              height: element.style?.height || 2,
              backgroundColor: element.style?.backgroundColor || "#000000",
              margin: "auto",
            }}
          />
        )

      default:
        return <div>Unknown element type</div>
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style as React.CSSProperties}
      className={`${isSelected ? "ring-2 ring-blue-500" : ""}`}
      onClick={(e) => {
        e.stopPropagation()
        onSelect()
      }}
      {...listeners}
      {...attributes}
    >
      {renderElementContent()}

      {/* Resize handles when selected */}
      {isSelected && (
        <>
          <div
            className="w-4 h-4 bg-blue-500 rounded-full absolute bottom-0 right-0 cursor-se-resize"
            onMouseDown={(e) => {
              e.stopPropagation()
              // Handle resize logic
              const startX = e.clientX
              const startY = e.clientY
              const startWidth = element.position.width
              const startHeight = element.position.height

              const handleMouseMove = (moveEvent: MouseEvent) => {
                const deltaX = moveEvent.clientX - startX
                const deltaY = moveEvent.clientY - startY
                onUpdate({
                  position: {
                    ...element.position,
                    width: Math.max(20, startWidth + deltaX / (zoom / 100)),
                    height: Math.max(20, startHeight + deltaY / (zoom / 100)),
                  },
                })
              }

              const handleMouseUp = () => {
                document.removeEventListener("mousemove", handleMouseMove)
                document.removeEventListener("mouseup", handleMouseUp)
              }

              document.addEventListener("mousemove", handleMouseMove)
              document.addEventListener("mouseup", handleMouseUp)
            }}
          />
          <div
            className="w-4 h-4 bg-blue-500 rounded-full absolute bottom-0 left-0 cursor-sw-resize"
            onMouseDown={(e) => {
              e.stopPropagation()
              // Handle resize logic for bottom-left
              const startX = e.clientX
              const startY = e.clientY
              const startWidth = element.position.width
              const startHeight = element.position.height
              const startLeft = element.position.x

              const handleMouseMove = (moveEvent: MouseEvent) => {
                const deltaX = startX - moveEvent.clientX
                const deltaY = moveEvent.clientY - startY
                const newWidth = Math.max(20, startWidth + deltaX / (zoom / 100))
                onUpdate({
                  position: {
                    ...element.position,
                    x: startLeft - (newWidth - startWidth),
                    width: newWidth,
                    height: Math.max(20, startHeight + deltaY / (zoom / 100)),
                  },
                })
              }

              const handleMouseUp = () => {
                document.removeEventListener("mousemove", handleMouseMove)
                document.removeEventListener("mouseup", handleMouseUp)
              }

              document.addEventListener("mousemove", handleMouseMove)
              document.addEventListener("mouseup", handleMouseUp)
            }}
          />
          <div
            className="w-4 h-4 bg-blue-500 rounded-full absolute top-0 right-0 cursor-ne-resize"
            onMouseDown={(e) => {
              e.stopPropagation()
              // Handle resize logic for top-right
              const startX = e.clientX
              const startY = e.clientY
              const startWidth = element.position.width
              const startHeight = element.position.height
              const startTop = element.position.y

              const handleMouseMove = (moveEvent: MouseEvent) => {
                const deltaX = moveEvent.clientX - startX
                const deltaY = startY - moveEvent.clientY
                const newHeight = Math.max(20, startHeight + deltaY / (zoom / 100))
                onUpdate({
                  position: {
                    ...element.position,
                    y: startTop - (newHeight - startHeight),
                    width: Math.max(20, startWidth + deltaX / (zoom / 100)),
                    height: newHeight,
                  },
                })
              }

              const handleMouseUp = () => {
                document.removeEventListener("mousemove", handleMouseMove)
                document.removeEventListener("mouseup", handleMouseUp)
              }

              document.addEventListener("mousemove", handleMouseMove)
              document.addEventListener("mouseup", handleMouseUp)
            }}
          />
          <div
            className="w-4 h-4 bg-blue-500 rounded-full absolute top-0 left-0 cursor-nw-resize"
            onMouseDown={(e) => {
              e.stopPropagation()
              // Handle resize logic for top-left
              const startX = e.clientX
              const startY = e.clientY
              const startWidth = element.position.width
              const startHeight = element.position.height
              const startLeft = element.position.x
              const startTop = element.position.y

              const handleMouseMove = (moveEvent: MouseEvent) => {
                const deltaX = startX - moveEvent.clientX
                const deltaY = startY - moveEvent.clientY
                const newWidth = Math.max(20, startWidth + deltaX / (zoom / 100))
                const newHeight = Math.max(20, startHeight + deltaY / (zoom / 100))
                onUpdate({
                  position: {
                    ...element.position,
                    x: startLeft - (newWidth - startWidth),
                    y: startTop - (newHeight - startHeight),
                    width: newWidth,
                    height: newHeight,
                  },
                })
              }

              const handleMouseUp = () => {
                document.removeEventListener("mousemove", handleMouseMove)
                document.removeEventListener("mouseup", handleMouseUp)
              }

              document.addEventListener("mousemove", handleMouseMove)
              document.addEventListener("mouseup", handleMouseUp)
            }}
          />
        </>
      )}
    </div>
  )
}
