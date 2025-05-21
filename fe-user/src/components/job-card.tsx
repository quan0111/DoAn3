import { Link } from "react-router-dom";
import { Building, MapPin, Wallet, Clock } from "lucide-react";

interface Job {
  job_id: string;
  company_id: string;
  company_name: string;
  logo_url: string;
  title: string;
  description: string;
  requirements: string[];
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
  application_count: number;
  created_at: Date;
  updated_at: Date;

  // Các field bổ sung từ phía mock data/UI:
  featured?: boolean;
  urgent?: boolean;
  tags?: string[];
}

interface JobCardProps {
  job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const formatSalary = (min: number, max: number): string => {
    return `${min.toLocaleString("vi-VN") + "00.000"} - ${max.toLocaleString("vi-VN") + "00.000"}₫`;
  };

  return (
    <Link
      to={`/viec-lam/${job.job_id}`}
      className="block rounded-lg border bg-white p-4 shadow-sm transition-all hover:shadow-md"
    >
      <div className="flex gap-4">
        {/* Logo công ty */}
        <div className="hidden sm:block">
          {job.logo_url ? (
            <img
              src={job.logo_url}
              alt={job.company_name}
              className="h-16 w-16 rounded-lg border object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-lg border bg-gray-100">
              <Building className="h-8 w-8 text-gray-400" />
            </div>
          )}
        </div>

        {/* Nội dung job */}
        <div className="flex-grow">
          <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
            <h3 className="font-semibold text-green-600">{job.title}</h3>
            <div className="flex flex-wrap gap-2">
              {job.featured && (
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-600">
                  Nổi bật
                </span>
              )}
              {job.urgent && (
                <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-600">
                  Gấp
                </span>
              )}
            </div>
          </div>

          <p className="mb-2 font-medium text-left">{job.company_name}</p>

          <div className="mb-3 flex flex-wrap gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {job.location}
            </div>
            <div className="flex items-center gap-1">
              <Wallet className="h-3.5 w-3.5" />
              {formatSalary(job.salary_min, job.salary_max)}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {job.job_type}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {(job.tags ?? []).slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};
