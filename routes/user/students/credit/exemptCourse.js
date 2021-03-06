var express = require('express');
var router = express.Router();
var m = require('../../../../db/msql');
var getStudentId = require('../../course/getStudentId');
var getwaive = require('./waive');
var waiveData = getwaive.waive.getwaive;
var studentId = getStudentId.getStudentId.studentId;

router.post('/students/credit/exemptCourse', studentId, function(req, res) {
    if (req.session.profile) {
        var student_id = res.locals.studentId;
        // var student_id = '0516004';
        // res.send(student_id);
        // var sid = {student_id: student_id};
        var data = {
            student_id: student_id,
            phone: req.body.phone,
            class: req.body.class,
            apply_year: req.body.apply_year,
            apply_semester: req.body.apply_semester,
            cos_dep_old: req.body.original_course_department,
            cos_tname_old: null,
            cos_cname_old: req.body.original_course_name,
            cos_code_old: null,
            cos_cname: req.body.current_course_name,
            cos_code: req.body.current_course_code,
            cos_type: req.body.current_course_type,
            credit: req.body.current_course_credit,
            reason: null,
            credit_old: parseInt(req.body.original_course_credit),
            file: req.body.file,
            school_old: null,
            dep_old: null,
            graduation_credit_old: null,
            cos_year_old: req.body.original_course_year,
            cos_semester_old: req.body.original_course_semester,
            score_old: parseInt(req.body.original_course_score),
            offset_type: 3,
            reason_type: null
        };
        /* var data = {
            student_id: '0512345',
            phone: "0912345678",
            school_old: "清華大學",
            dep_old: "資工系",
            graduation_credit_old: 128,
            apply_year: 107,
            apply_semester: 1,
            cos_year_old: 2,
            cos_semester_old: 2,
            cos_cname_old: "機率",
            cos_dep_old: "資工系",
            credit_old: 3,
            score_old: 80,
            cos_code: "EC4313",
            cos_cname: "機率",
            credit: 3,
            file: "0516xxx_抵免.pdf",
            offset_type: 2,
            cos_tname_old: null,
            cos_code_old:  null,
            cos_type: null,
            reason: null,
            agree: 0,
            timestamp: 'test',
            sname: 'test',
            previous: 0
        }; */
        m.CreateOffsetApplyForm(data, function(err, result) {
            if(err)
                throw err;
            res.send(result);
        });
    } else {
        res.redirect('/');
    }
});


module.exports = router;

