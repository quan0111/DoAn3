import { FileText, Search, Users } from "lucide-react"

export function Features() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-600">
              Tại Sao Chọn TopCV
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Tính năng nổi bật của chúng tôi</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Nền tảng của chúng tôi cung cấp mọi thứ bạn cần để tạo CV chuyên nghiệp mang lại kết quả.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-green-100 p-3">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold">Mẫu CV Chuyên Nghiệp</h3>
            <p className="text-center text-gray-500">
              Lựa chọn từ hàng chục mẫu CV được thiết kế chuyên nghiệp thu hút sự chú ý của nhà tuyển dụng.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-green-100 p-3">
              <Search className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold">Tối Ưu Hóa ATS</h3>
            <p className="text-center text-gray-500">
              CV của chúng tôi được thiết kế để dễ dàng vượt qua các Hệ thống Theo dõi Ứng viên.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-green-100 p-3">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold">Đánh Giá Chuyên Gia</h3>
            <p className="text-center text-gray-500">
              Nhận phản hồi từ đội ngũ chuyên gia HR để cải thiện hiệu quả CV của bạn.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
