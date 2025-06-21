"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Gift } from "lucide-react"

interface Reward {
  id: number
  name: string
  points: number
  description: string
  image?: string
}

export default function RewardsPage() {
  const [rewards] = useState<Reward[]>([
    {
      id: 1,
      name: "Voucher mua sắm 500k",
      points: 500,
      description: "Dùng để mua sắm tại các đối tác TopCV, hạn sử dụng đến 30/06/2025.",
      image: "public/reward-voucher.jpg",
    },
    {
      id: 2,
      name: "Ưu đãi mùa hè 2025",
      points: 300,
      description: "Giảm 20% phí dịch vụ tuyển dụng trong tháng 6/2025.",
      image: "public/reward-summer.jpg",
    },
    {
      id: 3,
      name: "Quà tặng công nghệ",
      points: 1000,
      description: "Nhận tai nghe không dây từ đối tác, số lượng có hạn đến 20/06/2025.",
      image: "public/reward-tech.jpg",
    },
  ])
  const [currentPoints] = useState(750) // Giả lập điểm hiện tại của người dùng

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-3xl font-bold text-gray-800">TopCV Rewards</h1>

      <div className="text-center py-8">
        <div className="w-28 h-28 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Gift className="w-16 h-16 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-700">Chương trình phần thưởng</h3>
        <p className="text-gray-500 mb-4 max-w-xl mx-auto">
          Tích điểm từ các hoạt động trên TopCV và đổi lấy những phần thưởng hấp dẫn. Điểm hiện tại của bạn: <span className="font-bold text-green-600">{currentPoints}</span> điểm.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward) => (
          <Card key={reward.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="p-0">
              <img
                src={"public/voucher1.jpg"}
                alt={reward.name}
                className="w-full h-40 object-cover"
              />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-lg font-semibold mb-2 text-gray-800">{reward.name}</CardTitle>
              <p className="text-gray-600 mb-2">{reward.description}</p>
              <p className="text-sm font-bold text-green-700">Cần: {reward.points} điểm</p>
              <Button
                className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white"
                disabled={currentPoints < reward.points}
              >
                Đổi ngay
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg">
          Khám phá thêm phần thưởng
        </Button>
      </div>
    </div>
  )
}