"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  FileText,
  Search,
  Filter,
  Eye,
  Edit,
  MoreHorizontal,
  Calendar,
  MapPin,
  DollarSign,
} from "lucide-react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

interface Job {
  job_id: number;
  company_id: number;
  title: string;
  description: string;
  requirements: string[];
  benefits: string;
  salary_min: number;
  salary_max: number;
  location: string;
  job_level: string;
  job_type: string;
  deadline: string;
  status: string;
  priority_score: number;
  auto_expire: number;
  view_count: number;
  application_count: number;
  created_at: string;
  updated_at: string;
  education_level: string;
  company_name: string;
  logo_url: string;
  categories: string | null;
}

interface Company {
  company_id: number;
  company_name: string;
  // Thêm các trường khác nếu cần
}

interface TokenPayload {
  userId: number;
  // Thêm các trường khác từ token nếu cần
}

const statusOptions = [
  { value: "all", label: "Tất cả trạng thái" },
  { value: "active", label: "Đang tuyển" },
  { value: "paused", label: "Tạm dừng" },
  { value: "expired", label: "Hết hạn" },
  { value: "completed", label: "Hoàn thành" },
];

export default function JobPostsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy token từ localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Không tìm thấy token. Vui lòng đăng nhập!");
        }

        // Giải mã token để lấy user_id
        const decodedToken = jwtDecode<TokenPayload>(token);
        console.log(decodedToken)
        const userId = decodedToken.userId;
        console.log(userId)
        // Gọi API để lấy danh sách công ty theo user_id
        const companiesResponse = await axios.get(`http://localhost:3000/companiess/user/${userId}`);
        const companies = companiesResponse.data;

        if (!companies || companies.length === 0) {
          throw new Error("Không tìm thấy công ty nào liên quan đến người dùng.");
        }

        // Lấy company_id đầu tiên (hoặc bạn có thể chọn công ty cụ thể)
        const companyId = companies.company_id;
        console.log(companyId)

        // Gọi API để lấy danh sách công việc theo company_id
        const jobsResponse = await axios.get(`http://localhost:3000/jobss/by-company/${companyId}`);
        setJobs(jobsResponse.data);
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.message || "Không thể tải dữ liệu. Vui lòng thử lại!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500 text-white">Đang tuyển</Badge>;
      case "pending":
      case "paused":
        return <Badge className="bg-yellow-500 text-white">Tạm dừng</Badge>;
      case "expired":
        return <Badge className="bg-red-500 text-white">Hết hạn</Badge>;
      case "rejected":
      case "completed":
        return <Badge className="bg-blue-500 text-white">Hoàn thành</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatSalary = (min: number, max: number) => {
    return `${min.toLocaleString("vi-VN")} - ${max.toLocaleString("vi-VN")} triệu VND`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" ||
      (statusFilter === "active" && job.status === "active") ||
      (statusFilter === "paused" && job.status === "pending") ||
      (statusFilter === "expired" && new Date(job.deadline) < new Date()) ||
      (statusFilter === "completed" && (job.status === "rejected" || job.status === "completed"));
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <div className="text-center py-10">Đang tải...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý tin tuyển dụng</h1>
        <Link to="/job-posts/create">
          <Button className="bg-green-500 hover:bg-green-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Đăng tin mới
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Tìm kiếm theo tiêu đề, vị trí..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Lọc
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Job Posts List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <Card key={job.job_id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    {job.priority_score > 5 && <Badge className="bg-red-500 text-white text-xs">HOT</Badge>}
                    {job.priority_score > 8 && <Badge className="bg-orange-500 text-white text-xs">GẤP</Badge>}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <FileText className="w-4 h-4" />
                      <span>{job.categories || "Chưa có danh mục"}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4" />
                      <span>{formatSalary(job.salary_min, job.salary_max)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Hạn: {formatDate(job.deadline)}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {getStatusBadge(job.status)}
                    <span className="text-sm text-gray-600">
                      {job.application_count} ứng viên • {job.view_count} lượt xem
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Chưa có tin tuyển dụng nào</h3>
          <p className="text-gray-500 mb-4">Bắt đầu tạo tin tuyển dụng đầu tiên của bạn</p>
          <Link to="/job-posts/create">
            <Button className="bg-green-500 hover:bg-green-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Tạo tin tuyển dụng
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}