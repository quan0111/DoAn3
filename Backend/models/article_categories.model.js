
const db = require("../common/db");

const article_categories = (article_categories) => {
  this.category_id = article_categories.category_id;
  this.name = article_categories.name;
};

article_categories.getById = (id, callback) => {
  const sqlString = "SELECT * FROM article_categories WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

article_categories.getAll = (callback) => {
  const sqlString = "SELECT * FROM article_categories ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

article_categories.insert = (article_categories, callBack) => {
  const sqlString = "INSERT INTO article_categories SET ?";
  db.query(sqlString, article_categories, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...article_categories });
  });
};

article_categories.update = (article_categories, id, callBack) => {
  const sqlString = "UPDATE article_categories SET ? WHERE id = ?";
  db.query(sqlString, [article_categories, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật article_categories có id = " + id + " thành công");
  });
};

article_categories.delete = (id, callBack) => {
  db.query(`DELETE FROM article_categories WHERE id = ?`, id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa article_categories có id = " + id + " thành công");
  });
};

module.exports = article_categories;
