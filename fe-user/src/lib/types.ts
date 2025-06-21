export interface CVSection {
  id: string
  title: string
  content: string
  icon?: string
}
export interface job_categories{
  category_id:string;
  name:string;
  description:string;
  job_count: number;
}

export interface Job {
 job_id: string;
  company_id: string;
  company_name: string;
  logo_url: string;
  title: string;
  description: string;
  requirements: string[]; // nên khai báo rõ kiểu phần tử
  benefits: string;
  salary_min: number;
  salary_max: number;
  location: string;
  job_level: string;
  job_type: string;
  deadline: Date;
  status: string;
  priority_score: number;
  auto_expire: number;
  view_count: number;
  education_level:string;
  application_count: number;
  created_at: Date;
  updated_at: Date;
}
export interface CVTemplate {
  id: string
  name: string
  thumbnail: string
  className: string
  description: string
  isPopular?: boolean
  isPremium?: boolean
  category: string
  industries: string[]
  customStyles?: string; // Thêm thuộc tính tùy chọn này
}

export interface CVData {
  fullName: string
  jobTitle: string
  phone: string
  email: string
  website: string
  location: string
}

export type ActivePanel = "design" | "add-section" | "layout" | "template" | "suggestions" | "library"

export interface CVElement {
  id: string
  type: string
  content: string
  position: {
    x: number
    y: number
    width: number
    height: number
  }
  style?: ElementStyle
  zIndex?: number
}

export interface ElementStyle {
  fontSize?: number
  fontWeight?: string
  fontStyle?: string
  fontFamily?: string
  color?: string
  backgroundColor?: string
  textAlign?: string
  lineHeight?: number
  textDecoration?: string
  borderRadius?: string | number
  border?: string
  borderBottom?: string
  padding?: string
  paddingBottom?: string
  paddingLeft?: string
  height?: number
  width?: number
  x?: number
  y?: number
  zIndex?: number
  backgroundImage?: string
  backgroundSize?: string
  backgroundPosition?: string
}

export interface Template {
  id: string
  name: string
  thumbnail: string
}

export interface TemplateCategory {
  id: string
  name: string
  description: string
  icon: string
}

export interface TemplateComponent {
  id: string
  templateId: string
  name: string
  displayName: string
  htmlStructure: string
  cssStyles: string
  isRequired: boolean
  displayOrder: number
}

export interface UserCVTemplate {
  id: string
  userId: string
  resumeId?: string
  templateId: string
  name: string
  content: any
  customCss?: string
  lastEdited: Date
  createdAt: Date
  updatedAt: Date
}
