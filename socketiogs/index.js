var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http,{
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
        console.log(msg);
        io.emit('chat message', msg);
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});