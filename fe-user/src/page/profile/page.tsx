import { Header } from "@/components/Header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User, Upload, X, Check, ChevronsUpDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";

export default function JobseekerInfoPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    career_goals: "",
    desired_position: "",
    experience_years: "",
    desired_salary_min: "",
    desired_salary_max: "",
    job_preferences: [] as string[],
    linkedin_url: "",
    portfolio_url: "",
    cv_url: "",
  });

  const [cvPreview, setCvPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const preferenceOptions = [
    "Full-time",
    "Part-time",
    "Remote",
    "Hybrid",
    "Node.js",
    "Python",
    "Java",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePreferenceChange = (preference: string) => {
    setFormData((prev) => {
      const job_preferences = prev.job_preferences.includes(preference)
        ? prev.job_preferences.filter((item) => item !== preference)
        : [...prev.job_preferences, preference];
      return { ...prev, job_preferences };
    });
  };

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("CV không được vượt quá 5MB");
        return;
      }
      if (!file.type.includes("pdf")) {
        toast.error("Vui lòng chọn file PDF");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setCvPreview(file.name);
      };
      reader.readAsDataURL(file);

      const fakeUploadedUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, cv_url: fakeUploadedUrl }));
    }
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

      // Kiểm tra dữ liệu jobseeker bắt buộc
      if (
        !formData.career_goals ||
        !formData.desired_position ||
        !formData.experience_years ||
        formData.job_preferences.length === 0
      ) {
        toast.error("Vui lòng điền đầy đủ thông tin bắt buộc (mục tiêu nghề nghiệp, vị trí mong muốn, năm kinh nghiệm, sở thích công việc)");
        setLoading(false);
        return;
      }

      // Validate số năm kinh nghiệm và lương
      const experienceYears = parseFloat(formData.experience_years);
      const salaryMin = parseFloat(formData.desired_salary_min);
      const salaryMax = parseFloat(formData.desired_salary_max);
      if (isNaN(experienceYears) || experienceYears < 0) {
        toast.error("Số năm kinh nghiệm không hợp lệ");
        setLoading(false);
        return;
      }
      if (isNaN(salaryMin) || isNaN(salaryMax) || salaryMin < 0 || salaryMax < salaryMin) {
        toast.error("Mức lương mong muốn không hợp lệ");
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
        role: userData.role || "jobseeker",
        avatar_url: userData.avatar_url || null,
      };
      console.log("User Payload:", userPayload);

      const userResponse = await axios.post("http://localhost:3000/users", userPayload);
      if (userResponse.status !== 201 || !userResponse.data.user_id) {
        throw new Error("Tạo user thất bại hoặc không nhận được user_id");
      }

      const userId = userResponse.data.user_id;
      console.log("User created successfully, user_id:", userId);

      // Gọi API tạo jobseeker
      const jobseekerPayload = {
        career_goals: formData.career_goals,
        desired_position: formData.desired_position,
        experience_years: experienceYears,
        desired_salary_min: salaryMin,
        desired_salary_max: salaryMax,
        job_preferences: formData.job_preferences.join(", "),
        linkedin_url: formData.linkedin_url || "",
        portfolio_url: formData.portfolio_url || "",
        cv_url: formData.cv_url || "",
        user_id: userId,
      };
      console.log("Jobseeker Payload:", jobseekerPayload);

      const jobseekerResponse = await axios.post("http://localhost:3000/jobseekers", jobseekerPayload);
      if (jobseekerResponse.status !== 201) {
        throw new Error("Tạo thông tin jobseeker thất bại");
      }

      toast.success("Tạo user và thông tin jobseeker thành công!");
      localStorage.removeItem("userData");
      setTimeout(() => {
        navigate("/Profile");
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
                alt="Jobseeker Info"
                className="h-full w-full object-cover opacity-50"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-white">
                <h2 className="mb-6 text-3xl font-bold">Hoàn thiện hồ sơ cá nhân của bạn!</h2>
                <p className="mb-8 text-center text-lg">
                  Cung cấp thông tin chi tiết để tăng cơ hội tìm việc và thu hút nhà tuyển dụng.
                </p>
                <div className="mb-8 space-y-4">
                  {[
                    "Tạo hồ sơ chuyên nghiệp",
                    "Kết nối với nhà tuyển dụng",
                    "Tìm việc phù hợp nhanh chóng",
                    "Quản lý thông tin cá nhân dễ dàng",
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-white"></div>
                      <p>{feature}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="mb-4 text-center">Đã có hồ sơ?</p>
                  <Button variant="secondary" asChild>
                    <Link to="/Profile">Quản lý hồ sơ</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="mx-auto flex max-w-md flex-col justify-center space-y-6 p-4 md:p-8">
              <div className="text-center lg:text-left">
                <h1 className="text-3xl font-bold">Nhập thông tin cá nhân</h1>
                <p className="mt-2 text-gray-500">Cung cấp thông tin để bắt đầu hành trình tìm việc</p>
              </div>

              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="cv_url" className="text-sm font-medium text-left">
                    CV (PDF)
                  </label>
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="relative h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {cvPreview ? (
                        <div className="text-center text-sm text-gray-600">{cvPreview}</div>
                      ) : (
                        <Upload className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <Input
                      type="file"
                      id="cv_url"
                      name="cv_url"
                      accept="application/pdf"
                      className="hidden"
                      onChange={handleCvChange}
                      ref={fileInputRef}
                    />
                    <p className="text-sm text-gray-500">Nhấn để chọn CV (PDF, tối đa 5MB)</p>
                  </div>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="career_goals" className="text-sm font-medium text-left">
                    Mục tiêu nghề nghiệp
                  </label>
                  <Textarea
                    id="career_goals"
                    name="career_goals"
                    placeholder="Trở thành lập trình viên backend chuyên sâu..."
                    value={formData.career_goals}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="desired_position" className="text-sm font-medium text-left">
                    Vị trí mong muốn
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="desired_position"
                      name="desired_position"
                      placeholder="Backend Developer"
                      className="pl-10"
                      value={formData.desired_position}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="experience_years" className="text-sm font-medium text-left">
                    Số năm kinh nghiệm
                  </label>
                  <Input
                    id="experience_years"
                    name="experience_years"
                    type="number"
                    placeholder="3"
                    value={formData.experience_years}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="desired_salary_min" className="text-sm font-medium text-left">
                    Mức lương mong muốn (Tối thiểu, USD/tháng)
                  </label>
                  <Input
                    id="desired_salary_min"
                    name="desired_salary_min"
                    type="number"
                    placeholder="1200"
                    value={formData.desired_salary_min}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="desired_salary_max" className="text-sm font-medium text-left">
                    Mức lương mong muốn (Tối đa, USD/tháng)
                  </label>
                  <Input
                    id="desired_salary_max"
                    name="desired_salary_max"
                    type="number"
                    placeholder="2000"
                    value={formData.desired_salary_max}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium text-left">Sở thích công việc</label>
                  <Popover open={isPreferencesOpen} onOpenChange={setIsPreferencesOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={isPreferencesOpen}
                        className="w-full justify-between"
                      >
                        {formData.job_preferences.length > 0
                          ? formData.job_preferences.join(", ")
                          : "Chọn sở thích"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandList>
                          <CommandGroup>
                            {preferenceOptions.map((preference) => (
                              <CommandItem
                                key={preference}
                                value={preference}
                                onSelect={() => {
                                  handlePreferenceChange(preference);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    formData.job_preferences.includes(preference)
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {preference}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {formData.job_preferences.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.job_preferences.map((preference) => (
                        <div
                          key={preference}
                          className="flex items-center gap-1 bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full"
                        >
                          <span>{preference}</span>
                          <button
                            type="button"
                            onClick={() => handlePreferenceChange(preference)}
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
                  <label htmlFor="linkedin_url" className="text-sm font-medium text-left">
                    LinkedIn URL
                  </label>
                  <Input
                    id="linkedin_url"
                    name="linkedin_url"
                    placeholder="https://www.linkedin.com/in/username"
                    value={formData.linkedin_url}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="portfolio_url" className="text-sm font-medium text-left">
                    Portfolio URL
                  </label>
                  <Input
                    id="portfolio_url"
                    name="portfolio_url"
                    placeholder="https://yourportfolio.com"
                    value={formData.portfolio_url}
                    onChange={handleChange}
                  />
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
                Đã có hồ sơ?{" "}
                <Link to="/Profile" className="font-medium text-green-600 hover:underline">
                  Quản lý hồ sơ
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