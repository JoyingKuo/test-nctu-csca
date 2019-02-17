var express = require('express');
var router = express.Router();
var query = require('../../../db/msql');

router.get('/assistants/ShowUserOffsetApplyForm', function(req, res){

        if(req.session.profile){
                
            var data1 = {student_id: '0516003'};
            var data2 = {all_student: true};
            query.ShowUserOffsetApplyForm(data2, function(err,result){
                if(err){
                    throw err;
                    res.redirect('/');
                }
                if(!result)
                    res.redirect('/');
                else{
                    result = JSON.parse(result);
                    // console.log(result);

                    var group = [];
                   
                        for(var i = 0; i < result.length; i++){
                          var one = {
                            "year" : result[i].apply_year,
                            "semester" : parseInt(result[i].apply_semester),
                            "sid": result[i].student_id,
                            "name": result[i].sname,
                            "info": result[i].class,
                            "phone": result[i].phone,
                            "nameA": result[i].cos_cname_old,
                            "codeA": result[i].cos_code_old,
                            "department": result[i].cos_dep_old, 
                            "teacher": result[i].cos_tname_old,
                            "creditA": parseInt(result[i].credit_old),
                            "nameB": result[i].cos_cname,
                            "codeB": result[i].cos_code,
                            "creditB": parseInt(result[i].credit),
                            "typeB": result[i].cos_type,
                            "type": parseInt(result[i].offset_type),
                            "score": result[i].score_old,
                            "reason": result[i].reason,
                            "reject_reason": result[i].reject_reason,
                            "status": parseInt(result[i].agree),
                            "previous": result[i].previous == "0" ? false : true,
                            "date": result[i].timestamp,
                            "file": result[i].file,
                            "transferTo": ""
                        };

                        if(result[i].transferto != null)
                            one.transferTo = result[i].transferto;
                        group.push(one);
                    }
                    if(group.length == result.length)
                        res.send(group);                         
                }
            });                           
        }
        else
            res.redirect('/');
});

module.exports = router;
