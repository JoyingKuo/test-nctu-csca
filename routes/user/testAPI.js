var express = require('express');
var router = express.Router();
var query = require('../../db/msql');
//var getTeacherId = require('../../course/getTeacherId');


//var TeacherId = getTeacherId.getTeacherId.teacherId;
router.get('/testAPI', function(req, res){

        //if(req.session.profile){
                
            //var teacherId = res.locals.teacherId;
            var data1 = {student_id: '0416004'};
            var data2 = {all_student: true};
            //console.log(data1);
            var data3 = {
                student_id: '0516007',
                cos_cname_old: "",
                cos_code_old: ""
            };
            var info = {id:'0416235',graduate_submit:1,submit_type:1, net_media:0}
            //query.ShowStudentResearchInfo(/*{tname:'吳毅成', research_title:'Surakarta遊戲之研究與設計', first_second:1, semester:'107-1', new_title:'Surakarta遊戲AI之研究與設計', new_link:'', new_intro:''}*/'0516007', function(err,result){
            //query.DeleteOffsetApplyForm(data3, function(err,result){
            var data = {
                student_id: '0416004',
                phone: '0976851957',
                apply_year: '107',
                apply_semester: '2',
                cos_dep_old: '2',
                cos_tname_old: '2',
                cos_cname_old: '2',
                cos_code_old: '2',
                cos_cname: '不知道～',
                cos_code: '不知道',
                cos_type: '不知道',
                //credit: 22,
                reason: '2',
                credit_old: 3,
                file: 'LOOOOOOOOOO',
                school_old: 'NTCU',           
                dep_old: '測試測試～～2',              
                graduation_credit_old: 128,
                cos_year_old: 106,         
                cos_semester_old: 2,     
                score_old: 92,
                offset_type: 1
            };
            query.ShowUserOffsetApplyForm(data1, function(err,result){
                if(err){
                    throw err;
                    res.redirect('/');
                }
                if(!result)
                    res.redirect('/');
                else{
                    result = JSON.parse(result);
                
                    res.send(result); 
                }
            });                         
        //}
        //else
          //  res.redirect('/');
});

module.exports = router;
