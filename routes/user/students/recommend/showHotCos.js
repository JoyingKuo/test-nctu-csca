var express = require('express');
var router = express.Router();
var query = require('../../../../db/msql');
var utils = require('../../../../utils');
var getStudentId = require('../../course/getStudentId');
var csrf = require('csurf');
var csrfProtection = csrf();

var StudentId = getStudentId.getStudentId.studentId;
router.get('/students/ShowStudentHotCos', StudentId, function(req, res){
    
    if(req.session.profile){

        var studentId = {student_id: res.locals.studentId};
        //var studentId = {student_id: '0516205'};
        //console.log(studentId);
        query.ShowStudentHotCos(studentId, function(err, result){
                if(err){
                    throw err;
                    return;
                }
                if(!result)
                    res.redirect('/');
                var result = JSON.parse(result);
                var list = [];
                for (var i = 0; i < result.length; i++) {
                    var hot_course = { 
                            unique_id: '',
                            url: '',
                            cos_credit: '',
                            cos_time: '',
                            depType: '',
                            tname: '',
                            cos_cname: '' };
                    hot_course.unique_id = result[i].unique_id;
                    hot_course.url = result[i].url;
                    hot_course.cos_credit = result[i].cos_credit;
                    hot_course.cos_time = result[i].cos_time;
                    hot_course.depType = result[i].depType;
                    hot_course.tname = result[i].tname;
                    hot_course.cos_cname = result[i].cos_cname;
                    list.push(hot_course);
                }
                res.send(list);
        });
    }

});

module.exports = router;
