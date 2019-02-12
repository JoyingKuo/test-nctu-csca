var express = require('express');
var router = express.Router();
var query = require('../../../db/msql');
var csrf = require('csurf');
var csrfProtection = csrf();
var fs = require('fs');

router.post('/students/credit/course/form', csrfProtection, function(req, res){

        if(req.session.profile){
            var data = {
              student_id: req.body.student_id,
              phone: req.body.phone,
              apply_year: req.body.year,
              apply_semester: req.body.semester,
              cos_dep_old: req.body.department,
              cos_tname_old: req.body.teacher,
              cos_cname_old: req.body.course_name_old,
              cos_code_old: req.body.course_code_old,
              cos_cname: req.body.course_name,
              cos_code: req.body.course_code,
              cos_type: req.body.course_type,
              credit: 0,
              reason: req.body.reason,
              file: req.body.file,
              offset_type: 0
            };
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
