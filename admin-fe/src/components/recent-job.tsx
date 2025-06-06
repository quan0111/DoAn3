import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Edit, Trash2 } from "lucide-react"

const recentJobs = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "FPT Software",
    location: "Hà Nội",
    salary: "15-25 triệu",
    status: "active",
    applications: 45,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Backend Developer",
    company: "VNG Corporation",
    location: "TP.HCM",
    salary: "20-30 triệu",
    status: "active",
    applications: 32,
    createdAt: "2024-01-14",
  },
  {
    id: "3",
    title: "UI/UX Designer",
    company: "Tiki",
    location: "TP.HCM",
    salary: "12-18 triệu",
    status: "pending",
    applications: 28,
    createdAt: "2024-01-13",
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: "Shopee",
    location: "TP.HCM",
    salary: "25-35 triệu",
    status: "active",
    applications: 19,
    createdAt: "2024-01-12",
  },
  {
    id: "5",
    title: "Product Manager",
    company: "Grab",
    location: "Hà Nội",
    salary: "30-40 triệu",
    status: "closed",
    applications: 67,
    createdAt: "2024-01-11",
  },
]

export function RecentJobsTable() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Công việc mới nhất</h3>
        <Button variant="outline" size="sm">
          Xem tất cả
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vị trí</TableHead>
            <TableHead>Công ty</TableHead>
            <TableHead>Địa điểm</TableHead>
            <TableHead>Mức lương</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Ứng tuyển</TableHead>
            <TableHead>Ngày tạo</TableHead>
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentJobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell className="font-medium">{job.title}</TableCell>
              <TableCell>{job.company}</TableCell>
              <TableCell>{job.location}</TableCell>
              <TableCell>{job.salary}</TableCell>
              <TableCell>
                <Badge
                  variant={job.status === "active" ? "default" : job.status === "pending" ? "secondary" : "destructive"}
                >
                  {job.status === "active" ? "Đang tuyển" : job.status === "pending" ? "Chờ duyệt" : "Đã đóng"}
                </Badge>
              </TableCell>
              <TableCell>{job.applications}</TableCell>
              <TableCell>{job.createdAt}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
