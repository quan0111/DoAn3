"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock chart component - in real app, you'd use recharts or similar
export function StatsChart() {
  const data = [
    { month: "T1", jobs: 120, applications: 450 },
    { month: "T2", jobs: 150, applications: 520 },
    { month: "T3", jobs: 180, applications: 680 },
    { month: "T4", jobs: 220, applications: 750 },
    { month: "T5", jobs: 280, applications: 920 },
    { month: "T6", jobs: 320, applications: 1100 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thống kê theo tháng</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 flex items-end justify-between gap-2">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-2 flex-1">
              <div className="flex gap-1 items-end h-60">
                <div
                  className="bg-orange-500 rounded-t w-6"
                  style={{ height: `${(item.jobs / 320) * 100}%` }}
                  title={`Công việc: ${item.jobs}`}
                />
                <div
                  className="bg-blue-500 rounded-t w-6"
                  style={{ height: `${(item.applications / 1100) * 100}%` }}
                  title={`Ứng tuyển: ${item.applications}`}
                />
              </div>
              <span className="text-xs text-gray-600">{item.month}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded"></div>
            <span className="text-sm">Công việc</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-sm">Ứng tuyển</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
