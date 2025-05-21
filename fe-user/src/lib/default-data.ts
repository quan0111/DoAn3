import type { CVSection } from "./types"

export const defaultSections: CVSection[] = [
  {
    id: "career-objective",
    title: "MỤC TIÊU NGHỀ NGHIỆP",
    content:
      "Với 6 năm trong nghề lập trình, triển khai trực tiếp hơn 30 dự án, tôi mong muốn ứng tuyển vào vị trí Senio của Công ty để có thể áp dụng những kiến thức, kinh nghiệm lập trình của bản thân để nâng cấp sản phẩm và mang lại những giá trị hữu ích cho doanh nghiệp. Đồng thời, mục tiêu phát triển trong vòng 2 năm tới của tôi sẽ trở thành một Lead giỏi.",
  },
  {
    id: "work-experience",
    title: "KINH NGHIỆM LÀM VIỆC",
    content: `<div class="mb-4">
      <div class="flex justify-between mb-1">
        <div class="font-semibold">FRONT END DEVELOPER</div>
        <div>2021 - 2024</div>
      </div>
      <div class="text-gray-700 mb-1">Công ty XYZ TopCV</div>
      <ul class="list-disc pl-5 space-y-1">
        <li>Quản lý các dự án phát triển trang web từ thiết kế ban đầu cho đến hoàn thiện, tối ưu hóa tất cả khả năng tương thích trên nhiều trình duyệt và đa nền tảng.</li>
        <li>Tham gia đánh giá và thử nghiệm các tính năng mới để đảm bảo web tương thích với các tính năng hiện có.</li>
        <li>Hợp tác chặt chẽ với các lập trình viên và khách hàng để đáp ứng các yêu cầu, mục tiêu và chức năng mong muốn của dự án.</li>
        <li>Phát triển và tích hợp các chủ đề tùy chỉnh vào WordPress, PHP-Fusion và Concrete5.</li>
        <li>Tiến hành đào tạo cho khách hàng về cách xử lý hệ thống quản lý nội dung trang web.</li>
        <li>Cho phép quảng cáo trên toàn trang web bằng cách lập trình canvas HTML5 để tạo hoạt ảnh cho các phần tử trên nền web.</li>
        <li>Nghiên cứu, phát triển công nghệ mới để ứng dụng xây dựng các sản phẩm dịch vụ mới</li>
        <li>Hỗ trợ các thành viên trong nhóm với các chức năng phức tạp, tham gia nhận xét, đánh giá source code của các thành viên trong nhóm</li>
      </ul>
    </div>
    <div>
      <div class="flex justify-between mb-1">
        <div class="font-semibold">FLUTTER DEVELOPER</div>
        <div>2019 - 2021</div>
      </div>
      <div class="text-gray-700 mb-1">Công ty DEF TopCV</div>
      <ul class="list-disc pl-5 space-y-1">
        <li>Phối hợp với các thành viên trong team thực hiện lập trình và phát triển các sản phẩm trên nền tảng Mobile App.</li>
        <li>Lên kế hoạch và thực hiện Submit App lên App Store (Apple, Google App store).</li>
        <li>Cùng với các thành viên khác tư duy logic, đưa ra các giải pháp xử lý vấn đề trong khi phát triển sản phẩm.</li>
        <li>Sửa lỗi phát sinh và cải thiện hiệu suất hoạt động của ứng dụng.</li>
        <li>Chịu trách nhiệm về các tính năng mà mình phát triển end-to-end.</li>
      </ul>
    </div>`,
  },
  {
    id: "skills",
    title: "CÁC KỸ NĂNG",
    content: `<div>
      <div class="mb-2 font-semibold">KỸ NĂNG CHUYÊN MÔN</div>
      <ul class="list-disc pl-5 space-y-1">
        <li>Có kiến thức vững về về JavaScript</li>
        <li>Làm việc tốt với HTML, CSS, Javascripts và GitLab, Node js</li>
        <li>Thành thạo SQL, noSQL</li>
        <li>Có kiến thức về Framework Vuejs, Angular, React</li>
        <li>Có kỹ năng lập trình NET, lập trình C++</li>
        <li>Phân tích và thiết kế hệ thống</li>
        <li>Lập trình hướng đối tượng</li>
        <li>Setup, bảo trì hệ thống chạy Microsoft Windows</li>
      </ul>
    </div>`,
  },
]
