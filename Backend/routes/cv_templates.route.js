
var express = require('express');
var router = express.Router();
const cv_templatescontroller = require("../controllers/cv_templates.controller");

router.get('/', cv_templatescontroller.getAll);
router.get('/:id', cv_templatescontroller.getById);
router.post('/', cv_templatescontroller.insert);
router.put('/:id', cv_templatescontroller.update);
router.delete('/:id', cv_templatescontroller.delete);

module.exports = router;
