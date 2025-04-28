
const db = require("../common/db");

const payments = (payments) => {
  this.payment_id = payments.payment_id;
  this.user_id = payments.user_id;
  this.amount = payments.amount;
  this.service_type = payments.service_type;
  this.transaction_id = payments.transaction_id;
  this.status = payments.status;
  this.created_at = payments.created_at;
};

payments.getById = (id, callback) => {
  const sqlString = "SELECT * FROM payments WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

payments.getAll = (callback) => {
  const sqlString = "SELECT * FROM payments ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

payments.insert = (payments, callBack) => {
  const sqlString = "INSERT INTO payments SET ?";
  db.query(sqlString, payments, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...payments });
  });
};

payments.update = (payments, id, callBack) => {
  const sqlString = "UPDATE payments SET ? WHERE id = ?";
  db.query(sqlString, [payments, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật payments có id = " + id + " thành công");
  });
};

payments.delete = (id, callBack) => {
  db.query(`DELETE FROM payments WHERE id = ?`, id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa payments có id = " + id + " thành công");
  });
};

module.exports = payments;
