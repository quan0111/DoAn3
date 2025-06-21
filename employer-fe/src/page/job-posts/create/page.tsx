"use client";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Users,
  Calendar,
  FileText,
  Eye,
  Save,
  Send,
} from "lucide-react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface JobFormData {
  // Step 1: Basic Info
  title: string;
  category: string;
  level: string;
  experience: string;
  workType: string;

  // Step 2: Location & Salary
  locations: string[];
  salaryType: string;
  salaryMin: string;
  salaryMax: string;
  currency: string;

  // Step 3: Job Details
  description: string;
  requirements: string;
  benefits: string;
  skills: string[];

  // Step 4: Company & Contact
    company_id: number;
  companyName: string;
  full_name: string;
  email: string;
  phone: string;

  // Step 5: Settings
  deadline: string;
  quantity: string;
  isUrgent: boolean;
  isHot: boolean;
}

interface CompanyData {
  company_id: number;
  company_name: string;
  contact_person: string;
  contact_phone: string;
}

interface UserData {
  user_id: number;
  full_name: string;
  email: string;
  phone_number: string;
}

const steps = [
  { id: 1, title: "Thông tin cơ bản", icon: FileText },
  { id: 2, title: "Địa điểm & Lương", icon: MapPin },
  { id: 3, title: "Mô tả công việc", icon: Users },
  { id: 4, title: "Thông tin liên hệ", icon: Users },
  { id: 5, title: "Cài đặt tin", icon: Calendar },
];

const jobCategories = [
  "Công nghệ thông tin",
  "Marketing/PR",
  "Kinh doanh/Bán hàng",
  "Nhân sự",
  "Kế toán/Tài chính",
  "Hành chính/Thư ký",
  "Thiết kế đồ họa",
  "Xây dựng",
  "Y tế/Dược",
  "Giáo dục/Đào tạo",
];

const jobLevels = [
  "Thực tập sinh",
  "Nhân viên",
  "Trưởng nhóm",
  "Trưởng phòng",
  "Phó giám đốc",
  "Giám đốc",
  "Tổng giám đốc",
];

const experienceLevels = [
  "Không yêu cầu kinh nghiệm",
  "Dưới 1 năm",
  "1-2 năm",
  "2-5 năm",
  "5-10 năm",
  "Trên 10 năm",
];

const workTypes = [
  "Toàn thời gian",
  "Bán thời gian",
  "Thực tập",
  "Freelance",
  "Theo ca",
];

const commonSkills = [
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "Java",
  "PHP",
  "MySQL",
  "MongoDB",
  "Git",
  "Docker",
  "AWS",
  "Marketing",
  "SEO",
  "Content Writing",
  "Photoshop",
  "Illustrator",
  "Excel",
  "PowerPoint",
  "English",
  "Communication",
];

// Hàm định dạng tiền VND
const formatCurrency = (value: string) => {
  const numValue = parseFloat(value) || 0;
  return numValue.toLocaleString("vi-VN", { style: "currency", currency: "VND" }).replace("₫", "");
};

// Hàm làm sạch giá trị nhập liệu số
const cleanNumericInput = (value: string): string => {
  return value.replace(/[^0-9]/g, "");
};

const formatInputWithZeros = (value: string): string => {
  const num = parseInt(value || "0") * 1000000;
  return num.toLocaleString("vi-VN"); // Ví dụ: "52.000"
};

