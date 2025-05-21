
var express = require('express');
var router = express.Router();
const userscontroller = require("../controllers/users.controller");

router.get('/', userscontroller.getAll);
router.get('/:id', userscontroller.getById);
router.post('/', userscontroller.insert);
router.put('/:id', userscontroller.update);
router.delete('/:id', userscontroller.delete);

module.exports = router;
