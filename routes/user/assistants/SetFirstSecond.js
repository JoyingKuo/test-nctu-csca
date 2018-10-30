var express = require('express');
var router = express.Router();
var query = require('../../../db/msql');
var csrf = require('csurf');
var csrfProtection = csrf();

router.patch('/assistants/SetFirstSecond', csrfProtection, function(req, res) {
    if (req.session.profile) {
        let student_id = req.body.student_id;
        query.SetFirstSecond(student_id, function(err, result) {
            if (err) {
                throw err;
                res.redirect('/');    
            }
            if (!result)
                res.redirect('/');
            result = JSON.parse(result);
            var signal = {
                signal: (parseInt(result.info.affectedRows) > 0)?1:0
            }
            res.send(signal);
        });
    } else {
        res.redirect('/');
    }
});

module.exports = router;

