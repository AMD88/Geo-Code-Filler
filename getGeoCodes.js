var getAddress = require('./auth');
var update=require('./updateDB');
var config = require('./config');
var _ = require("underscore");
var keyIm = config.keys()
var keysExhausted = 0
//var results = null

exports.geoCodes = function(key, id){
  //console.log(id+"  "+key)
  console.log("geo code function reached000");

  new getAddress(id, key, callapi=function(gotAddress, key, id){
        //console.log(id+": "+key)
        console.log("geo code function reached");
        var lat = null
        var lon = null

        var googleMapsClient = require('@google/maps').createClient({
          key: key
        });

        googleMapsClient.geocode({
          address: gotAddress//'2050 Fair Oaks Ave, Pasadena, CA 91103, United States'//'Croods San Diego US, 1648 Front Street, San Diego, CA, US'//' Deanstone Place, Kollupitiya, Colombo,LK'//'HOME, aaa, bbb, Colombo, LK'//'Upper Chatham St, Colombo 00100'//'Kingsbury Hotel,Janadhipathi Mawatha, Colombo'//'No., 82 Srimath Anagarika Dharmapala Mawatha, Colombo 03 00300'//'aaa,bbb, Colombo,LK'//'60A Srimath Anagarika Dharmapala Mawatha, Colombo'
        }, function(err, response) {

          if (!err) {

            var results = response.json.results;

            //if(keysExhausted==0){

            //  response.json.status = "OVER_QUERY_LIMIT"
            //}


            console.log(id+": "+response.json.status);



            if(response.json.status == "OVER_QUERY_LIMIT" || response.json.status == "UNKNOWN_ERROR"){
              if(response.json.status == "OVER_QUERY_LIMIT"){
                keysExhausted = keysExhausted+1
              }
              if(keysExhausted != 2){

                if(key == keyIm[0]){
                  key = keyIm[1]
                }else{
                  key = keyIm[0]
                }
                callapi(gotAddress,key,id)
              }else if(keysExhausted == 2){
                console.log("Keys exhausted")
                process.exit()
              }

            }else if(response.json.status == "OK"){
              lat = results[0].geometry.location.lat;
              lon = results[0].geometry.location.lng;

              console.log(id+": "+lat+" "+lon);

              if (lat != null || lon != null) {
                googleMapsClient.timezone({location:[lat,lon]}, function(err, response) {

                    if (!err) {
                      var timezoneValue = response.json.timeZoneId;
                      console.log(id+": "+results[0].geometry.location_type);

                      if(results[0].geometry.location_type=="APPROXIMATE"||results[0].geometry.location_type=="RANGE_INTERPOLATED"){

                        //For exceptional scenario handling
                        var getCountry = results[0].address_components
                        var addressParts = gotAddress.split(",")

                        var filtered = _.filter(getCountry, function(Object){
                          return (Object.short_name==addressParts[(addressParts.length)-1].replace(/ /g,'')) && (Object.types[0]=='country')
                        });

                        if(filtered.length != 0){
                          console.log(id+": "+lat+" "+lon+" "+timezoneValue);
                          //new update(id,lat,lon,timezoneValue);
                        }

                      }
                  }
                //console.log(response);
                });
              }
              //console.log(results[0].geometry.location_type);
            }else if(response.json.status == "ZERO_RESULTS"){
                console.log(id+": No results returned for the given address")
            }

          }else{
            console.log("Error in geocoding: "+err);
          }
          //console.log(response);
        });


  })
  //return callback(null,null)
}

//geoCodes(keyIm[1],'10001318')
//ROOFTOP//10004073
//geoCodes.exports=geoCodes;
//module.exports = geoCodes
