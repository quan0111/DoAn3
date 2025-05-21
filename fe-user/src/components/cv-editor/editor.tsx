"use client"

import { useState, useRef, useEffect } from "react"
import { DndContext, type DragEndEvent, type DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { EditorSidebar } from "./editor-sidebar"
import { EditorCanvas } from "./editor-canvas"
import { EditorProperties } from "./editor-propeties"
import { EditorToolbar } from "./editor-toolbar"
import { EditorElementsPanel } from "./editor-elements-panel"
import { EditorTextPanel } from "./editor-text-panel"
import { EditorImagesPanel } from "./editor-images-panel"
import { EditorBackgroundPanel } from "./editor-backfround-panel"
import { EditorUploadsPanel } from "./editor-upload-panel"
import { useHotkeys } from "react-hotkeys-hook"
import type { CVTemplate, UserCVTemplate, CVElement, ElementStyle } from "@/lib/types"

interface CanvaEditorProps {
  template: CVTemplate
  initialData?: UserCVTemplate
  onChange?: (data: Partial<UserCVTemplate>) => void
  onSave?: () => void
}

export function CanvaEditor({ template, initialData, onChange, onSave }: CanvaEditorProps) {
  const [activePanel, setActivePanel] = useState<string>("elements")
  const [elements, setElements] = useState<CVElement[]>(initialData?.content?.elements || [])
  const [selectedElement, setSelectedElement] = useState<CVElement | null>(null)
  const [zoom, setZoom] = useState(100)
  const [history, setHistory] = useState<CVElement[][]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isDragging, setIsDragging] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)

  // Configure DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 5px of movement required before activating
      },
    }),
  )

  // Initialize with template elements if no initial data
  useEffect(() => {
    if (elements.length === 0 && template) {
      const templateElements = getTemplateDefaultElements(template)
      setElements(templateElements)
      addToHistory(templateElements)
    }
  }, [template])

  // Update parent component when elements change
  useEffect(() => {
    if (onChange) {
      onChange({
        content: {
          elements,
          settings: {
            pageSize: "A4",
            orientation: "portrait",
            margins: { top: 20, right: 20, bottom: 20, left: 20 },
          },
        },
      })
    }
  }, [elements, onChange])

  // Add current state to history
  const addToHistory = (newElements: CVElement[]) => {
    const newHistory = [...history.slice(0, historyIndex + 1), [...newElements]]
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  // Undo/Redo functionality
  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setElements([...history[historyIndex - 1]])
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setElements([...history[historyIndex + 1]])
    }
  }

  // Hotkeys for common actions
  useHotkeys("ctrl+z", undo, { preventDefault: true })
  useHotkeys("ctrl+y, ctrl+shift+z", redo, { preventDefault: true })
  useHotkeys("delete, backspace", () => {
    if (selectedElement) {
      deleteElement(selectedElement.id)
    }
  })
  useHotkeys(
    "ctrl+s",
    () => {
      if (onSave) onSave()
    },
    { preventDefault: true },
  )

  // Element manipulation functions
  const addElement = (element: Omit<CVElement, "id" | "position">) => {
    const newElement: CVElement = {
      ...element,
      id: `element-${Date.now()}`,
      position: { x: 100, y: 100, width: 200, height: element.type === "text" ? 50 : 100 },
      zIndex: elements.length + 1,
    }

    const newElements = [...elements, newElement]
    setElements(newElements)
    setSelectedElement(newElement)
    addToHistory(newElements)
  }

  const updateElement = (id: string, updates: Partial<CVElement>) => {
    const newElements = elements.map((el) => (el.id === id ? { ...el, ...updates } : el))
    setElements(newElements)

    // Update selected element if it's the one being modified
    if (selectedElement && selectedElement.id === id) {
      setSelectedElement({ ...selectedElement, ...updates })
    }

    // Only add to history if not dragging (to avoid too many history entries)
    if (!isDragging) {
      addToHistory(newElements)
    }
  }

  const deleteElement = (id: string) => {
    const newElements = elements.filter((el) => el.id !== id)
    setElements(newElements)
    setSelectedElement(null)
    addToHistory(newElements)
  }

  const duplicateElement = (id: string) => {
    const elementToDuplicate = elements.find((el) => el.id === id)
    if (!elementToDuplicate) return

    const newElement: CVElement = {
      ...elementToDuplicate,
      id: `element-${Date.now()}`,
      position: {
        ...elementToDuplicate.position,
        x: elementToDuplicate.position.x + 20,
        y: elementToDuplicate.position.y + 20,
      },
      zIndex: Math.max(...elements.map((el) => el.zIndex || 0)) + 1,
    }

    const newElements = [...elements, newElement]
    setElements(newElements)
    setSelectedElement(newElement)
    addToHistory(newElements)
  }

  const bringForward = (id: string) => {
    const element = elements.find((el) => el.id === id)
    if (!element) return

    const maxZIndex = Math.max(...elements.map((el) => el.zIndex || 0))
    if (element.zIndex === maxZIndex) return

    const newElements = elements.map((el) => (el.id === id ? { ...el, zIndex: (el.zIndex || 0) + 1 } : el))
    setElements(newElements)
    addToHistory(newElements)
  }

  const sendBackward = (id: string) => {
    const element = elements.find((el) => el.id === id)
    if (!element || element.zIndex === 1) return

    const newElements = elements.map((el) => (el.id === id ? { ...el, zIndex: Math.max(1, (el.zIndex || 0) - 1) } : el))
    setElements(newElements)
    addToHistory(newElements)
  }

  const handleDragStart = (event: DragStartEvent) => {
    setIsDragging(true)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setIsDragging(false)

    const { active, delta } = event
    const elementId = active.id as string

    // Find the element
    const element = elements.find((el) => el.id === elementId)
    if (!element) return

    // Update position based on delta
    updateElement(elementId, {
      position: {
        ...element.position,
        x: element.position.x + delta.x / (zoom / 100),
        y: element.position.y + delta.y / (zoom / 100),
      },
    })

    addToHistory([...elements])
  }

  const handleElementSelect = (element: CVElement | null) => {
    setSelectedElement(element)
  }

  const handleStyleChange = (style: Partial<ElementStyle>) => {
    if (!selectedElement) return

    updateElement(selectedElement.id, {
      style: { ...selectedElement.style, ...style },
    })
  }

  const handleContentChange = (content: string) => {
    if (!selectedElement) return

    updateElement(selectedElement.id, { content })
  }

  const handleSave = () => {
    if (onSave) onSave()
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex h-[calc(100vh-120px)] overflow-hidden bg-gray-100">
        {/* Left Sidebar - Tools */}
        <EditorSidebar activePanel={activePanel} setActivePanel={setActivePanel} />

        {/* Left Panel - Elements, Text, Images, etc. */}
        <div className="w-64 bg-white border-r overflow-y-auto">
          {activePanel === "elements" && <EditorElementsPanel onAddElement={addElement} />}
          {activePanel === "text" && <EditorTextPanel onAddText={addElement} />}
          {activePanel === "images" && <EditorImagesPanel onAddImage={addElement} />}
          {activePanel === "background" && <EditorBackgroundPanel onApplyBackground={handleStyleChange} />}
          {activePanel === "uploads" && <EditorUploadsPanel onSelectUpload={addElement} />}
        </div>

        {/* Main Canvas */}
        <div className="flex-1 overflow-auto bg-gray-200 flex justify-center p-8">
          <EditorCanvas
            ref={canvasRef}
            elements={elements}
            selectedElement={selectedElement}
            onSelectElement={handleElementSelect}
            onUpdateElement={updateElement}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => {
              setIsDragging(false)
              addToHistory([...elements])
            }}
            zoom={zoom}
            template={template}
          />
        </div>

        {/* Right Sidebar - Properties */}
        <div className="w-72 bg-white border-l overflow-y-auto">
          <EditorProperties
            selectedElement={selectedElement}
            onStyleChange={handleStyleChange}
            onContentChange={handleContentChange}
            onDelete={selectedElement ? () => deleteElement(selectedElement.id) : undefined}
            onDuplicate={selectedElement ? () => duplicateElement(selectedElement.id) : undefined}
            onBringForward={selectedElement ? () => bringForward(selectedElement.id) : undefined}
            onSendBackward={selectedElement ? () => sendBackward(selectedElement.id) : undefined}
          />
        </div>

        {/* Top Toolbar */}
        <EditorToolbar
          onUndo={undo}
          onRedo={redo}
          canUndo={historyIndex > 0}
          canRedo={historyIndex < history.length - 1}
          zoom={zoom}
          onZoomChange={setZoom}
          onSave={handleSave}
        />
      </div>
    </DndContext>
  )
}

