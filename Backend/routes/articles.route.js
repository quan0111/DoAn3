
var express = require('express');
var router = express.Router();
const articlescontroller = require("../controllers/articles.controller");

router.get('/', articlescontroller.getAll);
router.get('/:id', articlescontroller.getById);
router.post('/', articlescontroller.insert);
router.put('/:id', articlescontroller.update);
router.delete('/:id', articlescontroller.delete);

module.exports = router;
