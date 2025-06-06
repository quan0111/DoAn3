
const db = require("../common/db");

const saved_jobs = (saved_jobs) => {
  this.user_id = saved_jobs.user_id;
  this.job_id = saved_jobs.job_id;
  this.saved_at = saved_jobs.saved_at;
};

saved_jobs.getById = (id, callback) => {
  const sqlString = "SELECT * FROM saved_jobs WHERE user_id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

saved_jobs.getAll = (callback) => {
  const sqlString = "SELECT * FROM saved_jobs ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

saved_jobs.insert = (saved_jobs, callBack) => {
  const sqlString = "INSERT INTO saved_jobs SET ?";
  db.query(sqlString, saved_jobs, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...saved_jobs });
  });
};

saved_jobs.update = (saved_jobs, id, callBack) => {
  const sqlString = "UPDATE saved_jobs SET ? WHERE user_id = ?";
  db.query(sqlString, [saved_jobs, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật saved_jobs có id = " + id + " thành công");
  });
};

saved_jobs.delete = (id, callBack) => {
  db.query(`DELETE FROM saved_jobs WHERE user_id = ?`, id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa saved_jobs có id = " + id + " thành công");
  });
};

module.exports = saved_jobs;
