"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FloatingAction() {
  return (
    <div className="fixed bottom-6 right-6 space-y-3">
      <Button className="bg-slate-800 hover:bg-slate-700 text-white rounded-full p-3">
        Tiếp theo: Xác thực số điện thoại →
      </Button>
      <Button className="bg-green-500 hover:bg-green-600 text-white rounded-full w-12 h-12 p-0">
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  )
}
