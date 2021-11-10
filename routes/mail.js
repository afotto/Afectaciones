var express = require('express');
var router = express.Router();
const mailSend = require('../controllers/mailSend');

/* GET users listing. */
router.get('/:emp',  mailSend.run );
// router.get('/:emp',  mailSend.readEnterprise );

module.exports = router;
