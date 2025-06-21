const express = require('express');
const router = express.Router();
const jobseekersController = require("../controllers/jobseekers.controller");

router.get('/', jobseekersController.getAll);
router.get('/:id', jobseekersController.getById);
router.post('/', jobseekersController.insert);
router.put('/:id', jobseekersController.update);
router.delete('/:id', jobseekersController.delete);

module.exports = router;
