var express = require('express');
var router = express.Router();
var query = require('../../db/msql');
//var getTeacherId = require('../../course/getTeacherId');


//var TeacherId = getTeacherId.getTeacherId.teacherId;
router.get('/testAPI', function(req, res){

        //if(req.session.profile){
                
            //var teacherId = res.locals.teacherId;
            var data1 = {student_id: '0416208'};
            var data2 = {all_student: true};
            //console.log(data1);
            var info = {id:'0416208',graduate_submit:0,submit_type:3, net_media:0}
            
            query.ShowUserAllScore('0416010', function(err,result){
                if(err){
                    throw err;
                    res.redirect('/');
                }
                if(!result)
                    res.redirect('/');
                else{
                    result = JSON.parse(result);
                    // console.log(result);
                    res.send(result); 
                }
            });                         
        //}
        //else
          //  res.redirect('/');
});

module.exports = router;
