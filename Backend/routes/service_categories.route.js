
var express = require('express');
var router = express.Router();
const service_categoriescontroller = require("../controllers/service_categories.controller");

router.get('/', service_categoriescontroller.getAll);
router.get('/:id', service_categoriescontroller.getById);
router.post('/', service_categoriescontroller.insert);
router.put('/:id', service_categoriescontroller.update);
router.delete('/:id', service_categoriescontroller.delete);

module.exports = router;
