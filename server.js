const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const User = require('./api/models/userModel');
const Room = require('./api/models/roomModel');
const bodyParser = require('body-parser');

const WebSocket = require('ws').Server;
let connectedUsers = [];

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tetrisdb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const roomRoutes = require('./api/routes/roomRoutes');
const userRoutes = require('./api/routes/userRoutes');

roomRoutes(app);
userRoutes(app);

const server = app.listen(port, function(){
  console.log('Tetris Battle RESTful API server started on: ' + port);
});

//WEB SERVER
const wss = new WebSocket({ server });

//init Websocket ws and handle incoming connect requests
wss.on('connection', function connection(ws) {
  console.log("connection ...");
  //on connect message
  ws.on('message', function incoming(message) {
      console.log('received: %s', message);
      connectedUsers.push(message);
  });
  ws.send('message from server at: ' + new Date());
});
