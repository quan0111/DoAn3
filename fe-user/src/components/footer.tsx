import { Link } from "react-router-dom"

export function Footer() {
  return (
    <footer className="w-full border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
          © 2023 TopCV. Tất cả các quyền được bảo lưu.
        </p>
        <div className="flex gap-4">
          <Link to="/" className="text-sm text-gray-500 hover:underline">
            Điều Khoản
          </Link>
          <Link to="/" className="text-sm text-gray-500 hover:underline">
            Bảo Mật
          </Link>
          <Link to="/" className="text-sm text-gray-500 hover:underline">
            Liên Hệ
          </Link>
        </div>
      </div>
    </footer>
  )
}
