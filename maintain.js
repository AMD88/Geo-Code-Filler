var log = require('./logger');
//var start = require('./getGeoCodes');
var start = require('./getGeoCodes');
var logger = new log();

//console.log(start);


var wrap = (function wrapFunc() {
    var self = {};
    var pub = {};

    self.connect = function (callback){
    console.log("dddd");
    var MongoClient = require("mongodb").MongoClient;
    var mutProDbLink = 'mongodb://127.0.0.1:27017/geoencoder';



    logger.info('connecting to database...')
    MongoClient.connect( mutProDbLink, function(err, db) {

     	if (err) {
    	//	console.log(err);
      logger.err(err);
      //log(err);

     	} else {
          //console.log(db);

          logger.info("database connected");
          var collection = db.collection('description');



          //return collection;
          callback(collection);
        //  db.close();


          // collection.insert([id1], function (err, result) {
          //   if (err) {
          //     //console.log(err);
          //     logger.err(err);
          //
          //   } else {
          //     console.log(result);
          //     logger.info('Data is successfully inserted to the database mongodb');
          //     //console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
          //   }
          //   //Close connection
          //   db.close();
          // });


    	}
    });
    }




    pub.filter = function(callback) {
    self.connect(
      function(collection){
          collection.find({'status': 1, 'attempts': { $lt: 10 }}).toArray(function(err, docs) {
            //console.log(docs);
            if(err){
              logger.err(err);
              return callback(err);
            }
            else{
              //console.log(docs);
              return callback(null,docs)
            }
         });
      }
    );
    console.log('function ended');
    }

    pub.update = function (id){
      self.connect(function(collection){
        collection.update({"id": id}, {$inc: {"attempts": 1}}, function (err, numUpdated) {
          if (err) {
            logger.err(err);
            //return callback(err);
          }else {
            console.log(numUpdated + "id type");
            console.log("KEY:"+ key +" ID:"+id);
            //new start(key,id);
          //  start.geoCodes(key,id)
            return callback(null,null)
          }
        });
      });
    }

    pub.changeStatus = function(id, statusID,callback){
      console.log('modify function');
     self.connect(
       function(collection){
         collection.update({'id': id},{$set:{'status': statusID}}, function (err, numUpdated) {
           if (err) {
             logger.err(err);
             return callback(err);
           }else {
             console.log(statusID+" status");
               return callback(null,null)
          // console.log(numUpdated + "id type");
}
         })
       }
     );
    }
    return pub;
})();


//filter();
//connect();
//update('10229661');

//console.log(filter(function(){}));

//modify("10229661",600);
module.exports=wrap;
// exports.filter=filter;
// exports.update=update;
//exports.modify=modify;
