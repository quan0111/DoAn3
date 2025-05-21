
var express = require('express');
var router = express.Router();
const cv_template_categoriescontroller = require("../controllers/cv_template_categories.controller");

router.get('/', cv_template_categoriescontroller.getAll);
router.get('/:id', cv_template_categoriescontroller.getById);
router.post('/', cv_template_categoriescontroller.insert);
router.put('/:id', cv_template_categoriescontroller.update);
router.delete('/:id', cv_template_categoriescontroller.delete);

module.exports = router;
