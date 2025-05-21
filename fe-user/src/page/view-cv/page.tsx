"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import type { UserCVTemplate } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Pencil } from "lucide-react"

export default function ViewCVPage() {
  const params = useParams()
  const Navigate = useNavigate()
  const cvId = params.id as string

  const [userCV, setUserCV] = useState<UserCVTemplate | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // useEffect(() => {
  //   const fetchCV = async () => {
  //     try {
  //       const cv = await getUserCVById(cvId)
  //       setUserCV(cv ?? null)
  //     } catch (error) {
  //       console.error("Lỗi khi lấy thông tin CV:", error)
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }

  //   fetchCV()
  // }, [cvId])

  const handleEdit = () => {
    Navigate(`/tao-cv/${cvId}`)
  }

  const handleDownload = () => {
    alert("Tính năng tải xuống CV sẽ được triển khai sau")
  }

  const handleBack = () => {
    Navigate("/")
  }

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8 text-center">Đang tải thông tin CV...</div>
  }

  if (!userCV) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-500 mb-4">Không tìm thấy CV!</p>
        <Button onClick={handleBack}>Quay lại</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={handleBack} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Quay lại
          </Button>
          <h1 className="text-2xl font-bold">{userCV.name}</h1>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" /> Tải xuống
          </Button>
          <Button onClick={handleEdit}>
            <Pencil className="h-4 w-4 mr-2" /> Chỉnh sửa
          </Button>
        </div>
      </div>

      <div className="bg-white border rounded-lg shadow-md p-8 max-w-[210mm] mx-auto">
        {/* Đây là nơi hiển thị CV dựa trên template và dữ liệu */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">CV Preview</h2>
          <p className="text-gray-600">
            Đây là bản xem trước của CV "{userCV.name}" sử dụng mẫu "{userCV.templateId}"
          </p>
        </div>

        <div className="border-t pt-4">
          <p className="text-gray-500 text-sm">
            Cập nhật lần cuối: {new Date(userCV.updatedAt).toLocaleString("vi-VN")}
          </p>
        </div>
      </div>
    </div>
  )
}
