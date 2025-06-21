
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";
import axios from "axios";

// Type definitions
interface User {
  user_id: number;
  full_name: string;
  email: string;
  avatar_url?: string | null;
  phone?: string | null;
  gender?: "male" | "female" | "other" | null;
  dob?: string | null;
}

interface ProfileData {
  user?: User; // Cho phép user có thể undefined
}

// Mở rộng để xử lý trường hợp API trả về mảng
type ApiResponse = User[] | ProfileData;

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarInput, setAvatarInput] = useState<HTMLInputElement | null>(null); // Tham chiếu đến input file
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

 useEffect(() => {
  const fetchProfileData = async () => {
    const token = Cookies.get("token");
    if (!token) {
      setError("Không tìm thấy token.");
      return;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp < currentTime) {
        Cookies.remove("token");
        setError("Token đã hết hạn.");
        return;
      }

      const userId = decodedToken.userId;
      const response = await axios.get<User>(`http://localhost:3000/userss/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userData = response.data;

      if (userData && userData.user_id) {
        const updatedUser = { ...userData };
        if (updatedUser.dob) {
          updatedUser.dob = new Date(updatedUser.dob).toLocaleDateString("vi-VN");
        }
        setUser(updatedUser);
        setEditedUser(updatedUser);
      } else {
        setError("Dữ liệu user không tồn tại trong phản hồi API.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin profile:", error);
      setError("Không thể tải thông tin profile. Vui lòng thử lại sau.");
    }
  };

  fetchProfileData();
}, []);


  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const token = Cookies.get("token");
    if (!token || !editedUser) return;

    try {
      let updatedUser = { ...editedUser };
      if (avatarFile) {
        const formData = new FormData();
        formData.append("avatar", avatarFile);
        await axios.post(`http://localhost:3000/userss/${editedUser.user_id}/upload-avatar`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        // Fetch lại để cập nhật avatar_url
        const response = await axios.get<ApiResponse>(`http://localhost:3000/userss/${editedUser.user_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = response.data;
        if (Array.isArray(data) && data.length > 0) {
          updatedUser = { ...data[0] };
          if (updatedUser.dob) {
            updatedUser.dob = new Date(updatedUser.dob).toLocaleDateString("vi-VN");
          }
        }
      }

      // Kiểm tra và cập nhật mật khẩu
      if (newPassword || confirmPassword || currentPassword) {
        if (!currentPassword) {
          setError("Vui lòng nhập mật khẩu cũ.");
          return;
        }
        if (newPassword !== confirmPassword) {
          setError("Mật khẩu mới và xác nhận mật khẩu không khớp.");
          return;
        }
        if (newPassword.length < 8 || !/[A-Za-z]/.test(newPassword) || !/\d/.test(newPassword)) {
          setError("Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ và số.");
          return;
        }

        // Kiểm tra mật khẩu cũ với API
        const verifyResponse = await axios.post(
          `http://localhost:3000/userss/${editedUser.user_id}/verify-password`,
          { password: currentPassword },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!verifyResponse.data.success) {
          setError("Mật khẩu cũ không đúng.");
          return;
        }

        // Cập nhật mật khẩu mới
        await axios.put(
          `http://localhost:3000/userss/${editedUser.user_id}/change-password`,
          { password: newPassword },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNewPassword("");
        setConfirmPassword("");
        setCurrentPassword("");
      }

      await axios.put(`http://localhost:3000/userss/${editedUser.user_id}`, updatedUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(updatedUser);
      setEditedUser(updatedUser);
      setIsEditing(false);
      setAvatarFile(null); // Xóa file sau khi upload
      setError(null); // Xóa lỗi sau khi lưu thành công
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error);
      setError("Không thể cập nhật thông tin. Vui lòng thử lại.");
    }
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
    setAvatarFile(null); // Xóa file khi hủy
    setNewPassword("");
    setConfirmPassword("");
    setCurrentPassword("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editedUser) {
      setEditedUser({ ...editedUser, [name]: value });
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
      // Ẩn input sau khi chọn file
      if (avatarInput) avatarInput.value = "";
    }
  };

  const handleAvatarClick = () => {
    if (isEditing && avatarInput) {
      avatarInput.click(); // Mở input file khi nhấp vào avatar
    }
  };

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-12">
          <div className="container">
            <div className="grid grid-cols-1 gap-8">
              <div>
                <Card>
                  <CardContent className="space-y-4 text-center">
                    {error ? (
                      <p className="text-red-500">{error}</p>
                    ) : (
                      <p>Loading...</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 min-h-[600px]">
            <div>
              <Card>
                <CardHeader className="h-16 flex items-center text-center justify-center text-2xl">
                  <CardTitle className="text-center">Thông tin cá nhân</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div className="flex flex-col items-center mb-4">
                    <div
                      onClick={handleAvatarClick}
                      className="relative cursor-pointer"
                    >
                      {user.avatar_url ? (
                        <img
                          src={`http://localhost:3000${user.avatar_url}`}
                          alt="Avatar"
                          className="h-32 w-32 rounded-full"
                        />
                      ) : (
                        <div className="h-32 w-32 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center">
                          <span className="text-gray-700 font-semibold">Avatar</span>
                        </div>
                      )}
                      {isEditing && (
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          ref={(input) => setAvatarInput(input)}
                          className="hidden" // Ẩn input
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <Label>Họ và tên</Label>
                    <Input
                      name="full_name"
                      value={editedUser?.full_name || ""}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      name="email"
                      value={editedUser?.email || ""}
                      onChange={handleChange}
                      disabled={!isEditing || true}
                    />
                  </div>
                  <div>
                    <Label>Số điện thoại</Label>
                    <Input
                      name="phone"
                      value={editedUser?.phone || ""}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label>Giới tính</Label>
                    <Input
                      name="gender"
                      value={editedUser?.gender || ""}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label>Ngày sinh</Label>
                    <Input
                      name="dob"
                      value={editedUser?.dob || ""}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label>Mật khẩu cũ</Label>
                    <Input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      disabled={!isEditing}
                      placeholder="Nhập mật khẩu cũ"
                    />
                  </div>
                  <div>
                    <Label>Mật khẩu mới</Label>
                    <Input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      disabled={!isEditing}
                      placeholder="Nhập mật khẩu mới"
                    />
                  </div>
                  <div>
                    <Label>Xác nhận mật khẩu</Label>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={!isEditing}
                      placeholder="Xác nhận mật khẩu mới"
                    />
                  </div>
                  {isEditing ? (
                    <div className="flex gap-2">
                      <Button onClick={handleSave}>Lưu</Button>
                      <Button variant="outline" onClick={handleCancel}>Hủy</Button>
                    </div>
                  ) : (
                    <Button onClick={handleEdit}>Chỉnh sửa thông tin</Button>
                  )}
                  {error && <p className="text-red-500 text-center">{error}</p>}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
