import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MapPin, Heart } from "lucide-react"

// Type definitions
interface Job {
  job_id: number
  title: string
  company_name: string
  logo_url?: string
  location: string
  salary_range: string
  created_at: string
}

// Static mock data
const mockJobs: Job[] = [
  {
    job_id: 1,
    title: "Chuyên Viên Kiến Soát Nội Bộ",
    company_name: "Công ty TNHH Blue Elation",
    logo_url: "https://example.com/logo1.png",
    location: "Hà Nội",
    salary_range: "18 - 20 triệu",
    created_at: "2023-05-10",
  },
  {
    job_id: 2,
    title: "Trưởng Phòng Marketing - Lương Up to",
    company_name: "Công ty Cổ phần Comacpro",
    logo_url: "https://example.com/logo2.png",
    location: "Hà Nội",
    salary_range: "20 - 25 triệu + Thưởng KPI",
    created_at: "2023-05-09",
  },
  {
    job_id: 3,
    title: "Nhân Viên Kinh Doanh/Kỹ Sư Bán",
    company_name: "Công ty TNHH Hitachi Việt Nam",
    logo_url: "https://example.com/logo3.png",
    location: "Hà Nội",
    salary_range: "11 - 14 triệu",
    created_at: "2023-05-08",
  },
  {
    job_id: 4,
    title: "Chuyên Viên Tư Vấn Tài Chính Cao Cấp",
    company_name: "Công ty TNHH Bảo Hiểm Nhân Thọ Generali",
    logo_url: "https://example.com/logo4.png",
    location: "Hồ Chí Minh, Đà Nẵng",
    salary_range: "30 - 50 triệu",
    created_at: "2023-05-07",
  },
  {
    job_id: 5,
    title: "Nhân Viên Kinh Doanh/Tư Vấn Resale",
    company_name: "Công ty TNHH Halovn - Chi nhánh Hà Nội",
    logo_url: "https://example.com/logo5.png",
    location: "Hà Nội",
    salary_range: "8 - 15 triệu",
    created_at: "2023-05-06",
  },
  {
    job_id: 6,
    title: "Nhân Viên SEO - C6 1 Năm Kinh Nghiệm",
    company_name: "Công ty Cổ phần Truyền Thông và Quảng cáo MLC Creative",
    logo_url: "https://example.com/logo6.png",
    location: "Hà Nội",
    salary_range: "8 - 12 triệu",
    created_at: "2023-05-05",
  },
  // Thêm dữ liệu để mô phỏng nhiều trang
  {
    job_id: 7,
    title: "Nhân Viên IT Hỗ Trợ",
    company_name: "Công ty TNHH Tech Solutions",
    logo_url: "https://example.com/logo7.png",
    location: "Thành phố Hồ Chí Minh",
    salary_range: "15 - 20 triệu",
    created_at: "2023-05-04",
  },
]

// Static filter options
const locations = ["Ngẫu nhiên", "Hà Nội", "Thành phố Hồ Chí Minh", "Miền Bắc", "Miền Nam"]

export default function JobListings() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [activeTab, setActiveTab] = useState<string>("Ngẫu nhiên")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [currentPage, setCurrentPage] = useState<number>(1)
  const jobsPerPage = 6

  useEffect(() => {
    // Giả lập fetch dữ liệu từ API
    setJobs(mockJobs)
  }, [])

  const filteredJobs = jobs
    .filter((job) => {
      const matchesLocation = activeTab === "Ngẫu nhiên" || job.location.includes(activeTab)
      const matchesSearch = !searchQuery || job.title.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesLocation && matchesSearch
    })
    .slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage)

  const totalPages = Math.ceil(jobs.length / jobsPerPage)

  return (
    <section className="py-12 bg-[#F5F5F5]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Công việc nổi bật</h2>
        <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 gap-1 bg-white border border-gray-200 rounded-md p-1">
              {locations.map((loc) => (
                <TabsTrigger
                  key={loc}
                  value={loc}
                  className="flex-1 text-center text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md px-2 py-1 transition-colors data-[state=active]:bg-[#00C853] data-[state=active]:text-white"
                >
                  {loc}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Search className="h-5 w-5 text-gray-500" />
            <Input
              placeholder="Gợi ý: Di chuyển vào tìm việc để xem thêm thông tin..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-[300px] border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00C853] focus:border-transparent"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJobs.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">Không tìm thấy công việc phù hợp.</p>
          ) : (
            filteredJobs.map((job) => (
              <Card
                key={job.job_id}
                className="border border-gray-200 rounded-md bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                <CardContent className="flex items-center p-3 gap-3">
                  {job.logo_url && (
                    <img src={job.logo_url} alt={job.company_name} className="h-10 w-10 rounded-full object-contain" />
                  )}
                  <div className="flex-1">
                    <CardTitle className="text-base font-semibold text-gray-900 line-clamp-2">{job.title}</CardTitle>
                    <p className="text-xs text-gray-600">{job.company_name}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {job.location}
                    </p>
                    <p className="text-sm font-medium text-gray-800">{job.salary_range}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Button
                      className="bg-[#00C853] text-white text-xs px-2 py-1 rounded-md hover:bg-[#00A64B] transition-colors"
                    >
                      Thảo luận
                    </Button>
                    <button className="text-[#00C853] hover:text-[#00A64B] transition-colors">
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        <div className="flex justify-center items-center gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm px-2 py-1 rounded-md"
          >
            
          </Button>
          <span className="text-sm text-gray-700">{currentPage} / {totalPages}</span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm px-2 py-1 rounded-md"
          >
            
          </Button>
          <Button
            asChild
            className="bg-[#00C853] text-white hover:bg-[#00A64B] text-sm px-3 py-1 rounded-md"
          >
            <a href="/jobs">Xem tất cả</a>
          </Button>
        </div>
      </div>
    </section>
  )
}