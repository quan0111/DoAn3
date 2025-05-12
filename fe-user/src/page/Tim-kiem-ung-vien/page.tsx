import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/Header"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

// Type definitions
interface Jobseeker {
  user_id: number
  full_name: string
  experience_years: number
  job_preferences: { location?: string; job_type?: string }
}

interface Resume {
  resume_id: number
  user_id: number
  title: string
  skills: string[]
  file_url: string
  is_public: boolean
}

// Static mock data
const mockData: { jobseekers: Jobseeker[]; resumes: Resume[] } = {
  jobseekers: [
    {
      user_id: 1,
      full_name: "Nguyễn Văn A",
      experience_years: 3,
      job_preferences: { location: "Hà Nội", job_type: "full-time" },
    },
    {
      user_id: 2,
      full_name: "Trần Thị B",
      experience_years: 5,
      job_preferences: { location: "TP.HCM", job_type: "remote" },
    },
  ],
  resumes: [
    {
      resume_id: 1,
      user_id: 1,
      title: "CV Marketing",
      skills: ["Marketing", "SEO", "Content"],
      file_url: "https://s3.example.com/cv1.pdf",
      is_public: true,
    },
    {
      resume_id: 2,
      user_id: 2,
      title: "CV Developer",
      skills: ["Python", "JavaScript"],
      file_url: "https://s3.example.com/cv2.pdf",
      is_public: true,
    },
  ],
}

export default function CandidateSearchPage() {
  const [jobseekers, setJobseekers] = useState<Jobseeker[]>([])
  const [resumes, setResumes] = useState<Resume[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")

  useEffect(() => {
    // Giả lập fetch dữ liệu từ API
    setJobseekers(mockData.jobseekers)
    setResumes(mockData.resumes)
  }, [])

  const filteredCandidates = jobseekers
    .map((js) => ({
      ...js,
      resume: resumes.find((r) => r.user_id === js.user_id && r.is_public),
    }))
    .filter((candidate) => {
      if (!searchQuery) return true
      const query = searchQuery.toLowerCase()
      return (
        candidate.full_name.toLowerCase().includes(query) ||
        (candidate.resume && candidate.resume.skills.some((skill) => skill.toLowerCase().includes(query))) ||
        (candidate.job_preferences.location && candidate.job_preferences.location.toLowerCase().includes(query))
      )
    })

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container">
          <h1 className="mb-8 text-2xl font-bold">Tìm kiếm ứng viên</h1>
          <div className="mb-8 flex items-center gap-4">
            <Input
              placeholder="Tìm theo tên, kỹ năng, hoặc địa điểm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
            <Button>
              <Search className="h-4 w-4 mr-2" /> Tìm kiếm
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-8">
            {filteredCandidates.length === 0 ? (
              <p className="text-gray-500">Không tìm thấy ứng viên phù hợp.</p>
            ) : (
              filteredCandidates.map((candidate) => (
                <Card key={candidate.user_id}>
                  <CardHeader>
                    <CardTitle>{candidate.full_name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">Kinh nghiệm: {candidate.experience_years} năm</p>
                    <p className="text-sm">
                      Sở thích công việc: {candidate.job_preferences.location}, {candidate.job_preferences.job_type}
                    </p>
                    {candidate.resume && (
                      <>
                        <p className="text-sm">Kỹ năng: {candidate.resume.skills.join(", ")}</p>
                        <div className="flex gap-4">
                          <Button variant="outline" asChild>
                            <a href={candidate.resume.file_url} target="_blank" rel="noopener noreferrer">
                              Xem CV
                            </a>
                          </Button>
                          <Button>Mời ứng tuyển</Button>
                        </div>
                      </>
                    )}
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