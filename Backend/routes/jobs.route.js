
var express = require('express');
var router = express.Router();
const jobscontroller = require("../controllers/jobs.controller");

router.get('/', jobscontroller.getAll);
router.get('/:id', jobscontroller.getById);
router.post('/', jobscontroller.insert);
router.put('/:id', jobscontroller.update);
router.delete('/:id', jobscontroller.delete);
router.get("/by-category/:categoryId", jobscontroller.getJobsByCategory);
module.exports = router;
