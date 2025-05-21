import { Header } from "@/components/Header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight } from "lucide-react";
import { JobCategories } from "@/components/job-categories";
import { PopularSearches } from "@/components/popular-search";
import { JobAlert } from "@/components/job-alert";
import { JobCard } from "@/components/job-card";
import { JobsByCategory } from "@/components/Job-by-categories";
import { Pagination } from "@/components/pagnigation";
import { useState,useEffect } from "react";
import axios from "axios";
import type { Job,job_categories } from "@/lib/types";



const popularSearches = [
  "Lập trình viên",
  "Thiết kế UI/UX",
  "Quản trị dự án",
  "Data Analyst",
  "Marketing",
];



export default function JobListPage() {
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [jobCategories, setJobCategories] = useState<job_categories[]>([]);

    useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsRes, categoriesRes] = await Promise.all([
          axios.get("http://localhost:3000/jobss"), // endpoint bạn sử dụng
          axios.get("http://localhost:3000/job_categoriess"),
        ]);

        const allJobs: Job[] = jobsRes.data;
        setRecentJobs(allJobs);
        setFeaturedJobs(allJobs.filter((job) => job.priority_score > 6)); // ví dụ: job nổi bật
        setJobCategories([
        { category_id: "all", name: "Tất cả", description: "" },
        ...categoriesRes.data,
      ]);


      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Banner */}
        <section className="bg-green-600 py-12 text-white">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-4xl font-bold">Danh sách công việc</h1>
              <p className="mb-6 text-lg">
                Khám phá hàng nghìn cơ hội việc làm từ các công ty hàng đầu trên khắp Việt Nam
              </p>
              <div className="flex justify-center">
                <Button variant="secondary" size="lg" asChild>
                  <Link to="/viec-lam">
                    Tìm kiếm nâng cao <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  <JobCategories job_categories={jobCategories} />
                  <PopularSearches searches={popularSearches} />
                  <JobAlert />
                </div>
              </div>

              {/* Job Listings */}
              <div className="lg:col-span-3">
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="mb-6 grid w-full grid-cols-3">
                    <TabsTrigger value="all">Tất cả</TabsTrigger>
                    <TabsTrigger value="featured">Việc làm nổi bật</TabsTrigger>
                    <TabsTrigger value="recent">Việc làm mới nhất</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-6">
                    {/* Featured Jobs Section */}
                    <div>
                      <h2 className="mb-4 text-xl font-bold">Việc làm nổi bật</h2>
                      <div className="space-y-4">
                        {featuredJobs.map((job) => (
                          <JobCard key={job.job_id} job={job} />
                        ))}
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button variant="link" className="text-green-600">
                          Xem tất cả việc làm nổi bật <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Recent Jobs Section */}
                    <div>
                      <h2 className="mb-4 text-xl font-bold">Việc làm mới nhất</h2>
                      <div className="space-y-4">
                        {recentJobs.slice(0, 5).map((job) => (
                          <JobCard key={job.job_id} job={job} />
                        ))}
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button variant="link" className="text-green-600">
                          Xem tất cả việc làm mới <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Jobs by Category */}
                    <JobsByCategory categories={jobCategories} />
                  </TabsContent>

                  <TabsContent value="featured" className="space-y-4">
                    {featuredJobs.map((job) => (
                      <JobCard key={`featured-${job.job_id}`} job={job} />
                    ))}
                    <div className="mt-8 flex justify-center">
                      <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                        Xem thêm việc làm nổi bật
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="recent" className="space-y-4">
                    {recentJobs.map((job) => (
                      <JobCard key={`recent-${job.job_id}`} job={job} />
                    ))}
                    <div className="mt-8 flex justify-center">
                      <Pagination />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-green-600 py-12 text-white">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold">Bạn là nhà tuyển dụng?</h2>
              <p className="mb-6">Đăng tin tuyển dụng và tiếp cận hàng triệu ứng viên tiềm năng ngay hôm nay</p>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/nha-tuyen-dung">Đăng tin tuyển dụng</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}