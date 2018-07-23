var express = require('express');
var router = express.Router();
var query = require('../../../course/query');
var csrf = require('csurf');
var csrfProtection = csrf();

var SetApplyFormState = query.query.SetApplyFormState;
router.post('/professors/students/ApplyFormSetAgree', csrfProtection,SetApplyFormState, function(req, res){
	res.send(req.signal);
});

module.exports = router;
