
var express = require('express');
var router = express.Router();
const job_skillscontroller = require("../controllers/job_skills.controller");

router.get('/', job_skillscontroller.getAll);
router.get('/:id', job_skillscontroller.getById);
router.post('/', job_skillscontroller.insert);
router.put('/:id', job_skillscontroller.update);
router.delete('/:id', job_skillscontroller.delete);

module.exports = router;
