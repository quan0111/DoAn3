import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Loader2 } from "lucide-react";

interface Service {
  id: number;
  name: string;
  price: string;
  duration: string;
  bonus_credits: number;
  top_box_description: string;
  re_top_gold: number;
  re_top_normal: number;
  top_job_alert: number;
  urgent_add_on: number;
  discount_percent: number;
  vat_included: number;
  image_url: string;
  user_type: string;
  category_id: number;
  active: number;
}

interface CartItem {
  id:number;
  quantity:number;
  service_id: number;
  service_name: string;
  price: number;
}

interface JwtPayload {
  role: string;
  exp?: number;
}

export default function ServicesPage() {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Load dữ liệu dịch vụ từ API
  useEffect(() => {
    const fetchServices = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Vui lòng đăng nhập để xem dịch vụ");
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

        const response = await axios.get("http://localhost:3000/payment_servicess", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("API response:", response.data); // Log để debug

        if (response.status === 200) {
          // Kiểm tra dữ liệu là mảng
          if (!Array.isArray(response.data)) {
            throw new Error("Dữ liệu dịch vụ không đúng định dạng");
          }
          setServices(response.data);
        } else {
          throw new Error("Không thể tải danh sách dịch vụ");
        }
      } catch (error: any) {
        console.error("Fetch services error:", error);
        const errorMessage = error.response?.data?.message || "Không thể tải danh sách dịch vụ. Vui lòng thử lại.";
        setFetchError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchServices();
  }, [navigate]);

const handlePayment = (service: Service, action: "buy_now" | "add_to_cart") => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("Vui lòng đăng nhập để tiếp tục");
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

    setLoading((prev) => ({ ...prev, [`${service.id}-${action}`]: true }));

    // Lấy giỏ hàng từ localStorage
    const cart = localStorage.getItem("cart");
    let cartItems: CartItem[] = cart ? JSON.parse(cart) : [];

    // Kiểm tra xem dịch vụ đã tồn tại trong giỏ hàng chưa
    const existingIndex = cartItems.findIndex(item => item.service_id === service.id);

    if (existingIndex !== -1) {
      // Nếu đã tồn tại, cộng thêm 1 vào quantity
      cartItems[existingIndex].quantity += 1;
    } else {
      // Nếu chưa có, thêm mới với id tiếp theo
      const nextId = cartItems.length > 0 ? Math.max(...cartItems.map(item => item.id)) + 1 : 1;
      const newItem: CartItem = {
        id: nextId,
        service_id: service.id,
        service_name: service.name,
        quantity: 1,
        price: parseFloat(service.price),
      };
      cartItems.push(newItem);
    }

    // Lưu lại vào localStorage
    localStorage.setItem("cart", JSON.stringify(cartItems));

    if (action === "buy_now") {
      toast.success("Đã thêm vào giỏ hàng, đang chuyển đến giỏ hàng...");
      navigate("/cart");
    } else {
      toast.success("Đã thêm vào giỏ hàng!");
    }
  } catch (error: any) {
    console.error("Cart error:", error);
    toast.error("Thêm vào giỏ hàng thất bại. Vui lòng thử lại.");
  } finally {
    setLoading((prev) => ({ ...prev, [`${service.id}-${action}`]: false }));
  }
};


  // Phân loại dịch vụ
  const trialServices = services.filter((service) => service.category_id === 1);
  const premiumServices = services.filter((service) => service.category_id === 2);

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
      <h1 className="text-2xl font-bold">Mua dịch vụ</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {trialServices.length > 0 ? (
          trialServices.map((service) => (
            <Card
              key={service.id}
              className={`border-${service.category_id === 1 ? "orange" : "blue"}-200`}
            >
              <CardHeader>
                <CardTitle className={`text-${service.category_id === 1 ? "orange" : "blue"}-600`}>
                  {service.name}
                </CardTitle>
                <div className="text-2xl font-bold">
                  {parseFloat(service.price).toLocaleString("vi-VN")} VND
                  {service.vat_included ? " (Đã bao gồm VAT)" : ""}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">{service.top_box_description}</p>
                <p className="text-sm text-gray-600 mb-2">Thời gian: {service.duration}</p>
                {service.discount_percent > 0 && (
                  <p className="text-sm text-green-600 mb-2">Giảm giá: {service.discount_percent}%</p>
                )}
                <ul className="text-sm text-gray-600 mb-4 list-disc list-inside">
                  {service.re_top_gold > 0 && <li>{service.re_top_gold} lần đẩy top vàng</li>}
                  {service.re_top_normal > 0 && <li>{service.re_top_normal} lần đẩy top thường</li>}
                  {service.top_job_alert > 0 && <li>{service.top_job_alert} thông báo việc làm</li>}
                  {service.urgent_add_on > 0 && <li>{service.urgent_add_on} gắn nhãn khẩn cấp</li>}
                  {service.bonus_credits > 0 && <li>Tặng {service.bonus_credits} credits</li>}
                </ul>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handlePayment(service, "add_to_cart")}
                    disabled={loading[`${service.id}-add_to_cart`]}
                  >
                    🛒 {loading[`${service.id}-add_to_cart`] ? "Đang xử lý..." : "Thêm vào giỏ"}
                  </Button>
                  <Button
                    className="w-full bg-green-500 hover:bg-green-600"
                    onClick={() => handlePayment(service, "buy_now")}
                    disabled={loading[`${service.id}-buy_now`]}
                  >
                    {loading[`${service.id}-buy_now`] ? "Đang xử lý..." : "Mua ngay"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">Không có dịch vụ thử nghiệm nào</p>
        )}
      </div>

      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">TOP JOBS | ĐĂNG TIN TUYỂN DỤNG HIỆU SUẤT CAO</h3>
        <p className="text-gray-600 mb-6">
          Công hướng sức mạnh công nghệ tạo ra hiệu quả đột phá cho tin tuyển dụng của Doanh nghiệp
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {premiumServices.length > 0 ? (
          premiumServices.map((service) => (
            <Card
              key={service.id}
              className={`border-${service.category_id === 2 ? "green" : "blue"}-200 relative`}
            >
              {service.category_id === 2 && (
                <div className="absolute -top-2 right-4">
                  <Badge className="bg-yellow-500 text-white">VIP</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className={`text-${service.category_id === 2 ? "green" : "blue"}-600`}>
                  {service.name}
                </CardTitle>
                <div className="text-2xl font-bold">
                  {parseFloat(service.price).toLocaleString("vi-VN")} VND
                  {service.vat_included ? " (Đã bao gồm VAT)" : ""}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">{service.top_box_description}</p>
                <p className="text-sm text-gray-600 mb-2">Thời gian: {service.duration}</p>
                {service.discount_percent > 0 && (
                  <p className="text-sm text-green-600 mb-2">Giảm giá: {service.discount_percent}%</p>
                )}
                <ul className="text-sm text-gray-600 mb-4 list-disc list-inside">
                  {service.re_top_gold > 0 && <li>{service.re_top_gold} lần đẩy top vàng</li>}
                  {service.re_top_normal > 0 && <li>{service.re_top_normal} lần đẩy top thường</li>}
                  {service.top_job_alert > 0 && <li>{service.top_job_alert} thông báo việc làm</li>}
                  {service.urgent_add_on > 0 && <li>{service.urgent_add_on} gắn nhãn khẩn cấp</li>}
                  {service.bonus_credits > 0 && <li>Tặng {service.bonus_credits} credits</li>}
                </ul>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handlePayment(service, "add_to_cart")}
                    disabled={loading[`${service.id}-add_to_cart`]}
                  >
                    🛒 {loading[`${service.id}-add_to_cart`] ? "Đang xử lý..." : "Thêm vào giỏ"}
                  </Button>
                  <Button
                    className="w-full bg-green-500 hover:bg-green-600"
                    onClick={() => handlePayment(service, "buy_now")}
                    disabled={loading[`${service.id}-buy_now`]}
                  >
                    {loading[`${service.id}-buy_now`] ? "Đang xử lý..." : "Mua ngay"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">Không có dịch vụ cao cấp nào</p>
        )}
      </div>
      <Toaster />
    </div>
  );
}