
const db = require("../common/db");

const analytics = (analytics) => {
  this.analytic_id = analytics.analytic_id;
  this.entity_type = analytics.entity_type;
  this.entity_id = analytics.entity_id;
  this.metric_type = analytics.metric_type;
  this.value = analytics.value;
  this.timestamp = analytics.timestamp;
};

analytics.getById = (id, callback) => {
  const sqlString = "SELECT * FROM analytics WHERE analytic_id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

analytics.getStatsByEntity = (entityType, callback) => {
  const sql = `
    SELECT entity_id, metric_type, SUM(value) AS total_value
    FROM analytics
    WHERE entity_type = ?
    GROUP BY entity_id, metric_type
    ORDER BY entity_id
  `;
  db.query(sql, [entityType], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

analytics.getAll = (callback) => {
  const sqlString = "SELECT * FROM analytics ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

analytics.insert = (analytics, callBack) => {
  const sqlString = "INSERT INTO analytics SET ?";
  db.query(sqlString, analytics, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...analytics });
  });
};

analytics.update = (analytics, id, callBack) => {
  const sqlString = "UPDATE analytics SET ? WHERE analytic_id = ?";
  db.query(sqlString, [analytics, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật analytics có id = " + id + " thành công");
  });
};

analytics.delete = (id, callBack) => {
  db.query(`DELETE FROM analytics WHERE analytic_id = ?`, id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa analytics có id = " + id + " thành công");
  });
};

module.exports = analytics;
