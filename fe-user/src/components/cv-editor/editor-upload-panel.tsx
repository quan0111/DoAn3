"use client"

import type React from "react"

import { useState } from "react"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { CVElement } from "@/lib/types"

interface EditorUploadsPanelProps {
  onSelectUpload: (element: Omit<CVElement, "id" | "position">) => void
}

export function EditorUploadsPanel({ onSelectUpload }: EditorUploadsPanelProps) {
  const [uploads, setUploads] = useState<{ id: string; url: string; name: string }[]>([
    { id: "1", url: "/placeholder.svg?height=100&width=100&text=Upload+1", name: "profile-photo.jpg" },
    { id: "2", url: "/placeholder.svg?height=100&width=100&text=Upload+2", name: "company-logo.png" },
  ])
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    // In a real app, you would upload the files to a server
    // and get back URLs to use in the CV
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newUploads = Array.from(e.dataTransfer.files).map((file, index) => ({
        id: `upload-${Date.now()}-${index}`,
        // In a real app, this would be the URL from your server
        url: "/placeholder.svg?height=100&width=100&text=New+Upload",
        name: file.name,
      }))

      setUploads([...uploads, ...newUploads])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real app, you would upload the files to a server
    // and get back URLs to use in the CV
    if (e.target.files && e.target.files.length > 0) {
      const newUploads = Array.from(e.target.files).map((file, index) => ({
        id: `upload-${Date.now()}-${index}`,
        // In a real app, this would be the URL from your server
        url: "/placeholder.svg?height=100&width=100&text=New+Upload",
        name: file.name,
      }))

      setUploads([...uploads, ...newUploads])
    }
  }

  const handleRemoveUpload = (id: string) => {
    setUploads(uploads.filter((upload) => upload.id !== id))
  }

  const handleSelectUpload = (upload: { url: string; name: string }) => {
    onSelectUpload({
      type: "image",
      content: upload.url,
      style: {},
    })
  }

  return (
    <div className="p-4">
      <h3 className="font-medium mb-4">Your Uploads</h3>

      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center mb-6 ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
        <p className="text-sm text-gray-500 mb-2">Drag and drop files here</p>
        <p className="text-xs text-gray-400 mb-4">or</p>
        <Button size="sm" asChild>
          <label>
            Browse Files
            <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" multiple />
          </label>
        </Button>
      </div>

      {uploads.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {uploads.map((upload) => (
            <div key={upload.id} className="relative group">
              <button
                className="w-full h-24 border rounded overflow-hidden hover:border-blue-500"
                onClick={() => handleSelectUpload(upload)}
              >
                <img src={upload.url || "/placeholder.svg"} alt={upload.name} className="w-full h-full object-cover" />
              </button>
              <button
                className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleRemoveUpload(upload.id)}
              >
                <X className="h-3 w-3 text-gray-600" />
              </button>
              <p className="text-xs truncate mt-1">{upload.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 text-center">No uploads yet</p>
      )}
    </div>
  )
}
