import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./admin/AdminLogin/page";
import Dashboard from "./admin/dashboard/page";
import JobManagement from "./admin/JobManagement/page";
import UserManagement from "./admin/UserManagement/page";
import Analytics from "./admin/Analytics/page";
import AdminSidebar from "./component/AdminSidebar";
import TopBar from "./component/Topbar";
import Settings from "./admin/setting/page";
import Reports from "./admin/report/page";
import Notifications from "./admin/nofication/page";
import Footer from "./component/footer";
function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      <div className="container-fluid">
        <TopBar></TopBar>
        <AdminSidebar />
        <div className="main-content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/jobs" element={<JobManagement />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/setting" element={<Settings />} />
            <Route path="/Report" element={<Reports />} />
            <Route path="/Nofication" element={<Notifications />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </div>
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
