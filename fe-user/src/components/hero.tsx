import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-green-50 to-green-100">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Tạo CV chuyên nghiệp trong vài phút
            </h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Nổi bật giữa đám đông với CV được thiết kế chuyên nghiệp. Công cụ tạo CV dễ sử dụng của chúng tôi giúp bạn
              tạo CV gây ấn tượng.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="px-8 bg-green-600 hover:bg-green-700">
                Tạo CV Của Tôi <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                Xem Mẫu CV
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-4 -left-4 h-full w-full rounded-lg border bg-background"></div>
              <div className="absolute -bottom-4 -right-4 h-full w-full rounded-lg border bg-background"></div>
              <div className="relative h-full w-full overflow-hidden rounded-lg border">
                <img
                  src="public/banner-02.webp"
                  alt="Xem trước CV"
                  className="w-full object-cover"
                  width={400}
                  height={600}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
