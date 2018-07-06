const query = require('../../../../db/msql');
const groupBMap = require('./groupBMap');

class weightedUF {
    constructor(group){
        this.root = [];
        this.size = [];
        group = JSON.parse(group);
       // console.log(group);
        for(let i = 0; i < group.length; i++){
            this.root[group[i].cos_cname] = group[i].cos_cname;
            this.size[group[i].cos_cname] = 1;
        }
    }

    findRoot(element){
        let i = this.root[element];
        while(i != this.root[i]){
            this.root[i] = this.root[this.root[i]]; // Path Compression, point to grandparents
            i = this.root[i];
        }
        return i;
    }

    printSizeArray(){
        let key;
        for(key in this.size){
            console.log(key + " : " + this.size[key]);
        }
    }

    getSize(key){
        console.log(key + " : " + this.size[key]);
    }

    getRoot(key){
        console.log(key + " : " + this.findRoot(key));
    }

    printRootArray(){
        let key;
        for(key in this.root){
            console.log(key + " : " + this.root[key]);
        }
    }

    connected(x, y){
        if(this.findRoot(x) === this.findRoot(y))
            console.log(x + " and " + y + " connected");
        else
            console.log(x + " and " + y + " not connected");
    }

    union(x, y){
        let i = this.findRoot(x);
        let j = this.findRoot(y);
        if(i === j)
            return;
        //if(this.size[i] < this.size[j]){
            this.root[j] = i;
            this.size[i] += this.size[j];
        //}
        //else{
        //    this.root[j] = i;
        //    this.size[i] += this.size[j];
        //}
    }
}

/*query.Group("0312512", function(err, res){
    let test = new weightedUF(res);
    console.log(test);
    let path = groupBMap103();
    //test.union("微積分(一)", "微積分(二)");
    for(let i = 0; i < path.length; i++){
//        console.log(i + ": " + path[i][0] + path[i][1]);
        test.union(path[i][0],path[i][1]);
  //      test.printRootArray();
    }
//    test.printRootArray();
    
});*/

module.exports = weightedUF;
