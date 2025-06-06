
const db = require("../common/db");

const Service_categories = function(service_categories) {
  this.id = service_categories.id;
  this.name = service_categories.name;
  this.description = service_categories.description;
  this.active = service_categories.active;
};

Service_categories.getById = (id, callback) => {
  const sqlString = "SELECT * FROM service_categories WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

Service_categories.getAll = (callback) => {
  const sqlString = "SELECT * FROM service_categories ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

Service_categories.insert = (service_categories, callBack) => {
  const sqlString = "INSERT INTO service_categories SET ?";
  db.query(sqlString, service_categories, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...service_categories });
  });
};

Service_categories.update = (service_categories, id, callBack) => {
  const sqlString = "UPDATE service_categories SET ? WHERE id = ?";
  db.query(sqlString, [service_categories, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật service_categories có id = " + id + " thành công");
  });
};

Service_categories.delete = (id, callBack) => {
  db.query(`DELETE FROM service_categories WHERE id = ?`, id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa service_categories có id = " + id + " thành công");
  });
};

module.exports = Service_categories;
