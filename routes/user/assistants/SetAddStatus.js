var express = require('express');
var router = express.Router();
var query = require('../../../db/msql');
var csrf = require('csurf');
var csrfProtection = csrf();

router.post('/assistants/SetAddStatus', csrfProtection, function(req, res){
           // req.body.student_id ='0416208';
           // req.body.research_title='車載專題',
           // req.body.semester='107-1';
           // req.body.first_second = 2;
            if(req.session.profile){
            
                var info = {student_id: req.body.student_id, research_title: req.body.research_title, semester: req.body.semester, first_second: req.body.first_second, add_status: 1};
                query.SetResearchAddStatus(info, function(err, result){
                       if(err){
                           throw err;
                           res.redirect('/');
                        }
                        if(!result)
                           res.redirect('/');
                        result = JSON.parse(result);
                        var signal = {
                            signal:(parseInt(result.info.affectedRows) > 0)?1:0
                            
                            }
                        res.send(signal);
                                                
                   });
            
            }
            else
            res.redirect('/');
            
            });

module.exports = router;

