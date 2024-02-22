const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");



const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});


const rooms = {};

io.on("connection", (socket) => {
  console.log("A client connected");

  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });

  socket.on('createRoom', (roomName) => {

    if (rooms.hasOwnProperty(roomName)) {
      socket.emit("roomExistsError", "Room already exists. Try a different name.");
    } else {

      rooms[roomName] = { players: [socket.id], board: ["", "", "", "", "", "", "", "", ""], currentPlayer: socket.id, roomName };
      socket.emit("roomCreated", `Room "${roomName}" created successfully.`);

      socket.join(roomName);
      io.to(roomName).emit("gameState", rooms[roomName]);
      // io.emit("gameState", rooms[roomName]);
    }
  })

  //to join a room
  socket.on('joinRoom', (roomName) => {
    if (!rooms.hasOwnProperty(roomName)) {
      socket.emit("roomNotFoundError", `Room "${roomName}" does not exist.`);
    } else if (rooms[roomName].players.length >= 2) {
      socket.emit("roomFullError", `Room "${roomName}" is already full.`);
    } else {
      rooms[roomName].players.push(socket.id);
      console.log("bc quite complicated", rooms[roomName]);
      socket.emit("roomJoined", `You have joined room "${roomName}".`);
      console.log(`Player ${socket.id} joined room "${roomName}".`);
      socket.join(roomName);
      io.to(roomName).emit("gameState", rooms[roomName]);
      // io.emit("gameState", rooms[roomName]);
    }
  });



  socket.on('move', (data) => {

    const { roomName, cellIndex } = data;
    const room = rooms[roomName];
    if (room && room.currentPlayer === socket.id && room.board[cellIndex] === "") {
      room.board[cellIndex] = socket.id === room.players[0] ? "X" : "O";
      room.currentPlayer = room.players.find(playerId => playerId !== socket.id);
      io.to(roomName).emit("gameState", room);
    }

  })


  //to resetGame
  socket.on('resetGame', (roomName) => {
    if (rooms.hasOwnProperty(roomName)) {
      rooms[roomName].board = ["", "", "", "", "", "", "", "", ""];
      rooms[roomName].currentPlayer = rooms[roomName].players[0];
      io.to(roomName).emit("gameState", rooms[roomName]);
    }
  })


});

app.get('/', (req, res) => {
  res.send("hello world")
})

httpServer.listen(3000, () => console.log('listening at server 3000'));