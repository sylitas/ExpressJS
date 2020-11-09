var connection = require('../database/database.js');

module.exports.requiredAuth = function(req,res,next){
    if(!req.signedCookies.userId){
        res.redirect('/');
        return;
    }
    var select = "SELECT `cookie` FROM `login` WHERE cookie = ?";
    connection.query(select,[
        req.signedCookies.userId
    ],function(err,rs){
        if(err)throw err;
        if(rs.length > 0){
            next();
        }else{
            res.redirect('/');
            return;
        }
    });
};

module.exports.requiredAdmin = function(req,res,next){
    if(req.signedCookies.admin == "admin"){
        next();
    }else{
        res.redirect('/');
        return;
    }
};
