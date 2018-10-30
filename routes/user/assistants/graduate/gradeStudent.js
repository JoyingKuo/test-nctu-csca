var express = require('express');
var apps = express();
var utils = require('../../../../utils');
var m = require('../../../../db/msql.js');
var router = express.Router();

router.post('/assistants/graduate/gradeStudent', function(req, res) {
    //req.body.grade = '四';
    var grades = {grade: req.body.grade};
    if (req.session.profile) {
        m.ShowGivenGradeStudentID(grades, function(err, result) {
            if (err) {
                throw err;
                res.redirect('/');
            } else if (!result) {
                res.redirect('/');
            } else {
                var all_result = JSON.parse(result);
                res.send(all_result);
            }
        });
    } else {
        res.redirect('/');
    }
});

module.exports = router;
