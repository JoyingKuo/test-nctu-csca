var express = require('express');
var router = express.Router();
var query = require('../../../../db/msql');
var getTeacherId = require('../../course/getTeacherId');
var csrf = require('csurf');
var csrfProtection = csrf();
var Promise = require('promise');

var TeacherId = getTeacherId.getTeacherId.teacherId;

function getInfo(student_id) {
    query.ShowUserInfo(student_id, function(err2, studentsInfo) {
        var individual = {
            student_id: '',
            sname: '',
            program: '',
            graduate: '',
            graduate_submit: '',
            email: ''
        }
        if (err2) {
            throw err2;
            res.redirect('/');
        }
        if (!studentsInfo)
            res.redirect('/');
        studentsInfo = JSON.parse(studentsInfo);
        individual.student_id = studentsInfo[0].student_id;
        individual.sname = studentsInfo[0].sname;
        individual.program = studentsInfo[0].program;
        individual.graduate = studentsInfo[0].graduate;
        individual.graduate_submit = studentsInfo[0].graduate_submit;
        individual.email = studentsInfo[0].email;
        //individual["fail"] = studentsInfo.fail;
        return individual;
    });
}

router.get('/professors/students/list', TeacherId, function(req, res) {

    if (req.session.profile) {

        //var teacherId = req.body.id;
        var teacherId = res.locals.teacherId;
        query.ShowTeacherMentors(teacherId, function(err1, mentors) {
            if (err1) {
                throw err1;
                res.redirect('/');
            }
            if (!mentors)
                res.redirect('/');
            mentors = JSON.parse(mentors);
            var students = [];
            var promise = Promise((resolve, reject) {
                for (let i = 0; i < mentors.length; i++) {
                    var student_id = mentors[i].student_id;
                    students.push(getInfo(student_id));
                }
                resolve(students);
                reject("failure");
            });
            promise.then(function(students) {
                res.send(students);
            })
        });
    } else
        res.redirect('/');

});

module.exports = router;