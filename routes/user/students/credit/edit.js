var express = require('express');
var router = express.Router();
var m = require('../../../../db/msql');
var getStudentId = require('../../course/getStudentId');
var getwaive = require('./waive');
var waiveData = getwaive.waive.getwaive;
var studentId = getStudentId.getStudentId.studentId;

router.post('/students/credit/edit', studentId, function(req, res) {
    if (req.session.profile) {
        var student_id = res.locals.studentId;
         
        if(req.body.credit_type == 1){
            var data = { 
                student_id: student_id,
                phone: req.body.phone,
                class: req.body.class,
                apply_year: req.body.apply_year,
                apply_semester: req.body.apply_semester,
                cos_dep_old: req.body.original_course_department,
                cos_tname_old: null,
                cos_cname_old: req.body.original_course_name,
                cos_code_old:  null,
                cos_cname: req.body.current_course_name,
                cos_code: req.body.current_course_code,
                cos_type: req.body.current_course_type,
                credit: req.body.current_course_credit,
                reason: null,
                credit_old: req.body.original_course_credit,
                file: req.body.file,
                school_old: req.body.original_school,           
                dep_old: req.body.original_department,              
                graduation_credit_old: req.body.original_graduation_credit,
                cos_year_old: req.body.original_course_year,         
                cos_semester_old: req.body.original_course_semester,     
                score_old: req.body.original_course_score,
                reason_type: null,
                state: 0,
                timestamp: req.body.timestamp
            }
        }
        else if (req.body.credit_type == 2){
             var data = { 
                student_id: student_id,
                phone: req.body.phone,
                class: req.body.class,
                apply_year: req.body.apply_year,
                apply_semester: req.body.apply_semester,
                cos_dep_old: req.body.original_course_department,
                cos_tname_old: null,
                cos_cname_old: req.body.original_course_name,
                cos_code_old:  null,
                cos_cname: req.body.current_course_name,
                cos_code: req.body.current_course_code,
                cos_type: req.body.current_course_type,
                credit: req.body.current_course_credit,
                reason: null,
                credit_old: req.body.original_course_credit,
                file: req.body.file,
                school_old: null,           
                dep_old: null,              
                graduation_credit_old: null,
                cos_year_old: req.body.original_course_year,         
                cos_semester_old: req.body.original_course_semester,     
                score_old: req.body.original_course_score,
                reason_type: null,
                state :0,
                timestamp: req.body.timestamp
            }
        }
        else if (req.body.credit_type == 3){
             var data = { 
                student_id: student_id,
                phone: req.body.phone,
                class: null,
                apply_year: req.body.apply_year,
                apply_semester: req.body.apply_semester,
                cos_dep_old: req.body.department,
                cos_tname_old: req.body.teacher,
                cos_cname_old: req.body.original_course_name,
                cos_code_old:  req.body.original_course_code,
                cos_cname: req.body.course_name,
                cos_code: req.body.course_code,
                cos_type: null,
                credit: req.body.credit,
                reason: req.body.reason.content,
                credit_old: req.body.original_course_credit,
                file: req.body.file,
                school_old: null,           
                dep_old: null,              
                graduation_credit_old: null,
                cos_year_old: req.body.course_year,         
                cos_semester_old: req.body.course_semester,     
                score_old: null,
                reason_type: req.body.reason.type,
                state: 0,
                timestamp: req.body.timestamp
            }

        }
        else if (req.body.credit_type == 4){
             var data = { 
                student_id: student_id,
                phone: req.body.phone,
                class: null,
                apply_year: req.body.apply_year,
                apply_semester: req.body.apply_semester,
                cos_dep_old: req.body.department,
                cos_tname_old: req.body.teacher,
                cos_cname_old: req.body.course_name,
                cos_code_old:  req.body.course_code,
                cos_cname: null,
                cos_code: null,
                cos_type: null,
                credit: req.body.credit,
                reason: req.body.reason,
                credit_old: null,
                file: req.body.file,
                school_old: null,           
                dep_old: null,              
                graduation_credit_old: null,
                cos_year_old: null,         
                cos_semester_old: null,     
                score_old: null,
                reason_type: null,
                state: 0,
                timestamp: req.body.timestamp
            }

           

        }
         m.ModifyOffsetApplyForm(data, function(err, result) {
            if(err)
                throw err;
    
            res.send(result);
        });
    } else {
        res.redirect('/');
    }
});


module.exports = router;

