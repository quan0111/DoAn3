"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import {
  CalendarIcon,
  Plus,
  Edit2,
  Trash2,
  Search,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import axios from "axios";
import { Calendar28 } from "./calendar28";
import { format } from "date-fns";

interface Event {
  event_id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  status: "upcoming" | "ongoing" | "finished" | "cancelled";
  participants: number;
}

interface EventForm {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  status: "upcoming" | "ongoing";
}

const EventManagement: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [form, setForm] = useState<EventForm>({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    location: "",
    status: "upcoming",
  });

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:3000/eventss");
        setEvents(res.data);
      } catch (error: any) {
        toast.error("Lỗi khi tải sự kiện: " + (error.response?.data?.message || error.message));
      }
    };
    fetchEvents();
  }, []);

  // Filter events based on search query
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!form.title || !form.start_date || !form.location) {
      toast.error("Vui lòng nhập tiêu đề, ngày bắt đầu và địa điểm");
      return;
    }

    try {
      if (editingEvent) {
        // Update event
        await axios.put(`http://localhost:3000/eventss/${editingEvent.event_id}`, form);
        setEvents(events.map((e) => (e.event_id === editingEvent.event_id ? { ...e, ...form } : e)));
        toast.success("Cập nhật sự kiện thành công!");
      } else {
        // Create new event
        const res = await axios.post("http://localhost:3000/eventss", form);
        setEvents([...events, res.data]);

        // Send notification to participants
        if (form.status === "ongoing") {
          await axios.post(
            "http://localhost:3000/notificationss",
            {
              title: `Sự kiện mới: ${form.title}`,
              message: `Sự kiện "${form.title}" đang diễn ra vào ${format(
                new Date(form.start_date),
                "MMMM dd, yyyy"
              )} tại ${form.location}.`,
              type: "event_invitation",
              priority: "medium",
              user_ids: null, // Gửi cho tất cả
              language_code: "vi",
              channels: { email: true, push: true, sms: false },
            }
          );
        }
        toast.success("Tạo sự kiện thành công!");
      }

      // Reset form and close dialog
      setForm({
        title: "",
        description: "",
        start_date: "",
        end_date: "",
        location: "",
        status: "upcoming",
      });
      setEditingEvent(null);
      setIsDialogOpen(false);
    } catch (error: any) {
      toast.error("Lỗi: " + (error.response?.data?.message || error.message));
    }
  };

  // Handle edit event
  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setForm({
      title: event.title,
      description: event.description,
      start_date: event.start_date, // Đã ở định dạng yyyy-MM-dd
      end_date: event.end_date || "",
      location: event.location,
      status: event.status as "upcoming" | "ongoing",
    });
    setIsDialogOpen(true);
  };

  // Handle delete event
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/events/${id}`);
      setEvents(events.filter((e) => e.event_id !== id));
      toast.success("Xóa sự kiện thành công!");
    } catch (error: any) {
      toast.error("Lỗi khi xóa sự kiện: " + (error.response?.data?.message || error.message));
    }
  };

  // Handle send notification
  const handleSendNotification = async (event: Event) => {
    try {
      await axios.post(
        "http://localhost:3000/notifications",
        {
          title: `Cập nhật sự kiện: ${event.title}`,
          message: `Sự kiện "${event.title}" diễn ra vào ${format(
            new Date(event.start_date),
            "MMMM dd, yyyy"
          )} tại ${event.location}. Vui lòng kiểm tra chi tiết.`,
          type: "event_invitation",
          priority: "medium",
          user_ids: null, // Gửi cho tất cả
          language_code: "vi",
          channels: { email: true, push: true, sms: false },
        }
      );
      toast.success("Gửi thông báo thành công!");
    } catch (error: any) {
      toast.error("Lỗi khi gửi thông báo: " + (error.response?.data?.message || error.message));
    }
  };

  // Handle date change for Calendar28
  const handleDateChange = (field: "start_date" | "end_date") => (
    date: Date | undefined,
    formattedValue: string
  ) => {
    setForm({ ...form, [field]: formattedValue });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý sự kiện</h1>
          <p className="text-gray-600">Tạo và quản lý các sự kiện</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="w-4 h-4 mr-2" />
              Tạo sự kiện
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingEvent ? "Chỉnh sửa sự kiện" : "Tạo sự kiện mới"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Tiêu đề *</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Nhập tiêu đề sự kiện..."
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Mô tả</Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Nhập mô tả sự kiện..."
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Calendar28
                    label="Ngày bắt đầu *"
                    value={form.start_date}
                    onChange={handleDateChange("start_date")}
                    error={form.start_date ? undefined : "Vui lòng chọn ngày bắt đầu"}
                  />
                </div>
                <div>
                  <Calendar28
                    label="Ngày kết thúc"
                    value={form.end_date}
                    onChange={handleDateChange("end_date")}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="location">Địa điểm *</Label>
                <Input
                  id="location"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="Nhập địa điểm..."
                  required
                />
              </div>
              <div>
                <Label htmlFor="status">Trạng thái</Label>
                <select
                  id="status"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as "upcoming" | "ongoing" })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="upcoming">Sắp diễn ra</option>
                  <option value="ongoing">Đang diễn ra</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Hủy
                </Button>
                <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                  {editingEvent ? "Cập nhật" : "Tạo"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách sự kiện</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <Search className="w-5 h-5 text-gray-500" />
            <Input
              placeholder="Tìm kiếm theo tiêu đề hoặc địa điểm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tiêu đề</TableHead>
                <TableHead>Ngày diễn ra</TableHead>
                <TableHead>Địa điểm</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Tham gia</TableHead>
                <TableHead className="text-center">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event) => (
                <TableRow key={event.event_id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>
                    {format(new Date(event.start_date), "MMMM dd, yyyy")}
                  </TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        event.status === "ongoing"
                          ? "default"
                          : event.status === "cancelled"
                          ? "destructive"
                          : event.status === "finished"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {event.status === "upcoming"
                        ? "Sắp diễn ra"
                        : event.status === "ongoing"
                        ? "Đang diễn ra"
                        : event.status === "finished"
                        ? "Hoàn thành"
                        : "Đã hủy"}
                    </Badge>
                  </TableCell>
                  <TableCell>{event.participants}</TableCell>
                  <TableCell>
                    <div className="flex gap-2 justify-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(event)}
                        disabled={event.status === "finished" || event.status === "cancelled"}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(event.event_id)}
                        disabled={event.status === "finished"}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSendNotification(event)}
                        disabled={event.status !== "ongoing"}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredEvents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500">
                    Không tìm thấy sự kiện
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventManagement;