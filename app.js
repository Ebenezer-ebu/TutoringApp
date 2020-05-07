var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

// Connect to Mongoose
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost/tutorapp");
var db = mongoose.connection;

app.get('/', function(req, res) {
    res.send('Server up and running');
});
app.listen(3000);
console.log('Running on port 3000...');