export default function CreateJobPage() {
  const [cities, setCities] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<JobFormData>({
    company_id:0,
    title: "",
    category: "",
    level: "",
    experience: "",
    workType: "",
    locations: [],
    salaryType: "range",
    salaryMin: "",
    salaryMax: "",
    currency: "VND",
    description: "",
    requirements: "",
    benefits: "",
    skills: [],
    companyName: "",
    full_name: "",
    email: "",
    phone: "",
    deadline: "",
    quantity: "",
    isUrgent: false,
    isHot: false,
  });
  const [userData, setUserData] = useState<UserData | null>(null);
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchVietnamCities = async () => {
      try {
        const response = await axios.get("https://provinces.open-api.vn/api/?q=");
        const cityNames = response.data.map((item: any) => item.name);
        setCities(cityNames);
      } catch (error) {
        console.error("Error fetching Vietnam cities:", error);
        setCities([
          "Hà Nội",
          "TP. Hồ Chí Minh",
          "Đà Nẵng",
          "Hải Phòng",
          "Cần Thơ",
          "Biên Hòa",
          "Huế",
          "Nha Trang",
          "Buôn Ma Thuột",
          "Quy Nhon",
          "Vũng Tàu",
          "Nam Định",
          "Thái Nguyên",
          "Thanh Hóa",
          "Vinh",
        ]);
      }
    };
    fetchVietnamCities();
  }, []);

  useEffect(() => {
    const fetchUserAndCompanyData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setMessage("Vui lòng đăng nhập để lấy thông tin!");
          return;
        }

        const decodedToken: any = jwtDecode(token);
        const userId = decodedToken.userId || decodedToken.sub;

        const userResponse = await axios.get(
          `http://localhost:3000/userss/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const fetchedUserData = userResponse.data;
        console.log("Fetched user data:", fetchedUserData);
        setUserData(fetchedUserData);

        const companyResponse = await axios.get<CompanyData>(
          `http://localhost:3000/companiess/user/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const fetchedCompanyData = companyResponse.data;
        console.log("Fetched company data:", fetchedCompanyData);
        setCompanyData(fetchedCompanyData);

        // Cập nhật formData khi có dữ liệu
        setFormData((prev) => ({
          ...prev,
          company_id:fetchedCompanyData.company_id,
          companyName: fetchedCompanyData.company_name || "",
          full_name: fetchedUserData.full_name || "",
          email: fetchedUserData.email || "",
          phone: fetchedUserData.phone || fetchedCompanyData.contact_phone || "",
        }));
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setMessage(
          error.response?.data?.message || "Không thể lấy thông tin người dùng hoặc công ty!"
        );
      }
    };

    fetchUserAndCompanyData();
  }, []);

  const updateFormData = (field: keyof JobFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addLocation = (location: string) => {
    if (!formData.locations.includes(location)) {
      updateFormData("locations", [...formData.locations, location]);
    }
  };

  const removeLocation = (location: string) => {
    updateFormData("locations", formData.locations.filter((l) => l !== location));
  };

  const addSkill = (skill: string) => {
    if (!formData.skills.includes(skill)) {
      updateFormData("skills", [...formData.skills, skill]);
    }
  };

  const removeSkill = (skill: string) => {
    updateFormData("skills", formData.skills.filter((s) => s !== skill));
  };

  const nextStep = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const progress = (currentStep / steps.length) * 100;

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.title && formData.category && formData.level && formData.experience && formData.workType;
      case 2:
        return formData.locations.length > 0 && (formData.salaryType === "negotiable" || formData.salaryMax);
      case 3:
        return formData.description && formData.requirements;
      case 4:
        return formData.companyName && formData.full_name && formData.email;
      case 5:
        return formData.deadline;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Vui lòng đăng nhập để đăng tin!");
        return;
      }

      const jobData = {
        company_id: formData.company_id,
        title: formData.title,
        description: formData.description,
        requirements: JSON.stringify(formData.skills),
        benefits: formData.benefits || null,
        salary_min: formData.salaryType === "range" ? parseFloat(formData.salaryMin) || null : null,
        salary_max: (formData.salaryType === "upto" || formData.salaryType === "range") ? parseFloat(formData.salaryMax) || null : null,
        location: formData.locations.join(", "),
        job_level: mapJobLevel(formData.level),
        job_type: mapJobType(formData.workType),
        deadline: formData.deadline,
        status: "pending",
        priority_score: formData.isUrgent || formData.isHot ? 1 : 0,
        auto_expire: true,
        view_count: 0,
        application_count: 0,
        education_level: "none",
        created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
        updated_at: new Date().toISOString().slice(0, 19).replace("T", " "),
      };

      const deadlineDate = new Date(formData.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (deadlineDate <= today) {
        setMessage("Hạn nộp hồ sơ phải lớn hơn ngày hiện tại (15/06/2025)!");
        return;
      }

      const response = await axios.post("http://localhost:3000/jobss", jobData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200 || response.status === 201) {
        setMessage("Đăng tin thành công! Tin của bạn đang chờ duyệt.");
        navigate("/job-posts")
        setFormData({
          company_id: 0,
          title: "",
          category: "",
          level: "",
          experience: "",
          workType: "",
          locations: [],
          salaryType: "range",
          salaryMin: "",
          salaryMax: "",
          currency: "VND",
          description: "",
          requirements: "",
          benefits: "",
          skills: [],
          companyName: "",
          full_name: "",
          email: "",
          phone: "",
          deadline: "",
          quantity: "",
          isUrgent: false,
          isHot: false,
        });
      } else {
        throw new Error("Đăng tin thất bại!");
      }
    } catch (error: any) {
      console.error("Error submitting job:", error);
      setMessage(error.response?.data?.message || "Đăng tin thất bại. Vui lòng thử lại!");
    }
  };

  const mapJobLevel = (level: string): string => {
    const levelMap: { [key: string]: string } = {
      "Thực tập sinh": "intern",
      "Nhân viên": "fresher",
      "Trưởng nhóm": "junior",
      "Trưởng phòng": "senior",
      "Phó giám đốc": "manager",
      "Giám đốc": "manager",
      "Tổng giám đốc": "manager",
    };
    return levelMap[level] || "fresher";
  };

  const mapJobType = (workType: string): string => {
    const typeMap: { [key: string]: string } = {
      "Toàn thời gian": "full-time",
      "Bán thời gian": "part-time",
      "Thực tập": "internship",
      "Freelance": "remote",
      "Theo ca": "part-time",
    };
    return typeMap[workType] || "full-time";
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="title">Tiêu đề tin tuyển dụng *</Label>
        <Input
          id="title"
          placeholder="VD: Tuyển dụng Frontend Developer"
          value={formData.title}
          onChange={(e) => updateFormData("title", e.target.value)}
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="category">Ngành nghề *</Label>
        <Select
          value={formData.category}
          onValueChange={(value) => updateFormData("category", value)}
        >
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Chọn ngành nghề" />
          </SelectTrigger>
          <SelectContent>
            {jobCategories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="level">Cấp bậc *</Label>
          <Select
            value={formData.level}
            onValueChange={(value) => updateFormData("level", value)}
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Chọn cấp bậc" />
            </SelectTrigger>
            <SelectContent>
              {jobLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="experience">Kinh nghiệm *</Label>
          <Select
            value={formData.experience}
            onValueChange={(value) => updateFormData("experience", value)}
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Chọn kinh nghiệm" />
            </SelectTrigger>
            <SelectContent>
              {experienceLevels.map((exp) => (
                <SelectItem key={exp} value={exp}>
                  {exp}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="workType">Hình thức làm việc *</Label>
        <Select
          value={formData.workType}
          onValueChange={(value) => updateFormData("workType", value)}
        >
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Chọn hình thức làm việc" />
          </SelectTrigger>
          <SelectContent>
            {workTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <Label>Địa điểm làm việc *</Label>
        <Select onValueChange={addLocation}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Chọn địa điểm" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex flex-wrap gap-2 mt-3">
          {formData.locations.map((location) => (
            <Badge
              key={location}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => removeLocation(location)}
            >
              {location} ×
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <Label>Mức lương *</Label>
        <RadioGroup
          value={formData.salaryType}
          onValueChange={(value) => {
            updateFormData("salaryType", value);
            if (value !== "range" && value !== "upto") {
              updateFormData("salaryMin", "");
              updateFormData("salaryMax", "");
            }
          }}
          className="mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="range" id="range" />
            <Label htmlFor="range">Khoảng lương</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="negotiable" id="negotiable" />
            <Label htmlFor="negotiable">Thỏa thuận</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="upto" id="upto" />
            <Label htmlFor="upto">Lên đến</Label>
          </div>
        </RadioGroup>

        {(formData.salaryType === "range" || formData.salaryType === "upto") && (
          <div className={formData.salaryType === "range" ? "grid grid-cols-2 gap-4 mt-4" : "mt-4"}>
            {formData.salaryType === "range" && (
              <div>
                <Label htmlFor="salaryMin">Lương tối thiểu</Label>
                <Input
                  id="salaryMin"
                  type="text"
                  placeholder="5"
                  value={formatInputWithZeros(formData.salaryMin)}
                  onChange={(e) => updateFormData("salaryMin", cleanNumericInput(e.target.value))}
                  className="mt-2"
                />
              </div>
            )}
            <div>
              <Label htmlFor="salaryMax">Lương tối đa</Label>
              <Input
                id="salaryMax"
                type="text"
                placeholder="15000"
                value={formatInputWithZeros(formData.salaryMax)}
                onChange={(e) => updateFormData("salaryMax", cleanNumericInput(e.target.value))}
                className="mt-2"
              />
            </div>
          </div>
        )}

        <div className="mt-4">
          <Label htmlFor="currency">Đơn vị tiền tệ</Label>
          <Select
            value={formData.currency}
            onValueChange={(value) => updateFormData("currency", value)}
          >
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="VND">VND</SelectItem>
              <SelectItem value="USD">USD</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="description">Mô tả công việc *</Label>
        <Textarea
          id="description"
          placeholder="Mô tả chi tiết về công việc, trách nhiệm, quyền lợi..."
          value={formData.description}
          onChange={(e) => updateFormData("description", e.target.value)}
          className="mt-2 min-h-[120px]"
        />
      </div>

      <div>
        <Label htmlFor="requirements">Yêu cầu công việc *</Label>
        <Textarea
          id="requirements"
          placeholder="Yêu cầu về kinh nghiệm, kỹ năng, bằng cấp..."
          value={formData.requirements}
          onChange={(e) => updateFormData("requirements", e.target.value)}
          className="mt-2 min-h-[120px]"
        />
      </div>

      <div>
        <Label htmlFor="benefits">Quyền lợi</Label>
        <Textarea
          id="benefits"
          placeholder="Các quyền lợi, phúc lợi cho ứng viên..."
          value={formData.benefits}
          onChange={(e) => updateFormData("benefits", e.target.value)}
          className="mt-2 min-h-[100px]"
        />
      </div>

      <div>
        <Label>Kỹ năng yêu cầu</Label>
        <div className="mt-2">
          <Select onValueChange={addSkill}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn kỹ năng" />
            </SelectTrigger>
            <SelectContent>
              {commonSkills.map((skill) => (
                <SelectItem key={skill} value={skill}>
                  {skill}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {formData.skills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => removeSkill(skill)}
            >
              {skill} ×
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="companyName">Tên công ty *</Label>
        <Input
          id="companyName"
          value={formData.companyName}
          onChange={(e) => updateFormData("companyName", e.target.value)}
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="full_name">Người liên hệ *</Label>
        <Input
          id="full_name"
          value={formData.full_name}
          onChange={(e) => updateFormData("full_name", e.target.value)}
          className="mt-2"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email liên hệ *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData("email", e.target.value)}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="phone">Số điện thoại</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => updateFormData("phone", e.target.value)}
            className="mt-2"
          />
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="deadline">Hạn nộp hồ sơ *</Label>
          <Input
            id="deadline"
            type="date"
            value={formData.deadline}
            onChange={(e) => updateFormData("deadline", e.target.value)}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="quantity">Số lượng tuyển</Label>
          <Input
            id="quantity"
            type="number"
            placeholder="1"
            value={formData.quantity}
            onChange={(e) => updateFormData("quantity", cleanNumericInput(e.target.value))}
            className="mt-2"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="isUrgent"
            checked={formData.isUrgent}
            onCheckedChange={(checked) => updateFormData("isUrgent", checked)}
          />
          <Label htmlFor="isUrgent" className="text-sm font-medium">
            Tin tuyển dụng gấp
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="isHot"
            checked={formData.isHot}
            onCheckedChange={(checked) => updateFormData("isHot", checked)}
          />
          <Label htmlFor="isHot" className="text-sm font-medium">
            Tin tuyển dụng hot
          </Label>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Xem trước tin đăng</h3>
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-medium">Tiêu đề:</span> {formData.title || "Chưa nhập"}
          </p>
          <p>
            <span className="font-medium">Ngành nghề:</span> {formData.category || "Chưa chọn"}
          </p>
          <p>
            <span className="font-medium">Địa điểm:</span> {formData.locations.join(", ") || "Chưa chọn"}
          </p>
          <p>
            <span className="font-medium">Mức lương:</span>{" "}
            {formData.salaryType === "negotiable"
              ? "Thỏa thuận"
              : formData.salaryType === "upto"
              ? `Lên đến ${formData.salaryMax ? formatCurrency(formData.salaryMax) : ""} ${formData.currency}`
              : `${formData.salaryMin ? formatCurrency(formData.salaryMin) : ""} - ${formData.salaryMax ? formatCurrency(formData.salaryMax) : ""} ${formData.currency}`}
          </p>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      case 5:
        return renderStep5();
      default:
        return renderStep1();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Quay lại
        </Button>
        <h1 className="text-2xl font-bold">Đăng tin tuyển dụng</h1>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Bước {currentStep} / {steps.length}</span>
              <span className="text-sm text-gray-500">{Math.round(progress)}% hoàn thành</span>
            </div>
            <Progress value={progress} className="mb-4" />
          </div>

          <div className="flex items-center justify-between">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center space-y-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= step.id ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-xs text-center ${
                    currentStep >= step.id ? "text-green-600 font-medium" : "text-gray-500"
                  }`}
                >
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Form Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {(() => {
              const Icon = steps[currentStep - 1].icon;
              return <Icon className="w-5 h-5" />;
            })()}
            <span>{steps[currentStep - 1].title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>{renderCurrentStep()}</CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Quay lại
        </Button>

        <div className="flex space-x-3">
          <Button variant="outline">
            <Save className="w-4 h-4 mr-2" />
            Lưu nháp
          </Button>

          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Xem trước
          </Button>

          {currentStep < steps.length ? (
            <Button
              onClick={nextStep}
              disabled={!isStepValid()}
              className="bg-green-500 hover:bg-green-600"
            >
              Tiếp theo
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!isStepValid()}
              className="bg-green-500 hover:bg-green-600"
            >
              <Send className="w-4 h-4 mr-2" />
              Đăng tin
            </Button>
          )}
        </div>
      </div>

      {/* Message Feedback */}
      {message && (
        <div
          className={`text-center p-3 rounded-lg ${
            message.includes("thành công") || message.includes("đang chờ")
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}