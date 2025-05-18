import React from "react";

interface FooterProps {
  onSave: () => void;
}

const Footer: React.FC<FooterProps> = ({ onSave }) => {
  return (
    <footer className="bg-blue-900 text-white p-4 flex justify-between items-center shadow-inner">
      <div>
        <button 
          onClick={onSave} 
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-md transition-all duration-200"
        >
          Lưu CV
        </button>
      </div>
      <div className="text-sm text-green-200">Đã lưu thành công!</div>
    </footer>
  );
};

export default Footer;