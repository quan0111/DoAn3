const express = require("express");
const router = express.Router();
const cv_templatesController = require("../controllers/cv_templates.controller");

// Middleware để xử lý file upload
const fileUpload = require("express-fileupload");
router.use(fileUpload());

router.get("/", cv_templatesController.getAll);
router.get("/public", cv_templatesController.getPublic);
router.get("/public/:id", cv_templatesController.getById);
router.get("/public/related/:id", cv_templatesController.getRelated);
router.get("/public/search", cv_templatesController.search);
router.get("/:id", cv_templatesController.getById);

router.post("/", cv_templatesController.insert); // Xử lý file PDF
router.put("/:id", cv_templatesController.update);
router.delete("/:id", cv_templatesController.delete);

module.exports = router;