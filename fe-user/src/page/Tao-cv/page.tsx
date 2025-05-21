"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { CanvaEditor } from "@/components/cv-editor/editor"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Save, Download, Eye } from "lucide-react"
import { templates } from "@/lib/templates"
import type { UserCVTemplate, CVTemplate } from "@/lib/types" // bạn điều chỉnh lại đường dẫn đúng nếu cần

const mockUserCV: UserCVTemplate = {
  id: "mock-cv-1",
  userId: "user-1",
  name: "CV của Nguyễn Văn A",
  templateId: "tham-vong",
  resumeId: "resume-123",
  content: {
    fullName: "Nguyễn Văn A",
    jobTitle: "Lập trình viên Backend",
    phone: "0123456789",
    email: "nguyenvana@example.com",
    website: "https://portfolio.example.com",
    location: "123 Đường ABC, Quận 1, TP.HCM",
  },
  customCss: "",
  lastEdited: new Date(),
  createdAt: new Date("2024-05-01T10:00:00Z"),
  updatedAt: new Date("2024-05-10T15:00:00Z"),
}

export default function CreateCVPage() {
  const params = useParams()
  const navigate = useNavigate()
    const cvId = params.id as string
  console.log("🧪 CV ID:", cvId)
  const [userCV, setUserCV] = useState<UserCVTemplate | null>(null)
  const [template, setTemplate] = useState<CVTemplate | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // ✅ Load dữ liệu mẫu
    const foundTemplate = templates.find((t) => t.id === mockUserCV.templateId) ?? null
    setUserCV(mockUserCV)
    setTemplate(foundTemplate)
    setIsLoading(false)
  }, [cvId])

  const handleBack = () => navigate("/")

  const handlePreview = () => navigate(`/view-cv/${cvId}`)

  const handleDownload = () => {
    alert("Tính năng tải xuống CV sẽ được phát triển sau!")
  }

  const handleSave = async () => {
    if (!userCV) return
    setIsSaving(true)
    try {
      // ✅ Giả lập hành động lưu
      console.log("🔒 Đã lưu CV:", userCV)
      alert("Lưu CV thành công (dữ liệu tĩnh)!")
    } catch (error) {
      console.error("❌ Lỗi khi lưu CV:", error)
      alert("Đã xảy ra lỗi khi lưu CV!")
    } finally {
      setIsSaving(false)
    }
  }

  const handleCVChange = (newContent: Partial<UserCVTemplate["content"]>) => {
    if (!userCV) return
    setUserCV({
      ...userCV,
      content: {
        ...userCV.content,
        ...newContent,
      },
      lastEdited: new Date(),
      updatedAt: new Date(),
    })
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">Đang tải dữ liệu CV...</div>
    )
  }

  if (!userCV || !template) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-500 mb-4">Không tìm thấy CV!</p>
        <Button onClick={handleBack}>Quay lại</Button>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="h-16 bg-white border-b flex items-center px-4">
        <Button variant="ghost" onClick={handleBack} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Quay lại
        </Button>
        <h1 className="text-xl font-bold">{userCV.name}</h1>
        <div className="ml-auto flex space-x-2">
          <Button variant="outline" onClick={handlePreview}>
            <Eye className="h-4 w-4 mr-2" /> Xem trước
          </Button>
          <Button variant="outline" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" /> Tải xuống
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" /> {isSaving ? "Đang lưu..." : "Lưu CV"}
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <CanvaEditor
          template={template}
          initialData={userCV}
          onChange={handleCVChange}
          onSave={handleSave}
        />
      </div>
    </div>
  )
}
