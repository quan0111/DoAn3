
var express = require('express');
var router = express.Router();
const article_category_mappingcontroller = require("../controllers/article_category_mapping.controller");

router.get('/', article_category_mappingcontroller.getAll);
router.get('/:id', article_category_mappingcontroller.getById);
router.post('/', article_category_mappingcontroller.insert);
router.put('/:id', article_category_mappingcontroller.update);
router.delete('/:id', article_category_mappingcontroller.delete);

module.exports = router;
