
const db = require("../common/db");

const translations = (translations) => {
  this.translation_id = translations.translation_id;
  this.entity_type = translations.entity_type;
  this.entity_id = translations.entity_id;
  this.language = translations.language;
  this.translated_content = translations.translated_content;
  this.created_at = translations.created_at;
  this.updated_at = translations.updated_at;
};

translations.getById = (id, callback) => {
  const sqlString = "SELECT * FROM translations WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

translations.getAll = (callback) => {
  const sqlString = "SELECT * FROM translations ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

translations.insert = (translations, callBack) => {
  const sqlString = "INSERT INTO translations SET ?";
  db.query(sqlString, translations, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...translations });
  });
};

translations.update = (translations, id, callBack) => {
  const sqlString = "UPDATE translations SET ? WHERE id = ?";
  db.query(sqlString, [translations, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật translations có id = " + id + " thành công");
  });
};

translations.delete = (id, callBack) => {
  db.query(`DELETE FROM translations WHERE id = ?`, id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa translations có id = " + id + " thành công");
  });
};

module.exports = translations;
