
const db = require("../common/db");

const jobseekers = (jobseekers) => {
  this.user_id = jobseekers.user_id;
  this.career_goals = jobseekers.career_goals;
  this.experience_years = jobseekers.experience_years;
  this.desired_salary_min = jobseekers.desired_salary_min;
  this.desired_salary_max = jobseekers.desired_salary_max;
  this.job_preferences = jobseekers.job_preferences;
  this.linkedin_url = jobseekers.linkedin_url;
  this.portfolio_url = jobseekers.portfolio_url;
  this.created_at = jobseekers.created_at;
  this.updated_at = jobseekers.updated_at;
};

jobseekers.getById = (id, callback) => {
  const sqlString = "SELECT * FROM jobseekers WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

jobseekers.getAll = (callback) => {
  const sqlString = "SELECT * FROM jobseekers ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

jobseekers.insert = (jobseekers, callBack) => {
  const sqlString = "INSERT INTO jobseekers SET ?";
  db.query(sqlString, jobseekers, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...jobseekers });
  });
};

jobseekers.update = (jobseekers, id, callBack) => {
  const sqlString = "UPDATE jobseekers SET ? WHERE id = ?";
  db.query(sqlString, [jobseekers, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật jobseekers có id = " + id + " thành công");
  });
};

jobseekers.delete = (id, callBack) => {
  db.query(`DELETE FROM jobseekers WHERE id = ?`, id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa jobseekers có id = " + id + " thành công");
  });
};

module.exports = jobseekers;
