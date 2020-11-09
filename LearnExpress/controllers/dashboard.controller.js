var dateFormat = require('dateformat');
var alert = require('alert');

var connection = require('../database/database.js');

var loginId;
module.exports.getDashboard = function(req,res){
    //pagination
    var currentPage = parseInt(req.query.page) || 1;
    var limit = 8; //each page show 8 data
    var offSet = 0;
    if(currentPage < 1){
        currentPage = 1;
    }
    var nextPage = currentPage + 1;
    var prePage = currentPage - 1;
    var totalPage;
    var offSet = limit*currentPage - limit ;
    var totalAll;

    var select = "CALL PROC_SelectCookieForLogin(?)";
    connection.query(select,[
        req.signedCookies.userId
        ],function(err,rsLogin){
            if(err) throw err;
            rsLogin = rsLogin[0];
            var email = rsLogin[0].email;
            loginId = rsLogin[0].id;
            var count = "CALL PROC_SelectTotalClient(?)";
            connection.query(count,[loginId],function(err,rsCount){
                if (err) throw err;
                rsCount = rsCount[0];
                totalAll = rsCount[0].total;
                if(rsCount[0].total % limit == 0){
                    totalPage = rsCount[0].total/limit;
                }else{
                    totalPage = Math.ceil(rsCount[0].total/limit);
                }
                if(currentPage > totalPage){
                    currentPage = totalPage;
                }
            });
            var selectClient = "CALL PROC_SelectClient(?,?,?)";
            var userList =[];
            connection.query(selectClient,[
                loginId,limit,offSet
            ],function(err,rsClient){
                if(err){
                    throw err;
                }else{
                    rsClient = rsClient[0];
                    for(var i = 0;i<rsClient.length;i++){
                        //check gender
                        if(rsClient[i].gender == null){
                            rsClient[i].gender = "Other";
                        }else if(rsClient[i].gender == 1){
                            rsClient[i].gender = "Male";
                        }else{
                            rsClient[i].gender = "Female";
                        }
                        //check birthday
                        if(rsClient[i].dob == null){
                            var dob = rsClient[i].dob = "unknown";
                        }else{
                            var dob = dateFormat(rsClient[i].dob,"dd/mm/yyyy");
                        }
                        //check phone
                        if(rsClient[i].phone == null){
                            rsClient[i].phone = "unknown";
                        }
                        //check type of job
                        if(rsClient[i].jobtype == null){
                            rsClient[i].jobtype = "unknown";
                        }
                        // check degree
                        if(rsClient[i].degree == null){
                            rsClient[i].degree = "unknown";
                        }
                        //check major
                        if(rsClient[i].major == null){
                            rsClient[i].major = "unknown";
                        }
                        //check probation date
                        if(rsClient[i].proDate == null){
                            var proDate = rsClient[i].proDate = "unknown";
                        }else{
                            var proDate = dateFormat(rsClient[i].proDate,"dd/mm/yyyy");
                        }
                        //check working date
                        if(rsClient[i].worDate == null){
                            var worDate = rsClient[i].worDate = "unknown";
                        }else{
                            var worDate = dateFormat(rsClient[i].worDate,"dd/mm/yyyy");
                        }
                        //check type of contract
                        if(rsClient[i].toc == null){
                            rsClient[i].toc = "unknown";
                        }
                        var userInfo = {
                            'id': rsClient[i].id,
                            'name': rsClient[i].name,
                            'gender': rsClient[i].gender,
                            'dob': dob,
                            'phone': rsClient[i].phone,
                            'jobtype': rsClient[i].jobtype,
                            'degree': rsClient[i].degree,
                            'major': rsClient[i].major,
                            'proDate': proDate,
                            'worDate': worDate,
                            'toc': rsClient[i].toc
                        }
                        userList.push(userInfo);
                    }
                    res.render('dashboard.pug',{
                        email: email,
                        userList: userList,
                        nextPage: nextPage,
                        prePage: prePage,
                        currentPage: currentPage,
                        totalPage: totalPage,
                        totalAll: totalAll
                    });
                }
            });

        });
}

module.exports.postDashboard = function(req,res){
    var name = req.body.nameUser;
    var date = req.body.dateUser;
    var phone = req.body.phoneUser;
    var gender = req.body.gender;
    var job = req.body.job;
    var degree = req.body.degree;
    var major = req.body.major;
    var proDate = req.body.proDate;
    var worDate = req.body.worDate;
    var contract = req.body.contract;
    //check null
    if(!date){
        date = null;
    }
    if(!phone){
        phone = null;
    }
    if(!job){
        job = null;
    }
    if(!degree){
        degree = null;
    }
    if(!major){
        major = null;
    }
    if(!proDate){
        proDate = null;
    }
    if(!worDate){
        worDate = null;
    }
    if(!contract){
        contract = null;
    }
    if(!name){
        alert('Invalid Value');
        res.redirect('back');
    }else{
        var insert = "CALL PROC_InsertClientInfo(?,?,?,?,?,?,?,?,?,?,?)";
        connection.query(insert,[
            loginId,name,gender,date,phone,job,
            degree,major,proDate,worDate,contract
        ],function(err,rs){
            if(err)throw err;
            res.redirect('back');
        });
    }
}

