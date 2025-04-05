
var express = require('express');
var router = express.Router();
const company_followerscontroller = require("../controllers/company_followers.controller");

router.get('/', company_followerscontroller.getAll);
router.get('/:id', company_followerscontroller.getById);
router.post('/', company_followerscontroller.insert);
router.put('/:id', company_followerscontroller.update);
router.delete('/:id', company_followerscontroller.delete);

module.exports = router;
