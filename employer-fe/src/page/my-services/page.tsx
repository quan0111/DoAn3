import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

export default function MyServicesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dịch vụ của tôi</h1>

      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingCart className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Chưa có dịch vụ nào</h3>
        <p className="text-gray-500 mb-4">Mua dịch vụ để bắt đầu tuyển dụng hiệu quả</p>
        <Button className="bg-green-500 hover:bg-green-600 text-white">Mua dịch vụ ngay</Button>
      </div>
    </div>
  )
}
