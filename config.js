keyArray = ['AIzaSyBetHoSt0llD0qxON9rbMTOhORtGpD8oLg','AIzaSyBWHjvo3spcpXKFF5VVvReDdyhdjpYDMKs'];

var fileName="./ids.json"; //Name of input file
var client_credentials=["cake-connect","$2a$10$tY164FngI7QnkLqHhJcr/O2Jw3Mtbvvamv/dk3TwCIHVRKsOk7rT6"];

exports.keys = function () {
  return keyArray;
};

exports.fileName = function () {
  return fileName;
};

exports.client=function(){
  return client_credentials;
}
