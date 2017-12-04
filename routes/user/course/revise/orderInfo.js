var utils = require('../../../../utils');
var orderInfo = {};

orderInfo.getOrderInfo = function(req, res, next){

    if(req.session.profile){
            
        var courseResult = res.locals.courseResult;
        var orderInfo = [];

        //compulsory
        for(var i = 0; i<courseResult.length; i++){
            for(var q = 0; q<courseResult[i].course.length; q++){
                var cosInfo = {
                    id: '',
                    code: '',
                    type: '',
                    complete: ''
                }
                cosInfo.id = courseResult[i].course[q].cn;
                cosInfo.code = courseResult[i].course[q].code;
                cosInfo.type = courseResult[i].course[q].type;
                if(courseResult[i].course[q].complete == true)
                    cosInfo.complete = true;
                else
                    cosInfo.complete = false;
                orderInfo.push(cosInfo);
            }
        }
        
        res.locals.orderInfo = orderInfo;        
        next();

    }

     else
         res.redirect('/');

}



exports.orderInfo = orderInfo;
