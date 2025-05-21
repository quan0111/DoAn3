
var express = require('express');
var router = express.Router();
const cv_template_industriescontroller = require("../controllers/cv_template_industries.controller");

router.get('/', cv_template_industriescontroller.getAll);
router.get('/:id', cv_template_industriescontroller.getById);
router.post('/', cv_template_industriescontroller.insert);
router.put('/:id', cv_template_industriescontroller.update);
router.delete('/:id', cv_template_industriescontroller.delete);

module.exports = router;
