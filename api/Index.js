var express = require('express');
var test = require('../routes/user/students/project/ProInfoAndRsearchCount.js');


module.exports = function () {
    var api = express.Router();

    api.use('/students', test);

    // perhaps expose some API metadata at the root
    api.get('/', function(req, res) {
        res.json([ 'Hi' ]);
    });

    return api;
}

