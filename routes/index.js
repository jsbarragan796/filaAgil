"use strict";
require("dotenv").config();
var express = require("express");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
var router = new express.Router();

// Connection URL
const url = process.env.MLAB;

function findUsuario (query,db, callback) {
  const collection = db.collection("clientes_restaurantes");
  collection.find(query).toArray((err, docs) => {
    assert.equal(err, null);
    console.log("Found" + docs.length + "urls");
    callback(docs);
  });
}

function getUsuario (query,callback) {
  MongoClient.connect(url, (err, client) => {
    assert.equal(err, null);
    console.log("Connected");
    const db = client.db("filas_agiles");
    findUsuario(query,db, callback);
    client.close();
  });
}

/* GET home page. */
router.get("/usuario", (req, res) => {
  console.log(req.query.correo);
  getUsuario(
    { correo: req.query.correo,
      pass:req.query.pass},
    (usuario) => res.send(usuario)
  );
});

function find (db, callback) {
  const collection = db.collection("page_photos");
  collection.find({}).toArray((err, docs) => {
    assert.equal(err, null);
    console.log("Found" + docs.length + "urls");
    callback(docs);
  });
}

function getPhotos(callback) {
  MongoClient.connect(url, (err, client) => {
    assert.equal(err, null);
    console.log("Connected");
    const db = client.db("filas_agiles");
    find(db, callback);
    client.close();
  });
}

function getIngredients(callback) {
  // conexion a la base de datos
  MongoClient.connect(url)
    .then((client) => { //una vez conectado
      const db = client.db("filas_agiles"); //pide la base de datos
      const collection = db.collection("ingredientes"); //pide la collecion
      collection.find({}).toArray() //pide todos los ingredientes y cuando los convierte a una lista
        .then(callback)//responde al cliente con ellos
        .catch((excep) => {
          console.log("Hubo un error en array:"); //si hay un problema con pasar los datos a arreglo 
          console.log(excep.message); //lo despliega
        });
      client.close(); //cierra la conexion
    })
    .catch((excep) => {
      console.log("Hubo un error en conexion:");  //si hay un problema con la conexion
      console.log(excep.message); //lo despliega
    });
}

/* GET home page. */
router.get("/images", (req, res) => {
  console.log("inicio");
  getPhotos((pagePhotos) => res.send(pagePhotos));
});

// GET ingredientes de Mongo
router.get("/ingredientes", (req, res) => {
  console.log("se van a entregar ingredientes");
  getIngredients((datos)=>res.send(datos));
});

module.exports = router;
