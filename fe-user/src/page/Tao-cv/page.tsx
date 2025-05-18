import React, { useState } from "react";
import { Header } from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import CVEditor from "@/components/cv-editor";
import { Footer } from "@/components/footer";

interface CVData {
  name: string;
  title: string;
  email: string;
  phone: string;
  about: string;
  experience: { company: string; role: string; duration: string }[];
  education: { school: string; degree: string; year: string }[];
  skills: string[];
  image?: string;
}

const App: React.FC = () => {
  const [cvData, setCvData] = useState<CVData>({
    name: "Quân Đào",
    title: "Lập trình viên",
    email: "quandao@gmail.com",
    phone: "0123456789",
    about: "Tôi có 6 năm kinh nghiệm lập trình, từng làm việc với các dự án lớn...",
    experience: [
      { company: "FrontEnd Developer", role: "Lập trình viên", duration: "2021 - 2024" },
      { company: "Flutter Developer", role: "Lập trình viên", duration: "2019 - 2021" },
    ],
    education: [{ school: "ĐH CNTT", degree: "Cử nhân CNTT", year: "2017" }],
    skills: ["HTML", "CSS", "JavaScript", "React", "Flutter"],
    image: "https://via.placeholder.com/100",
  });

  const handleUpdateSection = (section: string, value: any) => {
    setCvData((prev) => ({ ...prev, [section]: value }));
  };

  const handleSaveCV = () => {
    alert("Đã lưu CV thành công!");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex">
        <Sidebar onUpdate={handleUpdateSection} />
        <CVEditor data={cvData} onUpdate={handleUpdateSection} />
      </div>
      <Footer/>
    </div>
  );
};

export default App;