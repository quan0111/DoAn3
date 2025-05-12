import { Header } from "@/components/Header"
import { Footer } from "@/components/footer"
import { CVEditorForm } from "@/components/cv-editor"
import { CVSectionNavigation } from "@/components/cv-section-navigation"
import { CVTemplatePreview } from "@/components/cv-template-review"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Download, Eye, ArrowLeft, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

export default function CreateCVPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Header */}
        <section className="border-b bg-gray-50 py-4">
          <div className="container">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">Tạo CV Chuyên Nghiệp</h1>
                <p className="text-gray-500">Điền thông tin của bạn để tạo CV ấn tượng</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Save className="h-4 w-4" />
                  <span className="hidden sm:inline">Lưu bản nháp</span>
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Eye className="h-4 w-4" />
                  <span className="hidden sm:inline">Xem trước</span>
                </Button>
                <Button size="sm" className="gap-1 bg-green-600 hover:bg-green-700">
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Tải xuống PDF</span>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8">
          <div className="container">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
              {/* Step Indicator - Mobile Only */}
              <div className="lg:hidden">
                <div className="mb-4 flex justify-between px-2">
                  <span className="text-sm font-medium">Bước 2/5: Thông tin cá nhân</span>
                  <span className="text-sm text-gray-500">40% hoàn thành</span>
                </div>
                <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                  <div className="h-full w-2/5 rounded-full bg-green-600"></div>
                </div>
              </div>

              {/* Left Sidebar - Section Navigation */}
              <div className="hidden lg:col-span-1 lg:block">
                <CVSectionNavigation />
              </div>

              {/* Main Content Area */}
              <div className="lg:col-span-2">
                <Tabs defaultValue="content" className="w-full">
                  <TabsList className="mb-6 grid w-full grid-cols-2">
                    <TabsTrigger value="content">Nội dung</TabsTrigger>
                    <TabsTrigger value="design">Thiết kế</TabsTrigger>
                  </TabsList>

                  <TabsContent value="content" className="mt-0">
                    <CVEditorForm />
                  </TabsContent>

                  <TabsContent value="design" className="mt-0">
                    <div className="space-y-8">
                      <div>
                        <h2 className="mb-4 text-lg font-medium">Chọn mẫu CV</h2>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                          {[1, 2, 3, 4, 5, 6].map((templateId) => (
                            <div
                              key={templateId}
                              className={`group relative cursor-pointer overflow-hidden rounded-lg border ${
                                templateId === 1 ? "ring-2 ring-green-600" : ""
                              } transition-all hover:shadow-md`}
                            >
                              <img
                                src={`/placeholder.svg?height=320&width=240&text=Mẫu ${templateId}`}
                                alt={`Mẫu CV ${templateId}`}
                                className="h-40 w-full object-cover"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                                <Button size="sm" variant="secondary">
                                  Chọn
                                </Button>
                              </div>
                              <div className="p-2 text-center text-sm">
                                {templateId === 1 && (
                                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-600">
                                    Đã chọn
                                  </span>
                                )}
                                <p className={templateId === 1 ? "font-medium text-green-600" : ""}>Mẫu {templateId}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h2 className="mb-4 text-lg font-medium">Màu sắc</h2>
                        <div className="flex flex-wrap gap-3">
                          {[
                            "bg-green-600",
                            "bg-blue-600",
                            "bg-red-600",
                            "bg-purple-600",
                            "bg-orange-600",
                            "bg-teal-600",
                            "bg-pink-600",
                            "bg-gray-800",
                          ].map((color, index) => (
                            <div
                              key={index}
                              className={`h-8 w-8 cursor-pointer rounded-full ${color} ${
                                index === 0 ? "ring-2 ring-offset-2" : ""
                              }`}
                            ></div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h2 className="mb-4 text-lg font-medium">Font chữ</h2>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                          {["Arial", "Roboto", "Montserrat", "Open Sans", "Lato", "Playfair Display"].map(
                            (font, index) => (
                              <div
                                key={index}
                                className={`cursor-pointer rounded-lg border p-3 text-center ${
                                  index === 0 ? "border-green-600 bg-green-50" : ""
                                }`}
                              >
                                <span className={index === 0 ? "font-medium text-green-600" : ""}>{font}</span>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Navigation Buttons */}
                <div className="mt-8 flex justify-between">
                  <Button variant="outline" className="gap-1">
                    <ArrowLeft className="h-4 w-4" />
                    Quay lại
                  </Button>
                  <Button className="gap-1 bg-green-600 hover:bg-green-700">
                    Tiếp theo
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Right Sidebar - Preview */}
              <div className="lg:col-span-2">
                <CVTemplatePreview />
              </div>
            </div>
          </div>
        </section>

        {/* Related CV Templates */}
        <section className="border-t bg-gray-50 py-12">
          <div className="container">
            <h2 className="mb-6 text-2xl font-bold">Mẫu CV khác</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[1, 2, 3, 4].map((id) => (
                <Link to="/" key={id} className="group block">
                  <div className="overflow-hidden rounded-lg border bg-white shadow transition-all hover:shadow-md">
                    <div className="relative">
                      <img
                        src={`/placeholder.svg?height=500&width=350&text=Mẫu ${id}`}
                        alt={`Mẫu CV ${id}`}
                        className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="flex h-full items-center justify-center">
                          <Button className="bg-green-600 hover:bg-green-700">Sử dụng mẫu này</Button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="mb-1 font-semibold">CV Chuyên Nghiệp {id}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {id % 3 === 0 ? "Sáng tạo" : id % 2 === 0 ? "Hiện đại" : "Truyền thống"}
                        </span>
                        <span className={`text-sm ${id % 2 === 0 ? "text-green-600" : "text-gray-500"}`}>
                          {id % 2 === 0 ? "Miễn phí" : "Cao cấp"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
