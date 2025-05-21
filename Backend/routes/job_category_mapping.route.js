
var express = require('express');
var router = express.Router();
const job_category_mappingcontroller = require("../controllers/job_category_mapping.controller");

router.get('/', job_category_mappingcontroller.getAll);
router.get('/jobs/by-category/:id', job_category_mappingcontroller.getJobsByCategoryId);
router.get('/categories/by-job/:id', job_category_mappingcontroller.getCategoriesByJobId);
router.get('/count/by-category', job_category_mappingcontroller.countJobsByCategory);
router.post('/', job_category_mappingcontroller.insert);
router.put('/:id', job_category_mappingcontroller.update);
router.delete('/:id', job_category_mappingcontroller.delete);

module.exports = router;
