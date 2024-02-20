import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import { log } from "console";
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
app.use(cors());
io.on("connection", (socket) => {
  console.log("User connected");
  console.log("user id", socket.id);
  console.log("hi");
  // socket.on("drawingData", (message) => {
  //   console.log("Received drawing data:", message.height);
  //   io.emit("drawingData", "satyamRai");
  // });
  socket.on("drawingData", (message) => {
    console.log("got it ");
    // const { data, width, height } = message;
    // const imageData = new ImageData(
    //   Uint8ClampedArray.from(data),
    //   width,
    //   height
    // );
    // Process the received imageData as needed

    console.log(message);
    socket.broadcast.emit("drawingData", message);
  });

  socket.on("hello", (data) => {
    console.log("data is", data);
  });
  socket.on("testing", (data) => {
    console.log("test", data);
  });
});
app.get("/", (req, res) => {
  res.send("hello world");
});
server.listen(3000, () => {
  console.log("server is running on Port 3000 ");
});
