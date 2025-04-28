
var express = require('express');
var router = express.Router();
const eventscontroller = require("../controllers/events.controller");

router.get('/', eventscontroller.getAll);
router.get('/:id', eventscontroller.getById);
router.post('/', eventscontroller.insert);
router.put('/:id', eventscontroller.update);
router.delete('/:id', eventscontroller.delete);

module.exports = router;
