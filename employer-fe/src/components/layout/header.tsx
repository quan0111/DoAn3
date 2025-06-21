"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);

  const getCartCount = () => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      try {
        const cart = JSON.parse(cartData);
        return Array.isArray(cart) ? cart.length : 0;
      } catch (e) {
        console.error("Error parsing cart data:", e);
        return 0;
      }
    }
    return 0;
  };

  useEffect(() => {
    setCartCount(getCartCount());
    const handleStorageChange = () => {
      setCartCount(getCartCount());
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <header className="bg-slate-800 text-white p-4 fixed top-0 left-0 w-full z-30 shadow-md">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <div className="text-xl font-bold">topcv</div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700">
            🔍 HR Insider
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700">
            👤 Đăng tin
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700">
            📄 Tìm CV
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700">
            🔗 Connect
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700">
            📊 Insights
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700 relative">
            🔔
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </Button>
          <Link to="/cart">
            <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700 relative">
              🛒 {cartCount}
            </Button>
          </Link>
          <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700">
            👤
          </Button>
        </div>
      </div>
    </header>
  );
}