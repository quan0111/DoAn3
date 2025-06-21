"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Calendar28 } from "@/components/calendar28";
import { toast } from "sonner";
import { format } from "date-fns"; // Import date-fns để format ngày
import { vi } from "date-fns/locale"; // Import locale tiếng Việt (nếu cần)
import {jwtDecode} from "jwt-decode"; // Import jwt-decode để giải mã token

interface Event {
  event_id: number;
  company_id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  type: string;
  registration_url: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface TokenPayload {
  userId: string; // Giả định cấu trúc token chứa userId
}

export default function RecruitmentCampaignsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    location: "",
    type: "online", // Giá trị mặc định là 'online'
    registration_url: "",
    status: "upcoming", // Giá trị mặc định là 'upcoming'
  });
  const [companyId, setCompanyId] = useState<number | null>(null); // Thêm state cho company_id

  // Hàm fetchEvents để lấy danh sách sự kiện
  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.get("http://localhost:3000/eventss", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể tải danh sách sự kiện");
      toast.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        // Giải mã token để lấy userId
        const decodedToken = jwtDecode<TokenPayload>(token);
        const userId = decodedToken.userId;

        // Lấy company_id từ API
        const companyResponse = await axios.get(`http://localhost:3000/companiess/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const company_Id = companyResponse.data.company_id; // Giả định API trả về { company_id: number }
        setCompanyId(company_Id);

        // Lấy danh sách sự kiện
        await fetchEvents();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCreateOrUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token || !companyId) throw new Error("No token or company ID found");

      const payload = {
        ...formData,
        company_id: companyId, // Sử dụng company_id từ state
      };

      if (selectedEvent) {
        await axios.put(`http://localhost:3000/eventss/${selectedEvent.event_id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success(`Cập nhật sự kiện có event_id = ${selectedEvent.event_id} thành công`);
      } else {
        await axios.post("http://localhost:3000/eventss", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Tạo sự kiện thành công");
      }

      setDialogOpen(false);
      setSelectedEvent(null);
      setFormData({
        title: "",
        description: "",
        start_date: "",
        end_date: "",
        location: "",
        type: "online", // Reset về 'online' sau khi tạo/sửa
        registration_url: "",
        status: "upcoming", // Reset về 'upcoming' sau khi tạo/sửa
      });
      await fetchEvents(); // Cập nhật danh sách sau khi tạo/sửa
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể lưu sự kiện");
      toast.error(error);
    }
  };

  const handleDelete = async (eventId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      await axios.delete(`http://localhost:3000/eventss/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(`Xóa sự kiện có event_id = ${eventId} thành công`);
      await fetchEvents(); // Cập nhật danh sách sau khi xóa
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể xóa sự kiện");
      toast.error(error);
    }
  };

  const handleEdit = (event: Event) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      start_date: event.start_date,
      end_date: event.end_date,
      location: event.location,
      type: event.type,
      registration_url: event.registration_url,
      status: event.status,
    });
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tạo chiến dịch tuyển dụng của bạn</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => {
                    setSelectedEvent(null);
                    setFormData({
                      title: "",
                      description: "",
                      start_date: "",
                      end_date: "",
                      location: "",
                      type: "online", // Giá trị mặc định là 'online'
                      registration_url: "",
                      status: "upcoming", // Giá trị mặc định là 'upcoming'
                    });
                    setDialogOpen(true);
                  }}
                >
                  Tạo mới chiến dịch →
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="font-semibold">Danh sách chiến dịch</h3>
            {loading ? (
              <p className="text-gray-500">Đang tải...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : events.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {events.map((event) => (
                  <Card key={event.event_id}>
                    <CardContent className="p-4 flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{event.title}</h4>
                        <p className="text-sm text-gray-600">
                          {format(new Date(event.start_date), "dd MMMM, yyyy", { locale: vi })} -{" "}
                          {format(new Date(event.end_date), "dd MMMM, yyyy", { locale: vi })}
                        </p>
                      </div>
                      <div className="space-x-2">
                        <Button variant="outline" onClick={() => handleEdit(event)}>
                          Sửa
                        </Button>
                        <Button variant="destructive" onClick={() => handleDelete(event.event_id)}>
                          Xóa
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Không có chiến dịch nào.</p>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">💡 Tài liệu bạn nên xem</h3>
            <p className="text-sm text-gray-600">
              Hiểu về cách chiến dịch tuyển dụng hoạt động sẽ giúp bạn tối ưu tốt hơn hoạt động tuyển dụng của doanh
              nghiệp trên TopCV. Hãy chắc chắn bạn đã tìm hiểu thông tin về chiến dịch tuyển dụng.
            </p>
            <div className="space-y-2">
              <Button variant="link" className="text-green-500 p-0 h-auto">
                Smart Recruitment Platform Principle →
              </Button>
              <Button variant="link" className="text-green-500 p-0 h-auto">
                Khái niệm Chiến dịch tuyển dụng →
              </Button>
              <Button variant="link" className="text-green-500 p-0 h-auto">
                Khởi tạo Chiến dịch tuyển dụng đúng cách →
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedEvent ? "Sửa chiến dịch" : "Tạo chiến dịch mới"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Tên chiến dịch *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="VD: Tuyển dụng nhân viên Marketing tháng 10..."
              />
            </div>
            <div>
              <Label htmlFor="description">Mô tả</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Mô tả chi tiết..."
              />
            </div>
            <div>
              <Calendar28
                value={formData.start_date}
                onChange={(date, formattedValue) => setFormData({ ...formData, start_date: formattedValue })}
                label="Ngày bắt đầu"
              />
            </div>
            <div>
              <Calendar28
                value={formData.end_date}
                onChange={(date, formattedValue) => setFormData({ ...formData, end_date: formattedValue })}
                label="Ngày kết thúc"
              />
            </div>
            <div>
              <Label htmlFor="location">Địa điểm</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Địa điểm tổ chức..."
              />
            </div>
            <div>
              <Label htmlFor="type">Loại</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger id="type" className="mt-1">
                  <SelectValue placeholder="Chọn loại" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="registration_url">Link đăng ký</Label>
              <Input
                id="registration_url"
                value={formData.registration_url}
                onChange={(e) => setFormData({ ...formData, registration_url: e.target.value })}
                placeholder="Link đăng ký..."
              />
            </div>
            <div>
              <Label htmlFor="status">Trạng thái</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger id="status" className="mt-1">
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Sắp diễn ra</SelectItem>
                  <SelectItem value="ongoing">Đang diễn ra</SelectItem>
                  <SelectItem value="finished">Kết thúc</SelectItem>
                  <SelectItem value="cancelled">Đã hủy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleCreateOrUpdate}>
              {selectedEvent ? "Lưu thay đổi" : "Tạo mới"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}