var express = require('express');
var router = express.Router();
var m = require('../../../../db/msql');
var getStudentId = require('../../course/getStudentId');
var getwaive = require('./waive');
var waiveData = getwaive.waive.getwaive;
var studentId = getStudentId.getStudentId.studentId;

router.post('/students/credit/delete', studentId, function(req, res) {
    if (req.session.profile) {
        var student_id = res.locals.studentId;
        var data = {
            timestamp: req.body.timestamp,
            student_id: student_id
        }
         m.DeleteOffsetApplyForm(data, function(err, result) {
            if(err)
                throw err;
    
            res.send(result);
        });
    } else {
        res.redirect('/');
    }
});


module.exports = router;

