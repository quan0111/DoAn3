var express = require("express");
var router = express.Router();
const userscontroller = require("../controllers/users.controller");

router.get("/", userscontroller.getAll);
router.get("/:id", userscontroller.getById);
router.post("/", userscontroller.insert);
router.put("/:id", userscontroller.update);
router.patch("/last-login/:id", userscontroller.updateLastLogin);
router.patch("/active-status/:id", userscontroller.updateActiveStatus);
router.delete("/:id", userscontroller.delete);
router.get("/email/:email", userscontroller.getByEmail);
router.post("/:id/upload-avatar", userscontroller.uploadAvatar); // Thêm route upload avatar
router.post("/:id/verify-password", userscontroller.verifyPassword); // Thêm route verify password
router.put("/:id/change-password", userscontroller.changePassword); // Thêm route change password

module.exports = router;