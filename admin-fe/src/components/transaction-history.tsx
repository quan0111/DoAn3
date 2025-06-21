
"use client"

import { useState, useEffect } from "react"
import { Search, Filter, Download, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { toast } from "sonner"
import axios from "axios"
import * as XLSX from "xlsx"
import { z } from "zod"

// Schema cho Transaction
const TransactionSchema = z.object({
  payment_id: z.number(),
  full_name: z.string(),
  email: z.string(),
  service_name: z.string(),
  original_price: z.string(),
  discounted_price: z.string(),
  discount_percent: z.number(),
  vat_percent: z.number(),
  total_amount: z.string(),
  payment_method: z.string(),
  status: z.enum(["paid", "pending", "failed"]),
  created_at: z.string(),
  paid_at: z.string().nullable(),
  expired_at: z.string().nullable(),
})

type Transaction = z.infer<typeof TransactionSchema>

export function TransactionHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [methodFilter, setMethodFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [viewTransaction, setViewTransaction] = useState<Transaction | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Fetch transactions from API
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true)
      try {

        const res = await axios.get("http://localhost:3000/user_paymentss", {
        })
        const validatedTransactions = z.array(TransactionSchema).parse(res.data)
        setTransactions(validatedTransactions)
        console.log("Dữ liệu giao dịch:", validatedTransactions)
      } catch (error: any) {
        console.error("Lỗi fetchTransactions:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        })
        toast.error(
          "Lỗi khi tải danh sách giao dịch: " +
            (error.response?.data?.message || error.message || "Dữ liệu không hợp lệ")
        )
      } finally {
        setLoading(false)
      }
    }
    fetchTransactions()
  }, [])



  // Filter transactions
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesMethod = methodFilter === "all" || transaction.payment_method === methodFilter
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter
    return matchesSearch && matchesMethod && matchesStatus
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  // Handle view details
  const handleViewDetails = (transaction: Transaction) => {
    setViewTransaction(transaction)
    setIsViewDialogOpen(true)
  }

  // Export to Excel
  const handleExportExcel = () => {
    try {
      const exportData = filteredTransactions.map((transaction) => ({
        "Người dùng": transaction.full_name,
        Email: transaction.email,
        "Dịch vụ": transaction.service_name,
        "Số tiền": isNaN(parseFloat(transaction.total_amount))
          ? "N/A"
          : `${parseFloat(transaction.total_amount).toLocaleString("vi-VN")} VNĐ`,
        "Phương thức": transaction.payment_method === "credit_card" ? "Thẻ tín dụng" : "Khác",
        "Trạng thái":
          transaction.status === "paid"
            ? "Đã thanh toán"
            : transaction.status === "pending"
            ? "Chờ xử lý"
            : "Thất bại",
        "Ngày thanh toán": transaction.paid_at
          ? new Date(transaction.paid_at).toLocaleDateString("vi-VN")
          : "N/A",
        "Hết hạn": transaction.expired_at
          ? new Date(transaction.expired_at).toLocaleDateString("vi-VN")
          : "N/A",
      }))
      const worksheet = XLSX.utils.json_to_sheet(exportData)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions")
      XLSX.utils.sheet_add_aoa(worksheet, [
        ["Người dùng", "Email", "Dịch vụ", "Số tiền", "Phương thức", "Trạng thái", "Ngày thanh toán", "Hết hạn"],
      ])
      XLSX.writeFile(workbook, "Danh_sach_giao_dich.xlsx", { compression: true })
      toast.success("Xuất danh sách giao dịch thành công")
    } catch (error: any) {
      toast.error("Lỗi khi xuất file Excel: " + error.message)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý lịch sử giao dịch</h1>
          <p className="text-gray-600">Quản lý các giao dịch dịch vụ và thanh toán</p>
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
                  placeholder="Tìm kiếm theo tên hoặc email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={methodFilter} onValueChange={setMethodFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Phương thức thanh toán" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="credit_card">Thẻ tín dụng</SelectItem>
                <SelectItem value="bank_transfer">Chuyển khoản</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="paid">Đã thanh toán</SelectItem>
                <SelectItem value="pending">Chờ xử lý</SelectItem>
                <SelectItem value="failed">Thất bại</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Bộ lọc nâng cao
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Người dùng</TableHead>
                <TableHead>Số tiền</TableHead>
                <TableHead>Dịch vụ</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ngày thanh toán</TableHead>
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
              ) : paginatedTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Không tìm thấy giao dịch
                  </TableCell>
                </TableRow>
              ) : (
                paginatedTransactions.map((transaction) => (
                  <TableRow key={transaction.payment_id}>
                    <TableCell className="font-medium">{transaction.full_name}</TableCell>
                    <TableCell>
                      {isNaN(parseFloat(transaction.total_amount))
                        ? "N/A"
                        : `${parseFloat(transaction.total_amount).toLocaleString("vi-VN")} VNĐ`}
                    </TableCell>
                    <TableCell>{transaction.service_name}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          transaction.status === "paid"
                            ? "default"
                            : transaction.status === "pending"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {transaction.status === "paid"
                          ? "Đã thanh toán"
                          : transaction.status === "pending"
                          ? "Chờ xử lý"
                          : "Thất bại"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {transaction.paid_at
                        ? new Date(transaction.paid_at).toLocaleDateString("vi-VN")
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Xem chi tiết"
                        onClick={() => handleViewDetails(transaction)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {!loading && filteredTransactions.length > 0 && (
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
            <span className="text-sm text-gray-600">trong {filteredTransactions.length} giao dịch</span>
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
            <span className="text-sm text-gray-600">Trang {currentPage} / {totalPages}</span>
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
            <DialogTitle>Chi tiết giao dịch</DialogTitle>
          </DialogHeader>
          {viewTransaction && (
            <div className="space-y-6">
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Người dùng:</span>
                    <span>{viewTransaction.full_name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Email:</span>
                    <span>{viewTransaction.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Dịch vụ:</span>
                    <span>{viewTransaction.service_name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Số tiền gốc:</span>
                    <span>
                      {isNaN(parseFloat(viewTransaction.original_price))
                        ? "N/A"
                        : `${parseFloat(viewTransaction.original_price).toLocaleString("vi-VN")} VNĐ`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Số tiền sau giảm:</span>
                    <span>
                      {isNaN(parseFloat(viewTransaction.discounted_price))
                        ? "N/A"
                        : `${parseFloat(viewTransaction.discounted_price).toLocaleString("vi-VN")} VNĐ`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Tổng tiền:</span>
                    <span>
                      {isNaN(parseFloat(viewTransaction.total_amount))
                        ? "N/A"
                        : `${parseFloat(viewTransaction.total_amount).toLocaleString("vi-VN")} VNĐ`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Phương thức thanh toán:</span>
                    <span>{viewTransaction.payment_method === "credit_card" ? "Thẻ tín dụng" : "Khác"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Trạng thái:</span>
                    <Badge
                      variant={
                        viewTransaction.status === "paid"
                          ? "default"
                          : viewTransaction.status === "pending"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {viewTransaction.status === "paid"
                        ? "Đã thanh toán"
                        : viewTransaction.status === "pending"
                        ? "Chờ xử lý"
                        : "Thất bại"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Ngày tạo:</span>
                    <span>
                      {viewTransaction.created_at
                        ? new Date(viewTransaction.created_at).toLocaleDateString("vi-VN")
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Ngày thanh toán:</span>
                    <span>
                      {viewTransaction.paid_at
                        ? new Date(viewTransaction.paid_at).toLocaleDateString("vi-VN")
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Hết hạn:</span>
                    <span>
                      {viewTransaction.expired_at
                        ? new Date(viewTransaction.expired_at).toLocaleDateString("vi-VN")
                        : "N/A"}
                    </span>
                  </div>
                </CardContent>
              </Card>
              <div className="flex justify-end">
                <DialogClose asChild>
                  <Button variant="outline">Đóng</Button>
                </DialogClose>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
