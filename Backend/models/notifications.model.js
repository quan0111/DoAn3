const db = require("../common/db");

const Notification = function (notification) {
  this.user_id = notification.user_id;
  this.type = notification.type;
  this.title = notification.title;
  this.message = notification.message;
  this.language_code = notification.language_code || 'vi';
  this.related_entity_type = notification.related_entity_type || 'none';
  this.related_entity_id = notification.related_entity_id;
  this.action_url = notification.action_url;
  this.priority = notification.priority || 'medium';
  this.status = notification.status || 'sent';
  this.sender_id = notification.sender_id;
  this.read_at = notification.read_at;
  this.scheduled_at = notification.scheduled_at;
  this.target_group = notification.target_group;
  this.update_at = notification.update_at
  this.delivery_channels = notification.delivery_channels
  this.expires_at = notification.expires_at;
};

// Lấy danh sách user_id theo nhóm
 Notification.getUserIdsByGroup = (group, callback) => {
  let sql = "";
  switch (group) {
    case "jobseekers":
      sql = "SELECT user_id FROM jobseekers";
      break;
    case "companies":
      sql = "SELECT user_id FROM companies";
      break;
    case "all_users":
      sql = "SELECT user_id FROM users";
      break;
    default:
      return callback(new Error("Nhóm người dùng không hợp lệ"));
  }

  db.query(sql, (err, results) => {
    if (err) return callback(err);
    const userIds = results.map((row) => row.user_id);
    callback(null, userIds);
  });
}

// Gửi thông báo đến cá nhân hoặc nhóm
 Notification.sendNotification=(data, callback) => {
  const {
    type,
    title,
    message,
    language_code = "vi",
    related_entity_type = "none",
    related_entity_id = null,
    action_url = null,
    priority = "medium",
    sender_id = null,
    target_group = null,
    user_ids = [], // mảng user cụ thể
  } = data;

  // Lấy danh sách người dùng mục tiêu
  const resolveRecipients = (cb) => {
    if (user_ids && user_ids.length > 0) return cb(null, user_ids);
    if (target_group) return getUserIdsByGroup(target_group, cb);
    return cb(new Error("Phải cung cấp target_group hoặc user_ids"));
  };

  resolveRecipients((err, recipients) => {
    if (err) return callback(err);

    const sql = "INSERT INTO notifications SET ?";
    const now = new Date();

    recipients.forEach((user_id) => {
      const notiData = {
        user_id,
        type,
        title,
        message,
        language_code,
        related_entity_type,
        related_entity_id,
        action_url,
        priority,
        status: "sent",
        sender_id,
        created_at: now,
        updated_at: now,
      };

      db.query(sql, notiData, (err) => {
        if (err) console.error("❌ Gửi thông báo lỗi:", err);
      });
    });

    callback(null, `✅ Gửi thông báo thành công đến ${recipients.length} người dùng.`);
  });
}

// Gửi hoặc đặt lịch gửi thông báo cho nhóm người dùng
 Notification.scheduleNotification = (data, callback) =>{
  const {
    scheduled_at,
    type,
    title,
    message,
    language_code = "vi",
    related_entity_type = "none",
    related_entity_id = null,
    action_url = null,
    priority = "medium",
    sender_id = null,
    target_group = null,
    user_ids = [],
  } = data;

  if (!scheduled_at) return callback(new Error("Thiếu thời gian hẹn lịch gửi"));

  const resolveRecipients = (cb) => {
    if (user_ids && user_ids.length > 0) return cb(null, user_ids);
    if (target_group) return getUserIdsByGroup(target_group, cb);
    return cb(new Error("Phải cung cấp target_group hoặc user_ids"));
  };

  resolveRecipients((err, recipients) => {
    if (err) return callback(err);

    const sql = "INSERT INTO notifications SET ?";
    const now = new Date();

    recipients.forEach((user_id) => {
      const notiData = {
        user_id,
        type,
        title,
        message,
        language_code,
        related_entity_type,
        related_entity_id,
        action_url,
        priority,
        status: "scheduled",
        sender_id,
        created_at: now,
        updated_at: now,
        scheduled_at,
      };

      db.query(sql, notiData, (err) => {
        if (err) console.error("❌ Lỗi khi hẹn lịch:", err);
      });
    });

    callback(null, `📆 Đã hẹn lịch gửi thông báo đến ${recipients.length} người dùng lúc ${scheduled_at}`);
  });
}

// Get notification by ID
Notification.getById = (id, callback) => {
  const sqlString = `SELECT * FROM notifications WHERE notification_id = ?`;
  db.query(sqlString, [id], (err, result) => {
    if (err) return callback(err);
    callback(null, result[0]);
  });
};

// Get all notifications
Notification.getAll = (callback) => {
  const sqlString = `
    SELECT n.*, 
           u.full_name AS user_name, 
           s.full_name AS sender_name
    FROM notifications n
    LEFT JOIN users u ON n.user_id = u.user_id
    LEFT JOIN users s ON n.sender_id = s.user_id
    ORDER BY n.created_at DESC
  `;
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

// Insert notification
Notification.insert = (notification, callback) => {
  const sqlString = `INSERT INTO notifications SET ?`;
  db.query(sqlString, notification, (err, res) => {
    if (err) return callback(err);
    callback(null, { id: res.insertId, ...notification });
  });
};

// Update notification
Notification.update = (notification, id, callback) => {
  const sqlString = `UPDATE notifications SET ? WHERE notification_id = ?`;
  db.query(sqlString, [notification, id], (err, res) => {
    if (err) return callback(err);
    callback(null, `Cập nhật notification có ID = ${id} thành công`);
  });
};

// Delete notification
Notification.delete = (id, callback) => {
  const sqlString = `DELETE FROM notifications WHERE notification_id = ?`;
  db.query(sqlString, [id], (err, res) => {
    if (err) return callback(err);
    callback(null, `Xóa notification có ID = ${id} thành công`);
  });
};

module.exports = Notification;
