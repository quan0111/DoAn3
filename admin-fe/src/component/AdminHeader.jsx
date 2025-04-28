import React from 'react';

const AdminHeader = ({ toggleSidebar }) => {
  return (
    <header className="bg-white shadow p-3 d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <button className="btn btn-light d-md-none me-2" onClick={toggleSidebar}>
          <i className="bi bi-list"></i>
        </button>
        <h1 className="h4 mb-0">Trang Quản Trị</h1>
      </div>
      <div className="d-flex align-items-center">
        <span className="me-3">Xin chào, Admin</span>
        <button className="btn btn-danger">Đăng xuất</button>
      </div>
    </header>
  );
};

export default AdminHeader;