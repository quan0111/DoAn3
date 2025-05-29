import { Button } from "@/components/ui/button"
import { Plus, FileText } from "lucide-react"

export default function JobPostsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tin tuyển dụng</h1>
        <Button className="bg-green-500 hover:bg-green-600 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Đăng tin mới
        </Button>
      </div>

      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Chưa có tin tuyển dụng nào</h3>
        <p className="text-gray-500 mb-4">Bắt đầu tạo tin tuyển dụng đầu tiên của bạn</p>
        <Button className="bg-green-500 hover:bg-green-600 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Tạo tin tuyển dụng
        </Button>
      </div>
    </div>
  )
}
