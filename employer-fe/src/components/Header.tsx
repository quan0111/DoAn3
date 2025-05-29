import { Link } from "react-router-dom" 
import { FileText } from "lucide-react"

import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link to="/" className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-green-600" />
            <span className="font-bold text-xl">TopCV</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link to="/mau-cv" className="text-sm font-medium transition-colors hover:text-green-600">
              Mẫu CV
            </Link>
            <Link to="/mau-cv" className="text-sm font-medium transition-colors hover:text-green-600">
              Tạo CV
            </Link>
            <Link to="/viec-lam" className="text-sm font-medium transition-colors hover:text-green-600">
              Tư Vấn Nghề Nghiệp
            </Link>
            <Link to="/" className="text-sm font-medium transition-colors hover:text-green-600">
              Bảng Giá
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/Login" className="text-sm font-medium hover:underline">
            Đăng Nhập
          </Link>
          <Link to="/register">
          <Button className="bg-green-600 hover:bg-green-700">Bắt Đầu</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
