
const db = require("../common/db");

const cv_template_components = (cv_template_components) => {
  this.component_id = cv_template_components.component_id;
  this.template_id = cv_template_components.template_id;
  this.name = cv_template_components.name;
  this.display_name = cv_template_components.display_name;
  this.html_structure = cv_template_components.html_structure;
  this.css_styles = cv_template_components.css_styles;
  this.is_required = cv_template_components.is_required;
  this.display_order = cv_template_components.display_order;
};

cv_template_components.getById = (id, callback) => {
  const sqlString = "SELECT * FROM cv_template_components WHERE component_id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

cv_template_components.getAll = (callback) => {
  const sqlString = "SELECT * FROM cv_template_components ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

cv_template_components.insert = (cv_template_components, callBack) => {
  const sqlString = "INSERT INTO cv_template_components SET ?";
  db.query(sqlString, cv_template_components, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...cv_template_components });
  });
};

cv_template_components.update = (cv_template_components, id, callBack) => {
  const sqlString = "UPDATE cv_template_components SET ? WHERE component_id = ?";
  db.query(sqlString, [cv_template_components, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật cv_template_components có id = " + id + " thành công");
  });
};

cv_template_components.delete = (id, callBack) => {
  db.query(`DELETE FROM cv_template_components WHERE component_id = ?`, id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa cv_template_components có id = " + id + " thành công");
  });
};

module.exports = cv_template_components;
