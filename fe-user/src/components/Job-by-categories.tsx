import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";
import type { job_categories } from "@/lib/types";

interface JobsByCategoryProps {
  categories: job_categories[];
}

export const JobsByCategory: React.FC<JobsByCategoryProps> = ({ categories }) => {
  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Việc làm theo ngành nghề</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {categories.map((category, index) => (
          <Link
            to="#"
            key={category.category_id}
            className="flex items-center gap-3 rounded-lg border p-4 transition-colors hover:border-green-200 hover:bg-green-50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <Briefcase className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.job_count} việc làm</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
          Xem tất cả ngành nghề
        </Button>
      </div>
    </div>
  );
};