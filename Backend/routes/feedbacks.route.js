
var express = require('express');
var router = express.Router();
const feedbackscontroller = require("../controllers/feedbacks.controller");

router.get('/', feedbackscontroller.getAll);
router.get('/:id', feedbackscontroller.getById);
router.post('/', feedbackscontroller.insert);
router.put('/:id', feedbackscontroller.update);
router.delete('/:id', feedbackscontroller.delete);

module.exports = router;
