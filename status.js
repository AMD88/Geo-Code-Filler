var fs = require('fs');
var _ = require("underscore");
var fileName = './ids.json';

//filter('./ids.json');
//var obj;
function filter(fileName, callback){
  //var data=fs.readFileSync(fileName,'utf8');
fs.readFileSync(fileName, 'utf8', function (err, data) {
  if (err){throw err;}
  data = JSON.parse(data);
  //console.log(data);

var filtered = _.filter(data,function(Object){
//console.log(Object.status);
if(Object.status==1||Object.status==2){
  //console.log("kkkk");
    Object.attempts+=1;
    //console.log(Object+"uiuiui");
  /*  fs.writeFile(fileName, JSON.stringify(Object,null,2), function (err) {
      if (err) return console.log(err);
      //console.log(JSON.stringify(file));
      //console.log('writing to ');
    });*/
  }

    return ((Object.status==1)&&Object.attempts<4);
});

  callback(filtered);
});
}

//filter(fileName);

//var filtered = _.where(users, {user: "a"});
//file = JSON.parse(file);
//console.log(typeof file);
//file=JSON.stringify(file);
//file1 = JSON.parse(file);
//console.log(file1+"kkkkkkkkkk");
//console.log(file[1].id);

function modify(fileName,id,statusID){
  //console.log("jkjk");
var index=-1;
var file = require(fileName);
_.each(file, function(data, idx) {
  //console.log(data.id+"uuuu");
   if (_.isEqual(data.id, id)) {
     data.status=statusID;
     fs.writeFile(fileName, JSON.stringify(file,null,2), function (err) {
       if (err) return console.log(err);
       //console.log(JSON.stringify(file));
       //console.log('writing to ');
     });
      index = idx;
      //console.log(data.status+"ppp");
      return;
   }
});
}

//modify(fileName,"09000007",78);
exports.filter=filter;
exports.modify=modify;
/*
module.exports=filter;
module.exports=modify;
*/
//console.log(typeof file1);
//file.id['09000009'] = 90;


/*fs.writeFile(fileName, JSON.stringify(file,null,2), function (err) {
  if (err) return console.log(err);
  //console.log(JSON.stringify(file));
  console.log('writing to ');
});

*/
