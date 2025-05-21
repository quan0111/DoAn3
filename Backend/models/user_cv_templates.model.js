
const db = require("../common/db");

const user_cv_templates = (user_cv_templates) => {
  this.user_cv_id = user_cv_templates.user_cv_id;
  this.user_id = user_cv_templates.user_id;
  this.resume_id = user_cv_templates.resume_id;
  this.template_id = user_cv_templates.template_id;
  this.name = user_cv_templates.name;
  this.content = user_cv_templates.content;
  this.custom_css = user_cv_templates.custom_css;
};

user_cv_templates.getById = (id, callback) => {
  const sqlString = "SELECT * FROM user_cv_templates WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

user_cv_templates.getAll = (callback) => {
  const sqlString = "SELECT * FROM user_cv_templates ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

user_cv_templates.insert = (user_cv_templates, callBack) => {
  const sqlString = "INSERT INTO user_cv_templates SET ?";
  db.query(sqlString, user_cv_templates, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...user_cv_templates });
  });
};

user_cv_templates.update = (user_cv_templates, id, callBack) => {
  const sqlString = "UPDATE user_cv_templates SET ? WHERE id = ?";
  db.query(sqlString, [user_cv_templates, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật user_cv_templates có id = " + id + " thành công");
  });
};

user_cv_templates.delete = (id, callBack) => {
  db.query(`DELETE FROM user_cv_templates WHERE id = ?`, id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa user_cv_templates có id = " + id + " thành công");
  });
};

module.exports = user_cv_templates;
