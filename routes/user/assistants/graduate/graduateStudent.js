var express = require('express');
var apps = express();
var utils = require('../../../../utils');
var m = require('../../../../db/msql.js');
var router = express.Router();

router.post('/assistants/graduate/graduateStudent', function(req, res) {
    var grades = {grade: req.body.grade};
    // var grades = {grade: '二'};
    var list = [];
    if (req.session.profile) {
        m.ShowGivenGradeStudentID(grades, function(err, result) {
            if (err) {
                throw err;
                res.redirect('/');
            } else if (!result) {
                res.redirect('/');
            } else {
                var all_result = JSON.parse(result);
                for (var i = 0; i < all_result.length; i++) {
                    var studentID = {student_id: all_result[i].student_id};
                    m.ShowStudentGraduate(studentID, function(err, graduate_result) {
                        if (err) {
                            throw err;
                            res.redirect('/');
                        } else if (!graduate_result) {
                            res.redirect('/');
                        } else {
                            var output = JSON.parse(graduate_result)
                            output.map( student => {
                                if (student.submit_status === null) { student.submit_status = '0'; }
                                if (student.submit_type === null) { student.submit_type = '0'; }
                                if (student.en_status === null) { student.en_status = '0'; }
                                list.push(student);
                            });
                            // list.push(JSON.parse(graduate_result));
                        }
                    });
                }
            }
        });
        setTimeout(function() {
            res.send(list);        
        }, 1000);
    } else {
        res.redirect('/');
    }
});

module.exports = router;
