var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('./data.txt', 'utf8'));
//console.log(obj);
for(var i=0;i<obj.length;i++){
    for(var j=0;j<obj[i].carsOnImage.length; j++){
        obj[i].carsOnImage[j].angle = parseInt(obj[i].carsOnImage[j].angle) 
       obj[i].carsOnImage[j].distant = parseInt(obj[i].carsOnImage[j].distant) 
    }

}
setTimeout(function(){
		fs.writeFile("./data_.txt", JSON.stringify(obj), 'utf8', function (err) {
            if (err) 
                console.log(err);
                    

              console.log("The file was saved!");
                            }); 
	},2000);

            
    
