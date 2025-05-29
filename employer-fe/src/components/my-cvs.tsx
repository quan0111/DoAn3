"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Pencil, Trash2, Download, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { UserCVTemplate } from "@/lib/types"
import { getUserCVs, deleteUserCV } from "@/lib/mock-api"

export function MyCVs() {
  const navigate = useNavigate()
  const [userCVs, setUserCVs] = useState<UserCVTemplate[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUserCVs = async () => {
      try {
        const userId = "user-1"
        const cvs = await getUserCVs(userId)
        setUserCVs(cvs)
      } catch (error) {
        console.error("Lỗi khi lấy danh sách CV:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserCVs()
  }, [])

  const handleEditCV = (cvId: string) => {
    navigate(`/edit-cv/${cvId}`)
  }

  const handleDeleteCV = async (cvId: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa CV này không?")) {
      try {
        await deleteUserCV(cvId)
        setUserCVs(userCVs.filter((cv) => cv.id !== cvId))
      } catch (error) {
        console.error("Lỗi khi xóa CV:", error)
      }
    }
  }

  const handleViewCV = (cvId: string) => {
    navigate(`/view-cv/${cvId}`)
  }

  const handleDownloadCV = (cvId: string) => {
    alert("Tính năng tải xuống CV sẽ được triển khai sau")
  }

  if (isLoading) {
    return <div className="text-center py-8">Đang tải danh sách CV...</div>
  }

  if (userCVs.length === 0) {
    return <div className="text-center py-8">Bạn chưa có CV nào. Hãy tạo CV mới!</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {userCVs.map((cv) => (
        <div key={cv.id} className="border rounded-lg overflow-hidden shadow-sm">
          <div className="aspect-[210/297] relative">
            <img
              src={`/placeholder.svg?text=${encodeURIComponent(cv.name)}`}
              alt={cv.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
              <Button variant="default" size="sm" className="mr-2" onClick={() => handleViewCV(cv.id)}>
                <Eye className="h-4 w-4 mr-1" /> Xem
              </Button>
              <Button variant="default" size="sm" onClick={() => handleEditCV(cv.id)}>
                <Pencil className="h-4 w-4 mr-1" /> Sửa
              </Button>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-medium mb-1">{cv.name}</h3>
            <p className="text-sm text-gray-500 mb-3">Cập nhật: {new Date(cv.updatedAt).toLocaleDateString("vi-VN")}</p>
            <div className="flex justify-between">
              <Button variant="outline" size="sm" onClick={() => handleDownloadCV(cv.id)}>
                <Download className="h-4 w-4 mr-1" /> Tải xuống
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDeleteCV(cv.id)}>
                <Trash2 className="h-4 w-4 mr-1" /> Xóa
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
