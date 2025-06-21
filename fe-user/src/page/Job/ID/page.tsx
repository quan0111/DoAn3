
import { Header } from "@/components/Header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import axios from "axios";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Building,
  MapPin,
  Wallet,
  Clock,
  Calendar,
  Globe,
  UserCheck,
  BookOpen,
  Briefcase,
  ChevronRight,
  Star,
  Share2,
  Flag,
  ArrowRight,
} from "lucide-react";
import type { Job } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  userId: string;
}

export default function JobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCV, setSelectedCV] = useState<string | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [cvList, setCvList] = useState<{ template_id: string; name: string }[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchJob = async () => {
      if (!id || isNaN(Number(id))) {
        setJob(null);
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`http://localhost:3000/jobss/${id}`);
        if (res.status === 200 && res.data) {
          setJob(res.data);
        } else {
          setJob(null);
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu công việc: ", error);
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    const fetchCVs = async () => {
      try {
        const res = await axios.get("http://localhost:3000/cv_templatess/public");
        setCvList(res.data.map((item: any) => ({ template_id: item.template_id, name: item.name })));
      } catch (error: any) {
        toast.error(error);
      }
    };

    fetchJob();
    fetchCVs();
  }, [id]);
const handleOpenApplyModal = () => {
  const token = Cookies.get("token");
  if (!token) {
    toast.error("Bạn chưa đăng nhập. Vui lòng đăng nhập để ứng tuyển.");
        navigate("/login")

    return;
  }
  try {
    const decoded = jwtDecode<TokenPayload>(token);
    console.log(decoded)
    if (!decoded.userId) {
      toast.error("Token không hợp lệ. Vui lòng đăng nhập lại.");
      return;
    }
    setIsModalOpen(true);
  } catch (error) {
    toast.error("Token không hợp lệ. Vui lòng đăng nhập lại.");
  }
};

const handleApply = async () => {
  if (!id || !job) return;
  
  const token = Cookies.get("token");
  if (!token) {
    toast.error("Bạn chưa đăng nhập. Vui lòng đăng nhập để ứng tuyển.");
        navigate("/login")

    return;
  }
  let userId = "";
  try {
    const decodedToken = jwtDecode<TokenPayload>(token);
    userId = decodedToken.userId;
  } catch (error) {
    toast.error("Token không hợp lệ. Vui lòng đăng nhập lại.");
    return;
  }

  setLoading(true);
  const formData = new FormData();
  formData.append("job_id", id);
  formData.append("user_id", userId); // Dùng userId lấy từ token
  if (cvFile) formData.append("cv_file", cvFile);
  if (coverLetter) formData.append("cover_letter", coverLetter);

  try {
    const res = await axios.post("http://localhost:3000/applicationss", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    toast.success("Ứng tuyển thành công!");
    setIsModalOpen(false);
    setSelectedCV(null);
    setCvFile(null);
    setCoverLetter("");
  } catch (error) {
    toast.error("Lỗi khi ứng tuyển: " + (error as any)?.response?.data?.message || "Vui lòng thử lại");
  } finally {
    setLoading(false);
  }
};

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type)) {
        setFileError("Chỉ chấp nhận file .doc, .docx, .pdf");
        setCvFile(null);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setFileError("File không được vượt quá 5MB");
        setCvFile(null);
        return;
      }
      setFileError(null);
      setCvFile(file);
    }
  };

  if (loading) return <div className="p-10 text-center">Đang tải dữ liệu...</div>;
  if (!id || isNaN(Number(id)))
    return <div className="p-10 text-center text-red-500">ID công việc không hợp lệ.</div>;
  if (!job) return <div className="p-10 text-center text-red-500">Không tìm thấy công việc.</div>;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-gray-50">
          <div className="container py-3">
            <div className="flex items-center gap-1 text-sm">
              <Link to="/" className="text-gray-500 hover:text-green-600">Trang chủ</Link>
              <ChevronRight className="h-3 w-3 text-gray-400" />
              <Link to="/viec-lam" className="text-gray-500 hover:text-green-600">Việc làm</Link>
              <ChevronRight className="h-3 w-3 text-gray-400" />
              <span className="font-medium">{job.title || "Không xác định"}</span>
            </div>
          </div>
        </div>

        {/* Job Header */}
        <section className="border-b py-6">
          <div className="container">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="flex gap-4">
                <div className="hidden sm:block">
                  <div className="flex h-20 w-20 items-center justify-center rounded-lg border bg-gray-100">
                    <Building className="h-10 w-10 text-gray-400" />
                  </div>
                </div>
                <div>
                  <h1 className="mb-1 text-2xl font-bold">{job.title || "Không xác định"}</h1>
                  <Link to="#" className="font-medium text-green-600 hover:underline">
                    {job.company_name || "Công ty chưa xác định"}
                  </Link>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="ghost">
                  <Star className="mr-1 h-4 w-4" /> Lưu
                </Button>
                <Button size="sm" variant="ghost">
                  <Share2 className="mr-1 h-4 w-4" /> Chia sẻ
                </Button>
                <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-600">
                  <Flag className="mr-1 h-4 w-4" /> Báo cáo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8">
          <div className="container">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Job Details */}
              <div className="order-2 lg:order-1 lg:col-span-2">
                <Tabs defaultValue="description" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="description">Mô tả công việc</TabsTrigger>
                    <TabsTrigger value="company">Thông tin công ty</TabsTrigger>
                    <TabsTrigger value="related">Việc làm liên quan</TabsTrigger>
                  </TabsList>
                  <TabsContent value="description" className="border-none p-0 pt-6">
                    <div className="rounded-lg border">
                      <div className="border-b p-4">
                        <h2 className="text-xl font-bold">Mô tả công việc</h2>
                      </div>
                      <div className="space-y-6 p-4">
                        <div>
                          <h3 className="mb-3 text-lg font-semibold">Tổng quan</h3>
                          <p className="text-gray-600 text-left">{job.description}</p>
                        </div>
                        <div>
                          <h3 className="mb-3 text-lg font-semibold">Yêu cầu công việc</h3>
                          <ul className="list-inside text-left list-disc space-y-2 text-gray-600">
                            <li>Kinh nghiệm trong lĩnh vực liên quan</li>
                            <li>Thành thạo các công nghệ: {job?.requirements?.length ? job.requirements.slice(0, 3).join(", ") : "Yêu cầu chưa cập nhật"}</li>
                            <li>Có khả năng làm việc độc lập và theo nhóm</li>
                            <li>Kỹ năng giao tiếp và giải quyết vấn đề tốt</li>
                            <li>Tiếng Anh giao tiếp tốt</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="mb-3 text-lg font-semibold">Quyền lợi</h3>
                          <ul className="list-inside text-left list-disc space-y-2 text-gray-600">
                            <li>Mức lương hấp dẫn: {job.salary_min || "Chưa rõ"}00.000đ - {job.salary_max || "Chưa rõ"}00.000đ</li>
                            <li>{job.benefits || "Quyền lợi chưa cập nhật"}</li>
                            <li>Thưởng hiệu suất và thưởng các dịp lễ, Tết</li>
                            <li>Làm việc trong môi trường chuyên nghiệp, năng động</li>
                            <li>Cơ hội đào tạo và phát triển nghề nghiệp</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="mb-3 text-lg font-semibold">Cách thức ứng tuyển</h3>
                          <p className="text-gray-600">Ứng viên quan tâm vui lòng gửi CV và thư ngỏ đến email: tuyendung@{job.company_name || "congty"}.com hoặc ứng tuyển trực tiếp qua nút bên dưới.</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="company" className="border-none p-0 pt-6">
                    <div className="rounded-lg border">
                      <div className="border-b p-4">
                        <h2 className="text-xl font-bold">Giới thiệu công ty</h2>
                      </div>
                      <div className="space-y-6 p-4">
                        <div className="flex flex-col items-center gap-4 sm:flex-row">
                          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg border bg-gray-100">
                            <Building className="h-12 w-12 text-gray-400" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{job.company_name || "Công ty chưa xác định"}</h3>
                            <p className="text-gray-600">Chuyên về lĩnh vực {Number(id) % 2 === 0 ? "công nghệ thông tin" : "Marketing và truyền thông"}</p>
                          </div>
                        </div>
                        <div>
                          <h3 className="mb-3 text-lg font-semibold">Tổng quan về công ty</h3>
                          <p className="text-gray-600">{job.company_name || "Công ty"} là một trong những công ty hàng đầu trong lĩnh vực {Number(id) % 2 === 0 ? "công nghệ thông tin" : "Marketing và truyền thông"} tại Việt Nam. Với hơn 10 năm kinh nghiệm, chúng tôi tự hào về đội ngũ nhân viên tài năng và văn hóa làm việc hướng đến sự sáng tạo và đổi mới.</p>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <div className="rounded-lg border p-3">
                            <h4 className="mb-2 font-semibold">Quy mô công ty</h4>
                            <div className="flex items-center gap-2 text-gray-600">
                              <UserCheck className="h-4 w-4" />
                              <span>{[50, 100, 200, 500, 1000][Number(id) % 5]}+ nhân viên</span>
                            </div>
                          </div>
                          <div className="rounded-lg border p-3">
                            <h4 className="mb-2 font-semibold">Thành lập</h4>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="h-4 w-4" />
                              <span>Năm {[2010, 2015, 2008, 2012, 2005][Number(id) % 5]}</span>
                            </div>
                          </div>
                          <div className="rounded-lg border p-3">
                            <h4 className="mb-2 font-semibold">Trụ sở chính</h4>
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin className="h-4 w-4" />
                              <span>{job.location || "Chưa rõ"}</span>
                            </div>
                          </div>
                          <div className="rounded-lg border p-3">
                            <h4 className="mb-2 font-semibold">Website</h4>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Globe className="h-4 w-4" />
                              <a href="#" className="text-green-600 hover:underline">www.{job.company_name || "congty"}.com</a>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="mb-3 text-lg font-semibold">Văn hóa công ty</h3>
                          <p className="text-gray-600">Chúng tôi xây dựng một môi trường làm việc năng động, sáng tạo và tôn trọng sự cân bằng giữa công việc và cuộc sống. Nhân viên được khuyến khích đóng góp ý tưởng và phát triển kỹ năng thông qua các chương trình đào tạo thường xuyên.</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="related" className="border-none p-0 pt-6">
                    <div className="rounded-lg border">
                      <div className="border-b p-4">
                        <h2 className="text-xl font-bold">Việc làm tương tự</h2>
                      </div>
                      <div className="p-4">
                        <div className="space-y-4">
                          {Array.from({ length: 5 }).map((_, i) => {
                            const relatedId = (Number(id) + i + 1) % 10;
                            return (
                              <Link to={`/viec-lam/${relatedId}`} key={i} className="block rounded-lg border p-4 transition-all hover:border-green-300 hover:shadow-sm">
                                <div className="flex gap-4">
                                  <div className="hidden sm:block">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-gray-100">
                                      <Building className="h-6 w-6 text-gray-400" />
                                    </div>
                                  </div>
                                  <div>
                                    <h3 className="mb-1 font-semibold text-green-600">{["Senior Developer", "Product Manager", "Marketing Specialist", "Data Analyst", "UX Designer"][relatedId % 5]}</h3>
                                    <p className="mb-1 text-sm">{["Công ty A", "Công ty B", "Công ty C", "Công ty D", "Công ty E"][relatedId % 5]}</p>
                                    <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                                      <div className="flex items-center gap-1"><MapPin className="h-3 w-3" />{["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", "Cần Thơ"][relatedId % 5]}</div>
                                      <div className="flex items-center gap-1"><Wallet className="h-3 w-3" />{["15-20 triệu", "Thỏa thuận", "10-15 triệu", "20-30 triệu", "8-12 triệu"][relatedId % 5]}</div>
                                      <div className="flex items-center gap-1"><Clock className="h-3 w-3" />{["Toàn thời gian", "Bán thời gian", "Remote", "Hợp đồng", "Thực tập"][relatedId % 5]}</div>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                        <div className="mt-4 text-center">
                          <Button variant="link" className="text-green-600">Xem thêm việc làm tương tự</Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Job Summary */}
              <div className="order-1 lg:order-2">
                <div className="sticky top-24 space-y-6">
                  <div className="rounded-lg border">
                    <div className="border-b p-4">
                      <h2 className="text-lg font-bold">Thông tin việc làm</h2>
                    </div>
                    <div className="p-4">
                      <div className="space-y-4">
                        <div className="flex gap-3">
                          <MapPin className="h-5 w-5 text-gray-500" />
                          <div>
                            <h3 className="font-medium">Địa điểm</h3>
                            <p className="text-gray-600">{job.location || "Chưa rõ"}</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Wallet className="h-5 w-5 text-gray-500" />
                          <div>
                            <h3 className="font-medium text-left">Mức lương</h3>
                            <p className="text-gray-600">{job.salary_min || "Chưa rõ"}00.000đ - {job.salary_max || "Chưa rõ"}00.000đ</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Clock className="h-5 w-5 text-gray-500" />
                          <div>
                            <h3 className="font-medium">Hình thức làm việc</h3>
                            <p className="text-gray-600 text-left">{job.job_type || "Chưa rõ"}</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Calendar className="h-5 w-5 text-gray-500" />
                          <div>
                            <h3 className="font-medium">Ngày đăng</h3>
                            <p className="text-gray-600">{job.created_at && !isNaN(new Date(job.created_at).getTime()) ? format(new Date(job.created_at), "dd/MM/yyyy") : "Chưa rõ"}</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <BookOpen className="h-5 w-5 text-gray-500" />
                          <div>
                            <h3 className="font-medium">Trình độ học vấn</h3>
                            <p className="text-gray-600 text-left">{job.education_level || "Chưa rõ"}</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Briefcase className="h-5 w-5 text-gray-500" />
                          <div>
                            <h3 className="font-medium">Kinh nghiệm</h3>
                            <p className="text-gray-600 text-left">{job.job_level || "Chưa rõ"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleOpenApplyModal}>
                    Ứng tuyển ngay <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Modal Ứng Tuyển */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Ứng tuyển {job?.title || "Công việc"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Label>Chọn CV để ứng tuyển</Label>
            <RadioGroup value={selectedCV || undefined} onValueChange={setSelectedCV}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="online" id="online" />
                <Label htmlFor="online">Chọn CV khác trong thư viện CV của tôi</Label>
              </div>
              {cvList.map((cv) => (
                <div key={cv.template_id} className="ml-6 flex items-center space-x-2">
                  <input
                    type="radio"
                    name="cv"
                    value={cv.template_id}
                    checked={selectedCV === cv.template_id}
                    onChange={() => setSelectedCV(cv.template_id)}
                  />
                  <Label>{cv.name}</Label>
                </div>
              ))}
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="upload" id="upload" />
                <Label htmlFor="upload">Tải lên CV từ máy tính, chọn hóa khóa</Label>
              </div>
              <div className="ml-6">
                <Input
                  type="file"
                  accept=".doc,.docx,.pdf"
                  onChange={handleFileChange}
                  disabled={selectedCV === "online"}
                />
                {fileError && <p className="text-red-500 text-sm">{fileError}</p>}
                <p className="text-sm text-gray-500">Hỗ trợ định dạng .doc, .docx, pdf có kích thước dưới 5MB</p>
              </div>
            </RadioGroup>

            <div>
              <Label>Thư giới thiệu:</Label>
              <Textarea
                placeholder="Mời giới thiệu ngắn gọn về bản thân (điền manh, điểm mạnh, và năng lực nổi bật, lý do bạn muốn ứng tuyển, thông tin liên hệ)"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="min-h-[150px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Hủy</Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleApply} disabled={loading}>
              {loading ? "Đang nộp..." : "Nộp hồ sơ ứng tuyển"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
