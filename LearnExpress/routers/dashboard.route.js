var express = require('express');
var controller = require('../controllers/dashboard.controller.js');
var router = express.Router();

router.get('/',controller.getDashboard);
router.post('/',controller.postDashboard);

router.get('/profile',controller.getProfile);
router.post('/profile',controller.postProfile);

router.post('/update',controller.postAjax);

module.exports = router;