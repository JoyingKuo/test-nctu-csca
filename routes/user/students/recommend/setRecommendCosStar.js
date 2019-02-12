var express = require('express');
var router = express.Router();
var query = require('../../../../db/msql');
var utils = require('../../../../utils');

router.post('/students/SetRecommendCosStar', function(req, res){
    var star = {
        student_id: req.body.student_id, 
        unique_id: req.body.unique_id,
        star_level: Number(req.body.star_level) };

    if (req.session.profile) {
        query.SetRecommendCosStar(star, function(err, result) {
            if (err) {
                throw err;
                res.redirect('/');
            } else if (!result) {
                res.redirect('/');
            } else {
                res.send(JSON.parse(result));
            }
        });
    }
});

module.exports = router;

