
const db = require("../common/db");

const user_activities = (user_activities) => {
  this.activity_id = user_activities.activity_id;
  this.user_id = user_activities.user_id;
  this.action_type = user_activities.action_type;
  this.details = user_activities.details;
  this.timestamp = user_activities.timestamp;
};

user_activities.getById = (id, callback) => {
  const sqlString = "SELECT * FROM user_activities WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

user_activities.getAll = (callback) => {
  const sqlString = "SELECT * FROM user_activities ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

user_activities.insert = (user_activities, callBack) => {
  const sqlString = "INSERT INTO user_activities SET ?";
  db.query(sqlString, user_activities, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...user_activities });
  });
};

user_activities.update = (user_activities, id, callBack) => {
  const sqlString = "UPDATE user_activities SET ? WHERE id = ?";
  db.query(sqlString, [user_activities, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật user_activities có id = " + id + " thành công");
  });
};

user_activities.delete = (id, callBack) => {
  db.query(`DELETE FROM user_activities WHERE id = ?`, id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa user_activities có id = " + id + " thành công");
  });
};

module.exports = user_activities;
