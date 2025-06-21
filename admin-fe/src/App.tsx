
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Cookies from "js-cookie";
import { AdminDashboard } from "./components/AdminDashboard";
import { LoginForm } from "./components/login-form"; // Đảm bảo import đúng
import { Toaster } from "sonner";
import "./App.css";

function App() {
  const [token, setToken] = useState(Cookies.get("token")); // Lấy token ban đầu

  // Cập nhật token khi cookie thay đổi
  useEffect(() => {
    const checkToken = () => {
      const newToken = Cookies.get("token");
      if (newToken !== token) {
        setToken(newToken);
      }
    };

    // Gọi ngay lập tức và mỗi 1s
    checkToken();
    const interval = setInterval(checkToken, 1000);

    return () => clearInterval(interval);
  }, [token]);

  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors duration={3000} />
      <Routes>
        <Route
          path="/"
          element={token ? <AdminDashboard /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/dashboard"
          element={token ? <AdminDashboard /> : <Navigate to="/login" replace />}
        />
        <Route path="/login" element={<LoginForm setToken={setToken} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
