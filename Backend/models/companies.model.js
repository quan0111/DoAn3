
const db = require("../common/db");

const companies = (companies) => {
  this.company_id = companies.company_id;
  this.user_id = companies.user_id;
  this.company_name = companies.company_name;
  this.description = companies.description;
  this.logo_url = companies.logo_url;
  this.website = companies.website;
  this.location = companies.location;
  this.company_size = companies.company_size;
  this.industry = companies.industry;
  this.verified = companies.verified;
  this.created_at = companies.created_at;
  this.updated_at = companies.updated_at;
};

companies.getById = (id, callback) => {
  const sqlString = "SELECT * FROM companies WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

companies.getAll = (callback) => {
  const sqlString = "SELECT * FROM companies ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

companies.insert = (companies, callBack) => {
  const sqlString = "INSERT INTO companies SET ?";
  db.query(sqlString, companies, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...companies });
  });
};

companies.update = (companies, id, callBack) => {
  const sqlString = "UPDATE companies SET ? WHERE id = ?";
  db.query(sqlString, [companies, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật companies có id = " + id + " thành công");
  });
};

companies.delete = (id, callBack) => {
  db.query(`DELETE FROM companies WHERE id = ?`, id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa companies có id = " + id + " thành công");
  });
};

module.exports = companies;
