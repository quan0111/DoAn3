"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"

interface DesignPanelProps {
  onClose: () => void
}

export function DesignPanel({ onClose }: DesignPanelProps) {
  const [fontSize, setFontSize] = useState(3)
  const [lineHeight, setLineHeight] = useState(3)
  const [selectedFont, setSelectedFont] = useState("Roboto")
  const [selectedLanguage, setSelectedLanguage] = useState("vi")

  const fonts = ["Roboto", "Open Sans", "Montserrat", "Lato", "Raleway"]

  const languages = [
    { code: "vi", name: "Tiếng Việt" },
    { code: "en", name: "Tiếng Anh" },
    { code: "jp", name: "Tiếng Nhật" },
  ]

  const colors = ["#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899", "#ef4444", "#000000"]

  return (
    <div className="bg-white border rounded-lg shadow-lg p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Thiết kế & Font</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="h-5 w-5" />
        </button>
      </div>

      <Tabs defaultValue="language">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="language">NGÔN NGỮ CV</TabsTrigger>
          <TabsTrigger value="font">FONT CHỮ</TabsTrigger>
        </TabsList>

        <TabsContent value="language">
          <div className="flex space-x-2 mb-6">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLanguage(lang.code)}
                className={`px-4 py-2 rounded border ${
                  selectedLanguage === lang.code
                    ? "border-emerald-600 text-emerald-600"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="font">
          <div className="mb-6">
            <select
              value={selectedFont}
              onChange={(e) => setSelectedFont(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              {fonts.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mb-6">
        <h4 className="text-sm text-gray-500 mb-2">CỠ CHỮ</h4>
        <div className="flex items-center">
          <span className="text-sm mr-2">Nhỏ</span>
          <Slider
            value={[fontSize]}
            min={1}
            max={5}
            step={1}
            onValueChange={(value) => setFontSize(value[0])}
            className="flex-1 mx-2"
          />
          <span className="text-sm ml-2">Siêu lớn</span>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm text-gray-500 mb-2">KHOẢNG CÁCH DÒNG</h4>
        <div className="flex items-center">
          <span className="text-sm mr-2">1.0</span>
          <Slider
            value={[lineHeight]}
            min={1}
            max={5}
            step={1}
            onValueChange={(value) => setLineHeight(value[0])}
            className="flex-1 mx-2"
          />
          <span className="text-sm ml-2">2.0</span>
        </div>
      </div>

      <div>
        <h4 className="text-sm text-gray-500 mb-2">MÀU CHỦ ĐỀ</h4>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {colors.map((color) => (
            <button
              key={color}
              className="w-8 h-8 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <div className="w-full h-40 bg-gradient-to-b from-amber-500 to-amber-800 rounded-md mb-4" />

        <div className="flex justify-center">
          <button className="bg-amber-500 text-white px-4 py-2 rounded">ec8f00</button>
        </div>
      </div>
    </div>
  )
}
