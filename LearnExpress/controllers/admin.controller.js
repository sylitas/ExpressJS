var conn = require('../database/adminDatabase.js');
var check = require('../controllers/check.js');
const con = require('../database/adminDatabase.js');


module.exports.getDashboard = function(req,res){
    res.render('admin.pug',{
        'email': "admin"
    });
};

module.exports.postDeleteByAjax = function(req,res){
    var sql = "CALL	PROC_DeleteHiddenData(?)";
    conn.query(sql,req.body.id,function(err,rs){
        if(err)throw err;
    });
};

module.exports.postRestoreByAjax = function(req,res){
    var sql = "CALL	PROC_RestoreHiddenData(?)";
    conn.query(sql,req.body.id,function(err,rs){
        if(err)throw err;
    });
};

module.exports.postDeleteAllByAjax = function(req,res){
    var sql = "CALL	PROC_DeleteAllHiddenData";
    conn.query(sql,function(err,rs){
        if(err)throw err;
    });
    res.send("done");
};

module.exports.postRestoreAllByAjax = function(req,res){
    var sql = "CALL	PROC_RestoreAllHiddenData";
    conn.query(sql,function(err,rs){
        if(err)throw err;
    });
    res.send("done");
};

module.exports.postDataByAjax = function(req,res){
    //variable
    var id,name,gender,dob,phone,job,degree,major,proDate,worDate,toc;
    var hiddenData = [];
    var hiddenDataList = [];
    //end variable
    //variable for datatable
    var draw = req.body.draw;
    var recordsTotal; 
    var recordsFiltered;
    var length = req.body.length;
    var start = req.body.start;
    var searchStr = req.body.search.value;
    //end variable for datatable
    var sql = "CALL	PROC_SelectHiddenDataFromClient";
    conn.query(sql,function(err,rs){
        if (err) throw err;
        rs = rs[0];
        recordsTotal = rs.length;
        recordsFiltered = rs.length;
        var sql = 'SELECT * FROM client WHERE `disable` = 0 AND `name` LIKE "%'+searchStr+'%" LIMIT '+length+' OFFSET '+start;
        conn.query(sql,function(err,rs){
            if(err)throw err;
            if(searchStr){
                recordsFiltered = rs.length;
            }
            if(rs.length>0){
                for(var i=0;i<rs.length;i++){
                    id = rs[i].id;
                    name = rs[i].name;
                    gender = rs[i].gender;
                    dob = rs[i].dob;
                    phone = rs[i].phone;
                    job = rs[i].jobtype;
                    degree = rs[i].degree;
                    major = rs[i].major;
                    proDate = rs[i].proDate;
                    worDate = rs[i].worDate;
                    toc = rs[i].toc;
                    var data = check.check(gender,dob,phone,job,degree,major,proDate,worDate,toc);
                    hiddenData = [
                        id,
                        name,
                        data.gender,
                        data.dob,
                        data.phone,
                        data.job,
                        data.degree,
                        data.major,
                        data.proDate,
                        data.worDate,
                        data.toc
                    ]
                    hiddenDataList.push(hiddenData);
                }
            }
            //server-client processing
            var dataSend = {
                "draw": draw,
                "recordsTotal":recordsTotal,
                "recordsFiltered":recordsFiltered,
                "data": hiddenDataList
            };
            res.json(dataSend);
        });
    });   
};

module.exports.postUpdateByAjax = function(req,res){
    var id = req.body.id;
    var name = req.body.name;
    var gender = req.body.gender;
    var phone = req.body.phone;
    var dob = req.body.dob;
    var job = req.body.job;
    var degree = req.body.degree;
    var major = req.body.major;
    var proDate = req.body.proDate;
    var worDate = req.body.worDate;
    var toc = req.body.toc;
    if(name){
        var sql = 'UPDATE client SET `name` = ? WHERE `id` = ?';
        conn.query(sql,[
            name,id
        ],function(err,rs){
            if(err)throw err;
        });
    }
    if(gender){
        var sql = 'UPDATE client SET `gender` = ? WHERE `id` = ?';
        conn.query(sql,[
            gender,id
        ],function(err,rs){
            if(err)throw err;
        });
    }
    if(phone){
        var sql = 'UPDATE client SET `phone` = ? WHERE `id` = ?';
        conn.query(sql,[
            phone,id
        ],function(err,rs){
            if(err)throw err;
        });
    }
    if(dob){
        var sql = 'UPDATE client SET `dob` = ? WHERE `id` = ?';
        conn.query(sql,[
            dob,id
        ],function(err,rs){
            if(err)throw err;
        });
    }
    if(job){
        var sql = 'UPDATE client SET `jobtype` = ? WHERE `id` = ?';
        conn.query(sql,[
            job,id
        ],function(err,rs){
            if(err)throw err;
        });
    }
    if(degree){
        var sql = 'UPDATE client SET `degree` = ? WHERE `id` = ?';
        conn.query(sql,[
            degree,id
        ],function(err,rs){
            if(err)throw err;
        });
    }
    if(major){
        var sql = 'UPDATE client SET `major` = ? WHERE `id` = ?';
        conn.query(sql,[
            major,id
        ],function(err,rs){
            if(err)throw err;
        });
    }
    if(proDate){
        var sql = 'UPDATE client SET `proDate` = ? WHERE `id` = ?';
        conn.query(sql,[
            proDate,id
        ],function(err,rs){
            if(err)throw err;
        });
    }
    if(worDate){
        var sql = 'UPDATE client SET `worDate` = ? WHERE `id` = ?';
        conn.query(sql,[
            worDate,id
        ],function(err,rs){
            if(err)throw err;
        });
    }
    if(toc){
        var sql = 'UPDATE client SET `toc` = ? WHERE `id` = ?';
        conn.query(sql,[
            toc,id
        ],function(err,rs){
            if(err)throw err;
        });
    }
    res.send("done");
};

