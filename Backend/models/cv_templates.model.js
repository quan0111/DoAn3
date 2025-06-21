
const db = require("../common/db");

const cv_templates = function (cv_templates) {
  this.template_id = cv_templates.template_id;
  this.name = cv_templates.name;
  this.description = cv_templates.description;
  this.thumbnail_url = cv_templates.thumbnail_url;
  this.html_structure = cv_templates.html_structure;
  this.css_styles = cv_templates.css_styles;
  this.category_id = cv_templates.category_id;
  this.is_premium = cv_templates.is_premium;
  this.price = cv_templates.price;
  this.popularity_score = cv_templates.popularity_score;
};

cv_templates.getById = (id, callback) => {
  const sqlString = `
    SELECT 
      t.*, 
      c.name AS category_name
    FROM cv_templates t
    LEFT JOIN cv_template_categories c ON t.category_id = c.category_id
    WHERE t.template_id = ?
    GROUP BY t.template_id
  `;
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, result[0]);
  });
};

cv_templates.getAll = (callback) => {
  const sqlString = `
    SELECT 
      t.*, 
      c.name AS category_name
    FROM cv_templates t
    LEFT JOIN cv_template_categories c ON t.category_id = c.category_id
  `;
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, result);
  });
};
cv_templates.getTopPopular = (limit = 5, callback) => {
  const sql = `
    SELECT 
      t.template_id, t.name, t.thumbnail_url, t.popularity_score, t.is_premium
    FROM cv_templates t
    ORDER BY t.popularity_score DESC
    LIMIT ?
  `;
  db.query(sql, [limit], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

cv_templates.getPublic = (callback) => {
  const sqlString = `
    SELECT 
      t.template_id, 
      t.name, 
      t.thumbnail_url, 
      t.is_premium, 
      t.category_id, 
      c.name AS category_name
    FROM cv_templates t
    LEFT JOIN cv_template_categories c ON t.category_id = c.category_id
  `;
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, result);
  });
};

cv_templates.getRelated = (id, callback) => {
  const sqlString = `
    SELECT 
      t.template_id, 
      t.name, 
      t.thumbnail_url
    FROM cv_templates t
    WHERE t.category_id = (SELECT category_id FROM cv_templates WHERE template_id = ?)
    AND t.template_id != ?
    LIMIT 3
  `;
  db.query(sqlString, [id, id], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, result);
  });
};

cv_templates.search = (params, callback) => {
  let sqlString = `
    SELECT 
      t.template_id, 
      t.name, 
      t.thumbnail_url, 
      t.is_premium, 
      t.category_id, 
      c.name AS category_name
    FROM cv_templates t
    LEFT JOIN cv_template_categories c ON t.category_id = c.category_id
    WHERE 1=1
  `;
  const queryParams = [];

  if (params.name) {
    sqlString += ` AND t.name LIKE ?`;
    queryParams.push(`%${params.name}%`);
  }
  if (params.category_id) {
    sqlString += ` AND t.category_id = ?`;
    queryParams.push(params.category_id);
  }
  if (params.is_premium !== undefined) {
    sqlString += ` AND t.is_premium = ?`;
    queryParams.push(params.is_premium);
  }

  db.query(sqlString, queryParams, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, result);
  });
};

cv_templates.insert = (cv_templates, callback) => {
  const sqlString = "INSERT INTO cv_templates SET ?";
  db.query(sqlString, [cv_templates], (err, res) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, { ...cv_templates });
  });
};

cv_templates.update = (cv_templates, id, callback) => {
  const sqlString = "UPDATE cv_templates SET ? WHERE template_id = ?";
  db.query(sqlString, [cv_templates, id], (err, res) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, "Cập nhật mẫu CV có id = " + id + " thành công");
  });
};

cv_templates.delete = (id, callback) => {
  db.query(`DELETE FROM cv_templates WHERE template_id = ?`, id, (err, res) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, "Xóa mẫu CV có id = " + id + " thành công");
  });
};

module.exports = cv_templates;
