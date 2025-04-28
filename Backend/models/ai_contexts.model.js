
const db = require("../common/db");

const ai_contexts = (ai_contexts) => {
  this.context_id = ai_contexts.context_id;
  this.user_id = ai_contexts.user_id;
  this.session_id = ai_contexts.session_id;
  this.context_data = ai_contexts.context_data;
  this.created_at = ai_contexts.created_at;
  this.expires_at = ai_contexts.expires_at;
};

ai_contexts.getById = (id, callback) => {
  const sqlString = "SELECT * FROM ai_contexts WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

ai_contexts.getAll = (callback) => {
  const sqlString = "SELECT * FROM ai_contexts ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

ai_contexts.insert = (ai_contexts, callBack) => {
  const sqlString = "INSERT INTO ai_contexts SET ?";
  db.query(sqlString, ai_contexts, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...ai_contexts });
  });
};

ai_contexts.update = (ai_contexts, id, callBack) => {
  const sqlString = "UPDATE ai_contexts SET ? WHERE id = ?";
  db.query(sqlString, [ai_contexts, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật ai_contexts có id = " + id + " thành công");
  });
};

ai_contexts.delete = (id, callBack) => {
  db.query(`DELETE FROM ai_contexts WHERE id = ?`, id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa ai_contexts có id = " + id + " thành công");
  });
};

module.exports = ai_contexts;
