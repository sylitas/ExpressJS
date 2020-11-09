var md5 = require('md5');
var sha1 = require('sha1');
var connection = require('../database/database.js');

module.exports.getLogin = function(req,res){
    if(req.signedCookies.userId){
        var sql = "CALL PROC_SelectCookieForLogin(?)";
        connection.query(sql,[
            req.signedCookies.userId
            ],function(err,rs){
                if(err)throw err;
                rs = rs[0];
                if(rs.length > 0){
                    res.redirect('/dashboard');
                }
            });
    }else{
        res.render('index.pug');
    }
    
}

module.exports.postLogin = function(req,res){
    if(req.body.email == "admin" && req.body.pass == "admin"){
        res.cookie('admin',"admin",{
            httpOnly: true,
            signed: true,
            expires: new Date(Date.now()+1000*60*60*4)
        });
        res.redirect('/admin/dashboard');
    }else{
        var sql = "CALL PROC_SelectUserByLogin(?,?)";
        connection.query(sql,[
            req.body.email,
            sha1(md5(req.body.pass))
            ],function(err,rs){
                if(err)throw err;
                rs = rs[0];
                if(rs.length > 0){
                    res.cookie('userId',md5(rs[0].email),{
                        httpOnly: true,
                        signed: true,
                        expires: new Date(Date.now()+1000*60*60*4)
                    });
                    var update = "CALL PROC_UpdateCookieWhenLogin(?,?)";
                    connection.query(update,[
                        md5(rs[0].email),
                        rs[0].id
                    ],function(err,rs){
                        if(err) throw err;
                    });
                    res.redirect('/dashboard');
                }else{
                    res.render('index.pug',{
                        err: "Wrong Username and Password"
                    });
                }
            });
    }
    
}

module.exports.register = function(req,res){
    if(!req.body.email || !req.body.pass || !req.body.repass){
        res.render('register.pug',{
            err: "Invalid Username or Password"
        });
    }else{
        if(req.body.pass.length < 8){
            res.render('register.pug',{
                err: "Password must greater than 7 charaters"
            });
        }else{
            if(req.body.repass !== req.body.pass){
                res.render('register.pug',{
                    err: "Both password are not the same"
                });
            }else{
                var select = "SELECT * FROM `login` WHERE email = ?";
                connection.query(select,[
                    req.body.email
                    ],function(err,rs){
                        if(err)throw err;
                        if(rs.length > 0){
                            res.render('register.pug',{
                                err: 'Email existed'
                            });
                        }else{
                            var insert = "INSERT INTO `login`(email,password) VALUES (?,?)";
                            connection.query(insert,[
                                req.body.email,
                                sha1(md5(req.body.pass))
                                ],function(err,rs){
                                    if(err)throw err;
                                    res.redirect('/');
                                });
                        }
                    });
            }
        }
    }   
}

