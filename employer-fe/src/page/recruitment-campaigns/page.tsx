import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function RecruitmentCampaignsPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <img
            src="/images/recruitment-campaign.png"
            alt="Recruitment Campaign"
            width={500}
            height={400}
            className="w-full"
          />
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tạo chiến dịch tuyển dụng của bạn</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tên chiến dịch tuyển dụng *</label>
                  <Input placeholder="VD: Tuyển dụng nhân viên Marketing tháng 10..." />
                </div>
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white">Tiếp theo →</Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="font-semibold">💡 Tài liệu bạn nên xem</h3>
            <p className="text-sm text-gray-600">
              Hiểu về cách chiến dịch tuyển dụng hoạt động sẽ giúp bạn tối ưu tốt hơn hoạt động tuyển dụng của doanh
              nghiệp trên TopCV. Hãy chắc chắn bạn đã tìm hiểu thông tin về chiến dịch tuyển dụng.
            </p>
            <div className="space-y-2">
              <Button variant="link" className="text-green-500 p-0 h-auto">
                Smart Recruitment Platform Principle →
              </Button>
              <Button variant="link" className="text-green-500 p-0 h-auto">
                Khái niệm Chiến dịch tuyển dụng →
              </Button>
              <Button variant="link" className="text-green-500 p-0 h-auto">
                Khởi tạo Chiến dịch tuyển dụng đúng cách →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
