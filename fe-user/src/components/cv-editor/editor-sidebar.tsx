"use client"

import { LayoutGrid, Type, ImageIcon, Square, PaintBucket, Upload, Layers } from "lucide-react"

interface EditorSidebarProps {
  activePanel: string
  setActivePanel: (panel: string) => void
}

export function EditorSidebar({ activePanel, setActivePanel }: EditorSidebarProps) {
  const menuItems = [
    { id: "elements", icon: <LayoutGrid size={20} />, label: "Elements" },
    { id: "text", icon: <Type size={20} />, label: "Text" },
    { id: "images", icon: <ImageIcon size={20} />, label: "Images" },
    { id: "shapes", icon: <Square size={20} />, label: "Shapes" },
    { id: "background", icon: <PaintBucket size={20} />, label: "Background" },
    { id: "uploads", icon: <Upload size={20} />, label: "Uploads" },
    { id: "layers", icon: <Layers size={20} />, label: "Layers" },
  ]

  return (
    <div className="w-16 bg-gray-900 text-white flex flex-col items-center py-4">
      {menuItems.map((item) => (
        <button
          key={item.id}
          className={`w-full flex flex-col items-center justify-center py-3 px-2 ${
            activePanel === item.id ? "bg-gray-700" : "hover:bg-gray-800"
          }`}
          onClick={() => setActivePanel(item.id)}
          title={item.label}
        >
          {item.icon}
          <span className="text-xs mt-1">{item.label}</span>
        </button>
      ))}
    </div>
  )
}
