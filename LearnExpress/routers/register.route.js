var express = require('express');
var controller = require('../controllers/auth.controller.js');
var router = express.Router();

router.get('/',function(req,res){
    res.render('register.pug');
});

router.post('/',controller.register);

module.exports = router;