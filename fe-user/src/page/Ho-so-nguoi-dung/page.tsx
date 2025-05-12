import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/Header"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Type definitions
interface User {
  user_id: number
  full_name: string
  email: string
  avatar_url?: string
  phone?: string
  gender?: "male" | "female" | "other"
  dob?: string
}

interface Jobseeker {
  career_goals?: string
  experience_years?: number
  desired_salary_min?: number
  desired_salary_max?: number
  job_preferences?: { location?: string; job_type?: string }
  linkedin_url?: string
  portfolio_url?: string
}

interface Resume {
  resume_id: number
  title: string
  file_url: string
  is_public: boolean
  verified_status: "pending" | "verified" | "rejected"
}

// Static mock data
const mockProfile: { user: User; jobseeker: Jobseeker; resumes: Resume[] } = {
  user: {
    user_id: 1,
    full_name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    avatar_url: "https://example.com/avatar.jpg",
    phone: "0123456789",
    gender: "male",
    dob: "1995-05-15",
  },
  jobseeker: {
    career_goals: "Trở thành chuyên gia Marketing với 5 năm kinh nghiệm.",
    experience_years: 3,
    desired_salary_min: 15000000,
    desired_salary_max: 20000000,
    job_preferences: { location: "Hà Nội", job_type: "full-time" },
    linkedin_url: "https://linkedin.com/in/nguyenvana",
    portfolio_url: "https://portfolio.com/nguyenvana",
  },
  resumes: [
    { resume_id: 1, title: "CV Marketing", file_url: "https://s3.example.com/cv1.pdf", is_public: true, verified_status: "verified" },
    { resume_id: 2, title: "CV Digital Marketing", file_url: "https://s3.example.com/cv2.pdf", is_public: false, verified_status: "pending" },
  ],
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [jobseeker, setJobseeker] = useState<Jobseeker | null>(null)
  const [resumes, setResumes] = useState<Resume[]>([])

  useEffect(() => {
    // Giả lập fetch dữ liệu từ API
    setUser(mockProfile.user)
    setJobseeker(mockProfile.jobseeker)
    setResumes(mockProfile.resumes)
  }, [])

  if (!user || !jobseeker) return <div>Loading...</div>

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin cá nhân</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {user.avatar_url && (
                    <img src={user.avatar_url} alt="Avatar" className="h-24 w-24 rounded-full mx-auto" />
                  )}
                  <div>
                    <Label>Họ và tên</Label>
                    <Input value={user.full_name} disabled />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input value={user.email} disabled />
                  </div>
                  <div>
                    <Label>Số điện thoại</Label>
                    <Input value={user.phone || "Chưa cập nhật"} disabled />
                  </div>
                  <div>
                    <Label>Giới tính</Label>
                    <Input value={user.gender || "Chưa cập nhật"} disabled />
                  </div>
                  <div>
                    <Label>Ngày sinh</Label>
                    <Input value={user.dob || "Chưa cập nhật"} disabled />
                  </div>
                  <Button>Chỉnh sửa thông tin</Button>
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Thông tin nghề nghiệp</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Mục tiêu nghề nghiệp</Label>
                    <Input value={jobseeker.career_goals || "Chưa cập nhật"} disabled />
                  </div>
                  <div>
                    <Label>Số năm kinh nghiệm</Label>
                    <Input value={jobseeker.experience_years || 0} disabled />
                  </div>
                  <div>
                    <Label>Mức lương mong muốn</Label>
                    <Input
                      value={
                        jobseeker.desired_salary_min && jobseeker.desired_salary_max
                          ? `${jobseeker.desired_salary_min.toLocaleString()} - ${jobseeker.desired_salary_max.toLocaleString()} VND`
                          : "Chưa cập nhật"
                      }
                      disabled
                    />
                  </div>
                  <div>
                    <Label>Sở thích công việc</Label>
                    <Input
                      value={
                        jobseeker.job_preferences
                          ? `${jobseeker.job_preferences.location}, ${jobseeker.job_preferences.job_type}`
                          : "Chưa cập nhật"
                      }
                      disabled
                    />
                  </div>
                  <div>
                    <Label>LinkedIn</Label>
                    <Input value={jobseeker.linkedin_url || "Chưa cập nhật"} disabled />
                  </div>
                  <div>
                    <Label>Portfolio</Label>
                    <Input value={jobseeker.portfolio_url || "Chưa cập nhật"} disabled />
                  </div>
                  <Button>Chỉnh sửa thông tin nghề nghiệp</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Danh sách CV</CardTitle>
                </CardHeader>
                <CardContent>
                  {resumes.length === 0 ? (
                    <p className="text-gray-500">Chưa có CV nào.</p>
                  ) : (
                    <ul className="space-y-4">
                      {resumes.map((resume) => (
                        <li key={resume.resume_id} className="flex items-center justify-between border-b pb-2">
                          <div>
                            <p className="font-medium">{resume.title}</p>
                            <p className="text-sm text-gray-500">
                              Trạng thái: {resume.verified_status} | Công khai: {resume.is_public ? "Có" : "Không"}
                            </p>
                          </div>
                          <Button variant="outline" asChild>
                            <a href={resume.file_url} target="_blank" rel="noopener noreferrer">
                              Xem CV
                            </a>
                          </Button>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}