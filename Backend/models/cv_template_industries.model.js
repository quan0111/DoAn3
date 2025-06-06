
const db = require("../common/db");

const cv_template_industries = (cv_template_industries) => {
  this.template_id = cv_template_industries.template_id;
  this.industry = cv_template_industries.industry;
};

cv_template_industries.getById = (id, callback) => {
  const sqlString = "SELECT * FROM cv_template_industries WHERE template_id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

cv_template_industries.getAll = (callback) => {
  const sqlString = "SELECT * FROM cv_template_industries ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

cv_template_industries.insert = (cv_template_industries, callBack) => {
  const sqlString = "INSERT INTO cv_template_industries SET ?";
  db.query(sqlString, cv_template_industries, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...cv_template_industries });
  });
};

cv_template_industries.update = (cv_template_industries, id, callBack) => {
  const sqlString = "UPDATE cv_template_industries SET ? WHERE id = ?";
  db.query(sqlString, [cv_template_industries, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật cv_template_industries có template_id = " + id + " thành công");
  });
};

cv_template_industries.delete = (id, callBack) => {
  db.query(`DELETE FROM cv_template_industries WHERE template_id = ?`, id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa cv_template_industries có template_id = " + id + " thành công");
  });
};

module.exports = cv_template_industries;
