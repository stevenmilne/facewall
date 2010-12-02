// a simple bounce / echo server which returns a string to all users
// pair with facewall_client to create a twitter war wall
//


var sys = require("sys")
  , ws = require('../lib/ws/server');

var server = ws.createServer({debug: true});

// Handle WebSocket Requests
server.addListener("connection", function(conn){
  conn.send("Yay new connection: "+conn.id);

  conn.addListener("message", function(message){
  
  //  conn.broadcast("<"+conn.id+"> "+message);
  
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