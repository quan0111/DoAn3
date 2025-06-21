const db = require("../common/db");

const applications = (applications) => {
  this.application_id = applications.application_id;
  this.job_id = applications.job_id;
  this.user_id = applications.user_id;
  this.resume_id = applications.resume_id;
  this.cv_file = applications.cv_file;
  this.cover_letter = applications.cover_letter;
  this.status = applications.status;
  this.applied_at = applications.applied_at;
  this.updated_at = applications.updated_at;
};
// ✅ Kiểm tra user đã apply vào job đó hay chưa
applications.checkExists = (user_id, job_id, callback) => {
  const sql = `
    SELECT application_id 
    FROM applications 
    WHERE user_id = ? AND job_id = ?
    LIMIT 1
  `;
  db.query(sql, [user_id, job_id], (err, result) => {
    if (err) return callback(err);
    if (result.length > 0) {
      callback(null, true); // Đã tồn tại
    } else {
      callback(null, false); // Chưa tồn tại
    }
  });
};

// ✅ Lấy danh sách ứng viên theo công ty (group theo từng công việc)
applications.getApplicantsByCompany = (company_id, callback) => {
  const sql = `
    SELECT 
      j.job_id,
      j.title AS job_title,
      u.user_id,
      u.full_name AS user_name,
      u.email,
      a.application_id,
      a.status,
      a.cv_file,
      a.applied_at,
      r.title AS resume_title
    FROM applications a
    LEFT JOIN jobs j ON a.job_id = j.job_id
    LEFT JOIN users u ON a.user_id = u.user_id
    LEFT JOIN resumes r ON a.resume_id = r.resume_id
    WHERE j.company_id = ?
    ORDER BY j.job_id, a.applied_at DESC
  `;
  db.query(sql, [company_id], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

// ✅ Lấy chi tiết 1 hồ sơ ứng tuyển kèm dữ liệu liên quan
applications.getById = (id, callback) => {
  const sql = `
    SELECT 
      a.*, 
      j.title AS job_title, 
      u.full_name AS user_name, u.email,
      r.title AS resume_title
    FROM applications a
    LEFT JOIN jobs j ON a.job_id = j.job_id
    LEFT JOIN users u ON a.user_id = u.user_id
    LEFT JOIN resumes r ON a.resume_id = r.resume_id
    WHERE a.application_id = ?
  `;
  db.query(sql, [id], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

// ✅ Lấy tất cả hồ sơ ứng tuyển kèm dữ liệu liên quan
applications.getAll = (callback) => {
  const sql = `
    SELECT 
      a.*, 
      j.title AS job_title, 
      u.full_name AS user_name, u.email,
      r.title AS resume_title
    FROM applications a
    LEFT JOIN jobs j ON a.job_id = j.job_id
    LEFT JOIN users u ON a.user_id = u.user_id
    LEFT JOIN resumes r ON a.resume_id = r.resume_id
    ORDER BY a.applied_at DESC
  `;
  db.query(sql, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

// ✅ Lấy tất cả hồ sơ ứng tuyển theo user_id
applications.getByUserId = (user_id, callback) => {
  const sql = `
    SELECT 
      a.*, 
      j.title AS job_title,
      r.title AS resume_title
    FROM applications a
    LEFT JOIN jobs j ON a.job_id = j.job_id
    LEFT JOIN resumes r ON a.resume_id = r.resume_id
    WHERE a.user_id = ?
    ORDER BY a.applied_at DESC
  `;
  db.query(sql, [user_id], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

// ✅ Lấy tất cả ứng viên cho một công việc
applications.getByJobId = (job_id, callback) => {
  const sql = `
    SELECT 
      a.*, 
      u.full_name AS user_name, u.email,
      r.title AS resume_title
    FROM applications a
    LEFT JOIN users u ON a.user_id = u.user_id
    LEFT JOIN resumes r ON a.resume_id = r.resume_id
    WHERE a.job_id = ?
    ORDER BY a.applied_at DESC
  `;
  db.query(sql, [job_id], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

// ✅ Thêm mới
applications.insert = (applications, callback) => {
  const sql = "INSERT INTO applications SET ?";
  db.query(sql, applications, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ...applications });
  });
};

// ✅ Cập nhật
applications.update = (applications, id, callback) => {
  const sql = "UPDATE applications SET ? WHERE application_id = ?";
  db.query(sql, [applications, id], (err, res) => {
    if (err) return callback(err);
    callback(`Đã cập nhật application có id = ${id}`);
  });
};

// ✅ Xóa
applications.delete = (id, callback) => {
  db.query("DELETE FROM applications WHERE application_id = ?", [id], (err, res) => {
    if (err) return callback(err);
    callback(`Đã xóa application có id = ${id}`);
  });
};

module.exports = applications;
