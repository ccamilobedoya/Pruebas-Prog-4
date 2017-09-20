/******************************************************************/
/* Nombre:      Manejador de archivosv csv
/* Autor:       Cristian
/* Fecha:       20/09/17
/* Descripción: Ejecuta las funciones requeridas para extraer datos de los archivos .csv
/******************************************************************/

// Modulos
var parse = require('csv-parse');


function csvDataToArray(data, cb) {

  // Opciones para la conversion del csv
  var options = {
    auto_parse: true,
    columns: true
  };

  // Conversion del csv
  // Uso de libreria: http://csv.adaltas.com/parse/
  parse(data, options, function(err, output){
    if (err) {
      cb('Error al convertir los datos del csv');
    } else {
      cb(null, output);
    }
  });
}

// multipĺecsvdatatoparray

// Exports
exports.csvDataToArray = csvDataToArray;
