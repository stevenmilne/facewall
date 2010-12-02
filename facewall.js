// .a really simple bounce / echo server which returns a string to all users

var sys = require("sys")
  , ws = require('../lib/ws/server');

// ws is a great websocket server written in node we can piggyback onto
// get it at https://github.com/miksago/node-websocket-server

var server = ws.createServer({debug: true});

// Handle WebSocket Requests
server.addListener("connection", function(conn){

  // normally we'd send something to confirm connection but we want to keep this clean
  //conn.send("Yay new connection: "+conn.id);

  // this is our main listener, which just broadcasts what it hears
  conn.addListener("message", function(message){
    conn.broadcast(message);
    if(message == "error"){
      conn.emit("error", "test");
    }
  });
});

server.addListener("error", function(){
  console.log(Array.prototype.join.call(arguments, ", "));
});

server.addListener("disconnected", function(conn){
  server.broadcast("Aww boo - <"+conn.id+"> disconnected");
});

server.listen(8000);