const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '01112004',
  database: 'doan3'
});

connection.connect((err) => {
  if (err) {
    console.error('Kết nối thất bại: ' + err.stack);
    return;
  }
  console.log('Kết nối thành công với ID: ' + connection.threadId);
});

module.exports = connection;
