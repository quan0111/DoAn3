
var express = require('express');
var router = express.Router();
const article_categoriescontroller = require("../controllers/article_categories.controller");

router.get('/', article_categoriescontroller.getAll);
router.get('/:id', article_categoriescontroller.getById);
router.post('/', article_categoriescontroller.insert);
router.put('/:id', article_categoriescontroller.update);
router.delete('/:id', article_categoriescontroller.delete);

module.exports = router;
