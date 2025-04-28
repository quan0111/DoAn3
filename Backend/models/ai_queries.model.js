
const db = require("../common/db");

const ai_queries = (ai_queries) => {
  this.query_id = ai_queries.query_id;
  this.user_id = ai_queries.user_id;
  this.question = ai_queries.question;
  this.answer = ai_queries.answer;
  this.is_relevant = ai_queries.is_relevant;
  this.intent = ai_queries.intent;
  this.feedback_rating = ai_queries.feedback_rating;
  this.asked_at = ai_queries.asked_at;
};

ai_queries.getById = (id, callback) => {
  const sqlString = "SELECT * FROM ai_queries WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

ai_queries.getAll = (callback) => {
  const sqlString = "SELECT * FROM ai_queries ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

ai_queries.insert = (ai_queries, callBack) => {
  const sqlString = "INSERT INTO ai_queries SET ?";
  db.query(sqlString, ai_queries, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...ai_queries });
  });
};

ai_queries.update = (ai_queries, id, callBack) => {
  const sqlString = "UPDATE ai_queries SET ? WHERE id = ?";
  db.query(sqlString, [ai_queries, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật ai_queries có id = " + id + " thành công");
  });
};

ai_queries.delete = (id, callBack) => {
  db.query(`DELETE FROM ai_queries WHERE id = ?`, id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa ai_queries có id = " + id + " thành công");
  });
};

module.exports = ai_queries;
