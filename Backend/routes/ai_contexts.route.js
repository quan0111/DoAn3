
var express = require('express');
var router = express.Router();
const ai_contextscontroller = require("../controllers/ai_contexts.controller");

router.get('/', ai_contextscontroller.getAll);
router.get('/:id', ai_contextscontroller.getById);
router.post('/', ai_contextscontroller.insert);
router.put('/:id', ai_contextscontroller.update);
router.delete('/:id', ai_contextscontroller.delete);

module.exports = router;
