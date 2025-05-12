"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileUp } from "lucide-react"
import { CVUploadModal } from "./cv-upload-modal"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"

interface CVUploadButtonProps {
  onUploadComplete?: (data: any) => void
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function CVUploadButton({
  onUploadComplete,
  variant = "outline",
  size = "default",
  className = "",
}: CVUploadButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleUploadComplete = (data: any) => {
    setIsModalOpen(false)
    setShowSuccess(true)

    if (onUploadComplete) {
      onUploadComplete(data)
    }
  }

  return (
    <>
      <Button variant={variant} size={size} className={`gap-2 ${className}`} onClick={() => setIsModalOpen(true)}>
        <FileUp className="h-4 w-4" />
        <span>Tải lên CV có sẵn</span>
      </Button>

      <CVUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUploadComplete={handleUploadComplete}
      />

      <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>CV đã được tải lên thành công</AlertDialogTitle>
            <AlertDialogDescription>
              Thông tin từ CV của bạn đã được trích xuất và điền vào form.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowSuccess(false)}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
