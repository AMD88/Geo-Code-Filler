function Logger(){
  const resError = 'error';
  const resInfo = 'info';

  function log(logType,logMsg){
    var finalLogMsg = '';

    finalLogMsg += ('[ '+logType + ' ] ');
    finalLogMsg += logMsg;

    if( logType == resError ) {
      console.error(finalLogMsg);
    }
    else {
      console.log(finalLogMsg);
    }

  }

  this.info = function( msg ) {
    log(resInfo , msg );
  }

  this.err = function( msg ){
    log(resError , msg );
  }

}

module.exports=Logger;
