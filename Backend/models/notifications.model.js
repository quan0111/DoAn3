
const db = require("../common/db");

const notifications = (notifications) => {
  this.notification_id = notifications.notification_id;
  this.user_id = notifications.user_id;
  this.type = notifications.type;
  this.message = notifications.message;
  this.is_read = notifications.is_read;
  this.created_at = notifications.created_at;
};

notifications.getById = (id, callback) => {
  const sqlString = "SELECT * FROM notifications WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

notifications.getAll = (callback) => {
  const sqlString = "SELECT * FROM notifications ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

notifications.insert = (notifications, callBack) => {
  const sqlString = "INSERT INTO notifications SET ?";
  db.query(sqlString, notifications, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...notifications });
  });
};

notifications.update = (notifications, id, callBack) => {
  const sqlString = "UPDATE notifications SET ? WHERE id = ?";
  db.query(sqlString, [notifications, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật notifications có id = " + id + " thành công");
  });
};

notifications.delete = (id, callBack) => {
  db.query(`DELETE FROM notifications WHERE id = ?`, id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa notifications có id = " + id + " thành công");
  });
};

module.exports = notifications;
