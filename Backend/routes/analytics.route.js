const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analytics.controller");

// Các route có sẵn
router.get("/", analyticsController.getAll);
router.get("/:id", analyticsController.getById);
router.post("/", analyticsController.insert);
router.put("/:id", analyticsController.update);
router.delete("/:id", analyticsController.delete);

// ✅ Route mới để lọc theo entity_type và metric_type
router.get("/filter/details", analyticsController.getAnalyticsWithDetails);

module.exports = router;
