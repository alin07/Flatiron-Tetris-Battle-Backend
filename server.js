const express = require('express');
const http = require('http')
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const User = require('./api/models/userModel');
const Room = require('./api/models/roomModel');
const bodyParser = require('body-parser');

const cors = require('cors')
app.use(cors())

const WebSocket = require('ws').Server;
let connectedUsers = {};

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tetrisdb');

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const roomRoutes = require('./api/routes/roomRoutes');
const userRoutes = require('./api/routes/userRoutes');

roomRoutes(app);
userRoutes(app);

const server = http.createServer(app);

//WEB SERVER
const wss = new WebSocket({ server });

//init Websocket ws and handle incoming connect requests
wss.on('connection', function connection(ws) {

  ws.on('message', function incoming(message) {
    const msg = JSON.parse(message)
    console.log('MSG', msg)

    if(!connectedUsers[msg.subscription]){
      connectedUsers[msg.subscription]=[]
      console.log('created a key in object: ', Object.keys(connectedUsers[msg.subscription]))
    }
    if(connectedUsers[msg.subscription].indexOf(ws) < 0){
      connectedUsers[msg.subscription][msg.payload._id] = ws
      console.log('pushing into '+msg.subscription+": ", Object.keys(connectedUsers[msg.subscription][msg.payload._id]))
    }


   sendAll(Object.keys(connectedUsers[msg.subscription]), connectedUsers[msg.subscription], JSON.stringify(msg));


    switch(msg.type) {
      case 'DISBAND':
        console.log('disband!', Object.keys(connectedUsers[msg.subscription]).length)
        delete connectedUsers[msg.subscription]
        console.log('disbanded!!', connectedUsers[msg.subscription])
        break;
      case 'LEAVE':
        console.log('before leave!', Object.keys(connectedUsers[msg.subscription]).length)
        delete connectedUsers[msg.subscription][msg.payload.userId]
        console.log('after leave!', Object.keys(connectedUsers[msg.subscription]).length)
        break;
    }
  });

  ws.on('close', function close(c) {
    console.log("closing", c)
    // connectedUsers = connectedUsers.filter(u => u._id !== )
  });

});

function sendAll (keys, clients, message) {

  for (let key in keys) {
    if (keys.hasOwnProperty(key) && clients[keys[key]].readyState === clients[keys[key]].OPEN) {
      // console.log('CLIENTS', clients, 'KEY', keys[key])
        clients[keys[key]].send(message);

    }
  }
}

server.listen(process.env.PORT || 3000, () => {
  console.log(`server started on port ${server.address().port}`)
})
