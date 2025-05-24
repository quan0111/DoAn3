const db = require("../common/db");

const job_category_mapping = (job_category_mapping) => {
  this.job_id = job_category_mapping.job_id;
  this.category_id = job_category_mapping.category_id;
};

job_category_mapping.getById = (id, callback) => {
  const sqlString = "SELECT * FROM job_category_mapping WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

job_category_mapping.getAll = (callback) => {
  const sqlString = "SELECT * FROM job_category_mapping";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Lấy tất cả công việc thuộc một danh mục cụ thể



// Đếm số lượng công việc trong từng danh mục
job_category_mapping.countJobsByCategory = (callback) => {
  const sqlString = `
    SELECT c.category_id, c.name, COUNT(*) AS job_count
    FROM job_categories c
    JOIN job_category_mapping m ON c.category_id = m.category_id
    GROUP BY c.category_id, c.name
    ORDER BY job_count DESC
  `;
  db.query(sqlString, (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

// Lấy tất cả công việc và danh mục liên quan gộp lại
job_category_mapping.getJobsWithCategories = (callback) => {
  const sqlString = `
    SELECT 
      j.job_id,
      j.title,
      GROUP_CONCAT(c.name SEPARATOR ', ') AS categories
    FROM jobs j
    JOIN job_category_mapping m ON j.job_id = m.job_id
    JOIN job_categories c ON m.category_id = c.category_id
    GROUP BY j.job_id
  `;
  db.query(sqlString, (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

// Lấy top 5 danh mục có nhiều việc làm nhất
job_category_mapping.getTopCategories = (callback) => {
  const sqlString = `
    SELECT c.name, COUNT(*) AS job_count
    FROM job_categories c
    JOIN job_category_mapping m ON c.category_id = m.category_id
    GROUP BY c.category_id
    ORDER BY job_count DESC
    LIMIT 5
  `;
  db.query(sqlString, (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

job_category_mapping.insert = (data, callback) => {
  const sqlString = "INSERT INTO job_category_mapping SET ?";
  db.query(sqlString, data, (err, res) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, { id: res.insertId, ...data });
  });
};

job_category_mapping.update = (data, id, callback) => {
  const sqlString = "UPDATE job_category_mapping SET ? WHERE id = ?";
  db.query(sqlString, [data, id], (err, res) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, `Cập nhật job_category_mapping có id = ${id} thành công`);
  });
};

job_category_mapping.delete = (id, callback) => {
  db.query("DELETE FROM job_category_mapping WHERE id = ?", id, (err, res) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, `Xóa job_category_mapping có id = ${id} thành công`);
  });
};

module.exports = job_category_mapping;
