import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"

export default function CVEmployeeManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <h1 className="text-2xl font-bold">Quản lý nhân CV</h1>
        <Badge variant="secondary">Beta</Badge>
      </div>

      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Tính năng đang phát triển</h3>
        <p className="text-gray-500 mb-4">Quản lý nhân viên và phân quyền CV sẽ sớm ra mắt</p>
        <Button className="bg-green-500 hover:bg-green-600 text-white">Đăng ký nhận thông báo</Button>
      </div>
    </div>
  )
}
