
var express = require('express');
var router = express.Router();
const payment_servicescontroller = require("../controllers/payment_services.controller");

router.get('/', payment_servicescontroller.getAll);
router.get('/:id', payment_servicescontroller.getById);
router.post('/', payment_servicescontroller.insert);
router.put('/:id', payment_servicescontroller.update);
router.delete('/:id', payment_servicescontroller.delete);

module.exports = router;
