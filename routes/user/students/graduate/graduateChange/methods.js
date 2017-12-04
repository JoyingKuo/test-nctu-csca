var cards = require('./cardType').cardset;
var query = require('../../../../../db/msql');
var Compulsory = cards.Compulsory;
var Core = cards.Core;
var SecondaryCore = cards.SecondaryCore;
var methods = {};


//:{"cosname":{"id":"計算機圖學概論"},"pre":{"sourceLaneId":"副核心與他組核心"},

methods.insertToDB = function(req, res, next){

    let cardData = req.body.check;
    let cardCode = cardData.code.cardId;
    let cardTarget = cardData.next.targetLaneId
    let cardIni = cardData.pre.sourceLaneId
    let studentId = res.locals.studentId;
    query.insertCosMotion(studentId, cardCode, cardIni, cardTarget);
    next();
}

methods.checkCard = function(req, res){

    let cardData = req.body.check;
    console.log(cardData);
    let cardName = cardData.cosname.id;
    let cardCode = cardData.code.cardId;
    let cardType = cardData.type.type;
    let cardTarget = cardData.next.targetLaneId
    let studentId = req.profile[0].student_id;
    let theCard;

    switch(cardTarget){
        case "共同必修":
            theCard = new Compulsory(cardCode, cardType, studentId);
            break;
        case "核心課程":
            theCard = new Core(cardCode, cardType, studentId);
            break;
        case "副核心與他組核心":
            theCard = new SecondaryCore(cardCode, cardType, studentId);
            break;
        default:
            theCard = new Compulsory(cardCode, cardType);
            break;
    }
    

    let checkResult = { check:{ flag:'', reason: [] } };
    checkResult.check.reason = null;
    theCard.check(function(flag){
        if(flag)
            checkResult.check.flag = true;
        else            
            checkResult.check.flag = false;
        res.json(checkResult);
    });
    
}  


exports.method = methods;
