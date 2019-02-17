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
                        exempt_course: [],
                        compulsory_course: [],
                        english_course: []
                    };
                    for(var i = 0; i < result.length; i++){
                        //轉校轉系抵免
                        var agree_status = parseInt(result[i].agree) ;
                        if(agree_status == 1 || agree_status == 5 )
                            agree_status = 0;
                        else if (agree_status == 2)
                            agree_status = 1;
                        else if (agree_status == 3 ||agree_status == 4)
                            agree_status = 2;
                        else if (agree_status == 6)
                            agree_status = 3;

                        if(result[i].offset_type === "2"){
                            var waive = {
                                "timestamp": result[i].timestamp,
                                "class": result[i].class,
                                "phone": result[i].phone,
                                "original_school": result[i].school_old,
                                "original_department": result[i].dep_old,
                                "current_school": "交通大學",
                                "current_department": "資工系",
                                "original_graduation_credit": parseInt(result[i].graduation_credit_old),
                                "apply_year": parseInt(result[i].apply_year),
                                "apply_semester": parseInt(result[i].apply_semester),
                                "original_course_year": parseInt(result[i].cos_year_old),
                                "original_course_semester": parseInt(result[i].cos_semester_old),
                                "original_course_name": result[i].cos_cname_old,
                                "original_course_department": result[i].cos_dep_old,
                                "original_course_credit": parseInt(result[i].credit_old),
                                "original_course_score": parseInt(result[i].score_old),
                                "current_course_code": result[i].cos_code,
                                "current_course_name": result[i].cos_cname,
                                "current_course_credit": parseInt(result[i].credit),
                                "current_course_type": result[i].cos_type,
                                "file": result[i].file,
                                "status": agree_status,
                                "reject_reason": result[i].reject_reason
                            
                            };
                            list.waive_course.push(waive);
                        }
                        //英授抵免
                        else if(result[i].offset_type === "1"){
                            var english = {
                                "timestamp": result[i].timestamp,
                                "apply_year" : parseInt(result[i].apply_year),
                                "apply_semester" : parseInt(result[i].apply_semester),
                                "phone": result[i].phone,
                                "reason": result[i].reason,
                                "department": result[i].cos_dep_old, 
                                "teacher": result[i].cos_tname_old,
                                "credit": parseInt(result[i].credit),
                                "course_code": result[i].cos_code_old,
                                "course_name": result[i].cos_cname_old,
                                "file": result[i].file,
                                "status": agree_status,
                                "reject_reason": result[i].reject_reason
                            };
                            list.english_course.push(english);
                        }
                        //外系抵免
                        else if(result[i].offset_type === "0"){
                            var compulsory = {
                                "timestamp": result[i].timestamp,
                                "apply_year" : parseInt(result[i].apply_year),
                                "apply_semester" : parseInt(result[i].apply_semester),
                                "phone": result[i].phone,
                                "reason": { "type" :result[i].reason_type,
                                            "content": result[i].reason
                                            },
                                "department": result[i].cos_dep_old, 
                                "teacher": result[i].cos_tname_old,
                                "credit": parseInt(result[i].credit),
                                "course_year":parseInt(result[i].cos_year_old),
                                "course_semester":parseInt(result[i].cos_semester_old),
                                "course_code": result[i].cos_code,
                                "course_name": result[i].cos_cname,
                                "original_course_code": result[i].cos_code_old,
                                "original_course_name": result[i].cos_cname_old,
                                "original_course_credit": parseInt(result[i].credit_old),
                                "file": result[i].file,
                                "status": agree_status,
                                "reject_reason": result[i].reject_reason
                            };
                            list.compulsory_course.push(compulsory);
                        }
                         else if(result[i].offset_type === "3"){
                            var exempt = {
                                "timestamp": result[i].timestamp,
                                "class": result[i].class,
                                "phone": result[i].phone,
                                "apply_year" : parseInt(result[i].apply_year),
                                "apply_semester" : parseInt(result[i].apply_semester),
                                "original_course_year": parseInt(result[i].cos_year_old),
                                "original_course_semester": parseInt(result[i].cos_semester_old),
                                "original_course_name": result[i].cos_cname_old,
                                "original_course_department": result[i].cos_dep_old,
                                "original_course_credit": parseInt(result[i].credit_old),
                                "original_course_score": parseInt(result[i].score_old),
                                "current_course_code": result[i].cos_code,
                                "current_course_name": result[i].cos_cname,
                                "current_course_credit": parseInt(result[i].credit),
                                "file": result[i].file,
                                "current_course_type": result[i].cos_type,
                                "status": agree_status,
                                "reject_reason": result[i].reject_reason

                            };
                            list.exempt_course.push(exempt);
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
