const db = require("../common/db");

const Resumes = function (resumes) {
  this.resume_id = resumes.resume_id;
  this.user_id = resumes.user_id;
  this.title = resumes.title;
  this.summary = resumes.summary;
  this.education = resumes.education;
  this.experience = resumes.experience;
  this.skills = resumes.skills;
  this.certificates = resumes.certificates;
  this.file_url = resumes.file_url;
  this.is_public = resumes.is_public || false;
  this.verified_status = resumes.verified_status || "pending";
  this.view_count = resumes.view_count || 0;
  this.created_at = resumes.created_at || new Date();
  this.updated_at = resumes.updated_at || new Date();
};

// Lấy resume theo ID (kèm thông tin user và số lượng ứng tuyển)
Resumes.getById = (id, callback) => {
  const sql = `
    SELECT r.*, u.name AS user_name, COUNT(a.application_id) AS total_applications
    FROM resumes r
    LEFT JOIN users u ON r.user_id = u.user_id
    LEFT JOIN applications a ON r.resume_id = a.resume_id
    WHERE r.resume_id = ?
    GROUP BY r.resume_id
  `;
  db.query(sql, [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};

// Lấy tất cả resume kèm user và thống kê ứng tuyển
Resumes.getAll = (callback) => {
  const sql = `
    SELECT r.*, u.name AS user_name, COUNT(a.application_id) AS total_applications
    FROM resumes r
    LEFT JOIN users u ON r.user_id = u.user_id
    LEFT JOIN applications a ON r.resume_id = a.resume_id
    GROUP BY r.resume_id
  `;
  db.query(sql, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

// Lấy resume theo user_id + template name (nếu có)
Resumes.getByUserId = (userId, callback) => {
  const sql = `
    SELECT r.*, t.name AS template_name
    FROM resumes r
    LEFT JOIN user_cv_templates t ON r.resume_id = t.resume_id
    WHERE r.user_id = ?
  `;
  db.query(sql, [userId], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

// Các hàm insert, update, delete giữ nguyên như cũ
Resumes.insert = (data, callback) => {
  db.query("INSERT INTO resumes SET ?", data, (err, res) => {
    if (err) return callback(err);
    callback(null, { id: res.insertId, ...data });
  });
};

Resumes.update = (data, id, callback) => {
  data.updated_at = new Date();
  db.query("UPDATE resumes SET ? WHERE resume_id = ?", [data, id], (err, res) => {
    if (err) return callback(err);
    callback(null, { message: `Cập nhật resume ID ${id} thành công` });
  });
};

Resumes.delete = (id, callback) => {
  db.query("DELETE FROM resumes WHERE resume_id = ?", [id], (err, res) => {
    if (err) return callback(err);
    callback(null, { message: `Xóa resume ID ${id} thành công` });
  });
};

// Tăng lượt xem
Resumes.incrementView = (id, callback) => {
  db.query("UPDATE resumes SET view_count = view_count + 1 WHERE resume_id = ?", [id], (err, res) => {
    if (err) return callback(err);
    callback(null, { message: `Tăng view resume ID ${id}` });
  });
};

module.exports = Resumes;
