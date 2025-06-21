import { useState, useEffect } from "react";
import { CVEditor } from "@/components/cv-editor/cv-editor";
import { Header } from "@/components/Header";
import { Footer } from "@/components/footer";
import { CVImportSection } from "@/components/cv-import";
import { Button } from "@/components/ui/button";
import { ChevronRight, Eye, Star, CheckCircle, Share2, Bookmark, ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

interface CVTemplate {
  template_id: number;
  name: string;
  thumbnail_url: string;
  description: string;
  html_structure: string;
  css_styles: string;
  category_id: number;
  is_premium: boolean;
  price: string;
  popularity_score: number;
  category_name: string;
}

export default function CVCreatePage() {
  const { id } = useParams<{ id: string }>();
  const [template, setTemplate] = useState<CVTemplate | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [cssContent, setCssContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchTemplate();
    }
  }, [id]);

  const fetchTemplate = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`http://localhost:3000/cv_templatess/public/${id}`);
      setTemplate(res.data);
      setHtmlContent(res.data.html_structure || "");
      setCssContent(res.data.css_styles || "body { font-family: Arial; }");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Lỗi tải mẫu CV");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!template || !htmlContent || !cssContent) return;

    try {
      await axios.put(`http://localhost:3000/cv_templatess/${template.template_id}`, {
        ...template,
        html_structure: htmlContent,
        css_styles: cssContent,
      });
      toast.success("Lưu CV thành công!");
    } catch (err: any) {
      toast.error("Lưu CV thất bại. Vui lòng thử lại!");
    }
  };

  if (isLoading) {
    return <div className="container py-12 text-center">Đang tải...</div>;
  }

  if (!template) {
    return <div className="container py-12 text-center">Mẫu CV không tồn tại</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <Header />
      </header>

      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <div className="flex items-center text-emerald-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">{template.name}</span>
          </div>
          <div className="ml-auto flex items-center space-x-2">
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
              </svg>
            </button>
            <button className="flex items-center text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
              Xem trước
            </button>
            <Button className="bg-emerald-600 text-white px-4 py-2 rounded flex items-center text-sm font-medium" onClick={handleSave}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Lưu CV
            </Button>
          </div>
        </div>
      </div>

      <main>
        <CVEditor htmlContent={htmlContent} cssContent={cssContent} onUpdateHtml={setHtmlContent} onUpdateCss={setCssContent} />
        <CVImportSection />
      </main>
      <Footer />
    </div>
  );
}