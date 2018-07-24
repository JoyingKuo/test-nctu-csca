const query = require('../../../../db/msql');
const groupBMap = require('./groupBMap');
const weightedUF = require('./weightedUF'); 

function getMap(){
    query.ShowUserPartScore("0312512", "必修", function(err, pass){
        
        var pas = JSON.parse(pass);
       // console.log(pas);
        var Pass = [];
        //var temp = "數位電路實驗";
       // var index = temp.indexOf("(");
       // console.log(index);
       // var reg = temp.substring(0, index);
        //console.log(reg);
        for(let i = 0; i < pas.length; i++){
            if(pas[i].cos_cname.indexOf("(") > 0){
                var index = pas[i].cos_cname.indexOf("(");
                pas[i].cos_cname = pas[i].cos_cname.substring(0, index);
            }
            Pass[pas[i].cos_cname] = true;
        }
       //console.log(Pass);
        query.ShowCosGroup("0312512", function(err, group){

            let uf = new weightedUF(group); // init weightedUF
            let rules = getRule(pass, group);
            for(let i = 0; i < rules.length; i++){
                for(let key in rules[i]){
                    for(let j = 0; j < rules[i][key].length; j++){
//                        console.log(key + " : " + rules[i][key][j]);
                        
                        if(Pass[rules[i][key][j]] == true)
                            uf.union(key, rules[i][key][j]);
                        
                    }
                }
            }
        //   uf.printRootArray();
            uf.getRoot("演算法概論");
            uf.connected("計算機概論與程式設計","計算機網路概論");
            uf.connected("數位電路設計", "計算機組織");
        });
    });
}

function getName(pass, group){
    pass = JSON.parse(pass);
    group = JSON.parse(group);
    let passName = [];
    for(let i = 0; i < pass.length; i++){ // find the correct name
        for(let j = 0; j < group.length; j++){
            for(let k = 0; k < group[j].cos_codes.length; k++){
                if(pass[i].cos_code === group[j].cos_codes[k]){
                    passName.push(group[j].cos_cname);
                    break;
                }
            }
        }
    }
    //console.log(passName);
    return passName;
}

function getRule(pass, group){
    groupB = groupBMap(); // get all possible paths
    passName = getName(pass, group);
    let rules = [];
    for(let i = 0; i < passName.length; i++){
        if(passName[i] in groupB){
            let rule = {};
            rule[passName[i]] = groupB[passName[i]];
            rules.push(rule);
        }
    }
    return rules;
}

getMap();
