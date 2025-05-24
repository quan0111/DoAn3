const db = require("../common/db");

const analytics = function (analytics) {
  this.analytic_id = analytics.analytic_id;
  this.entity_type = analytics.entity_type;
  this.entity_id = analytics.entity_id;
  this.metric_type = analytics.metric_type;
  this.value = analytics.value;
  this.timestamp = analytics.timestamp;
};

// 1. Get by ID
analytics.getById = (id, callback) => {
  const sqlString = "SELECT * FROM analytics WHERE analytic_id = ?";
  db.query(sqlString, [id], (err, result) => {
    if (err) return callback(err);
    callback(null, result[0]);
  });
};

// 2. Get all
analytics.getAll = (callback) => {
  const sqlString = "SELECT * FROM analytics";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

// 3. Insert
analytics.insert = (analyticsData, callback) => {
  const sqlString = "INSERT INTO analytics SET ?";
  db.query(sqlString, analyticsData, (err, res) => {
    if (err) return callback(err);
    callback(null, { analytic_id: res.insertId, ...analyticsData });
  });
};

// 4. Update
analytics.update = (analyticsData, id, callback) => {
  const sqlString = "UPDATE analytics SET ? WHERE analytic_id = ?";
  db.query(sqlString, [analyticsData, id], (err, res) => {
    if (err) return callback(err);
    callback(null, `Cập nhật analytics có id = ${id} thành công`);
  });
};

// 5. Delete
analytics.delete = (id, callback) => {
  db.query("DELETE FROM analytics WHERE analytic_id = ?", [id], (err, res) => {
    if (err) return callback(err);
    callback(null, `Xóa analytics có id = ${id} thành công`);
  });
};

// 6. Get analytics with JOIN
analytics.getAnalyticsWithDetails = (entityType, metricType, callback) => {
  let joinQuery = "";
  let params = [];

  switch (entityType) {
    case "job":
      joinQuery = `
        SELECT a.*, j.title AS entity_title
        FROM analytics a
        JOIN jobs j ON a.entity_id = j.job_id
        WHERE a.entity_type = 'job'
      `;
      break;
    case "article":
      joinQuery = `
        SELECT a.*, ar.title AS entity_title
        FROM analytics a
        JOIN articles ar ON a.entity_id = ar.article_id
        WHERE a.entity_type = 'article'
      `;
      break;
    case "ad":
      joinQuery = `
        SELECT a.*, ad.title AS entity_title
        FROM analytics a
        JOIN advertisements ad ON a.entity_id = ad.ad_id
        WHERE a.entity_type = 'ad'
      `;
      break;
    case "event":
      joinQuery = `
        SELECT a.*, e.title AS entity_title
        FROM analytics a
        JOIN events e ON a.entity_id = e.event_id
        WHERE a.entity_type = 'event'
      `;
      break;
    default:
      return callback(new Error("Loại entity_type không hợp lệ"));
  }

  // Nếu có metric_type thì thêm điều kiện lọc
  if (metricType) {
    joinQuery += ` AND a.metric_type = ?`;
    params.push(metricType);
  }

  db.query(joinQuery, params, (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};


module.exports = analytics;
