
var express = require('express');
var router = express.Router();
const job_categoriescontroller = require("../controllers/job_categories.controller");

router.get('/', job_categoriescontroller.getAll);
router.get('/:id', job_categoriescontroller.getById);
router.post('/', job_categoriescontroller.insert);
router.put('/:id', job_categoriescontroller.update);
router.delete('/:id', job_categoriescontroller.delete);

module.exports = router;
