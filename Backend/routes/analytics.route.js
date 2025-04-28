
var express = require('express');
var router = express.Router();
const analyticscontroller = require("../controllers/analytics.controller");

router.get('/', analyticscontroller.getAll);
router.get('/:id', analyticscontroller.getById);
router.post('/', analyticscontroller.insert);
router.put('/:id', analyticscontroller.update);
router.delete('/:id', analyticscontroller.delete);

module.exports = router;
