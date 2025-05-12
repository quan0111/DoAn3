import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export function Pricing() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Bảng Giá</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Chọn gói phù hợp nhất với nhu cầu nghề nghiệp của bạn.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
          {[
            {
              name: "Cơ Bản",
              price: "Miễn Phí",
              description: "Hoàn hảo để bắt đầu",
              features: ["Truy cập mẫu cơ bản", "Công cụ tạo CV", "Tải xuống dạng PDF", "Tùy chỉnh hạn chế"],
            },
            {
              name: "Cao Cấp",
              price: "499.000đ",
              description: "Lựa chọn phổ biến nhất",
              features: [
                "Tất cả tính năng cơ bản",
                "Tất cả mẫu cao cấp",
                "Tùy chỉnh nâng cao",
                "Công cụ tạo thư xin việc",
                "Nhiều định dạng tải xuống",
              ],
            },
            {
              name: "Chuyên Nghiệp",
              price: "999.000đ",
              description: "Dành cho người tìm việc nghiêm túc",
              features: [
                "Tất cả tính năng cao cấp",
                "Đánh giá CV chuyên gia",
                "Tối ưu hóa hồ sơ LinkedIn",
                "Hỗ trợ ưu tiên",
                "Tải xuống không giới hạn",
              ],
            },
          ].map((plan, i) => (
            <div
              key={i}
              className={`flex flex-col rounded-lg border ${i === 1 ? "border-green-600 shadow-lg" : ""} p-6`}
            >
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="text-3xl font-bold">{plan.price}</div>
                <p className="text-sm text-gray-500">{plan.description}</p>
              </div>
              <ul className="mt-6 space-y-2 flex-1">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button
                  className={`w-full ${
                    i !== 1
                      ? "bg-white text-green-600 hover:bg-gray-100 border border-green-600"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {i === 0 ? "Bắt Đầu Miễn Phí" : "Bắt Đầu Ngay"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
