//require
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
// var session = require('express-session');
// var path = require('path');

//router require
var loginRoute = require('../routers/login.route.js');
var registerRoute = require('../routers/register.route.js');
var dashboardRoute = require('../routers/dashboard.route.js');
var adminRoute = require('../routers/adminRoute.js');
var middlewares = require('../middlewares/auth.middleware.js');


var app = express();
var port = 1206;
//public
app.use(express.static('public'));
//config req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//config cookie parser
app.use(cookieParser('4Zc5wQs9nX'));
//---------------------------------start------------------------------------
app.use('/',loginRoute);
app.use('/register',registerRoute);
app.use('/dashboard',middlewares.requiredAuth,dashboardRoute);
app.use('/admin/dashboard',middlewares.requiredAdmin,adminRoute);

app.get('/logout',function(req,res){
    res.clearCookie('userId');
    res.clearCookie('admin');
    res.redirect('/');
});

app.listen(port,function(){
    console.log('Yeahhhhh!!?!, im alive again at post '+ port);
});