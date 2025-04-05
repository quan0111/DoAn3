
var express = require('express');
var router = express.Router();
const resumescontroller = require("../controllers/resumes.controller");

router.get('/', resumescontroller.getAll);
router.get('/:id', resumescontroller.getById);
router.post('/', resumescontroller.insert);
router.put('/:id', resumescontroller.update);
router.delete('/:id', resumescontroller.delete);

module.exports = router;
