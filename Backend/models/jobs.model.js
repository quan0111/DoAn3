
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
  this.status = jobs.status;
  this.priority_score = jobs.priority_score;
  this.auto_expire = jobs.auto_expire;
  this.view_count = jobs.view_count;
  this.application_count = jobs.application_count;
  this.created_at = jobs.created_at;
  this.updated_at = jobs.updated_at;
  this.education_level = jobs.education_level;
};

jobs.getById = (id, callback) => {
  const sqlString = "SELECT * FROM jobs WHERE job_id = ? ";
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
  const sqlString = "UPDATE jobs SET ? WHERE job_id = ?";
  db.query(sqlString, [jobs, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật jobs có id = " + id + " thành công");
  });
};
jobs.getByCategoryId = (category_id, callback) => {
  const sqlString = `
    SELECT j.* FROM jobs j
    INNER JOIN job_category_mapping m ON j.job_id = m.job_id
    WHERE m.category_id = ?
  `;
  db.query(sqlString, [category_id], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};


jobs.delete = (id, callBack) => {
  db.query(`DELETE FROM jobs WHERE job_id = ?`, id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa jobs có id = " + id + " thành công");
  });
};

module.exports = jobs;
