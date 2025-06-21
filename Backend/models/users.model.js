const db = require("../common/db");
const bcrypt = require("bcrypt");

const users = (users) => {
  this.user_id = users.user_id;
  this.full_name = users.full_name;
  this.email = users.email;
  this.password_hash = users.password_hash;
  this.avatar_url = users.avatar_url;
  this.phone = users.phone;
  this.gender = users.gender;
  this.dob = users.dob;
  this.role = users.role;
  this.created_at = users.created_at;
  this.updated_at = users.updated_at;
  this.is_active = users.is_active;
  this.last_login = users.last_login;
};

users.getAll = (callback) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, result) => {
    if (err) return callback(err, null);
    callback( result);
  });
};

users.getById = (id, callback) => {
  const sql = "SELECT * FROM users WHERE user_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return callback(err, null);
    callback( result[0]);
  });
};

users.getByEmail = (email, callback) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, result) => {
    if (err) return callback(err, null);
    if (result.length === 0) return callback(null, null); // Không tìm thấy user
    callback(null, result[0]); // ✅ Trả về user object duy nhất
  });
};

users.insert = (userData, callback) => {
  const sql = "INSERT INTO users SET ?";
  db.query(sql, userData, (err, res) => {
    if (err) return callback(err, null);
    callback(null, { id: res.insertId, ...userData });
  });
};

users.update = (userData, id, callback) => {
  const sql = "UPDATE users SET ? WHERE user_id = ?";
  db.query(sql, [userData, id], (err, res) => {
    if (err) return callback(err, null);
    callback(null, `Cập nhật user có id = ${id} thành công`);
  });
};

users.delete = (id, callback) => {
  const sql = "DELETE FROM users WHERE user_id = ?";
  db.query(sql, [id], (err, res) => {
    if (err) return callback(err, null);
    callback(null, `Xóa user có id = ${id} thành công`);
  });
};

users.updateLastLogin = (id, callback) => {
  const sql = "UPDATE users SET last_login = NOW() WHERE user_id = ?";
  db.query(sql, [id], (err, res) => {
    if (err) return callback(err, null);
    callback(null, `Đã cập nhật last_login cho user có id = ${id}`);
  });
};

users.updateActiveStatus = (id, isActive, callback) => {
  const sql = "UPDATE users SET is_active = ? WHERE user_id = ?";
  db.query(sql, [isActive, id], (err, res) => {
    if (err) return callback(err, null);
    callback(null, `Đã cập nhật trạng thái hoạt động cho user có id = ${id}`);
  });
};

users.verifyPassword = (userId, password, callback) => {
  const sql = "SELECT password_hash FROM users WHERE user_id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) return callback(err, null);
    if (result.length === 0) return callback(null, { success: false });
    const isMatch = bcrypt.compareSync(password, result[0].password_hash);
    callback(null, { success: isMatch });
  });
};

users.changePassword = (userId, newPassword, callback) => {
  const saltRounds = 10;
  bcrypt.hash(newPassword, saltRounds, (err, hash) => {
    if (err) return callback(err, null);
    const sql = "UPDATE users SET password_hash = ?, updated_at = NOW() WHERE user_id = ?";
    db.query(sql, [hash, userId], (err, res) => {
      if (err) return callback(err, null);
      callback(null, "Đổi mật khẩu thành công");
    });
  });
};

module.exports = users;
