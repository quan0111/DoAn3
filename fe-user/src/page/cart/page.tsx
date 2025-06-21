import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Loader2 } from "lucide-react";

interface CartItem {
  id: number;
  service_id: number;
  service_name: string;
  price: string;
  quantity: number;
}

interface JwtPayload {
  role: string;
  exp?: number;
}

export default function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Vui lòng đăng nhập để xem giỏ hàng");
        navigate("/login");
        return;
      }

      try {
        const decoded: JwtPayload = jwtDecode(token);
        if (decoded.role !== "employer" || (decoded.exp && decoded.exp < Date.now() / 1000)) {
          toast.error("Phiên đăng nhập không hợp lệ");
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:3000/user_services", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          if (!Array.isArray(response.data)) {
            throw new Error("Dữ liệu giỏ hàng không đúng định dạng");
          }
          setCartItems(response.data);
          // Tính tổng tiền
          const total = response.data.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
          setTotalAmount(total);
        } else {
          throw new Error("Không thể tải giỏ hàng");
        }
      } catch (error: any) {
        console.error("Fetch cart error:", error);
        const errorMessage = error.response?.data?.message || "Không thể tải giỏ hàng. Vui lòng thử lại.";
        setFetchError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchCart();
  }, [navigate]);

  const handleRemoveItem = async (serviceId: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Vui lòng đăng nhập để xóa dịch vụ");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.delete(`http://localhost:3000/user_services/${serviceId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setCartItems((prev) => prev.filter((item) => item.service_id !== serviceId));
        const total = cartItems
          .filter((item) => item.service_id !== serviceId)
          .reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
        setTotalAmount(total);
        toast.success("Đã xóa dịch vụ khỏi giỏ hàng!");
      } else {
        throw new Error("Xóa dịch vụ thất bại");
      }
    } catch (error: any) {
      console.error("Remove cart item error:", error);
      toast.error(error.response?.data?.message || "Xóa dịch vụ thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Vui lòng đăng nhập để tạo đơn hàng");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/user_services",
        {
          action: "create_order",
          services: cartItems.map((item) => ({
            service_id: item.service_id,
            quantity: item.quantity,
          })),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        toast.success("Đơn hàng đã được tạo!");
        navigate("/order-tracking");
      } else {
        throw new Error("Tạo đơn hàng thất bại");
      }
    } catch (error: any) {
      console.error("Create order error:", error);
      toast.error(error.response?.data?.message || "Tạo đơn hàng thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="text-center text-red-500">
        <p>{fetchError}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Thử lại
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Giỏ hàng</h1>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center font-bold bg-gray-200 p-2">
        <div>Tên dịch vụ</div>
        <div>Đơn giá (VND)</div>
        <div>Số lượng</div>
        <div>Số tiền (VND)</div>
        <div>Thao tác</div>
      </div>
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="grid grid-cols-5 text-center items-center p-2 border-b">
              <div>{item.service_name}</div>
              <div>{parseFloat(item.price).toLocaleString("vi-VN")}</div>
              <div>{item.quantity}</div>
              <div>{(parseFloat(item.price) * item.quantity).toLocaleString("vi-VN")}</div>
              <div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveItem(item.service_id)}
                  disabled={loading}
                >
                  Xóa
                </Button>
              </div>
            </div>
          ))}
          <div className="bg-gray-100 p-4 mt-4">
            <h2 className="text-xl font-bold mb-4">THÔNG TIN ĐƠN HÀNG</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Tổng giá trị đơn hàng</span>
                <span>{totalAmount.toLocaleString("vi-VN")} VND</span>
              </div>
              <div className="flex justify-between">
                <span>Tổng tiền chưa bao gồm VAT</span>
                <span>{(totalAmount * 0.92).toLocaleString("vi-VN")} VND</span>
              </div>
              <div className="flex justify-between">
                <span>VAT (8%)</span>
                <span>{(totalAmount * 0.08).toLocaleString("vi-VN")} VND</span>
              </div>
              <div className="flex justify-between">
                <span>Mã ưu đãi</span>
                <input type="text" className="border p-1" placeholder="Chọn mã ưu đãi" />
              </div>
            </div>
            <div className="mt-4">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Bản có yêu cầu xuất hóa đơn điện tử không? *
              </label>
            </div>
            <div className="mt-2 text-green-600">
              <input type="checkbox" checked className="mr-2" />
              Tôi đồng ý với Điều khoản dịch vụ của TopCV
            </div>
            <Button
              className="w-full bg-green-500 hover:bg-green-600 mt-4"
              onClick={handleCreateOrder}
              disabled={loading || cartItems.length === 0}
            >
              {loading ? "Đang xử lý..." : "Tạo đơn hàng"}
            </Button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">Giỏ hàng trống</p>
      )}
      <Toaster />
    </div>
  );
}