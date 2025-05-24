import { Link } from "react-router-dom";
import type { job_categories } from "@/lib/types";

interface JobCategoriesProps {
  job_categories: job_categories[];
  selectedCategory: string;
  onCategorySelect: (id: string) => void;
}

export const JobCategories: React.FC<JobCategoriesProps> = ({
  job_categories,
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <div className="rounded-lg border">
      <div className="border-b bg-gray-50 p-4">
        <h2 className="text-lg font-bold">Danh mục công việc</h2>
      </div>
      <div className="p-4">
        <ul className="space-y-2">
          {job_categories.map((category) => {
            const isSelected = category.category_id === selectedCategory;
            return (
              <li key={category.category_id}>
                <button
                  onClick={() => onCategorySelect(category.category_id)}
                  className={`w-full flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors ${
                    isSelected
                      ? "bg-green-50 font-medium text-green-600"
                      : "hover:bg-gray-50 hover:text-green-600"
                  }`}
                >
                  <span>{category.name}</span>
                  <span className="rounded-full bg-green-100 px-2 py-0.5">
                    {category.job_count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
