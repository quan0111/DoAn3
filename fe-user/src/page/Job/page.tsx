import { Header } from "@/components/Header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Link } from "react-router-dom"
import { Building, MapPin, Wallet, Clock, ChevronRight, ArrowRight, Briefcase } from "lucide-react"

export default function JobListPage() {
  // Danh mục công việc
  const jobCategories = [
    "Tất cả",
    "Công nghệ thông tin",
    "Marketing",
    "Tài chính - Kế toán",
    "Nhân sự",
    "Kinh doanh",
    "Hành chính - Văn phòng",
    "Sản xuất",
    "Dịch vụ",
    "Giáo dục",
    "Y tế",
  ]

  // Dữ liệu mẫu cho danh sách công việc
  const featuredJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "Công ty ABC",
      location: "Hà Nội",
      salary: "20-30 triệu",
      type: "Toàn thời gian",
      tags: ["React", "TypeScript", "UI/UX"],
      featured: true,
      urgent: false,
    },
    {
      id: 2,
      title: "Marketing Manager",
      company: "Tập đoàn XYZ",
      location: "TP. Hồ Chí Minh",
      salary: "25-35 triệu",
      type: "Toàn thời gian",
      tags: ["Digital Marketing", "Brand Management", "SEO"],
      featured: true,
      urgent: true,
    },
    {
      id: 3,
      title: "Kế toán trưởng",
      company: "Công ty Tài chính DEF",
      location: "Đà Nẵng",
      salary: "18-25 triệu",
      type: "Toàn thời gian",
      tags: ["Báo cáo tài chính", "Thuế", "Quản lý"],
      featured: true,
      urgent: false,
    },
  ]

  const recentJobs = Array.from({ length: 10 }).map((_, i) => {
    const categories = ["Công nghệ thông tin", "Marketing", "Tài chính - Kế toán", "Nhân sự", "Kinh doanh"]
    const titles = [
      "Software Engineer",
      "Product Manager",
      "Digital Marketing Specialist",
      "HR Manager",
      "Sales Executive",
      "Data Analyst",
      "UX/UI Designer",
      "Content Writer",
      "Financial Analyst",
      "Customer Support",
    ]
    const companies = ["Công ty A", "Công ty B", "Công ty C", "Công ty D", "Công ty E"]
    const locations = ["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", "Cần Thơ"]
    const salaries = ["15-20 triệu", "Thỏa thuận", "10-15 triệu", "20-30 triệu", "8-12 triệu"]
    const types = ["Toàn thời gian", "Bán thời gian", "Remote", "Hợp đồng", "Thực tập"]

    return {
      id: i + 4,
      title: titles[i % titles.length],
      company: companies[i % companies.length],
      location: locations[i % locations.length],
      salary: salaries[i % salaries.length],
      type: types[i % types.length],
      category: categories[i % categories.length],
      tags: ["Tag 1", "Tag 2", "Tag 3"].map((tag, j) => `${tag} ${i + j}`),
      featured: i % 5 === 0,
      urgent: i % 7 === 0,
    }
  })

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Banner */}
        <section className="bg-green-600 py-12 text-white">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-4xl font-bold">Danh sách công việc</h1>
              <p className="mb-6 text-lg">
                Khám phá hàng nghìn cơ hội việc làm từ các công ty hàng đầu trên khắp Việt Nam
              </p>
              <div className="flex justify-center">
                <Button variant="secondary" size="lg" asChild>
                  <Link to="/viec-lam">
                    Tìm kiếm nâng cao <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Categories */}
                  <div className="rounded-lg border">
                    <div className="border-b bg-gray-50 p-4">
                      <h2 className="text-lg font-bold">Danh mục công việc</h2>
                    </div>
                    <div className="p-4">
                      <ul className="space-y-2">
                        {jobCategories.map((category, index) => (
                          <li key={index}>
                            <Link
                              to="#"
                              className={`flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors ${
                                index === 0
                                  ? "bg-green-50 font-medium text-green-600"
                                  : "hover:bg-gray-50 hover:text-green-600"
                              }`}
                            >
                              <span>{category}</span>
                              {index === 0 && <span className="rounded-full bg-green-100 px-2 py-0.5">125</span>}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Popular Searches */}
                  <div className="rounded-lg border">
                    <div className="border-b bg-gray-50 p-4">
                      <h2 className="text-lg font-bold">Tìm kiếm phổ biến</h2>
                    </div>
                    <div className="p-4">
                      <div className="flex flex-wrap gap-2">
                        {[
                          "React Developer",
                          "Marketing",
                          "Kế toán",
                          "Nhân sự",
                          "Java",
                          "Sales",
                          "Tiếng Anh",
                          "Quản lý",
                          "Remote",
                          "Thực tập",
                        ].map((term, index) => (
                          <Link
                            key={index}
                            to="#"
                            className="rounded-full bg-gray-100 px-3 py-1 text-sm hover:bg-green-100 hover:text-green-600"
                          >
                            {term}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Job Alert */}
                  <div className="rounded-lg border bg-green-50 p-4">
                    <h3 className="mb-2 font-semibold text-green-700">Nhận thông báo việc làm mới</h3>
                    <p className="mb-4 text-sm text-green-600">
                      Đăng ký để nhận thông báo về các cơ hội việc làm mới phù hợp với bạn
                    </p>
                    <Button className="w-full bg-green-600 hover:bg-green-700">Đăng ký ngay</Button>
                  </div>
                </div>
              </div>

              {/* Job Listings */}
              <div className="lg:col-span-3">
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="mb-6 grid w-full grid-cols-3">
                    <TabsTrigger value="all">Tất cả</TabsTrigger>
                    <TabsTrigger value="featured">Việc làm nổi bật</TabsTrigger>
                    <TabsTrigger value="recent">Việc làm mới nhất</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-6">
                    {/* Featured Jobs Section */}
                    <div>
                      <h2 className="mb-4 text-xl font-bold">Việc làm nổi bật</h2>
                      <div className="space-y-4">
                        {featuredJobs.map((job) => (
                          <Link
                            to={`/viec-lam/${job.id}`}
                            key={job.id}
                            className="block rounded-lg border bg-white p-4 shadow-sm transition-all hover:shadow-md"
                          >
                            <div className="flex gap-4">
                              <div className="hidden sm:block">
                                <div className="flex h-16 w-16 items-center justify-center rounded-lg border bg-gray-100">
                                  <Building className="h-8 w-8 text-gray-400" />
                                </div>
                              </div>
                              <div className="flex-grow">
                                <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                                  <h3 className="font-semibold text-green-600">{job.title}</h3>
                                  <div className="flex flex-wrap gap-2">
                                    {job.featured && (
                                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-600">
                                        Nổi bật
                                      </span>
                                    )}
                                    {job.urgent && (
                                      <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-600">
                                        Gấp
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <p className="mb-2 font-medium">{job.company}</p>
                                <div className="mb-3 flex flex-wrap gap-2 text-sm text-gray-600">
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-3.5 w-3.5" />
                                    {job.location}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Wallet className="h-3.5 w-3.5" />
                                    {job.salary}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3.5 w-3.5" />
                                    {job.type}
                                  </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {job.tags.map((tag, index) => (
                                    <span
                                      key={index}
                                      className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button variant="link" className="text-green-600">
                          Xem tất cả việc làm nổi bật <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Recent Jobs Section */}
                    <div>
                      <h2 className="mb-4 text-xl font-bold">Việc làm mới nhất</h2>
                      <div className="space-y-4">
                        {recentJobs.slice(0, 5).map((job) => (
                          <Link
                            to={`/viec-lam/${job.id}`}
                            key={job.id}
                            className="block rounded-lg border bg-white p-4 shadow-sm transition-all hover:shadow-md"
                          >
                            <div className="flex gap-4">
                              <div className="hidden sm:block">
                                <div className="flex h-16 w-16 items-center justify-center rounded-lg border bg-gray-100">
                                  <Building className="h-8 w-8 text-gray-400" />
                                </div>
                              </div>
                              <div className="flex-grow">
                                <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                                  <h3 className="font-semibold text-green-600">{job.title}</h3>
                                  <div className="flex flex-wrap gap-2">
                                    {job.featured && (
                                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-600">
                                        Nổi bật
                                      </span>
                                    )}
                                    {job.urgent && (
                                      <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-600">
                                        Gấp
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <p className="mb-2 font-medium">{job.company}</p>
                                <div className="mb-3 flex flex-wrap gap-2 text-sm text-gray-600">
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-3.5 w-3.5" />
                                    {job.location}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Wallet className="h-3.5 w-3.5" />
                                    {job.salary}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3.5 w-3.5" />
                                    {job.type}
                                  </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {job.tags.slice(0, 3).map((tag, index) => (
                                    <span
                                      key={index}
                                      className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button variant="link" className="text-green-600">
                          Xem tất cả việc làm mới <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Jobs by Category */}
                    <div>
                      <h2 className="mb-4 text-xl font-bold">Việc làm theo ngành nghề</h2>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {[
                          "Công nghệ thông tin",
                          "Marketing",
                          "Tài chính - Kế toán",
                          "Nhân sự",
                          "Kinh doanh",
                          "Hành chính - Văn phòng",
                        ].map((category, index) => (
                          <Link
                            to="#"
                            key={index}
                            className="flex items-center gap-3 rounded-lg border p-4 transition-colors hover:border-green-200 hover:bg-green-50"
                          >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                              <Briefcase className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <h3 className="font-medium">{category}</h3>
                              <p className="text-sm text-gray-500">{(index + 1) * 24} việc làm</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-4 flex justify-center">
                        <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                          Xem tất cả ngành nghề
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="featured" className="space-y-4">
                    {/* All Featured Jobs */}
                    {[...featuredJobs, ...recentJobs.filter((job) => job.featured)].map((job) => (
                      <Link
                        to={`/viec-lam/${job.id}`}
                        key={`featured-${job.id}`}
                        className="block rounded-lg border bg-white p-4 shadow-sm transition-all hover:shadow-md"
                      >
                        <div className="flex gap-4">
                          <div className="hidden sm:block">
                            <div className="flex h-16 w-16 items-center justify-center rounded-lg border bg-gray-100">
                              <Building className="h-8 w-8 text-gray-400" />
                            </div>
                          </div>
                          <div className="flex-grow">
                            <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                              <h3 className="font-semibold text-green-600">{job.title}</h3>
                              <div className="flex flex-wrap gap-2">
                                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-600">
                                  Nổi bật
                                </span>
                                {job.urgent && (
                                  <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-600">
                                    Gấp
                                  </span>
                                )}
                              </div>
                            </div>
                            <p className="mb-2 font-medium">{job.company}</p>
                            <div className="mb-3 flex flex-wrap gap-2 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5" />
                                {job.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Wallet className="h-3.5 w-3.5" />
                                {job.salary}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {job.type}
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {job.tags.slice(0, 3).map((tag, index) => (
                                <span
                                  key={index}
                                  className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}

                    <div className="mt-8 flex justify-center">
                      <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                        Xem thêm việc làm nổi bật
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="recent" className="space-y-4">
                    {/* All Recent Jobs */}
                    {recentJobs.map((job) => (
                      <Link
                        to={`/viec-lam/${job.id}`}
                        key={`recent-${job.id}`}
                        className="block rounded-lg border bg-white p-4 shadow-sm transition-all hover:shadow-md"
                      >
                        <div className="flex gap-4">
                          <div className="hidden sm:block">
                            <div className="flex h-16 w-16 items-center justify-center rounded-lg border bg-gray-100">
                              <Building className="h-8 w-8 text-gray-400" />
                            </div>
                          </div>
                          <div className="flex-grow">
                            <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                              <h3 className="font-semibold text-green-600">{job.title}</h3>
                              <div className="flex flex-wrap gap-2">
                                {job.featured && (
                                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-600">
                                    Nổi bật
                                  </span>
                                )}
                                {job.urgent && (
                                  <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-600">
                                    Gấp
                                  </span>
                                )}
                              </div>
                            </div>
                            <p className="mb-2 font-medium">{job.company}</p>
                            <div className="mb-3 flex flex-wrap gap-2 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5" />
                                {job.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Wallet className="h-3.5 w-3.5" />
                                {job.salary}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {job.type}
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {job.tags.slice(0, 3).map((tag, index) => (
                                <span
                                  key={index}
                                  className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}

                    <div className="mt-8 flex justify-center">
                      <div className="flex items-center gap-1">
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <span className="sr-only">Trang trước</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <polyline points="15 18 9 12 15 6"></polyline>
                          </svg>
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-green-600 text-white">
                          1
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          2
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          3
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          ...
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          8
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <span className="sr-only">Trang tiếp</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-green-600 py-12 text-white">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold">Bạn là nhà tuyển dụng?</h2>
              <p className="mb-6">Đăng tin tuyển dụng và tiếp cận hàng triệu ứng viên tiềm năng ngay hôm nay</p>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/nha-tuyen-dung">Đăng tin tuyển dụng</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
