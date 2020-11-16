const server = require('http').createServer();

const io = require('socket.io')(server, {
  //path: '/test',
  //serveClient: true,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false,
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        console.log(msg);
    });
    
});
io.sockets.emit('hi', 'everyone');

//server.listen(3000);

server.listen(3000, () => {
    console.log('listening on *:3000');
});
