var query = require('./msql.js');

query.showCosMap("0316248", function(err, res){
    console.log(res);
});
