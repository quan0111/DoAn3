
const db = require("../common/db");

const ai_intents = (ai_intents) => {
  this.intent_id = ai_intents.intent_id;
  this.intent_name = ai_intents.intent_name;
  this.description = ai_intents.description;
  this.created_at = ai_intents.created_at;
};

ai_intents.getById = (id, callback) => {
  const sqlString = "SELECT * FROM ai_intents WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

ai_intents.getAll = (callback) => {
  const sqlString = "SELECT * FROM ai_intents ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

ai_intents.insert = (ai_intents, callBack) => {
  const sqlString = "INSERT INTO ai_intents SET ?";
  db.query(sqlString, ai_intents, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...ai_intents });
  });
};

ai_intents.update = (ai_intents, id, callBack) => {
  const sqlString = "UPDATE ai_intents SET ? WHERE id = ?";
  db.query(sqlString, [ai_intents, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật ai_intents có id = " + id + " thành công");
  });
};

ai_intents.delete = (id, callBack) => {
  db.query(`DELETE FROM ai_intents WHERE id = ?`, id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa ai_intents có id = " + id + " thành công");
  });
};

module.exports = ai_intents;
