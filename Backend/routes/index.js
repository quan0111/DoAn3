const express = require('express');
const router = express.Router();

// Trang chủ
router.get('/', (req, res) => {
  res.send('Chào mừng bạn đến với trang chủ!');
});

module.exports = router;
