require("dotenv").config();
const express = require("express");
const app = express();

const MongoClient = require("mongodb").MongoClient;

// Connection URL
const url = process.env.MLAB;
var port = process.env.PORT || 3000;

// function findDocuments(db, callback) {
//   const collection = db.collection("tweets");
//   collection.find({}).toArray((err, docs) => {
//     if (err) throw err;
//     console.log("inicio ");
//     callback(docs);
//   });
// }
//
// function findDocumentsParam(db, callback,search) {
//   const collection = db.collection("tweets");
//   console.log("busqueda search!");
//   var query ={
//     $or:[
//       {"user.screen_name":{$regex : search, $options : "i"}},
//       {text:{$regex : search, $options : "i"}}
//     ]
//   };
//   collection.find(query).toArray((err, docs) => {
//     if (err) throw err;
//     console.log("busqueda search!!!");
//     callback(docs);
//   });
// }


function getSomeThing () {
  MongoClient.connect(url, (err, client) => {
    if (err) throw err;
    console.log("Connected");
  //  const db = client.db("webdev_tweets");
  }
  //  client.close();
  );
}

app.use(express.static("public"));
app.get("/index", (req, res) => {
  getSomeThing();
});

app.listen(port, () => console.log("Example app listening on port"));
