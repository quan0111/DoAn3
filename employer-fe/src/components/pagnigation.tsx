import { Button } from "@/components/ui/button";

export const Pagination: React.FC = () => {
  return (
    <div className="flex items-center gap-1">
      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
        <span className="sr-only">Trang trước</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </Button>
      <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-green-600 text-white">
        1
      </Button>
      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
        2
      </Button>
      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
        3
      </Button>
      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
        ...
      </Button>
      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
        8
      </Button>
      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
        <span className="sr-only">Trang tiếp</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </Button>
    </div>
  );
};