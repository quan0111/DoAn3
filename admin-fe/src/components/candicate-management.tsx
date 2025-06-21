
"use client"

import { useState, useEffect } from "react"
import { Search, Filter, Download, Eye, MessageSquare, Phone, Mail, MapPin, Calendar, Link, Users, Briefcase, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { toast } from "sonner"
import axios from "axios"
import * as XLSX from "xlsx"

type Candidate = {
  user_id: number
  career_goals: string
  desired_position: string
  experience_years: number
  desired_salary_min: string
  desired_salary_max: string
  job_preferences: {
    job_type: string
    location: string
  }
  linkedin_url: string
  portfolio_url: string
  created_at: string
  updated_at: string
  full_name: string
  email: string
  phone: string
  gender: string
  dob: string
  avatar_url: string | null
  role: string
  user_created_at: string
  user_updated_at: string
  is_active: number
  last_login: string
}

export function CandidateManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loading, setLoading] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [viewCandidate, setViewCandidate] = useState<Candidate | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const normalizeUrl = (url:string) => {
  if (!url) return "Chưa cung cấp";
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return `https://${url}`;
  }
  return url;
};
  // Fetch candidates from API
  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true)
      try {
        const res = await axios.get("http://localhost:3000/jobseekerss" , {
        })
        setCandidates(res.data)
      } catch (error: any) {
        toast.error("Lỗi khi tải danh sách ứng viên: " + (error.response?.data?.message || error.message))
      } finally {
        setLoading(false)
      }
    }
    fetchCandidates()
  }, [])

  // Filter candidates
  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.desired_position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && candidate.is_active === 1) ||
      (statusFilter === "inactive" && candidate.is_active === 0)
    const matchesLocation = locationFilter === "all" || candidate.job_preferences.location === locationFilter
    return matchesSearch && matchesStatus && matchesLocation
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage)
  const paginatedCandidates = filteredCandidates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  // Export to Excel
  const handleExportExcel = () => {
    try {
      const exportData = filteredCandidates.map((candidate) => ({
        "Tên": candidate.full_name,
        "Email": candidate.email,
        "Số điện thoại": candidate.phone,
        "Vị trí mong muốn": candidate.desired_position,
        "Kinh nghiệm": `${candidate.experience_years} năm`,
        "Địa điểm": candidate.job_preferences.location,
        "Loại công việc": candidate.job_preferences.job_type,
        "Mức lương tối thiểu": `${parseFloat(candidate.desired_salary_min).toLocaleString("vi-VN")} triệu`,
        "Mức lương tối đa": `${parseFloat(candidate.desired_salary_max).toLocaleString("vi-VN")} triệu`,
        "Mục tiêu nghề nghiệp": candidate.career_goals,
        "LinkedIn": candidate.linkedin_url,
        "Portfolio": candidate.portfolio_url,
        "Trạng thái": candidate.is_active === 1 ? "Hoạt động" : "Không hoạt động",
        "Hoạt động cuối": new Date(candidate.last_login).toLocaleDateString("vi-VN"),
        "Ngày tham gia": new Date(candidate.user_created_at).toLocaleDateString("vi-VN"),
        "Giới tính": candidate.gender === "male" ? "Nam" : "Nữ",
        "Ngày sinh": new Date(candidate.dob).toLocaleDateString("vi-VN"),
      }))

      const worksheet = XLSX.utils.json_to_sheet(exportData)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, "Candidates")
      XLSX.utils.sheet_add_aoa(worksheet, [
        [
          "Tên",
          "Email",
          "Số điện thoại",
          "Vị trí mong muốn",
          "Kinh nghiệm",
          "Địa điểm",
          "Loại công việc",
          "Mức lương tối thiểu",
          "Mức lương tối đa",
          "Mục tiêu nghề nghiệp",
          "LinkedIn",
          "Portfolio",
          "Trạng thái",
          "Hoạt động cuối",
          "Ngày tham gia",
          "Giới tính",
          "Ngày sinh",
        ],
      ])
      XLSX.writeFile(workbook, "Danh_sach_ung_vien.xlsx", { compression: true })
      toast.success("Xuất file Excel thành công")
    } catch (error: any) {
      toast.error("Lỗi khi xuất file Excel: " + error.message)
    }
  }

  // Handle view details
  const handleViewDetails = (candidate: Candidate) => {
    setViewCandidate(candidate)
    setIsViewDialogOpen(true)
  }

  // Calculate stats
  const totalCandidates = candidates.length
  const activeCandidates = candidates.filter((c) => c.is_active === 1).length
  const newThisWeek = candidates.filter(
    (c) => new Date(c.user_created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length
  const activeThisWeek = candidates.filter(
    (c) => new Date(c.last_login) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý ứng viên</h1>
          <p className="text-gray-600">Quản lý thông tin và hoạt động của ứng viên</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600" onClick={handleExportExcel}>
          <Download className="w-4 h-4 mr-2" />
          Xuất danh sách
        </Button>
      </div>

      {/* Stats Cards */}
      {loading ? (
        <div className="text-center">Đang tải...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{totalCandidates.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Tổng ứng viên</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{activeCandidates.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Đang hoạt động</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-600">{newThisWeek.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Mới tuần này</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">{activeThisWeek.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Hoạt động tuần này</div>
            </CardContent>
          </Card>
        </div>
      )}

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
                  placeholder="Tìm kiếm theo tên, email hoặc vị trí..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="active">Hoạt động</SelectItem>
                <SelectItem value="inactive">Không hoạt động</SelectItem>
              </SelectContent>
            </Select>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Địa điểm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="Hà Nội">Hà Nội</SelectItem>
                <SelectItem value="TP.HCM">TP.HCM</SelectItem>
                <SelectItem value="Đà Nẵng">Đà Nẵng</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Bộ lọc nâng cao
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Candidate Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Ứng viên</TableHead>
                <TableHead>Vị trí mong muốn</TableHead>
                <TableHead>Kinh nghiệm</TableHead>
                <TableHead>Địa điểm</TableHead>
                <TableHead>Loại công việc</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Hoạt động cuối</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    Đang tải...
                  </TableCell>
                </TableRow>
              ) : paginatedCandidates.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    Không tìm thấy ứng viên
                  </TableCell>
                </TableRow>
              ) : (
                paginatedCandidates.map((candidate) => (
                  <TableRow key={candidate.user_id}>
                    <TableCell>
                          <Avatar>
                          <AvatarImage src={candidate.avatar_url || "/placeholder.svg"} alt={candidate.full_name} />
                          <AvatarFallback>{candidate.full_name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-3">
                        <div>
                          <div className="font-medium">{candidate.full_name}</div>
                          <div className="text-sm text-gray-500 flex justify-center items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {candidate.email}
                          </div>
                          <div className="text-sm text-gray-500 flex justify-center items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {candidate.phone}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{candidate.desired_position}</TableCell>
                    <TableCell>{candidate.experience_years} năm</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {candidate.job_preferences.location}
                      </div>
                    </TableCell>
                    <TableCell>{candidate.job_preferences.job_type}</TableCell>
                    <TableCell>
                      <Badge variant={candidate.is_active === 1 ? "default" : "secondary"}>
                        {candidate.is_active === 1 ? "Hoạt động" : "Không hoạt động"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-1 text-sm text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {new Date(candidate.last_login).toLocaleDateString("vi-VN")}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Xem hồ sơ"
                          onClick={() => handleViewDetails(candidate)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Nhắn tin">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Gọi điện">
                          <Phone className="w-4 h-4" />
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
      {!loading && filteredCandidates.length > 0 && (
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Hiển thị</span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => {
                setItemsPerPage(parseInt(value))
                setCurrentPage(1) // Reset to first page
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
              trong {filteredCandidates.length} ứng viên
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
            <DialogTitle>Chi tiết ứng viên</DialogTitle>
          </DialogHeader>
          {viewCandidate && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={viewCandidate.avatar_url || "/placeholder.svg"} alt={viewCandidate.full_name} />
                  <AvatarFallback>{viewCandidate.full_name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold">{viewCandidate.full_name}</h2>
                  <p className="text-sm text-gray-500">{viewCandidate.email}</p>
                </div>
              </div>
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Số điện thoại:</span>
                    <span>{viewCandidate.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Giới tính:</span>
                    <span>{viewCandidate.gender === "male" ? "Nam" : "Nữ"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Ngày sinh:</span>
                    <span>{new Date(viewCandidate.dob).toLocaleDateString("vi-VN")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Vị trí mong muốn:</span>
                    <span>{viewCandidate.desired_position}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Kinh nghiệm:</span>
                    <span>{viewCandidate.experience_years} năm</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Mức lương mong muốn:</span>
                    <span>
                      {parseFloat(viewCandidate.desired_salary_min).toLocaleString("vi-VN")} -{" "}
                      {parseFloat(viewCandidate.desired_salary_max).toLocaleString("vi-VN")} triệu
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Địa điểm:</span>
                    <span>{viewCandidate.job_preferences.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Loại công việc:</span>
                    <span>{viewCandidate.job_preferences.job_type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Mục tiêu nghề nghiệp:</span>
                    <span>{viewCandidate.career_goals}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">LinkedIn:</span>
                    <a
                      href={normalizeUrl(viewCandidate.linkedin_url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {normalizeUrl(viewCandidate.linkedin_url)}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Portfolio:</span>
                    <a
                      href={normalizeUrl(viewCandidate.portfolio_url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {normalizeUrl(viewCandidate.portfolio_url) || "Chưa cung cấp"}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Trạng thái:</span>
                    <Badge variant={viewCandidate.is_active === 1 ? "default" : "secondary"}>
                      {viewCandidate.is_active === 1 ? "Hoạt động" : "Không hoạt động"}
                    </Badge>

                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Hoạt động cuối:</span>
                    <span>{new Date(viewCandidate.last_login).toLocaleDateString("vi-VN")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Ngày tham gia:</span>
                    <span>{new Date(viewCandidate.user_created_at).toLocaleDateString("vi-VN")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Cập nhật lần cuối:</span>
                    <span>{new Date(viewCandidate.user_updated_at).toLocaleDateString("vi-VN")}</span>
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
