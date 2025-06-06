
const db = require("../common/db");

const job_skills = (job_skills) => {
  this.job_id = job_skills.job_id;
  this.skill = job_skills.skill;
};

job_skills.getById = (id, callback) => {
  const sqlString = "SELECT * FROM job_skills WHERE job_id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

job_skills.getAll = (callback) => {
  const sqlString = "SELECT * FROM job_skills ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

job_skills.insert = (job_skills, callBack) => {
  const sqlString = "INSERT INTO job_skills SET ?";
  db.query(sqlString, job_skills, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...job_skills });
  });
};

job_skills.update = (job_skills, id, callBack) => {
  const sqlString = "UPDATE job_skills SET ? WHERE job_id = ?";
  db.query(sqlString, [job_skills, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật job_skills có id = " + id + " thành công");
  });
};

job_skills.delete = (id, callBack) => {
  db.query(`DELETE FROM job_skills WHERE job_id = ?`, id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa job_skills có id = " + id + " thành công");
  });
};

module.exports = job_skills;
