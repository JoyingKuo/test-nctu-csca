"use strict"
const request = require('request');
var express = require('express');
var utils = require('../../../../utils');
var query = require('../../../../db/msql');
var utils = require('../../../../utils');
var csrf = require('csurf');
var router = express.Router();
var csrfProtection = csrf();
var getStudentId = require('../../course/getStudentId');
var nodemailer = require('nodemailer');


var StudentId = getStudentId.getStudentId.studentId;

router.post('/assistants/graduate/check', csrfProtection, function(req, res){

    if(req.session.profile){
         var info ={
            id: req.body.student_id,
            graduate_submit: req.body.graduate_submit,
            submit_type: 2,
            net_media:2
         }
         //console.log(info);
        query.ShowUserInfo(req.body.student_id,function(err,mail){
            query.SetGraduateSubmitStatus(info,function(err,result){
                if(err){
                    throw err;
                    res.redirect('/')
                }
                if(!result)
                    res.redirect('/')
                else{
                    var transporter = nodemailer.createTransport({
			            service: 'Gmail',
			            auth: {
				        user: 'nctucsca@gmail.com',
				        pass: 'axc3262757'
			            }
			        });
			
			        var options = {
				    from: 'nctucsca@gmail.com',
				    to: mail, 
				    subject: '【系辦重要通知】畢業學分預審作業已完成，請至系辦簽領預審結果紀錄表，謝謝。', // Subject line
                    html: '<p>此信件由系統自動發送，請勿直接回信！</p><br/><p> 同學你好：</p><br/><p>    畢業學分預審作業已完成，請於收到此通知信後盡快撥空至系辦簽領預審結果紀錄表，謝謝。</p><br/><br/><p>     說明：預審作業係假設本學期修課成績均及格，本學期修課若有停修、逾期退選、成績不及格或不通過會影響畢業學分者，請務必要補修課程學分。（以及格之科目重複修習，再修之學分不計。）</p><<br/><br/><p>交大資工線上助理 NCTU CSCA</p>'
					};
			
			    transporter.sendMail(options, function(error, info){
				    if(error){
					    console.log(error);
				    }
			    });

                    res.send(JSON.parse(result));
                }
            });
        });
            
    }
    else
        res.redirect('/');
});

router.get('/assistants/graduate/check',StudentId,function(req, res){
    let personId = res.locals.studentId;
    //console.log( "yoyoo" + personId);
    query.ShowUserInfo(personId, function(err, result){
        if(err){
            ////console.log(err);
            res.redirect('/');
        }
        else {
            result = JSON.parse(result);

            var checkState = { 
                check:{
                    state: (result[0].graduate_submit == null)?0:parseInt(result[0].graduate_submit)
                },
                general_course:{
                    type: (result[0].submit_type == null)?null:parseInt(result[0].submit_type)

                },
                professional_field: (result[0].net_media == null)?0:parseInt(result[0].net_media)

            }
            res.send(checkState)
        }
    });
});


module.exports = router;

