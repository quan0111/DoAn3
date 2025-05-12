import { Header } from "@/components/Header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Link } from "react-router-dom"
import { ArrowUpRight, Calendar, Info } from "lucide-react"

export default function PostJobPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Header */}
        <section className="border-b bg-gray-50 py-8">
          <div className="container">
            <h1 className="text-3xl font-bold">Đăng tin tuyển dụng</h1>
            <p className="mt-2 text-gray-500">Tạo tin tuyển dụng để tiếp cận hàng triệu ứng viên tiềm năng</p>
          </div>
        </section>

        {/* Job Posting Form */}
        <section className="py-12">
          <div className="container">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              {/* Main Form */}
              <div className="lg:col-span-2">
                <div className="space-y-8">
                  {/* Basic Info */}
                  <div className="rounded-lg border">
                    <div className="border-b bg-gray-50 p-4">
                      <h2 className="text-xl font-bold">Thông tin cơ bản</h2>
                    </div>
                    <div className="space-y-4 p-4">
                      <div className="grid gap-2">
                        <label htmlFor="jobTitle" className="text-sm font-medium">
                          Chức danh công việc <span className="text-red-500">*</span>
                        </label>
                        <Input id="jobTitle" placeholder="VD: Nhân viên kinh doanh, Kỹ sư phần mềm,..." />
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                          <label htmlFor="jobType" className="text-sm font-medium">
                            Hình thức làm việc <span className="text-red-500">*</span>
                          </label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn hình thức" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="full-time">Toàn thời gian</SelectItem>
                              <SelectItem value="part-time">Bán thời gian</SelectItem>
                              <SelectItem value="contract">Theo hợp đồng</SelectItem>
                              <SelectItem value="internship">Thực tập</SelectItem>
                              <SelectItem value="remote">Từ xa</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <label htmlFor="jobCategory" className="text-sm font-medium">
                            Ngành nghề <span className="text-red-500">*</span>
                          </label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn ngành nghề" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="it">Công nghệ thông tin</SelectItem>
                              <SelectItem value="marketing">Marketing</SelectItem>
                              <SelectItem value="sales">Kinh doanh</SelectItem>
                              <SelectItem value="finance">Tài chính - Kế toán</SelectItem>
                              <SelectItem value="hr">Nhân sự</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                          <label htmlFor="experienceLevel" className="text-sm font-medium">
                            Kinh nghiệm <span className="text-red-500">*</span>
                          </label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn kinh nghiệm" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="any">Không yêu cầu</SelectItem>
                              <SelectItem value="entry">Dưới 1 năm</SelectItem>
                              <SelectItem value="mid">1-3 năm</SelectItem>
                              <SelectItem value="senior">3-5 năm</SelectItem>
                              <SelectItem value="expert">Trên 5 năm</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <label htmlFor="jobLevel" className="text-sm font-medium">
                            Cấp bậc <span className="text-red-500">*</span>
                          </label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn cấp bậc" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="intern">Thực tập sinh</SelectItem>
                              <SelectItem value="staff">Nhân viên</SelectItem>
                              <SelectItem value="leader">Trưởng nhóm</SelectItem>
                              <SelectItem value="manager">Quản lý</SelectItem>
                              <SelectItem value="director">Giám đốc</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                          <label htmlFor="education" className="text-sm font-medium">
                            Yêu cầu bằng cấp <span className="text-red-500">*</span>
                          </label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn bằng cấp" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">Không yêu cầu</SelectItem>
                              <SelectItem value="high-school">Trung học</SelectItem>
                              <SelectItem value="college">Cao đẳng</SelectItem>
                              <SelectItem value="bachelor">Đại học</SelectItem>
                              <SelectItem value="master">Sau đại học</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <label htmlFor="positions" className="text-sm font-medium">
                            Số lượng tuyển <span className="text-red-500">*</span>
                          </label>
                          <Input id="positions" type="number" min="1" placeholder="VD: 2" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Salary */}
                  <div className="rounded-lg border">
                    <div className="border-b bg-gray-50 p-4">
                      <h2 className="text-xl font-bold">Mức lương</h2>
                    </div>
                    <div className="space-y-4 p-4">
                      <div className="flex items-center space-x-2">
                        <Switch id="salary-display" />
                        <label htmlFor="salary-display" className="text-sm font-medium">
                          Hiển thị mức lương
                        </label>
                      </div>

                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="col-span-2 grid gap-2">
                          <label className="text-sm font-medium">Loại lương</label>
                          <RadioGroup defaultValue="range" className="flex">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="range" id="range" />
                              <label htmlFor="range" className="text-sm">
                                Khoảng
                              </label>
                            </div>
                            <div className="ml-4 flex items-center space-x-2">
                              <RadioGroupItem value="fixed" id="fixed" />
                              <label htmlFor="fixed" className="text-sm">
                                Cố định
                              </label>
                            </div>
                            <div className="ml-4 flex items-center space-x-2">
                              <RadioGroupItem value="negotiable" id="negotiable" />
                              <label htmlFor="negotiable" className="text-sm">
                                Thỏa thuận
                              </label>
                            </div>
                          </RadioGroup>
                        </div>
                        <div className="grid gap-2">
                          <label htmlFor="currency" className="text-sm font-medium">
                            Tiền tệ
                          </label>
                          <Select defaultValue="vnd">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="vnd">VND</SelectItem>
                              <SelectItem value="usd">USD</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                          <label htmlFor="minSalary" className="text-sm font-medium">
                            Lương tối thiểu
                          </label>
                          <Input id="minSalary" type="number" placeholder="VD: 10000000" />
                        </div>
                        <div className="grid gap-2">
                          <label htmlFor="maxSalary" className="text-sm font-medium">
                            Lương tối đa
                          </label>
                          <Input id="maxSalary" type="number" placeholder="VD: 15000000" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="rounded-lg border">
                    <div className="border-b bg-gray-50 p-4">
                      <h2 className="text-xl font-bold">Địa điểm làm việc</h2>
                    </div>
                    <div className="space-y-4 p-4">
                      <div className="grid gap-2">
                        <label htmlFor="workLocation" className="text-sm font-medium">
                          Tỉnh/Thành phố <span className="text-red-500">*</span>
                        </label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn tỉnh/thành phố" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hanoi">Hà Nội</SelectItem>
                            <SelectItem value="hcm">TP. Hồ Chí Minh</SelectItem>
                            <SelectItem value="danang">Đà Nẵng</SelectItem>
                            <SelectItem value="other">Khác</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid gap-2">
                        <label htmlFor="workAddress" className="text-sm font-medium">
                          Địa chỉ cụ thể
                        </label>
                        <Input id="workAddress" placeholder="VD: 123 Đường Nguyễn Huệ, Quận 1" />
                      </div>
                    </div>
                  </div>

                  {/* Job Description */}
                  <div className="rounded-lg border">
                    <div className="border-b bg-gray-50 p-4">
                      <h2 className="text-xl font-bold">Chi tiết công việc</h2>
                    </div>
                    <div className="space-y-4 p-4">
                      <div className="grid gap-2">
                        <label htmlFor="jobDescription" className="text-sm font-medium">
                          Mô tả công việc <span className="text-red-500">*</span>
                        </label>
                        <Textarea id="jobDescription" placeholder="Mô tả chi tiết công việc, trách nhiệm..." rows={6} />
                      </div>

                      <div className="grid gap-2">
                        <label htmlFor="jobRequirements" className="text-sm font-medium">
                          Yêu cầu công việc <span className="text-red-500">*</span>
                        </label>
                        <Textarea
                          id="jobRequirements"
                          placeholder="Các kỹ năng, kinh nghiệm, bằng cấp yêu cầu..."
                          rows={6}
                        />
                      </div>

                      <div className="grid gap-2">
                        <label htmlFor="benefits" className="text-sm font-medium">
                          Quyền lợi <span className="text-red-500">*</span>
                        </label>
                        <Textarea
                          id="benefits"
                          placeholder="Các quyền lợi, chế độ đãi ngộ dành cho ứng viên..."
                          rows={6}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Deadline */}
                  <div className="rounded-lg border">
                    <div className="border-b bg-gray-50 p-4">
                      <h2 className="text-xl font-bold">Thời hạn ứng tuyển</h2>
                    </div>
                    <div className="space-y-4 p-4">
                      <div className="grid gap-2">
                        <label htmlFor="deadline" className="text-sm font-medium">
                          Hạn nộp hồ sơ <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input id="deadline" type="date" className="pl-10" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Preview Button */}
                  <Button className="w-full" variant="outline">
                    Xem trước
                  </Button>

                  {/* Submit Button */}
                  <Button className="w-full bg-green-600 hover:bg-green-700">Đăng tin tuyển dụng</Button>

                  {/* Job Posting Tips */}
                  <div className="rounded-lg border p-4">
                    <div className="mb-4 flex items-center gap-2 text-lg font-semibold">
                      <Info className="h-5 w-5 text-green-600" />
                      <h3>Mẹo đăng tin hiệu quả</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-green-600"></div>
                        <span>Tiêu đề đầy đủ thông tin và thu hút</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-green-600"></div>
                        <span>Mô tả công việc chi tiết, rõ ràng</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-green-600"></div>
                        <span>Liệt kê cụ thể các yêu cầu và quyền lợi</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-green-600"></div>
                        <span>Hiển thị mức lương để thu hút ứng viên</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-green-600"></div>
                        <span>Cập nhật thông tin công ty đầy đủ</span>
                      </li>
                    </ul>
                    <Link
                      to="#"
                      className="mt-4 flex items-center justify-end text-sm text-green-600 hover:underline"
                    >
                      Xem thêm mẹo <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                    </Link>
                  </div>

                  {/* Package Info */}
                  <div className="rounded-lg border p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="font-semibold">Gói dịch vụ hiện tại</h3>
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-600">
                        Đang hoạt động
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Gói dịch vụ:</span>
                        <span className="font-medium">Cơ bản</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Tin đăng còn lại:</span>
                        <span className="font-medium">5 tin</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Ngày hết hạn:</span>
                        <span className="font-medium">10/06/2023</span>
                      </div>
                    </div>
                    <Button variant="outline" className="mt-4 w-full">
                      Nâng cấp gói
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
