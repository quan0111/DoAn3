import { Button } from "@/components/ui/button";

export const JobAlert: React.FC = () => {
  return (
    <div className="rounded-lg border bg-green-50 p-4">
      <h3 className="mb-2 font-semibold text-green-700">Nhận thông báo việc làm mới</h3>
      <p className="mb-4 text-sm text-green-600">
        Đăng ký để nhận thông báo về các cơ hội việc làm mới phù hợp với bạn
      </p>
      <Button className="w-full bg-green-600 hover:bg-green-700">Đăng ký ngay</Button>
    </div>
  );
};