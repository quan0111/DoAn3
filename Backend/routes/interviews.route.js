
var express = require('express');
var router = express.Router();
const interviewscontroller = require("../controllers/interviews.controller");

router.get('/', interviewscontroller.getAll);
router.get('/:id', interviewscontroller.getById);
router.get('/check-exists/:application_id', interviewscontroller.checkExistByApplicationId);
router.post('/', interviewscontroller.insert);
router.put('/:id', interviewscontroller.update);
router.delete('/:id', interviewscontroller.delete);

module.exports = router;
