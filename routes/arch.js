var express = require('express');
var router = express.Router();
const archController = require('../controllers/archController');

/* GET users listing. */
router.get('/:emp',  archController.run );

module.exports = router;
