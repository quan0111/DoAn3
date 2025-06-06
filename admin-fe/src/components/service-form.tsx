"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Save, X, Upload, DollarSign, Clock, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

interface Category {
  id: number;
  name: string;
}

const serviceSchema = z.object({
  name: z.string().min(1, "Tên dịch vụ không được để trống"),
  price: z.number().min(0, "Giá phải là số dương"),
  duration: z.number().min(1, "Thời hạn phải là số dương"),
  bonus_credits: z.number().min(0, "Credits phải là số không âm"),
  top_box_description: z.string().min(1, "Mô tả không được để trống"),
  re_top_gold: z.number().min(0, "Re-top Gold phải là số không âm"),
  re_top_normal: z.number().min(0, "Re-top normal phải là số không âm"),
  top_job_alert: z.boolean(),
  urgent_add_on: z.boolean(),
  discount_percent: z.number().min(0, "Giảm giá phải là số không âm").max(100),
  vat_included: z.boolean(),
  user_type: z.enum(["employer", "candidate"]),
  category_id: z.number().min(1, "Vui lòng chọn danh mục"),
  active: z.boolean(),
  image_url: z.string().optional(),
});

type ServiceFormData = z.infer<typeof serviceSchema>;

interface ServiceFormProps {
  service?: ServiceFormData & { id?: number };
  categories: Category[];
  onSave: (data: ServiceFormData) => Promise<void>;
  onCancel: () => void;
}

export function ServiceForm({ service, categories, onSave, onCancel }: ServiceFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(service?.image_url || null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const form = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: service || {
      name: "",
      price: 0,
      duration: 30,
      bonus_credits: 0,
      top_box_description: "",
      re_top_gold: 0,
      re_top_normal: 0,
      top_job_alert: false,
      urgent_add_on: false,
      discount_percent: 0,
      vat_included: true,
      user_type: "employer",
      category_id: categories[0]?.id || 1,
      active: true,
      image_url: undefined,
    },
  });

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (data: ServiceFormData) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "top_job_alert" || key === "urgent_add_on" || key === "vat_included" || key === "active") {
          formData.append(key, value ? "1" : "0");
        } else if (key !== "image_url" && value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });
      if (imageFile) {
        formData.append("image_url", imageFile); // Khớp với backend
      }

      const headers = {
        "Content-Type": "multipart/form-data",
      };

      let response;
      if (service?.id) {
        response = await axios.put(`http://localhost:3000/payment_servicess/${service.id}`, formData, { headers });
        toast.success("Cập nhật dịch vụ thành công!");
      } else {
        response = await axios.post("http://localhost:3000/payment_servicess", formData, { headers });
        toast.success("Thêm dịch vụ thành công!");
      }
      
      // Cập nhật image_url từ response nếu có
      const updatedData = { ...data, image_url: response.data.image_url || data.image_url };
      await onSave(updatedData);
      onCancel(); // Đóng form
    } catch (error: any) {
      toast.error(`Lỗi khi lưu dịch vụ: ${error.response?.data?.message || error.message}. Vui lòng kiểm tra và nhập lại.`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="max-h-[calc(100vh-100px)] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          <div className="flex items-center justify-between sticky top-0 bg-white z-10 py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{service ? "Chỉnh sửa dịch vụ" : "Thêm dịch vụ mới"}</h1>
              <p className="text-gray-600">Điền thông tin chi tiết về dịch vụ</p>
            </div>
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" onClick={onCancel}>
                <X className="w-4 h-4 mr-2" />
                Hủy
              </Button>
              <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                <Save className="w-4 h-4 mr-2" />
                Lưu dịch vụ
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin cơ bản</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tên dịch vụ *</FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập tên dịch vụ..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="top_box_description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mô tả ngắn *</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Mô tả ngắn gọn về dịch vụ..." rows={3} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="category_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Danh mục *</FormLabel>
                          <Select
                            onValueChange={(value) => field.onChange(Number(value))}
                            defaultValue={field.value?.toString()}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn danh mục" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category.id} value={category.id.toString()}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="user_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Đối tượng sử dụng *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn đối tượng" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="employer">Nhà tuyển dụng</SelectItem>
                              <SelectItem value="candidate">Ứng viên</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Thông tin giá cả
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Giá dịch vụ (VNĐ) *</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <div className="text-sm text-gray-500 mt-1">{formatPrice(field.value)}</div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="discount_percent"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Giảm giá (%)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              placeholder="0"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="vat_included"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>Đã bao gồm VAT</FormLabel>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="w-5 h-5" />
                    Tính năng và quyền lợi
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Thời hạn (ngày) *</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="30"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bonus_credits"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bonus Credits</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="re_top_gold"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Re-top Gold</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="re_top_normal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Re-top Normal</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-3">
                    <FormField
                      control={form.control}
                      name="top_job_alert"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormLabel>Top Job Alert</FormLabel>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="urgent_add_on"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormLabel>Urgent Add-on</FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Hình ảnh dịch vụ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {imagePreview ? (
                      <div className="space-y-2">
                        <img
                          src={imagePreview}
                          alt="Service"
                          className="w-20 h-20 mx-auto rounded-lg object-cover"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setImagePreview(null);
                            setImageFile(null);
                          }}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Xóa ảnh
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="w-12 h-12 mx-auto text-gray-400" />
                        <div className="text-sm text-gray-600">Tải lên hình ảnh</div>
                        <Button variant="outline" size="sm" asChild>
                          <label>
                            <input
                              type="file"
                              accept="image/jpeg,image/jpg,image/png"
                              className="hidden"
                              onChange={handleImageChange}
                            />
                            Chọn file
                          </label>
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Trạng thái</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="active"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>Kích hoạt dịch vụ</FormLabel>
                      </FormItem>
                    )}
                  />
                  <div className="mt-2">
                    <Badge variant={form.getValues("active") ? "default" : "secondary"}>
                      {form.getValues("active") ? "Đang hoạt động" : "Tạm dừng"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Xem trước</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg p-4 space-y-2">
                    <div className="font-medium">{form.getValues("name") || "Tên dịch vụ"}</div>
                    <div className="text-sm text-gray-600">
                      {form.getValues("top_box_description") || "Mô tả dịch vụ"}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-orange-600">{formatPrice(form.getValues("price"))}</div>
                      <Badge variant="outline">
                        <Clock className="w-3 h-3 mr-1" />
                        {form.getValues("duration")} ngày
                      </Badge>
                    </div>
                    {form.getValues("discount_percent") > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        Giảm {form.getValues("discount_percent")}%
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}