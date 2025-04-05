
const db = require("../common/db");

const job_categories = (job_categories) => {
  this.category_id = job_categories.category_id;
  this.name = job_categories.name;
  this.description = job_categories.description;
};

job_categories.getById = (id, callback) => {
  const sqlString = "SELECT * FROM job_categories WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

job_categories.getAll = (callback) => {
  const sqlString = "SELECT * FROM job_categories ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

job_categories.insert = (job_categories, callBack) => {
  const sqlString = "INSERT INTO job_categories SET ?";
  db.query(sqlString, job_categories, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...job_categories });
  });
};

job_categories.update = (job_categories, id, callBack) => {
  const sqlString = "UPDATE job_categories SET ? WHERE id = ?";
  db.query(sqlString, [job_categories, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật job_categories có id = " + id + " thành công");
  });
};

job_categories.delete = (id, callBack) => {
  db.query(`DELETE FROM job_categories WHERE id = ?`, id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa job_categories có id = " + id + " thành công");
  });
};

module.exports = job_categories;
