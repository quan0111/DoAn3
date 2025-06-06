
const db = require("../common/db");

const events = (events) => {
  this.event_id = events.event_id;
  this.company_id = events.company_id;
  this.title = events.title;
  this.description = events.description;
  this.start_date = events.start_date;
  this.end_date = events.end_date;
  this.location = events.location;
  this.type = events.type;
  this.registration_url = events.registration_url;
  this.status = events.status;
  this.created_at = events.created_at;
  this.updated_at = events.updated_at;
};

events.getById = (id, callback) => {
  const sqlString = "SELECT * FROM events WHERE event_id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

events.getAll = (callback) => {
  const sqlString = "SELECT * FROM events ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

events.insert = (events, callBack) => {
  const sqlString = "INSERT INTO events SET ?";
  db.query(sqlString, events, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...events });
  });
};

events.update = (events, id, callBack) => {
  const sqlString = "UPDATE events SET ? WHERE event_id = ?";
  db.query(sqlString, [events, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật events có event_id = " + id + " thành công");
  });
};

events.delete = (id, callBack) => {
  db.query(`DELETE FROM events WHERE event_id = ?`, id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa events có event_id = " + id + " thành công");
  });
};

module.exports = events;
