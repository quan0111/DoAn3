import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/Header"
import { Footer } from "@/components/footer"
import { CreditCard } from "lucide-react"

// Type definitions
interface Payment {
  payment_id: number
  service_type: "premium_job" | "cv_highlight" | "profile_access" | "advertising"
  amount: number
  status: "pending" | "completed" | "failed"
  created_at: string
}

interface Service {
  id: string
  name: string
  description: string
  price: number
}

// Static mock data
const mockData: { payments: Payment[]; services: Service[] } = {
  payments: [
    {
      payment_id: 1,
      service_type: "premium_job",
      amount: 500000,
      status: "completed",
      created_at: "2023-05-01",
    },
  ],
  services: [
    {
      id: "premium_job",
      name: "Tin tuyển dụng nổi bật",
      description: "Tăng khả năng hiển thị tin tuyển dụng của bạn.",
      price: 500000,
    },
    {
      id: "cv_highlight",
      name: "Nổi bật CV",
      description: "Làm CV của bạn nổi bật với nhà tuyển dụng.",
      price: 200000,
    },
  ],
}

export default function PremiumServicesPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    // Giả lập fetch dữ liệu từ API
    setPayments(mockData.payments)
    setServices(mockData.services)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container">
          <h1 className="mb-8 text-2xl font-bold">Gói dịch vụ cao cấp</h1>
          <div className="grid grid-cols-1 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Các gói dịch vụ</CardTitle>
              </CardHeader>
              <CardContent>
                {services.length === 0 ? (
                  <p className="text-gray-500">Chưa có gói dịch vụ nào.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((service) => (
                      <Card key={service.id}>
                        <CardHeader>
                          <CardTitle>{service.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <p className="text-sm">{service.description}</p>
                          <p className="text-sm font-medium">{service.price.toLocaleString()} VND</p>
                          <Button>Đăng ký</Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" /> Lịch sử thanh toán
                </CardTitle>
              </CardHeader>
              <CardContent>
                {payments.length === 0 ? (
                  <p className="text-gray-500">Chưa có giao dịch nào.</p>
                ) : (
                  <ul className="space-y-4">
                    {payments.map((payment) => (
                      <li key={payment.payment_id} className="border-b pb-2">
                        <p className="text-sm">
                          Dịch vụ: {payment.service_type} | Số tiền: {payment.amount.toLocaleString()} VND | Trạng thái: {payment.status}
                        </p>
                        <p className="text-xs text-gray-400">{payment.created_at}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}