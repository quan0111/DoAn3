import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-green-600 text-white">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Sẵn sàng để có được công việc mơ ước?
            </h2>
            <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Tạo CV chuyên nghiệp trong vài phút và tăng cơ hội được tuyển dụng.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-end">
            <Button size="lg" variant="secondary" className="px-8">
              Bắt Đầu Ngay
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
