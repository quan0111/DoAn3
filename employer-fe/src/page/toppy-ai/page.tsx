import { Button } from "@/components/ui/button"

export default function ToppyAIPage() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-4">Sàng lọc hồ sơ tự động bằng Toppy AI</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <img
            src="/images/ai-screening.png"
            alt="AI Screening Process"
            width={500}
            height={400}
            className="w-full"
          />
        </div>

        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-800">
              Sàng lọc hồ sơ tự động, tiết kiệm thời gian sơ tuyển, gia tăng cơ hội tiếp cận ứng viên tiềm năng bằng
              cách <span className="font-semibold">gắn nhãn cho CV</span>. Bạn có thể tạo các nhãn tùy chỉnh theo như
              cầu hoặc để Toppy AI gợi ý cho bạn các tiêu chí phù hợp dựa trên tin tuyển dụng.
            </p>
            <p className="text-sm text-green-800 mt-2">
              Khi có CV ứng tuyển, Toppy AI sẽ giúp bạn{" "}
              <span className="font-semibold">
                đọc toàn bộ hồ sơ và tự động gắn nhãn cho những CV đáp ứng các tiêu chí đã cài đặt
              </span>
              . Tính năng hiện đang được thử nghiệm, đánh giá cho các{" "}
              <span className="font-semibold">khách hàng thân thiết</span> từ hàng Bạc trở lên hoặc chạy ít nhất 1 dịch
              vụ Top Job.
            </p>
            <Button variant="link" className="text-green-600 p-0 mt-2">
              Tìm hiểu thêm →
            </Button>
          </div>

          <Button className="w-full bg-green-500 hover:bg-green-600 text-white">Mua dịch vụ 🛒</Button>
        </div>
      </div>
    </div>
  )
}
