"use client";

import { useState, useEffect } from "react";
import { FileText, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Calendar28 } from "@/components/calendar28";
import { Toaster, toast } from "sonner"; // Import từ sonner

interface TokenPayload {
  userId: string;
}

interface Application {
  application_id: number;
  user_name?: string;
  email?: string;
  job_title?: string;
  resume_title?: string;
  status?: string;
  applied_at?: string;
  cv_file?: string;
}

interface InterviewData {
  application_id: number;
  schedule_time: string; // Thời gian lịch hẹn (datetime)
  platform?: string;    // Nền tảng (Zoom, Google Meet, v.v.)
  meeting_url?: string; // Link cuộc họp
  status?: string;      // Trạng thái (scheduled, completed, cancelled)
  notes?: string;       // Ghi chú
}

export default function CVManagementPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [interviewDialogOpen, setInterviewDialogOpen] = useState(false);
  const [interviewData, setInterviewData] = useState<InterviewData>({
    application_id: 0,
    schedule_time: "",
    platform: "",
    meeting_url: "",
    status: "scheduled",
    notes: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const decodedToken = jwtDecode<TokenPayload>(token);
        const userId = decodedToken.userId;

        const companyResponse = await axios.get(`http://localhost:3000/companiess/user/${userId}`);
        const company_Id = companyResponse.data.company_id;
        setCompanyId(company_Id);

        const response = await axios.get(`http://localhost:3000/applicationss/company/${company_Id}/applicants`);
        setApplications(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        toast.error(error); // Hiển thị toast lỗi
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredApplications = applications.filter(app =>
    (app.user_name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (app.email?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  const handleViewCV = (fileName: any) => {
    window.open(`http://localhost:3000/cv/${fileName}`, "_blank");
  };



  const checkInterviewExists = async (applicationId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.get(
        `http://localhost:3000/interviewss/check-exists/${applicationId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.exists; // Giả sử API trả về { exists: boolean }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi khi kiểm tra lịch phỏng vấn");
      toast.error(error); // Hiển thị toast lỗi
      return false;
    }
  };

    const handleScheduleInterview = async (application: Application) => {
    const exists = await checkInterviewExists(interviewData.application_id);
    if (exists) {
      toast.error("Lịch phỏng vấn đã tồn tại cho ứng viên này!");
      return;
    }
    setSelectedApplication(application);
    setInterviewData({
      application_id: application.application_id,
      schedule_time: "",
      platform: "",
      meeting_url: "",
      status: "scheduled",
      notes: "",
    });
    setInterviewDialogOpen(true);
  };
  const handleInterviewSubmit = async () => {
    if (!interviewData.schedule_time || !interviewData.platform || !interviewData.meeting_url) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc (thời gian, nền tảng, link cuộc họp)!");
      return;
    }


    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.post(
        "http://localhost:3000/interviewss",
        interviewData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        setInterviewDialogOpen(false);
        toast.success("Lịch phỏng vấn đã được đặt thành công!"); // Hiển thị toast thành công
        setTimeout(() => setError(null), 3000); // Đảm bảo state được reset
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể đặt lịch phỏng vấn");
      toast.error(error); // Hiển thị toast lỗi
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Quản lý CV ứng viên</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3 space-y-4">
          <Input
            placeholder="Tìm kiếm tên, email, số điện thoại"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Chọn chiến dịch tuyển dụng" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả chiến dịch</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Nhập trạng thái CV" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Nhập nguồn CV" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả nguồn</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Tất cả nhân" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Tất cả thời gian" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả thời gian</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="lg:w-2/3">
          <Card className="border-green-200 bg-green-50 mb-4">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">📧</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    Đồng bộ hồ sơ ứng viên từ các website tuyển dụng, gửi email tự động, đặt lịch phỏng vấn, lập báo cáo
                    hiệu quả tuyển dụng với <span className="font-semibold text-green-600">SHiring.ai</span>
                  </p>
                </div>
                <Button variant="outline" className="border-green-500 text-green-600">
                  Đăng ký ngay →
                </Button>
              </div>
            </CardContent>
          </Card>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Đang tải...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
            </div>
          ) : filteredApplications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredApplications.map((app) => (
                <Card key={app.application_id} className="p-4">
                  <CardContent>
                    <h3 className="font-semibold">{app.user_name || "Không có tên"}</h3>
                    <p className="text-sm text-gray-600">Email: {app.email || "Không có email"}</p>
                    <p className="text-sm text-gray-600">Vị trí: {app.job_title || "Không xác định"}</p>
                    <p className="text-sm text-gray-600">Hồ sơ: {app.resume_title || "Không có"}</p>
                    <p className="text-sm text-gray-600">Trạng thái: {app.status || "Chưa cập nhật"}</p>
                    <p className="text-sm text-gray-600">Ngày ứng tuyển: {new Date(app.applied_at || "").toLocaleDateString()}</p>
                    {app.cv_file && (
                      <Button
                        variant="outline"
                        className="mt-2 w-full border-green-500 text-green-600"
                        onClick={() => handleViewCV(app.cv_file)}
                      >
                        Xem CV
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      className="mt-2 w-full border-blue-500 text-blue-600"
                      onClick={() => handleScheduleInterview(app)}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Đặt lịch phỏng vấn
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-gray-500 mb-2">Tìm thấy 0 ứng viên</p>
              <p className="text-gray-500">Bạn không có CV</p>
            </div>
          )}
        </div>
      </div>

      {/* Dialog cho đặt lịch phỏng vấn */}
      <Dialog open={interviewDialogOpen} onOpenChange={setInterviewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Đặt lịch phỏng vấn</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Calendar28
                value={interviewData.schedule_time}
                onChange={(date, formattedValue) => setInterviewData({ ...interviewData, schedule_time: formattedValue })}
                label="Thời gian phỏng vấn"
              />
            </div>
            <div>
              <Label htmlFor="platform">Nền tảng</Label>
              <Select
                value={interviewData.platform || ""}
                onValueChange={(value) => setInterviewData({ ...interviewData, platform: value })}
              >
                <SelectTrigger id="platform" className="mt-1">
                  <SelectValue placeholder="Chọn nền tảng" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Zoom">Zoom</SelectItem>
                  <SelectItem value="Google Meet">Google Meet</SelectItem>
                  <SelectItem value="Microsoft Teams">Microsoft Teams</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="meeting-url">Link cuộc họp</Label>
              <Input
                id="meeting-url"
                value={interviewData.meeting_url}
                onChange={(e) => setInterviewData({ ...interviewData, meeting_url: e.target.value })}
                className="mt-1"
                placeholder="VD: https://meet.google.com/xxx-yyy-zzz"
              />
            </div>
            <div>
              <Label htmlFor="notes">Ghi chú</Label>
              <Input
                id="notes"
                value={interviewData.notes}
                onChange={(e) => setInterviewData({ ...interviewData, notes: e.target.value })}
                className="mt-1"
                placeholder="Ghi chú thêm (nếu có)"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInterviewDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleInterviewSubmit}>Xác nhận</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}