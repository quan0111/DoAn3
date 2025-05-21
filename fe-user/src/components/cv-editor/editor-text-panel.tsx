"use client"

import type { CVElement } from "@/lib/types"

interface EditorTextPanelProps {
  onAddText: (element: Omit<CVElement, "id" | "position">) => void
}

export function EditorTextPanel({ onAddText }: EditorTextPanelProps) {
  const textStyles = [
    {
      name: "Heading 1",
      element: {
        type: "text",
        content: "Heading 1",
        style: {
          fontSize: 32,
          fontWeight: "bold",
          color: "#333333",
          fontFamily: "Arial",
        },
      },
    },
    {
      name: "Heading 2",
      element: {
        type: "text",
        content: "Heading 2",
        style: {
          fontSize: 24,
          fontWeight: "bold",
          color: "#333333",
          fontFamily: "Arial",
        },
      },
    },
    {
      name: "Heading 3",
      element: {
        type: "text",
        content: "Heading 3",
        style: {
          fontSize: 18,
          fontWeight: "bold",
          color: "#333333",
          fontFamily: "Arial",
        },
      },
    },
    {
      name: "Subtitle",
      element: {
        type: "text",
        content: "Subtitle text",
        style: {
          fontSize: 16,
          fontWeight: "normal",
          fontStyle: "italic",
          color: "#666666",
          fontFamily: "Arial",
        },
      },
    },
    {
      name: "Body Text",
      element: {
        type: "text",
        content: "Body text paragraph. Click to edit this text.",
        style: {
          fontSize: 14,
          fontWeight: "normal",
          color: "#333333",
          fontFamily: "Arial",
          lineHeight: 1.5,
        },
      },
    },
    {
      name: "Small Text",
      element: {
        type: "text",
        content: "Small text for details and footnotes",
        style: {
          fontSize: 12,
          fontWeight: "normal",
          color: "#666666",
          fontFamily: "Arial",
        },
      },
    },
    {
      name: "Section Title",
      element: {
        type: "text",
        content: "SECTION TITLE",
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
      name: "Job Title",
      element: {
        type: "text",
        content: "Job Title | Company Name",
        style: {
          fontSize: 16,
          fontWeight: "bold",
          color: "#333333",
          fontFamily: "Arial",
        },
      },
    },
    {
      name: "Date Range",
      element: {
        type: "text",
        content: "Jan 2020 - Present",
        style: {
          fontSize: 14,
          fontWeight: "normal",
          color: "#666666",
          fontFamily: "Arial",
        },
      },
    },
    {
      name: "Bullet Point",
      element: {
        type: "text",
        content: "• Bullet point item",
        style: {
          fontSize: 14,
          fontWeight: "normal",
          color: "#333333",
          fontFamily: "Arial",
          paddingLeft: "10px",
        },
      },
    },
  ]

  return (
    <div className="p-4">
      <h3 className="font-medium mb-4">Text Styles</h3>
      <div className="space-y-3">
        {textStyles.map((style, index) => (
          <button
            key={index}
            className="w-full text-left p-3 border rounded hover:bg-gray-50 transition-colors"
            onClick={() => onAddText(style.element)}
          >
            <div
              style={{
                ...style.element.style,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {style.element.content}
            </div>
            <div className="text-xs text-gray-500 mt-1">{style.name}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
