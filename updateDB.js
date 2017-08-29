var request = require('request');
var btoa = require('btoa');
var status=require('./maintain');
var config = require('./config');

var fileName=config.fileName();
var client=config.client();
var client_id=client[0];
var client_secret=client[1];

//Lets configure and request

  var update=function(id,lat,lon,timeZone){
    request({
      url: 'https://tst1-apis.leapset.com:8443/oauth/token', //URL to hit
      method: 'POST',
      headers: {

        'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
                         'Accept': 'application/x-www-form-urlencoded',
                         'Content-Type': 'application/json'


      },
      body: "client_id="+client_id+"&scope=trust&grant_type=client_credentials"
  }, function(error, response, body){
      if(error) {
          console.log(error);
      } else {
        var resBody=JSON.parse(body);
        var token=resBody.access_token;

          //console.log(response.statusCode,token);




  var obj={
      url:'https://tst1-apis.leapset.com:8443/operator/service/accounts/'+id,
      method :'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer '+token,

      },
        json:{

            "accountId": id,
            "lat": lat,
            "lng": lon,
            "timezone":timeZone

        }


  };
  request(obj,function(error, response, body){

      if(error) {
        console.log(error);
      } else {

       console.log(id+": "+response.statusCode+" received in updating database");

       if(response.statusCode==200){
          console.log(id+": 200 Database successfully updated");
          status.modify(id,200);
       }
       else if (response.statusCode==500) {
          console.log(id+": 500 No account found with given id");
          status.modify(id,200);//***************
       }
       else{
          console.log(id+": Could not update database for account. Trying later");
          status.modify(id,1);
       }
      }
  }

  );
  }
  });
}
//update('10001318',10,20,'us/ca');
module.exports=update;
