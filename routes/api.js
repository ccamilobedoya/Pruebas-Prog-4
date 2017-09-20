/******************************************************************/
/* Nombre:      Ruta de la api de conteo de linea
/* Autor:       Cristian
/* Fecha:       20/08/17
/* Descripción: Ejecuta las funciones necesarios de acuerdo a la ruta
/******************************************************************/

var express = require('express');
var fileManager = require('../utils/fileManager');
var csvManager = require('../utils/csvManager');
var router = express.Router();


// Se ejecuta siempre que se accede a la ruta /loc/api
// No le importa ni el metodo ni el resto de la url
router.use(function(req, res, next) {
  console.log('Se accedio a la api del RS\n' +
    'Se dirige a: '+ req.url + '\nMetodo: ' + req.method);
  // Siga con las rutas normalmente
  next();
});

// Solo se necesita recibir archivos
// Post para subir, con ruta /loc/api/upload
router.post('/upload', function(req, res) {
  fileManager.saveFiles(req, function(err, results) {
    if (err) {
      res.render('ErrorPage', {error: err});
    } else {
      //console.log(results);
      csvManager.getArrayDataFromMultipleCsvFiles(results, function(err, completeArray){
        if (err) {
          res.render('ErrorPage', {error: err});
        } else {
          csvManager.getArrayOfComputableDataFromMultipleArrayData(completeArray, function(err, computableArray){
            if (err) {
              res.render('ErrorPage', {error: err});
            } else {
              console.log(computableArray);
            }
          });
        }
      });
    }
  });
});


// Exporta todo lo relacionado a la variable router
module.exports = router;
