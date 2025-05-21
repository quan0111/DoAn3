
const db = require("../common/db");

const cv_template_usage_stats = (cv_template_usage_stats) => {
  this.stat_id = cv_template_usage_stats.stat_id;
  this.template_id = cv_template_usage_stats.template_id;
  this.views = cv_template_usage_stats.views;
  this.downloads = cv_template_usage_stats.downloads;
  this.uses = cv_template_usage_stats.uses;
};

cv_template_usage_stats.getById = (id, callback) => {
  const sqlString = "SELECT * FROM cv_template_usage_stats WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

cv_template_usage_stats.getAll = (callback) => {
  const sqlString = "SELECT * FROM cv_template_usage_stats ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

cv_template_usage_stats.insert = (cv_template_usage_stats, callBack) => {
  const sqlString = "INSERT INTO cv_template_usage_stats SET ?";
  db.query(sqlString, cv_template_usage_stats, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...cv_template_usage_stats });
  });
};

cv_template_usage_stats.update = (cv_template_usage_stats, id, callBack) => {
  const sqlString = "UPDATE cv_template_usage_stats SET ? WHERE id = ?";
  db.query(sqlString, [cv_template_usage_stats, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật cv_template_usage_stats có id = " + id + " thành công");
  });
};

cv_template_usage_stats.delete = (id, callBack) => {
  db.query(`DELETE FROM cv_template_usage_stats WHERE id = ?`, id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa cv_template_usage_stats có id = " + id + " thành công");
  });
};

module.exports = cv_template_usage_stats;
