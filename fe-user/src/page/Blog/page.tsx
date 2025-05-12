import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/Header"
import { Footer } from "@/components/footer"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Type definitions
interface Article {
  article_id: number
  title: string
  slug: string
  content: string
  thumbnail_url?: string
  view_count: number
  category: string
}

interface Category {
  category_id: number
  name: string
}

// Static mock data
const mockData: { articles: Article[]; categories: Category[] } = {
  articles: [
    {
      article_id: 1,
      title: "10 mẹo viết CV thu hút nhà tuyển dụng",
      slug: "10-meo-viet-cv",
      content: "Hướng dẫn chi tiết cách viết CV chuyên nghiệp...",
      thumbnail_url: "https://example.com/thumb1.jpg",
      view_count: 120,
      category: "CV Tips",
    },
    {
      article_id: 2,
      title: "Chuẩn bị phỏng vấn thành công",
      slug: "chuan-bi-phong-van",
      content: "Các bước chuẩn bị cho một buổi phỏng vấn...",
      thumbnail_url: "https://example.com/thumb2.jpg",
      view_count: 80,
      category: "Interview Tips",
    },
  ],
  categories: [
    { category_id: 1, name: "CV Tips" },
    { category_id: 2, name: "Interview Tips" },
  ],
}

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  useEffect(() => {
    // Giả lập fetch dữ liệu từ API
    setArticles(mockData.articles)
    setCategories(mockData.categories)
  }, [])

  const filteredArticles = selectedCategory === "all" ? articles : articles.filter((article) => article.category === selectedCategory)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container">
          <h1 className="mb-8 text-2xl font-bold">Blog & Tài nguyên</h1>
          <div className="mb-8">
            <Select onValueChange={setSelectedCategory} defaultValue="all">
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Chọn danh mục" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.category_id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.length === 0 ? (
              <p className="text-gray-500">Chưa có bài viết nào.</p>
            ) : (
              filteredArticles.map((article) => (
                <Card key={article.article_id}>
                  <CardHeader>
                    {article.thumbnail_url && (
                      <img src={article.thumbnail_url} alt={article.title} className="h-40 w-full object-cover rounded-t-md" />
                    )}
                    <CardTitle>{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 line-clamp-3">{article.content}</p>
                    <p className="text-sm text-gray-400 mt-2">Lượt xem: {article.view_count}</p>
                    <Button variant="outline" asChild className="mt-4">
                      <a href={`/blog/${article.slug}`}>Đọc thêm</a>
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}