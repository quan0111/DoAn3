import { Button } from "@/components/ui/button"
import { CVManagementCard } from "@/components/cv-management-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Search } from "lucide-react"
import { Link } from "react-router-dom"
import { Header } from "@/components/Header"
import { Footer } from "@/components/footer"
// Mock data for CV list
const mockCVs = [
  {
    id: "cv-1",
    title: "CV Chuyên viên Marketing",
    templateName: "Modern Professional",
    createdAt: new Date("2023-10-15"),
    updatedAt: new Date("2023-11-20"),
    thumbnailUrl: "/placeholder.svg?height=400&width=300",
    status: "active" as const,
  },
  {
    id: "cv-2",
    title: "CV Kỹ sư phần mềm",
    templateName: "Tech Minimal",
    createdAt: new Date("2023-09-05"),
    updatedAt: new Date("2023-11-18"),
    thumbnailUrl: "/placeholder.svg?height=400&width=300",
    status: "active" as const,
  },
  {
    id: "cv-3",
    title: "CV Thiết kế đồ họa",
    templateName: "Creative Portfolio",
    createdAt: new Date("2023-08-22"),
    updatedAt: new Date("2023-10-30"),
    thumbnailUrl: "/placeholder.svg?height=400&width=300",
    status: "draft" as const,
  },
  {
    id: "cv-4",
    title: "CV Quản lý dự án",
    templateName: "Executive Clean",
    createdAt: new Date("2023-07-10"),
    updatedAt: new Date("2023-09-15"),
    thumbnailUrl: "/placeholder.svg?height=400&width=300",
    status: "archived" as const,
  },
  {
    id: "cv-5",
    title: "CV Nhân viên kinh doanh",
    templateName: "Sales Professional",
    createdAt: new Date("2023-06-18"),
    updatedAt: new Date("2023-08-22"),
    thumbnailUrl: "/placeholder.svg?height=400&width=300",
    status: "active" as const,
  },
  {
    id: "cv-6",
    title: "CV Kế toán",
    templateName: "Finance Expert",
    createdAt: new Date("2023-05-05"),
    updatedAt: new Date("2023-07-12"),
    thumbnailUrl: "/placeholder.svg?height=400&width=300",
    status: "draft" as const,
  },
]

export default function CVManagementPage() {
  return (
    
    <div className="container mx-auto py-10">
      <Header></Header>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản lý CV của tôi</h1>
          <p className="text-muted-foreground mt-1">Quản lý, chỉnh sửa và theo dõi tất cả CV của bạn</p>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Tìm kiếm CV..."
              className="pl-9 h-10 w-full sm:w-[200px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <Button asChild>
            <Link to="/tao-cv">
              <PlusCircle className="h-4 w-4 mr-2" />
              Tạo CV mới
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">Tất cả CV</TabsTrigger>
          <TabsTrigger value="active">Đang hoạt động</TabsTrigger>
          <TabsTrigger value="draft">Bản nháp</TabsTrigger>
          <TabsTrigger value="archived">Đã lưu trữ</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockCVs.map((cv) => (
              <CVManagementCard key={cv.id} {...cv} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockCVs
              .filter((cv) => cv.status === "active")
              .map((cv) => (
                <CVManagementCard key={cv.id} {...cv} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="draft" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockCVs
              .filter((cv) => cv.status === "draft")
              .map((cv) => (
                <CVManagementCard key={cv.id} {...cv} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="archived" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockCVs
              .filter((cv) => cv.status === "archived")
              .map((cv) => (
                <CVManagementCard key={cv.id} {...cv} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {mockCVs.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">Bạn chưa có CV nào</h3>
          <p className="text-muted-foreground mt-1 mb-6">Tạo CV đầu tiên của bạn để bắt đầu hành trình tìm việc</p>
          <Button asChild>
            <Link to="/tao-cv">
              <PlusCircle className="h-4 w-4 mr-2" />
              Tạo CV mới
            </Link>
          </Button>
        </div>
      )}
      <Footer></Footer>
    </div>
  )
}
