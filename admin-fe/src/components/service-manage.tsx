"use client";
import { z } from "zod";
import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Package,
  DollarSign,
  Clock,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/dialog";
import { ServiceForm } from "./service-form";
import { CategoryManagement } from "./category-manage";
import axios from "axios";
import { toast } from "sonner";

const serviceSchema = z.object({
  name: z.string().min(1, "Tên dịch vụ không được để trống"),
  price: z.number().min(0, "Giá phải là số dương"),
  duration: z.number().min(1, "Thời hạn phải là số dương"),
  bonus_credits: z.number().min(0, "Credits phải là số không âm"),
  top_box_description: z.string().min(1, "Mô tả không được để trống"),
  re_top_gold: z.number().min(0, "Re-top Gold phải là số không âm"),
  re_top_normal: z.number().min(0, "Re-top Normal phải là số không âm"),
  top_job_alert: z.boolean(),
  urgent_add_on: z.boolean(),
  discount_percent: z.number().min(0, "Giảm giá phải là số không âm").max(100),
  vat_included: z.boolean(),
  image_url: z.string().optional(),
  user_type: z.enum(["employer", "candidate"]),
  category_id: z.number().min(1, "Vui lòng chọn danh mục"),
  active: z.boolean(),
});
type ServiceFormValues = z.infer<typeof serviceSchema>;
interface Service {
  id: number;
  name: string;
  price: number;
  duration: number;
  bonus_credits: number;
  top_box_description: string;
  re_top_gold: number;
  re_top_normal: number;
  top_job_alert: boolean;
  urgent_add_on: boolean;
  discount_percent: number;
  vat_included: boolean;
  image_url?: string;
  user_type: "employer" | "candidate";
  category_id: number;
  active: boolean;
  created_at: string;
  sales_count: number;
}

interface Category {
  id: number;
  name: string;
  description: string;
  active: boolean;
  service_count: number;
  created_at: string;
}

