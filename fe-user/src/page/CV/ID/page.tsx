import { Header } from "@/components/Header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ChevronRight, Eye, Star, CheckCircle, Share2, Bookmark, ArrowRight } from "lucide-react"
import { Link, useParams } from "react-router-dom"

export default function CVTemplateDetailPage() {
    const { id } = useParams<{ id: string }>()
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-gray-50">
          <div className="container py-3">
            <div className="flex items-center gap-1 text-sm">
              <Link to="/" className="text-gray-500 hover:text-green-600">
                Trang chủ
              </Link>
              <ChevronRight className="h-3 w-3 text-gray-400" />
              <Link to="/mau-cv" className="text-gray-500 hover:text-green-600">
                Mẫu CV
              </Link>
              <ChevronRight className="h-3 w-3 text-gray-400" />
              <span className="font-medium">CV Chuyên Nghiệp {id}</span>
            </div>
          </div>
        </div>

        {/* Template Detail */}
        <section className="py-12">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* CV Preview */}
              <div className="relative">
                <div className="sticky top-24">
                  <div className="overflow-hidden rounded-lg border shadow-lg">
                    <img
                      src={`/placeholder.svg?height=800&width=600&text=Mẫu CV ${id}`}
                      alt={`Mẫu CV ${id}`}
                      className="h-auto w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Template Info */}
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      Number(id) % 2 === 0 ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {Number(id) % 2 === 0 ? "Miễn phí" : "Cao cấp"}
                  </span>
                  <div className="flex items-center gap-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                    <span className="ml-1 text-xs text-gray-500">(245 đánh giá)</span>
                  </div>
                </div>

                <h1 className="mb-4 text-3xl font-bold">CV Chuyên Nghiệp {id}</h1>
                <p className="mb-6 text-gray-600">
                  Mẫu CV chuyên nghiệp, hiện đại với thiết kế tinh tế và cấu trúc rõ ràng. Phù hợp với các ứng viên
                  trong lĩnh vực{" "}
                  {Number(id) % 3 === 0
                    ? "tiếp thị và truyền thông"
                    : Number(id) % 2 === 0
                      ? "công nghệ thông tin"
                      : "tài chính kế toán"}
                  .
                </p>

                <div className="mb-8 flex flex-wrap gap-4">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    Sử Dụng Mẫu Này <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                    <Eye className="mr-2 h-4 w-4" /> Xem Trước
                  </Button>
                  <Button size="lg" variant="ghost">
                    <Bookmark className="mr-2 h-4 w-4" /> Lưu
                  </Button>
                  <Button size="lg" variant="ghost">
                    <Share2 className="mr-2 h-4 w-4" /> Chia Sẻ
                  </Button>
                </div>

                <div className="mb-8 rounded-lg border bg-gray-50 p-6">
                  <h2 className="mb-4 text-xl font-semibold">Đặc điểm mẫu CV</h2>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {[
                      "Thiết kế hiện đại, chuyên nghiệp",
                      "Định dạng ATS-friendly",
                      "Dễ dàng tùy chỉnh",
                      "Hỗ trợ nhiều định dạng xuất",
                      "Bố cục rõ ràng, dễ đọc",
                      "Tương thích với tất cả ngành nghề",
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="mb-4 text-xl font-semibold">Mô tả</h2>
                  <div className="space-y-3 text-gray-600">
                    <p>
                      CV Chuyên Nghiệp {id} là lựa chọn hoàn hảo cho những ứng viên muốn tạo ấn tượng mạnh mẽ với
                      nhà tuyển dụng. Thiết kế hiện đại kết hợp với cấu trúc rõ ràng giúp thông tin của bạn được trình
                      bày một cách chuyên nghiệp và dễ tiếp cận.
                    </p>
                    <p>
                      Mẫu CV này được tối ưu hóa để vượt qua các hệ thống lọc CV tự động (ATS), đảm bảo hồ sơ của bạn
                      được đến tay nhà tuyển dụng. Với nhiều phần được thiết kế tinh tế, bạn có thể dễ dàng trình bày
                      kinh nghiệm, kỹ năng và học vấn của mình một cách hiệu quả.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="mb-4 text-xl font-semibold">Mẫu CV liên quan</h2>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {[1, 2, 3].map((id) => (
                      <Link to={`/mau-cv/${Number(id) + id}`} key={id} className="group block">
                        <div className="overflow-hidden rounded-lg border shadow">
                          <img
                            src={`/placeholder.svg?height=300&width=200&text=Mẫu ${Number(id) + id}`}
                            alt={`Mẫu CV ${Number(id) + id}`}
                            className="h-32 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="p-2 text-center">
                            <span className="text-xs font-medium">Mẫu CV {Number(id) + id}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-green-600 py-12 text-white">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold">Bắt đầu tạo CV chuyên nghiệp của bạn ngay hôm nay</h2>
              <p className="mb-6">Chỉ cần vài phút để tạo CV ấn tượng với mẫu thiết kế đã được chứng minh hiệu quả</p>
              <Button size="lg" variant="secondary" className="px-8">
                Bắt Đầu Ngay
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
