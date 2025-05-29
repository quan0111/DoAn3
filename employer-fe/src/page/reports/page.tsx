import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Báo cáo hoạt động tuyển dụng</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Báo cáo hiệu quả tuyển dụng</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Tính năng này dành cho khách hàng có dịch vụ mua đang chạy hoặc còn hạn kích hoạt.
              </p>
              <p className="text-gray-600 mb-4">
                Bạn có thể đăng ký trải nghiệm miễn phí tính năng Báo cáo hiệu quả tuyển dụng của SHiring - Quản trị
                tuyển dụng hiệu suất cao từ <span className="text-green-600 font-semibold">tại đây</span>. Để biết thêm
                chi tiết vui lòng liên hệ đội ngũ hỗ trợ của TopCV.
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Chuyên viên tư vấn của bạn:</h4>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
                      N
                    </div>
                    <span>Nguyễn Thị Bích Ngọc</span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>📞 0343 574 595</div>
                    <div>✉️ ngocntb@topcv.vn</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Bộ phận hỗ trợ dịch vụ:</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>📞 (024)71079799</div>
                    <div>📞 0862691929</div>
                    <div>✉️ cskh@topcv.vn</div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Tìm hiểu thêm:</p>
                  <Button variant="link" className="text-green-600 p-0">
                    Báo cáo tuyển dụng
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-center">
          <Image
            src="/images/reports-dashboard.png"
            alt="Reports Dashboard"
            width={500}
            height={400}
            className="w-full max-w-md"
          />
        </div>
      </div>
    </div>
  )
}
