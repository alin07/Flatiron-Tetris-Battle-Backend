var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  User = require('./api/models/userModel'),
  Room = require('./api/models/roomModel'),
  bodyParser = require('body-parser');
const session = require('express-session');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tetrisdb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var roomRoutes = require('./api/routes/roomRoutes'); //importing route
var userRoutes = require('./api/routes/userRoutes'); //importing route
roomRoutes(app); //register the route
userRoutes(app); //register the route

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});
app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
