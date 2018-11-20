var socket = io();
/**
 * When connect event occured
 **/
socket.on('connect', function(){
    
  // emait the user as 'login' and send 'user_id' and 'user_fullname' which save into database
  // then update the database table field, that user is loged in by ajax calling.
  // console.log('client-socket 9 ', {from: user_id, text: user_fullname});
  socket.emit('login', {from: '11', text: '123'});

  // logout emait received from server
  socket.on("logout", function(data) {
    
  });

});
/* reconnect_attempt attempt */
socket.on('reconnect_attempt', () =>{
    socket.emit('has_login', function(res){
        if(! res){
            window.location.href="/";
        }
    });
});

/**
 * When disconnect event occured
 **/
socket.on('disconnect', function(){
    console.log('Disconnected');
});
