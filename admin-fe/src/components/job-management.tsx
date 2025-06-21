"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MoreHorizontal, Plus, MapPin, Clock, DollarSign } from "lucide-react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

export function JobManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/jobss");
        setJobs(response.data);
      } catch (err: any) {
        console.error("Error fetching jobs:", err);
        setError("Không thể tải danh sách việc làm. Vui lòng thử lại sau!");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "full-time":
        return "bg-blue-100 text-blue-800";
      case "part-time":
        return "bg-purple-100 text-purple-800";
      case "remote":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const formatSalary = (min: number, max: number) => {
    return `${min.toLocaleString("vi-VN")} - ${max.toLocaleString("vi-VN")} triệu`;
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openDetails = (job: Job) => {
    setSelectedJob(job);
    setNewStatus(job.status); // Đặt trạng thái hiện tại làm mặc định
  };

  const closeDetails = () => {
    setSelectedJob(null);
    setNewStatus("");
  };

  const updateStatus = async () => {
    if (selectedJob && newStatus) {
      try {
        await axios.patch(`http://localhost:3000/jobss/${selectedJob.job_id}`, {
          status: newStatus,
        });
        setJobs(jobs.map((job) =>
          job.job_id === selectedJob.job_id ? { ...job, status: newStatus } : job
        ));
        closeDetails();
      } catch (err: any) {
        console.error("Error updating status:", err);
        setError("Cập nhật trạng thái thất bại. Vui lòng thử lại!");
      }
    }
  };

  if (loading) {
    return <div className="text-center py-10">Đang tải...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý việc làm</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Thêm việc làm
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">{jobs.length}</div>
            <p className="text-sm text-gray-600">Tổng việc làm</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">
              {jobs.filter((job) => job.status === "active").length}
            </div>
            <p className="text-sm text-gray-600">Đang tuyển</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-yellow-600">
              {jobs.filter((job) => job.status === "pending").length}
            </div>
            <p className="text-sm text-gray-600">Chờ duyệt</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-red-600">
              {jobs.filter((job) => new Date(job.deadline) < new Date()).length}
            </div>
            <p className="text-sm text-gray-600">Hết hạn</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Danh sách việc làm</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm việc làm..."
                  className="pl-10 w-80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Lọc
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-center py-3 px-4 font-medium text-gray-500">Việc làm</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Thông tin</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500">Loại</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500">Trạng thái</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500">Ứng tuyển</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map((job) => (
                  <tr key={job.job_id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{job.title}</div>
                        <div className="text-sm text-gray-500">{job.company_name}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="h-3 w-3 text-gray-400" />
                          {formatSalary(job.salary_min, job.salary_max)}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-3 w-3 text-gray-400" />
                          Hết hạn: {formatDate(job.deadline)}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getTypeColor(job.job_type)}>
                        {job.job_type === "full-time" ? "Toàn thời gian" : job.job_type === "remote" ? "Remote" : "Bán thời gian"}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(job.status)}>
                        {job.status === "active" ? "Đang tuyển" : job.status === "pending" ? "Chờ duyệt" : "Hết hạn"}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-center">
                        <div className="font-medium text-gray-900">{job.application_count}</div>
                        <div className="text-xs text-gray-500">ứng viên</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Button variant="ghost" size="sm" onClick={() => openDetails(job)}>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredJobs.length === 0 && (
            <div className="text-center py-4 text-gray-500">Không tìm thấy việc làm nào.</div>
          )}
        </CardContent>
      </Card>

      <Dialog open={selectedJob !== null} onOpenChange={closeDetails}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chi tiết công việc: {selectedJob?.title}</DialogTitle>
          </DialogHeader>
          {selectedJob && (
            <div className="space-y-4">
              <div>
                <strong>Công ty:</strong> {selectedJob.company_name}
              </div>
              <div>
                <strong>Mô tả:</strong> {selectedJob.description}
              </div>
              <div>
                <strong>Yêu cầu:</strong> {selectedJob.requirements.join(", ")}
              </div>
              <div>
                <strong>Quyền lợi:</strong> {selectedJob.benefits}
              </div>
              <div>
                <strong>Lương:</strong> {formatSalary(selectedJob.salary_min, selectedJob.salary_max)}
              </div>
              <div>
                <strong>Địa điểm:</strong> {selectedJob.location}
              </div>
              <div>
                <strong>Loại công việc:</strong>{" "}
                {selectedJob.job_type === "full-time"
                  ? "Toàn thời gian"
                  : selectedJob.job_type === "remote"
                  ? "Remote"
                  : "Bán thời gian"}
              </div>
              <div>
                <strong>Hạn chót:</strong> {formatDate(selectedJob.deadline)}
              </div>
              <div>
                <strong>Trạng thái hiện tại:</strong>{" "}
                {selectedJob.status === "active"
                  ? "Đang tuyển"
                  : selectedJob.status === "pending"
                  ? "Chờ duyệt"
                  : "Hết hạn"}
              </div>
              <div>
                <strong>Cập nhật trạng thái:</strong>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Đang tuyển</SelectItem>
                    <SelectItem value="pending">Chờ duyệt</SelectItem>
                    <SelectItem value="expired">Hết hạn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={closeDetails}>
              Hủy
            </Button>
            <Button onClick={updateStatus}>Cập nhật</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}