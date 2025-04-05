
var express = require('express');
var router = express.Router();
const job_category_mappingcontroller = require("../controllers/job_category_mapping.controller");

router.get('/', job_category_mappingcontroller.getAll);
router.get('/:id', job_category_mappingcontroller.getById);
router.post('/', job_category_mappingcontroller.insert);
router.put('/:id', job_category_mappingcontroller.update);
router.delete('/:id', job_category_mappingcontroller.delete);

module.exports = router;
