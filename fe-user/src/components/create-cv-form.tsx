"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom" // Đúng cho React Router
import { X } from "lucide-react"
import type { CVTemplate } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createUserCV } from "@/lib/mock-api"
interface CreateCVFormProps {
  template: CVTemplate
  onClose: () => void
}

export function CreateCVForm({ template, onClose }: CreateCVFormProps) {
  const navigate = useNavigate() // ✅ Sử dụng đúng hook
  const [cvName, setCvName] = useState(`CV từ mẫu ${template.name}`)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Giả định userId là "user-1" - trong thực tế sẽ lấy từ authentication
      const userId = "user-1"

      const newCV = await createUserCV({
        userId,
        templateId: template.id,
        name: cvName,
      })

      // Chuyển hướng đến trang chỉnh sửa CV
      navigate(`/edit-cv/${newCV.id}`) // ✅ Sử dụng navigate thay vì router.push
    } catch (error) {
      console.error("Lỗi khi tạo CV:", error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Tạo CV mới</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center mb-4">
          <div className="w-20 h-28 overflow-hidden rounded border mr-4">
            <img
              src={template.thumbnail || "/placeholder.svg"}
              alt={template.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-medium">{template.name}</h4>
            <p className="text-sm text-gray-500">{template.description}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="cv-name">Tên CV</Label>
            <Input
              id="cv-name"
              value={cvName}
              onChange={(e) => setCvName(e.target.value)}
              placeholder="Nhập tên CV của bạn"
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Hủy
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Đang tạo..." : "Tạo CV"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
