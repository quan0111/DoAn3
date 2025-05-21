
var express = require('express');
var router = express.Router();
const cv_template_ratingscontroller = require("../controllers/cv_template_ratings.controller");

router.get('/', cv_template_ratingscontroller.getAll);
router.get('/:id', cv_template_ratingscontroller.getById);
router.post('/', cv_template_ratingscontroller.insert);
router.put('/:id', cv_template_ratingscontroller.update);
router.delete('/:id', cv_template_ratingscontroller.delete);

module.exports = router;
