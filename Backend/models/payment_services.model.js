const db = require("../common/db");

const PaymentService = function(data) {
  this.id = data.id;
  this.name = data.name;
  this.price = data.price;
  this.duration = data.duration;
  this.bonus_credits = data.bonus_credits;
  this.top_box_description = data.top_box_description;
  this.re_top_gold = data.re_top_gold;
  this.re_top_normal = data.re_top_normal;
  this.top_job_alert = data.top_job_alert;
  this.urgent_add_on = data.urgent_add_on;
  this.discount_percent = data.discount_percent;
  this.vat_included = data.vat_included;
  this.image_url = data.image_url;
  this.user_type = data.user_type;
  this.category_id = data.category_id;
  this.active = data.active;
};

PaymentService.getById = (id, callback) => {
  const sqlString = "SELECT * FROM payment_services WHERE id = ?";
  db.query(sqlString, [id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

PaymentService.getAll = (callback) => {
  const sqlString = "SELECT * FROM payment_services";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

PaymentService.insert = (data, callback) => {
  const sqlString = "INSERT INTO payment_services SET ?";
  db.query(sqlString, data, (err, res) => {
    if (err) return callback(err);
    callback(null, { id: res.insertId, ...data });
  });
};

PaymentService.update = (data, id, callback) => {
  const sqlString = "UPDATE payment_services SET ? WHERE id = ?";
  db.query(sqlString, [data, id], (err, res) => {
    if (err) return callback(err);
    callback(null, `Cập nhật payment_services có id = ${id} thành công`);
  });
};

PaymentService.delete = (id, callback) => {
  const sqlString = "DELETE FROM payment_services WHERE id = ?";
  db.query(sqlString, [id], (err, res) => {
    if (err) return callback(err);
    callback(null, `Xóa payment_services có id = ${id} thành công`);
  });
};

module.exports = PaymentService;
