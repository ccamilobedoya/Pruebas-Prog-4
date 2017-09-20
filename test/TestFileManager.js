const fileManager = require('../utils/fileManager');
const chai = require('chai');
var path = require('path');
var textract = require('textract');

describe('El modulo Gestor de Archivos', () => {
  it('Deberia tener una funcion que guarde los archivos tipo texto temporalmente ', () => {
    chai.expect(fileManager.saveFiles).to.be.a('function');
  });
  it('Deberia tener una funcion que extrae el texto de los archivos', () => {
    chai.expect(fileManager.extractTextFromFiles).to.be.a('function');
  });

  // Hay que imitar un post ... aun no se como
  describe('En la funcion que guarda los archivos', function(){
    it('Los archivos que se reciben deben tener extension', () => {
        var file = [{path:'testObjects/noExtFile'}];
        fileManager.saveFiles(req, function(err, results){
          chai.expect(err).to.be.null;
        });
      });
  });

  describe('En la funcion para extraer texto de los archivos', function(){
    it('Los archivos no deben estar vacios', () => {
        var file = [{path:'testObjects/emptyFile.txt'}];
        fileManager.extractTextFromFiles(file, function(err, results){
          chai.expect(err).to.not.be.null;
    });
    it('Los datos subidos deben ser string', () => {
        var file = [{path:'../LOC/fileManager'}];
        fileManager.extractTextFromFiles(file, function(err, results){
          resultsTest = results;
          chai.expect(resultsTest).to.be.a('string');
        });
    });
   });
  });
});
