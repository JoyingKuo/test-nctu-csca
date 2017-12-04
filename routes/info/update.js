var update = {};


update.getUpdate = function(req, res, next){
    
    var msg = [];
    var content = '抵免課程算一次';
    msg.push(content);
    content = '物理抵免多的一學分放至專業選修';
    msg.push(content);
    content = '普通生物學放至必修';
    msg.push(content);
    content = '畢業預審表加印當其課程';
    msg.push(content);
    content = '抵免課程將服學及藝文賞析移至服學及藝文賞析項目';
    msg.push(content);
    content = '通識及其他選修學分計算錯誤更正';
    msg.push(content);
    content = '圖書館學概論也可算至服務學習';
    msg.push(content);
    content = '可當通識之其他選修課程的向度補上';
    msg.push(content);

    res.locals.msg = msg;
    next();

}


exports.update = update;
