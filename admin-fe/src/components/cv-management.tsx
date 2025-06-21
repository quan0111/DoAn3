"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import {
  Search,
  Filter,
  MoreHorizontal,
  Download,
  Eye,
  Star,
  Plus,
} from "lucide-react";
import axios from "axios";

interface CVTemplate {
  template_id: number;
  name: string;
  description: string;
  thumbnail_url: string;
  html_structure: string;
  css_styles: string;
  category_id: number;
  is_premium: number;
  price: string;
  popularity_score: number;
  category_name: string;
}

export function CVManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [templates, setTemplates] = useState<CVTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<CVTemplate | null>(null);
  const [newTemplate, setNewTemplate] = useState<Partial<CVTemplate> & { pdf_file?: File } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get("http://localhost:3000/cv_templatess");
        setTemplates(response.data);
      } catch (err: any) {
        console.error("Error fetching templates:", err);
        setError("Không thể tải danh sách mẫu CV. Vui lòng thử lại!");
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);


  const handleAddTemplate = async () => {
    if (!newTemplate) return;

    const formData = new FormData();
    formData.append("name", newTemplate.name || "");
    formData.append("description", newTemplate.description || "");
    if (newTemplate.pdf_file) formData.append("pdf_file", newTemplate.pdf_file);
    formData.append("category_id", (newTemplate.category_id || 1).toString());
    formData.append("is_premium", (newTemplate.is_premium || 0).toString());
    formData.append("price", newTemplate.price || "0.00");
    formData.append("popularity_score", (newTemplate.popularity_score || 0).toString());
    console.log(formData)
    try {
      const response = await axios.post("http://localhost:3000/cv_templatess", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTemplates([...templates, response.data]);
      setNewTemplate(null);
      setIsModalOpen(false);
    } catch (err: any) {
      console.error("Error adding template:", err);
      toast.error("Thêm mẫu CV thất bại. Vui lòng thử lại!");
    }
  };

  const handleUpdateTemplate = async () => {
    if (selectedTemplate) {
      try {
        const response = await axios.put(`http://localhost:3000/cv_templatess/${selectedTemplate.template_id}`, {
          ...selectedTemplate,
          html_structure: selectedTemplate.html_structure || "<html><body><h1>CV Cập nhật</h1><p>Nội dung CV</p></body></html>",
          css_styles: selectedTemplate.css_styles || "body { font-family: Arial; }",
        });
        setTemplates(templates.map((t) => (t.template_id === selectedTemplate.template_id ? response.data : t)));
        setSelectedTemplate(null);
        setIsModalOpen(false);
      } catch (err: any) {
        console.error("Error updating template:", err);
        toast.error("Cập nhật mẫu CV thất bại. Vui lòng thử lại!");
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
        <h1 className="text-3xl font-bold text-gray-900">Quản lý CV</h1>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => { setNewTemplate({}); setIsModalOpen(true); }}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm mẫu CV
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Danh sách mẫu CV</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm theo tên..."
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
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Tên mẫu</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Mô tả</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Danh mục</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Thumbnail</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Giá</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Điểm phổ biến</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {templates
                  .filter((template) =>
                    template.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((template) => (
                    <tr key={template.template_id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900">{template.name}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-gray-500">{template.description}</div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className="bg-blue-100 text-blue-800">{template.category_name}</Badge>
                      </td>
                      <td className="py-4 px-4">
                        <img src={`http://localhost:3000/${template.thumbnail_url}`} alt={template.name} className="h-16 w-auto" />
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-gray-600">{template.price} VND</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{template.popularity_score}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Button variant="ghost" size="sm" onClick={() => { setSelectedTemplate(template); setIsModalOpen(true); }}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {/* Modal for Add/Edit Template */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4">
                  {selectedTemplate ? "Sửa mẫu CV" : "Thêm mẫu CV"}
                </h3>
                <Input
                  placeholder="Tên mẫu"
                  value={newTemplate?.name || selectedTemplate?.name || ""}
                  onChange={(e) => (selectedTemplate ? setSelectedTemplate({ ...selectedTemplate, name: e.target.value }) : setNewTemplate({ ...newTemplate, name: e.target.value }))}
                  className="mb-4"
                />
                <Input
                  placeholder="Mô tả"
                  value={newTemplate?.description || selectedTemplate?.description || ""}
                  onChange={(e) => (selectedTemplate ? setSelectedTemplate({ ...selectedTemplate, description: e.target.value }) : setNewTemplate({ ...newTemplate, description: e.target.value }))}
                  className="mb-4"
                />
                {!selectedTemplate && (
                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setNewTemplate({ ...newTemplate, pdf_file: e.target.files?.[0] })}
                    className="mb-4"
                  />
                )}
                <Input
                  placeholder="Category ID"
                  type="number"
                  value={newTemplate?.category_id?.toString() || selectedTemplate?.category_id?.toString() || ""}
                  onChange={(e) => (selectedTemplate ? setSelectedTemplate({ ...selectedTemplate, category_id: parseInt(e.target.value) }) : setNewTemplate({ ...newTemplate, category_id: parseInt(e.target.value) }))}
                  className="mb-4"
                />
                <Input
                  placeholder="Price"
                  value={newTemplate?.price || selectedTemplate?.price || ""}
                  onChange={(e) => (selectedTemplate ? setSelectedTemplate({ ...selectedTemplate, price: e.target.value }) : setNewTemplate({ ...newTemplate, price: e.target.value }))}
                  className="mb-4"
                />
                <Input
                  placeholder="Popularity Score"
                  type="number"
                  step="0.1"
                  value={newTemplate?.popularity_score?.toString() || selectedTemplate?.popularity_score?.toString() || ""}
                  onChange={(e) => (selectedTemplate ? setSelectedTemplate({ ...selectedTemplate, popularity_score: parseFloat(e.target.value) }) : setNewTemplate({ ...newTemplate, popularity_score: parseFloat(e.target.value) }))}
                  className="mb-4"
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => { setNewTemplate(null); setSelectedTemplate(null); setIsModalOpen(false); }}>
                    Hủy
                  </Button>
                  {selectedTemplate ? (
                    <Button onClick={handleUpdateTemplate}>Cập nhật</Button>
                  ) : (
                    <Button onClick={handleAddTemplate}>Thêm</Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}