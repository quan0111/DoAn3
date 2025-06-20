
const db = require("../common/db");

const feedbacks = (feedbacks) => {
  this.feedback_id = feedbacks.feedback_id;
  this.user_id = feedbacks.user_id;
  this.subject = feedbacks.subject;
  this.message = feedbacks.message;
  this.rating = feedbacks.rating;
  this.created_at = feedbacks.created_at;
};

feedbacks.getById = (id, callback) => {
  const sqlString = `SELECT 
  f.feedback_id,
  f.subject,
  f.message,
  f.rating,
  f.created_at,
  u.full_name AS user_name,
  u.email
FROM feedbacks f
LEFT JOIN users u ON f.user_id = u.user_id
ORDER BY f.created_at DESC
where feedback_id =? 
;`
;
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

feedbacks.getAll = (callback) => {
  const sqlString = `SELECT 
  f.feedback_id,
  f.subject,
  f.message,
  f.rating,
  f.created_at,
  u.full_name AS user_name,
  u.email
FROM feedbacks f
LEFT JOIN users u ON f.user_id = u.user_id
ORDER BY f.created_at DESC;`
;
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

feedbacks.insert = (feedbacks, callBack) => {
  const sqlString = "INSERT INTO feedbacks SET ?";
  db.query(sqlString, feedbacks, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...feedbacks });
  });
};

feedbacks.update = (feedbacks, id, callBack) => {
  const sqlString = "UPDATE feedbacks SET ? WHERE feedback_id = ?";
  db.query(sqlString, [feedbacks, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật feedbacks có id = " + id + " thành công");
  });
};

feedbacks.delete = (id, callBack) => {
  db.query(`DELETE FROM feedbacks WHERE feedback_id = ?`, id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa feedbacks có id = " + id + " thành công");
  });
};

module.exports = feedbacks;
