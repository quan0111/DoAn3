"use client"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { useState } from "react"
import { CalendarIcon, ImageIcon, Trash2, Plus } from "lucide-react"

export function CVEditorForm() {
  const [birthDate, setBirthDate] = useState<Date>()

  return (
    <div className="space-y-8">
      {/* Thông tin cá nhân */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Thông tin cá nhân</h2>
          <p className="text-sm text-gray-500">Thông tin cơ bản cho CV của bạn</p>
        </div>

        {/* Ảnh đại diện */}
        <div className="flex flex-col items-center sm:flex-row sm:items-start sm:gap-4">
          <div className="mb-4 flex flex-col items-center sm:mb-0">
            <div className="relative mb-2 h-32 w-32 overflow-hidden rounded-full border-2 border-gray-200">
              <img
                src="/placeholder.svg?height=128&width=128&text=Ảnh"
                alt="Ảnh đại diện"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100">
                <Button size="sm" variant="secondary" className="gap-1">
                  <ImageIcon className="h-4 w-4" />
                  Thay đổi
                </Button>
              </div>
            </div>
            <div className="text-center text-sm text-gray-500">
              <p>Kéo thả hoặc</p>
              <Button variant="link" className="h-auto p-0 text-sm text-green-600">
                tải ảnh lên
              </Button>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium">
                  Họ <span className="text-red-500">*</span>
                </label>
                <Input id="firstName" placeholder="Nhập họ của bạn" />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium">
                  Tên <span className="text-red-500">*</span>
                </label>
                <Input id="lastName" placeholder="Nhập tên của bạn" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="jobTitle" className="text-sm font-medium">
                Vị trí ứng tuyển <span className="text-red-500">*</span>
              </label>
              <Input id="jobTitle" placeholder="Vd: Kỹ sư phần mềm, Quản lý Marketing,..." />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <Input id="email" type="email" placeholder="example@email.com" />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <Input id="phone" placeholder="Vd: 0901234567" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="birthDate" className="text-sm font-medium">
              Ngày sinh
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !birthDate && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {birthDate ? format(birthDate, "dd/MM/yyyy") : "DD/MM/YYYY"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={birthDate} onSelect={setBirthDate} initialFocus locale={vi} />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <label htmlFor="gender" className="text-sm font-medium">
              Giới tính
            </label>
            <Select>
              <SelectTrigger id="gender">
                <SelectValue placeholder="Chọn giới tính" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Nam</SelectItem>
                <SelectItem value="female">Nữ</SelectItem>
                <SelectItem value="other">Khác</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="address" className="text-sm font-medium">
              Địa chỉ
            </label>
            <Input id="address" placeholder="Vd: 123 Đường ABC, Quận XYZ" />
          </div>
          <div className="space-y-2">
            <label htmlFor="city" className="text-sm font-medium">
              Thành phố
            </label>
            <Select>
              <SelectTrigger id="city">
                <SelectValue placeholder="Chọn thành phố" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hanoi">Hà Nội</SelectItem>
                <SelectItem value="hcm">TP. Hồ Chí Minh</SelectItem>
                <SelectItem value="danang">Đà Nẵng</SelectItem>
                <SelectItem value="other">Khác</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="website" className="text-sm font-medium">
            Website cá nhân / Portfolio
          </label>
          <Input id="website" placeholder="Vd: https://portfolio.example.com" />
        </div>

        <div className="space-y-2">
          <label htmlFor="summary" className="text-sm font-medium">
            Tóm tắt bản thân
          </label>
          <Textarea
            id="summary"
            placeholder="Giới thiệu ngắn gọn về bản thân, kinh nghiệm và mục tiêu nghề nghiệp..."
            rows={4}
          />
        </div>
      </div>

      {/* Mạng xã hội */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Mạng xã hội</h2>
          <p className="text-sm text-gray-500">Thêm các liên kết hồ sơ trực tuyến của bạn</p>
        </div>

        <div className="space-y-4">
          {/* LinkedIn */}
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <svg className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </div>
            <div className="flex-1">
              <Input placeholder="LinkedIn URL" />
            </div>
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-red-500">
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>

          {/* GitHub */}
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
              <svg className="h-5 w-5 text-gray-800" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <Input placeholder="GitHub URL" />
            </div>
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-red-500">
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Nút thêm mạng xã hội */}
          <Button variant="outline" className="w-full gap-1">
            <Plus className="h-4 w-4" />
            Thêm mạng xã hội
          </Button>
        </div>
      </div>
    </div>
  )
}
