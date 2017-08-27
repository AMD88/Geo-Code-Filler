var request = require('request');
var btoa = require('btoa');
var status=require('./maintain');
var config = require('./config');

var fileName=config.fileName();
var client=config.client();
var client_id=client[0];
var client_secret=client[1];
//console.log(searchAddress);
//process.exit();


var addressNeeded = null;

//Lets configure and request
function searchAddress(id, key,callback){
  request({
      url: 'https://myurl/oauth/token', //URL to hit
    //  qs: {from: 'blog example', time: +new Date()}, //Query string data
      method: 'POST',
      headers: {

          'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
          'Accept': 'application/x-www-form-urlencoded',
          'Content-Type': 'application/json'


      },
      body: "client_id="+client_id+"&scope=trust&grant_type=client_credentials"
  }, function(error, response, body){

    if(body!=null){
      var jbody=JSON.parse(body);
    //  console.log(body);
      if(error) {
          console.log(error);
      }

      else if(jbody.hasOwnProperty("access_token")){

        var resBody=JSON.parse(body);
        var token=resBody.access_token;
         // console.log(response.statusCode,token);




  var obj={
      url:'https://myurl/operator/service/accounts/'+id,
      method :'GET',
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer '+token
      }

  };


  request(obj,function(error, response, body){
      if(error) {

        console.log(error);
      } else {
      console.log('auth was reached');

        var res=JSON.parse(body);
        if(res.addresses!=null && (0 in res.addresses)){
          //console.log(res.addresses)
          if(res.addresses[0].hasOwnProperty('addressLineOne') && res.addresses[0].addressLineOne != null){
            addressNeeded=res.addresses[0].addressLineOne+', '
          }
          if(res.addresses[0].hasOwnProperty('addressLineTwo') && res.addresses[0].addressLineTwo != null){
            addressNeeded=addressNeeded+res.addresses[0].addressLineTwo+', '
          }
          if(res.addresses[0].hasOwnProperty('city') && res.addresses[0].city != null){
            addressNeeded=addressNeeded+res.addresses[0].city+', '
          }
          if(res.addresses[0].hasOwnProperty('state') && res.addresses[0].state != null){
            if((res.addresses[0].state != "string")){
              addressNeeded=addressNeeded+res.addresses[0].state+', '
            }
          }

          if(res.addresses[0].hasOwnProperty('countryCode') && res.addresses[0].countryCode != null){
            addressNeeded=addressNeeded+res.addresses[0].countryCode
          }
          //addressNeeded=res.addresses[0].addressLineOne+', '+res.addresses[0].addressLineTwo+', '+res.addresses[0].city+', '+res.addresses[0].state+', '+res.addresses[0].countryCode;
          console.log(id+": "+addressNeeded)
          callback(addressNeeded,key,id)

        }else{

          //status.modify(id,2);
          console.log('Printing status object ......');
        //  console.log(status);
          status.changeStatus(id,2,function(){
            status.update(id)
          });
          console.log(id+": No address found");

        }

      }
  }

  );
}else {
  //console.log(body.code);
  if(jbody.hasOwnProperty('code')){
    console.log(jbody.description);
  }
  else{
    console.log("Error from operator api");
  }
}
  }});

}

//auth("09000008")
//console.log(searchAddress("10262570"))
module.exports = searchAddress
