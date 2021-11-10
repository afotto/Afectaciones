var express = require('express');
var router = express.Router();
const siisaController = require('../controllers/siisaController');

/* GET users listing. */
router.get('/',  siisaController.list );

module.exports = router;
