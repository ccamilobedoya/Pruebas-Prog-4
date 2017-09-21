var math = require('mathjs');
var async = require('async');

function calculateRelativeSize (computableArray, cb) {

  //var computableArray = [[[18,3],[18,3],[25,3],[31,3],[37,3],[82,3],[82,4],[87,4],[89,4],[230,10],[85,3],[87,3],[558,10]],
  //[[7],[12],[10],[12],[10],[12],[12],[12],[12],[8],[8],[8],[20],[14],[18],[12]]];
  // var aux;
  // var column = [];
  // async.forEachOf(computableArray,function(data,i,callback){
  //   aux = computableArray[i];
  //   calculateDivision(computableArray[i], function(result){
  //     aux = result;
  //     column[i] = aux;
  //     callback();
  //   });
  // }, function(err) {
  //   if (err){} else{
  //
  //   }
  // });

  var sum1 = 0;
  var sum2 = 0;
  var avg = 0;
  var variance = 0;
  var stdDev = 0;
  var results = {};
  calculateDivision(computableArray, function(dividedArray){
    async.each(dividedArray, function(baseItem1, callback1){
      sum1 += math.log(baseItem1);
      callback1();
    }, function(err){
      if (!err) {
        avg = sum1 / dividedArray.length;
        async.each(dividedArray, function(baseItem2, callback2){
          sum2 += math.pow((math.log(baseItem2) - avg), 2);
          callback2();
        }, function(err){
          if (!err) {
            variance = sum2 / (dividedArray.length -1);
            stdDev = math.sqrt(variance);
            results.vs = math.format(math.exp(avg - (2 * stdDev)), {notation: 'fixed', precision: 4});
            results.s = math.format(math.exp(avg - stdDev), {notation: 'fixed', precision: 4});
            results.m = math.format(math.exp(avg), {notation: 'fixed', precision: 4});
            results.l = math.format(math.exp(avg + stdDev), {notation: 'fixed', precision: 4});
            results.vl = math.format(math.exp(avg + (2 * stdDev)), {notation: 'fixed', precision: 4});
            cb(null, results);
          } else {
            cb('Error hallando la varianza');
          }
        });
      } else {
        cb('Error hallando el promedio');
      }
    });
  });
}

function calculateRelativeSizes (computableArrays, cb) {
  var results = []
  async.each(computableArrays, function(array, callback){
    calculateRelativeSize(array, function(err, info){
      if (!err) {
        results.push(info);
        callback();
      } else {
        cb(err);
      }
    });
  }, function(err){
    if (!err) {
      cb(null, results);
    } else {
      cb(err);
    }
  });
}


//funcion para calcular la division para calcular el LOC/method cuando se tienen dos columnas
function calculateDivision(data, callback){
  var result =[];
  for(i=0; i<data.length; i++){
    if (data[i][1]){
      result[i]=data[i][0]/data[i][1];
    } else {
      result[i]=data[i][0]/1;
    }
  }
  callback(result);
}

exports.calculateRelativeSize = calculateRelativeSize;
exports.calculateRelativeSizes = calculateRelativeSizes;
