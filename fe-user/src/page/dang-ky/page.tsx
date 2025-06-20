
import { Header } from "@/components/Header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Mail, LockKeyhole, User, Briefcase, Phone } from "lucide-react";
import { useState, type FormEvent, type ChangeEvent } from "react";
import type { CheckedState } from "@radix-ui/react-checkbox";
import { Calendar28 } from "@/components/calendar28";

interface FormData {
  full_name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  gender: "male" | "female";
  dob: string;
  role: "jobseeker" | "employer";
  terms: boolean;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    gender: "male",
    dob: "",
    role: "jobseeker",
    terms: false,
  });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRoleChange = (role: "jobseeker" | "employer") => {
    setFormData((prev) => ({ ...prev, role }));
  };

  const handleGenderChange = (gender: "male" | "female") => {
    setFormData((prev) => ({ ...prev, gender }));
  };

  const handleDateChange = (date: Date | undefined, formattedValue: string) => {
    if (date) {
      const today = new Date();
      if (today.getFullYear() - date.getFullYear() < 18) {
        setError("Bạn phải từ 18 tuổi trở lên");
        return;
      }
      if (date > today) {
        setError("Ngày sinh không được trong tương lai");
        return;
      }
    }
    setError("");
    setFormData((prev) => ({
      ...prev,
      dob: formattedValue,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Kiểm tra các trường bắt buộc
    if (!formData.full_name || !formData.email || !formData.password || !formData.phone || !formData.dob) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }

    // Kiểm tra mật khẩu khớp
    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu và xác nhận mật khẩu không khớp");
      return;
    }

    // Kiểm tra độ dài mật khẩu
    if (formData.password.length < 4) {
      setError("Mật khẩu phải có ít nhất 8 ký tự");
      return;
    }

    // Kiểm tra điều khoản
    if (!formData.terms) {
      setError("Vui lòng đồng ý với điều khoản và chính sách riêng tư");
      return;
    }

    // Chuẩn bị dữ liệu lưu vào localStorage
    const { confirmPassword, ...safeUserData } = formData;
    const userData = {
      ...safeUserData,
      avatar_url: null,
    };

    try {
      // Lưu vào localStorage
      localStorage.setItem("userData", JSON.stringify(userData));
      setSuccess("Đăng ký thành công! Đang chuyển hướng...");
      setTimeout(() => {
        if (formData.role === "employer") {
          navigate("/nha-tuyen-dung/dang-ky");
        } else {
          navigate("/Profile");
        }
      }, 2000);
    } catch (err) {
      setError("Đã có lỗi xảy ra khi lưu thông tin");
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
                alt="Register"
                className="h-full w-full object-cover opacity-50"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-white">
                <h2 className="mb-6 text-3xl font-bold">Bắt đầu hành trình nghề nghiệp của bạn!</h2>
                <p className="mb-8 text-center text-lg">
                  Tạo tài khoản miễn phí để tiếp cận hàng nghìn cơ hội việc làm và công cụ xây dựng CV chuyên nghiệp.
                </p>
                <div className="mb-8 space-y-4">
                  {[
                    "Tạo CV chuyên nghiệp dễ dàng",
                    "Ứng tuyển nhanh chóng vào nhiều vị trí",
                    "Quản lý hồ sơ nghề nghiệp tập trung",
                    "Nhận thông báo về cơ hội phù hợp",
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-white"></div>
                      <p>{feature}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="mb-4 text-center">Bạn đã có tài khoản?</p>
                  <Button variant="secondary" asChild>
                    <Link to="/Login">Đăng nhập</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Register Form */}
            <div className="mx-auto flex max-w-md flex-col justify-center space-y-6 p-4 md:p-8">
              <div className="text-center lg:text-left">
                <h1 className="text-3xl font-bold">Đăng ký tài khoản</h1>
                <p className="mt-2 text-gray-500">Tạo tài khoản miễn phí để bắt đầu hành trình nghề nghiệp</p>
              </div>

              {error && <p className="text-red-500 text-center">{error}</p>}
              {success && <p className="text-green-500 text-center">{success}</p>}

              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="full_name" className="text-sm font-medium">
                    Họ và tên
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="full_name"
                      placeholder="Nguyễn Văn A"
                      className="pl-10"
                      value={formData.full_name}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      placeholder="name@example.com"
                      type="email"
                      className="pl-10"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Mật khẩu
                  </Label>
                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      className="pl-10"
                      autoComplete="new-password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">
                    Xác nhận mật khẩu
                  </Label>
                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      className="pl-10"
                      autoComplete="new-password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Số điện thoại
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="phone"
                      placeholder="0901122334"
                      type="tel"
                      className="pl-10"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label className="text-sm font-medium">Giới tính</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant={formData.gender === "male" ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => handleGenderChange("male")}
                    >
                      <User className="mr-2 h-5 w-5" />
                      Nam
                    </Button>
                    <Button
                      variant={formData.gender === "female" ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => handleGenderChange("female")}
                    >
                      <User className="mr-2 h-5 w-5" />
                      Nữ
                    </Button>
                  </div>
                </div>

                <Calendar28
                  label="Ngày sinh"
                  value={formData.dob}
                  onChange={handleDateChange}
                  error={error}
                />

                <div className="grid gap-2">
                  <Label className="text-sm font-medium">Bạn là</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant={formData.role === "jobseeker" ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => handleRoleChange("jobseeker")}
                    >
                      <User className="mr-2 h-5 w-5" />
                      Người tìm việc
                    </Button>
                    <Button
                      variant={formData.role === "employer" ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => handleRoleChange("employer")}
                    >
                      <Briefcase className="mr-2 h-5 w-5" />
                      Nhà tuyển dụng
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.terms}
                    onCheckedChange={(checked: CheckedState) => setFormData((prev) => ({ ...prev, terms: !!checked }))}
                  />
                  <Label htmlFor="terms" className="text-sm text-gray-500">
                    Tôi đồng ý với{" "}
                    <Link to="#" className="text-green-600 hover:underline">
                      điều khoản
                    </Link>{" "}
                    và{" "}
                    <Link to="#" className="text-green-600 hover:underline">
                      chính sách riêng tư
                    </Link>
                  </Label>
                </div>

                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Đăng ký <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-gray-500">Hoặc đăng ký với</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>
                <Button variant="outline">
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                  Facebook
                </Button>
              </div>

              <div className="mt-4 text-center text-sm lg:hidden">
                Bạn đã có tài khoản?{" "}
                <Link to="/Login" className="font-medium text-green-600 hover:underline">
                  Đăng nhập
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
