
var express = require('express');
var router = express.Router();
const notificationscontroller = require("../controllers/notifications.controller");

router.get("/", notificationscontroller.getAll);
router.get("/:id", notificationscontroller.getById);
router.post("/", notificationscontroller.insert);
router.put("/:id", notificationscontroller.update);
router.delete("/:id", notificationscontroller.delete);

// Gửi thông báo đến nhóm hoặc cá nhân
router.post("/send", notificationscontroller.sendNotification);

// Hẹn lịch gửi thông báo
router.post("/schedule", notificationscontroller.scheduleNotification);

module.exports = router;
