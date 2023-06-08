// server/index.js
const express = require("express");
var path = require('path');
const bodyParser = require('body-parser');
const fs = require("fs");
const multer = require("multer");
const mimeTypes = require("mime-types");
var mysql      = require('mysql');

const storage = multer.diskStorage({
    destination: 'archivos/',
    filename:function(req,file,cb){
        cb("",file.originalname);
    }
});
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "BibliotecaMeiquer",
});
const PORT = process.env.PORT || 3002;
const app = express();
app.use(bodyParser.json());
const upload = multer({
    storage: storage
});
// obtiene la ruta del directorio publico donde se encuentran los elementos estaticos (css, js).
var publicPath = path.resolve(__dirname, 'public'); //path.join(__dirname, 'public'); también puede ser una opción


connection.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
    return;
  }

  console.log("Connected to the database");


  // Para que los archivos estaticos queden disponibles.
app.use(express.static(publicPath));
app.get("/", (req, res) => {
    console.log(__dirname);
  res.sendFile(__dirname + "/public/subir.html");
});
app.post("/files", upload.single('/archivos') ,(req, res) => {
  res.send("ok");
  var query = "USE SubirArchivos";
  connection.query(query, function (err, result, fields) {
    if (err) throw err;
  }
  );
  
  });
  // Start the server after the database connection is established
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
});
  




