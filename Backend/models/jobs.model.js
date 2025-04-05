
const db = require("../common/db");

const jobs = (jobs) => {
  this.job_id = jobs.job_id;
  this.company_id = jobs.company_id;
  this.title = jobs.title;
  this.description = jobs.description;
  this.requirements = jobs.requirements;
  this.benefits = jobs.benefits;
  this.salary_min = jobs.salary_min;
  this.salary_max = jobs.salary_max;
  this.location = jobs.location;
  this.job_level = jobs.job_level;
  this.job_type = jobs.job_type;
  this.deadline = jobs.deadline;
  this.created_at = jobs.created_at;
};

jobs.getById = (id, callback) => {
  const sqlString = "SELECT * FROM jobs WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

jobs.getAll = (callback) => {
  const sqlString = "SELECT * FROM jobs ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

jobs.insert = (jobs, callBack) => {
  const sqlString = "INSERT INTO jobs SET ?";
  db.query(sqlString, jobs, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...jobs });
  });
};

jobs.update = (jobs, id, callBack) => {
  const sqlString = "UPDATE jobs SET ? WHERE id = ?";
  db.query(sqlString, [jobs, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật jobs có id = " + id + " thành công");
  });
};

jobs.delete = (id, callBack) => {
  db.query(`DELETE FROM jobs WHERE id = ?`, id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa jobs có id = " + id + " thành công");
  });
};

module.exports = jobs;
