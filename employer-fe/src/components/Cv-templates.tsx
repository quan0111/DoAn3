import { Button } from "@/components/ui/button"

export function Templates() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Mẫu CV</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Lựa chọn từ bộ sưu tập mẫu CV được thiết kế chuyên nghiệp của chúng tôi.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md"
            >
              <img
                src={`/placeholder.svg?height=500&width=350&text=Mẫu ${i}`}
                alt={`Mẫu CV ${i}`}
                className="aspect-[3/4] w-full object-cover"
                width={350}
                height={500}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 opacity-0 transition-opacity group-hover:opacity-100">
                <h3 className="text-xl font-bold text-white">Chuyên Nghiệp {i}</h3>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="secondary">
                    Xem Trước
                  </Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Sử Dụng Mẫu
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Button variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-50">
            Xem Tất Cả Mẫu
          </Button>
        </div>
      </div>
    </section>
  )
}
