import { Link } from "react-router-dom";

interface PopularSearchesProps {
  searches: string[];
}

export const PopularSearches: React.FC<PopularSearchesProps> = ({ searches }) => {
  return (
    <div className="rounded-lg border">
      <div className="border-b bg-gray-50 p-4">
        <h2 className="text-lg font-bold">Tìm kiếm phổ biến</h2>
      </div>
      <div className="p-4">
        <div className="flex flex-wrap gap-2">
          {searches.map((term, index) => (
            <Link
              key={index}
              to="#"
              className="rounded-full bg-gray-100 px-3 py-1 text-sm hover:bg-green-100 hover:text-green-600"
            >
              {term}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};