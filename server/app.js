import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
const rooms = {};
app.use(cors());
io.on("connection", (socket) => {
  console.log("User connected");
  // console.log("user id", socket.id);
  // console.log("hi");

  socket.on("drawingData", (data) => {
    // Emit the received drawing data to all clients in the specified room
    if (data.roomName) {
      io.to(data.roomName).emit("drawingData", data);
    } else {
      console.log("Room name is missing. Drawing data not emitted.");
    }
  });

  socket.on("join-room", ({ room, userName }) => {
    socket.join(room);
    if (!rooms[room]) {
      rooms[room] = [];
    }
    rooms[room].push(userName);
    io.to(room).emit("users-in-room", rooms[room]);
    console.log("rooms array is", rooms[room]);
    console.log(socket.id + "is joined " + room);
  });
});
app.get("/", (req, res) => {
  res.send("hello world");
});
server.listen(3000, () => {
  console.log("server is running on Port 3000 ");
});
