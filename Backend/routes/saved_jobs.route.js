
var express = require('express');
var router = express.Router();
const saved_jobscontroller = require("../controllers/saved_jobs.controller");

router.get('/', saved_jobscontroller.getAll);
router.get('/:id', saved_jobscontroller.getById);
router.post('/', saved_jobscontroller.insert);
router.put('/:id', saved_jobscontroller.update);
router.delete('/:id', saved_jobscontroller.delete);

module.exports = router;
