"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CVUploadButton } from "./cv-upload-button"
import { FileText, FileUp, Import, ArrowRight } from "lucide-react"

interface CVImportSectionProps {
  onImportComplete?: (data: any) => void
}

export function CVImportSection({ onImportComplete }: CVImportSectionProps) {
  const handleUploadComplete = (data: any) => {
    if (onImportComplete) {
      onImportComplete(data)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Nhập CV của bạn</CardTitle>
        <CardDescription>
          Bạn có thể tải lên CV PDF có sẵn hoặc nhập từ các nền tảng khác để tiết kiệm thời gian.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col items-center rounded-lg border p-6 text-center transition-colors hover:bg-gray-50">
            <div className="mb-4 rounded-full bg-green-100 p-3">
              <FileUp className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mb-2 font-medium">Tải lên CV PDF</h3>
            <p className="mb-4 text-sm text-gray-500">
              Tải lên CV PDF có sẵn để hệ thống tự động trích xuất thông tin.
            </p>
            <CVUploadButton
              onUploadComplete={handleUploadComplete}
              className="mt-auto bg-green-600 hover:bg-green-700"
              variant="default"
            />
          </div>

          <div className="flex flex-col items-center rounded-lg border p-6 text-center transition-colors hover:bg-gray-50">
            <div className="mb-4 rounded-full bg-blue-100 p-3">
              <Import className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="mb-2 font-medium">Nhập từ nền tảng khác</h3>
            <p className="mb-4 text-sm text-gray-500">Nhập CV từ LinkedIn, Indeed hoặc các nền tảng tìm việc khác.</p>
            <Button variant="outline" className="mt-auto gap-2">
              <FileText className="h-4 w-4" />
              <span>Nhập từ nền tảng khác</span>
            </Button>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <Button variant="link" className="px-0 text-green-600">
            Tìm hiểu thêm về nhập CV
          </Button>
          <Button className="gap-1 bg-green-600 hover:bg-green-700">
            Tạo CV mới
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
