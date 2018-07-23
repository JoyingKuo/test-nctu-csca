var express = require('express');
var router = express.Router();
var query = require('../../../course/query');
var csrf = require('csurf');
var csrfProtection = csrf();

var SetProjectTitle = query.query.SetProjectTitle;
router.post('/professors/students/setResearchTitle',csrfProtection, SetProjectTitle, function(req, res){

	res.send(req.signal);		
});

module.exports = router;
