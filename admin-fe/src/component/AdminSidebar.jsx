import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

function AdminSidebar() {
  const location = useLocation();

  return (
    <div className="sidebar">
      <Nav className="flex-column">
        <Nav.Link
          as={Link}
          to="/dashboard"
          className={`text-dark ${
            location.pathname === "/dashboard" ? "active" : ""
          }`}
        >
          <i className="fas fa-tachometer-alt me-2"></i> Trang chủ
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/analytics"
          className={`text-dark ${
            location.pathname === "/analytics" ? "active" : ""
          }`}
        >
          <i className="fas fa-chart-line me-2"></i> Analytics
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/users"
          className={`text-dark ${
            location.pathname === "/users" ? "active" : ""
          }`}
        >
          <i className="fas fa-users me-2"></i> Người dùng
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/jobs"
          className={`text-dark ${
            location.pathname === "/jobs" ? "active" : ""
          }`}
        >
          <i className="fas fa-briefcase me-2"></i> Công việc
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/Report"
          className={`text-dark ${
            location.pathname === "/Report" ? "active" : ""
          }`}
        >
          <i className="fas fa-coins me-2"></i> Báo cáo
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/Nofication"
          className={`text-dark ${
            location.pathname === "/Nofication" ? "active" : ""
          }`}
        >
          <i className="fas fa-box me-2"></i> Thông báo
        </Nav.Link>
        <Nav.Link className="text-dark">
          <i className="fas fa-chart-bar me-2"></i> Statistics
        </Nav.Link>
        <Nav.Link className="text-dark">
          <i className="fas fa-file-alt me-2"></i> Pages
        </Nav.Link>
        <Nav.Link className="text-dark">
          <i className="fas fa-cubes me-2"></i> Components
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/setting"
          className={`text-dark ${
            location.pathname === "/setting" ? "active" : ""
          }`}
        >
          <i className="fas fa-eye me-2"></i> Settings
        </Nav.Link>
      </Nav>
    </div>
  );
}

export default AdminSidebar;
