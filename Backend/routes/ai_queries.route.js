
var express = require('express');
var router = express.Router();
const ai_queriescontroller = require("../controllers/ai_queries.controller");

router.get('/', ai_queriescontroller.getAll);
router.get('/:id', ai_queriescontroller.getById);
router.post('/', ai_queriescontroller.insert);
router.put('/:id', ai_queriescontroller.update);
router.delete('/:id', ai_queriescontroller.delete);

module.exports = router;
