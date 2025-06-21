
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
    callBack({...company_followers });
  });
};

company_followers.update = (data, userId, companyId, callBack) => {
  const sqlString = "UPDATE company_followers SET ? WHERE user_id = ? AND company_id = ?";
  db.query(sqlString, [data, userId, companyId], (err, res) => {
    if (err) return callBack(err);
    if (res.affectedRows === 0) return callBack(`Không tìm thấy bản ghi user_id=${userId}, company_id=${companyId}`);
    callBack(null, "Cập nhật thành công");
  });
};


company_followers.delete = (userId, companyId, callBack) => {
  const sqlString = "DELETE FROM company_followers WHERE user_id = ? AND company_id = ?";
  db.query(sqlString, [userId, companyId], (err, res) => {
    if (err) return callBack(err);
    if (res.affectedRows === 0) return callBack(`Không tìm thấy bản ghi user_id=${userId}, company_id=${companyId}`);
    callBack(null, "Xóa thành công");
  });
};


module.exports = company_followers;
