
var express = require('express');
var router = express.Router();
const ai_intentscontroller = require("../controllers/ai_intents.controller");

router.get('/', ai_intentscontroller.getAll);
router.get('/:id', ai_intentscontroller.getById);
router.post('/', ai_intentscontroller.insert);
router.put('/:id', ai_intentscontroller.update);
router.delete('/:id', ai_intentscontroller.delete);

module.exports = router;
