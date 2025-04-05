
var express = require('express');
var router = express.Router();
const applicationscontroller = require("../controllers/applications.controller");

router.get('/', applicationscontroller.getAll);
router.get('/:id', applicationscontroller.getById);
router.post('/', applicationscontroller.insert);
router.put('/:id', applicationscontroller.update);
router.delete('/:id', applicationscontroller.delete);

module.exports = router;
