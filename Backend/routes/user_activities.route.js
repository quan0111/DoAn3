
var express = require('express');
var router = express.Router();
const user_activitiescontroller = require("../controllers/user_activities.controller");

router.get('/', user_activitiescontroller.getAll);
router.get('/:id', user_activitiescontroller.getById);
router.post('/', user_activitiescontroller.insert);
router.put('/:id', user_activitiescontroller.update);
router.delete('/:id', user_activitiescontroller.delete);

module.exports = router;
