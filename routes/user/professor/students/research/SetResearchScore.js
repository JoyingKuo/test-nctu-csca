var express = require('express');
var router = express.Router();
var query = require('../../../course/query');
var csrf = require('csurf');
var csrfProtection = csrf();

var SetProjectScore = query.query.SetProjectScore;
router.post('/professors/students/setScore' , csrfProtection,SetProjectScore, function(req, res){

    res.send(req.signal);
});

module.exports = router;
