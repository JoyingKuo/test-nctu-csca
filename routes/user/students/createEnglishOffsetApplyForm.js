var express = require('express');
var router = express.Router();
var query = require('../../../db/msql');
var utils = require('../../../utils');
var csrf = require('csurf');
var csrfProtection = csrf();
var fs = require('fs');
var getStudentId = require('../course/getStudentId');
var StudentId = getStudentId.getStudentId.studentId;

router.post('/students/credit/englishCourse', StudentId, csrfProtection, function(req, res){

        if(req.session.profile){
            var StudentId = res.locals.studentId;
            var data = {
              student_id: StudentId,
              phone: req.body.phone,
              apply_year: req.body.apply_year,
              apply_semester: req.body.apply_semester,
              cos_dep_old: req.body.department,
              cos_tname_old: req.body.teacher,
              cos_cname_old: req.body.course_name,
              cos_code_old: req.body.course_code,
              cos_cname: null,
              cos_code: null,
              cos_type: null,
              reason: req.body.reason,
              credit_old: 0,
              file: req.body.file,
              school_old: '',
              dep_old: '',
              graduation_credit_old: 0,
              cos_year_old: 0,
              cos_semester_old: 0,
              score_old: 0,
              offset_type: 1,
              //transferto:'["T9505","T9125"]'
            };
            //console.log(data);
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
