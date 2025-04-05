
var express = require('express');
var router = express.Router();
const companiescontroller = require("../controllers/companies.controller");

router.get('/', companiescontroller.getAll);
router.get('/:id', companiescontroller.getById);
router.post('/', companiescontroller.insert);
router.put('/:id', companiescontroller.update);
router.delete('/:id', companiescontroller.delete);

module.exports = router;
