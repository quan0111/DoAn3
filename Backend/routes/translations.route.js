
var express = require('express');
var router = express.Router();
const translationscontroller = require("../controllers/translations.controller");

router.get('/', translationscontroller.getAll);
router.get('/:id', translationscontroller.getById);
router.post('/', translationscontroller.insert);
router.put('/:id', translationscontroller.update);
router.delete('/:id', translationscontroller.delete);

module.exports = router;
