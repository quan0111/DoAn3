import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"

export default function PartnersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Đối tác</h1>

      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Chương trình đối tác</h3>
        <p className="text-gray-500 mb-4">Kết nối và hợp tác cùng TopCV</p>
        <Button className="bg-green-500 hover:bg-green-600 text-white">Tìm hiểu thêm</Button>
      </div>
    </div>
  )
}
