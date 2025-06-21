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
  price: number;
  quantity: number;
}

interface PaymentRequest {
  user_id: number;
  payment_service_id: number;
  price: number;
  discount_percent: number;
  vat_percent: number;
  total_amount: number;
  payment_method: string;
  status: string;
  paid_at: string | null;
  expired_at: string;
}

interface JwtPayload {
  role: string;
  exp?: number;
  userId?: number; // Đảm bảo khớp với token
}

export default function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Vui lòng đăng nhập để xem giỏ hàng");
      navigate("/login");
      return;
    }

    try {
      const decoded: JwtPayload = jwtDecode(token);
      console.log("Decoded token:", decoded);
      if (decoded.role !== "employer" || (decoded.exp && decoded.exp < Date.now() / 1000)) {
        toast.error("Phiên đăng nhập không hợp lệ");
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      const cart = localStorage.getItem("cart");
      if (cart) {
        const items: CartItem[] = JSON.parse(cart);
        setCartItems(items);
        const total = items.reduce((sum, item) => {
          const basePrice = item.price * item.quantity;
          const discount = basePrice * (5 / 100); // Giả định discount_percent = 5
          const vat = (basePrice - discount) * (10 / 100); // Giả định vat_percent = 10
          return sum + (basePrice - discount + vat);
        }, 0);
        setTotalAmount(total);
      }
    } catch (error) {
      console.error("Cart load error:", error);
      setFetchError("Không thể tải giỏ hàng. Vui lòng thử lại.");
      toast.error("Không thể tải giỏ hàng. Vui lòng thử lại.");
    } finally {
      setFetchLoading(false);
    }
  }, [navigate]);

  const handleUpdateQuantity = (serviceId: number, delta: number) => {
    setCartItems((prev) => {
      const updatedItems = prev.map((item) =>
        item.service_id === serviceId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      const total = updatedItems.reduce((sum, item) => {
        const basePrice = item.price * item.quantity;
        const discount = basePrice * (5 / 100);
        const vat = (basePrice - discount) * (10 / 100);
        return sum + (basePrice - discount + vat);
      }, 0);
      setTotalAmount(total);
      return updatedItems;
    });
  };

  const handleRemoveItem = (serviceId: number) => {
    const updatedItems = cartItems.filter((item) => item.service_id !== serviceId);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    setCartItems(updatedItems);
    const total = updatedItems.reduce((sum, item) => {
      const basePrice = (item.price) * item.quantity;
      const discount = basePrice * (5 / 100);
      const vat = (basePrice - discount) * (10 / 100);
      return sum + (basePrice - discount + vat);
    }, 0);
    setTotalAmount(total);
    toast.success("Đã xóa dịch vụ khỏi giỏ hàng!");
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
    const decoded: JwtPayload = jwtDecode(token);
    const user_id = decoded.userId || 4; // Lấy từ token, mặc định là 4

    const createdIds: number[] = [];

    for (const item of cartItems) {
      const basePrice = (item.price) * item.quantity;
      const discount = basePrice * 0.05;
      const vat = (basePrice - discount) * 0.10;
      const total_amount = basePrice - discount + vat;

      const paymentRequest: PaymentRequest = {
        user_id,
        payment_service_id: item.service_id,
        price: basePrice,
        discount_percent: 5,
        vat_percent: 10,
        total_amount,
        payment_method: "bank_transfer",
        status: "pending",
        paid_at: null,
        expired_at: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 5 ngày từ hôm nay
      };

      const response = await axios.post(
        "http://localhost:3000/user_paymentss",
        paymentRequest,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200 || response.status === 201) {
        createdIds.push(response.data.id);
      } else {
        throw new Error("Tạo đơn hàng thất bại");
      }
    }

    if (createdIds.length === cartItems.length) {
      setCartItems([]);
      setTotalAmount(0);
      localStorage.removeItem("cart");
      toast.success("Đơn hàng đã được tạo thành công!");
      navigate("/order-tracking");
    } else {
      throw new Error("Một số đơn hàng không được tạo thành công");
    }
  } catch (error: any) {
    console.error("Create order error:", error.response?.data || error.message);
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
          {cartItems.map((item) => {
            const basePrice = (item.price) * item.quantity;
            const discount = basePrice * (5 / 100);
            const vat = (basePrice - discount) * (10 / 100);
            const itemTotal = basePrice - discount + vat;
            return (
              <div key={item.id} className="grid grid-cols-5 text-center items-center p-2 border-b">
                <div>{item.service_name}</div>
                <div>{(item.price).toLocaleString("vi-VN")|| null}</div>
                <div className="flex justify-center items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUpdateQuantity(item.service_id, -1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="mx-2">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUpdateQuantity(item.service_id, 1)}
                  >
                    +
                  </Button>
                </div>
                <div>{itemTotal.toLocaleString("vi-VN")}</div>
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
            );
          })}
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
                <span>VAT (10%)</span>
                <span>{(totalAmount * 0.1).toLocaleString("vi-VN")} VND</span>
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