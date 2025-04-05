
var express = require('express');
var router = express.Router();
const jobseekerscontroller = require("../controllers/jobseekers.controller");

router.get('/', jobseekerscontroller.getAll);
router.get('/:id', jobseekerscontroller.getById);
router.post('/', jobseekerscontroller.insert);
router.put('/:id', jobseekerscontroller.update);
router.delete('/:id', jobseekerscontroller.delete);

module.exports = router;
