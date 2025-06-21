
const db = require("../common/db");

const cv_template_ratings = (cv_template_ratings) => {
  this.rating_id = cv_template_ratings.rating_id;
  this.template_id = cv_template_ratings.template_id;
  this.user_id = cv_template_ratings.user_id;
  this.rating = cv_template_ratings.rating;
  this.comment = cv_template_ratings.comment;
};

cv_template_ratings.getById = (id, callback) => {
  const sqlString = "SELECT * FROM cv_template_ratings WHERE rating_id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};
cv_template_ratings.getByTemplateId = (template_id, callback) => {
  const sqlString = `
    SELECT r.*, u.full_name
    FROM cv_template_ratings r
    LEFT JOIN users u ON r.user_id = u.user_id
    WHERE r.template_id = ?
    ORDER BY r.rating_id DESC
  `;
  db.query(sqlString, [template_id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};
cv_template_ratings.getAverageRating = (template_id, callback) => {
  const sqlString = `
    SELECT 
      AVG(rating) AS average_rating, 
      COUNT(*) AS total_ratings 
    FROM cv_template_ratings 
    WHERE template_id = ?
  `;
  db.query(sqlString, [template_id], (err, result) => {
    if (err) return callback(err);
    callback(null, result[0]);
  });
};
cv_template_ratings.hasUserRated = (template_id, user_id, callback) => {
  const sqlString = `
    SELECT * FROM cv_template_ratings 
    WHERE template_id = ? AND user_id = ?
  `;
  db.query(sqlString, [template_id, user_id], (err, result) => {
    if (err) return callback(err);
    callback(null, result.length > 0);
  });
};

cv_template_ratings.getAll = (callback) => {
  const sqlString = "SELECT * FROM cv_template_ratings ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

cv_template_ratings.insert = (cv_template_ratings, callBack) => {
  const sqlString = "INSERT INTO cv_template_ratings SET ?";
  db.query(sqlString, cv_template_ratings, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...cv_template_ratings });
  });
};

cv_template_ratings.update = (cv_template_ratings, id, callBack) => {
  const sqlString = "UPDATE cv_template_ratings SET ? WHERE rating_id = ?";
  db.query(sqlString, [cv_template_ratings, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật cv_template_ratings có id = " + id + " thành công");
  });
};

cv_template_ratings.delete = (id, callBack) => {
  db.query(`DELETE FROM cv_template_ratings WHERE rating_id = ?`, id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa cv_template_ratings có id = " + id + " thành công");
  });
};

module.exports = cv_template_ratings;
