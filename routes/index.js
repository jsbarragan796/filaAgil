"use strict";
require("dotenv").config();
var express = require("express");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
var router = new express.Router();

// Connection URL
const url = process.env.MLAB;

/*encuentra un usuario segun las credenciales*/
function findUsuario(query, db, callback) {
  const collection = db.collection("clientes_restaurantes");
  collection.findOne(query, { fields: { _id: 0, pass: 0 } }, (err, docs) => {
    assert.equal(err, null); //se revisan que no se den errores.
    console.log("Found " + JSON.stringify(docs) + " urls");
    if (docs === null) docs = { error: "credenciales incorrectas" }; //sino se encuentra el usuario, se responde con un error
    callback(docs); //se responde con el usuario
  });
}

/* Permite encontrar a un usuario en la base de datos*/
function getUsuario(query, callback) {
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
      correo: req.query.correo, //crea el query segun los datos que llegan en el req
      pass: req.query.pass
    },
    (usuario) => res.send(usuario)
  );
});

function findPhoto(db, callback) {
  const collection = db.collection("page_photos");
  collection.findOne({}, ((err, docs) => {
    assert.equal(err, null);
    console.log("Found" + docs.length + "urls");
    callback(docs);
  }));
}

function getPhoto(callback) {
  MongoClient.connect(url, (err, client) => {
    assert.equal(err, null);
    console.log("Connected");
    const db = client.db("filas_agiles");
    findPhoto(db, callback);
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
            .then(() => responder({ mensaje: "agregado exitoso!" }))
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
  getPhoto((pagePhotos) => res.send(pagePhotos));
});

/* GET ingredientes de Mongo*/
router.get("/ingredientes", (req, res) => {
  console.log("se van a entregar ingredientes");
  getIngredients((datos) => res.send(datos));
});

router.post("/usuario", (req, res) => {
  insertUsuario(req.body, (mensaje) => res.send(mensaje));
});

function addPedido(pedido, db, callback) {
  const collection = db.collection("pedidos");
  collection.insert(pedido).then(() =>
    callback("insertado con exito")
  );
}

function addPedidos(pedido, callback) {
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

/* Inicio conexion coleccion  sucursales_restaurante. */
function encontrarSucursales(db, callback) {
  const collection = db.collection("sucursales_restaurante");
  // se excluye de la busqueda las contreñas de las sucursales
  collection.find({}, { fields: { pass: 0 } }).toArray((err, docs) => {
    assert.equal(err, null);
    console.log("Found" + docs.length + "urls");
    callback(docs);
  });
}

function getSucursal(sucursal, callback) {
  MongoClient.connect(url)
    .then((client) => {
      const db = client.db("filas_agiles");
      const collection = db.collection("sucursales_restaurante");

      collection.findOne(sucursal, { fields: { pass: 0 } })
        .then((docs) => {
          if (docs === null) docs = { error: "credenciales incorrectas" };
          callback(docs);
        });
      client.close();
    })
    .catch((error) => console.log("se encontro el error:\n" + error.message));
}

function getPedidosByUsuario(correo, callback) {
  MongoClient.connect(url)
    .then((client) => {
      const db = client.db("filas_agiles");
      const collection = db.collection("pedidos");

      collection.find({ "cliente.correo": correo }).toArray()
        .then((datos) => callback(datos));
      client.close();
    })
    .catch((error) => console.log("se encontro el error:\n" + error.message));
}

function getPedidosBySucursal(nombre, callback) {
  MongoClient.connect(url)
    .then((client) => {
      const db = client.db("filas_agiles");
      const collection = db.collection("pedidos");

      collection.find({ "sucursal.nombre": nombre }).toArray()
        .then((datos) => callback(datos));
      client.close();
    })
    .catch((error) => console.log("se encontro el error:\n" + error.message));
}


/*AUCH*/
function getIngredientesBySucursal(nombre, callback) {
  const ingredientes = {
    arroz: 0,
    grano: 0,
    carnes: 0,
    adiciones: 0,
    salsas: 0,
    extras: 0,
    bebidas: 0
  };

  MongoClient.connect(url)
    .then((client) => {
      const db = client.db("filas_agiles");
      const collection = db.collection("pedidos");

      let numArroz = collection.find({ "sucursal.nombre": nombre, "arroz.tipos": { $ne: null } }, { fields: { "arroz.tipos": 1, _id: 0 } }).toArray()
        .then((datos) => {
          const t = datos.map((d) => d.arroz.tipos);
          t.map((d) => {
            ingredientes.arroz += d.length;
          });
        });

      let numGrano = collection.find({ "sucursal.nombre": nombre, "grano.tipos": { $ne: null } }, { fields: { "grano.tipos": 1, _id: 0 } }).toArray()
        .then((datos) => {
          const t = datos.map((d) => d.grano.tipos);
          t.map((d) => {
            ingredientes.grano += d.length;
          });
        });

      let numCarnes = collection.find({ "sucursal.nombre": nombre, "carnes.tipos": { $ne: null } }, { fields: { "carnes.tipos": 1, _id: 0 } }).toArray()
        .then((datos) => {
          const t = datos.map((d) => d.carnes.tipos);
          t.map((d) => {
            ingredientes.carnes += d.length;
          });
        });

      let numAdiciones = collection.find({ "sucursal.nombre": nombre, "adiciones.tipos": { $ne: null } }, { fields: { "adiciones.tipos": 1, _id: 0 } }).toArray()
        .then((datos) => {
          const t = datos.map((d) => d.adiciones.tipos);
          t.map((d) => {
            ingredientes.adiciones += d.length;
          });
        });

      let numSalsas = collection.find({ "sucursal.nombre": nombre, "salsas.tipos": { $ne: null } }, { fields: { "salsas.tipos": 1, _id: 0 } }).toArray()
        .then((datos) => {
          const t = datos.map((d) => d.salsas.tipos);
          t.map((d) => {
            ingredientes.salsas += d.length;
          });
        });

      let numExtras = collection.find({ "sucursal.nombre": nombre, "extras.tipos": { $ne: null } }, { fields: { "extras.tipos": 1, _id: 0 } }).toArray()
        .then((datos) => {
          const t = datos.map((d) => d.extras.tipos);
          t.map((d) => {
            ingredientes.extras += d.length;
          });
        });

      let numBebidas = collection.find({ "sucursal.nombre": nombre, "bebidas.tipos": { $ne: null } }, { fields: { "bebidas.tipos": 1, _id: 0 } }).toArray()
        .then((datos) => {
          const t = datos.map((d) => d.bebidas.tipos);
          t.map((d) => {
            ingredientes.bebidas += d.length;
          });
        });

      const promesas = [numArroz, numGrano, numCarnes, numAdiciones, numSalsas, numExtras, numBebidas];
      Promise.all(promesas).then(() => callback(ingredientes));
      client.close();
    })
    .catch((error) => console.log("se encontro el error:\n" + error.message));
}

/* Inicio conexion base de datos filas_agiles. */
function getSucursales(callback) {
  MongoClient.connect(url, (err, client) => {
    assert.equal(err, null);
    console.log("Connected");
    const db = client.db("filas_agiles");
    encontrarSucursales(db, callback);
    client.close();
  });
}

/* GET Sucursales. */
router.get("/sucursales", (req, res) => {
  getSucursales((sucursales) => res.send(sucursales));
});

/* retorna la infomracion de log in de una sucursal*/
router.get("/sucursal", (req, res) => {
  const sucursal = { nombre: req.query.nombre, pass: req.query.pass };
  getSucursal(sucursal, (dato) => res.send(dato));
});

router.get("/usuario/pedidos", (req, res) => {
  const correo = req.query.correo;
  getPedidosByUsuario(correo, (datos) => res.send(datos));
});

router.get("/sucursal/pedidos", (req, res) => {
  const nombre = req.query.nombre;
  getPedidosBySucursal(nombre, (datos) => res.send(datos));
});

router.get("/sucursal/ingredientes", (req, res) => {
  const nombre = req.query.nombre;
  getIngredientesBySucursal(nombre, (datos) => res.send(datos));
});

module.exports = router;
