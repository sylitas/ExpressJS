var express = require('express');
var controller = require('../controllers/admin.controller.js');
var router = express.Router();

router.get('/',controller.getDashboard);
router.post('/delete',controller.postDeleteByAjax);
router.post('/postData',controller.postDataByAjax);
router.post('/restore',controller.postRestoreByAjax);
router.post('/delAll',controller.postDeleteAllByAjax);
router.post('/resAll',controller.postRestoreAllByAjax);
router.post('/updateData',controller.postUpdateByAjax);

module.exports = router;