var express = require('express');
var router = express.Router();
const jobscontroller = require("../controllers/jobs.controller");

router.get('/', jobscontroller.getAll);
router.get('/:id', jobscontroller.getById);
router.get("/by-company/:companyId", jobscontroller.getJobsByCompanyId);

router.post('/', jobscontroller.insert);
router.put('/:id', jobscontroller.update);
router.patch('/:id', jobscontroller.patchStatus); // Added patch route
router.delete('/:id', jobscontroller.delete);
router.get("/by-category/:categoryId", jobscontroller.getJobsByCategory);

module.exports = router;