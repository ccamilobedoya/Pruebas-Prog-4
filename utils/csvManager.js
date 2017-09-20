/******************************************************************/
/* Nombre:      Manejador de archivosv csv
/* Autor:       Cristian
/* Fecha:       20/09/17
/* Descripción: Ejecuta las funciones requeridas para extraer datos de los archivos .csv
/******************************************************************/

// Modulos
var csv = require('csv-array');
var async = require('async');
var clone = require('clone');
var path = require('path');


// Con el path de un csv extrae los datos string y numericos, luego los guarda en un array
function csvFileToArray(csvPath, cb) {
  var filePath = path.resolve('./' + csvPath.path);
  var array = [];
  // Conversion del csv
  // Uso de libreria: https://www.npmjs.com/package/csv-array
  csv.parseCSV(csvPath, function(csvData){

    async.each(csvData, function(obj, callback){

      var row = [];
      async.each(obj, function(singleData, callback2){

        var integerData;
        integerData = clone(singleData);
        var integerDataInt = parseInt(integerData, 10);

        if (isNaN(integerDataInt)) {
          row.push(singleData)
          callback2();
        } else {
          if (integerDataInt > 0) {
            row.push(integerDataInt)
            callback2();
          } else {
            callback2('Algun dato no es valido');
          }
        }
      }, function(err){
        if (err){
          console.log('Error tomando datos simples');
          cb('Hay un error en los datos del archivo');
        } else {
          array.push(row);
          callback();
        }
      });

    }, function(err){
      if (err){
        console.log('Error tomando vector de datos');
        cb('Hay un error en los datos del archivo');
      } else {
        cb(null, array);
      }
    });
  }, false);
}

// Retorna solo los valores numericos en forma de array
function getArrayOfComputableData (dataArray, cb) {
  array = [];
  async.each(dataArray, function(individualArray, callback){
    pairArray = [];
    async.each(individualArray, function(singleData, callback2){
      if (!isNaN(parseInt(singleData, 10))) {
        pairArray.push(singleData);
        callback2();
      } else {
        callback2();
      }
    }, function(err){
      if (err) {
        cb('Error tomando valores numericos computables');
      } else {
        if (pairArray && pairArray.length) {
          array.push(pairArray);
          callback();
        } else {
          callback();
        }
      }
    });

  }, function(err){
    if (err) {
      cb('Error tomando valores numericos computables');
    } else {
      cb(null, array);
    }
  });
}

function getArrayDataFromMultipleCsvFiles (objectWithPaths, cb) {
  var data = [];
  async.each(objectWithPaths, function(csvFile, callback){
    csvFileToArray(csvFile.path, function(err, csvData) {
      if (err){
        cb('Error tomando datos de multiples csv');
      } else {
        data.push(csvData);
        callback();
      }
    });
  }, function(err){
    if (err) {
      cb('Error tomando datos de multiples csv');
    } else {
      cb(null, data);
    }
  });
}

function getArrayOfComputableDataFromMultipleArrayData (objectWithArray, cb) {
  var data = [];
  async.each(objectWithArray, function(array, callback){
    getArrayOfComputableData(array, function(err, singleArray) {
      if (err){
        cb('Error tomando datos de multiples array de datos');
      } else {
        data.push(singleArray);
        callback();
      }
    });
  }, function(err){
    if (err) {
      cb('Error tomando datos de multiples array de datos');
    } else {
      cb(null, data);
    }
  });
}


// Exports
exports.csvFileToArray = csvFileToArray;
exports.getArrayOfComputableData = getArrayOfComputableData;
exports.getArrayDataFromMultipleCsvFiles = getArrayDataFromMultipleCsvFiles;
exports.getArrayOfComputableDataFromMultipleArrayData = getArrayOfComputableDataFromMultipleArrayData;
