import { Header } from "@/components/Header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Building, MapPin, Globe, Upload, X, Check, ChevronsUpDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function EmployerCompanyInfoPage() {
  const navigate = useNavigate();

  // State để lưu dữ liệu form
  const [formData, setFormData] = useState({
    company_name: "",
    description: "",
    logo_url: "",
    website: "",
    location: "",
    company_size: "",
    industries: [] as string[],
  });

  // State để hiển thị preview ảnh logo
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // State để kiểm soát trạng thái gửi form
  const [loading, setLoading] = useState(false);

  // State để kiểm soát trạng thái mở/đóng của Popover
  const [isIndustryOpen, setIsIndustryOpen] = useState(false);

  // Ref để truy cập input file
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Danh sách ngành nghề
  const industryOptions = [
    "Công nghệ thông tin",
    "Tài chính - Ngân hàng",
    "Marketing - Truyền thông",
    "Giáo dục - Đào tạo",
    "Khác",
  ];

  // Hàm xử lý thay đổi input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Hàm xử lý thay đổi select
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Hàm xử lý chọn file logo
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      const fakeUploadedUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, logo_url: fakeUploadedUrl }));
    }
  };

  // Hàm xử lý chọn/xóa ngành nghề
  const handleIndustryChange = (industry: string) => {
    setFormData((prev) => {
      const industries = prev.industries.includes(industry)
        ? prev.industries.filter((item) => item !== industry)
        : [...prev.industries, industry];
      return { ...prev, industries };
    });
  };

  // Hàm xử lý submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/companies", {
        ...formData,
        industry: formData.industries.join(", "),
        user_id: 1,
        verified: false,
      });

      if (response.status === 201) {
        toast.success("Thông tin công ty đã được lưu thành công!");
        navigate("/nha-tuyen-dung");
      }
    } catch (error) {
      console.error("Lỗi khi lưu thông tin công ty:", error);
      toast.error("Đã có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto my-12 max-w-screen-xl px-4 md:px-8">
          <div className="mx-auto grid max-w-screen-xl gap-8 lg:grid-cols-2">
            {/* Image Section */}
            <div className="relative hidden overflow-hidden rounded-lg bg-green-600 lg:block">
              <div className="absolute inset-0 bg-green-600 bg-opacity-90"></div>
              <img
                src="/placeholder.svg?height=1000&width=800"
                alt="Company Info"
                className="h-full w-full object-cover opacity-50"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-white">
                <h2 className="mb-6 text-3xl font-bold">Hoàn thiện thông tin công ty của bạn!</h2>
                <p className="mb-8 text-center text-lg">
                  Cung cấp thông tin chi tiết về công ty để xây dựng thương hiệu tuyển dụng và thu hút ứng viên chất lượng.
                </p>
                <div className="mb-8 space-y-4">
                  {[
                    "Tăng độ tin cậy với ứng viên",
                    "Tạo ấn tượng với thương hiệu tuyển dụng",
                    "Thu hút nhân tài phù hợp",
                    "Quản lý thông tin dễ dàng",
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-white"></div>
                      <p>{feature}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="mb-4 text-center">Đã có thông tin công ty?</p>
                  <Button variant="secondary" asChild>
                    <Link to="/nha-tuyen-dung">Quản lý công ty</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Company Info Form */}
            <div className="mx-auto flex max-w-md flex-col justify-center space-y-6 p-4 md:p-8">
              <div className="text-center lg:text-left">
                <h1 className="text-3xl font-bold">Nhập thông tin công ty</h1>
                <p className="mt-2 text-gray-500">Cung cấp thông tin để bắt đầu quản lý công ty của bạn</p>
              </div>

              <form onSubmit={handleSubmit} className="grid gap-4">
                {/* Logo Upload */}
                <div className="grid gap-2">
                  <label htmlFor="logo_url" className="text-sm font-medium text-left">
                    Logo công ty
                  </label>
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="relative h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {logoPreview ? (
                        <img
                          src={logoPreview}
                          alt="Logo Preview"
                          className="h-full w-full object-cover rounded-full"
                        />
                      ) : (
                        <Upload className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <Input
                      type="file"
                      id="logo_url"
                      name="logo_url"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoChange}
                      ref={fileInputRef}
                    />
                    <p className="text-sm text-gray-500">Nhấn để chọn logo (tối đa 5MB)</p>
                  </div>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="company_name" className="text-sm font-medium text-left">
                    Tên công ty
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="company_name"
                      name="company_name"
                      placeholder="Công ty ABC"
                      className="pl-10"
                      value={formData.company_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="description" className="text-sm font-medium text-left">
                    Mô tả công ty
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Công ty chúng tôi chuyên về..."
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="website" className="text-sm font-medium text-left">
                    Website
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="website"
                      name="website"
                      placeholder="https://example.com"
                      className="pl-10"
                      value={formData.website}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="location" className="text-sm font-medium text-left">
                    Địa điểm
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Select
                      onValueChange={(value) => handleSelectChange("location", value)}
                      value={formData.location}
                    >
                      <SelectTrigger className="pl-10 w-full">
                        <SelectValue placeholder="Chọn thành phố" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hà Nội">Hà Nội</SelectItem>
                        <SelectItem value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</SelectItem>
                        <SelectItem value="Đà Nẵng">Đà Nẵng</SelectItem>
                        <SelectItem value="Khác">Khác</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Multi-select Industry với shadcn/ui Command */}
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-left">Ngành nghề</label>
                  <Popover open={isIndustryOpen} onOpenChange={setIsIndustryOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={isIndustryOpen}
                        className="w-full justify-between"
                      >
                        {formData.industries.length > 0
                          ? formData.industries.join(", ")
                          : "Chọn ngành nghề"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandList>
                          <CommandGroup>
                            {industryOptions.map((industry) => (
                              <CommandItem
                                key={industry}
                                value={industry}
                                onSelect={() => {
                                  handleIndustryChange(industry);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    formData.industries.includes(industry)
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {industry}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {formData.industries.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.industries.map((industry) => (
                        <div
                          key={industry}
                          className="flex items-center gap-1 bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full"
                        >
                          <span>{industry}</span>
                          <button
                            type="button"
                            onClick={() => handleIndustryChange(industry)}
                            className="text-green-600 hover:text-green-800"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid gap-2">
                  <label htmlFor="company_size" className="text-sm font-medium text-left">
                    Quy mô công ty
                  </label>
                  <Select
                    onValueChange={(value) => handleSelectChange("company_size", value)}
                    value={formData.company_size}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn quy mô" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 nhân viên</SelectItem>
                      <SelectItem value="11-50">11-50 nhân viên</SelectItem>
                      <SelectItem value="51-200">51-200 nhân viên</SelectItem>
                      <SelectItem value="201-500">201-500 nhân viên</SelectItem>
                      <SelectItem value="500+">Trên 500 nhân viên</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700"
                  disabled={loading}
                >
                  {loading ? "Đang lưu..." : "Lưu thông tin"}
                </Button>
              </form>

              <div className="mt-4 text-center text-sm lg:hidden">
                Đã có thông tin công ty?{" "}
                <Link to="/nha-tuyen-dung" className="font-medium text-green-600 hover:underline">
                  Quản lý công ty
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}