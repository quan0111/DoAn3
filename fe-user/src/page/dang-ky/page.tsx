import { Header } from "@/components/Header";
import { useState } from "react";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, LockKeyhole, User, Briefcase } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  // Sửa ở đây: đổi null -> undefined
  const [dob, setDob] = useState<Date | undefined>(undefined);
  const [role, setRole] = useState<"jobseeker" | "employer">("jobseeker");
  const [agreeTerms, setAgreeTerms] = useState(false);

const DatePicker = () => {
  // Lấy giá trị dạng yyyy-MM-dd để set cho input type="date"x
  const dobValue = dob ? dob.toISOString().substring(0, 10) : "";

  return (
    <input
      type="date"
      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
      value={dobValue}
      onChange={(e) => {
        const dateStr = e.target.value;
        setDob(dateStr ? new Date(dateStr) : undefined);
      }}
      max={new Date().toISOString().substring(0, 10)} // không chọn ngày trong tương lai
    />
  );
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
                <h2 className="mb-6 text-3xl font-bold">
                  Bắt đầu hành trình nghề nghiệp của bạn!
                </h2>
                <p className="mb-8 text-center text-lg">
                  Tạo tài khoản miễn phí để tiếp cận hàng nghìn cơ hội việc làm
                  và công cụ xây dựng CV chuyên nghiệp.
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
                    <Link to="/dang-nhap">Đăng nhập</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Register Form */}
            <div className="mx-auto flex max-w-md flex-col justify-center space-y-6 p-4 md:p-8">
              <div className="text-center lg:text-left">
                <h1 className="text-3xl font-bold">Đăng ký tài khoản</h1>
                <p className="mt-2 text-gray-500">
                  Tạo tài khoản miễn phí để bắt đầu hành trình nghề nghiệp
                </p>
              </div>

              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label
                      htmlFor="firstName"
                      className="text-sm font-medium text-left"
                    >
                      Họ
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="firstName"
                        placeholder="Nguyễn"
                        className="pl-10"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="lastName"
                      className="text-sm font-medium text-left"
                    >
                      Tên
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="lastName"
                        placeholder="Văn A"
                        className="pl-10"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-left"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      placeholder="name@example.com"
                      type="email"
                      className="pl-10"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-left"
                  >
                    Số điện thoại
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="phone"
                      placeholder="0123 456 789"
                      type="tel"
                      className="pl-10"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <label
                    htmlFor="gender"
                    className="text-sm font-medium text-left"
                  >
                    Giới tính
                  </label>
                  <select
                    id="gender"
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="other">Khác</option>
                  </select>
                </div>

                <div className="relative">
                  <div className="grid gap-2">
                    <label
                      htmlFor="dob"
                      className="text-sm font-medium text-left"
                    >
                      Ngày sinh
                    </label>
                    <DatePicker />
                  </div>
                </div>

                <div className="grid gap-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-left"
                  >
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      className="pl-10"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-left"
                  >
                    Xác nhận mật khẩu
                  </label>
                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      className="pl-10"
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium">Bạn là</label>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant={role === "jobseeker" ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => setRole("jobseeker")}
                    >
                      <User className="mr-2 h-5 w-5" />
                      Người tìm việc
                    </Button>
                    <Button
                      variant={role === "employer" ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => setRole("employer")}
                    >
                      <Briefcase className="mr-2 h-5 w-5" />
                      Nhà tuyển dụng
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreeTerms}
                    onCheckedChange={(value) => setAgreeTerms(!!value)}
                  />

                  <label htmlFor="terms" className="text-sm text-gray-500">
                    Tôi đồng ý với{" "}
                    <Link to="/" className="text-green-600 hover:underline">
                      điều khoản
                    </Link>{" "}
                    và{" "}
                    <Link to="/" className="text-green-600 hover:underline">
                      chính sách riêng tư
                    </Link>
                  </label>
                </div>

                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    if (!agreeTerms)
                      return alert("Bạn cần đồng ý với điều khoản.");
                    if (password !== confirmPassword)
                      return alert("Mật khẩu không khớp.");
                    // Gửi dữ liệu
                    const userData = {
                      firstName,
                      lastName,
                      email,
                      password,
                      phone,
                      gender,
                      dob,
                      role,
                    };
                    console.log("Dữ liệu đăng ký:", userData);
                    // TODO: Gọi API đăng ký tại đây
                  }}
                >
                  Đăng ký <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-gray-500">
                    Hoặc đăng ký với
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="/4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="/34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="/FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="/EA4335"
                    />
                  </svg>
                  Google
                </Button>
                <Button variant="outline">
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                  Facebook
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
