const db = require("../common/db");

const jobs = (jobs) => {
  this.job_id = jobs.job_id;
  this.company_id = jobs.company_id;
  this.title = jobs.title;
  this.description = jobs.description;
  this.requirements = jobs.requirements;
  this.benefits = jobs.benefits;
  this.salary_min = jobs.salary_min;
  this.salary_max = jobs.salary_max;
  this.location = jobs.location;
  this.job_level = jobs.job_level;
  this.job_type = jobs.job_type;
  this.deadline = jobs.deadline;
  this.status = jobs.status;
  this.priority_score = jobs.priority_score;
  this.auto_expire = jobs.auto_expire;
  this.view_count = jobs.view_count;
  this.application_count = jobs.application_count;
  this.created_at = jobs.created_at;
  this.updated_at = jobs.updated_at;
  this.education_level = jobs.education_level;
};

// Get all jobs with company and categories
jobs.getAll = (callback) => {
  const sql = `
    SELECT 
      j.*,
      c.company_name AS company_name,
      c.logo_url,
      GROUP_CONCAT(DISTINCT cat.name) AS categories
    FROM jobs j
    LEFT JOIN companies c ON j.company_id = c.company_id
    LEFT JOIN job_category_mapping m ON j.job_id = m.job_id
    LEFT JOIN job_categories cat ON m.category_id = cat.category_id
    GROUP BY j.job_id
  `;
  db.query(sql, (err, results) => {
    if (err) return callback(err);
    callback(results);
  });
};
jobs.getByCompanyId = (company_id, callback) => {
  const sql = `
    SELECT 
      j.*,
      GROUP_CONCAT(DISTINCT cat.name) AS categories
    FROM jobs j
    LEFT JOIN job_category_mapping m ON j.job_id = m.job_id
    LEFT JOIN job_categories cat ON m.category_id = cat.category_id
    WHERE j.company_id = ?
    GROUP BY j.job_id
  `;
  db.query(sql, [company_id], (err, results) => {
    if (err) return callback(err);
    callback(results);
  });
};

// Get job by ID with full joins
jobs.getById = (id, callback) => {
  const sql = `
    SELECT 
      j.*,
      c.company_name AS company_name,
      c.logo_url,
      c.industry,
      GROUP_CONCAT(DISTINCT cat.name) AS categories,
      COUNT(DISTINCT a.application_id) AS total_applications
    FROM jobs j
    LEFT JOIN companies c ON j.company_id = c.company_id
    LEFT JOIN job_category_mapping m ON j.job_id = m.job_id
    LEFT JOIN job_categories cat ON m.category_id = cat.category_id
    LEFT JOIN applications a ON j.job_id = a.job_id
    WHERE j.job_id = ?
    GROUP BY j.job_id
  `;
  db.query(sql, [id], (err, results) => {
    if (err) return callback(err);
    callback(results[0]);
  });
};

jobs.insert = (jobs, callBack) => {
  const sqlString = "INSERT INTO jobs SET ?";
  db.query(sqlString, jobs, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ ...jobs });
  });
};

jobs.update = (jobs, id, callBack) => {
  const sqlString = "UPDATE jobs SET ? WHERE job_id = ?";
  db.query(sqlString, [jobs, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật jobs có id = " + id + " thành công");
  });
};

jobs.getByCategoryId = (category_id, callback) => {
  const sqlString = `
    SELECT j.* FROM jobs j
    INNER JOIN job_category_mapping m ON j.job_id = m.job_id
    WHERE m.category_id = ?
  `;
  db.query(sqlString, [category_id], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

jobs.delete = (id, callBack) => {
  db.query(`DELETE FROM jobs WHERE job_id = ?`, id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa jobs có id = " + id + " thành công");
  });
};

// Patch status of a job
jobs.patchStatus = (id, status, callBack) => {
  const validStatuses = ["active", "inactive", "pending", "rejected"];
  if (!validStatuses.includes(status)) {
    return callBack(new Error("Trạng thái không hợp lệ. Chỉ chấp nhận: active, inactive, pending, rejected"));
  }

  const sqlString = "UPDATE jobs SET status = ?, updated_at = NOW() WHERE job_id = ?";
  db.query(sqlString, [status, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    if (res.affectedRows === 0) {
      callBack(new Error("Không tìm thấy công việc với ID: " + id));
      return;
    }
    callBack(null, "Cập nhật trạng thái công việc có id = " + id + " thành công");
  });
};

module.exports = jobs;