
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

users.getAll = (callback) => {
  const sqlString = "SELECT * FROM users ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
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
  db.query(`DELETE FROM users WHERE id = ?`, id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa users có id = " + id + " thành công");
  });
};
users.getByEmail = (email, callback) => {
  const sqlString = "SELECT * FROM users WHERE email = ?";
  db.query(sqlString, [email], (err, result) => {
    if (err) return callback(err);
    callback(null, result[0]); // Trả về 1 user (nếu có)
  });
};
users.updateLastLogin = (id, callback) => {
  const sqlString = "UPDATE users SET last_login = NOW() WHERE user_id = ?";
  db.query(sqlString, [id], (err, res) => {
    if (err) return callback(err);
    callback(null, "Đã cập nhật last_login cho user có id = " + id);
  });
};


module.exports = users;
