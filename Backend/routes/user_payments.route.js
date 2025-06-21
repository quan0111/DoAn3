const express = require('express');
const router = express.Router();
const userPaymentsController = require("../controllers/user_payments.controller");

router.get('/', userPaymentsController.getAll);
router.get('/:id', userPaymentsController.getById);

// ✅ Route này sẽ lấy từ req.params
router.get('/:user_id/status/:status', userPaymentsController.getByUserIdAndStatus);
router.get('/user/:user_id',userPaymentsController.getByUserId)
router.get('/status/:status', userPaymentsController.getByStatus);

router.post('/', userPaymentsController.insert);
router.put('/:id', userPaymentsController.update);
router.delete('/:id', userPaymentsController.delete);

module.exports = router;
