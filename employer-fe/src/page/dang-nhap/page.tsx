
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, Mail, LockKeyhole, Building } from "lucide-react"
import { Link } from "react-router-dom"

export default function EmployerLoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container mx-auto my-12 max-w-screen-xl px-4 md:px-8">
          <div className="mx-auto grid max-w-screen-xl gap-8 lg:grid-cols-2">
            {/* Image Section */}
            <div className="relative hidden overflow-hidden rounded-lg bg-green-600 lg:block">
              <div className="absolute inset-0 bg-green-600 bg-opacity-90"></div>
              <img
                src="/placeholder.svg?height=1000&width=800"
                alt="Employer Login"
                className="h-full w-full object-cover opacity-50"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-white">
                <h2 className="mb-6 text-3xl font-bold">Chào mừng nhà tuyển dụng!</h2>
                <p className="mb-8 text-center text-lg">
                  Đăng nhập để tiếp cận hàng nghìn ứng viên tiềm năng và quản lý hoạt động tuyển dụng của bạn.
                </p>
                <div className="mb-8 space-y-4">
                  {[
                    "Đăng tin tuyển dụng và quản lý ứng viên",
                    "Tìm kiếm và liên hệ với ứng viên phù hợp",
                    "Xây dựng thương hiệu nhà tuyển dụng",
                    "Theo dõi hiệu quả tuyển dụng với báo cáo chi tiết",
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-white"></div>
                      <p>{feature}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="mb-4 text-center">Bạn chưa có tài khoản?</p>
                  <Button variant="secondary" asChild>
                    <Link to="/nha-tuyen-dung/dang-ky">Tạo tài khoản nhà tuyển dụng</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Login Form */}
            <div className="mx-auto flex max-w-md flex-col justify-center space-y-6 p-4 md:p-8">
              <div className="text-center lg:text-left">
                <h1 className="text-3xl font-bold">Đăng nhập cho nhà tuyển dụng</h1>
                <p className="mt-2 text-gray-500">Nhập thông tin của bạn để đăng nhập vào tài khoản nhà tuyển dụng</p>
              </div>

              <div className="grid gap-4">
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
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-medium">
                      Mật khẩu
                    </label>
                    <Link to="#" className="text-sm text-green-600 hover:underline">
                      Quên mật khẩu?
                    </Link>
                  </div>
                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input id="password" type="password" className="pl-10" autoComplete="current-password" />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <label htmlFor="remember" className="text-sm text-gray-500">
                    Ghi nhớ đăng nhập
                  </label>
                </div>

                <Button className="bg-green-600 hover:bg-green-700">
                  Đăng nhập <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-gray-500">Hoặc tiếp tục với</span>
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
                  <Building className="mr-2 h-4 w-4" />
                  LinkedIn
                </Button>
              </div>

              <div className="mt-4 text-center text-sm lg:hidden">
                Bạn chưa có tài khoản?{" "}
                <Link to="/nha-tuyen-dung/dang-ky" className="font-medium text-green-600 hover:underline">
                  Đăng ký ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
