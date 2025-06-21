const db = require("../common/db");

const UserPayment = function (userPayment) {
  this.id = userPayment.id;
  this.user_id = userPayment.user_id;
  this.payment_service_id = userPayment.payment_service_id;
  this.price = userPayment.price;
  this.discount_percent = userPayment.discount_percent;
  this.vat_percent = userPayment.vat_percent;
  this.total_amount = userPayment.total_amount;
  this.payment_method = userPayment.payment_method;
  this.status = userPayment.status;
  this.created_at = userPayment.created_at;
  this.paid_at = userPayment.paid_at;
  this.expired_at = userPayment.expired_at;
};

UserPayment.getAll = (callback) => {
  const sql = `
    SELECT 
      up.id AS payment_id,
      u.full_name,
      up.payment_service_id,
      u.email,
      ps.name AS service_name,
      ps.price AS original_price,
      up.price AS discounted_price,
      up.discount_percent,
      up.vat_percent,
      up.total_amount,
      up.payment_method,
      up.status,
      up.created_at,
      up.paid_at,
      up.expired_at
    FROM user_payments up
    JOIN users u ON up.user_id = u.user_id
    JOIN payment_services ps ON up.payment_service_id = ps.id
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error in getAll:", err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

UserPayment.getByUserId = (userId, callback) => {
  const sql = `
    SELECT 
      up.id AS payment_id,
      u.full_name,
       up.payment_service_id,
      u.email,
      ps.name AS service_name,
      ps.price AS original_price,
      up.price AS discounted_price,
      up.discount_percent,
      up.vat_percent,
      up.total_amount,
      up.payment_method,
      up.status,
      up.created_at,
      up.paid_at,
      up.expired_at
    FROM user_payments up
    JOIN users u ON up.user_id = u.user_id
    JOIN payment_services ps ON up.payment_service_id = ps.id
    WHERE up.user_id = ?
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error in getByUserId:", err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

UserPayment.getByUserIdAndStatus = (userId, status, callback) => {
  const sql = `
    SELECT 
      up.id AS payment_id,
       up.payment_service_id,
      u.full_name,
      u.email,
      ps.name AS service_name,
      ps.price AS original_price,
      up.price AS discounted_price,
      up.discount_percent,
      up.vat_percent,
      up.total_amount,
      up.payment_method,
      up.status,
      up.created_at,
      up.paid_at,
      up.expired_at
    FROM user_payments up
    JOIN users u ON up.user_id = u.user_id
    JOIN payment_services ps ON up.payment_service_id = ps.id
    WHERE up.user_id = ? AND up.status = ?
  `;

  db.query(sql, [userId, status], (err, result) => {
    if (err) {
      console.error("Error in getByUserIdAndStatus:", err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

UserPayment.getByStatus = (status, callback) => {
  const sql = `
    SELECT 
      up.id AS payment_id,
             up.payment_service_id,
      u.full_name,
      u.email,
      ps.name AS service_name,
      ps.price AS original_price,
      up.price AS discounted_price,
      up.discount_percent,
      up.vat_percent,
      up.total_amount,
      up.payment_method,
      up.status,
      up.created_at,
      up.paid_at,
      up.expired_at
    FROM user_payments up
    JOIN users u ON up.user_id = u.user_id
    JOIN payment_services ps ON up.payment_service_id = ps.id
    WHERE up.status = ?
  `;

  db.query(sql, [status], (err, result) => {
    if (err) {
      console.error("Error in getByStatus:", err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

UserPayment.getById = (id, callback) => {
  const sql = `
    SELECT 
      up.id AS payment_id,
    up.payment_service_id,
      u.full_name,
      u.email,
      ps.name AS service_name,
      ps.price AS original_price,
      up.price AS discounted_price,
      up.discount_percent,
      up.vat_percent,
      up.total_amount,
      up.payment_method,
      up.status,
      up.created_at,
      up.paid_at,
      up.expired_at
    FROM user_payments up
    JOIN users u ON up.user_id = u.user_id
    JOIN payment_services ps ON up.payment_service_id = ps.id
    WHERE up.id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error in getById:", err);
      return callback(err, null);
    }
    callback(null, result[0]);
  });
};

UserPayment.insert = (data, callback) => {
  const sql = "INSERT INTO user_payments SET ?";
  db.query(sql, data, (err, res) => {
    if (err) {
      console.error("Error in insert:", err);
      return callback(err, null);
    }
    callback(null, { id: res.insertId, ...data });
  });
};

UserPayment.update = (data, id, callback) => {
  const sql = "UPDATE user_payments SET ? WHERE id = ?";
  db.query(sql, [data, id], (err, res) => {
    if (err) {
      console.error("Error in update:", err);
      return callback(err, null);
    }
    if (res.affectedRows === 0) {
      return callback({ message: "Không tìm thấy user_payments để cập nhật" }, null);
    }
    callback(null, `Cập nhật user_payments có id = ${id} thành công`);
  });
};

UserPayment.delete = (id, callback) => {
  const sql = "DELETE FROM user_payments WHERE id = ?";
  db.query(sql, [id], (err, res) => {
    if (err) {
      console.error("Error in delete:", err);
      return callback(err, null);
    }
    if (res.affectedRows === 0) {
      return callback({ message: "Không tìm thấy user_payments để xóa" }, null);
    }
    callback(null, `Xóa user_payments có id = ${id} thành công`);
  });
};

module.exports = UserPayment;