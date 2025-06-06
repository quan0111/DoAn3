import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
  {
    id: "1",
    user: "Nguyễn Văn A",
    action: "đã ứng tuyển vào vị trí",
    target: "Frontend Developer tại FPT Software",
    time: "2 phút trước",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    user: "Công ty ABC",
    action: "đã đăng tin tuyển dụng",
    target: "Backend Developer",
    time: "15 phút trước",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "3",
    user: "Trần Thị B",
    action: "đã cập nhật CV",
    target: "",
    time: "1 giờ trước",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "4",
    user: "Công ty XYZ",
    action: "đã phê duyệt tin tuyển dụng",
    target: "UI/UX Designer",
    time: "2 giờ trước",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "5",
    user: "Lê Văn C",
    action: "đã đăng ký tài khoản mới",
    target: "",
    time: "3 giờ trước",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hoạt động gần đây</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={activity.avatar || "/placeholder.svg"} alt={activity.user} />
                <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                  {activity.target && <span className="font-medium">{activity.target}</span>}
                </p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
