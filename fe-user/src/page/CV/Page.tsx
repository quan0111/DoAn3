
"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Search, Filter, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

interface CVTemplate {
  template_id: number;
  name: string;
  thumbnail_url: string;
  is_premium: boolean;
  category_id: number;
  category_name: string;
}

export default function CVTemplatesPage() {
  const [templates, setTemplates] = useState<CVTemplate[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    setIsLoading(true);
    try {

      const res = await axios.get("http://localhost:3000/cv_templatess", {
      });
      setTemplates(res.data);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Lỗi tải danh sách mẫu CV");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTemplates = templates.filter((template) =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Banner */}
        <section className="bg-green-600 py-12 text-white">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-4xl font-bold">Thư Viện Mẫu CV</h1>
              <p className="mb-6 text-lg">
                Khám phá bộ sưu tập mẫu CV chuyên nghiệp của chúng tôi, được thiết kế để giúp bạn nổi bật
              </p>
              <div className="relative mx-auto max-w-xl">
                <input
                  type="text"
                  placeholder="Tìm kiếm mẫu CV..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 pl-10 text-black"
                  disabled={isLoading}
                />
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="border-b py-4">
          <div className="container">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Filter className="h-4 w-4" />
                  <span>Lọc</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  Ngành nghề
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  Kinh nghiệm
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  Phong cách
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sắp xếp theo:</span>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  Phổ biến nhất
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CV Templates Grid */}
        <section className="py-12">
          <div className="container">
            {isLoading ? (
              <div className="text-center">Đang tải...</div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {filteredTemplates.map((template) => (
                    <Link
                      to={`/mau-cv/${template.template_id}`}
                      key={template.template_id}
                      className="group block"
                    >
                      <div className="overflow-hidden rounded-lg border shadow transition-all duration-300 hover:shadow-md">
                        <div className="relative">
                          <img
                            src={`http://localhost:3000/${template.thumbnail_url}` || "/placeholder.svg?height=500&width=350"}
                            alt={template.name}
                            className="h-120 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                            <div className="flex h-full items-center justify-center">
                              <Button className="bg-green-600 hover:bg-green-700">Xem Chi Tiết</Button>
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="mb-1 font-semibold">{template.name}</h3>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">{template.category_name}</span>
                            <span
                              className={`text-sm ${template.is_premium ? "text-gray-500" : "text-green-600"}`}
                            >
                              {template.is_premium ? "Cao cấp" : "Miễn phí"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-12 flex justify-center">
                  <Button
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-50"
                  >
                    Xem Thêm Mẫu CV
                  </Button>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
