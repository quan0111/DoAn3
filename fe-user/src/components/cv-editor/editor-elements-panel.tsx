"use client"

import {
  Type,
  ImageIcon,
  Square,
  Circle,
  Minus,
  Star,
  Award,
  Briefcase,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
} from "lucide-react"
import type { CVElement } from "@/lib/types"

interface EditorElementsPanelProps {
  onAddElement: (element: Omit<CVElement, "id" | "position">) => void
}

export function EditorElementsPanel({ onAddElement }: EditorElementsPanelProps) {
  const elementCategories = [
    {
      name: "Basic",
      elements: [
        {
          icon: <Type size={20} />,
          label: "Text",
          element: {
            type: "text",
            content: "Add your text here",
            style: { fontSize: 16, color: "#000000", fontFamily: "Arial" },
          },
        },
        {
          icon: <ImageIcon size={20} />,
          label: "Image",
          element: {
            type: "image",
            content: "/placeholder.svg?height=100&width=100",
            style: {},
          },
        },
        {
          icon: <Square size={20} />,
          label: "Rectangle",
          element: {
            type: "shape",
            content: "rectangle",
            style: { backgroundColor: "#e2e8f0", borderRadius: 0 },
          },
        },
        {
          icon: <Circle size={20} />,
          label: "Circle",
          element: {
            type: "shape",
            content: "circle",
            style: { backgroundColor: "#e2e8f0", borderRadius: "50%" },
          },
        },
        {
          icon: <Minus size={20} />,
          label: "Divider",
          element: {
            type: "divider",
            content: "divider",
            style: { backgroundColor: "#e2e8f0", height: 2 },
          },
        },
      ],
    },
    {
      name: "CV Sections",
      elements: [
        {
          icon: <Award size={20} />,
          label: "Header",
          element: {
            type: "text",
            content: "YOUR NAME",
            style: {
              fontSize: 32,
              fontWeight: "bold",
              color: "#333333",
              textAlign: "center",
              fontFamily: "Arial",
            },
          },
        },
        {
          icon: <Briefcase size={20} />,
          label: "Experience",
          element: {
            type: "text",
            content: "WORK EXPERIENCE",
            style: {
              fontSize: 18,
              fontWeight: "bold",
              color: "#333333",
              borderBottom: "2px solid #333333",
              paddingBottom: "5px",
              fontFamily: "Arial",
            },
          },
        },
        {
          icon: <GraduationCap size={20} />,
          label: "Education",
          element: {
            type: "text",
            content: "EDUCATION",
            style: {
              fontSize: 18,
              fontWeight: "bold",
              color: "#333333",
              borderBottom: "2px solid #333333",
              paddingBottom: "5px",
              fontFamily: "Arial",
            },
          },
        },
        {
          icon: <Star size={20} />,
          label: "Skills",
          element: {
            type: "text",
            content: "SKILLS",
            style: {
              fontSize: 18,
              fontWeight: "bold",
              color: "#333333",
              borderBottom: "2px solid #333333",
              paddingBottom: "5px",
              fontFamily: "Arial",
            },
          },
        },
      ],
    },
    {
      name: "Contact",
      elements: [
        {
          icon: <Mail size={20} />,
          label: "Email",
          element: {
            type: "text",
            content: "Email: your.email@example.com",
            style: { fontSize: 14, color: "#333333", fontFamily: "Arial" },
          },
        },
        {
          icon: <Phone size={20} />,
          label: "Phone",
          element: {
            type: "text",
            content: "Phone: (123) 456-7890",
            style: { fontSize: 14, color: "#333333", fontFamily: "Arial" },
          },
        },
        {
          icon: <MapPin size={20} />,
          label: "Location",
          element: {
            type: "text",
            content: "Location: City, Country",
            style: { fontSize: 14, color: "#333333", fontFamily: "Arial" },
          },
        },
        {
          icon: <Globe size={20} />,
          label: "Website",
          element: {
            type: "text",
            content: "Website: www.example.com",
            style: { fontSize: 14, color: "#333333", fontFamily: "Arial" },
          },
        },
        {
          icon: <Linkedin size={20} />,
          label: "LinkedIn",
          element: {
            type: "text",
            content: "LinkedIn: linkedin.com/in/yourname",
            style: { fontSize: 14, color: "#333333", fontFamily: "Arial" },
          },
        },
        {
          icon: <Github size={20} />,
          label: "GitHub",
          element: {
            type: "text",
            content: "GitHub: github.com/username",
            style: { fontSize: 14, color: "#333333", fontFamily: "Arial" },
          },
        },
      ],
    },
  ]

  return (
    <div className="p-4">
      <h3 className="font-medium mb-4">Elements</h3>

      {elementCategories.map((category) => (
        <div key={category.name} className="mb-6">
          <h4 className="text-sm font-medium text-gray-500 mb-2">{category.name}</h4>
          <div className="grid grid-cols-2 gap-2">
            {category.elements.map((item, index) => (
              <button
                key={`${category.name}-${index}`}
                className="flex flex-col items-center justify-center p-3 border rounded hover:bg-gray-50 transition-colors"
                onClick={() => onAddElement(item.element)}
              >
                <div className="text-gray-600 mb-1">{item.icon}</div>
                <span className="text-xs">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
