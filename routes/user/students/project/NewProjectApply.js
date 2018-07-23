var express = require('express');
var router = express.Router();
var query = require('../../course/query');
var csrf = require('csurf');
var csrfProtection = csrf();
var CheckStateAndCreateNewForm = query.query.CheckStateAndCreateNewForm;

router.post('/students/project_apply',csrfProtection, CheckStateAndCreateNewForm, function(req, res){
	res.send(req.signal);

});

module.exports = router;
