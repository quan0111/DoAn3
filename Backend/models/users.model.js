
const db = require("../common/db");

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

users.getById = (id, callback) => {
  const sqlString = "SELECT * FROM users WHERE user_id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};
users.getByEmail = (email, callback) => {
  const sqlString = "SELECT * FROM users WHERE email = ?";
  db.query(sqlString, [email], (err, results) => {
    if (err) {
      return callback(err);
    }
    // trả về user đầu tiên hoặc null nếu không có
    callback(null, results.length > 0 ? results[0] : null);
  });
};


users.getAll = (callback) => {
  const sqlString = "SELECT * FROM users ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};
users.deactivateUser = (userId, callback) => {
  const sqlString = "UPDATE users SET is_active = 0 WHERE user_id = ?";
  db.query(sqlString, [userId], (err, res) => {
    if (err) return callback(err);
    callback(null, "Đã vô hiệu hóa tài khoản");
  });
};
users.changePassword = (userId, newPasswordHash, callback) => {
  const sqlString = "UPDATE users SET password_hash = ? WHERE user_id = ?";
  db.query(sqlString, [newPasswordHash, userId], (err, res) => {
    if (err) return callback(err);
    callback(null, "Mật khẩu đã được thay đổi");
  });
};
users.updateLastLogin = (userId, callback) => {
  const sqlString = "UPDATE users SET last_login = NOW() WHERE user_id = ?";
  db.query(sqlString, [userId], (err, res) => {
    if (err) return callback(err);
    callback(null, "Cập nhật thời gian đăng nhập thành công");
  });
};


users.insert = (users, callBack) => {
  const sqlString = "INSERT INTO users SET ?";
  db.query(sqlString, users, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...users });
  });
};

users.update = (users, id, callBack) => {
  const sqlString = "UPDATE users SET ? WHERE user_id = ?";
  db.query(sqlString, [users, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật users có id = " + id + " thành công");
  });
};

users.delete = (id, callBack) => {
  db.query(`DELETE FROM users WHERE user_id = ?`, id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa users có id = " + id + " thành công");
  });
};

module.exports = users;
