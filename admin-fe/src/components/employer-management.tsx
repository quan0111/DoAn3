"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Building2,
  Users,
  Briefcase,
  Eye,
  Edit,
  Trash2,
  Plus,
  Link,
  MapPin,
  BriefcaseIcon,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import { Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import axios from "axios";

export type Employer = {
  company_id: string;
  user_id: string;
  company_name: string;
  description: string;
  logo_url: string;
  website: string;
  location: string;
  company_size: string;
  verified: boolean;
  created_at: string;
  updated_at: string;
  industry: string[];
  total_jobs: number;
  total_applications: number;
};

export function EmployerManagement() {
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEmployer, setEditingEmployer] = useState<Employer | null>(null);
  const [viewEmployer, setViewEmployer] = useState<Employer | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const industries = ["IT", "Finance", "Education", "Healthcare", "Marketing"];

  // Fetch employers
  useEffect(() => {
    const fetchEmployers = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:3000/companiess", {});
        setEmployers(res.data);
      } catch (error: any) {
        toast.error(
          "Lỗi khi tải danh sách công ty: " +
            (error.response?.data?.message || error.message)
        );
      } finally {
        setLoading(false);
      }
    };
    fetchEmployers();
  }, []);

  // Filter employers
  const filteredEmployers = employers.filter((employer) => {
    const matchesSearch =
      employer.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employer.industry
        .join(", ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "verified" && employer.verified) ||
      (statusFilter === "pending" && !employer.verified) ||
      (statusFilter === "suspended" && false);
    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const totalEmployers = employers.length;
  const verifiedEmployers = employers.filter((e) => e.verified).length;
  const totalJobs = employers.reduce((sum, e) => sum + e.total_jobs, 0);
  const handleToggleVerified = async (employer: Employer) => {
    try {
      const updatedEmployer = { ...employer, verified: !employer.verified };
      await axios.put(
        `http://localhost:3000/api/companies/${employer.company_id}`,
        { verified: !employer.verified },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setEmployers(
        employers.map((e) =>
          e.company_id === employer.company_id ? updatedEmployer : e
        )
      );
      setViewEmployer(updatedEmployer);
      toast.success(
        `Đã ${!employer.verified ? "xác thực" : "hủy xác thực"} công ty`
      );
    } catch (error: any) {
      toast.error(
        "Lỗi khi cập nhật trạng thái: " +
          (error.response?.data?.message || error.message)
      );
    }
  };
  // Handle delete
  const handleDelete = async (company_id: string) => {
    if (!window.confirm("Bạn có chắc muốn xóa công ty này?")) return;
    try {
      await axios.delete(`http://localhost:3000/companiess/${company_id}`, {});
      setEmployers(employers.filter((e) => e.company_id !== company_id));
      toast.success("Xóa công ty thành công");
    } catch (error: any) {
      toast.error(
        "Lỗi khi xóa công ty: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  // Handle edit
  const handleEdit = (employer: Employer) => {
    setEditingEmployer(employer);
    setIsDialogOpen(true);
  };

  // Handle view details
  const handleViewDetails = (employer: Employer) => {
    setViewEmployer(employer);
    setIsViewDialogOpen(true);
  };

  // Employer Form for add/edit
  const EmployerForm = ({
    employer,
    onSave,
    onCancel,
  }: {
    employer?: Employer;
    onSave: (data: Employer) => void;
    onCancel: () => void;
  }) => {
    const [formData, setFormData] = useState<Partial<Employer>>(
      employer || {
        company_name: "",
        description: "",
        logo_url: "",
        website: "",
        location: "",
        company_size: "",
        industry: [],
        verified: false,
        total_jobs: 0,
        total_applications: 0,
      }
    );
    const [selectedIndustries, setSelectedIndustries] = useState<string[]>(
      formData.industry || []
    );

    const toggleIndustry = (industry: string) => {
      setSelectedIndustries((prev) =>
        prev.includes(industry)
          ? prev.filter((i) => i !== industry)
          : [...prev, industry]
      );
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const headers = {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        let res;
        if (employer?.company_id) {
          res = await axios.put(
            `http://localhost:3000/companiess/${employer.company_id}`,
            formData,
            { headers }
          );
          toast.success("Cập nhật công ty thành công");
        } else {
          res = await axios.post("http://localhost:3000/companiess", formData, {
            headers,
          });
          toast.success("Thêm công ty thành công");
        }
        onSave(res.data);
        onCancel();
      } catch (error: any) {
        toast.error(
          "Lỗi khi lưu công ty: " +
            (error.response?.data?.message || error.message)
        );
      }
    };
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Tên công ty</label>
          <Input
            value={formData.company_name || ""}
            onChange={(e) =>
              setFormData({ ...formData, company_name: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Mô tả</label>
          <Input
            value={formData.description || ""}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Logo URL</label>
          <Input
            value={formData.logo_url || ""}
            onChange={(e) =>
              setFormData({ ...formData, logo_url: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Website</label>
          <Input
            value={formData.website || ""}
            onChange={(e) =>
              setFormData({ ...formData, website: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Địa điểm</label>
          <Input
            value={formData.location || ""}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Quy mô</label>
          <Input
            value={formData.company_size || ""}
            onChange={(e) =>
              setFormData({ ...formData, company_size: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Ngành nghề</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {selectedIndustries.length > 0
                  ? selectedIndustries.join(", ")
                  : "Chọn ngành nghề"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandGroup>
                  {industries.map((industry) => (
                    <CommandItem
                      key={industry}
                      onSelect={() => toggleIndustry(industry)}
                      className="cursor-pointer"
                    >
                      <Checkbox
                        checked={selectedIndustries.includes(industry)}
                        className="mr-2"
                      />
                      {industry}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex gap-2">
          <Button type="submit">Lưu</Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Hủy
          </Button>
        </div>
      </form>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Quản lý nhà tuyển dụng
          </h1>
          <p className="text-gray-600">
            Quản lý các công ty và nhà tuyển dụng trên nền tảng
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="w-4 h-4 mr-2" />
              Xuất excel
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingEmployer ? "Sửa công ty" : "Thêm công ty"}
              </DialogTitle>
            </DialogHeader>
            <EmployerForm
              employer={editingEmployer ?? undefined}
              onSave={(data) => {
                setEmployers(
                  editingEmployer
                    ? employers.map((e) =>
                        e.company_id === data.company_id ? data : e
                      )
                    : [...employers, data]
                );
                setIsDialogOpen(false);
                setEditingEmployer(null);
              }}
              onCancel={() => {
                setIsDialogOpen(false);
                setEditingEmployer(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      {loading ? (
        <div className="text-center">Đang tải...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {totalEmployers}
                  </div>
                  <div className="text-sm text-gray-600">
                    Tổng nhà tuyển dụng
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {verifiedEmployers}
                  </div>
                  <div className="text-sm text-gray-600">Đã xác thực</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Briefcase className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {totalJobs}
                  </div>
                  <div className="text-sm text-gray-600">
                    Tổng tin tuyển dụng
                  </div>
                </div>
              </div>
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
                  placeholder="Tìm kiếm theo tên công ty hoặc ngành nghề..."
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
                <SelectItem value="verified">Đã xác thực</SelectItem>
                <SelectItem value="pending">Chờ xác thực</SelectItem>
                <SelectItem value="suspended">Tạm khóa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Employer Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Công ty</TableHead>
                <TableHead>Ngành nghề</TableHead>
                <TableHead>Quy mô</TableHead>
                <TableHead>Địa điểm</TableHead>
                <TableHead>Tin tuyển dụng</TableHead>
                <TableHead>Ứng tuyển</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center">
                    Đang tải...
                  </TableCell>
                </TableRow>
              ) : filteredEmployers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center">
                    Không tìm thấy danh mục
                  </TableCell>
                </TableRow>
              ) : (
                filteredEmployers.map((employer) => (
                  <TableRow key={employer.company_id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={employer.logo_url || "/placeholder.svg"}
                            alt={employer.company_name}
                          />
                          <AvatarFallback>
                            {employer.company_name?.[0] || ""}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {employer.company_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {employer.description}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {employer.industry.map(
                          (item: string, index: number) => (
                            <Badge key={index} variant="outline">
                              {item}
                            </Badge>
                          )
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{employer.company_size}</TableCell>
                    <TableCell>{employer.location}</TableCell>
                    <TableCell>
                      <div className="text-center">
                        <div className="font-medium text-blue-600">
                          {employer.total_jobs}
                        </div>
                        <div className="text-xs text-gray-500">đang tuyển</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <div className="font-medium text-green-600">
                          {employer.total_applications}
                        </div>
                        <div className="text-xs text-gray-500">ứng tuyển</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={employer.verified ? "default" : "secondary"}
                      >
                        {employer.verified ? "Đã xác thực" : "Chờ xác thực"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 justify-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Xem chi tiết"
                          onClick={() => handleViewDetails(employer)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Chỉnh sửa"
                          onClick={() => handleEdit(employer)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Xóa"
                          onClick={() => handleDelete(employer.company_id)}
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* View Details Modal */}
      {/* View Details Modal */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Chi tiết công ty</DialogTitle>
          </DialogHeader>
          {viewEmployer && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage
                    src={viewEmployer.logo_url || "/placeholder.svg"}
                    alt={viewEmployer.company_name}
                  />
                  <AvatarFallback>
                    {viewEmployer.company_name?.[0] || ""}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold">
                    {viewEmployer.company_name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {viewEmployer.description}
                  </p>
                </div>
              </div>
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center gap-2">
                    <Link className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Website:</span>
                    <a
                      href={viewEmployer.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {viewEmployer.website || "Chưa cung cấp"}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Địa điểm:</span>
                    <span>{viewEmployer.location || "Chưa cung cấp"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Quy mô:</span>
                    <span>{viewEmployer.company_size || "Chưa cung cấp"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Ngành nghề:</span>
                    <span>
                      {viewEmployer.industry.join(", ") || "Chưa cung cấp"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Tin tuyển dụng:</span>
                    <span>{viewEmployer.total_jobs}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Ứng tuyển:</span>
                    <span>{viewEmployer.total_applications}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {viewEmployer.verified ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500" />
                    )}
                    <span className="font-medium">Trạng thái:</span>
                    <Badge
                      variant={viewEmployer.verified ? "default" : "secondary"}
                    >
                      {viewEmployer.verified ? "Đã xác thực" : "Chờ xác thực"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Ngày tạo:</span>
                    <span>
                      {new Date(viewEmployer.created_at).toLocaleDateString(
                        "vi-VN"
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Cập nhật lần cuối:</span>
                    <span>
                      {new Date(viewEmployer.updated_at).toLocaleDateString(
                        "vi-VN"
                      )}
                    </span>
                  </div>
                </CardContent>
              </Card>
              <div className="flex justify-end gap-2">
                <Button
                  variant={viewEmployer.verified ? "destructive" : "default"}
                  onClick={() => handleToggleVerified(viewEmployer)}
                >
                  {viewEmployer.verified ? "Hủy xác thực" : "Xác thực"}
                </Button>
                <DialogClose asChild>
                  <Button variant="outline">Đóng</Button>
                </DialogClose>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
