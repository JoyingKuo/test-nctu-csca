var express = require('express');
var router = express.Router();
var query = require('../../../../../db/msql');
var csrf = require('csurf');
var csrfProtection = csrf();


router.post('/students/graduate/switchCourse', csrfProtection, function(req, res){

        if(req.session.profile){
            var id = req.body.student_id;
            var cos_name = req.body.cn;
            //var code = req.body.code;
            var origin_group = req.body.origin_group;
            var target_group = req.body.target_group;
            query.SetCosMotion(id, cos_name, origin_group, target_group);
            var signal = {
                signal:1
            }
            res.send(signal);
        }
        else
            res.redirect('/');
});

module.exports = router;
