// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './page/Home/page'
import JobDetailPage from './page/Job/ID/page'
import JobListPage from './page/Job/page'
import RegisterPage from './page/dang-ky/page'
import LoginPage from './page/dang-nhap/Page'
import "./App.css"
import CVTemplatesPage from './page/CV/Page'
import CVTemplateDetailPage from './page/CV/ID/page'
import CreateCVPage from './page/Tao-cv/page'
import CVAnalysisPage from './page/phan-tich-cv/page'
import CVManagementPage from './page/quan-ly-cv/page'
import JobMatchPage from './page/so-sanh-mo-ta-cong-viec/page'
import CandidateSearchPage from './page/Tim-kiem-ung-vien/page'
import ProfilePage from './page/Ho-so-nguoi-dung/page'
import CandidateDashboardPage from './page/Bang-dieu-khien/page'
import InterviewManagementPage from './page/Quan-ly-phong-van/page'
import ApplicationTrackerPage from './page/Theo-doi-ung-tuyen/page'
import BlogPage from './page/Blog/page'
import EventsPage from './page/Event/page'
import JobAlertsPage from './page/Canh-bao-cong-viec/page'
import CareerCounselingPage from './page/Tu-van-nghe-nghiep/page'
import FeedbackPage from './page/feedback/page'
import CareerInsightsPage from './page/Carrer-insight/page'
import PremiumServicesPage from './page/premium/page'
import AboutContactPage from './page/about/page'
import ViewCVPage from './page/view-cv/page'

function App() {
  return (
    <Router>
      <Routes>
        {/* Định tuyến cho trang mặc định */}
        <Route path="/" element={<Home />} />
        <Route path="/quan-ly-phong-van" element={<InterviewManagementPage />} />
        <Route path="/Theo-doi-ung-tuyen" element={<ApplicationTrackerPage />} />
        <Route path="/Blog" element={<BlogPage />} />
        <Route path="/Events" element={<EventsPage />} />
        <Route path="/Job-alert" element={<JobAlertsPage />} />
        <Route path="/Tu-van-nghe-nghiep" element={<CareerCounselingPage />} />
        <Route path="/Feed-back" element={<FeedbackPage />} />
        <Route path="/Phan-tich-nghe-nghiep" element={<CareerInsightsPage />} />
        <Route path="/Premium" element={<PremiumServicesPage />} />
        <Route path="/About" element={<AboutContactPage />} />
        <Route path="/tao-cv" element={<CreateCVPage />} />
        <Route path="/quan-ly-cv" element={<CVManagementPage />} />
        <Route path="/phan-tich-cv" element={<CVAnalysisPage />} />
        <Route path="/Ho-so-nguoi-dung" element={<ProfilePage />} />
        <Route path="/Bang-dieu-khien" element={<CandidateDashboardPage />} />
        <Route path="/so-sanh-mo-ta-cong-viec" element={<JobMatchPage />} />
        <Route path="/Tim-kiem-ung-vien" element={<CandidateSearchPage />} />
        <Route path="/viec-lam" element={<JobListPage />} />
        <Route path="/viec-lam/:id" element={<JobDetailPage />} />
        <Route path="/dang-ky" element={<RegisterPage />} />
        <Route path="/mau-cv" element={<CVTemplatesPage />} />
        <Route path="/mau-cv/:id" element={<CVTemplateDetailPage />} />
        <Route path="/view-cv/:id" element={<ViewCVPage />} />
        <Route path="/Login" element={<LoginPage />} />
      </Routes>
    </Router>
  )
}

export default App
