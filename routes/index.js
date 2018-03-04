"use strict";
require("dotenv").config();
var express = require("express");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
var router = new express.Router();

// Connection URL
const url = process.env.MLAB;

/*encuentra un usuario segun las credenciales*/
function findUsuario (query, db, callback) {
  const collection = db.collection("clientes_restaurantes");
  collection.findOne(query, (err, docs) => {
    assert.equal(err, null); //se revisan que no se den errores.
    console.log("Found " + JSON.stringify(docs) + " urls");
    if (docs === null) docs = { error: "credenciales incorrectas" }; //sino se encuentra el usuario, se responde con un error
    callback(docs); //se responde con el usuario
  });
}

/* Permite encontrar a un usuario en la base de datos*/
function getUsuario (query, callback) {
  MongoClient.connect(url, (err, client) => { // conexion a la base de datos
    assert.equal(err, null);
    console.log("Connected");
    const db = client.db("filas_agiles"); //se pide la collecion de los usuarios
    findUsuario(query, db, callback); //se busca al usuario en la base de datos
    client.close(); //se cierra collecion
  });
}

/* GET home page. */
router.get("/usuario", (req, res) => {
  getUsuario(
    {
      correo: req.query.correo,     //crea el query segun los datos que llegan en el req
      pass: req.query.pass
    },
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

function getPhotos (callback) {
  MongoClient.connect(url, (err, client) => {
    assert.equal(err, null);
    console.log("Connected");
    const db = client.db("filas_agiles");
    find(db, callback);
    client.close();
  });
}

function getIngredients (callback) {
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
      console.log("Hubo un error en conexion:"); //si hay un problema con la conexion
      console.log(excep.message); //lo despliega
    });
}

function insertUsuario(query, responder) {
  const correo = { correo: query.correo };

  getUsuario(correo, (resultado) => {
    if (typeof resultado.error !== "undefined") {
      MongoClient.connect(url)
        .then((client) => {
          const db = client.db("filas_agiles"); //pide la base de datos
          const collection = db.collection("clientes_restaurantes"); //pide la collecion
          collection.insertOne(query)
            .then( (data) => responder({datos:data,mensaje:"agregado exitoso!"}))
            .catch((error) => console.log("se recibio de error:\n" + error.message));
        })
        .catch((error) => console.log("se recibio de error:\n" + error.message));
    } else {
      const siExiste = { error: "ya existe este usuario" };
      responder(siExiste);
    }
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
  getIngredients((datos) => res.send(datos));
});

router.post("/usuario", (req, res) => {
  insertUsuario(req.body, (mensaje) => res.send(mensaje));
});

function addPedido (pedido, db, callback) {
  const collection = db.collection("pedidos");
  collection.insert(pedido).then(() =>
    callback("insertado con exito")
  );
}

function addPedidos (pedido, callback) {
  MongoClient.connect(url, (err, client) => {
    assert.equal(err, null);
    console.log("Connected");
    const db = client.db("filas_agiles");
    addPedido(pedido, db, callback);
    client.close();
  });
}


router.post("/addpedido", function (req, res) {
  console.log(req.body);
  addPedidos(req.body, (mensaje) => res.send(mensaje));
});

module.exports = router;
