import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployerDashboardPage from "./page/page";
import MainLayout from "./page/layout";
import CreateJobPage from "./page/job-posts/create/page";
import InsightsPage from "./page/insights/page";
import CVRecommendationsPage from "./page/cv-recommendations/page";
import RecruitmentCampaignsPage from "./page/recruitment-campaigns/page";
import CVManagementPage from "./page/cv-management/page";
import ToppyAIPage from "./page/toppy-ai/page";
import ServicesPage from "./page/services/page";
import JobPostsPage from "./page/job-posts/page";
import ReportsPage from "./page/reports/page";
import RewardsPage from "./page/rewards/page";
import PartnersPage from "./page/partners/page";
import MyServicesPage from "./page/my-services/page";
import ReferralsPage from "./page/referrals/page";
import OrderTrackingPage from "./page/order-tracking/page";
import ActivityHistoryPage from "./page/activity-history/page";
import AccountSettingsPage from "./page/account-settings/page";
import EmployerLoginPage from "./page/dang-nhap/page";
import NotificationsPage from "./page/notifications/page";
import SupportPage from "./page/support/page";
import CVEmployeeManagementPage from "./page/cv-employee-management/page";
import PrivateRoute from "./components/private-route";
import CartPage from "./page/cart/page";
import { Toaster } from "sonner";

export default function App() {
  return (
    <Router>
      <Toaster position="top-right" richColors duration={4000} />
      <Routes>
        <Route path="/login" element={<EmployerLoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            {/* Dashboard chính */}
            <Route path="/" element={<EmployerDashboardPage />} />

            {/* Phân tích & Báo cáo */}
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/reports" element={<ReportsPage />} />

            {/* Quản lý CV */}
            <Route
              path="/cv-recommendations"
              element={<CVRecommendationsPage />}
            />
            <Route path="/cv-management" element={<CVManagementPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route
              path="/cv-employee-management"
              element={<CVEmployeeManagementPage />}
            />
            <Route path="/toppy-ai" element={<ToppyAIPage />} />

            {/* Tuyển dụng */}
            <Route
              path="/recruitment-campaigns"
              element={<RecruitmentCampaignsPage />}
            />
            <Route path="/job-posts" element={<JobPostsPage />} />
            <Route path="/job-posts/create" element={<CreateJobPage />} />

            {/* Dịch vụ & Thanh toán */}
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/my-services" element={<MyServicesPage />} />
            <Route path="/order-tracking" element={<OrderTrackingPage />} />

            {/* Khuyến mãi & Đối tác */}
            <Route path="/rewards" element={<RewardsPage />} />
            <Route path="/referrals" element={<ReferralsPage />} />
            <Route path="/partners" element={<PartnersPage />} />

            {/* Tài khoản & Cài đặt */}
            <Route path="/account-settings" element={<AccountSettingsPage />} />
            <Route path="/activity-history" element={<ActivityHistoryPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/support" element={<SupportPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
