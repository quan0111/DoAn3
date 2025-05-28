
const db = require("../common/db");

const jobs = (jobs) => {
  this.job_id = jobs.job_id;
  this.company_id = jobs.company_id;
  this.company_name = jobs.company_name;
  this.logo_url = jobs.logo_url;
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
  this.education_level = jobs.education_level
};

jobs.getById = (id, callback) => {
  const sqlString = "SELECT job_id,jobs.company_id,company_name,logo_url,title,jobs.description,education_level,requirements,benefits,salary_min,salary_max,jobs.location,job_level,job_type,status,priority_score,auto_expire,view_count,application_count,jobs.created_at,jobs.updated_at FROM jobs inner join companies on jobs.company_id = companies.company_id WHERE job_id = ?";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};
  jobs.getJobsByCategoryId = (categoryId, callback) => {
    const sqlString = " SELECT j.* FROM jobs j JOIN job_category_mapping m ON j.job_id = m.job_id WHERE m.category_id = ? ";
    db.query(sqlString, [categoryId], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  };

jobs.getAll = (callback) => {
  const sqlString = "SELECT job_id,jobs.company_id,company_name,logo_url,title,jobs.description,requirements,benefits,salary_min,salary_max,jobs.location,job_level,job_type,status,priority_score,auto_expire,view_count,application_count,jobs.created_at,jobs.updated_at FROM jobs inner join companies on jobs.company_id = companies.company_id";
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