export function ServiceManagement() {
  const [filters, setFilters] = useState({
    searchTerm: "",
    category: "all",
    userType: "all",
    status: "all",
  });
  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isServiceDialogOpen, setIsServiceDialogOpen] =
    useState<boolean>(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] =
    useState<boolean>(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesResponse, categoriesResponse] = await Promise.all([
          axios.get<Service[]>("http://localhost:3000/payment_servicess"),
          axios.get<Category[]>("http://localhost:3000/service_categoriess"),
        ]);
        setServices(servicesResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error: any) {
        toast.error(
          "Lỗi khi tải dữ liệu: " +
            (error.response?.data?.message || error.message)
        );
      }
    };
    fetchData();
  }, []);

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name
      .toLowerCase()
      .includes(filters.searchTerm.toLowerCase());
    const matchesCategory =
      filters.category === "all" ||
      service.category_id.toString() === filters.category;
    const matchesUserType =
      filters.userType === "all" || service.user_type === filters.userType;
    const matchesStatus =
      filters.status === "all" ||
      (filters.status === "active" ? service.active : !service.active);
    return matchesSearch && matchesCategory && matchesUserType && matchesStatus;
  });

  const getCategoryName = (categoryId: number): string => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Không xác định";
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
 const handleServiceSave = async (data: ServiceFormValues) => {
    try {
      const payload: Service = {
        ...data,
        id: editingService ? editingService.id : services.length + 1,
        category_id: Number(data.category_id),
        price: Number(data.price),
        duration: Number(data.duration),
        bonus_credits: Number(data.bonus_credits),
        re_top_gold: Number(data.re_top_gold),
        re_top_normal: Number(data.re_top_normal),
        discount_percent: Number(data.discount_percent),
        created_at: editingService ? editingService.created_at : new Date().toISOString().split("T")[0],
        sales_count: editingService ? editingService.sales_count : 0,
        image_url: data.image_url,
      };

      setServices((prev) =>
        editingService
          ? prev.map((s) => (s.id === editingService.id ? payload : s))
          : [...prev, payload]
      );
      setIsServiceDialogOpen(false);
      setEditingService(null);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message);
    }
  };


  const handleDeleteService = async (id: number): Promise<void> => {
    if (!window.confirm("Bạn có chắc muốn xóa dịch vụ này?")) return;
    try {
      await axios.delete(`http://localhost:3000/payment_servicess/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setServices(services.filter((s) => s.id !== id));
      toast.success("Xóa dịch vụ thành công");
    } catch (error: any) {
      toast.error(
        "Lỗi khi xóa dịch vụ: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const openServiceEdit = (service: Service): void => {
    setEditingService(service);
    setIsServiceDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý dịch vụ</h1>
          <p className="text-gray-600">Quản lý các gói dịch vụ và danh mục</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog
            open={isCategoryDialogOpen}
            onOpenChange={setIsCategoryDialogOpen}
          >
            <DialogTrigger asChild>
              <Button variant="outline">
                <Package className="w-4 h-4 mr-2" />
                Quản lý danh mục
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[80vw]">
              <DialogHeader>
                <DialogTitle>Quản lý danh mục</DialogTitle>
              </DialogHeader>
              <CategoryManagement
                onCategoryChange={(updatedCategories: Category[]) =>
                  setCategories(updatedCategories)
                }
              />
            </DialogContent>
          </Dialog>
          <Dialog
            open={isServiceDialogOpen}
            onOpenChange={setIsServiceDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="bg-orange-500 hover:bg-orange-600">
                <Plus className="w-4 h-4 mr-2" />
                Thêm dịch vụ mới
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[80vw]">
              <ServiceForm
                service={editingService ?? undefined}
                categories={categories}
                onSave={handleServiceSave}
                onCancel={() => {
                  setIsServiceDialogOpen(false);
                  setEditingService(null);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {services.length}
                </div>
                <div className="text-sm text-gray-600">Tổng dịch vụ</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {services.reduce(
                    (sum, service) => sum + (service.sales_count || 0),
                    0
                  )}
                </div>
                <div className="text-sm text-gray-600">Tổng lượt mua</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {services.filter((s) => s.user_type === "employer").length}
                </div>
                <div className="text-sm text-gray-600">Dành cho NTD</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {categories.length}
                </div>
                <div className="text-sm text-gray-600">Danh mục</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
                  placeholder="Tìm kiếm theo tên dịch vụ..."
                  value={filters.searchTerm}
                  onChange={(e) =>
                    handleFilterChange("searchTerm", e.target.value)
                  }
                  className="pl-10"
                />
              </div>
            </div>
            <Select
              value={filters.category}
              onValueChange={(value) => handleFilterChange("category", value)}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Danh mục" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả danh mục</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={filters.userType}
              onValueChange={(value) => handleFilterChange("userType", value)}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Đối tượng" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="employer">Nhà tuyển dụng</SelectItem>
                <SelectItem value="candidate">Ứng viên</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filters.status}
              onValueChange={(value) => handleFilterChange("status", value)}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="active">Đang hoạt động</SelectItem>
                <SelectItem value="inactive">Tạm dừng</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Dịch vụ</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Giá</TableHead>
                <TableHead>Thời hạn</TableHead>
                <TableHead>Đối tượng</TableHead>
                <TableHead>Tính năng</TableHead>
                <TableHead>Lượt mua</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage
                          src={
                            service.image_url
                              ? `http://localhost:3000/${service.image_url}`
                              : "/placeholder.svg"
                          }
                          alt={service.name}
                        />
                        <AvatarFallback>
                          {service.name?.charAt(0) || "?"}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="">
                      <div className="font-medium">{service.name}</div>
                      <div className="text-sm text-gray-500">
                        {service.top_box_description}
                      </div>
                      {service.discount_percent > 0 && (
                        <Badge variant="destructive" className="text-xs mt-1">
                          -{service.discount_percent}%
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {getCategoryName(service.category_id)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {formatPrice(service.price)}
                    </div>
                    {service.vat_included && (
                      <div className="text-xs text-gray-500">
                        Đã bao gồm VAT
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{service.duration} ngày</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        service.user_type === "employer"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {service.user_type === "employer"
                        ? "Nhà tuyển dụng"
                        : "Ứng viên"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {service.bonus_credits > 0 && (
                        <div className="text-xs text-blue-600">
                          +{service.bonus_credits} credits
                        </div>
                      )}
                      {service.re_top_gold > 0 && (
                        <div className="text-xs text-yellow-600">
                          {service.re_top_gold} Re-top Gold
                        </div>
                      )}
                      {service.re_top_normal > 0 && (
                        <div className="text-xs text-gray-600">
                          {service.re_top_normal} Re-top Normal
                        </div>
                      )}
                      {service.top_job_alert && (
                        <div className="text-xs text-green-600">Job Alert</div>
                      )}
                      {service.urgent_add_on && (
                        <div className="text-xs text-red-600">
                          Urgent Add-on
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <div className="font-medium text-green-600">
                        {service.sales_count || 0}
                      </div>
                      <div className="text-xs text-gray-500">lượt mua</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={service.active ? "default" : "secondary"}>
                      {service.active ? "Hoạt động" : "Tạm dừng"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" title="Xem chi tiết">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Chỉnh sửa"
                        onClick={() => openServiceEdit(service)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Xóa"
                        onClick={() => handleDeleteService(service.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
