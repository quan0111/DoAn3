
var express = require('express');
var router = express.Router();
const user_cv_templatescontroller = require("../controllers/user_cv_templates.controller");

router.get('/', user_cv_templatescontroller.getAll);
router.get('/:id', user_cv_templatescontroller.getById);
router.post('/', user_cv_templatescontroller.insert);
router.put('/:id', user_cv_templatescontroller.update);
router.delete('/:id', user_cv_templatescontroller.delete);

module.exports = router;
