/******************************************************************/
/* Nombre:      Index
/* Autor:       Cristian
/* Fecha:       19/08/17
/* Descripción: Es el modulo de inicio, contiene las rutas de la aplicacion
/*              ademas el inicio del servidor
/******************************************************************/


// Constantes
const PORT = 8888;

// Modulos requeridos
var express = require('express');
var route = require('./routes/route');
var api = require('./routes/api');

// Variables
var app = express();

// Motor de plantillas html
app.set('views', './views');
app.set('view engine', 'pug');

// Uso de rutas
app.use('/rs', route);
app.use('/rs/api', api);
// Esta es la ruta por defecto, modificar cuando haya algun menu
app.use('/', route);

// Ruta para cargar archivos estaticos
app.use('/static', express.static(__dirname + '/public'));

// Inicio del servidor
app.listen(PORT, function () {
  console.log('Listening on localhost:' + PORT);
});
