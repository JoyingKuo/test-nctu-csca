var express = require('express');
var router = express.Router();
var query = require('../../course/query');
var csrf = require('csurf');
var csrfProtection = csrf();

var PerformDelete = query.query.PerformDelete;
router.post('/students/formDelete', csrfProtection, PerformDelete, function(req, res){
	
	res.send(req.signal);	
});

module.exports = router;
