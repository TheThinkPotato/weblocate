// WebLocate API Masshup
// Assignment 1 Server for the QUT CAB432 Cloud Computing Unit
// By Daniel Lopez - Student ID: n10956611
// Code has been adapted from the Web Computing Units at QUT CAB230 and CAB432

const path = require('path')
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const search = require("./routes/search");
const views = require("./routes/counter");
const app = express();
require("dotenv").config();

const hostname = process.env.HOST_NAME || "127.0.0.1";
const port = process.env.PORT || 3000;

// Serve out any static assets correctly
app.use(express.static('../client/build'))

app.options("*", cors()); // include before other routes
app.use(cors());
app.get("/api", (req, res) => {
  res.writeHead(200, { "content-type": "text/html" });
  fs.readFile("static/index.html", "utf8", (err, data) => {
    if (err) {
      res.end("Could not find or open file for reading\n");
    } else {
      res.end(data);
    }
  });
});

app.use("/search", search);
app.use("/counter", views);

// catch 404 and forward to error handler
app.use(function(req, res, next) {  
  res.status(404).json({message:'Error can not find address.'});
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
})

app.listen(port, function () {
  console.log(`Express app listening at http://${hostname}:${port}/`);
});
