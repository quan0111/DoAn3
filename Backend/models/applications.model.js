
const db = require("../common/db");

const applications = (applications) => {
  this.application_id = applications.application_id;
  this.job_id = applications.job_id;
  this.user_id = applications.user_id;
  this.resume_id = applications.resume_id;
  this.cover_letter = applications.cover_letter;
  this.status = applications.status;
  this.applied_at = applications.applied_at;
  this.updated_at = applications.updated_at;
};

applications.getById = (id, callback) => {
  const sqlString = "SELECT * FROM applications WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

applications.getAll = (callback) => {
  const sqlString = "SELECT * FROM applications ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

applications.insert = (applications, callBack) => {
  const sqlString = "INSERT INTO applications SET ?";
  db.query(sqlString, applications, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...applications });
  });
};

applications.update = (applications, id, callBack) => {
  const sqlString = "UPDATE applications SET ? WHERE id = ?";
  db.query(sqlString, [applications, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật applications có id = " + id + " thành công");
  });
};

applications.delete = (id, callBack) => {
  db.query(`DELETE FROM applications WHERE id = ?`, id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa applications có id = " + id + " thành công");
  });
};

module.exports = applications;
