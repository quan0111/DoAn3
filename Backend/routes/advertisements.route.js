
var express = require('express');
var router = express.Router();
const advertisementscontroller = require("../controllers/advertisements.controller");

router.get('/', advertisementscontroller.getAll);
router.get('/:id', advertisementscontroller.getById);
router.post('/', advertisementscontroller.insert);
router.put('/:id', advertisementscontroller.update);
router.delete('/:id', advertisementscontroller.delete);

module.exports = router;
