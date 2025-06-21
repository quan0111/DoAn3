
"use client"

import { useState, useEffect } from "react"
import { Search, Filter, Download, Eye, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import axios from "axios"
import * as XLSX from "xlsx"

type Feedback = {
  feedback_id: number
  user_id: number
  user_name: string
  subject: string
  type: string
  status: string
  rating:number
  created_at: string
  updated_at: string
}


export function FeedbackManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [viewFeedback, setViewFeedback] = useState<Feedback | null>(null)
  const [responseMessage, setResponseMessage] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Fetch feedbacks from API
  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true)
      try {
        const res = await axios.get("http://localhost:3000/feedbackss", {
        })
        setFeedbacks(res.data)
      } catch (error: any) {
        toast.error("Lỗi khi tải danh sách phản hồi: " + (error.response?.data?.message || error.message))
      } finally {
        setLoading(false)
      }
    }
    fetchFeedbacks()
  }, [])

  // Filter feedbacks
  const filteredFeedbacks = feedbacks.filter((feedback) => {
    const matchesSearch = feedback.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || feedback.type === typeFilter
    const matchesStatus = statusFilter === "all" || feedback.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredFeedbacks.length / itemsPerPage)
  const paginatedFeedbacks = filteredFeedbacks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  // Handle view details
  const handleViewDetails = (feedback: Feedback) => {
    setViewFeedback(feedback)
    setResponseMessage("")
    setIsViewDialogOpen(true)
  }

  // Handle send response
  const handleSendResponse = async () => {
  if (!viewFeedback || !responseMessage.trim()) {
    toast.error("Vui lòng nhập nội dung phản hồi")
    return
  }
  if (viewFeedback.status === "resolved") {
    toast.error("Phản hồi đã được xử lý, không thể gửi lại")
    return
  }
  try {
    // Gửi thông báo phản hồi
    await axios.post(
      "http://localhost:3000/notificationss",
      {
        user_id: viewFeedback.user_id,
        message: responseMessage,
        type: "feedback_response",
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    )

    // Cập nhật trạng thái phản hồi trên backend
    await axios.put(
      `http://localhost:3000/feedbackss/${viewFeedback.feedback_id}`,
      { status: "resolved" },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    )

    // Cập nhật state
    const updatedFeedbacks = feedbacks.map((f) =>
      f.feedback_id === viewFeedback.feedback_id ? { ...f, status: "resolved" } : f
    )
    setFeedbacks(updatedFeedbacks) // Sửa lỗi thiếu tham số
    setViewFeedback({ ...viewFeedback, status: "resolved" })
    toast.success("Gửi phản hồi thành công")
    setResponseMessage("")
  } catch (error: any) {
    toast.error("Lỗi khi gửi phản hồi: " + (error.response?.data?.message || error.message))
  }
}
  // Export to Excel
  const handleExportExcel = () => {
    try {
      const exportData = filteredFeedbacks.map((feedback) => ({
        "Người gửi": feedback.user_name,
        "Nội dung": feedback.subject,
        "Loại phản hồi": feedback.type === "complaint" ? "Phàn nàn" : "Gợi ý",
        "Trạng thái": feedback.status === "pending" ? "Chưa xử lý" : "Đã xử lý",
        "Ngày gửi": new Date(feedback.created_at).toLocaleDateString("vi-VN"),
        "Cập nhật cuối": new Date(feedback.updated_at).toLocaleDateString("vi-VN"),
      }))
      const worksheet = XLSX.utils.json_to_sheet(exportData)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, "Feedbacks")
      XLSX.utils.sheet_add_aoa(worksheet, [
        ["Người gửi", "Nội dung", "Loại phản hồi", "Trạng thái", "Ngày gửi", "Cập nhật cuối"],
      ])
      XLSX.writeFile(workbook, "Danh_sach_phan_hoi.xlsx", { compression: true })
      toast.success("Xuất danh sách phản hồi thành công")
    } catch (error: any) {
      toast.error("Lỗi khi xuất file Excel: " + error.message)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý phản hồi người dùng</h1>
          <p className="text-gray-600">Quản lý phản hồi và khiếu nại từ người dùng</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600" onClick={handleExportExcel}>
          <Download className="w-4 h-4 mr-2" />
          Xuất danh sách
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Bộ lọc và tìm kiếm</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Tìm kiếm theo tên người gửi hoặc nội dung..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Loại phản hồi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="complaint">Phàn nàn</SelectItem>
                <SelectItem value="suggestion">Gợi ý</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="pending">Chưa xử lý</SelectItem>
                <SelectItem value="resolved">Đã xử lý</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Bộ lọc nâng cao
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Feedbacks Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Người gửi</TableHead>
                <TableHead>Nội dung</TableHead>
                <TableHead>Loại phản hồi</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ngày gửi</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Đang tải...
                  </TableCell>
                </TableRow>
              ) : paginatedFeedbacks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Không tìm thấy phản hồi
                  </TableCell>
                </TableRow>
              ) : (
                paginatedFeedbacks.map((feedback) => (
                  <TableRow key={feedback.feedback_id}>
                    <TableCell className="font-medium">{feedback.user_name}</TableCell>
                    <TableCell className="max-w-xs truncate">{feedback.subject}</TableCell>
                    <TableCell>
                      {feedback.type === "complaint" ? "Phàn nàn" : "Gợi ý"}
                    </TableCell>
                    <TableCell>
                      <Badge variant={feedback.status === "resolved" ? "default" : "secondary"}>
                        {feedback.status === "pending" ? "Chưa xử lý" : "Đã xử lý"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(feedback.created_at).toLocaleDateString("vi-VN")}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Xem chi tiết"
                          onClick={() => handleViewDetails(feedback)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Trả lời"
                          onClick={() => handleViewDetails(feedback)}
                        >
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {!loading && filteredFeedbacks.length > 0 && (
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Hiển thị</span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => {
                setItemsPerPage(parseInt(value))
                setCurrentPage(1)
              }}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-gray-600">
              trong {filteredFeedbacks.length} phản hồi
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Trước
            </Button>
            <span className="text-sm text-gray-600">
              Trang {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Sau
            </Button>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Chi tiết phản hồi</DialogTitle>
          </DialogHeader>
          {viewFeedback && (
            <div className="space-y-6">
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Người gửi:</span>
                    <span>{viewFeedback.user_name}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="font-medium">Nội dung:</span>
                    <span>{viewFeedback.subject}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Loại phản hồi:</span>
                    <span>{viewFeedback.type === "complaint" ? "Phàn nàn" : "Gợi ý"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Trạng thái:</span>
                    <Badge variant={viewFeedback.status === "resolved" ? "default" : "secondary"}>
                      {viewFeedback.status === "pending" ? "Chưa xử lý" : "Đã xử lý"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Ngày gửi:</span>
                    <span>{new Date(viewFeedback.created_at).toLocaleDateString("vi-VN")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Cập nhật lần cuối:</span>
                    <span>{new Date(viewFeedback.updated_at).toLocaleDateString("vi-VN")}</span>
                  </div>
                </CardContent>
              </Card>
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <span className="font-medium">Phản hồi:</span>
                  <Textarea
                    placeholder="Nhập phản hồi của bạn..."
                    value={responseMessage}
                    onChange={(e) => setResponseMessage(e.target.value)}
                    rows={4}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    onClick={handleSendResponse}
                    disabled={!responseMessage.trim() || viewFeedback.status === "resolved"}
                  >
                    Gửi phản hồi
                  </Button>
                  <DialogClose asChild>
                    <Button variant="outline">Đóng</Button>
                  </DialogClose>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}