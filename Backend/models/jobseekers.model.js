
const db = require("../common/db");

const jobseekers = (jobseekers) => {
  this.user_id = jobseekers.user_id;
  this.career_goals = jobseekers.career_goals;
  this.desired_position = jobseekers.desired_position;
  this.experience_years = jobseekers.experience_years;
  this.desired_salary_min = jobseekers.desired_salary_min;
  this.desired_salary_max = jobseekers.desired_salary_max;
  this.job_preferences = jobseekers.job_preferences;
  this.linkedin_url = jobseekers.linkedin_url;
  this.portfolio_url = jobseekers.portfolio_url;
  this.created_at = jobseekers.created_at;
  this.updated_at = jobseekers.updated_at;
};

jobseekers.getAll = (callback) => {
  const sqlString = `
        SELECT js.*, u.*
      FROM jobseekers js
      JOIN users u ON js.user_id = u.user_id
  `;
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

jobseekers.getById = (id, callback) => {
  const sqlString = `
    SELECT js.*, u.*
    FROM jobseekers js
    JOIN users u ON js.user_id = u.user_id
    WHERE js.user_id = ?
  `;
  db.query(sqlString, [id], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

jobseekers.insert = (jobseeker, callback) => {
  const sqlString = "INSERT INTO jobseekers SET ?";
  db.query(sqlString, jobseeker, (err, res) => {
    if (err) return callback(err);
    callback({ user_id: res.insertId, ...jobseeker });
  });
};

jobseekers.update = (jobseeker, id, callback) => {
  const sqlString = "UPDATE jobseekers SET ? WHERE user_id = ?";
  db.query(sqlString, [jobseeker, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật jobseeker có id = " + id + " thành công");
  });
};

jobseekers.delete = (id, callback) => {
  const sqlString = "DELETE FROM jobseekers WHERE user_id = ?";
  db.query(sqlString, [id], (err, res) => {
    if (err) return callback(err);
    callback("Xóa jobseeker có user_id = " + id + " thành công");
  });
};

module.exports = jobseekers;