module.exports = function (io) {
  var _ = require('lodash');
  var app = require('express');
  var router = app.Router();
  
  io.on('connection', function (socket) {
    socket.join('1');
    // socket.join('bde4b452-0734-4aaf-b5c1-09cc12d7ab64');
    socket.on('login', function (userdata) {
      console.log('Socket Connected:',userdata)
      socket.join('navigate_2018_902770');
      socket.join(userdata.from);
      socket.handshake.session.userdata = userdata;
      socket.handshake.session.save();
      
    });

    socket.on('disconnect', function () {
      console.log('disconnect*********************',socket.handshake.session.confdata);
      io.sockets.in('navigate_2018_902770').emit('logout', { userdata: socket.handshake.session.userdata });
      if (socket.handshake.session.userdata) {
        delete socket.handshake.session.userdata;
        socket.handshake.session.save();
      }
    });
  });

  return router;
}
