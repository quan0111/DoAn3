import { Outlet } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { FloatingAction } from "@/components/layout/floating-action";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "Inter, sans-serif" }}>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet /> {/* Render các trang con */}
          </div>
        </main>
      </div>
      <FloatingAction />
    </div>
  );
}