import React, { useState } from "react";

interface SidebarProps {
  onUpdate: (section: string, value: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onUpdate }) => {
  const [isAddSectionOpen, setIsAddSectionOpen] = useState(false);
  const [isFormatOpen, setIsFormatOpen] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate("image", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSection = (section: string, defaultValue: any) => {
    onUpdate(section, defaultValue);
    setIsAddSectionOpen(false);
  };

  const handleFormatChange = (key: string, value: string) => {
    onUpdate(key, value);
  };

  return (
    <div className="w-64 bg-white p-6 shadow-lg border-r border-gray-200">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Công cụ chỉnh sửa</h2>
      
      {/* Thêm mục */}
      <div className="mb-6">
        <button
          onClick={() => setIsAddSectionOpen(!isAddSectionOpen)}
          className="w-full text-left p-3 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors duration-200 flex items-center"
        >
          <span className="mr-2">➕</span> Thêm mục
        </button>
        {isAddSectionOpen && (
          <ul className="mt-2 space-y-2 pl-4">
            <li>
              <button
                onClick={() =>
                  handleAddSection("experience", [
                    ...(onUpdate as any).experience || [],
                    { company: "", role: "", duration: "" },
                  ])
                }
                className="w-full text-left p-2 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors duration-200 flex items-center"
              >
                <span className="mr-2">📅</span> Kinh nghiệm
              </button>
            </li>
            <li>
              <button
                onClick={() =>
                  handleAddSection("education", [
                    ...(onUpdate as any).education || [],
                    { school: "", degree: "", year: "" },
                  ])
                }
                className="w-full text-left p-2 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors duration-200 flex items-center"
              >
                <span className="mr-2">🎓</span> Học vấn
              </button>
            </li>
            <li>
              <button
                onClick={() =>
                  handleAddSection("skills", [...(onUpdate as any).skills || [], ""])
                }
                className="w-full text-left p-2 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors duration-200 flex items-center"
              >
                <span className="mr-2">🛠️</span> Kỹ năng
              </button>
            </li>
            <li>
              <button
                onClick={() =>
                  handleAddSection("certifications", [
                    ...(onUpdate as any).certifications || [],
                    { name: "", year: "" },
                  ])
                }
                className="w-full text-left p-2 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors duration-200 flex items-center"
              >
                <span className="mr-2">📜</span> Chứng chỉ
              </button>
            </li>
            <li>
              <button
                onClick={() => handleAddSection("objective", "")}
                className="w-full text-left p-2 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors duration-200 flex items-center"
              >
                <span className="mr-2">🎯</span> Mục tiêu nghề nghiệp
              </button>
            </li>
            <li>
              <button
                onClick={() =>
                  handleAddSection("hobbies", [...(onUpdate as any).hobbies || [], ""])
                }
                className="w-full text-left p-2 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors duration-200 flex items-center"
              >
                <span className="mr-2">🎮</span> Sở thích
              </button>
            </li>
          </ul>
        )}
      </div>

      {/* Định dạng CV */}
      <div className="mb-6">
        <button
          onClick={() => setIsFormatOpen(!isFormatOpen)}
          className="w-full text-left p-3 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors duration-200 flex items-center"
        >
          <span className="mr-2">🎨</span> Định dạng CV
        </button>
        {isFormatOpen && (
          <div className="mt-2 space-y-4 pl-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Màu nền</label>
              <select
                onChange={(e) => handleFormatChange("backgroundColor", e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                <option value="bg-white">Trắng</option>
                <option value="bg-gray-50">Xám nhạt</option>
                <option value="bg-green-50">Xanh nhạt</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Font chữ</label>
              <select
                onChange={(e) => handleFormatChange("font", e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                <option value="font-sans">Sans-serif</option>
                <option value="font-roboto">Roboto</option>
                <option value="font-times">Times New Roman</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Thêm ảnh */}
      <div className="mb-6">
        <label className="w-full text-left p-3 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors duration-200 flex items-center cursor-pointer">
          <span className="mr-2">📸</span> Thêm ảnh
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Tùy chỉnh nhanh */}
      <div>
        <button
          onClick={() => onUpdate("name", prompt("Nhập tên") || "")}
          className="w-full text-left p-3 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors duration-200 flex items-center"
        >
          <span className="mr-2">📝</span> Sửa tên
        </button>
        <button
          onClick={() => onUpdate("title", prompt("Nhập chức danh") || "")}
          className="w-full text-left p-3 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors duration-200 flex items-center mt-2"
        >
          <span className="mr-2">💼</span> Sửa chức danh
        </button>
      </div>
    </div>
  );
};

export default Sidebar;