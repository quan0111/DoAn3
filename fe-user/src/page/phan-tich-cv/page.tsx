
import { useState, useEffect } from "react"
import { CardFooter } from "@/components/ui/card"
import { Footer } from "@/components/footer"
import { Header } from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"
import {
  BarChart2,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ArrowRightCircle,
  Info,
  Download,
  ThumbsUp,
  Award,
  Clock,
  Cpu,
  Lightbulb,
  PlusCircle,
  Share2,
  BookOpen,
  Edit,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Type definitions
interface CVData {
  title: string
  lastUpdated: string
  overallScore: number
  jobFitPercentage: number
  analysisTime: string
}

interface Score {
  category: string
  score: number
  maxScore: number
}

interface AnalysisData {
  strengths: string[]
  improvements: string[]
  detailed: {
    contentAnalysis: {
      section: string
      score: number
      description: string
      status: string
    }[]
  }
  jobFit: {
    overallFit: number
    jobMatches: {
      title: string
      company: string
      salary: string
      fitPercentage: number
      tags: string[]
    }[]
  }
}

interface FAQ {
  question: string
  answer: string
}

// Static mock data
const mockData: {
  cvData: CVData
  scores: Score[]
  analysisData: AnalysisData
  faqs: FAQ[]
} = {
  cvData: {
    title: "CV Marketing Specialist",
    lastUpdated: "15/05/2023",
    overallScore: 78,
    jobFitPercentage: 65,
    analysisTime: "15/05/2023 14:30",
  },
  scores: [
    { category: "Thông tin cá nhân", score: 8, maxScore: 10 },
    { category: "Học vấn", score: 7, maxScore: 10 },
    { category: "Kinh nghiệm làm việc", score: 6, maxScore: 10 },
    { category: "Kỹ năng", score: 9, maxScore: 10 },
    { category: "Chứng chỉ", score: 5, maxScore: 10 },
    { category: "Định dạng & Trình bày", score: 8, maxScore: 10 },
  ],
  analysisData: {
    strengths: [
      "Bố cục rõ ràng, dễ đọc với các phần được sắp xếp hợp lý",
      "Thông tin liên hệ đầy đủ và dễ tìm",
      "Tối ưu tốt cho các hệ thống ATS",
    ],
    improvements: [
      "Mô tả kinh nghiệm còn chung chung, thiếu các con số cụ thể về thành tích",
      "Phần kỹ năng chưa nêu bật đủ những kỹ năng phù hợp với vị trí Marketing",
      "Thiếu phần tóm tắt nghề nghiệp ở đầu CV để gây ấn tượng",
    ],
    detailed: {
      contentAnalysis: [
        {
          section: "Thông tin cá nhân",
          score: 95,
          description:
            "Thông tin cá nhân đầy đủ, dễ tìm và được sắp xếp hợp lý. Có đầy đủ họ tên, email, số điện thoại và liên kết LinkedIn.",
          status: "Rất tốt",
        },
        {
          section: "Tóm tắt nghề nghiệp",
          score: 0,
          description:
            "CV của bạn hiện không có phần tóm tắt nghề nghiệp. Đây là một phần quan trọng giúp nhà tuyển dụng hiểu nhanh về giá trị bạn mang lại.",
          status: "Cần bổ sung ngay",
        },
        {
          section: "Kinh nghiệm làm việc",
          score: 65,
          description:
            "Phần kinh nghiệm làm việc liệt kê được các vị trí và thời gian làm việc, nhưng còn thiếu các thành tích cụ thể và con số minh chứng.",
          status: "Cần cải thiện",
        },
        {
          section: "Học vấn",
          score: 90,
          description:
            "Phần học vấn đầy đủ thông tin về bằng cấp, trường học và thời gian học tập. Có thể bổ sung thêm các thành tích học tập nổi bật.",
          status: "Tốt",
        },
        {
          section: "Kỹ năng",
          score: 70,
          description:
            "Phần kỹ năng liệt kê được các kỹ năng cơ bản, nhưng cần tập trung hơn vào các kỹ năng chuyên môn phù hợp với vị trí Marketing và sắp xếp theo mức độ thành thạo.",
          status: "Cần cải thiện",
        },
      ],
    },
    jobFit: {
      overallFit: 65,
      jobMatches: [
        {
          title: "Marketing Specialist",
          company: "Công ty ABC - Hà Nội",
          salary: "15-20 triệu",
          fitPercentage: 92,
          tags: ["Social Media", "Content", "Brand Management"],
        },
        {
          title: "Content Marketing Specialist",
          company: "Công ty XYZ - TP.HCM",
          salary: "18-22 triệu",
          fitPercentage: 85,
          tags: ["Content Strategy", "Copywriting", "SEO"],
        },
        {
          title: "Digital Marketing Specialist",
          company: "Công ty DEF - Đà Nẵng",
          salary: "20-25 triệu",
          fitPercentage: 65,
          tags: ["SEM/PPC", "Google Ads", "Analytics"],
        },
        {
          title: "Marketing Analytics Specialist",
          company: "Công ty GHI - Hà Nội",
          salary: "22-28 triệu",
          fitPercentage: 55,
          tags: ["Data Analysis", "KPIs", "Reporting"],
        },
      ],
    },
  },
  faqs: [
    {
      question: "Phân tích CV hoạt động như thế nào?",
      answer:
        "Công cụ phân tích CV của chúng tôi sử dụng kết hợp giữa AI và đánh giá từ chuyên gia nhân sự để phân tích CV của bạn. Chúng tôi kiểm tra nội dung, định dạng, độ tương thích ATS và các yếu tố khác để đưa ra đánh giá toàn diện và đề xuất cải thiện.",
    },
    {
      question: "Làm thế nào để cải thiện điểm CV của tôi?",
      answer:
        "Để cải thiện điểm CV, bạn nên làm theo các đề xuất trong phần 'Đề xuất cải thiện'. Các hành động thường thấy bao gồm: thêm tóm tắt nghề nghiệp, bổ sung thành tích có số liệu cụ thể, tối ưu từ khóa cho ATS, và làm nổi bật các kỹ năng phù hợp với vị trí mục tiêu.",
    },
    {
      question: "CV của tôi sẽ được phân tích lại sau khi chỉnh sửa chứ?",
      answer:
        "Có, sau khi bạn thực hiện các chỉnh sửa theo đề xuất, bạn có thể gửi CV để phân tích lại. Bạn có thể phân tích lại CV miễn phí tối đa 3 lần mỗi tháng với tài khoản cơ bản, hoặc không giới hạn với tài khoản premium.",
    },
    {
      question: "ATS là gì và tại sao nó quan trọng?",
      answer:
        "ATS (Applicant Tracking System) là hệ thống theo dõi ứng viên được sử dụng bởi hầu hết các công ty để sàng lọc CV trước khi đến tay nhà tuyển dụng. Nó tìm kiếm các từ khóa và định dạng cụ thể. Việc tối ưu CV cho ATS rất quan trọng vì nếu CV của bạn không vượt qua ATS, nó sẽ không bao giờ được đọc bởi con người, dù bạn có phù hợp với vị trí đến đâu.",
    },
    {
      question: "Làm thế nào để tiếp cận đánh giá chuyên gia?",
      answer:
        "Đánh giá chuyên gia là tính năng cao cấp trong gói Premium. Các chuyên gia nhân sự với hơn 10 năm kinh nghiệm sẽ đánh giá CV của bạn và cung cấp phản hồi chi tiết, cụ thể theo ngành. Để tiếp cận tính năng này, bạn cần nâng cấp tài khoản lên gói Premium.",
    },
  ],
}

// Hero Section Component
function HeroSection() {
  return (
    <section className="bg-green-500 py-30 text-white">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-3xl font-bold">Phân tích & Đánh giá CV</h1>
          <p className="mb-6">Công cụ phân tích chuyên nghiệp giúp cải thiện CV của bạn</p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/quan-ly-cv">Quản lý CV của bạn</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

// Sidebar Component
function Sidebar({ cvData }: { cvData: CVData }) {
  return (
    <div className="sticky top-24 space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">{cvData.title}</CardTitle>
          <CardDescription>Cập nhật gần nhất: {cvData.lastUpdated}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Điểm đánh giá tổng thể</p>
            <span className="rounded-full bg-green-100 px-2 py-1 text-sm font-medium text-green-800">
              {cvData.overallScore}/100
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Độ phù hợp vị trí</p>
            <span className="rounded-full bg-amber-100 px-2 py-1 text-sm font-medium text-amber-800">
              {cvData.jobFitPercentage}%
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Thời gian phân tích</p>
            <span className="text-sm">{cvData.analysisTime}</span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Trạng thái</p>
            <span className="flex items-center text-sm text-green-600">
              <CheckCircle className="mr-1 h-4 w-4" /> Đã phân tích
            </span>
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <div className="flex w-full gap-2">
            <Button variant="outline" className="flex-1 gap-1">
              <Download className="h-4 w-4" /> Báo cáo
            </Button>
            <Button className="flex-1 gap-1 bg-green-600 hover:bg-green-700">
              <Edit className="h-4 w-4" /> Chỉnh sửa CV
            </Button>
          </div>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Tư vấn chuyên gia</CardTitle>
          <CardDescription>Nhận đánh giá chi tiết từ chuyên gia nhân sự</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md bg-amber-50 p-3 text-amber-800">
            <div className="mb-2 flex items-center">
              <Info className="mr-2 h-5 w-5 text-amber-500" />
              <span className="font-medium">Tính năng cao cấp</span>
            </div>
            <p className="text-sm">
              Nâng cấp tài khoản để nhận đánh giá chi tiết từ chuyên gia tuyển dụng với hơn 10 năm kinh nghiệm.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full gap-1 bg-green-600 hover:bg-green-700">
            <Award className="h-4 w-4" /> Nâng cấp ngay
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

// Analysis Tabs Component
function AnalysisTabs({ scores, analysisData }: { scores: Score[]; analysisData: AnalysisData }) {
  return (
    <Tabs defaultValue="summary" className="w-full">
      <TabsList className="mb-8 grid w-full grid-cols-3">
        <TabsTrigger value="summary">Tổng quan</TabsTrigger>
        <TabsTrigger value="detailed">Phân tích chi tiết</TabsTrigger>
        <TabsTrigger value="jobfit">Đánh giá phù hợp</TabsTrigger>
      </TabsList>

      <TabsContent value="summary">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-green-600" />
                Đánh giá tổng thể
              </CardTitle>
              <CardDescription>Xem điểm số CV của bạn và những điểm cần cải thiện chính</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-4">
                {scores.map((item, index) => (
                  <div key={index} className="flex flex-col items-center rounded-lg border p-4">
                    <div className="text-3xl font-bold text-green-600">{item.score}</div>
                    <div className="text-sm text-gray-500">{item.category}</div>
                  </div>
                ))}
              </div>
              <h4 className="mb-3 font-medium">Điểm mạnh chính</h4>
              <ul className="mb-5 space-y-2">
                {analysisData.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
              <h4 className="mb-3 font-medium">Điểm cần cải thiện</h4>
              <ul className="space-y-2">
                {analysisData.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                    <span>{improvement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="detailed">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Phân tích nội dung</CardTitle>
              <CardDescription>Đánh giá chi tiết về nội dung CV của bạn</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 font-medium">Phân tích từng phần CV</h3>
                  <div className="space-y-4">
                    {analysisData.detailed.contentAnalysis.map((item, index) => (
                      <div key={index} className="rounded-lg border p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <h4 className="font-medium">{item.section}</h4>
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-medium ${
                              item.score >= 90
                                ? "bg-green-100 text-green-800"
                                : item.score >= 60
                                ? "bg-amber-100 text-amber-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {item.score}/100
                          </span>
                        </div>
                        <p className="mb-2 text-sm text-gray-600">{item.description}</p>
                        <div className="flex items-center gap-2">
                          {item.score >= 90 ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : item.score >= 60 ? (
                            <AlertTriangle className="h-4 w-4 text-amber-600" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-600" />
                          )}
                          <span
                            className={`text-sm ${
                              item.score >= 90 ? "text-green-600" : item.score >= 60 ? "text-amber-600" : "text-red-600"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="jobfit">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Độ phù hợp với vị trí công việc</CardTitle>
              <CardDescription>Đánh giá độ phù hợp của CV với vị trí Marketing Specialist</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-lg border bg-amber-50 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-medium text-amber-700">Độ phù hợp tổng thể</h3>
                    <span className="text-2xl font-bold text-amber-700">{analysisData.jobFit.overallFit}%</span>
                  </div>
                  <p className="text-sm text-amber-600">
                    CV của bạn có nhiều yếu tố phù hợp với vị trí Marketing Specialist, nhưng vẫn có những khoảng trống cần
                    cải thiện để tăng khả năng cạnh tranh.
                  </p>
                </div>
                <div>
                  <h3 className="mb-3 font-medium">Cơ hội việc làm phù hợp</h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {analysisData.jobFit.jobMatches.map((job, index) => (
                      <div
                        key={index}
                        className={`rounded-lg border p-4 hover:${
                          job.fitPercentage >= 80 ? "border-green-200 bg-green-50" : "border-amber-200 bg-amber-50"
                        }`}
                      >
                        <h4 className="font-medium">{job.title}</h4>
                        <p className="mb-2 text-sm text-gray-500">{job.company}</p>
                        <div className="mb-3 flex flex-wrap gap-2">
                          {job.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{job.salary}</span>
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-medium ${
                              job.fitPercentage >= 80
                                ? "bg-green-100 text-green-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            Phù hợp {job.fitPercentage >= 80 ? "cao" : "trung bình"}: {job.fitPercentage}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  )
}

// FAQ Section Component
function FAQSection({ faqs }: { faqs: FAQ[] }) {
  return (
    <section className="bg-gray-50 py-12">
      <div className="container">
        <h2 className="mb-8 text-center text-2xl font-bold">Câu hỏi thường gặp</h2>
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

// Main CV Analysis Page Component
export default function CVAnalysisPage() {
  const [cvData, setCvData] = useState<CVData | null>(null)
  const [scores, setScores] = useState<Score[]>([])
  const [analysisData, setAnalysisData] = useState<AnalysisData>({
    strengths: [],
    improvements: [],
    detailed: { contentAnalysis: [] },
    jobFit: { overallFit: 0, jobMatches: [] },
  })
  const [faqs, setFaqs] = useState<FAQ[]>([])

  // Use static mock data
  useEffect(() => {
    setCvData(mockData.cvData)
    setScores(mockData.scores)
    setAnalysisData(mockData.analysisData)
    setFaqs(mockData.faqs)
  }, [])

  if (!cvData) return <div>Loading...</div>

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <section className="py-12">
          <div className="container">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="order-2 lg:order-1 lg:col-span-1">
                <Sidebar cvData={cvData} />
              </div>
              <div className="order-1 lg:order-2 lg:col-span-2">
                <AnalysisTabs scores={scores} analysisData={analysisData} />
              </div>
            </div>
          </div>
        </section>
        <FAQSection faqs={faqs} />
      </main>
      <Footer />
    </div>
  )
}