
var express = require('express');
var router = express.Router();
const paymentscontroller = require("../controllers/payments.controller");

router.get('/', paymentscontroller.getAll);
router.get('/:id', paymentscontroller.getById);
router.post('/', paymentscontroller.insert);
router.put('/:id', paymentscontroller.update);
router.delete('/:id', paymentscontroller.delete);

module.exports = router;
