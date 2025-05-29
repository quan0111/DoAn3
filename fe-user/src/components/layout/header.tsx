"use client"

import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-slate-800 text-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-xl font-bold">topcv</div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700">
            🔍 HR Insider
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700">
            👤 Đăng tin
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700">
            📄 Tìm CV
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700">
            🔗 Connect
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700">
            📊 Insights
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700">
            🔔
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700">
            🛒 0
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700">
            👤
          </Button>
        </div>
      </div>
    </header>
  )
}
