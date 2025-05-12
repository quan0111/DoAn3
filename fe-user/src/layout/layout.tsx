import "@/app/globals.css"
import type { ReactNode } from "react"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: "TopCV - Tạo CV Chuyên Nghiệp",
  description: "Tạo CV chuyên nghiệp trong vài phút với TopCV",
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div lang="vi" className="font-sans">
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        {children}
      </ThemeProvider>
    </div>
  )
}
