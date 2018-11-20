module.exports = function (io) {
  var _ = require('lodash');
  var app = require('express');
  var router = app.Router();
  var {createActivity} = require('./../utils/todo');
  var { hayvenjs } = require('./../utils/hayvenjs');
  
  io.on('connection', function (socket) {
    socket.join('1');
    // socket.join('bde4b452-0734-4aaf-b5c1-09cc12d7ab64');
    socket.on('login', function (userdata) {
      socket.join('navigate_2018_902770');
      socket.join(userdata.from);

      socket.handshake.session.userdata = userdata;
      socket.handshake.session.save();
      // socket.emit('online_user_list', generateMessage('Admin', alluserlist)); // this emit receive only who is login
      // socket.broadcast.emit('new_user_notification', generateMessage('Admin', socket.handshake.session.userdata)); // this emit receive all users except me

    });

    socket.on('disconnect', function () {
      console.log('disconnect*********************',socket.handshake.session.confdata);
      if (socket.handshake.session.confdata) {
        getRoomInfo(socket.handshake.session.confdata.roomName, (error, room) => {
          if (room == null) {

          } else {
            let usersInRoom = room.participants;

            for (let i in usersInRoom) {
              if (usersInRoom[i].name == socket.handshake.session.userdata.from) {
                reloadConf[socket.handshake.session.userdata.from] = socket.handshake.session.confdata;
                console.log('=====> reload data set');
                // leaveRoomConfbyId(socket.id);
              }
            }

          }
        });
      }else{
        io.sockets.in('navigate_2018_902770').emit('logout', { userdata: socket.handshake.session.userdata });
        if (socket.handshake.session.userdata) {
          alluserlist = alluserlist.filter(function (el) {
            return el !== socket.handshake.session.userdata.from;
          });
          delete socket.handshake.session.userdata;
          socket.handshake.session.save();
        }

      }

    });
  });

  return router;
}
