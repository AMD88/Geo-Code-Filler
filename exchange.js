var async = require('async')
var fs = require('fs');
var config = require('./config');
var start = require('./getGeoCodes');
var status=require('./maintain');

var stat =  status;

var key = config.keys();

stat.filter(func = function (err,recObject){
if(err){

}
if(recObject && recObject.length){
	console.log(recObject);
//console.log(recObject+"shdgsajg")


//var out = data()
//console.log((typeof recObject)+"  type of object");
//console.log(recObject[0].id);
for(i=0;i<recObject.length;i=i+1){
console.log(recObject[i].attempts+"  ii "+recObject[i].status);
start.geoCodes(key,recObject[i].id,function(err,status){
	if(!err){
	 							stat.filter(func)
	 						}
})
// stat.update(key[0],recObject[i].id,function(err,status){
// 						console.log("test1---");
// 						if(!err){
// 							stat.filter(func)
// 						}
// 						//callback(null,[])
// 					});
		//console.log(recObject[i].id+": "+recObject[attributename]);
}
}

});

//data=JSON.stringify(data);

//console.log(data);
//console.log(data[0]+data[1]+"ioioio");
//for(var attributename in data){
  //  console.log(attributename+": "+data[attributename]);
//}
//}
function writeBack(Object){
fs.writeFile(fileName, JSON.stringify(Object,null,2), function (err) {
      if (err) return console.log(err);
      //console.log(JSON.stringify(file));
      //console.log('writing to ');
    });
}
