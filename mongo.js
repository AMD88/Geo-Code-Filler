var log = require('./logger');

var MongoClient = require("mongodb").MongoClient;
var mutProDbLink = 'mongodb://127.0.0.1:27017/geoencoder';

var logger = new log();

/*var Logger1 = log.Logger();
var logger = new Logger1();*/
/*function log(logLine){
  console.log(logLine);
}
*/

//console.log("connecting to database...")
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
    //  var id1 = {"id": "10229661","status": 1,"attempts": 0};
      collection.insert([{"id": "10228035","status": 1,"attempts": 0},
      {"id": "10228086","status": 1,"attempts": 0},
      {"id": "10228115","status": 1,"attempts": 0},
      {"id": "10228150","status": 1,"attempts": 0},
      {"id": "10228195","status": 1,"attempts": 0},
      {"id": "10228214","status": 1,"attempts": 0},
      {"id": "10228245","status": 1,"attempts": 0},
      {"id": "10228271","status": 1,"attempts": 0},
      {"id": "10228305","status": 1,"attempts": 0},
      {"id": "10228348","status": 1,"attempts": 0},
      {"id": "10228407","status": 1,"attempts": 0},
      {"id": "10228447","status": 1,"attempts": 0},
      {"id": "10228466","status": 1,"attempts": 0},
      {"id": "10228497","status": 1,"attempts": 0},
      {"id": "10228572","status": 1,"attempts": 0},
      {"id": "10228602","status": 1,"attempts": 0},
      {"id": "10228623","status": 1,"attempts": 0},
      {"id": "10228646","status": 1,"attempts": 0},
      {"id": "10228705","status": 1,"attempts": 0},
      {"id": "10228730","status": 1,"attempts": 0},
      {"id": "10228768","status": 1,"attempts": 0},
      {"id": "10228809","status": 1,"attempts": 0},
      {"id": "10228838","status": 1,"attempts": 0},
      {"id": "10228878","status": 1,"attempts": 0},
      {"id": "10228930","status": 1,"attempts": 0},
      {"id": "10228975","status": 1,"attempts": 0},
      {"id": "10229010","status": 1,"attempts": 0},
      {"id": "10229083","status": 1,"attempts": 0},
      {"id": "10229116","status": 1,"attempts": 0},
      {"id": "10229139","status": 1,"attempts": 0},
      {"id": "10229168","status": 1,"attempts": 0},
      {"id": "10229208","status": 1,"attempts": 0},
      {"id": "10229273","status": 1,"attempts": 0},
      {"id": "10229325","status": 1,"attempts": 0},
      {"id": "10229384","status": 1,"attempts": 0},
      {"id": "10229450","status": 1,"attempts": 0},
      {"id": "10229474","status": 1,"attempts": 0},
      {"id": "10229500","status": 1,"attempts": 0},
      {"id": "10229544","status": 1,"attempts": 0},
      {"id": "10229580","status": 1,"attempts": 0},
      {"id": "10229601","status": 1,"attempts": 0},
      {"id": "10229661","status": 1,"attempts": 0}], function (err, result) {
        if (err) {
          //console.log(err);
          logger.err(err);

        } else {
          console.log(result);
          logger.info('Data is successfully inserted to the database mongodb');
          //console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
        }
        //Close connection
        db.close();
      });


	}
});