var clientId;
module.exports.getProfile = function(req,res){
    var select = "CALL PROC_SelectDataFromClientAndLogin(?)";
    connection.query(select,[req.query.id],function(err,rs1){
        if(err)throw err;
        rs1 = rs1[0];
        clientId = rs1[0].id;
        var email = rs1[0].email;
        var name = rs1[0].name;
        var gender = rs1[0].gender;
        var dob = rs1[0].dob;
        var phone = rs1[0].phone;
        var job = rs1[0].jobtype;
        var degree = rs1[0].degree;
        var major = rs1[0].major;
        var proDate = rs1[0].proDate;
        var worDate = rs1[0].worDate;
        var toc = rs1[0].toc;

        if(gender == null){
            gender = "Other";
        }else if(gender == 1){
            gender = "Male";
        }else{
            gender = "Female";
        }
        //check birthday
        if(dob == null){
            dob =  "unknown";
        }else{
            dob = dateFormat(dob,"dd/mm/yyyy");
        }
        //check phone
        if(phone == null){
            phone = "unknown";
        }
        //check type of job
        if(job == null){
            job = "unknown";
        }
        // check degree
        if(degree == null){
            degree = "unknown";
        }
        //check major
        if(major == null){
            major = "unknown";
        }
        //check probation date
        if(proDate == null){
            proDate = proDate = "unknown";
        }else{
            proDate = dateFormat(proDate,"dd/mm/yyyy");
        }
        //check working date
        if(worDate == null){
            worDate = worDate = "unknown";
        }else{
            worDate = dateFormat(worDate,"dd/mm/yyyy");
        }
        //check type of contract
        if(toc == null){
            toc = "unknown";
        }
        var select = "CALL PROC_SelectProfile(?)";
            connection.query(select,[clientId],function(err,rs){
                if(err)throw err;
                var inforList = [];
                rs = rs[0];
                if(rs.length>0){
                    for(var i = 0;i<rs.length;i++){

                        if(rs[i].relationshipP == null){
                            rs[i].relationshipP = "unknown";
                        }
                        if(rs[i].phoneP == null){
                            rs[i].phoneP = "unknown";
                        }
                        if(rs[i].dobP == null){
                            rs[i].dobP =  "unknown";
                        }else{
                            rs[i].dobP = dateFormat(dob,"dd/mm/yyyy");
                        }
                        if(rs[i].genderP == null){
                            rs[i].genderP = "Other";
                        }else if(rs[i].genderP == 1){
                            rs[i].genderP = "Male";
                        }else{
                            rs[i].genderP = "Female";
                        }
                        if(rs[i].identifyP == null){
                            rs[i].identifyP = "unknown";
                        }
                        if(rs[i].addressP == null){
                            rs[i].addressP = "unknown";
                        }
                        var infor = {
                            'relationshipP': rs[i].relationshipP,
                            'nameP': rs[i].nameP,
                            'dobP': rs[i].dobP,
                            'phoneP': rs[i].phoneP,
                            'genderP': rs[i].genderP,
                            'identifyP': rs[i].identifyP,
                            'addressP': rs[i].addressP 
                        }
                        inforList.push(infor);
                    }
                    res.render('profile.pug',{
                        'email': email,
                        'name': name,
                        'gender': gender,
                        'dob' : dob,
                        'phone': phone,
                        'job': job,
                        'degree': degree,
                        'major': major,
                        'proDate': proDate,
                        'worDate': worDate,
                        'toc': toc,
                        'inforList': inforList
                    });
                }else{
                    var infor = {
                        'relationshipP': "",
                        'nameP': "",
                        'dobP': "",
                        'phoneP': "",
                        'genderP': "",
                        'identifyP': "",
                        'addressP': "" 
                    }
                    inforList.push(infor);

                    res.render('profile.pug',{
                        'email': email,
                        'name': name,
                        'gender': gender,
                        'dob' : dob,
                        'phone': phone,
                        'job': job,
                        'degree': degree,
                        'major': major,
                        'proDate': proDate,
                        'worDate': worDate,
                        'toc': toc,
                        'inforList':inforList
                    });
                }
        });
    });
};

module.exports.postProfile = function(req,res){
    var idP = clientId;
    var nameP = req.body.nameP;
    var genderP = req.body.genderP;
    if(genderP == ""){
        genderP = null;
    }
    var relationshipP = req.body.relationshipP;
    if(relationshipP == ""){
        relationshipP = null;
    }
    var dobP = req.body.dobP;
    if(dobP == ""){
        dobP = null;
    }
    var phoneP = req.body.phoneP;
    if(phoneP == ""){
        phoneP = null;
    }
    var identifyP = req.body.identifyP;
    if(identifyP == ""){
        identifyP = null;
    }
    var addressP = req.body.addressP;
    if(addressP == ""){
        addressP = null;
    }
    if(!nameP){
        alert("Invalid Data");
        res.redirect('back');
    }else{
        var insert = 
        "CALL PROC_InsertProfile(?,?,?,?,?,?,?,?)"
        connection.query(insert,[
            idP,
            nameP,
            relationshipP,
            dobP,
            genderP,
            phoneP,
            identifyP,
            addressP
        ],function(err,rs){
            if(err)throw err;
            res.redirect('back');
        });
    }
};

module.exports.postAjax = function(req,res){
    for(var i= 0;i<req.body.data.length;i++){
        var update = "UPDATE `client` SET `disable` = 0 WHERE id = ?";
        connection.query(update,[
            req.body.data[i]
        ],function(err,rs){
            if(err) throw err;
        });
    }
}