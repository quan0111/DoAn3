"use client"

import { useState } from "react"
import { X } from "lucide-react"
import type { CVSection } from "@/lib/types"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

interface LayoutPanelProps {
  sections: CVSection[]
  onMoveSection: (fromIndex: number, toIndex: number) => void
  onClose: () => void
}

interface SortableItemProps {
  id: string
  title: string
}

function SortableItem({ id, title }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-gray-50 border rounded p-3 flex items-center cursor-move mb-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 text-gray-400 mr-2"
      >
        <line x1="4" x2="20" y1="9" y2="9" />
        <line x1="4" x2="20" y1="15" y2="15" />
      </svg>
      <span className="text-gray-700">{title}</span>
    </div>
  )
}

export function LayoutPanel({ sections, onMoveSection, onClose }: LayoutPanelProps) {
  const [items, setItems] = useState(sections)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id)
      const newIndex = items.findIndex((item) => item.id === over.id)

      const newItems = arrayMove(items, oldIndex, newIndex)
      setItems(newItems)
      onMoveSection(oldIndex, newIndex)
    }
  }

  return (
    <div className="bg-white border rounded-lg shadow-lg p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Bố cục CV</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="h-5 w-5" />
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-0">
            {items.map((section) => (
              <SortableItem key={section.id} id={section.id} title={section.title} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}
