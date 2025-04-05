
const db = require("../common/db");

const job_category_mapping = (job_category_mapping) => {
  this.job_id = job_category_mapping.job_id;
  this.category_id = job_category_mapping.category_id;
};

job_category_mapping.getById = (id, callback) => {
  const sqlString = "SELECT * FROM job_category_mapping WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

job_category_mapping.getAll = (callback) => {
  const sqlString = "SELECT * FROM job_category_mapping ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

job_category_mapping.insert = (job_category_mapping, callBack) => {
  const sqlString = "INSERT INTO job_category_mapping SET ?";
  db.query(sqlString, job_category_mapping, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...job_category_mapping });
  });
};

job_category_mapping.update = (job_category_mapping, id, callBack) => {
  const sqlString = "UPDATE job_category_mapping SET ? WHERE id = ?";
  db.query(sqlString, [job_category_mapping, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật job_category_mapping có id = " + id + " thành công");
  });
};

job_category_mapping.delete = (id, callBack) => {
  db.query(`DELETE FROM job_category_mapping WHERE id = ?`, id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa job_category_mapping có id = " + id + " thành công");
  });
};

module.exports = job_category_mapping;
