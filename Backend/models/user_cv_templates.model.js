const db = require("../common/db");

const user_cv_templates = (user_cv_templates) => {
  this.user_cv_id = user_cv_templates.user_cv_id;
  this.user_id = user_cv_templates.user_id;
  this.resume_id = user_cv_templates.resume_id;
  this.template_id = user_cv_templates.template_id;
  this.name = user_cv_templates.name;
  this.content = user_cv_templates.content;
  this.custom_css = user_cv_templates.custom_css;
};

// === Lấy theo ID ===
user_cv_templates.getById = (id, callback) => {
  const sql = "SELECT * FROM user_cv_templates WHERE user_cv_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return callback(err);
    callback(null, result[0]);
  });
};

// === Lấy tất cả ===
user_cv_templates.getAll = (callback) => {
  db.query("SELECT * FROM user_cv_templates", (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

// === Lấy theo User ID ===
user_cv_templates.getByUserId = (user_id, callback) => {
  db.query("SELECT * FROM user_cv_templates WHERE user_id = ?", [user_id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

// === Lấy theo Resume ID ===
user_cv_templates.getByResumeId = (resume_id, callback) => {
  db.query("SELECT * FROM user_cv_templates WHERE resume_id = ?", [resume_id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

// === Lấy theo Template ID gốc ===
user_cv_templates.getByTemplateId = (template_id, callback) => {
  db.query("SELECT * FROM user_cv_templates WHERE template_id = ?", [template_id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

// === Tìm theo tên CV Template (LIKE) ===
user_cv_templates.searchByName = (keyword, callback) => {
  const search = `%${keyword}%`;
  db.query("SELECT * FROM user_cv_templates WHERE name LIKE ?", [search], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

// === Thêm mới ===
user_cv_templates.insert = (data, callback) => {
  db.query("INSERT INTO user_cv_templates SET ?", data, (err, res) => {
    if (err) return callback(err);
    callback(null, { id: res.insertId, ...data });
  });
};

// === Cập nhật ===
user_cv_templates.update = (data, id, callback) => {
  db.query("UPDATE user_cv_templates SET ? WHERE user_cv_id = ?", [data, id], (err, res) => {
    if (err) return callback(err);
    callback(null, `Cập nhật user_cv_templates có id = ${id} thành công`);
  });
};

// === Xóa ===
user_cv_templates.delete = (id, callback) => {
  db.query("DELETE FROM user_cv_templates WHERE user_cv_id = ?", [id], (err, res) => {
    if (err) return callback(err);
    callback(null, `Xóa user_cv_templates có id = ${id} thành công`);
  });
};

module.exports = user_cv_templates;
