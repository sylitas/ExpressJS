var dateFormat = require('dateformat');


module.exports = {
    check:function (gender,dob,phone,job,degree,major,proDate,worDate,toc){
        //check gender
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
        return{
            'gender':gender,
            'dob':dob,
            'phone':phone,
            'job':job,
            'degree':degree,
            'major':major,
            'proDate':proDate,
            'worDate':worDate,
            'toc':toc
        };
    }
};