import { Star } from "lucide-react"

export function Testimonials() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Người Dùng Nói Gì</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Tham gia cùng hàng nghìn người tìm việc đã thành công với TopCV.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Nguyễn Thị Hương",
              role: "Quản lý Marketing",
              quote:
                "Tôi đã tìm được công việc mơ ước trong vòng 2 tuần sau khi sử dụng TopCV. Các mẫu CV rất chuyên nghiệp và công cụ tạo CV rất dễ sử dụng!",
            },
            {
              name: "Trần Văn Minh",
              role: "Kỹ sư Phần mềm",
              quote:
                "Tính năng tối ưu hóa ATS thực sự giúp CV của tôi nổi bật. Tôi nhận được nhiều cuộc gọi phỏng vấn hơn bao giờ hết.",
            },
            {
              name: "Lê Thị Thanh",
              role: "Chuyên viên Phân tích Tài chính",
              quote:
                "Dịch vụ đánh giá chuyên gia cung cấp những hiểu biết quý giá đã hoàn toàn thay đổi CV của tôi. Đáng giá từng đồng!",
            },
          ].map((testimonial, i) => (
            <div key={i} className="flex flex-col items-start gap-4 rounded-lg border p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
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
  )
}
