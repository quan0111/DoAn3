import { Header } from "@/components/Header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Mail, LockKeyhole, Building, User, Phone, MapPin } from "lucide-react"
import { Link } from "react-router-dom"

export default function EmployerRegisterPage() {
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
                alt="Employer Register"
                className="h-full w-full object-cover opacity-50"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-white">
                <h2 className="mb-6 text-3xl font-bold">Bắt đầu tuyển dụng hiệu quả!</h2>
                <p className="mb-8 text-center text-lg">
                  Tạo tài khoản nhà tuyển dụng để tiếp cận hàng triệu ứng viên chất lượng và tối ưu hóa quy trình tuyển
                  dụng của bạn.
                </p>
                <div className="mb-8 space-y-4">
                  {[
                    "Tiếp cận hàng triệu ứng viên tiềm năng",
                    "Đăng tin tuyển dụng không giới hạn",
                    "Quản lý ứng viên hiệu quả",
                    "Xây dựng thương hiệu tuyển dụng",
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
                    <Link to="/nha-tuyen-dung/dang-nhap">Đăng nhập</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Register Form */}
            <div className="mx-auto flex max-w-md flex-col justify-center space-y-6 p-4 md:p-8">
              <div className="text-center lg:text-left">
                <h1 className="text-3xl font-bold">Đăng ký tài khoản nhà tuyển dụng</h1>
                <p className="mt-2 text-gray-500">Tạo tài khoản để bắt đầu tuyển dụng ngay hôm nay</p>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="companyName" className="text-sm font-medium">
                    Tên công ty
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input id="companyName" placeholder="Công ty ABC" className="pl-10" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="contactName" className="text-sm font-medium">
                      Tên người liên hệ
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input id="contactName" placeholder="Nguyễn Văn A" className="pl-10" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="position" className="text-sm font-medium">
                      Chức vụ
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input id="position" placeholder="Giám đốc nhân sự" className="pl-10" />
                    </div>
                  </div>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      placeholder="company@example.com"
                      type="email"
                      className="pl-10"
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Số điện thoại
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input id="phone" placeholder="0901234567" className="pl-10" />
                  </div>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input id="password" type="password" className="pl-10" autoComplete="new-password" />
                  </div>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium">
                    Xác nhận mật khẩu
                  </label>
                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input id="confirmPassword" type="password" className="pl-10" autoComplete="new-password" />
                  </div>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="location" className="text-sm font-medium">
                    Địa điểm
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Select>
                      <SelectTrigger className="pl-10">
                        <SelectValue placeholder="Chọn thành phố" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hanoi">Hà Nội</SelectItem>
                        <SelectItem value="hcm">TP. Hồ Chí Minh</SelectItem>
                        <SelectItem value="danang">Đà Nẵng</SelectItem>
                        <SelectItem value="other">Khác</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="industry" className="text-sm font-medium">
                    Ngành nghề
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn ngành nghề" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="it">Công nghệ thông tin</SelectItem>
                      <SelectItem value="finance">Tài chính - Ngân hàng</SelectItem>
                      <SelectItem value="marketing">Marketing - Truyền thông</SelectItem>
                      <SelectItem value="education">Giáo dục - Đào tạo</SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="companySize" className="text-sm font-medium">
                    Quy mô công ty
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn quy mô" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 nhân viên</SelectItem>
                      <SelectItem value="11-50">11-50 nhân viên</SelectItem>
                      <SelectItem value="51-200">51-200 nhân viên</SelectItem>
                      <SelectItem value="201-500">201-500 nhân viên</SelectItem>
                      <SelectItem value="501+">Trên 500 nhân viên</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <label htmlFor="terms" className="text-sm text-gray-500">
                    Tôi đồng ý với{" "}
                    <Link to="#" className="text-green-600 hover:underline">
                      điều khoản
                    </Link>{" "}
                    và{" "}
                    <Link to="#" className="text-green-600 hover:underline">
                      chính sách riêng tư
                    </Link>
                  </label>
                </div>

                <Button className="bg-green-600 hover:bg-green-700">
                  Đăng ký <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="mt-4 text-center text-sm lg:hidden">
                Bạn đã có tài khoản?{" "}
                <Link to="/nha-tuyen-dung/dang-nhap" className="font-medium text-green-600 hover:underline">
                  Đăng nhập
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
