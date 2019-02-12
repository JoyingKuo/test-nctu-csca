var express = require('express');
var router = express.Router();
var query = require('../../../db/msql');
var getStudentId = require('../course/getStudentId');
var StudentId = getStudentId.getStudentId.studentId;
router.get('/students/credit/all', StudentId, function(req, res){

        if(req.session.profile){
            var StudentId = res.locals.studentId;
            var data = {student_id: StudentId};
            query.ShowUserOffsetApplyForm(data, function(err,result){
                if(err){
                    throw err;
                    res.redirect('/');
                }
                if(!result)
                    res.redirect('/');
                else{
                    result = JSON.parse(result);
                    var list = {
                        waive_course: [],
                        compulsory_course: [],
                        english_course: [],
                    };
                    for(var i = 0; i < result.length; i++){
                        //轉校轉系抵免
                        if(result[i].offset_type === "2"){
                            var waive = {
                                "phone": result[i].phone,
                                "original_school": result[i].school_old,
                                "original_department": result[i].dep_old,
                                "current_school": "交通大學",
                                "current_department": "資工系",
                                "original_graduation_credit": parseInt(result[i].graduation_credit_old),
                                "apply_year": parseInt(result[i].apply_year),
                                "apply_semester": parseInt(result[i].apply_semester),
                                "original_course_year": result[i].cos_year_old,
                                "original_course_semester": result[i].cos_semester_old,
                                "original_course_name": result[i].cos_cname_old,
                                "original_course_department": result[i].cos_dep_old,
                                "original_course_credit": parseInt(result[i].credit_old),
                                "original_course_score": parseInt(result[i].score_old),
                                "current_course_code": result[i].cos_code,
                                "current_course_name": result[i].cos_cname,
                                "current_course_credit": parseInt(result[i].credit),
                                "file": result[i].file,
                                "status": parseInt(result[i].agree)
                            };
                            list.waive_course.push(waive);
                        }
                        //英授抵免
                        else if(result[i].offset_type === "1"){
                            var english = {
                                "apply_year" : parseInt(result[i].apply_year),
                                "apply_semester" : parseInt(result[i].apply_semester),
                                "phone": result[i].phone,
                                "reason": result[i].reason,
                                "department": result[i].cos_dep_old, 
                                "teacher": result[i].cos_tname_old,
                                "course_code": result[i].cos_code_old,
                                "course_name": result[i].cos_cname_old,
                                "file": result[i].file,
                                "status": parseInt(result[i].agree),
                            };
                            list.english_course.push(english);
                        }
                        //外系抵免
                        else if(result[i].offset_type === "0"){
                            var compulsory = {
                                "apply_year" : parseInt(result[i].apply_year),
                                "apply_semester" : parseInt(result[i].apply_semester),
                                "phone": result[i].phone,
                                "reason": result[i].reason,
                                "department": result[i].cos_dep_old, 
                                "teacher": result[i].cos_tname_old,
                                "course_code": result[i].cos_code,
                                "course_name": result[i].cos_cname,
                                "original_course_code": result[i].cos_code_old,
                                "original_course_name": result[i].cos_cname_old,
                                "course_type": result[i].cos_type,
                                "credit": parseInt(result[i].credit),
                                "file": result[i].file,
                                "status": parseInt(result[i].agree),
                            };
                            list.compulsory_course.push(compulsory);
                        }
                    }
                }
                res.send(list);
            });
        }
        else
            res.redirect('/');
});

module.exports = router;
