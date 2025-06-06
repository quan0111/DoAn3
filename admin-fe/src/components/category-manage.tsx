"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Package, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";

interface Category {
  id: number;
  name: string;
  description: string;
  active: boolean;
  service_count: number;
  created_at: string;
}

interface CategoryManagementProps {
  onCategoryChange: (categories: Category[]) => void;
}

const categorySchema = z.object({
  name: z.string().min(1, "Tên danh mục không được để trống"),
  description: z.string().optional(),
  active: z.boolean(),
});

export function CategoryManagement({ onCategoryChange }: CategoryManagementProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      active: true,
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>("http://localhost:3000/service_categoriess");
        setCategories(response.data);
        onCategoryChange(response.data);
      } catch (error: any) {
        toast.error("Lỗi khi tải danh mục: " + (error.response?.data?.message || error.message));
      }
    };
    fetchCategories();
  }, []);

const handleSave = async (data: z.infer<typeof categorySchema>) => {
  try {
    const payload = {
      name: data.name,
      description: data.description,
      active: data.active,
    };

    if (editingCategoryId) {
      const response = await axios.put<Category>(
        `http://localhost:3000/service_categoriess/${editingCategoryId}`,
        payload
      );
      const updatedCategories = categories.map((c) =>
        c.id === editingCategoryId ? response.data : c
      );
      setCategories(updatedCategories);
      onCategoryChange(updatedCategories);
      toast.success("Cập nhật danh mục thành công");
    } else {
      const response = await axios.post<Category>(
        "http://localhost:3000/service_categoriess",
        payload
      );
      const updatedCategories = [...categories, response.data];
      setCategories(updatedCategories);
      onCategoryChange(updatedCategories);
      toast.success("Thêm danh mục thành công");
    }

    setIsDialogOpen(false);
    setEditingCategoryId(null);
    form.reset();
  } catch (error: any) {
    toast.error("Lỗi khi lưu danh mục: " + (error.response?.data?.message || error.message));
  }
};


  const handleEdit = (category: Category) => {
    setEditingCategoryId(category.id);
    form.reset({
      name: category.name,
      description: category.description || "",
      active: category.active,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (categoryId: number) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) return;
    try {
      await axios.delete(`http://localhost:3000/service_categoriess/${categoryId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const updatedCategories = categories.filter((c) => c.id !== categoryId);
      setCategories(updatedCategories);
      onCategoryChange(updatedCategories);
      toast.success("Xóa danh mục thành công");
    } catch (error: any) {
      toast.error("Lỗi khi xóa danh mục: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Quản lý danh mục dịch vụ</h1>
          <p className="text-gray-600">Tổ chức và phân loại các dịch vụ theo danh mục</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)} className="bg-orange-500 hover:bg-orange-600">
          <Plus className="w-4 h-4 mr-2" />
          Thêm danh mục
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{categories.length}</div>
                <div className="text-sm text-gray-600">Tổng danh mục</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{categories.filter((c) => c.active).length}</div>
            <div className="text-sm text-gray-600">Đang hoạt động</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên danh mục</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead>Số dịch vụ</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Package className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="font-medium">{category.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate text-sm text-gray-600">{category.description || "-"}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <Badge variant="outline">{category.service_count || 0} dịch vụ</Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={category.active ? "default" : "secondary"} >
                      {category.active ? "Hoạt động" : "Tạm dừng"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(category)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(category.id)}
                          className="text-red-600"
                          disabled={category.service_count > 0}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingCategoryId ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}</DialogTitle>
            <DialogDescription>
              {editingCategoryId ? "Cập nhật thông tin danh mục" : "Tạo danh mục mới cho dịch vụ"}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Tên danh mục *</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tên danh mục..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Mô tả</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Mô tả về danh mục..." rows={3} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel>Kích hoạt danh mục</FormLabel>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Hủy
                </Button>
                <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                  {editingCategoryId ? "Cập nhật" : "Tạo mới"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}