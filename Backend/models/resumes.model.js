
const db = require("../common/db");

const resumes = (resumes) => {
  this.resume_id = resumes.resume_id;
  this.user_id = resumes.user_id;
  this.title = resumes.title;
  this.summary = resumes.summary;
  this.education = resumes.education;
  this.experience = resumes.experience;
  this.skills = resumes.skills;
  this.certificates = resumes.certificates;
  this.file_url = resumes.file_url;
  this.created_at = resumes.created_at;
};

resumes.getById = (id, callback) => {
  const sqlString = "SELECT * FROM resumes WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

resumes.getAll = (callback) => {
  const sqlString = "SELECT * FROM resumes ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

resumes.insert = (resumes, callBack) => {
  const sqlString = "INSERT INTO resumes SET ?";
  db.query(sqlString, resumes, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...resumes });
  });
};

resumes.update = (resumes, id, callBack) => {
  const sqlString = "UPDATE resumes SET ? WHERE id = ?";
  db.query(sqlString, [resumes, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật resumes có id = " + id + " thành công");
  });
};

resumes.delete = (id, callBack) => {
  db.query(`DELETE FROM resumes WHERE id = ?`, id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa resumes có id = " + id + " thành công");
  });
};

module.exports = resumes;
