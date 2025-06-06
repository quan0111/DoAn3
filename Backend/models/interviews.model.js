
const db = require("../common/db");

const interviews = (interviews) => {
  this.interview_id = interviews.interview_id;
  this.application_id = interviews.application_id;
  this.schedule_time = interviews.schedule_time;
  this.platform = interviews.platform;
  this.meeting_url = interviews.meeting_url;
  this.status = interviews.status;
  this.notes = interviews.notes;
  this.created_at = interviews.created_at;
  this.updated_at = interviews.updated_at;
};

interviews.getById = (id, callback) => {
  const sqlString = "SELECT * FROM interviews WHERE interview_id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

interviews.getAll = (callback) => {
  const sqlString = "SELECT * FROM interviews ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

interviews.insert = (interviews, callBack) => {
  const sqlString = "INSERT INTO interviews SET ?";
  db.query(sqlString, interviews, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...interviews });
  });
};

interviews.update = (interviews, id, callBack) => {
  const sqlString = "UPDATE interviews SET ? WHERE interview_id = ?";
  db.query(sqlString, [interviews, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật interviews có interview_id = " + id + " thành công");
  });
};

interviews.delete = (id, callBack) => {
  db.query(`DELETE FROM interviews WHERE interview_id = ?`, id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa interviews có id = " + id + " thành công");
  });
};

module.exports = interviews;
