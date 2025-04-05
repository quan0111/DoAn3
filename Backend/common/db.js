const mysql = require('mysql')
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '01112004',
  database: 'kfc_store'
})

module.exports = db;