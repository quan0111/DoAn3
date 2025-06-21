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
  this.verified = companies.verified;
  this.created_at = companies.created_at;
  this.updated_at = companies.updated_at;
  this.industry = companies.industry;
};

// ✅ Get all companies
companies.getAll = (callback) => {
  const sqlString = `
    SELECT 
      c.*,
      COUNT(DISTINCT j.job_id) AS total_jobs,
      COUNT(a.application_id) AS total_applications
    FROM companies c
    LEFT JOIN jobs j ON j.company_id = c.company_id
    LEFT JOIN applications a ON a.job_id = j.job_id
    GROUP BY c.company_id
  `;

  db.query(sqlString, (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

// ✅ Get company by ID
companies.getById = (id, callback) => {
  const sqlString = `
    SELECT 
      c.*,
      COUNT(DISTINCT j.job_id) AS total_jobs,
      COUNT(a.application_id) AS total_applications
    FROM companies c
    LEFT JOIN jobs j ON j.company_id = c.company_id
    LEFT JOIN applications a ON a.job_id = j.job_id
    WHERE c.company_id = ?
    GROUP BY c.company_id
  `;

  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err, null);
    callback(null, result[0]); // Trả về object thay vì mảng có 1 phần tử
  });
};
companies.getByUserId = (id, callback) => {
  const sqlString = `
    SELECT 
      c.*,
      COUNT(DISTINCT j.job_id) AS total_jobs,
      COUNT(a.application_id) AS total_applications
    FROM companies c
    LEFT JOIN jobs j ON j.company_id = c.company_id
    LEFT JOIN applications a ON a.job_id = j.job_id
    WHERE c.user_id = ?
    GROUP BY c.company_id
  `;

  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err, null);
    callback(null, result[0]); // Trả về object thay vì mảng có 1 phần tử
  });
};
// ✅ Insert company
companies.insert = (companies, callback) => {
  const sqlString = "INSERT INTO companies SET ?";
  db.query(sqlString, companies, (err, res) => {
    if (err) return callback(err, null);
    callback(null, { id: res.insertId, ...companies });
  });
};

// ✅ Update company
companies.update = (companies, id, callback) => {
  const sqlString = "UPDATE companies SET ? WHERE company_id = ?";
  db.query(sqlString, [companies, id], (err, res) => {
    if (err) return callback(err, null);
    callback(null, { message: `Cập nhật company ID ${id} thành công` });
  });
};

// ✅ Delete company
companies.delete = (id, callback) => {
  const sqlString = "DELETE FROM companies WHERE company_id = ?";
  db.query(sqlString, id, (err, res) => {
    if (err) return callback(err, null);
    callback(null, { message: `Xóa company ID ${id} thành công` });
  });
};

module.exports = companies;
