var express  = require('express');
var router = express.Router();

var query = require('../../../../db/msql');
var utils = require('../../../../utils');

var csrf = require('csurf');
var csrfProtection = csrf();

router.get('/students/courseMap/groupB', csrfProtection, function(req, res){

    if(req.session.profile){

    var map = [];
    var relation1 = [];
    relation1.push('物理(一)');
    relation1.push('物理(二)');
    map.push(relation1);
    var relation2 = [];
    relation2.push('化學(一)');
    relation2.push('化學(二)');
    map.push(relation2);
    var relation3 = [];
    relation3.push('普通生物(一)');
    relation3.push('普通生物(二)');
    map.push(relation3);
    var relation4 = [];
    relation4.push('微積分(一)');
    relation4.push('微積分(二)');
    map.push(relation4);
    var relation5 = [];
    relation5.push('微積分(二)');
    relation5.push('機率');
    map.push(relation5);
    var relation6 = [];
    relation6.push('線性代數');
    relation6.push('微積分(二)');
    map.push(relation6);
    var relation7 = [];
    relation7.push('計算機概論與程式設計');
    relation7.push('資料結構與物件導向程式設計');
    map.push(relation7);
    var relation8 = [];
    relation8.push('資料結構與物件導向程式設計');
    relation8.push('演算法概論');
    map.push(relation8);
    var relation9 = [];
    relation9.push('離散數學');
    relation9.push('演算法概論');
    map.push(relation9);
    var relation10 = [];
    relation10.push('離散數學');
    relation10.push('正規語言');
    map.push(relation10);
    var relation11 = [];
    relation11.push('正規語言');
    relation11.push('編譯器設計概論');
    map.push(relation11);
    var relation12 = [];
    relation12.push('演算法概論');
    relation12.push('基礎程式設計');
    map.push(relation12);
    var relation13 = [];
    relation13.push('基礎程式設計');
    relation13.push('資訊工程專題(一)');
    map.push(relation13);
    var relation14 = [];
    relation14.push('資訊工程專題(二)');
    relation14.push('資訊工程專題(二)');
    map.push(relation14);
    var relation15 = [];
    relation15.push('計算機概論與程式設計');
    relation15.push('作業系統概論');
    map.push(relation15);
    var relation16 = [];
    relation16.push('計算機概論與程式設計');
    relation16.push('數位電路設計');
    map.push(relation16);
    var relation17 = [];
    relation17.push('數位電路設計');
    relation17.push('計算機組織');
    map.push(relation17);
    var relation18 = [];
    relation18.push('計算機組織');
    relation18.push('微處理機系統實驗');
    map.push(relation18);
    var relation19 = [];
    relation19.push('計算機概論與程式設計');
    relation19.push('計算機網路概論');
    map.push(relation19);
    var relation20 = [];
    relation20.push('計算機概論與程式設計');
    relation20.push('資訊工程研討');
    map.push(relation20);
    console.log(map);
    res.send(map);
    }
});


module.exports = router;

