
const db = require("../common/db");

const advertisements = (advertisements) => {
  this.ad_id = advertisements.ad_id;
  this.title = advertisements.title;
  this.content = advertisements.content;
  this.image_url = advertisements.image_url;
  this.target_url = advertisements.target_url;
  this.budget = advertisements.budget;
  this.status = advertisements.status;
  this.start_date = advertisements.start_date;
  this.end_date = advertisements.end_date;
  this.created_at = advertisements.created_at;
  this.updated_at = advertisements.updated_at;
};

advertisements.getById = (id, callback) => {
  const sqlString = "SELECT * FROM advertisements WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

advertisements.getAll = (callback) => {
  const sqlString = "SELECT * FROM advertisements ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

advertisements.insert = (advertisements, callBack) => {
  const sqlString = "INSERT INTO advertisements SET ?";
  db.query(sqlString, advertisements, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...advertisements });
  });
};

advertisements.update = (advertisements, id, callBack) => {
  const sqlString = "UPDATE advertisements SET ? WHERE id = ?";
  db.query(sqlString, [advertisements, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật advertisements có id = " + id + " thành công");
  });
};

advertisements.delete = (id, callBack) => {
  db.query(`DELETE FROM advertisements WHERE id = ?`, id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa advertisements có id = " + id + " thành công");
  });
};

module.exports = advertisements;
