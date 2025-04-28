import React from 'react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar bg-dark text-white col-md-3 col-lg-2 p-3 ${isOpen ? 'show' : ''}`}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="fs-4 fw-bold">TopCV Admin</div>
        <button className="btn btn-outline-light d-md-none" onClick={toggleSidebar}>
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <a href="#" className="nav-link text-white">Tổng quan</a>
        </li>
        <li className="nav-item mb-2">
          <a href="#" className="nav-link text-white">Công việc</a>
        </li>
        <li className="nav-item mb-2">
          <a href="#" className="nav-link text-white">Ứng viên</a>
        </li>
        <li className="nav-item mb-2">
          <a href="#" className="nav-link text-white">Thông báo</a>
        </li>
        <li className="nav-item mb-2">
          <a href="#" className="nav-link text-white">Cài đặt</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;