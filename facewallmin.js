var sys = require("sys"), ws = require('../lib/ws/server');

var server = ws.createServer({debug: true});

server.addListener("connection", function(conn){
  conn.send("Yay new connection: "+conn.id);
  conn.addListener("message", function(message){
    conn.broadcast(message);
  });
});

server.listen(8000);