// Helper function to get default elements from a template
function getTemplateDefaultElements(template: CVTemplate): CVElement[] {
  // In a real app, this would come from the template definition
  return [
    {
      id: "header-1",
      type: "text",
      content: "Nguyễn Văn A",
      position: { x: 100, y: 50, width: 400, height: 60 },
      style: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#333333",
        fontFamily: "Arial",
        textAlign: "center",
      },
      zIndex: 1,
    },
    {
      id: "job-title",
      type: "text",
      content: "Frontend Developer",
      position: { x: 100, y: 120, width: 400, height: 40 },
      style: {
        fontSize: 18,
        fontWeight: "normal",
        color: "#666666",
        fontFamily: "Arial",
        textAlign: "center",
      },
      zIndex: 2,
    },
    {
      id: "contact-info",
      type: "text",
      content: "Email: example@gmail.com | Phone: 0123 456 789 | Location: Hà Nội, Việt Nam",
      position: { x: 100, y: 170, width: 400, height: 30 },
      style: {
        fontSize: 14,
        fontWeight: "normal",
        color: "#666666",
        fontFamily: "Arial",
        textAlign: "center",
      },
      zIndex: 3,
    },
    {
      id: "section-1",
      type: "text",
      content: "PROFESSIONAL SUMMARY",
      position: { x: 50, y: 230, width: 500, height: 40 },
      style: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333333",
        fontFamily: "Arial",
        textAlign: "left",
        borderBottom: "2px solid #333333",
        paddingBottom: "5px",
      },
      zIndex: 4,
    },
    {
      id: "summary",
      type: "text",
      content:
        "Experienced Frontend Developer with 5+ years of expertise in building responsive web applications using React, Next.js, and TypeScript. Passionate about creating intuitive user interfaces and optimizing web performance.",
      position: { x: 50, y: 280, width: 500, height: 80 },
      style: {
        fontSize: 14,
        fontWeight: "normal",
        color: "#333333",
        fontFamily: "Arial",
        textAlign: "left",
        lineHeight: 1.5,
      },
      zIndex: 5,
    },
  ]
}
