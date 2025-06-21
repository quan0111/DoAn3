import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cssStringToObject(cssString: string): React.CSSProperties {
  const styleObject: React.CSSProperties = {};
  const rules = cssString.split(';').filter(rule => rule.trim());

  rules.forEach(rule => {
    const [property, value] = rule.split(':').map(part => part.trim());
    if (property && value) {
      // Chuyển đổi property từ kebab-case sang camelCase
      const camelProperty = property.replace(/-([a-z])/g, g => g[1].toUpperCase());

      // Kiểm tra và chuyển đổi giá trị
      let parsedValue = value;
      if (/^\d+$/.test(value) || /^\d+\.?\d*$/.test(value)) {
        // Nếu là số, thêm đơn vị px cho các thuộc tính kích thước
        const sizeProperties = ['width', 'height', 'fontSize', 'margin', 'padding', 'top', 'left', 'right', 'bottom'];
        parsedValue = sizeProperties.includes(camelProperty.toLowerCase()) ? `${value}px` : value;
      }

      // Kiểm tra nếu property là hợp lệ trong React.CSSProperties
      if (Object.prototype.hasOwnProperty.call(styleObject, camelProperty)) {
        // Ép kiểu linh hoạt, nhưng cần đảm bảo giá trị hợp lệ
        (styleObject as any)[camelProperty] = parsedValue;
      }
    }
  });

  return styleObject;
}