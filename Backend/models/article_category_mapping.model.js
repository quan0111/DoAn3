
const db = require("../common/db");

const article_category_mapping = (article_category_mapping) => {
  this.article_id = article_category_mapping.article_id;
  this.category_id = article_category_mapping.category_id;
};

article_category_mapping.getById = (id, callback) => {
  const sqlString = "SELECT * FROM article_category_mapping WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

article_category_mapping.getAll = (callback) => {
  const sqlString = "SELECT * FROM article_category_mapping ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

article_category_mapping.insert = (article_category_mapping, callBack) => {
  const sqlString = "INSERT INTO article_category_mapping SET ?";
  db.query(sqlString, article_category_mapping, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...article_category_mapping });
  });
};

article_category_mapping.update = (article_category_mapping, id, callBack) => {
  const sqlString = "UPDATE article_category_mapping SET ? WHERE id = ?";
  db.query(sqlString, [article_category_mapping, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật article_category_mapping có id = " + id + " thành công");
  });
};

article_category_mapping.delete = (id, callBack) => {
  db.query(`DELETE FROM article_category_mapping WHERE id = ?`, id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa article_category_mapping có id = " + id + " thành công");
  });
};

module.exports = article_category_mapping;
