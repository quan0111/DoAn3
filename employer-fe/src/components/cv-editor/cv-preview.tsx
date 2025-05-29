"use client"

import { useState } from "react"
import type { CVSection, CVTemplate, CVData } from "@/lib/types"

interface CVPreviewProps {
  sections: CVSection[]
  template: CVTemplate
  cvData: CVData
  onUpdateSection: (id: string, content: string) => void
  onRemoveSection: (id: string) => void
  onUpdateCVData: (data: Partial<CVData>) => void
}

export function CVPreview({
  sections,
  template,
  cvData,
  onUpdateSection,
  onRemoveSection,
  onUpdateCVData,
}: CVPreviewProps) {
  const [editingSection, setEditingSection] = useState<string | null>(null)

  const handleEditSection = (id: string) => {
    setEditingSection(id)
  }

  const handleSaveSection = (id: string, content: string) => {
    onUpdateSection(id, content)
    setEditingSection(null)
  }

  return (
    <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
      <div className={`cv-preview ${template.className} p-8`}>
        <div className="cv-header mb-6">
          <div className="avatar-container mb-4">
            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto overflow-hidden">
              <img src="/placeholder.svg?height=128&width=128" alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-amber-500 mb-1">
              <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onUpdateCVData({ fullName: e.currentTarget.textContent || "" })}
              >
                {cvData.fullName}
              </span>
            </h1>
            <h2 className="text-lg font-semibold text-gray-700">
              <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onUpdateCVData({ jobTitle: e.currentTarget.textContent || "" })}
              >
                {cvData.jobTitle}
              </span>
            </h2>
          </div>
        </div>

        <div className="cv-contact-info mb-6">
          <h3 className="text-lg font-semibold text-amber-500 border-b border-amber-200 pb-1 mb-3">
            THÔNG TIN CÁ NHÂN
          </h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onUpdateCVData({ phone: e.currentTarget.textContent || "" })}
                className="text-gray-700"
              >
                {cvData.phone}
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onUpdateCVData({ email: e.currentTarget.textContent || "" })}
                className="text-gray-700"
              >
                {cvData.email}
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onUpdateCVData({ website: e.currentTarget.textContent || "" })}
                className="text-gray-700"
              >
                {cvData.website}
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onUpdateCVData({ location: e.currentTarget.textContent || "" })}
                className="text-gray-700"
              >
                {cvData.location}
              </span>
            </div>
          </div>
        </div>

        {sections.map((section) => (
          <div key={section.id} className="cv-section mb-6 relative group">
            <div className="absolute right-0 top-0 hidden group-hover:flex space-x-1">
              <button
                onClick={() => handleEditSection(section.id)}
                className="bg-gray-100 hover:bg-gray-200 p-1 rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-10 10a2 2 0 01-.707.707l-4 1a1 1 0 01-1.414-1.414l1-4a2 2 0 01.707-.707l10-10z" />
                </svg>
              </button>
              <button onClick={() => onRemoveSection(section.id)} className="bg-gray-100 hover:bg-red-100 p-1 rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-600 hover:text-red-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <h3 className="text-lg font-semibold text-amber-500 border-b border-amber-200 pb-1 mb-3">
              {section.title}
            </h3>

            {editingSection === section.id ? (
              <div className="mb-2">
                <textarea
                  className="w-full p-2 border rounded"
                  rows={6}
                  defaultValue={section.content}
                  onBlur={(e) => handleSaveSection(section.id, e.target.value)}
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => handleSaveSection(section.id, section.content)}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded mr-2"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={(e) =>
                      handleSaveSection(
                        section.id,
                        (e.currentTarget.previousSibling?.previousSibling as HTMLTextAreaElement).value,
                      )
                    }
                    className="px-3 py-1 bg-emerald-600 text-white rounded"
                  >
                    Lưu
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: section.content }} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
