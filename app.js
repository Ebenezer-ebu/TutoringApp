var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

app.use(cors());

// Parse Request for Content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require("./App/models");
const Role = db.role;
const Category = db.category;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// Simple route
app.get('/', function(req, res) {
    res.send('Server up and running');
});

function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
  
        new Role({
          name: "tutor"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'tutor' to roles collection");
        });
  
        new Role({
          name: "student"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'student' to roles collection");
        });
      }
    });
  }
  function initial() {
    Category.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Category({
          name: "primary"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'primary' to categories collection");
        });
  
        new Category({
          name: "JSS"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'JSS' to categories collection");
        });
  
        new Category({
          name: "SSS"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'SSS' to categories collection");
        });
      }
    });
  }

// Port listen for request
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});