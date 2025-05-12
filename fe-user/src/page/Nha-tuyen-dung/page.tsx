import { Header } from "@/components/Header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  Users,
  Search,
  CheckCircle,
  Building,
  Shield,
  DollarSign,
  Clock,
  ArrowRight,
  MessageSquare,
} from "lucide-react"

export default function EmployerHomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Tìm kiếm nhân tài cho doanh nghiệp của bạn
                </h1>
                <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Tiếp cận hàng triệu ứng viên tiềm năng và tối ưu hóa quy trình tuyển dụng của bạn với TopCV dành cho
                  nhà tuyển dụng.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="px-8 bg-white text-green-600 hover:bg-gray-100">
                    Đăng tin tuyển dụng <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-green-500">
                    Tìm hiểu thêm
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-md">
                  <div className="absolute -top-4 -left-4 h-full w-full rounded-lg border bg-white/10"></div>
                  <div className="absolute -bottom-4 -right-4 h-full w-full rounded-lg border bg-white/10"></div>
                  <div className="relative h-full w-full overflow-hidden rounded-lg border">
                    <img
                      src="/placeholder.svg?height=500&width=500"
                      alt="Nhà tuyển dụng"
                      className="w-full object-cover"
                      width={500}
                      height={500}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 md:py-16 lg:py-20 border-b">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-3xl font-bold">2.5M+</div>
                <p className="text-gray-500">Hồ sơ ứng viên</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                  <Building className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-3xl font-bold">50K+</div>
                <p className="text-gray-500">Doanh nghiệp</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-3xl font-bold">95%</div>
                <p className="text-gray-500">Tỷ lệ thành công</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                  <Search className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-3xl font-bold">10M+</div>
                <p className="text-gray-500">Lượt tìm kiếm/tháng</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-600">
                  Dành cho nhà tuyển dụng
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Tại sao chọn TopCV</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Nền tảng của chúng tôi cung cấp các công cụ tuyển dụng hiệu quả, tiết kiệm thời gian và chi phí.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              {[
                {
                  icon: <Search className="h-6 w-6 text-green-600" />,
                  title: "Tiếp cận ứng viên phù hợp",
                  description:
                    "Công nghệ AI của chúng tôi giúp bạn tìm kiếm ứng viên phù hợp dựa trên các kỹ năng, kinh nghiệm và yêu cầu công việc.",
                },
                {
                  icon: <Shield className="h-6 w-6 text-green-600" />,
                  title: "Thương hiệu nhà tuyển dụng",
                  description:
                    "Xây dựng và quảng bá thương hiệu nhà tuyển dụng của bạn thông qua hồ sơ công ty và tin tuyển dụng hấp dẫn.",
                },
                {
                  icon: <DollarSign className="h-6 w-6 text-green-600" />,
                  title: "Tiết kiệm chi phí",
                  description:
                    "Giảm đáng kể chi phí tuyển dụng với các gói dịch vụ linh hoạt, phù hợp với mọi quy mô doanh nghiệp.",
                },
                {
                  icon: <Clock className="h-6 w-6 text-green-600" />,
                  title: "Tuyển dụng nhanh chóng",
                  description:
                    "Rút ngắn thời gian tuyển dụng với quy trình hiệu quả từ đăng tin đến sàng lọc và phỏng vấn ứng viên.",
                },
                {
                  icon: <BarChart3 className="h-6 w-6 text-green-600" />,
                  title: "Báo cáo và phân tích",
                  description: "Theo dõi hiệu quả tuyển dụng với các báo cáo chi tiết và phân tích dữ liệu chuyên sâu.",
                },
                {
                  icon: <MessageSquare className="h-6 w-6 text-green-600" />,
                  title: "Hỗ trợ tận tâm",
                  description: "Đội ngũ tư vấn chuyên nghiệp sẵn sàng hỗ trợ bạn trong suốt quá trình tuyển dụng.",
                },
              ].map((feature, i) => (
                <div key={i} className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                  <div className="rounded-full bg-green-100 p-3">{feature.icon}</div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-center text-gray-500">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Cách thức hoạt động</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Chỉ với vài bước đơn giản để bắt đầu tuyển dụng hiệu quả
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Tạo tài khoản",
                  description: "Đăng ký tài khoản nhà tuyển dụng và hoàn thiện hồ sơ công ty của bạn.",
                },
                {
                  step: "02",
                  title: "Đăng tin tuyển dụng",
                  description: "Tạo và đăng tin tuyển dụng với mô tả chi tiết về vị trí công việc và yêu cầu.",
                },
                {
                  step: "03",
                  title: "Quản lý ứng viên",
                  description: "Nhận hồ sơ, sàng lọc ứng viên và quản lý quy trình tuyển dụng một cách hiệu quả.",
                },
              ].map((step, i) => (
                <div key={i} className="relative flex flex-col items-center p-6">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-green-600 px-4 py-1 text-lg font-bold text-white">
                    {step.step}
                  </div>
                  <div className="mt-8 rounded-lg border bg-white p-6 shadow-sm w-full h-full flex flex-col items-center">
                    <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                    <p className="text-center text-gray-500">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Button size="lg" className="px-8 bg-green-600 hover:bg-green-700">
                Bắt đầu ngay
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Khách hàng nói gì về chúng tôi</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Đối tác đáng tin cậy của hàng nghìn doanh nghiệp trên cả nước
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Nguyễn Văn A",
                  role: "Giám đốc Nhân sự, Công ty ABC",
                  quote:
                    "TopCV đã giúp chúng tôi tìm kiếm được những ứng viên tài năng, phù hợp với văn hóa công ty. Quy trình tuyển dụng trở nên hiệu quả và tiết kiệm thời gian hơn rất nhiều.",
                },
                {
                  name: "Trần Thị B",
                  role: "Trưởng phòng Tuyển dụng, Tập đoàn XYZ",
                  quote:
                    "Chất lượng ứng viên từ TopCV rất tốt. Chúng tôi đã tuyển dụng thành công nhiều vị trí khó trong thời gian ngắn nhờ công cụ tìm kiếm thông minh của nền tảng.",
                },
                {
                  name: "Lê Văn C",
                  role: "CEO, Startup MNP",
                  quote:
                    "Là một startup, chúng tôi cần tìm những người phù hợp với tầm nhìn của công ty. TopCV không chỉ giúp chúng tôi tìm kiếm nhân tài mà còn xây dựng thương hiệu nhà tuyển dụng mạnh mẽ.",
                },
              ].map((testimonial, i) => (
                <div key={i} className="flex flex-col items-start gap-4 rounded-lg border p-6 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <CheckCircle key={i} className="h-4 w-4 fill-current text-green-600" />
                        ))}
                    </div>
                  </div>
                  <p className="text-gray-500">{testimonial.quote}</p>
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-gray-100 p-1">
                      <div className="h-10 w-10 rounded-full bg-gray-300" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Bắt đầu tuyển dụng ngay hôm nay
                </h2>
                <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Tiếp cận hàng nghìn ứng viên tiềm năng và tối ưu hóa quy trình tuyển dụng của bạn với TopCV.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-end">
                <Button size="lg" variant="secondary" className="px-8">
                  Đăng tin tuyển dụng
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
