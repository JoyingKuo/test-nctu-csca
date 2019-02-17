var express = require('express');
var router = express.Router();
var query = require('../../../db/msql');
var csrf = require('csurf');
var csrfProtection = csrf();
var fs = require('fs');
var getStudentId = require('../course/getStudentId');
var StudentId = getStudentId.getStudentId.studentId;
router.post('/students/credit/compulsoryCourse', StudentId, csrfProtection, function(req, res){

        if(req.session.profile){
             var StudentId = res.locals.studentId;
             var data = {
              student_id: StudentId,
              phone: req.body.phone,
              class: null,
              apply_year: req.body.apply_year,
              apply_semester: req.body.apply_semester,
              cos_dep_old: req.body.department,
              cos_tname_old: req.body.teacher,
              cos_cname_old: req.body.original_course_name,
              cos_code_old: req.body.original_course_code,
              cos_cname: req.body.course_name,
              cos_code: req.body.course_code,
              cos_type: null,
              credit: req.body.credit,
              reason: req.body.reason.content,
              credit_old: req.body.original_course_credit,
              file: req.body.file,
              school_old: null,
              dep_old: null,
              graduation_credit_old: null ,
              cos_year_old: req.body.course_year,
              cos_semester_old: req.body.course_semester,
              score_old: null ,
              offset_type: 0,
              reason_type:req.body.reason.type
            };
            console.log(data);
            query.CreateOffsetApplyForm(data, function(err,result){
                if(err){
                    throw err;
                    res.redirect('/');
                }
                if(!result)
                    res.redirect('/');
                else{
                    result = JSON.parse(result);
                    // console.log(result);
                    res.send(result); 
                }
            });                           
        }
        else
            res.redirect('/');
});

module.exports = router;
