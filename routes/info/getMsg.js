var express = require('express');
var router = express.Router();
var bugs = require('./bug');
var updates = require('./update');

var getBug = bugs.bug.getBug;
var getUpdate = updates.update.getUpdate;

router.get('/bugs', getBug, function(req, res){
    
    res.send(res.locals.msg);

});


router.get('/updates', getUpdate, function(req, res){

    res.send(res.locals.msg);

});

module.exports = router;
