var express = require('express');
var controller = require('../controllers/auth.controller.js');
var router = express.Router();

router.get('/',controller.getLogin);
router.post('/',controller.postLogin);

module.exports = router;