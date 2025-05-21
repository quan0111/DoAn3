
var express = require('express');
var router = express.Router();
const cv_template_componentscontroller = require("../controllers/cv_template_components.controller");

router.get('/', cv_template_componentscontroller.getAll);
router.get('/:id', cv_template_componentscontroller.getById);
router.post('/', cv_template_componentscontroller.insert);
router.put('/:id', cv_template_componentscontroller.update);
router.delete('/:id', cv_template_componentscontroller.delete);

module.exports = router;
