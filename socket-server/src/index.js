require('dotenv').config();
const server = require('http').createServer();
const socket = require('socket.io');
import mongoose from 'mongoose';
import '../../rest-server/src/config/mongoDB';
import Messages from '../../rest-server/src/lib/db/mongo/index.js';

const io = socket(server);
server.listen(process.env.PORT, function() {
  console.log('socket-server listening on port', process.env.PORT);
});

io.on('connection', (socket) => {

  socket.on('subscribe', function(room) {
    console.log('joining room', room);
    socket.join(room);
  })

  socket.on('unsubscribe', function(room) {
    console.log('leaving room', room);
    socket.leave(room);
  })

  socket.on('send', function(data) {  
    addMessage(data);
    io.sockets.in(data.room).emit('message', data);
  })

  socket.on('requestRoom', function(room) {
    console.log('joining request room', room);
    socket.join(room);
  })

  socket.on('request', function(data) {
    console.log('request received from user: ', data);
    io.sockets.in(data.room).emit('request', data);
  })
});

const addMessage = async (messagedata) => {
  await Messages.messageModel.update({participants: messagedata.room}, {$push:{'messages': {'user':messagedata.user, 'text': messagedata.message}}});
}
