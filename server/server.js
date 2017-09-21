var express = require('express');
var cors = require('cors');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var Metrics = require('./api/models');
var bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/IRIS', { useMongoClient: true }); 

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes');
routes(app);

app.listen(port);

console.log('overwatch RESTful API server started on: ' + port);