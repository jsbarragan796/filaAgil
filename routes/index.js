require("dotenv").config();
var express = require("express");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
var router = new express.Router();

// Connection URL
const url = process.env.MLAB;

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

/* GET home page. */
router.get("/images", (req, res) => {
  console.log("inicio");
  getPhotos((pagePhotos) => res.send(pagePhotos));
});

module.exports = router;
