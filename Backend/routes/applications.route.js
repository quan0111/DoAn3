const express = require("express");
const router = express.Router();
const controller = require("../controllers/applications.controller");
const upload = require("../config/pdfupload"); // multer cấu hình cho file PDF

router.get("/", controller.getAll);
router.get("/check-exists", controller.checkExists);
router.get("/:id", controller.getById);
router.get("/company/:companyId/applicants", controller.getApplicantsByCompany);
router.get("/user/:userId", controller.getByUserId);
router.get("/job/:jobId", controller.getByJobId);
router.get("/download/:file", controller.downloadCV);

router.post("/", upload.single("cv_file"), controller.insert);
router.put("/:id", upload.single("cv_file"), controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
