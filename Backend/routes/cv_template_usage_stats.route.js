
var express = require('express');
var router = express.Router();
const cv_template_usage_statscontroller = require("../controllers/cv_template_usage_stats.controller");

router.get('/', cv_template_usage_statscontroller.getAll);
router.get('/:id', cv_template_usage_statscontroller.getById);
router.post('/', cv_template_usage_statscontroller.insert);
router.put('/:id', cv_template_usage_statscontroller.update);
router.delete('/:id', cv_template_usage_statscontroller.delete);

module.exports = router;
