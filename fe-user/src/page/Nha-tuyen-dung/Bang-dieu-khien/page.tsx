import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/Header"
import { Footer } from "@/components/footer"
import { BarChart2, FileText, CreditCard } from "lucide-react"

// Type definitions
interface Job {
  job_id: number
  title: string
  status: "active" | "inactive" | "pending" | "rejected"
  view_count: number
  application_count: number
  created_at: string
}

interface Application {
  application_id: number
  job_id: number
  job_title: string
  user_name: string
  status: "pending" | "reviewed" | "accepted" | "rejected"
  applied_at: string
}

interface Analytic {
  analytic_id: number
  entity_id: number
  metric_type: "view" | "click" | "apply"
  value: number
}

interface Payment {
  payment_id: number
  service_type: "premium_job" | "cv_highlight" | "profile_access" | "advertising"
  amount: number
  status: "pending" | "completed" | "failed"
  created_at: string
}

// Static mock data
const mockData: { jobs: Job[]; applications: Application[]; analytics: Analytic[]; payments: Payment[] } = {
  jobs: [
    { job_id: 101, title: "Marketing Specialist", status: "active", view_count: 150, application_count: 10, created_at: "2023-05-01" },
    { job_id: 102, title: "Content Writer", status: "pending", view_count: 50, application_count: 2, created_at: "2023-05-05" },
  ],
  applications: [
    { application_id: 1, job_id: 101, job_title: "Marketing Specialist", user_name: "Nguyễn Văn A", status: "pending", applied_at: "2023-05-10" },
  ],
  analytics: [
    { analytic_id: 1, entity_id: 101, metric_type: "view", value: 150 },
    { analytic_id: 2, entity_id: 101, metric_type: "apply", value: 10 },
  ],
  payments: [
    { payment_id: 1, service_type: "premium_job", amount: 500000, status: "completed", created_at: "2023-05-01" },
  ],
}

export default function EmployerDashboardPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [analytics, setAnalytics] = useState<Analytic[]>([])
  const [payments, setPayments] = useState<Payment[]>([])

  useEffect(() => {
    // Giả lập fetch dữ liệu từ API
    setJobs(mockData.jobs)
    setApplications(mockData.applications)
    setAnalytics(mockData.analytics)
    setPayments(mockData.payments)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container">
          <h1 className="mb-8 text-2xl font-bold">Bảng điều khiển nhà tuyển dụng</h1>
          <div className="grid grid-cols-1 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" /> Tin tuyển dụng
                </CardTitle>
              </CardHeader>
              <CardContent>
                {jobs.length === 0 ? (
                  <p className="text-gray-500">Chưa có tin tuyển dụng nào.</p>
                ) : (
                  <ul className="space-y-4">
                    {jobs.map((job) => (
                      <li key={job.job_id} className="flex items-center justify-between border-b pb-2">
                        <div>
                          <p className="font-medium">{job.title}</p>
                          <p className="text-sm text-gray-500">
                            Trạng thái: {job.status} | Lượt xem: {job.view_count} | Ứng tuyển: {job.application_count}
                          </p>
                        </div>
                        <Button variant="outline">Quản lý</Button>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" /> Ứng viên
                </CardTitle>
              </CardHeader>
              <CardContent>
                {applications.length === 0 ? (
                  <p className="text-gray-500">Chưa có ứng viên nào.</p>
                ) : (
                  <ul className="space-y-4">
                    {applications.map((app) => (
                      <li key={app.application_id} className="flex items-center justify-between border-b pb-2">
                        <div>
                          <p className="font-medium">{app.user_name}</p>
                          <p className="text-sm text-gray-500">
                            Công việc: {app.job_title} | Trạng thái: {app.status}
                          </p>
                        </div>
                        <Button variant="outline">Xem hồ sơ</Button>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart2 className="h-5 w-5" /> Phân tích
                </CardTitle>
              </CardHeader>
              <CardContent>
                {analytics.length === 0 ? (
                  <p className="text-gray-500">Chưa có dữ liệu phân tích.</p>
                ) : (
                  <ul className="space-y-4">
                    {analytics.map((analytic) => (
                      <li key={analytic.analytic_id} className="border-b pb-2">
                        <p className="text-sm">
                          Công việc ID: {analytic.entity_id} | {analytic.metric_type}: {analytic.value}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" /> Thanh toán
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