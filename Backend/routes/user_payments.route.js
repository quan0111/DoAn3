
var express = require('express');
var router = express.Router();
const user_paymentscontroller = require("../controllers/user_payments.controller");

router.get('/', user_paymentscontroller.getAll);
router.get('/:id', user_paymentscontroller.getById);
router.post('/', user_paymentscontroller.insert);
router.put('/:id', user_paymentscontroller.update);
router.delete('/:id', user_paymentscontroller.delete);

module.exports = router;
