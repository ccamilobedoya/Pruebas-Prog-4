var math = require('mathjs');
var async = require('async');

function calculateRelativeSize (computableArray) {

  //var array = [[[18,3],[18,3],[25,3],[31,3],[37,3],[82,3],[82,4],[87,4],[89,4],[230,10],[85,3],[87,3],[558,10]],
  //[[7],[12],[10],[12],[10],[12],[12],[12],[12],[8],[8],[8],[20],[14],[18],[12]]];

  var aux;
  var column = [];
  async.forEachOf(computableArray,function(data,i,callback){
    console.log(i);
    aux = computableArray[i];
    if(computableArray[i][0].length==2){
      calculateDivision(column, function(result){
        aux = result;
      });
    }
    column[i] = aux;
    console.log(column);
    callback();
    // async.forEachOf(column,function(data,j,callback){
    //
    // });
  });
}

//funcion para calcular la division para calcular el LOC/method cuando se tienen dos columnas
function calculateDivision(data, callback){
  var result =[];
  for(i=0; i<data.length; i++){
      result[i]=data[i][0]/data[i][1];
  }
  callback(result);
}

exports.calculateRelativeSize = calculateRelativeSize;
