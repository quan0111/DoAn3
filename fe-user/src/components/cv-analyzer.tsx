"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, CheckCircle, AlertCircle, ArrowRight } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface CVPDFAnalyzerProps {
  file: File
  onAnalysisComplete: (data: any) => void
  onCancel: () => void
}

export function CVPDFAnalyzer({ file, onAnalysisComplete, onCancel }: CVPDFAnalyzerProps) {
  const [activeTab, setActiveTab] = useState("preview")
  const [analysisStatus, setAnalysisStatus] = useState<"analyzing" | "success" | "error">("analyzing")
  const [progress, setProgress] = useState(0)

  // Giả lập quá trình phân tích
  useState(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 5
        if (newProgress >= 100) {
          clearInterval(interval)
          setAnalysisStatus("success")
        }
        return newProgress
      })
    }, 200)

    return () => clearInterval(interval)
  })

  const handleContinue = () => {
    // Giả định dữ liệu trích xuất từ PDF
    onAnalysisComplete({
      personalInfo: {
        firstName: "Nguyễn",
        lastName: "Văn A",
        jobTitle: "Kỹ sư phần mềm",
        email: "nguyenvana@example.com",
        phone: "0901234567",
      },
      experience: [
        {
          company: "Công ty ABC",
          position: "Kỹ sư phần mềm",
          startDate: "01/2020",
          endDate: "Hiện tại",
          description: "Phát triển và bảo trì các ứng dụng web sử dụng React và Node.js.",
        },
      ],
      education: [
        {
          school: "Đại học Bách Khoa Hà Nội",
          degree: "Kỹ sư",
          field: "Công nghệ thông tin",
          graduationYear: "2019",
        },
      ],
      skills: ["JavaScript", "React", "Node.js", "TypeScript", "Git"],
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-green-600" />
          <span>Phân tích CV PDF</span>
        </CardTitle>
        <CardDescription>
          Hệ thống đang phân tích CV của bạn để trích xuất thông tin. Quá trình này có thể mất vài giây.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preview">Xem trước</TabsTrigger>
            <TabsTrigger value="extracted" disabled={analysisStatus !== "success"}>
              Thông tin trích xuất
            </TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="mt-4">
            <div className="flex h-[400px] items-center justify-center rounded-md border bg-gray-50">
              <div className="text-center">
                <FileText className="mx-auto mb-2 h-12 w-12 text-gray-400" />
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="extracted" className="mt-4">
            {analysisStatus === "success" && (
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 font-medium">Thông tin cá nhân</h3>
                  <div className="rounded-md border p-3">
                    <p>
                      <span className="font-medium">Họ và tên:</span> Nguyễn Văn A
                    </p>
                    <p>
                      <span className="font-medium">Vị trí:</span> Kỹ sư phần mềm
                    </p>
                    <p>
                      <span className="font-medium">Email:</span> nguyenvana@example.com
                    </p>
                    <p>
                      <span className="font-medium">Số điện thoại:</span> 0901234567
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 font-medium">Kinh nghiệm làm việc</h3>
                  <div className="rounded-md border p-3">
                    <p>
                      <span className="font-medium">Công ty:</span> Công ty ABC
                    </p>
                    <p>
                      <span className="font-medium">Vị trí:</span> Kỹ sư phần mềm
                    </p>
                    <p>
                      <span className="font-medium">Thời gian:</span> 01/2020 - Hiện tại
                    </p>
                    <p>
                      <span className="font-medium">Mô tả:</span> Phát triển và bảo trì các ứng dụng web sử dụng React
                      và Node.js.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 font-medium">Học vấn</h3>
                  <div className="rounded-md border p-3">
                    <p>
                      <span className="font-medium">Trường:</span> Đại học Bách Khoa Hà Nội
                    </p>
                    <p>
                      <span className="font-medium">Bằng cấp:</span> Kỹ sư
                    </p>
                    <p>
                      <span className="font-medium">Chuyên ngành:</span> Công nghệ thông tin
                    </p>
                    <p>
                      <span className="font-medium">Tốt nghiệp:</span> 2019
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 font-medium">Kỹ năng</h3>
                  <div className="flex flex-wrap gap-2">
                    {["JavaScript", "React", "Node.js", "TypeScript", "Git"].map((skill, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {analysisStatus === "analyzing" && (
          <div className="mt-4 space-y-2">
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div className="h-full rounded-full bg-green-600 transition-all" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-center text-sm text-gray-500">
              {progress < 30
                ? "Đang tải lên..."
                : progress < 60
                  ? "Đang phân tích nội dung..."
                  : "Đang trích xuất thông tin..."}
            </p>
          </div>
        )}

        {analysisStatus === "success" && (
          <Alert className="mt-4 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Phân tích thành công</AlertTitle>
            <AlertDescription className="text-green-700">
              CV của bạn đã được phân tích thành công. Thông tin đã được trích xuất và sẵn sàng để chỉnh sửa.
            </AlertDescription>
          </Alert>
        )}

        {analysisStatus === "error" && (
          <Alert className="mt-4" variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Lỗi phân tích</AlertTitle>
            <AlertDescription>
              Có lỗi xảy ra khi phân tích CV của bạn. Vui lòng thử lại hoặc sử dụng file PDF khác.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Hủy
        </Button>
        <Button
          className="gap-1 bg-green-600 hover:bg-green-700"
          disabled={analysisStatus !== "success"}
          onClick={handleContinue}
        >
          Tiếp tục chỉnh sửa
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
