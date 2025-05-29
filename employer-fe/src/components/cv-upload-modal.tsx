"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { FileUp, Upload, AlertCircle, CheckCircle, FileText } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface CVUploadModalProps {
  isOpen: boolean
  onClose: () => void
  onUploadComplete: (data: any) => void
}

export function CVUploadModal({ isOpen, onClose, onUploadComplete }: CVUploadModalProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")
  const [progress, setProgress] = useState(0)
  const [errorMessage, setErrorMessage] = useState("")

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile)
      setErrorMessage("")
    } else {
      setErrorMessage("Chỉ chấp nhận file PDF. Vui lòng thử lại.")
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile)
        setErrorMessage("")
      } else {
        setErrorMessage("Chỉ chấp nhận file PDF. Vui lòng thử lại.")
      }
    }
  }

  const handleUpload = () => {
    if (!file) return

    setUploadStatus("uploading")
    setProgress(0)

    // Giả lập quá trình tải lên và phân tích PDF
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 10
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setUploadStatus("success")
            // Giả định dữ liệu trích xuất từ PDF
            onUploadComplete({
              personalInfo: {
                firstName: "Nguyễn",
                lastName: "Văn A",
                jobTitle: "Kỹ sư phần mềm",
                email: "nguyenvana@example.com",
                phone: "0901234567",
                // Các thông tin khác...
              },
              // Các phần khác của CV...
            })
          }, 500)
        }
        return newProgress
      })
    }, 300)
  }

  const resetState = () => {
    setFile(null)
    setUploadStatus("idle")
    setProgress(0)
    setErrorMessage("")
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          resetState()
          onClose()
        }
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Tải lên CV PDF</DialogTitle>
          <DialogDescription>
            Tải lên CV PDF có sẵn để chỉnh sửa. Hệ thống sẽ tự động trích xuất thông tin từ CV của bạn.
          </DialogDescription>
        </DialogHeader>

        {uploadStatus === "idle" && (
          <>
            <div
              className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
                isDragging ? "border-green-500 bg-green-50" : "border-gray-300"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {!file ? (
                <>
                  <FileUp className="mb-2 h-10 w-10 text-gray-400" />
                  <p className="mb-2 text-sm font-medium">Kéo và thả file PDF vào đây hoặc</p>
                  <Button variant="outline" className="relative" size="sm">
                    Chọn file
                    <input
                      type="file"
                      className="absolute inset-0 cursor-pointer opacity-0"
                      accept=".pdf"
                      onChange={handleFileChange}
                    />
                  </Button>
                  <p className="mt-2 text-xs text-gray-500">Chỉ chấp nhận file PDF, tối đa 10MB</p>
                </>
              ) : (
                <div className="flex w-full items-center gap-3">
                  <FileText className="h-8 w-8 shrink-0 text-green-600" />
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate font-medium">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="shrink-0 text-gray-500 hover:text-red-500"
                    onClick={() => setFile(null)}
                  >
                    Xóa
                  </Button>
                </div>
              )}
            </div>

            {errorMessage && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Lỗi</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
          </>
        )}

        {uploadStatus === "uploading" && (
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-3">
              <Upload className="h-5 w-5 animate-pulse text-green-600" />
              <div className="flex-1">
                <p className="font-medium">Đang xử lý CV của bạn</p>
                <p className="text-sm text-gray-500">Vui lòng đợi trong giây lát...</p>
              </div>
            </div>
            <Progress value={progress} className="h-2 w-full" />
            <p className="text-center text-sm text-gray-500">
              {progress < 50 ? "Đang tải lên..." : "Đang trích xuất thông tin..."}
            </p>
          </div>
        )}

        {uploadStatus === "success" && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Thành công</AlertTitle>
            <AlertDescription className="text-green-700">
              CV của bạn đã được tải lên và phân tích thành công. Bạn có thể tiếp tục chỉnh sửa.
            </AlertDescription>
          </Alert>
        )}

        {uploadStatus === "error" && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Lỗi xử lý</AlertTitle>
            <AlertDescription>
              Có lỗi xảy ra khi xử lý CV của bạn. Vui lòng thử lại hoặc sử dụng file PDF khác.
            </AlertDescription>
          </Alert>
        )}

        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          {uploadStatus === "idle" && (
            <Button disabled={!file} onClick={handleUpload} className="bg-green-600 hover:bg-green-700">
              Tải lên và phân tích
            </Button>
          )}
          {uploadStatus === "success" && (
            <Button onClick={onClose} className="bg-green-600 hover:bg-green-700">
              Tiếp tục chỉnh sửa
            </Button>
          )}
          {uploadStatus === "error" && (
            <Button onClick={() => resetState()} className="bg-green-600 hover:bg-green-700">
              Thử lại
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
