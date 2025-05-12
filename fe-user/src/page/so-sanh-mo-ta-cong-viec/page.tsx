import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JobMatchAnalysis } from "@/components/Job-match-analysis"

export default function JobMatchPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center gap-2 mb-6">
        <Link
          to="/phan-tich-cv"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Quay lại phân tích CV
        </Link>
      </div>

      <h1 className="text-3xl font-bold tracking-tight mb-2">So sánh CV với mô tả công việc</h1>
      <p className="text-muted-foreground mb-8">Phân tích mức độ phù hợp của CV với vị trí công việc cụ thể</p>

      <Tabs defaultValue="job-match" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="job-match">So sánh với mô tả công việc</TabsTrigger>
          <TabsTrigger value="saved-jobs">Việc làm đã lưu</TabsTrigger>
          <TabsTrigger value="history">Lịch sử phân tích</TabsTrigger>
        </TabsList>

        <TabsContent value="job-match" className="mt-0">
          <JobMatchAnalysis />
        </TabsContent>

        <TabsContent value="saved-jobs" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Frontend Developer - {i}</CardTitle>
                  <CardDescription>Công ty ABC Technology</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    Chúng tôi đang tìm kiếm một Frontend Developer có kinh nghiệm với React, TypeScript và các công nghệ
                    web hiện đại. Ứng viên sẽ tham gia vào việc phát triển các ứng dụng web phức tạp, tối ưu hóa hiệu
                    suất và trải nghiệm người dùng.
                  </p>
                  <div className="flex gap-2">
                    <Link
                      to={`/so-sanh-voi-mo-ta-cong-viec?job=${i}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Phân tích mức độ phù hợp
                    </Link>
                    <span className="text-muted-foreground">•</span>
                    <Link
                      to={`/viec-lam/${i}`}
                      className="text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-0">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">Frontend Developer</CardTitle>
                      <CardDescription>Công ty XYZ Solutions</CardDescription>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-100 text-green-800 hover:bg-green-200">
                        Phù hợp: 78%
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">
                        Phân tích ngày {new Date().getDate() - i}/{new Date().getMonth() + 1}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex gap-2">
                    <Link
                      to={`/so-sanh-voi-mo-ta-cong-viec?history=${i}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Xem kết quả phân tích
                    </Link>
                    <span className="text-muted-foreground">•</span>
                    <Link to="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                      Phân tích lại
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
