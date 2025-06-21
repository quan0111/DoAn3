"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"
import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { Link, useNavigate } from "react-router-dom"

interface Order {
  id: number
  user_id: number
  payment_service_id: number
  service_name: string
  price: string
  discount_percent: number
  vat_percent: number
  total_amount: string
  payment_method: string
  status: string
  paid_at: string | null
  expired_at: string
}

interface Tab {
  id: string
  label: string
  count: number
}

const orderTabs: Tab[] = [
  { id: "all", label: "Tất cả", count: 0 },
  { id: "pending", label: "Đang chờ duyệt", count: 0 },
  { id: "running", label: "Đang chạy dịch vụ", count: 0 },
  { id: "completed", label: "Hoàn thành", count: 0 },
  { id: "expired", label: "Hết hạn", count: 0 },
  { id: "cancelled", label: "Bị hủy", count: 0 },
]

interface JwtPayload {
  role: string
  exp?: number
  userId?: number
  email: string
}

export default function OrderTrackingPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token")
      console.log(token)
      if (!token) {
        setError("Vui lòng đăng nhập để xem đơn hàng")
        setLoading(false)
        return
      }

      try {
        const decoded: JwtPayload = jwtDecode(token)
        if (decoded.role !== "employer" || (decoded.exp && decoded.exp < Date.now() / 1000)) {
          setError("Phiên đăng nhập không hợp lệ")
          localStorage.removeItem("token")
          setLoading(false)
          return
        }
        console.log(decoded)
        const user_id = decoded.userId
        console.log(user_id)
        const url = activeTab === "all"
          ? `http://localhost:3000/user_paymentss/user/${user_id}`
          : `http://localhost:3000/user_paymentss/${user_id}/status/${activeTab}`

        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (response.status === 200) {
          const data: Order[] = response.data
          setOrders(data)

          // Cập nhật số lượng cho từng tab
          const updatedTabs = orderTabs.map((tab) => ({
            ...tab,
            count: data.filter((order) => tab.id === "all" || order.status === tab.id).length,
          }))
          orderTabs.splice(0, orderTabs.length, ...updatedTabs)
        } else {
          throw new Error("Không thể tải danh sách đơn hàng")
        }
      } catch (err: any) {
        console.error("Fetch orders error:", err)
        setError(err.response?.data?.error || "Không thể tải danh sách đơn hàng. Vui lòng thử lại.")
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [activeTab])

  const handleViewDetail = (orderId: number) => {
    const order = orders.find((o) => o.id === orderId)
    setSelectedOrder(order || null)
  }

  const closeModal = () => {
    setSelectedOrder(null)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <svg className="w-8 h-8 animate-spin text-green-500" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Thử lại
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Theo dõi đơn hàng</h1>

      {/* Warning Notice */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">!</span>
            </div>
            <div>
              <p className="text-sm text-yellow-800">
                Hệ thống sẽ tự động hủy các đơn hàng không được thanh toán trước ngày 31/05/2025. Vui lòng thanh toán để
                đơn hàng không bị hủy.{" "}
                <Button variant="link" className="text-green-600 p-0 h-auto underline">
                  Tìm hiểu thêm
                </Button>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Status Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {orderTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
              <Badge variant="secondary" className="ml-2">
                {tab.count}
              </Badge>
            </button>
          ))}
        </nav>
      </div>

      {/* Order List or Empty State */}
      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="border-gray-200">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{order.service_name || `Đơn hàng #${order.id}`}</p>
                  <p className="text-sm text-gray-600">
                    Tổng: {parseFloat(order.total_amount).toLocaleString("vi-VN")} VND
                  </p>
                  <p className="text-sm text-gray-600">Trạng thái: {order.status}</p>
                  <p className="text-sm text-gray-600">Hết hạn: {order.expired_at}</p>
                </div>
                <Button variant="outline" className="ml-4" onClick={() => handleViewDetail(order.id)}>
                  Xem chi tiết
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-32 h-32 mx-auto mb-6">
            <svg viewBox="0 0 400 300" className="w-full h-full">
              <rect x="50" y="100" width="300" height="150" rx="10" fill="#e5f7e5" />
              <rect x="80" y="130" width="80" height="8" rx="4" fill="#22c55e" />
              <rect x="180" y="130" width="80" height="8" rx="4" fill="#22c55e" />
              <rect x="280" y="130" width="60" height="8" rx="4" fill="#22c55e" />
              <rect x="80" y="150" width="60" height="8" rx="4" fill="#22c55e" />
              <rect x="160" y="150" width="100" height="8" rx="4" fill="#22c55e" />
              <rect x="80" y="170" width="90" height="8" rx="4" fill="#22c55e" />
              <rect x="190" y="170" width="70" height="8" rx="4" fill="#22c55e" />
              <rect x="80" y="190" width="120" height="8" rx="4" fill="#22c55e" />
              <rect x="220" y="190" width="80" height="8" rx="4" fill="#22c55e" />
              <circle cx="120" cy="80" r="15" fill="#22c55e" />
              <rect x="110" y="95" width="20" height="30" rx="10" fill="#22c55e" />
              <circle cx="280" cy="80" r="15" fill="#3b82f6" />
              <rect x="270" y="95" width="20" height="30" rx="10" fill="#3b82f6" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Bạn chưa có đơn hàng nào</h3>
          <Link to="/services">
            <Button className="bg-green-500 hover:bg-green-600 text-white">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Mua dịch vụ
            </Button>
          </Link>
        </div>
      )}

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Chi tiết đơn hàng #{selectedOrder.id}</h2>
            <div className="space-y-2">
              <p><strong>Tên dịch vụ:</strong> {selectedOrder.service_name || "Chưa xác định"}</p>
              <p><strong>Giá gốc:</strong> {parseFloat(selectedOrder.price).toLocaleString("vi-VN")} VND</p>
              <p><strong>Giảm giá:</strong> {selectedOrder.discount_percent}%</p>
              <p><strong>VAT:</strong> {selectedOrder.vat_percent}%</p>
              <p><strong>Tổng tiền:</strong> {parseFloat(selectedOrder.total_amount).toLocaleString("vi-VN")} VND</p>
              <p><strong>Phương thức thanh toán:</strong> {selectedOrder.payment_method}</p>
              <p><strong>Trạng thái:</strong> {selectedOrder.status}</p>
              <p><strong>Ngày thanh toán:</strong> {selectedOrder.paid_at || "Chưa thanh toán"}</p>
              <p><strong>Hết hạn:</strong> {selectedOrder.expired_at}</p>
            </div>
            <Button onClick={closeModal} className="mt-4 bg-green-500 hover:bg-green-600 text-white">
              Đóng
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}