
const db = require("../common/db");

const user_payments = (user_payments) => {
  this.id = user_payments.id;
  this.user_id = user_payments.user_id;
  this.payment_service_id = user_payments.payment_service_id;
  this.price = user_payments.price;
  this.discount_percent = user_payments.discount_percent;
  this.vat_percent = user_payments.vat_percent;
  this.total_amount = user_payments.total_amount;
  this.payment_method = user_payments.payment_method;
  this.status = user_payments.status;
  this.created_at = user_payments.created_at;
  this.paid_at = user_payments.paid_at;
  this.expired_at = user_payments.expired_at;
};

user_payments.getById = (id, callback) => {
  const sqlString = "SELECT * FROM user_payments WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

user_payments.getAll = (callback) => {
  const sqlString = "SELECT * FROM user_payments ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

user_payments.insert = (user_payments, callBack) => {
  const sqlString = "INSERT INTO user_payments SET ?";
  db.query(sqlString, user_payments, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...user_payments });
  });
};

user_payments.update = (user_payments, id, callBack) => {
  const sqlString = "UPDATE user_payments SET ? WHERE id = ?";
  db.query(sqlString, [user_payments, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật user_payments có id = " + id + " thành công");
  });
};

user_payments.delete = (id, callBack) => {
  db.query(`DELETE FROM user_payments WHERE id = ?`, id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa user_payments có id = " + id + " thành công");
  });
};

module.exports = user_payments;
