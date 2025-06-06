
const db = require("../common/db");

const company_followers = (company_followers) => {
  this.user_id = company_followers.user_id;
  this.company_id = company_followers.company_id;
  this.followed_at = company_followers.followed_at;
};

company_followers.getById = (id, callback) => {
  const sqlString = "SELECT * FROM company_followers WHERE user_id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

company_followers.getAll = (callback) => {
  const sqlString = "SELECT * FROM company_followers ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

company_followers.insert = (company_followers, callBack) => {
  const sqlString = "INSERT INTO company_followers SET ?";
  db.query(sqlString, company_followers, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...company_followers });
  });
};

company_followers.update = (company_followers, id, callBack) => {
  const sqlString = "UPDATE company_followers SET ? WHERE user_id = ?";
  db.query(sqlString, [company_followers, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật company_followers có id = " + id + " thành công");
  });
};

company_followers.delete = (id, callBack) => {
  db.query(`DELETE FROM company_followers WHERE user_id = ?`, id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa company_followers có id = " + id + " thành công");
  });
};

module.exports = company_followers;
