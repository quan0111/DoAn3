import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/Header"
import { Footer } from "@/components/footer"
import { BarChart2 } from "lucide-react"

// Type definitions
interface SkillTrend {
  skill: string
  count: number
}

interface Analytic {
  analytic_id: number
  entity_type: "job" | "article" | "ad" | "event"
  metric_type: "view" | "click" | "apply" | "time_spent"
  value: number
}

// Static mock data
const mockData: { skills: SkillTrend[]; analytics: Analytic[] } = {
  skills: [
    { skill: "Python", count: 50 },
    { skill: "Marketing", count: 30 },
    { skill: "SEO", count: 20 },
  ],
  analytics: [
    { analytic_id: 1, entity_type: "job", metric_type: "view", value: 150 },
    { analytic_id: 2, entity_type: "job", metric_type: "apply", value: 10 },
  ],
}

export default function CareerInsightsPage() {
  const [skills, setSkills] = useState<SkillTrend[]>([])
  const [analytics, setAnalytics] = useState<Analytic[]>([])

  useEffect(() => {
    // Giả lập fetch dữ liệu từ API
    setSkills(mockData.skills)
    setAnalytics(mockData.analytics)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container">
          <h1 className="mb-8 text-2xl font-bold">Phân tích dữ liệu nghề nghiệp</h1>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart2 className="h-5 w-5" /> Kỹ năng thịnh hành
                </CardTitle>
              </CardHeader>
              <CardContent>
                {skills.length === 0 ? (
                  <p className="text-gray-500">Chưa có dữ liệu kỹ năng.</p>
                ) : (
                  <ul className="space-y-4">
                    {skills.map((skill) => (
                      <li key={skill.skill} className="flex items-center justify-between">
                        <p className="font-medium">{skill.skill}</p>
                        <p className="text-sm text-gray-500">{skill.count} công việc</p>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart2 className="h-5 w-5" /> Thống kê công việc
                </CardTitle>
              </CardHeader>
              <CardContent>
                {analytics.length === 0 ? (
                  <p className="text-gray-500">Chưa có dữ liệu thống kê.</p>
                ) : (
                  <ul className="space-y-4">
                    {analytics.map((analytic) => (
                      <li key={analytic.analytic_id} className="flex items-center justify-between">
                        <p className="text-sm">{analytic.metric_type}</p>
                        <p className="text-sm text-gray-500">{analytic.value}</p>
                      </li>
                    ))}
                  </ul>
                )}
                {/* Giả lập biểu đồ */}
                <p className="text-sm text-gray-500 mt-4">Biểu đồ: Sử dụng Chart.js để hiển thị dữ liệu.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}