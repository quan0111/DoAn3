
var express = require('express');
var router = express.Router();
const userscontroller = require("../controllers/users.controller");

router.get('/', userscontroller.getAll);
router.get('/:id', userscontroller.getById);
router.post('/', userscontroller.insert);
router.put('/:id', userscontroller.update);
router.delete('/:id', userscontroller.delete);
// ✅ Cập nhật thời gian đăng nhập cuối cùng

// ✅ Vô hiệu hóa user (deactivate)
router.patch('/:id/deactivate', userscontroller.deactivateUser);

// ✅ Đổi mật khẩu
router.patch('/:id/update-password', userscontroller.changePassword);
module.exports = router;
