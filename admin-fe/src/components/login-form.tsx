
"use client";

import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

type TokenPayload = {
  user_id: string;
  email: string;
  role: string;
  [key: string]: any;
};

interface LoginFormProps {
  setToken: (token: string | undefined) => void; // Prop để cập nhật token
}

export function LoginForm({ setToken }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Đang đăng nhập với:", { email }); // Debug
      const res = await axios.post(`http://localhost:3000/auth`, { email, password });
      const token = res.data.token;

      if (!token) {
        throw new Error("Không nhận được token từ server");
      }

      // Decode token
      const token_dcd = jwtDecode<TokenPayload>(token);
      if (token_dcd.role !== "admin") {
        console.log("Lỗi quyền:", token_dcd.role); // Debug
        toast.error("Bạn không có quyền truy cập hệ thống quản trị", { duration: 5000 });
        return;
      }

      // Lưu token vào cookie
      Cookies.set("token", token, {
        expires: 7,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });

      // Kiểm tra token
      const savedToken = Cookies.get("token");
      if (!savedToken) {
        throw new Error("Lỗi khi lưu token vào cookie");
      }

      // Cập nhật token state
      setToken(savedToken);
      console.log("Đăng nhập thành công, redirecting to /"); // Debug
      toast.success("Đăng nhập thành công", { duration: 5000 });
      navigate("/"); // Redirect đến /
    } catch (err: any) {
      const message = err.response?.data?.message || "Đăng nhập thất bại";
      console.error("Lỗi đăng nhập:", message); // Debug
      toast.error(message, { duration: 5000 });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">TopCV Admin</CardTitle>
          <CardDescription>Đăng nhập vào hệ thống quản trị</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@topcv.vn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" disabled={isLoading} />
              <Label htmlFor="remember" className="text-sm">
                Ghi nhớ đăng nhập
              </Label>
            </div>
            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600"
              disabled={isLoading}
            >
              {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Button variant="link" className="text-sm text-orange-600" disabled={isLoading}>
              Quên mật khẩu?
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
