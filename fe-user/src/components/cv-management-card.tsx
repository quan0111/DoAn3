import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Download, Edit, Eye, Share2, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { formatDistanceToNow } from "date-fns"
import { vi } from "date-fns/locale"

interface CVManagementCardProps {
  id: string
  title: string
  templateName: string
  createdAt: Date
  updatedAt: Date
  thumbnailUrl: string
  status: "active" | "draft" | "archived"
}

export function CVManagementCard({
  id,
  title,
  templateName,
  createdAt,
  updatedAt,
  thumbnailUrl,
  status,
}: CVManagementCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "draft":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case "archived":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Đang hoạt động"
      case "draft":
        return "Bản nháp"
      case "archived":
        return "Đã lưu trữ"
      default:
        return "Không xác định"
    }
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={thumbnailUrl || "/placeholder.svg?height=300&width=225"}
          alt={title}
          className="object-cover w-full h-full transition-transform hover:scale-105"
        />
        <Badge className={`absolute top-2 right-2 ${getStatusColor(status)}`}>{getStatusText(status)}</Badge>
      </div>
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-lg font-semibold line-clamp-1">{title}</CardTitle>
        <CardDescription className="flex items-center gap-1 text-sm">
          <CalendarIcon className="h-3.5 w-3.5" />
          <span>Cập nhật {formatDistanceToNow(updatedAt, { addSuffix: true, locale: vi })}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm text-muted-foreground">Mẫu: {templateName}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link to={`/tao-cv?id=${id}`}>
            <Edit className="h-4 w-4 mr-1" />
            Sửa
          </Link>
        </Button>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-1" />
          Tải xuống
        </Button>
        <Button variant="ghost" size="sm" className="px-2">
          <Eye className="h-4 w-4" />
          <span className="sr-only">Xem trước</span>
        </Button>
        <Button variant="ghost" size="sm" className="px-2">
          <Share2 className="h-4 w-4" />
          <span className="sr-only">Chia sẻ</span>
        </Button>
        <Button variant="ghost" size="sm" className="px-2 text-red-500 hover:text-red-600 hover:bg-red-50">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Xóa</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
