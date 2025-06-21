
const db = require("../common/db");

const cv_template_categories = (cv_template_categories) => {
  this.category_id = cv_template_categories.category_id;
  this.name = cv_template_categories.name;
  this.description = cv_template_categories.description;
  this.icon_url = cv_template_categories.icon_url;
};

cv_template_categories.getByName = (name, callback) => {
  const sqlString = "SELECT * FROM cv_template_categories WHERE name = ?";
  db.query(sqlString, [name], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

cv_template_categories.getById = (id, callback) => {
  const sqlString = "SELECT * FROM cv_template_categories WHERE category_id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null,result);
  });
};

cv_template_categories.getAll = (callback) => {
  const sqlString = "SELECT * FROM cv_template_categories ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null,result);
  });
};

cv_template_categories.insert = (cv_template_categories, callBack) => {
  const sqlString = "INSERT INTO cv_template_categories SET ?";
  db.query(sqlString, cv_template_categories, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...cv_template_categories });
  });
};

cv_template_categories.update = (data, id, callBack) => {
  const sqlString = "UPDATE cv_template_categories SET ? WHERE category_id = ?";
  db.query(sqlString, [data, id], (err, res) => {
    if (err) return callBack(err);
    if (res.affectedRows === 0) return callBack(`Không tìm thấy category_id = ${id}`);
    callBack(null, `Cập nhật category_id = ${id} thành công`);
  });
};

cv_template_categories.delete = (id, callBack) => {
  db.query("DELETE FROM cv_template_categories WHERE category_id = ?", id, (err, res) => {
    if (err) return callBack(err);
    if (res.affectedRows === 0) return callBack(`Không tìm thấy category_id = ${id}`);
    callBack(null, `Xóa category_id = ${id} thành công`);
  });
};


module.exports = cv_template_categories;
