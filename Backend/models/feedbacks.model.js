
const db = require("../common/db");

const feedbacks = (feedbacks) => {
  this.feedback_id = feedbacks.feedback_id;
  this.user_id = feedbacks.user_id;
  this.full_name= feedbacks.fullname;
  this.Desired_position = feedbacks.Desired_position;
  this.avatar_url = feedbacks.avatar_url;
  this.subject = feedbacks.subject;
  this.message = feedbacks.message;
  this.rating = feedbacks.rating;
  this.created_at = feedbacks.created_at;
};

feedbacks.getById = (id, callback) => {
  const sqlString = "SELECT feedback_id,feedbacks.user_id,full_name,Desired_position,avatar_url,subject,message,rating,feedbacks.created_at FROM feedbacks inner join users on users.user_id = feedbacks.user_id inner join jobseekers on users.user_id = jobseekers.user_id where feedback_id=? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

feedbacks.getAll = (callback) => {
  const sqlString = "SELECT feedback_id,feedbacks.user_id,full_name,Desired_position,avatar_url,subject,message,rating,feedbacks.created_at FROM feedbacks inner join users on users.user_id = feedbacks.user_id inner join jobseekers on users.user_id = jobseekers.user_id";
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
  const sqlString = "UPDATE feedbacks SET ? WHERE id = ?";
  db.query(sqlString, [feedbacks, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật feedbacks có id = " + id + " thành công");
  });
};

feedbacks.delete = (id, callBack) => {
  db.query(`DELETE FROM feedbacks WHERE id = ?`, id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa feedbacks có id = " + id + " thành công");
  });
};

module.exports = feedbacks;
