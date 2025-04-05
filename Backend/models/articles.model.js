
const db = require("../common/db");

const articles = (articles) => {
  this.article_id = articles.article_id;
  this.title = articles.title;
  this.slug = articles.slug;
  this.content = articles.content;
  this.thumbnail_url = articles.thumbnail_url;
  this.author_id = articles.author_id;
  this.published_at = articles.published_at;
};

articles.getById = (id, callback) => {
  const sqlString = "SELECT * FROM articles WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

articles.getAll = (callback) => {
  const sqlString = "SELECT * FROM articles ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

articles.insert = (articles, callBack) => {
  const sqlString = "INSERT INTO articles SET ?";
  db.query(sqlString, articles, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...articles });
  });
};

articles.update = (articles, id, callBack) => {
  const sqlString = "UPDATE articles SET ? WHERE id = ?";
  db.query(sqlString, [articles, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật articles có id = " + id + " thành công");
  });
};

articles.delete = (id, callBack) => {
  db.query(`DELETE FROM articles WHERE id = ?`, id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa articles có id = " + id + " thành công");
  });
};

module.exports = articles;
