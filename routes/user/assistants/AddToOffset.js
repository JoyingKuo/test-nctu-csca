var express = require('express');
var router = express.Router();
var query = require('../../../db/msql');
var csrf = require('csurf');
var csrfProtection = csrf();
var fs = require('fs');

router.post('/assistants/AddToOffset', csrfProtection, function(req, res){

        if(req.session.profile){
            var data = {
              student_id: req.body.sid,
              apply_year: req.body.year,
              apply_semester: req.body.semester,
              cos_code_old: req.body.codeA,
              cos_cname_old: req.body.nameA,
              cos_code: req.body.codeB,
              cos_cname: req.body.nameB,
              cos_type: req.body.type,
              offset_type: req.body.offset_type,
              credit: 0,
              brief: null
            };
            query.CreateOffset(data, function(err,result){
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
        }
        else
            res.redirect('/');
});

module.exports = router;
