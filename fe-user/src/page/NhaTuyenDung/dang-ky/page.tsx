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

  const [formData, setFormData] = useState({
    company_name: "",
    description: "",
    logo_url: "",
    website: "",
    location: "",
    company_size: "",
    industries: [] as string[],
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isIndustryOpen, setIsIndustryOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const industryOptions = [
    "Công nghệ thông tin",
    "Tài chính - Ngân hàng",
    "Marketing - Truyền thông",
    "Giáo dục - Đào tạo",
    "Khác",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Logo không được vượt quá 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      const fakeUploadedUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, logo_url: fakeUploadedUrl }));
    }
  };

  const handleIndustryChange = (industry: string) => {
    setFormData((prev) => {
      const industries = prev.industries.includes(industry)
        ? prev.industries.filter((item) => item !== industry)
        : [...prev.industries, industry];
      return { ...prev, industries };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Lấy dữ liệu user từ localStorage
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      if (!userData.email || !userData.password || !userData.full_name) {
        toast.error("Thiếu thông tin người dùng (email, mật khẩu, hoặc họ tên). Vui lòng đăng ký lại.");
        setLoading(false);
        navigate("/dang-ky");
        return;
      }

      // Kiểm tra dữ liệu công ty bắt buộc
      if (!formData.company_name || !formData.location || !formData.company_size || formData.industries.length === 0) {
        toast.error("Vui lòng điền đầy đủ thông tin bắt buộc của công ty");
        setLoading(false);
        return;
      }

      // Gọi API tạo user
      const userPayload = {
        full_name: userData.full_name,
        email: userData.email,
        password: userData.password,
        phone: userData.phone || "",
        gender: userData.gender || "male",
        dob: userData.dob || "",
        role: userData.role || "employer",
        avatar_url: userData.avatar_url || null,
      };
      console.log("User Payload:", userPayload);

      const userResponse = await axios.post("http://localhost:3000/userss", userPayload);
      if (userResponse.status !== 201 || !userResponse.data.user_id) {
        throw new Error("Tạo user thất bại hoặc không nhận được user_id");
      }

      const userId = userResponse.data.user_id;
      console.log("User created successfully, user_id:", userId);

      // Gọi API tạo công ty
      const companyPayload = {
        company_name: formData.company_name,
        description: formData.description,
        logo_url: formData.logo_url || "", // Fallback nếu logo_url rỗng
        website: formData.website,
        location: formData.location,
        company_size: formData.company_size,
        industry: formData.industries.join(", "),
        user_id: userId,
        verified: false,
      };
      console.log("Company Payload:", companyPayload);

      const companyResponse = await axios.post("http://localhost:3000/companiess", companyPayload);
      if (companyResponse.status !== 201) {
        throw new Error("Tạo công ty thất bại");
      }

      toast.success("Tạo user và công ty thành công!");
      localStorage.removeItem("userData");
      setTimeout(() => {
        navigate("/nha-tuyen-dung");
      }, 2000);
    } catch (error: any) {
      console.error("Lỗi khi lưu thông tin:", error);
      const errorMessage = error.response?.data?.message || "Đã có lỗi xảy ra. Vui lòng thử lại.";
      toast.error(errorMessage);
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

            <div className="mx-auto flex max-w-md flex-col justify-center space-y-6 p-4 md:p-8">
              <div className="text-center lg:text-left">
                <h1 className="text-3xl font-bold">Nhập thông tin công ty</h1>
                <p className="mt-2 text-gray-500">Cung cấp thông tin để bắt đầu quản lý công ty của bạn</p>
              </div>

              <form onSubmit={handleSubmit} className="grid gap-4">
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