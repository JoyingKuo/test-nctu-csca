var express = require('express');
var router = express.Router();
var query = require('../../course/query');
var csrf = require('csurf');
var csrfProtection = csrf();
var PerformEditProjectPage = query.query.PerformEditProjectPage;

router.post('/students/editProject',csrfProtection,PerformEditProjectPage, function(req, res){
	res.send(req.signal);
});

module.exports = router;
