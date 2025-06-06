
const db = require("../common/db");

const cv_templates = (cv_templates) => {
  this.template_id = cv_templates.template_id;
  this.name = cv_templates.name;
  this.description = cv_templates.description;
  this.thumbnail_url = cv_templates.thumbnail_url;
  this.html_structure = cv_templates.html_structure;
  this.css_styles = cv_templates.css_styles;
  this.category_id = cv_templates.category_id;
  this.is_premium = cv_templates.is_premium;
  this.price = cv_templates.price;
  this.popularity_score = cv_templates.popularity_score;
};

cv_templates.getById = (id, callback) => {
  const sqlString = "SELECT * FROM cv_templates WHERE template_id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

cv_templates.getAll = (callback) => {
  const sqlString = "SELECT * FROM cv_templates ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

cv_templates.insert = (cv_templates, callBack) => {
  const sqlString = "INSERT INTO cv_templates SET ?";
  db.query(sqlString, cv_templates, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...cv_templates });
  });
};

cv_templates.update = (cv_templates, id, callBack) => {
  const sqlString = "UPDATE cv_templates SET ? WHERE template_id = ?";
  db.query(sqlString, [cv_templates, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật cv_templates có id = " + id + " thành công");
  });
};

cv_templates.delete = (id, callBack) => {
  db.query(`DELETE FROM cv_templates WHERE template_id = ?`, id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa cv_templates có id = " + id + " thành công");
  });
};

module.exports = cv_templates;
