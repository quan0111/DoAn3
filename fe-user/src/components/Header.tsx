
import { Link } from "react-router-dom";
import { FileText, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

interface User {
  user_id: number;
  full_name: string;
  email: string;
  avatar_url?: string | null;
  phone?: string | null;
  gender?: "male" | "female" | "other" | null;
  dob?: string | null;
  role?: string;
}
export function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
const [user, setUser] = useState<User>({
    user_id: 0,
    full_name: "",
    email: "",
    avatar_url: null,
    phone: null,
    gender: null,
    dob: null,
    role: "",
  });
 useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp < currentTime) {
          console.log("Token đã hết hạn");
          Cookies.remove("token");
          return;
        }

        const userId = decodedToken.userId;
        const email = decodedToken.email || "";
        const role = decodedToken.role || "";

        const fetchUserData = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/userss/${userId}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            const userData = Array.isArray(response.data) && response.data.length > 0 ? response.data[0] : response.data.user || response.data;
            setUser({
              user_id: userData.user_id || userId,
              full_name: userData.full_name || email.split("@")[0],
              email: userData.email || email,
              avatar_url: userData.avatar_url || null,
              phone: userData.phone || null,
              gender: userData.gender || null,
              dob: userData.dob || null,
              role: userData.role || role,
            });
            setIsAuthenticated(true);
          } catch (error) {
            console.error("Lỗi khi fetch thông tin người dùng:", error);
            setUser({
              user_id: userId,
              full_name: email.split("@")[0],
              email: email,
              avatar_url: null,
              phone: null,
              gender: null,
              dob: null,
              role: role,
            });
            setIsAuthenticated(true);
          }
        };

        fetchUserData();
      } catch (error) {
        console.error("Lỗi khi decode token:", error);
      }
    }
  }, []);

const handleLogout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser({
      user_id: 0,
      full_name: "",
      email: "",
      avatar_url: null,
      phone: null,
      gender: null,
      dob: null,
      role: "",
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-green-50 to-white/90 backdrop-blur supports-[backdrop-filter]:bg-green-50/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link to="/" className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-green-600" />
            <span className="font-bold text-xl text-green-700">TopCV</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link to="/mau-cv" className="text-sm font-medium transition-colors hover:text-green-600">
              Mẫu CV
            </Link>
            <Link to="/mau-cv" className="text-sm font-medium transition-colors hover:text-green-600">
              Tạo CV
            </Link>
            <Link to="/viec-lam" className="text-sm font-medium transition-colors hover:text-green-600">
              Tư Vấn Nghề Nghiệp
            </Link>
            <Link to="/" className="text-sm font-medium transition-colors hover:text-green-600">
              Bảng Giá
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  {user.avatar_url ? (
                    <img
                      src={`http://localhost:3000${user.avatar_url}`}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-300 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white font-semibold">
                        {user.full_name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <span className="text-sm font-semibold text-gray-700">{user.full_name}</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 bg-gradient-to-br from-green-50 to-white rounded-xl shadow-lg p-1">
                <div className="px-3 py-2 text-sm text-gray-800 bg-white/80 rounded-lg mb-1">
                  Tài khoản đã xác thực
                  <div className="text-xs">ID {user.user_id} | {user.email} | Role: {user.role}</div>
                </div>
                <DropdownMenuItem>
                  <Link to="/viec-lam" className="flex items-center w-full hover:bg-green-100 p-2 rounded-lg transition-colors">
                    <span className="mr-3 text-green-600">📋</span> Quản lý tìm việc
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/quan-ly-cv" className="flex items-center w-full hover:bg-green-100 p-2 rounded-lg transition-colors">
                    <span className="mr-3 text-green-600">📄</span> Quản lý CV & Cover letter
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/employer-view" className="flex items-center w-full hover:bg-green-100 p-2 rounded-lg transition-colors">
                    <span className="mr-3 text-green-600">👤</span> Nhà tuyển dụng xem hồ sơ
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/email-settings" className="flex items-center w-full hover:bg-green-100 p-2 rounded-lg transition-colors">
                    <span className="mr-3 text-green-600">✉️</span> Cài đặt email & thông báo
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/ho-so-nguoi-dung" className="flex items-center w-full hover:bg-green-100 p-2 rounded-lg transition-colors">
                    <span className="mr-3 text-green-600">🔒</span> Cá nhân & Bảo mật
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/upgrade" className="flex items-center w-full hover:bg-green-100 p-2 rounded-lg transition-colors">
                    <span className="mr-3 text-green-600">⬆️</span> Nâng cấp tài khoản
                  </Link>
                </DropdownMenuItem>
                {user.role === "admin" && (
                  <DropdownMenuItem>
                    <a href="http://localhost:5174/" className="flex items-center w-full hover:bg-green-100 p-2 rounded-lg transition-colors">
                      <span className="mr-3 text-green-600">👑</span> Trang quản trị
                    </a>
                  </DropdownMenuItem>
                )}
                {user.role === "employer" && (
                  <DropdownMenuItem>
                    <a href="http://localhost:5175/" className="flex items-center w-full hover:bg-green-100 p-2 rounded-lg transition-colors">
                      <span className="mr-3 text-green-600">🏢</span> Trang tuyển dụng
                    </a>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleLogout} className="hover:bg-red-100 p-2 rounded-lg transition-colors">
                  <div className="flex items-center w-full">
                    <LogOut className="mr-3 h-4 w-4 text-red-500" />
                    <span className="text-red-500">Đăng xuất</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/Login" className="text-sm font-medium hover:underline text-gray-700">
                Đăng Nhập
              </Link>
              <Link to="/dang-ky">
                <Button className="bg-green-600 hover:bg-green-700 text-white">Bắt Đầu</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
